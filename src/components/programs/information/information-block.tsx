import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/utils";
import { getAwardById } from "@/lib/wordpress/awards/wp-awards";
import { getCampusById } from "@/lib/wordpress/campuses/wp-campuses";
import { getIndustryById } from "@/lib/wordpress/industries/wp-industries";
import { getScheduleById } from "@/lib/wordpress/schedules/wp-schedules";
import { MapPin } from "lucide-react";
import Link from "next/link";

interface InformationBlockProps {
    industryIds: number[];
    scheduleIds: number[];
    awardIds: number[];
    campusIds: number[];
}

export default async function InformationBlock({ industryIds, scheduleIds, awardIds, campusIds }: InformationBlockProps) {

    const [industry, schedules, awards, campuses] = await Promise.all([
        getIndustryById(industryIds[0]),
        Promise.all(scheduleIds.map(id => getScheduleById(id))),
        Promise.all(awardIds.map(id => getAwardById(id))),
        Promise.all(campusIds.map(id => getCampusById(id)))
    ]);

    return (
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div>
                <Label className="text-base font-normal">Estimated Tuition</Label>
                <span className="text-xl font-medium">{formatCurrency(10000)}</span>
            </div>
            <div>
                <Label className="text-base font-normal">Industry</Label>
                <span className="text-xl font-medium" dangerouslySetInnerHTML={{__html: industry?.name}}></span>
            </div>
            <div>
                <Label className="text-base font-normal">Schedules</Label>
                <span className="text-xl font-medium" dangerouslySetInnerHTML={{__html: schedules.map(schedule => schedule.name).join(", ")}}></span>
            </div>
            <div>
                <Label className="text-base font-normal">Awards</Label>
                <span className="text-xl font-medium" dangerouslySetInnerHTML={{__html: awards.map(award => award.name).join(", ")}}></span>
            </div>
            <div className="flex gap-2">
                <div className="size-7 bg-destructive flex items-center justify-center rounded-full p-1"><MapPin /></div>
                <div>
                {campuses.map((campus, index) => (
                <span key={campus.id}>
                    <Link href={`/campuses/${campus.slug}`} className="hover:underline">
                    {campus.name}
                    </Link>
                {index < campuses.length - 1 && ", "}
                </span>
                ))}
                </div>
            </div>
        </div>
    );
}