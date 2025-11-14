"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { MoveUpRight } from "lucide-react";
import Link from "next/link";

export default function OnetCardSkeleton() {
    return (
        <div className="w-full bg-primary text-white flex flex-col justify-between p-6 rounded min-h-[300px] md:min-h-[250px] md:max-w-[300px]">
            <div className="space-y-2 pb-2">
                <div id="title"><Skeleton className="bg-accent/40 h-5" /></div>
                <div className="text-5xl"><Skeleton className="bg-accent/40 h-10 w-20" /></div>
                <div className="text-2xl"><Skeleton className="bg-accent/40 h-6 w-32" /></div>
            </div>
            <div>
                <Skeleton className="bg-accent/40 h-6 w-48" />
            </div>
        </div>
    );
}