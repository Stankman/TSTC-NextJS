import { KualiCourseBlock, KualiProgramRequirementsRaw, KualiRequisitesRaw, KualiSemester, KualiSpecialization } from "@/types/kuali";
import querystring from "query-string";
import { fetchKualiCourseByPid } from "./courses/kuali-courses";
import { calculateSpecializationCost } from "../utils";

const baseUrl = process.env.KUALI_API_URL;

if(!baseUrl) {
    throw new Error("KUALI_API_URL environment variable is not defined.");
}

const baseToken = process.env.KUALI_API_TOKEN;

if(!baseToken) {
    throw new Error("KUALI_API_TOKEN environment variable is not defined.");
}

class KualiAPIError extends Error {
    constructor(message: string, public status: number, public endpoint: string) {
        super(message);
        this.name = "KualiAPIError";
    }
}

export async function kualiFetch<T>(
    path: string,
    query?: Record<string, unknown>,
    tags: string[] = ["kuali", "server"],
    revalidate: number = 3600
): Promise<T> {
    const url = `${baseUrl}${path}${query ? `?${querystring.stringify(query)}` : ""}`;
    const userAgent = "Next.js Kuali Client";

    const response = await fetch(url, {
        headers: {
            "User-Agent": userAgent,
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Kuali-Tags": tags.join(","),
            "Authorization": `Bearer ${baseToken}`
        },
        next: {
            tags,
            revalidate
        }
    });

    if(!response.ok) {
        throw new KualiAPIError(
            `Kuali API request failed: ${response.statusText}`,
            response.status,
            url
        );
    }

    const data = await response.json();
    return data;
}

export function processProgramRequirements(
    programRequirements: KualiProgramRequirementsRaw
): KualiSemester[] {
    if (!programRequirements?.groupings?.length) {
        return [];
    }

    const semesters = programRequirements.groupings.map((grouping) => {
        const blocks: KualiCourseBlock[] = grouping.rules?.rules?.map((rule) => ({
            optional: Boolean(rule.data?.credits),
            minimumCredits: Number(rule.data?.credits) || 0,
            courseIds: rule.data?.courses || []
        })) || [];

        return {
            label: grouping.label,
            blocks
        } as KualiSemester;
    });

    semesters.map((semester) => {
        let semesterTotalCredits = 0;

        for (const block of semester.blocks) {
            if(block.optional) {
                semesterTotalCredits += block.minimumCredits;
            } else {
                block.courseIds.map(async (courseId) => {
                    try {
                        const course = await fetchKualiCourseByPid(courseId);
                        semesterTotalCredits += Number.parseFloat(course.semesterCreditHours) || 0;
                    } catch {
                        semesterTotalCredits += 0;
                    }
                });
            }
        }

        semester.totalCredits = semesterTotalCredits;
    });

    return semesters;
}

export function processPrerequisites(
    requisites: KualiRequisitesRaw
): string[] {
    if (!requisites?.rules?.rules?.length) {
        return [];
    }

    return requisites.rules.rules
        .map((rule) => rule.data?.text)
        .filter(Boolean) as string[];
}

export const calculateKualiSpecializationPrice = async (
    specialization: KualiSpecialization, 
    tier: number
): Promise<void> => {
    if (!specialization?.semesters?.length) {
        specialization.totalCredits = 0;
        specialization.price = 0;
        return;
    }

    let specializationTotalCredits = 0;

    await Promise.all(
        specialization.semesters.map(async (semester) => {
            let semesterTotalCredits = 0;

            const allCourseIds: string[] = [];
            const optionalCredits: number[] = [];

            for (const block of semester.blocks) {
                if (block.optional) {
                    optionalCredits.push(block.minimumCredits);
                } else {
                    allCourseIds.push(...(block.courseIds || []));
                }
            }

            const coursePromises = allCourseIds.map(async (courseId) => {
                try {
                    const course = await fetchKualiCourseByPid(courseId);
                    return { courseId, credits: Number.parseFloat(course.semesterCreditHours) || 0 };
                } catch {
                    return { courseId, credits: 0 };
                }
            });

            const courseResults = await Promise.all(coursePromises);
            const courseCreditsMap = new Map(courseResults.map(({ courseId, credits }) => [courseId, credits]));

            for (const block of semester.blocks) {
                let blockTotalCredits = 0;

                if (block.optional) {
                    blockTotalCredits = block.minimumCredits;
                } else {
                    blockTotalCredits = (block.courseIds || []).reduce((sum, courseId) => {
                        return sum + (courseCreditsMap.get(courseId) || 0);
                    }, 0);
                }

                semesterTotalCredits += blockTotalCredits;
            }

            semester.totalCredits = semesterTotalCredits;
            specializationTotalCredits += semesterTotalCredits;
        })
    );

    specialization.totalCredits = specializationTotalCredits;
    specialization.price = calculateSpecializationCost(specialization.totalCredits || 0, tier);
};