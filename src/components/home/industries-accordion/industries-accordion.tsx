"use client"

import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

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
        image: "/tstc-logo.svg",
        programs: ["Program A", "Program B", "Program C", "Program D"],
    },
    {
        id: "item-2",
        name: "Industry Two",
        image: "/tstc-logomark.svg",
        programs: ["Program E", "Program F", "Program G", "Program H"],
    },
];

function IndustriesAccordion() {
    return (
        <Accordion
            type="single"
            collapsible
            id={"industries-accordion"}
        >
            {INDUSTRIES.map((industry) => (
                <AccordionItem key={industry.id} value={industry.id}>
                    <AccordionTrigger
                        className="accordion-trigger group relative cursor-pointer hover:no-underline hover:bg-background-tertiary data-[state=open]:bg-primary data-[state=open]:text-primary-foreground overflow-visible"
                    >
                        <div className="w-full">
                            <span className="block">{industry.name}</span>
                            <img
                                src={industry.image}
                                alt={industry.name}
                                className="preview-img absolute hidden md:block w-60 h-[225%] -top-3/5 right-[10%] bg-red-500 opacity-0 group-hover:opacity-100 group-data-[state=open]:opacity-100 rounded object-cover transition-opacity duration-150"
                            />
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="bg-primary text-primary-foreground pt-4">
                        {industry.programs?.map((p) => (
                            <Item key={p} name={p} />
                        ))}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
}

function Item({ name }: { name: string }) {
    return (
        <Link href="/" className="group flex justify-between items-center border-b last:border-b-0 py-2">
            <span>{name}</span>
            <span className="group-hover:underline">
                View Program <ArrowRight className="inline size-4 group-hover:translate-x-1 transition" />
            </span>
        </Link>
    );
}

export { IndustriesAccordion };