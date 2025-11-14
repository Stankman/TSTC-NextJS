import PageHeader from "@/components/global/page-header";

export default async function Page(
    { params }: { params: Promise<{slug: string }> }
) {
    const { slug } = await params;

    return (
        <>
        <PageHeader title={slug}></PageHeader>
        </>
    );
}