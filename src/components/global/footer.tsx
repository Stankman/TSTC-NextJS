"use client";

import { Button } from "../ui/button";
import { Container } from "./craft";
import Image from "next/image";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

export default function Footer() {
    return (
        <footer className="bg-primary text-primary-foreground py-6">
            <Container>
                <h2 className="text-4xl md:text-5xl lg:text-6xl">Your better life starts here.</h2>
                <div className="grid md:grid-cols-3 gap-4 my-6 md:my-8 lg:my-10">
                    <Button variant="accent" size="lg">Apply Now</Button>
                    <Button variant="outline" size="lg">Request Info</Button>
                    <Button variant="outline" size="lg">Book a Visit</Button>
                </div>
                <div className="grid md:grid-cols-8 gap-10">
                    <div className="md:col-span-2 lg:col-span-1 text-center md:text-left">
                        <Image
                            className="w-full md:w-32 h-16"
                            src="/tstc-logomark.svg" 
                            alt="Description" 
                            width={500} 
                            height={500} 
                        />
                        <div id="address" className="my-4">
                            3801 Campus Dr. Waco, TX 76705
                        </div>
                        <div id="phone">
                            800-792-8784
                        </div>
                    </div>
                    <div className="md:col-span-6 lg:col-span-7 grid md:grid-cols-3 gap-0 lg:gap-5">
                        <Accordion 
                            type="single"
                            collapsible
                        >
                            <AccordionItem value="item-1">
                                <AccordionTrigger>
                                    <span>Transparency & Compliance</span>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <p>We are committed to transparency and compliance in all our operations.</p>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        <Accordion 
                            type="single"
                            collapsible
                        >
                            <AccordionItem value="item-1">
                                <AccordionTrigger>
                                    <span>Resources</span>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <p>We are committed to transparency and compliance in all our operations.</p>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        <Accordion 
                            type="single"
                            collapsible
                        >
                            <AccordionItem value="item-1">
                                <AccordionTrigger>
                                    <span>Texas Resources</span>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <p>We are committed to transparency and compliance in all our operations.</p>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </Container>
        </footer>
    );
}