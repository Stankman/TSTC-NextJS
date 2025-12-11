import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { apiFetch } from "@/lib/api/api";
import { formatCurrency } from "@/lib/utils";
import { KualiSpecialization } from "@/types/kuali";
import { MapPin } from "lucide-react";

interface DegreePlanCardProps {
    title?: string;
    degreePlanId: string;
    tier: number;
}

export default async function DegreePlanCard({ title, degreePlanId, tier }: DegreePlanCardProps) {
    const specialization = await apiFetch<KualiSpecialization | null>(
        `/kuali/specializations/${degreePlanId}`,
        {
            tier
        },
        ["api", "specializations", `specialization:${degreePlanId}`]
    );
    
    if(!specialization) {
        return null;
    }

    if(!title) {
        title = specialization.title;
    }

    return (
        <Card
            className="text-foreground-tertiary rounded min-h-[250px] md:min-h-[350px] justify-between cursor-pointer"
        >
            <CardHeader className="space-y-2">
                <CardTitle className="text-xl">{title}</CardTitle>
                <CardDescription className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
                    <span className="text-xs text-muted-foreground">{specialization.code}</span>
                    <Badge variant="secondary" className="rounded font-normal">Completion Time: <span className="font-medium">{specialization.monthsToComplete} Months</span></Badge>
                </CardDescription>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-4">
                <div id="tuition" className="flex flex-col">
                    <Label className="font-normal">Estimated Tuition</Label>
                    <span className="font-medium text-xl">{formatCurrency(specialization.price || 0)}</span>
                </div>
                <div id="locations" className="flex items-center gap-2">
                    <div className="size-6 bg-destructive rounded-full p-1 flex items-center justify-center">
                        <MapPin className="text-destructive-foreground" />
                    </div>
                    <span className="text-sm">{specialization.locations.join(", ")}</span>
                    {/* <span className="text-muted-foreground">No available locations</span> */}
                </div>
                <div id="modalities" className="space-x-2">
                    {Array.isArray(specialization.modalities) && specialization.modalities.map((modality) => (
                        <Badge key={modality} className="text-sm font-normal">{modality}</Badge>
                    ))}
                </div>
            </CardFooter>
        </Card>
    );
}