import { DefaultBlock } from "@/types/wordpress";
import { Heading, Section } from "../global/craft";
import Image from "next/image";
import { getFeaturedMediaById } from "@/lib/wordpress/media/media";
import { Button } from "../ui/button";

interface FlexDefaultProps {
    properties: DefaultBlock;
}

export default async function FlexDefault({ properties }: FlexDefaultProps) {
    const defaultId = `default-${Math.random().toString(36).substr(2, 9)}`;

    const featuredMedia = await getFeaturedMediaById(properties.content.image);

    const position = properties.options?.position === "right" ? "lg:flex-row" : "lg:flex-row-reverse";

    return (
        <Section>
            <div id={defaultId} className={`flex flex-col gap-5 ${position}`}>
                <div id="default-header" className="block md:block lg:hidden order-0">
                    {properties.content.header && (<Heading size="h3" className="font-semibold">{properties.content.header}</Heading>)}
                </div>
                <div id="default-body" className="order-2 lg:order-1">
                    {properties.content.header && (<Heading size="h3" className="hidden md:hidden lg:block font-semibold">{properties.content.header}</Heading>)}

                    {properties.content.description && (<div dangerouslySetInnerHTML={{ __html: properties.content.description }} />)}

                    <Button className="my-4">Hello World</Button>
                </div>
                <div id="default-image" className="order-1 lg:order-2 overflow-hidden rounded">
                    <Image src={featuredMedia.source_url} alt={featuredMedia.alt_text} width={featuredMedia.media_details.width} height={featuredMedia.media_details.height} />
                </div>
            </div>
        </Section>
    );
}