"use client";

import { Heading } from "@/components/global/craft";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";

export default function SummaryBlock() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div id="summary" className="col-span-2">
                <Heading>Build the Future of Industry</Heading>
                <p className="text-lg">
                    Learn to maintain and service industrial equipment while mastering PLC programming, electrical systems, hydraulics, and welding. Our Advanced Manufacturing training labs simulate real-world environments, so you graduate ready to work. Industry partnerships ensure valuable experience employers want.
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