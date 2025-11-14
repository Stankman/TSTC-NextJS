"use client";

import { ArrowRight } from "lucide-react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function ProgramCardSkeleton() {
    return (
        <Card className="group bg-transparent shadow-none border-0 p-0 text-foreground-tertiary h-full justify-between">
            <CardHeader className="p-0">
                <Skeleton className="rounded h-[190px] mb-1" />
                <Skeleton className="h-6 w-3/4 mb-4" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
            </CardHeader>
            <CardFooter className="p-0">
                <Skeleton className="h-5 w-2/4" />
            </CardFooter>
        </Card>
    );
}