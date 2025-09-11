import { Button } from "../ui/button";
import { Section } from "./craft";

export default function CTA() {
    return (
        <Section className="bg-background-tertiary text-foreground-tertiary">
            <div className="mb-5">
                <h2 className="font-bold text-4xl mb-2">Ready to enroll?</h2>
                <p className="font-light text-foreground-tertiary/80 text-xl">Our focus is on your success — and getting you to work fast.</p>
            </div>
            <div className="grid grid-cols-5 gap-4">
                <Button variant="default">Admissions</Button>
                <Button variant="default">How to Pay for College</Button>
            </div>
        </Section>
    );
}