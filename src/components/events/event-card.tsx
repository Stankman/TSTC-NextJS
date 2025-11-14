"use client";

import Link from "next/link";
import { Heading } from "../global/craft";
import { ArrowRight } from "lucide-react";

interface EventCardProps {
    date: Date;
    title: string;
    description: string;
    linkUrl: string;
    linkText: string;
}

export default function EventCard({ date, title, description, linkUrl, linkText }: EventCardProps) {
    return (
        <Link href={linkUrl} className="group flex gap-4">
            <div className="flex-none bg-primary text-primary-foreground text-xl font-semibold text-center uppercase size-20 p-5 rounded-full flex items-center justify-center">
                {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </div>
            <div className="flex flex-col gap-3">
                <div>
                    <Heading size="h6" className="mb-2">{title}</Heading>
                    <p className="text-sm">{description}</p>
                </div>
                <div className="group-hover:underline text-link font-medium">
                    {linkText}
                    <ArrowRight className="text-destructive inline-block size-4 ml-1 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
            </div>
        </Link>
    );
}