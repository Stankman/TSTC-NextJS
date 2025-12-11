"use client";

import { Heading } from "@/components/global/craft";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";

interface SummaryBlockProps {
    description?: string;
}

export default function SummaryBlock({ description }: SummaryBlockProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div id="summary" className="col-span-2">
                <Heading>Build the Future of Industry</Heading>
                <p className="text-lg">
                    {description}
                </p>
            </div>
            <div id="form" className="hidden lg:block">
                <Card className="border-none">
                    <CardHeader>
                        <Heading size="h5">Information Request</Heading>
                    </CardHeader>
                </Card>
            </div>
            <div className="block lg:hidden">
                <Button variant="outline" className="w-full">Request Information</Button>
            </div>
        </div>
    );
}