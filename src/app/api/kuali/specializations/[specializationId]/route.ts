import { calculateKualiSpecializationPrice, processPrerequisites, processProgramRequirements } from "@/lib/kuali/kuali";
import { fetchKualiSpecializationById } from "@/lib/kuali/specializations/kuali-specializations";
import { KualiSpecialization } from "@/types/kuali";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: { specializationId: string } }
) {
    try {
        const { specializationId } = await params;
        const { searchParams } = new URL(request.url);
        const tier = searchParams.get("tier") ? Number(searchParams.get("tier")) : undefined;

        const specializationRaw = await fetchKualiSpecializationById(specializationId);

        if(!specializationRaw) {
            return new Response(JSON.stringify({ message: "Specialization not found." }), { status: 404 }); 
        }
        
        const semesters = specializationRaw.programRequirements 
            ? processProgramRequirements(specializationRaw.programRequirements)
            : [];

        const totalCredits = semesters.reduce((acc, semester) => acc + (semester.totalCredits || 0), 0);

        const prerequisites = specializationRaw.requisites 
            ? processPrerequisites(specializationRaw.requisites)
            : [];

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
            totalCredits,
            locations: specializationRaw.locations
        };

        if(tier) {
            await calculateKualiSpecializationPrice(specialization, tier);
        }

        return NextResponse.json(specialization);
    } catch (error) {
        
    }
}