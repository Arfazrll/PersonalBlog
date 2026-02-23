'use client';

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Home, MoveLeft, RefreshCcw } from 'lucide-react';
import Link from 'next/link';

interface QuantumErrorProps {
    type?: '404' | '500';
    reset?: () => void;
}

export function QuantumError({ type = '404', reset }: QuantumErrorProps) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [currentTime, setCurrentTime] = useState(new Date());

    const springConfig = { damping: 25, stiffness: 150 };
    const rotateX = useSpring(useTransform(mouseY, [0, 1000], [10, -10]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [0, 1000], [-10, 10]), springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearInterval(timer);
        };
    }, [mouseX, mouseY]);

    const title = type === '404' ? '404' : 'ERROR';
    const subtitle = type === '404' ? 'YOU ARE LOST!?' : 'EXCEPTION_CAUGHT';
    const description = type === '404'
        ? "The page you're looking for is missing."
        : "An internal technical error has occurred.";

    const formattedDate = currentTime.toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).toUpperCase();

    const formattedTime = currentTime.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    return (
        <div className="fixed inset-0 z-[99999] bg-white dark:bg-[#000000] flex flex-col items-center justify-center font-sans overflow-hidden select-none">
            {/* Content Container with 3D Tilt */}
            <motion.div
                style={{ rotateX, rotateY, perspective: '1000px' }}
                className="relative z-10 flex flex-col items-center text-center px-6"
            >
                {/* Glitch Typography */}
                <div className="relative mb-8">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-[12rem] md:text-[18rem] font-black leading-none tracking-tighter text-foreground"
                    >
                        {title}
                    </motion.h1>

                    {/* Ghost Layers for Glitch Effect */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-30 mix-blend-difference pointer-events-none">
                        <motion.span
                            animate={{
                                x: [0, -4, 4, -2, 0],
                                y: [0, 2, -2, 1, 0]
                            }}
                            transition={{ duration: 0.2, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
                            className="text-[12rem] md:text-[18rem] font-black text-primary select-none"
                        >
                            {title}
                        </motion.span>
                    </div>
                </div>

                {/* Subtitle & Status */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col items-center gap-4 max-w-md"
                >
                    <div className="px-5 py-2 bg-foreground text-background text-[10px] md:text-sm font-black tracking-[0.5em] rounded-full uppercase">
                        {subtitle}
                    </div>
                    <p className="text-muted-foreground text-sm md:text-base font-bold tracking-tight mt-1 opacity-70">
                        {description}
                    </p>
                </motion.div>

                {/* Navigation Links */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center gap-6 mt-16"
                >
                    <Link href="/">
                        <button className="group relative flex items-center gap-3 px-8 py-4 rounded-full bg-foreground text-background font-bold text-sm tracking-wide transition-all hover:pr-10">
                            <Home size={18} />
                            <span>Return Home</span>
                            <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <MoveLeft size={16} className="rotate-180" />
                            </div>
                        </button>
                    </Link>

                    {reset ? (
                        <button
                            onClick={reset}
                            className="flex items-center gap-3 text-muted-foreground hover:text-foreground font-bold text-sm tracking-wide transition-colors"
                        >
                            <RefreshCcw size={18} />
                            <span>Reboot Session</span>
                        </button>
                    ) : (
                        <button
                            onClick={() => window.history.back()}
                            className="flex items-center gap-3 text-muted-foreground hover:text-foreground font-bold text-sm tracking-wide transition-colors"
                        >
                            <MoveLeft size={18} />
                            <span>Step Back</span>
                        </button>
                    )}
                </motion.div>
            </motion.div>

            {/* Decorative Elements - Real-time Info Panel */}
            <div className="absolute bottom-12 left-12 z-20 hidden md:block">
                <div className="flex flex-col font-mono text-left select-none">
                    <div className="flex items-center gap-2 text-primary font-black text-[11px] tracking-[0.2em] uppercase mb-1 opacity-80">
                        <span>JAKARTA, INDONESIA</span>
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-[0.1em] text-foreground/40 mb-2">
                        {formattedDate}
                    </div>
                    <div className="text-4xl font-black text-foreground/10 tracking-tighter leading-none">
                        {formattedTime.replace(/:/g, '.')}
                    </div>
                </div>
            </div>

            {/* Subtle Noise / Grain */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div >
    );
}
