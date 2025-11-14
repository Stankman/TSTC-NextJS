import { PhoneCall } from "lucide-react";
import { Button } from "../ui/button";
import { Heading, Section } from "./craft";

interface CTAProps {
    title?: string;
    subtitle?: string;
}

export default function CTA({ title, subtitle }: CTAProps) {
    return (
        <Section variant="secondary" className="text-center">
            <div className="mb-5">
                { title && <Heading size="h2" className="font-bold">{title}</Heading>}
                { subtitle && <p className="font-light text-xl">{subtitle}</p>}
            </div>
            <div className="flex items-center justify-center gap-4">
                <Button variant="secondary">Request More Information</Button>
                <Button variant="default"><PhoneCall />  Call Us 254-867-3309</Button>
            </div>
        </Section>
    );
}