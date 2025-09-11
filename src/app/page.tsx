import { Section } from "@/components/global/craft";
import CTA from "@/components/global/cta";
import PageHeader from "@/components/global/page-header";
import { IndustriesAccordion } from "@/components/home/industries-accordion/industries-accordion";

export default function Home() {
  return (
    <>
      <PageHeader title="Step into a high-demand career." breadcrumbs={false} />
      <Section>
        <IndustriesAccordion />
      </Section>
      <CTA />
    </>
  );
}
