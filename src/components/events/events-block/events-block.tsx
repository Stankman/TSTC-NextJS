"use client";

import { Heading } from "@/components/global/craft";
import { Button } from "@/components/ui/button";
import EventCard from "../event-card";

interface EventsBlockProps {
    title?: string;
}

export default function EventsBlock({ title }: EventsBlockProps) {
    return (
        <>
            {title && <Heading size="h2">{title}</Heading>}
            <div className="grid lg:grid-cols-3 gap-4 my-8">
                <EventCard
                    date={new Date()}
                    title="Extended Registration"
                    description="Building Construction and Precision Machining are still registering! Registration closes on Friday, September 12!"
                    linkUrl="#"
                    linkText="Register Today!"
                />
                <EventCard
                    date={new Date()}
                    title="Event Title 2"
                    description="Event Description"
                    linkUrl="#"
                    linkText="Learn More"
                />
                <EventCard
                    date={new Date()}
                    title="Event Title 3"
                    description="Event Description"
                    linkUrl="#"
                    linkText="Learn More"
                />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-5">
                <Button variant="default">View All Events</Button>
            </div>
        </>
    );
}