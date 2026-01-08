import { StatsBlock } from "@/types/wordpress";
import { Heading, Section } from "../global/craft";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import Counter from "../global/counter";

interface FlexStatsProps {
    properties: StatsBlock;
}

export default function FlexStats({ properties }: FlexStatsProps) {
    const statsId = `stats-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <Section>
            <div id={statsId}>
                <div id="stats-header">
                    {properties.content.header && (<Heading size="h3" className="font-semibold">{properties.content.header}</Heading>)}
                    {properties.content.description && (<div dangerouslySetInnerHTML={{ __html: properties.content.description }} className="mb-6" />)}
                </div>
                <div id="stats-container" className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}>
                    {properties.content.items.map((item, index) => (
                        <div key={index} className="space-y-5 text-center">
                            <Heading size="h1" className="font-bold text-destructive">
                                <Counter from={0} to={item.value} type={item.type as "money" | "percentage" | "number"} />
                            </Heading>
                            <Heading size="h6" className="font-semibold">{item.title}</Heading>
                            {item.link && (<Button variant="secondary" size="sm" asChild><Link href={item.link.url} target={item.link.target}>{item.link.title} <ArrowRightIcon /></Link></Button>)}
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}