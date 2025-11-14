import { Heading } from "@/components/global/craft";
import DegreePlanCard from "../degree-plan-card";
import DegreePlanCardSkeleton from "../degree-plan-card.skeleton";

interface DegreePlansBlockProps {
    title?: string;
}

export default function DegreePlansBlock({ title }: DegreePlansBlockProps) {
    return (
        <>
            { title && <Heading size="h2">{title}</Heading> }
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <DegreePlanCard />
                <DegreePlanCard />
                <DegreePlanCard />
                <DegreePlanCardSkeleton />
            </div>
        </>
    );
}