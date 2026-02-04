'use client';

import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';

interface ToolItem {
    name: string;
    icon: string;
}

interface OrbitalWorkbenchProps {
    tools: ToolItem[];
    className?: string;
}

export const OrbitalWorkbench = ({ tools, className }: OrbitalWorkbenchProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 25,
        damping: 20,
        mass: 0.5, // Lighter mass for faster response with less overhead
        restDelta: 0.01
    });

    // Orbital configuration
    const orbits = useMemo(() => {
        const rings = [
            { radius: 250, speed: 1.2, tools: tools.slice(0, 3) },
            { radius: 450, speed: -0.8, tools: tools.slice(3, 7) },
            { radius: 650, speed: 0.6, tools: tools.slice(7) }
        ];
        return rings;
    }, [tools]);

    return (
        <div ref={containerRef} className={`relative min-h-[250vh] py-64 flex items-center justify-center bg-black overflow-hidden ${className}`}>

            {/* The Infinite Void Space */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Central Flare - Static for performance */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/[0.02] rounded-full blur-[100px]" />

                {/* Orbital Paths (Visual Guides) */}
                {orbits.map((ring, i) => (
                    <div
                        key={i}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-white/[0.015] rounded-full pointer-events-none"
                        style={{ width: ring.radius * 2, height: ring.radius * 2 }}
                    />
                ))}

                {/* Shadow Smoke - Dark Gray Swirls */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] opacity-30 mix-blend-overlay will-change-transform transform-gpu"
                    style={{ backgroundImage: 'radial-gradient(circle, transparent 40%, #111 70%, black 100%)' }}
                />
            </div>

            {/* Sticky Kinetic Stage */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden transform-gpu">

                {/* Central Energy Core */}
                <div className="relative z-10 flex flex-col items-center will-change-transform">
                    <motion.div
                        animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 6, repeat: Infinity }}
                        className="w-32 h-32 bg-primary rounded-full blur-2xl"
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                        <span className="block text-[8px] font-black uppercase tracking-[1.5em] text-primary/30">Catalyst</span>
                        <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white/5 select-none">ORBITAL</h2>
                    </div>
                </div>

                {/* The Orbital Array */}
                <div className="absolute inset-0 flex items-center justify-center transform-gpu" style={{ perspective: '1200px' }}>
                    {orbits.map((ring, ringIdx) => (
                        <OrbitalRing
                            key={ringIdx}
                            ring={ring}
                            progress={smoothProgress}
                            index={ringIdx}
                        />
                    ))}
                </div>
            </div>

            {/* Bottom Gradient for Transition */}
            <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-background to-transparent z-30 pointer-events-none" />
        </div>
    );
};

const OrbitalRing = ({ ring, progress, index }: { ring: any; progress: any; index: number }) => {
    // Rotation based on scroll - Shared for the entire ring
    const rotate = useTransform(progress, [0, 1], [0, 360 * ring.speed]);
    const counterRotate = useTransform(rotate, r => -r);

    // Pre-calculate tool positions to save CPU cycles during scroll
    const toolPositions = useMemo(() => ring.tools.map((tool: ToolItem, toolIdx: number) => {
        const angle = (toolIdx / ring.tools.length) * (2 * Math.PI);
        return {
            x: Math.cos(angle) * ring.radius,
            y: Math.sin(angle) * ring.radius,
            id: `${tool.name}-${index}-${toolIdx}`
        };
    }), [ring.tools, ring.radius, index]);

    return (
        <motion.div
            style={{
                width: ring.radius * 2,
                height: ring.radius * 2,
                rotate,
            }}
            className="absolute flex items-center justify-center pointer-events-none will-change-transform transform-gpu"
        >
            {ring.tools.map((tool: ToolItem, toolIdx: number) => (
                <motion.div
                    key={tool.name}
                    className="absolute group pointer-events-auto will-change-transform transform-gpu"
                    style={{
                        x: toolPositions[toolIdx].x,
                        y: toolPositions[toolIdx].y
                    }}
                >
                    {/* The Tool Satellite */}
                    <div className="relative flex flex-col items-center">
                        <motion.div style={{ rotate: counterRotate }}>
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="relative w-16 h-16 md:w-24 md:h-24 transition-transform duration-300 transform-gpu"
                            >
                                <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <Image
                                    src={tool.icon}
                                    alt={tool.name}
                                    fill
                                    className="object-contain grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-opacity duration-300 p-2"
                                    unoptimized
                                    priority={index === 0}
                                />
                            </motion.div>

                            {/* Floating Metadata - Optimized transitions */}
                            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 w-32 text-center pointer-events-none">
                                <span className="block text-[8px] font-black uppercase tracking-[0.5em] text-primary mb-1">{tool.name}</span>
                                <div className="h-px w-0 group-hover:w-full bg-primary/20 transition-all duration-300 mx-auto" />
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
};
