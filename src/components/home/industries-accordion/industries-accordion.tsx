"use client"

import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Heading } from "@/components/global/craft";
import Image from "next/image";

type Industry = {
    id: string;
    name: string;
    image: string;
    programs?: string[];
};

const INDUSTRIES: Industry[] = [
    {
        id: "item-1",
        name: "Industry One",
        image: "/dummies/dummy-image.jpeg",
        programs: ["Program A", "Program B", "Program C", "Program D"],
    },
    {
        id: "item-2",
        name: "Industry Two",
        image: "/dummies/dummy-image-2.jpeg",
        programs: ["Program E", "Program F", "Program G", "Program H"],
    },
    {
        id: "item-3",
        name: "Industry Three",
        image: "/tstc-logomark.svg",
        programs: ["Program I", "Program J", "Program K", "Program L"],
    },
];

function IndustriesAccordion() {
    return (
        <>
            <Heading size="h2">What's your next move?</Heading>
            <Accordion
                type="single"
                collapsible
                id={"industries-accordion"}
                className="my-10"
            >
                {INDUSTRIES.map((industry) => (
                    <AccordionItem key={industry.id} value={industry.id}>
                        <AccordionTrigger
                            className="accordion-trigger group relative cursor-pointer hover:no-underline hover:bg-background-tertiary overflow-visible px-4 data-[state=open]:bg-primary data-[state=open]:text-primary-foreground"
                        >
                            <div>
                                <span className="text-xl lg:text-2xl">{industry.name}</span>
                                <Image
                                    src={industry.image}
                                    alt={industry.name}
                                    width={240}
                                    height={90}
                                    className="preview-img absolute hidden md:block w-60 h-[225%] -top-3/5 right-[10%] bg-primary opacity-0 group-hover:opacity-100 group-data-[state=open]:opacity-100 rounded object-cover transition-opacity duration-150"
                                />
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 lg:pt-10 bg-primary text-primary-foreground">
                            {industry.programs?.map((p) => (
                                <Item key={p} name={p} />
                            ))}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </>
    );
}

function Item({ name }: { name: string }) {
    return (
        <Link href="/" className="group text-base lg:text-lg flex justify-between items-center border-b border-b-current/20 last:border-b-0 py-2">
            <span>{name}</span>
            <span className="group-hover:underline">
                View Program <ArrowRight className="inline size-4 group-hover:translate-x-1 transition" />
            </span>
        </Link>
    );
}

export { IndustriesAccordion };