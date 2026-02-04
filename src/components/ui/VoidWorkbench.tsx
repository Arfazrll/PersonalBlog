'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';

interface ToolItem {
    name: string;
    icon: string;
}

interface VoidWorkbenchProps {
    tools: ToolItem[];
    className?: string;
}

export const VoidWorkbench = ({ tools, className }: VoidWorkbenchProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={containerRef} className={`relative min-h-[150vh] py-64 flex flex-col items-center bg-black overflow-hidden ${className}`}>

            {/* Shadow Smoke & Light Beams */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Volumetric Rays */}
                <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-white/[0.05] via-transparent to-transparent opacity-20" />
                <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-white/[0.05] via-transparent to-transparent opacity-20" />

                {/* Deep Void Fog */}
                <div className="absolute top-0 left-0 right-0 h-[50vh] bg-gradient-to-b from-background to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-[50vh] bg-gradient-to-t from-background to-transparent" />
            </div>

            {/* Header Transition */}
            <div className="relative z-10 text-center mb-48">
                <span className="text-[8px] font-black uppercase tracking-[2em] text-white/10">Void_Artifacts</span>
                <h2 className="text-8xl md:text-[12rem] font-black italic uppercase tracking-tighter mt-4 text-white/[0.03] select-none">
                    Workbench
                </h2>
            </div>

            {/* Materializing Tools */}
            <div className="relative z-10 w-full max-w-7xl px-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-12 gap-y-32">
                {tools.map((tool, idx) => (
                    <VoidArtifact key={tool.name} tool={tool} index={idx} />
                ))}
            </div>

            {/* Infinite Grain/Smoke Overlay */}
            <div className="absolute inset-0 z-20 pointer-events-none opacity-20 mix-blend-overlay"
                style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
        </div>
    );
};

const VoidArtifact = ({ tool, index }: { tool: ToolItem; index: number }) => {
    const itemRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: itemRef,
        offset: ["start end", "center center"]
    });

    // Materialization parameters
    const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [0, 0.4, 1]);
    const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
    const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
    const blur = useTransform(scrollYProgress, [0, 0.8, 1], ["40px", "10px", "0px"]);

    const springScale = useSpring(scale, { stiffness: 60, damping: 20 });
    const springY = useSpring(y, { stiffness: 60, damping: 20 });

    return (
        <motion.div
            ref={itemRef}
            style={{
                opacity,
                scale: springScale,
                y: springY,
                filter: `blur(${blur.get()})`
            }}
            className="group relative flex flex-col items-center justify-center py-12"
        >
            {/* Materialization Aura */}
            <div className="absolute inset-0 bg-primary/5 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            {/* The Borderless Icon */}
            <div className="relative w-24 h-24 md:w-32 md:h-32 mb-8">
                <Image
                    src={tool.icon}
                    alt={tool.name}
                    fill
                    className="object-contain grayscale group-hover:grayscale-0 group-hover:brightness-125 transition-all duration-1000 p-2"
                    unoptimized
                />
            </div>

            {/* Label emerging from smoke */}
            <div className="text-center overflow-hidden">
                <motion.span
                    className="block text-[10px] font-black uppercase tracking-[0.8em] text-white/20 group-hover:text-primary transition-colors duration-700"
                >
                    {tool.name}
                </motion.span>
                <div className="h-px w-0 group-hover:w-full bg-primary/20 mt-2 transition-all duration-1000 mx-auto" />
            </div>

            {/* Subtle light glint across the icon */}
            <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100">
                <motion.div
                    animate={{ x: ['-200%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                />
            </div>
        </motion.div>
    );
};
