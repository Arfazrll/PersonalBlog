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
    const baseX = useMotionValue(reverse ? -50 : 0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.matchMedia('(max-width: 768px)').matches);
        const handleResize = () => setIsMobile(window.matchMedia('(max-width: 768px)').matches);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

    // Refs not needed with new moveBy logic

    useAnimationFrame((t, delta) => {
        if (isMobile) return;

        let moveBy = baseVelocity * (delta / 1000);
        if (reverse) moveBy = -moveBy;
        
        moveBy += moveBy * velocityFactor.get();
        baseX.set(baseX.get() - moveBy);
    });

    return (
        <div
            className={cn("absolute left-1/2 top-1/2 opacity-90 w-[200vw] py-3 overflow-hidden whitespace-nowrap z-10", background, className)}
            style={{
                transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                transformOrigin: 'center center'
            }}
        >
            <motion.div
                className={cn(
                    "flex w-max whitespace-nowrap font-bold uppercase tracking-widest text-sm items-center",
                    textColor,
                    isMobile && (reverse ? "animate-marquee-reverse" : "animate-marquee")
                )}
                style={isMobile ? {} : { x }}
            >
                {Array.from({ length: 12 }).map((_, i) => (
                    <span key={i} className="flex items-center pr-10">
                        {children} <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50 ml-10" />
                    </span>
                ))}
            </motion.div>
        </div>
    );
}
