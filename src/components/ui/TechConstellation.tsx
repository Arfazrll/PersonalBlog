'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface TechItem {
    name: string;
    icon: string;
}

interface TechConstellationProps {
    items: TechItem[];
    className?: string;
}

export const TechConstellation = ({ items, className }: TechConstellationProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Generate random positions and connections
    const nodes = useMemo(() => {
        return items.map((item, i) => ({
            ...item,
            id: i,
            x: Math.random() * 90 + 5, // 5% to 95%
            y: Math.random() * 90 + 5,
            size: 40 + Math.random() * 20
        }));
    }, [items]);

    const connections = useMemo(() => {
        const lines = [];
        for (let i = 0; i < nodes.length; i++) {
            // Connect to 2-3 closest nodes
            const targets = nodes
                .map((node, idx) => ({ idx, dist: Math.hypot(node.x - nodes[i].x, node.y - nodes[i].y) }))
                .filter(t => t.idx !== i)
                .sort((a, b) => a.dist - b.dist)
                .slice(0, 2);

            for (const target of targets) {
                lines.push({ from: i, to: target.idx });
            }
        }
        return lines;
    }, [nodes]);

    return (
        <div ref={containerRef} className={`relative w-full aspect-square md:aspect-video overflow-hidden ${className}`}>
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                {connections.map((line, i) => (
                    <motion.line
                        key={i}
                        x1={`${nodes[line.from].x}%`}
                        y1={`${nodes[line.from].y}%`}
                        x2={`${nodes[line.to].x}%`}
                        y2={`${nodes[line.to].y}%`}
                        stroke="currentColor"
                        className="text-primary"
                        strokeWidth="1"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, delay: i * 0.05 }}
                    />
                ))}
            </svg>

            {nodes.map((node, i) => (
                <motion.div
                    key={node.id}
                    className="absolute cursor-pointer group"
                    style={{
                        left: `${node.x}%`,
                        top: `${node.y}%`,
                        transform: 'translate(-50%, -50%)'
                    }}
                    whileHover={{ scale: 1.2, zIndex: 50 }}
                >
                    <div className="relative">
                        <motion.div
                            className="absolute inset-0 bg-primary/20 rounded-full blur-xl hidden group-hover:block"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1.5 }}
                        />
                        <div className="w-12 h-12 md:w-16 md:h-16 glass-card rounded-2xl flex items-center justify-center p-3 border-white/5 bg-white/5 backdrop-blur-3xl group-hover:border-primary group-hover:bg-primary/10 transition-all duration-500">
                            <Image
                                src={node.icon}
                                alt={node.name}
                                width={40}
                                height={40}
                                className="object-contain grayscale group-hover:grayscale-0 transition-all unoptimized"
                                unoptimized
                            />
                        </div>
                        <motion.span
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-4 px-2 py-1 rounded bg-black/80 text-[8px] font-black uppercase tracking-widest pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10"
                        >
                            {node.name}
                        </motion.span>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};
