'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface StatsCardProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export function StatsCard({ children, className = "", delay = 0 }: StatsCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    // Mouse position state
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring animation for tilt
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    // Transform mouse position to rotation degrees
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg']);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg']);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Calculate normalized position (-0.5 to 0.5)
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay }}
            style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d',
            }}
            className={`h-full ${className}`}
        >
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d',
                }}
                className="relative h-full w-full rounded-[2rem] bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-xl transition-all duration-200 group"
            >
                {/* Holographic Gradient Overlay */}
                <div
                    className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                        background: 'linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(147,51,234,0.1) 50%, rgba(16,185,129,0.1) 100%)',
                        transform: 'translateZ(1px)',
                    }}
                />

                {/* Glass Glare Effect */}
                <div
                    className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none bg-gradient-to-tr from-transparent via-white to-transparent"
                    style={{ transform: 'translateZ(1px)' }}
                />

                {/* Content */}
                <div className="relative h-full z-10" style={{ transform: 'translateZ(20px)' }}>
                    {children}
                </div>

                {/* Border Glow */}
                <div className="absolute inset-0 rounded-[2rem] ring-1 ring-white/20 group-hover:ring-primary/50 transition-all duration-500" />
            </motion.div>
        </motion.div>
    );
}
