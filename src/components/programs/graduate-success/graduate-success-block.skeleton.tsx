"use client";

import { Heading } from "@/components/global/craft";
import TestimonialCardSkeleton from "@/components/testimonials/testimonial-card.skeleton";
import OnetCardSkeleton from "../onet/onet-card.skeleton";

export default function GraduateSuccessBlockSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex items-center w-full md:my-4 order-1 md:order-3 md:col-span-2 lg:max-w-2/3">
                <Heading>Envision your future through the experiences of our graduates.</Heading>
            </div>
            <div className="flex justify-center order-2 md:order-1">
                <TestimonialCardSkeleton />
            </div>
            <div className="flex md:justify-center order-3 md:order-2">
                <OnetCardSkeleton />
            </div>
            <div className="flex md:justify-center order-5 md:order-4">
                <OnetCardSkeleton />
            </div>
            <div className="flex justify-center order-4 md:order-5">
                <TestimonialCardSkeleton />
            </div>
        </div>
    );
}