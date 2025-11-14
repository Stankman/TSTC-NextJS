import { Heading } from "@/components/global/craft";

interface HeroProps {
    text: string;
}

export default function Hero({ text }: HeroProps) {
    return (
        <>
            <Heading>{text}</Heading>
        </>
    );
}