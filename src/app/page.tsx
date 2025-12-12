import EventsBlock from "@/components/events/events-block/events-block";
import { Section } from "@/components/global/craft";
import CTA from "@/components/global/cta";
import FeaturedNews from "@/components/global/featured-news/featured-news";
import VideoHeader from "@/components/global/video-header/video-header";
import AudienceTabs from "@/components/home/audience-tabs/audience-tabs";
import CampusHighlights from "@/components/home/campus-highlights/campus-highlights";
import Hero from "@/components/home/hero/hero";
import { IndustriesAccordion } from "@/components/home/industries-accordion/industries-accordion";

export default function Home() {
  return (
    <>
      <Section variant="primary">
        <Hero text="Step into a high-demand career." />
      </Section>
      <VideoHeader />
      <Section variant="primary">
        <Hero text="At TSTC, we equip you with the skills employers need—so you’re ready to step into a well-paying job in fields like technology, manufacturing and healthcare." />
      </Section>
      <Section>
        <IndustriesAccordion />
      </Section>
      <Section variant="dark">
        <AudienceTabs
          title="Tomorrow’s Career Begins Today"
        />
      </Section>
      <Section variant="secondary">
        <EventsBlock
          title="Admissions Events"
        />
      </Section>
      <Section>
        <FeaturedNews 
          title="Texans Building Their Future"
          subtitle="Every day, our students put in the work for tomorrow."
          featured={[1, 2]}
          rtl={true}
        />
      </Section>
      <Section>
        <CampusHighlights
          title="Our campus simulates real-world working environments."
        />
      </Section>
      <Section>
        <FeaturedNews 
          title="Texans Who Built Their Future"
          subtitle="Dedication and training became careers they can count on. Our graduates carry the skills that keep Texas working."
          featured={[1, 2]}
        />
      </Section>
      <CTA
        title="Ready to enroll?"
        subtitle="Our focus is on your success — and getting you to work fast."
      />
    </>
  );
}
