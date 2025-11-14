import { Heading, Section } from "../craft";
import Image from "next/image";

interface DefaultBlockProps {
    title: string;
    imageSrc?: string;
    children?: React.ReactNode;
}

export default function DefaultBlock({ title, imageSrc, children }: DefaultBlockProps) {
    return (
        <Section>
            <div className="flex items-center justify-center gap-5">
                {imageSrc && <Image className="hidden lg:block" src={imageSrc} alt="Description of image" width={400} height={400} />}
                <div>
                    <Heading size="h3" className="font-bold text-center lg:text-left">{title}</Heading>
                    {children}
                </div>
            </div>
        </Section>
    );
}