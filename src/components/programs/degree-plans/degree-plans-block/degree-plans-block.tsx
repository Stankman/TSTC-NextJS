import { Heading } from "@/components/global/craft";
import DegreePlanCard from "../degree-plan-card";
import DegreePlanCardSkeleton from "../degree-plan-card.skeleton";
import { Suspense } from "react";
import Link from "next/link";

interface DegreePlansBlockProps {
    title?: string;
    degreePlans?: Array<{
        degree_plan_title?: string;
        degree_plan_id: string;
    }>;
    tier: number;
}

export default function DegreePlansBlock({ title, degreePlans, tier }: DegreePlansBlockProps) {
    return (
        <>
            { title && <Heading size="h2">{title}</Heading> }
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                { degreePlans && (
                    degreePlans.map((plan) => (
                        <Suspense key={plan.degree_plan_id} fallback={<DegreePlanCardSkeleton />}>
                            <Link href={"/curriculum/" + plan.degree_plan_id} >
                                <DegreePlanCard title={plan.degree_plan_title} degreePlanId={plan.degree_plan_id} tier={tier} />
                            </Link>
                        </Suspense>
                    ))
                )}
            </div>
        </>
    );
}