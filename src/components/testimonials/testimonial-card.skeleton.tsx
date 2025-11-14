"use client";

import { Card, CardHeader, CardDescription, CardFooter } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function TestimonialCardSkeleton() {
    return (
        <Card className="relative w-full lg:max-w-[500px]">
            <CardHeader>
                <CardDescription className="text-primary text-xl space-y-2">
                   <Skeleton className="bg-gray-200 h-6 w-full" />
                   <Skeleton className="bg-gray-200 h-6 w-full" />
                </CardDescription>
            </CardHeader>
            <CardFooter className="flex-col items-start mt-4 space-y-2">
                <Skeleton className="bg-gray-200 h-6 w-32" />
                <Skeleton className="bg-gray-200 h-6 w-48" />
            </CardFooter>
        </Card>
    );
}