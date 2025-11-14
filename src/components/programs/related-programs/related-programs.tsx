import { Heading } from "@/components/global/craft";
import ProgramCard from "@/components/programs/program-card";
import { getProgramsPaginated } from "@/lib/wordpress/programs/wp-programs";
import Link from "next/link";

interface RelatedProgramsProps {
    title?: string;
    industry: number[];
}

export default async function RelatedPrograms({ title, industry }: RelatedProgramsProps) {
    try {
        if (!industry || industry.length === 0) {
            return null;
        }
        industry = [industry[0]];

        const relatedPrograms = await getProgramsPaginated(
            1,
            4,
            {
                industry: industry.toLocaleString()
            }
        );

        // Handle empty state
        if (!relatedPrograms.data || relatedPrograms.data.length === 0) {
            return null; // or return a "No related programs found" message
        }

        return (
            <>
                {title && <Heading size="h2">{title}</Heading>}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                    {relatedPrograms.data.map((program) => (
                        <Link href={`/programs/${program.slug}`} key={program.id}>
                            <ProgramCard program={program} />
                        </Link>
                    ))}
                </div>
            </>
        );
    } catch (error) {
        // Handle error state - could also use error.tsx for better UX
        console.error('Failed to load related programs:', error);
        return null;
    }
}