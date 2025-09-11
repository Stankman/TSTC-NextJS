"use client";

import { Section } from "./craft";

interface BlockProps {
    children?: React.ReactNode;
    title?: string;
}

function Block({ children, title }: BlockProps) {
    <Section>
        <h2>{title}</h2>
        {children}
    </Section>
}

export default Block;