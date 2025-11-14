import { ArrowRight, Clock, MapPin, Medal, Sun } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";

export default function CourseCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl lg:text-2xl">Forklift Certification</CardTitle>
            </CardHeader>
            <CardContent className="text-sm lg:text-base">
                <p>The Forklift Operator program will provide you with hands-on training as forklift operator and teach you safe practice for the workplace. Training can lead to positions in construction, logistics, or manufacturing</p>
                <ul className="my-4 space-y-2">
                    <li><Medal className="inline text-secondary/70 size-4 mr-2" />Industry Based Credential</li>
                    <li><Clock className="inline text-secondary/70 size-4 mr-2" />Two eight-hour days</li>
                    <li><Sun className="inline text-secondary/70 size-4 mr-2" />Day Class</li>
                    <li><MapPin className="inline text-secondary/70 size-4 mr-2" />Waco</li>
                </ul>
                <div className="text-base lg:text-xl">Estimated Price: <span className="font-bold">$150</span></div>
            </CardContent>
            <CardFooter className="justify-end">
                <Button size="sm">Read More <ArrowRight /></Button>
            </CardFooter>
        </Card>
    );
}