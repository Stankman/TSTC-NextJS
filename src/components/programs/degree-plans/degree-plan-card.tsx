"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/utils";
import { MapPin } from "lucide-react";
import { motion } from "motion/react";

const MotionCard = motion(Card);

export default function DegreePlanCard() {
    return (
        <MotionCard
            className="text-foreground-tertiary rounded min-h-[250px] md:min-h-[350px] justify-between cursor-pointer"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ 
                scale: 1.02,
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                transition: { duration: 0.2 }
            }}
            transition={{ 
                duration: 0.3, 
                ease: "easeOut"
            }}
        >
            <CardHeader className="space-y-2">
                <CardTitle className="text-xl">Degree Plan Title</CardTitle>
                <CardDescription className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
                    <span className="text-xs text-muted-foreground">AMA.AAS</span>
                    <Badge variant="secondary" className="rounded font-normal">Completion Time: <span className="font-medium">2 Years</span></Badge>
                </CardDescription>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-4">
                <div id="tuition" className="flex flex-col">
                    <Label className="font-normal">Estimated Tuition</Label>
                    <span className="font-medium text-xl">{formatCurrency(10000)}</span>
                </div>
                <div id="locations" className="flex items-center gap-2">
                    <div className="size-6 bg-destructive rounded-full p-1 flex items-center justify-center">
                        <MapPin className="text-destructive-foreground" />
                    </div>
                    <span className="text-sm">Waco, Harlingen</span>
                    {/* <span className="text-muted-foreground">No available locations</span> */}
                </div>
                <div id="modalities" className="space-x-2">
                    <Badge className="text-sm font-normal">Hybrid</Badge>
                    <Badge className="text-sm font-normal">Online</Badge>
                </div>
            </CardFooter>
        </MotionCard>
    );
}