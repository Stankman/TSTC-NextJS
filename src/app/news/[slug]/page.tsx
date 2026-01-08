import { Heading, Section } from "@/components/global/craft";
import PageHeader from "@/components/global/page-header";
import { getFeaturedMediaById } from "@/lib/wordpress/media/media";
import { getArticleBySlug } from "@/lib/wordpress/news-articles/wp-news-articles";
import Image from "next/image";

export default async function Page(
    { params }: { params: Promise<{slug: string }> }
) {
    const { slug } = await params;

    const article = await getArticleBySlug(slug);
    const featuredMedia = await getFeaturedMediaById(article.featured_media);

    return (
        <>
            <PageHeader title={article.title.rendered} />
            <div id="article-featured-image" className="h-150 overflow-hidden">
                <Image src={featuredMedia.source_url || ""} className="object-cover object-top size-full" alt={featuredMedia.alt_text || ""} width={featuredMedia.media_details.width} height={featuredMedia.media_details.height} />
            </div>
            <Section>
                <div className="grid grid-cols-4 gap-4">
                    {/* <span className="col-span-1"></span> */}
                    <div className="col-span-3">
                        <div className="border-b border-black/10 mb-3">
                            {/* {article.date} */}
                        </div>
                        <div id="article-content" className="leading-7" dangerouslySetInnerHTML={{ __html: article.content.rendered }} />
                    </div>
                    <div className="col-span-1">
                        
                    </div>
                </div>
            </Section>
        </>
    );
}