"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "../craft";
import StoryCard from "../story-card/story-card";
import Link from "next/dist/client/link";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface FeaturedNewsProps {
    featured: number[];
    title?: string;
    subtitle?: string;
    rtl?: boolean;
}

export default function FeaturedNews({ featured, title, subtitle, rtl = false }: FeaturedNewsProps) {
    return (
        <div className="flex flex-col lg:flex-row gap-5">
            <div className={`${rtl ? 'lg:order-last' : 'lg:order-first'} order-first flex flex-col justify-between`}>
                <div>
                    { title && <Heading size="h2">{title}</Heading> }
                    { subtitle && <Heading size="h5" className="font-light">{subtitle}</Heading> }
                </div>
                <div className="hidden lg:block">
                    <Button size="lg" className="w-full" asChild>
                        <Link href="#">Meet Them</Link>
                    </Button>
                </div>
            </div>
            <ScrollArea className={`${rtl ? 'order-first' : 'order-last'}`}>
                <div className={`flex gap-5 mb-5 lg:mb-0`}>
                    {featured.map((story) => (
                    <StoryCard key={story} story={story} />
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
            <div className="block lg:hidden order-last">
                <Button size="lg" className="w-full" asChild>
                    <Link href="#">Meet Them</Link>
                </Button>
            </div>
        </div>
    );
}