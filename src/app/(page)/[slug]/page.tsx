import FlexBlock from "@/components/flex/flex-block";
import CTA from "@/components/global/cta";
import PageHeader from "@/components/global/page-header";
import { getPageBySlug } from "@/lib/wordpress/pages/wp-pages";
import { notFound } from "next/navigation";

export default async function Page({
    params
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const page = await getPageBySlug(slug);

    if (!page) {
        notFound();
    }

    return (
        <>
            <PageHeader title={page.title.rendered}></PageHeader>
            {page.acf.blocks.map((block, index) => (
                <FlexBlock key={index} layout={block.acf_fc_layout} properties={block} />
            ))}
            <CTA
                title="Ready to enroll?"
                subtitle="Our focus is on your success — and getting you to work fast."
            />
        </>
    );
}