"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";
import { formatCurrency, formatPercentage } from "@/lib/utils";

interface CounterProps {
    from: number;
    to: number;
    decimals?: number;
    type?: "money" | "percentage" | "number";
}

export default function Counter({ from, to, decimals = 0, type = "number" }: CounterProps) {
    const nodeRef = useRef<HTMLSpanElement>(null);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });
    
    useEffect(() => {
        const node = nodeRef.current;
        if (!node || !isInView) return;

        const controls = animate(from, to, {
            duration: 1,
            onUpdate(value) {
                const roundedValue = Math.round(value);
                let formatted: string;
                
                switch(type) {
                    case "money":
                        formatted = formatCurrency(roundedValue, true);
                        break;
                    case "percentage":
                        formatted = formatPercentage(roundedValue);
                        break;
                    case "number":
                    default:
                        formatted = roundedValue.toFixed(0);
                }
                
                node.textContent = formatted;
            }
        });

        return () => controls.stop();
    }, [from, to, decimals, type, isInView]);

    return <span ref={ref}><span ref={nodeRef}>{from}</span></span>;
}