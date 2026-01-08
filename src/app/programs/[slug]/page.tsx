import EventsBlock from "@/components/events/events-block/events-block";
import { Section } from "@/components/global/craft";
import CTA from "@/components/global/cta";
import PageHeader from "@/components/global/page-header";
import DegreePlansBlock from "@/components/programs/degree-plans/degree-plans-block/degree-plans-block";
import GraduateSuccessBlock from "@/components/programs/graduate-success/graduate-success-block";
import InformationBlock from "@/components/programs/information/information-block";
import InformationBlockSkeleton from "@/components/programs/information/information-block.skeleton";
import ProgramFacilities from "@/components/programs/program-facilities/program-facilities";
import RelatedPrograms from "@/components/programs/related-programs/related-programs";
import SummaryBlock from "@/components/programs/summary/summary-block";
import { getProgramBySlug } from "@/lib/wordpress/programs/wp-programs";
import { Suspense } from "react";

export default async function Page(
    { params }: { params: Promise<{slug: string }> }
) {
    const { slug } = await params;

    const program = await getProgramBySlug(slug);

    return (
        <>
            <PageHeader title={program.title.rendered} breadcrumbs={true} />
            <Section variant="primary">
                <Suspense fallback={<InformationBlockSkeleton />}>
                    <InformationBlock
                        industryIds={program.industry}
                        scheduleIds={program.schedule}
                        awardIds={program.award}
                        campusIds={program.campus}
                    />
                </Suspense>
            </Section>
            <Section variant="primary">
                <SummaryBlock description={program.acf.short_description} />
            </Section>
            <Section variant="primary">
                <DegreePlansBlock title="Degree Plans" degreePlans={program.acf.degree_plans_whitelist} tier={program.acf.tier} />
            </Section>
            <Section>
                <GraduateSuccessBlock serieIds={program.acf.onet_ids} />
            </Section>
            <Section>
                <EventsBlock title="Upcoming Dates" />
            </Section>
            <Section variant="dark">
                <ProgramFacilities title="High Quality Training Facilities" />
            </Section>
            <Section>
                <RelatedPrograms title="Related Programs" industry={program.industry} />
            </Section>
            <CTA
                title="Ready to enroll?"
                subtitle="Our focus is on your success — and getting you to work fast."
            />
        </>
    );
}