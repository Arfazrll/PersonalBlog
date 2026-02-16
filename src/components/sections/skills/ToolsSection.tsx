'use client';

import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useState, useRef, useEffect } from 'react';

import { usePerformance } from '@/hooks/usePerformance';

// Logo mapping
const toolLogos: Record<string, string> = {
    'VS Code': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
    'Figma': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
    'Postman': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg',
    'GitHub': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
    'Linux': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
    'Jupyter': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg',
    'Docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    'Git': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    'Conda': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/anaconda/anaconda-original.svg',
    'Google Colab': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecolab/googlecolab-original.svg',
};

export const ToolsSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { isLowPowerMode } = usePerformance();
    const mouseX = useMotionValue(-1000);
    const mouseY = useMotionValue(-1000);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isLowPowerMode) return;
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            mouseX.set(e.clientX - rect.left);
            mouseY.set(e.clientY - rect.top);
        }
    };

    const handleMouseLeave = () => {
        // Optional: Reset or leave as is
    };

    return (
        <section
            id="tools"
            className="py-32 relative bg-background min-h-screen flex flex-col items-center justify-center overflow-hidden"
        >
            {/* BACKGROUND AMBIENCE */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--background)_0%,_#050505_100%)] z-0" />

            {/* NOISE FILTER for Texture */}
            <div className="absolute inset-0 opacity-[0.03] z-0 pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}
            />

            {/* HEADER */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 text-center mb-24 mix-blend-difference pointer-events-none select-none"
            >
                <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.5 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-[10px] font-mono uppercase tracking-[0.6em] text-white/50 block mb-4 animate-pulse-slow"
                >
                    Domain // 04
                </motion.span>
                <h2 className="text-4xl md:text-7xl font-sans font-thin text-white/90 tracking-[0.2em] uppercase transition-all duration-700">
                    Technical <span className="font-serif italic text-white/40">TOOLS</span>
                </h2>
            </motion.div>

            {/* INTERACTIVE GRID */}
            <div
                ref={containerRef}
                className="relative z-20 w-full max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-16 md:gap-24"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                {portfolioData.tools.map((tool, index) => (
                    <MistItem
                        key={tool.name}
                        tool={tool}
                        mouseX={mouseX}
                        mouseY={mouseY}
                        index={index}
                        isLowPowerMode={isLowPowerMode}
                    />
                ))}
            </div>

            <div className="absolute bottom-12 text-center w-full pointer-events-none opacity-30 text-white/50">
                <p className="text-[10px] font-mono uppercase tracking-[0.4em]">
                    --- Daily Arsenal ---
                </p>
            </div>
        </section>
    );
};

const MistItem = ({ tool, mouseX, mouseY, index = 0, isLowPowerMode }: { tool: any, mouseX: any, mouseY: any, index?: number, isLowPowerMode?: boolean }) => {
    const itemRef = useRef<HTMLDivElement>(null);
    const iconUrl = toolLogos[tool.name] || (tool.icon?.includes('http') ? tool.icon : `https://cdn.simpleicons.org/${tool.name.toLowerCase().replace(/[\s.]/g, '')}`);

    // Distance Calculation (Memoized or conditional)
    const distance = useTransform([mouseX, mouseY], ([x, y]) => {
        if (isLowPowerMode || !itemRef.current) return 1000;

        const rect = itemRef.current.getBoundingClientRect();
        const container = itemRef.current.parentElement?.getBoundingClientRect();
        if (!container) return 1000;

        const centerX = (rect.left - container.left) + rect.width / 2;
        const centerY = (rect.top - container.top) + rect.height / 2;

        const dx = (x as number) - centerX;
        const dy = (y as number) - centerY;
        return Math.sqrt(dx * dx + dy * dy);
    });

    // --- ANIMATIONS ---
    const blur = useTransform(distance, [0, 500], [0, 2]);
    const opacity = useTransform(distance, [0, 400], [1, 0.4]);
    const scale = useTransform(distance, [0, 300], [1.1, 0.9]);
    const grayscale = useTransform(distance, [0, 200], [0, 80]);
    const y = useTransform(distance, [0, 300], [-10, 0]);

    // Use motion templates conditionally or handle in style
    const filterValue = useMotionTemplate`blur(${blur}px) grayscale(${grayscale}%)`;

    return (
        <motion.div
            ref={itemRef}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
            style={isLowPowerMode ? { opacity: 1, scale: 1, y: 0 } : {
                opacity,
                scale,
                y,
            }}
            className="flex flex-col items-center justify-center gap-6 group"
        >
            {/* ICON CONTAINER - Filter applied here */}
            <motion.div
                className="relative w-20 h-20 md:w-24 md:h-24 transition-transform duration-500 ease-out"
                style={isLowPowerMode ? { filter: 'none' } : {
                    filter: filterValue
                }}
            >
                <Image
                    src={iconUrl}
                    alt={tool.name}
                    fill
                    className="object-contain drop-shadow-2xl"
                    unoptimized
                />
            </motion.div>

            {/* LABEL - No filter, always sharp */}
            <div className="flex flex-col items-center gap-1">
                <span className="text-sm md:text-base font-bold uppercase tracking-[0.2em] text-white text-center">
                    {tool.name}
                </span>
                <div className="h-[1px] w-12 bg-primary/50 opacity-50" />
            </div>
        </motion.div>
    );
};
