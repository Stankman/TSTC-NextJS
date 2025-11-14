import { Heading } from "@/components/global/craft";
import ImageCarousel from "@/components/global/image-carousel/image-carousel";
import { Button } from "@/components/ui/button";
import { FeaturedMedia } from "@/types/wordpress";

interface ProgramFacilitiesProps {
  title?: string;
}

export default function ProgramFacilities({ title }: ProgramFacilitiesProps) {
    const images: FeaturedMedia[] = [
        {
          title: { rendered: "Welding Labs" },
          caption: { rendered: "State-of-the-art welding bays provide our students with the latest in fabrication and manufacturing experience." },
          source_url: "/dummies/dummy-image-2.jpeg",
          alt_text: "Dummy Image",
          id: 1,
          date: "",
          date_gmt: "",
          modified: "",
          modified_gmt: "",
          slug: "",
          status: "publish",
          link: "",
          guid: { rendered: "" },
          author: 0,
          media_type: "",
          mime_type: "",
          media_details: {
            width: 0,
            height: 0,
            file: "",
            sizes: {}
          },
          featured_media: 0,
        },
        {
          title: { rendered: "TSTC Airport" },
          caption: { rendered: "Learn in the largest airport run by an education institution, with real planes to fly and maintain." },
          source_url: "/dummies/dummy-image.jpeg",
          alt_text: "Dummy Image",
          id: 1,
          date: "",
          date_gmt: "",
          modified: "",
          modified_gmt: "",
          slug: "",
          status: "publish",
          link: "",
          guid: { rendered: "" },
          author: 0,
          media_type: "",
          mime_type: "",
          media_details: {
            width: 0,
            height: 0,
            file: "",
            sizes: {}
          },
          featured_media: 0,
        }
    ];

    return (
        <>
            { title && <Heading size="h2" className="lg:max-w-4/7">{title}</Heading>}
            <ImageCarousel images={images} className="my-10"></ImageCarousel>
        </>
    );
}