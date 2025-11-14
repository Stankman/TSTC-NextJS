"use client";

import { MoveUpRight } from "lucide-react";
import Link from "next/link";

export default function OnetCard() {
    return (
        <div className="w-full bg-primary text-white flex flex-col justify-between p-6 rounded min-h-[300px] md:min-h-[250px] md:max-w-[300px]">
            <div className="border-b border-b-white/40 space-y-2 pb-2">
                <div id="title">Occupation</div>
                <div className="text-5xl">$50000</div>
                <div className="text-2xl">Median Salary</div>
            </div>
            <div>
                <Link 
                    href={`https://www.onetonline.org/link/localwages/4000?st=TX`} 
                    target="_blank" 
                    className="hover:underline"
                >
                    Job Analysis Details <MoveUpRight className="inline" size={16} />
                </Link>
            </div>
        </div>
    );
}