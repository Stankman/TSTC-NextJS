import { GridBlock } from "@/types/wordpress";
import { Heading, Section } from "../global/craft";
import { Button } from "../ui/button";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

interface FlexGridProps {
    properties: GridBlock;
}

export default function FlexGrid({ properties }: FlexGridProps) {
    const gridId = `grid-${Math.random().toString(36).substr(2, 9)}`;

    const columns = properties.options?.columns || 3;

    return (
        <Section>
            <div id={gridId}>
                <div id="grid-header" className="mb-6">
                    {properties.content.header && (<Heading size="h3" className="font-semibold">{properties.content.header}</Heading>)}
                    {properties.content.description && (<div dangerouslySetInnerHTML={{ __html: properties.content.description }} />)}
                </div>
                <div id="grid-container" className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-6`}>
                    {properties.content.items.map((item, index) => (
                        <div key={index} className="space-y-5">
                            <Heading size="h6" className="font-semibold">{item.title}</Heading>
                            <div dangerouslySetInnerHTML={{ __html: item.content }} />
                            {item.link && (<Button className="float-right" variant="secondary" size="sm" asChild><Link href={item.link.url} target={item.link.target}>{item.link.title} <ArrowRightIcon /></Link></Button>)}
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}