"use client";

import { Skeleton } from "../ui/skeleton";

export default function EventCardSkeleton() {
    return (
        <div className="flex gap-4">
            <div className="flex-none size-20 rounded-full">
                <Skeleton className="size-20 rounded-full" />
            </div>
            <div className="flex flex-col gap-3 flex-1">
                <div>
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-2/3" />
                </div>
                <Skeleton className="h-4 w-24" />
            </div>
        </div>
    );
}