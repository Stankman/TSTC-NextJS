import FiltersCollapsible from "@/components/filters/filters-collapsible";
import FiltersDrawer from "@/components/filters/filters-drawer";
import { Section } from "@/components/global/craft";
import PageHeader from "@/components/global/page-header";
import ArticleCard from "@/components/news-articles/article-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getAllAwards } from "@/lib/wordpress/awards/wp-awards";
import { getAllCampuses } from "@/lib/wordpress/campuses/wp-campuses";
import { getAllIndustries } from "@/lib/wordpress/industries/wp-industries";
import { getArticlesPaginated } from "@/lib/wordpress/news-articles/wp-news-articles";
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

    const [articlesPaginated, campuses, industries] = await Promise.all([
            getArticlesPaginated(page, resultsPerPage),
            getAllCampuses(),
            getAllIndustries()
    ]);

    const { data: articles, headers } = articlesPaginated;
    const { totalResults, totalPages } = headers;
    
    return (
        <>
            <PageHeader title="Latest News"></PageHeader>
            <Section>
                <div className="flex flex-col lg:flex-row gap-10">
                    <div className="shrink-0 lg:basis-[350px]">
                        <Card className="shadow-none text-foreground-tertiary">
                            <CardHeader>
                                <CardTitle className="text-2xl">Filters</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-5">
                                    <div className="block lg:hidden space-y-3 space-x-3">
                                        <FiltersDrawer taxonomyKey="campus" label="Campuses" singularLabel="Campus" items={campuses} />
                                        <FiltersDrawer taxonomyKey="industry" label="Industries" singularLabel="Industry" items={industries} />
                                    </div>
                                    <Input type="search" placeholder="Search programs..." />
                                    <div className="hidden lg:block space-y-4">
                                        <FiltersCollapsible label="Campuses" singularLabel="Campus" taxonomyKey="campus" items={campuses} />
                                        <FiltersCollapsible label="Industries" singularLabel="Industry" taxonomyKey="industry" items={industries} />
                                    </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="grow">
                        <div>
                        {articles.map((article, index) => (
                            <Link href={`/news/${article.slug}`} key={index}><ArticleCard size="hero" featured={true} article={article} /></Link>
                        ))}
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-5">
                        {articles.map((article, index) => (
                            <Link href={`/news/${article.slug}`} key={index}><ArticleCard size="base" featured={true} article={article} /></Link>
                        ))}
                        {articles.map((article, index) => (
                            <Link href={`/news/${article.slug}`} key={index}><ArticleCard size="base" featured={false} article={article} /></Link>
                        ))}
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-5">
                        {articles.map((article, index) => (
                            <Link href={`/news/${article.slug}`} key={index}><ArticleCard size="sm" featured={true} article={article} /></Link>
                        ))}
                        {articles.map((article, index) => (
                            <Link href={`/news/${article.slug}`} key={index}><ArticleCard size="sm" featured={false} article={article} /></Link>
                        ))}
                        </div>
                    </div>
                </div>
            </Section>
        </>
    );
}