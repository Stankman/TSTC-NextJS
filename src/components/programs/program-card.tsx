"use client";

import { ArrowRight } from "lucide-react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Program } from "@/types/wordpress";

interface ProgramCardProps {
    program: Program;
}

export default function ProgramCard({ program }: ProgramCardProps) {
    return (
        <Card className="group bg-transparent shadow-none border-0 p-0 text-foreground-tertiary h-full justify-between">
            <CardHeader className="p-0">
                <div className="rounded overflow-hidden">
                    <Image
                        src="/dummies/dummy-image-3.jpg"
                        alt="Advanced Manufacturing"
                        width={580}
                        height={470}
                        className="size-full max-h-[250px] rounded object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                    />
                </div>
                <CardTitle className="text-lg" dangerouslySetInnerHTML={{ __html: program.title.rendered }} />
                {program.acf.short_description && (
                    <CardDescription className="text-current" dangerouslySetInnerHTML={{ __html: program.acf.short_description }} />
                )}
            </CardHeader>
            <CardFooter className="p-0">
                <span className="group-hover:underline text-sm text-link font-medium">
                    Program Details <ArrowRight className="inline size-4 group-hover:translate-x-1 transition text-destructive" />
                </span>
                
            </CardFooter>
        </Card>
    );
}