import FiltersCollapsible from "@/components/filters/filters-collapsible";
import FiltersDrawer from "@/components/filters/filters-drawer";
import ArchivePagination from "@/components/global/archive-pagination/archive-pagination";
import { Section } from "@/components/global/craft";
import CTA from "@/components/global/cta";
import PageHeader from "@/components/global/page-header";
import ProgramCard from "@/components/programs/program-card";
import ProgramCardSkeleton from "@/components/programs/program-card.skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getAllAwards } from "@/lib/wordpress/awards/wp-awards";
import { getAllCampuses } from "@/lib/wordpress/campuses/wp-campuses";
import { getAllIndustries } from "@/lib/wordpress/industries/wp-industries";
import { getProgramsPaginated } from "@/lib/wordpress/programs/wp-programs";
import { getAllSchedules } from "@/lib/wordpress/schedules/wp-schedules";
import Link from "next/link";

export default async function Page({ searchParams }: {
    searchParams: Promise<{
        page?: string;
        search?: string;
    }>
}) {
    const params = await searchParams;
    const { page: pageParam, search } = params;

    const page = pageParam ? parseInt(pageParam, 10) : 1;
    const resultsPerPage = 9;

    const [programsPaginated, campuses, industries, schedules, awards] = await Promise.all([
        getProgramsPaginated(page, resultsPerPage),
        getAllCampuses(),
        getAllIndustries(),
        getAllSchedules(),
        getAllAwards()
    ]);

    const { data: programs, headers } = programsPaginated;
    const { totalResults, totalPages } = headers;

    return (
        <>
            <PageHeader title="Programs" />
            <Section>
                <div className="flex flex-col lg:flex-row gap-10">
                    <div className="lg:w-2/7">
                        <Card className="shadow-none text-foreground-tertiary">
                            <CardHeader>
                                <CardTitle className="text-2xl">Filters</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-5">
                                    <div className="block lg:hidden space-y-3 space-x-3">
                                        <FiltersDrawer taxonomyKey="campus" label="Campuses" singularLabel="Campus" items={campuses} />
                                        <FiltersDrawer taxonomyKey="industry" label="Industries" singularLabel="Industry" items={industries} />
                                        <FiltersDrawer taxonomyKey="schedule" label="Schedules" singularLabel="Schedule" items={schedules} />
                                        <FiltersDrawer taxonomyKey="award" label="Awards" singularLabel="Award" items={awards} />
                                    </div>
                                    <Input type="search" placeholder="Search programs..." />
                                    <div className="hidden lg:block space-y-4">
                                        <FiltersCollapsible label="Campuses" singularLabel="Campus" taxonomyKey="campus" items={campuses} />
                                        <FiltersCollapsible label="Industries" singularLabel="Industry" taxonomyKey="industry" items={industries} />
                                        <FiltersCollapsible label="Schedules" singularLabel="Schedule" taxonomyKey="schedule" items={schedules} />
                                        <FiltersCollapsible label="Awards" singularLabel="Award" taxonomyKey="award" items={awards} />
                                    </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="flex-1 space-y-8">
                        <span className="block text-2xl font-medium">
                            {totalResults} Results
                        </span>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <ProgramCardSkeleton />
                            {programs.map((program, index) => (
                                <Link href={`/programs/${program.slug}`} key={index}><ProgramCard program={program} /></Link>
                            ))}
                        </div>
                        <ArchivePagination totalPages={totalPages} currentPage={page} />
                    </div>
                </div>
            </Section>
            <CTA
                title="Ready to enroll?"
                subtitle="Our focus is on your success — and getting you to work fast."
            />
        </>
    );
}