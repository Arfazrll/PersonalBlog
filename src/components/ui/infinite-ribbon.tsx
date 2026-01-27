'use client';

import { cn } from '@/lib/utils';
import { useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// Local wrap utility
const wrap = (min: number, max: number, v: number) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface InfiniteRibbonProps {
    children: React.ReactNode;
    baseVelocity?: number;
    rotation?: number;
    reverse?: boolean;
    className?: string;
    background?: string;
    textColor?: string;
}

export function InfiniteRibbon({
    children,
    baseVelocity = 2,
    rotation = 0,
    reverse = false,
    className,
    background = "bg-primary",
    textColor = "text-primary-foreground"
}: InfiniteRibbonProps) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });

    const [viewportWidth, setViewportWidth] = useState(0);

    useEffect(() => {
        setViewportWidth(window.innerWidth);
        const handleResize = () => setViewportWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const x = useTransform(baseX, (v) => `${wrap(-100, 0, v % 100)}%`);

    const directionFactor = useRef<number>(reverse ? -1 : 1);
    const finalVelocity = reverse ? -baseVelocity : baseVelocity;

    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * finalVelocity * (delta / 1000);

        // Optional: Make it reactive to scroll speed
        // if (velocityFactor.get() < 0) {
        //   directionFactor.current = -1;
        // } else if (velocityFactor.get() > 0) {
        //   directionFactor.current = 1;
        // }

        // Increase speed based on scroll
        moveBy += directionFactor.current * moveBy * velocityFactor.get() * 0.5;

        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div
            className={cn("absolute left-1/2 top-1/2 opacity-90 w-[200vw] py-3 overflow-hidden whitespace-nowrap z-10", background, className)}
            style={{
                transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                transformOrigin: 'center center'
            }}
        >
            <motion.div className={cn("flex whitespace-nowrap gap-10 font-bold uppercase tracking-widest text-sm items-center", textColor)} style={{ x }}>
                {Array.from({ length: 12 }).map((_, i) => (
                    <span key={i} className="flex items-center gap-4">
                        {children} <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50" />
                    </span>
                ))}
            </motion.div>
        </div>
    );
}
