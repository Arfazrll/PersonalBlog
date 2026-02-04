'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';

interface ToolItem {
    name: string;
    icon: string;
}

interface MonolithStackProps {
    tools: ToolItem[];
    className?: string;
}

export const MonolithStack = ({ tools, className }: MonolithStackProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={containerRef} className={`relative min-h-[200vh] py-64 flex flex-col items-center ${className}`}>

            {/* Shadow Smoke Transitions */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-background via-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-background via-black/80 to-transparent" />
            </div>

            {/* Header */}
            <div className="relative z-10 text-center mb-64 px-6">
                <span className="text-[10px] font-black uppercase tracking-[1.5em] text-white/20">Monolith_Protocol</span>
                <h2 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter mt-8 text-white/5 selection:bg-primary/20">
                    System<br />Stack
                </h2>
            </div>

            {/* Monolith Cards */}
            <div className="relative z-10 w-full max-w-4xl px-6 flex flex-col gap-32">
                {tools.map((tool, idx) => (
                    <MonolithCard key={tool.name} tool={tool} index={idx} />
                ))}
            </div>

            {/* Atmospheric Depth Mask */}
            <div className="absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
        </div>
    );
};

const MonolithCard = ({ tool, index }: { tool: ToolItem; index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "center center"]
    });

    const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.2, 1]);
    const rotateX = useTransform(scrollYProgress, [0, 1], [45, 0]);
    const blur = useTransform(scrollYProgress, [0, 0.8, 1], ["20px", "5px", "0px"]);

    const springScale = useSpring(scale, { stiffness: 100, damping: 30 });

    return (
        <motion.div
            ref={cardRef}
            style={{
                scale: springScale,
                opacity,
                rotateX,
            }}
            className="group relative h-[300px] md:h-[400px] w-full bg-neutral-900/60 border border-white/5 rounded-[3rem] overflow-hidden transform-gpu will-change-transform"
        >
            {/* Internal Shadow & Light */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />

            {/* Hover Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(var(--primary-rgb),0.1)_0%,transparent_50%)]" />

            <div className="flex h-full items-center px-12 md:px-24 gap-12 md:gap-24 relative z-10">
                {/* Tool Icon */}
                <div className="relative w-32 h-32 md:w-48 md:h-48 shrink-0">
                    <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <Image
                        src={tool.icon}
                        alt={tool.name}
                        fill
                        className="object-contain grayscale group-hover:grayscale-0 transition-all duration-700 p-4"
                        unoptimized
                    />
                </div>

                {/* Info */}
                <div className="flex flex-col justify-center gap-4">
                    <span className="text-[10px] font-mono text-white/20 tracking-[0.5em] uppercase">Core_Artifact // {index.toString().padStart(2, '0')}</span>
                    <h3 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white/80 group-hover:text-primary transition-colors duration-500">
                        {tool.name}
                    </h3>
                    <div className="h-px w-24 bg-primary/20 group-hover:w-48 transition-all duration-500" />
                </div>
            </div>

            {/* Edge Glint */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </motion.div>
    );
};
