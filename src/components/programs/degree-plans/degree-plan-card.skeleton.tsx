"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin } from "lucide-react";
import { motion } from "motion/react";

export default function DegreePlanCardSkeleton() {

    const MotionCard = motion(Card);
    
    return (
        <MotionCard
            className="text-foreground-tertiary rounded min-h-[250px] md:min-h-[350px] justify-between"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ 
                duration: 0.3, 
                ease: "easeOut"
            }}
        >
            <CardHeader className="space-y-2">
                <CardTitle className="text-xl"><Skeleton className="bg-gray-200 h-6" /></CardTitle>
                <CardDescription className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
                    <Skeleton className="bg-gray-200 w-15 h-5" />
                    <Skeleton className="bg-gray-200 w-1/2 h-6" />
                </CardDescription>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-4">
                <div id="tuition" className="space-y-2">
                    <Skeleton className="bg-gray-200 w-40 h-5" />
                    <Skeleton className="bg-gray-200 w-20 h-5" />
                </div>
                <div id="locations" className="flex items-center gap-2">
                    <Skeleton className="bg-gray-200 size-6 rounded-full" />
                    <Skeleton className="bg-gray-200 w-20 h-5" />
                </div>
                <div id="modalities" className="flex gap-2">
                    <Skeleton className="bg-gray-200 w-15 h-5" />
                    <Skeleton className="bg-gray-200 w-15 h-5" />
                </div>
            </CardFooter>
        </MotionCard>
    );
}