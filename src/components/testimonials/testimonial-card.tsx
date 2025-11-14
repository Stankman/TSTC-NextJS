"use client";

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

export default function TestimonialCard() {
    return (
        <Card className="relative w-full lg:max-w-[500px]">
            <CardHeader>
                <CardDescription className="text-xl">
                    “I learned that the program was close to home, family-oriented, and I wanted to be a part of that while I studied for a nursing career.”
                </CardDescription>
            </CardHeader>
            <CardFooter className="flex-col items-start mt-4">
                <span className="font-semibold">Bryan Gonzalez</span>
                <div className="flex items-center justify-between">
                    <span className="text-foreground-gray">Advanced Emergency Medical Technician</span>
                </div>
            </CardFooter>
        </Card>
    );
}