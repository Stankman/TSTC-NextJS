import { processPrerequisites, processProgramRequirements } from "@/lib/kuali/kuali";
import { fetchKualiSpecializationById } from "@/lib/kuali/specializations/kuali-specializations";
import { calculateSemesterCost } from "@/lib/utils";
import { KualiSpecialization } from "@/types/kuali";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ specializationId: string }> }
): Promise<NextResponse> {
    try {
        const { specializationId } = await params;
        const { searchParams } = new URL(request.url);
        const tier = searchParams.get("tier") ? Number(searchParams.get("tier")) : undefined;

        const specializationRaw = await fetchKualiSpecializationById(specializationId);

        if (!specializationRaw) {
            return NextResponse.json(
                { message: "Specialization not found." },
                { status: 404 }
            );
        }

        const semesters = specializationRaw.programRequirements 
            ? await processProgramRequirements(specializationRaw.programRequirements)
            : [];

        const prerequisites = specializationRaw.requisites 
            ? processPrerequisites(specializationRaw.requisites)
            : [];

        let pricing = undefined;

        if (tier) {
            pricing = semesters.reduce((total, semester) => {
                const isPBE = specializationRaw.modality?.pbe;

                const semesterCost = calculateSemesterCost(
                    semester.totalCredits,
                    isPBE,
                    tier
                );
                
                return total + semesterCost;
            }, 0);
        }

        const specialization: KualiSpecialization = {
            id: specializationRaw.id,
            pid: specializationRaw.pid,
            title: specializationRaw.title,
            code: specializationRaw.code,
            catalogYear: specializationRaw.catalogYear,
            monthsToComplete: Number(specializationRaw.monthsToComplete),
            modalities: specializationRaw.modality,
            prerequisites,
            semesters,
            locations: specializationRaw.locations,
            price: pricing
        };

        return NextResponse.json(specialization);
    } catch (error) {
        console.error("Error fetching specialization:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}