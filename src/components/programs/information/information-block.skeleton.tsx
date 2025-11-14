import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin } from "lucide-react";

export default function InformationBlockSkeleton() {
    return (
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div>
                <Label className="text-base font-normal">Estimated Tuition</Label>
                <Skeleton className="h-6"></Skeleton>
            </div>
            <div>
                <Label className="text-base font-normal">Industry</Label>
                <Skeleton className="h-6"></Skeleton>
            </div>
            <div>
                <Label className="text-base font-normal">Schedules</Label>
                <Skeleton className="h-6"></Skeleton>
            </div>
            <div>
                <Label className="text-base font-normal">Awards</Label>
                <Skeleton className="h-6"></Skeleton>
            </div>
            <div className="flex items-center gap-2">
                <div className="size-7 bg-destructive flex items-center justify-center rounded-full p-1"><MapPin /></div>
                <Skeleton className="h-6 w-full"></Skeleton>
            </div>
        </div>
    );
}