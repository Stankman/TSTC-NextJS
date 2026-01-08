import { apiFetch } from "@/lib/api/api";
import { formatCurrency } from "@/lib/utils";
import { OnetSerie } from "@/types/onet";
import { OnetProps } from "@/types/wordpress";
import { MoveUpRight } from "lucide-react";
import Link from "next/link";

interface OnetCardProps {
    serie: OnetProps;
}

export default async function OnetCard({ serie }: OnetCardProps) {
    const occupation: OnetSerie = await apiFetch(`/onet/${serie.onet_id}`);
    return (
        <div className="w-full bg-primary text-white flex flex-col justify-between p-6 rounded min-h-[300px] md:min-h-[250px] md:max-w-[300px]">
            <div className="border-b border-b-white/40 space-y-2 pb-2">
                <div id="title">{occupation.occupation}</div>
                <div className="text-5xl">{formatCurrency(occupation.annualMedian)}</div>
                <div className="text-2xl">Median Salary</div>
            </div>
            <div>
                <Link 
                    href={serie.onet_url} 
                    target="_blank" 
                    className="hover:underline"
                >
                    Job Analysis Details <MoveUpRight className="inline" size={16} />
                </Link>
            </div>
        </div>
    );
}