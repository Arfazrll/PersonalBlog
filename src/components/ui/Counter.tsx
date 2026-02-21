import { useRef, useEffect, useState } from 'react';
import { animate, useMotionValue, useTransform, useInView } from 'framer-motion';

export function Counter({ value, decimal = 0, duration = 3, delay = 0 }: { value: number, decimal?: number, duration?: number, delay?: number }) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => latest.toFixed(decimal));
    const [displayValue, setDisplayValue] = useState("0");
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (isInView) {
            const controls = animate(count, value, {
                duration,
                delay: delay + 0.2, // Small extra buffer after reveal
                ease: [0.16, 1, 0.3, 1],
            });
            return controls.stop;
        }
    }, [value, count, duration, delay, isInView]);

    useEffect(() => {
        return rounded.on("change", (v) => setDisplayValue(v));
    }, [rounded]);

    return <span ref={ref}>{displayValue}</span>;
}
