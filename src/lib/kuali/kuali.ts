import { KualiCourseBlock, KualiProgramRequirementsRaw, KualiRequisitesRaw, KualiSemester, KualiSpecialization } from "@/types/kuali";
import querystring from "query-string";
import { fetchKualiCourseByPid } from "./courses/kuali-courses";
import { calculateSemesterCost } from "../utils";

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

export async function processProgramRequirements(
    programRequirements: KualiProgramRequirementsRaw
): Promise<KualiSemester[]> {
    if (!programRequirements?.groupings?.length) {
        return [];
    }

    return Promise.all(
        programRequirements.groupings.map(async (grouping) => {
            if (!grouping.rules?.rules) {
                return {
                    label: grouping.label,
                    blocks: [],
                    totalCredits: 0
                };
            }

            let semesterCredits = 0;

            const blocks: KualiCourseBlock[] = await Promise.all(
                grouping.rules.rules.map(async (rule) => {
                    const isOptional = Boolean(rule.data?.credits);
                    const minimumCredits = isOptional ? Number(rule.data.credits) || 0 : 0;
                    const courseIds = rule.data?.courses || [];

                    if (isOptional) {
                        semesterCredits += minimumCredits;
                    } else if (courseIds.length > 0) {
                        const courses = await Promise.all(
                            courseIds.map(async (courseId) => {
                                try {
                                    const course = await fetchKualiCourseByPid(courseId);
                                    return Number.parseFloat(course.semesterCreditHours) || 0;
                                } catch (error) {
                                    console.error(`Failed to fetch course ${courseId}:`, error);
                                    return 0;
                                }
                            })
                        );
                        semesterCredits += courses.reduce((sum, credits) => sum + credits, 0);
                    }

                    return {
                        optional: isOptional,
                        minimumCredits,
                        courseIds
                    };
                })
            );

            return {
                label: grouping.label,
                blocks,
                totalCredits: semesterCredits
            };
        })
    );
}

export function processPrerequisites(
    requisites: KualiRequisitesRaw
): string[] {
    if (!requisites?.rules?.rules?.length) {
        return [];
    }

    return requisites.rules.rules
        .map((rule) => rule.data?.text)
        .filter((text): text is string => typeof text === "string" && text.length > 0);
}