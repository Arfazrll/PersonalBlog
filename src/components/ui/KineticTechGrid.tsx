import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import { usePerformance } from '@/hooks/usePerformance';

interface TechItem {
    name: string;
    icon: string;
}

interface KineticTechGridProps {
    items: TechItem[];
    className?: string;
}

export const KineticTechGrid = ({ items, className }: KineticTechGridProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { isLowPowerMode } = usePerformance();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    return (
        <div ref={containerRef} className={className}>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 relative">
                {items.map((tech, idx) => (
                    <TechCard
                        key={`${tech.name}-${idx}`}
                        tech={tech}
                        idx={idx}
                        scrollYProgress={scrollYProgress}
                        isLowPowerMode={isLowPowerMode}
                    />
                ))}
            </div>
        </div>
    );
};

const TechCard = ({ tech, idx, scrollYProgress, isLowPowerMode }: { tech: TechItem, idx: number, scrollYProgress: any, isLowPowerMode?: boolean }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    // Simplified parallax with clamped values for better performance
    const yRange = idx % 2 === 0 ? [30, -30] : [-30, 30];
    const rotateRange = idx % 2 === 0 ? [5, -5] : [-5, 5];

    const yOffset = useTransform(scrollYProgress, [0, 1], yRange);
    const rotateOffset = useTransform(scrollYProgress, [0, 1], rotateRange);

    // Reduced spring stiffness for smoother, less calculation-heavy animation
    const springY = useSpring(yOffset, { stiffness: 60, damping: 25, restDelta: 0.001 });
    const springRotate = useSpring(rotateOffset, { stiffness: 60, damping: 25, restDelta: 0.001 });

    return (
        <motion.div
            ref={cardRef}
            style={isLowPowerMode ? {} : {
                y: springY,
                rotateZ: springRotate,
                willChange: 'transform' // GPU hint
            }}
            whileHover={{ scale: 1.05, zIndex: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="group relative h-48 rounded-3xl overflow-hidden border border-border/50 bg-card text-card-foreground flex flex-col items-center justify-center gap-6 p-8 transition-colors hover:border-primary/50 hover:bg-muted/50 shadow-sm dark:shadow-none"
        >
            <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="w-16 h-16 relative">
                <Image
                    src={tech.icon}
                    alt={tech.name}
                    fill
                    className="object-contain grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500 unoptimized"
                    unoptimized
                />
            </div>

            <div className="text-center relative z-10">
                <span className="block text-[10px] font-black tracking-[0.3em] uppercase text-muted-foreground group-hover:text-primary transition-colors">
                    {tech.name}
                </span>
                <div className="mt-2 w-0 group-hover:w-full h-[1px] bg-primary mx-auto transition-all duration-500" />
            </div>

            {/* Micro-details for "Blueprint" aesthetic */}
            <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-100 transition-opacity">
                <span className="font-mono text-[8px]">{idx.toString(16).padStart(2, '0')}</span>
            </div>
        </motion.div>
    );
};
