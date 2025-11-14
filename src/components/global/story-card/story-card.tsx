"use client";

import { Heading } from "@/components/global/craft";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

interface StoryCardProps {
    story?: number; 
}

export default function StoryCard({ story }: StoryCardProps) {
    return (
        <Link href="#" className="relative flex flex-col justify-end w-80 h-128 bg-gray-200 rounded p-5 overflow-hidden group">
            <Image src="/dummies/dummy-image-3.jpg" alt="Story Image" layout="fill" objectFit="cover" className="z-1 group-hover:scale-105 transition-transform duration-300" />
            <span className="absolute top-0 left-0 h-full w-full bg-linear-to-t from-black/80 to-transparent z-2"></span>
            <div className="relative z-3 text-white">
                <Heading size="h6" className="font-medium">Celebrating a legacy of success: TSTC honors alumnus at inaugural Distinguished Alumni Gala.</Heading>
                <Badge variant="outline">Environmental & Safety</Badge>
            </div>
        </Link>
    );
}