import { AccordionBlock } from "@/types/wordpress";
import { Heading, Section } from "../global/craft";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

interface FlexAccordionProps {
    properties: AccordionBlock;
}

export default function FlexAccordion({ properties }: FlexAccordionProps) {
    const accordionId = `accordion-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <Section>
            <div id={accordionId} className="flex flex-col lg:flex-row">
                <div id="accordion-header" className="shrink-0 lg:w-3/6">
                    {properties.content.header && (<Heading size="h3" className="font-semibold">{properties.content.header}</Heading>)}
                    {properties.content.description && (<div dangerouslySetInnerHTML={{ __html: properties.content.description }} />)}
                </div>
                <div id="accordion-container" className="grow-1 mt-6 lg:mt-0 lg:ml-12">
                    <Accordion
                        type="single"
                        collapsible
                    >
                        {properties.content.items.map((item, index) => (
                            <AccordionItem key={index} value={`${accordionId}-item-${index}`}>
                                <AccordionTrigger className="font-semibold">{item.title}</AccordionTrigger>
                                <AccordionContent>
                                    <div dangerouslySetInnerHTML={{ __html: item.content }} />
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </Section>
    );
}