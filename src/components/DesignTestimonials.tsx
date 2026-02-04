'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

export interface TestimonialItem {
    quote: string;
    author: string;
    role: string;
    company: string;
}

interface DesignTestimonialsProps {
    title?: string;
    duration?: number;
    testimonials: TestimonialItem[];
}

export const DesignTestimonials: React.FC<DesignTestimonialsProps> = ({
    title = "Testimonials",
    testimonials,
    duration = 6000
}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Mouse position for magnetic effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 200 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    // Transform for parallax on the large number
    const numberX = useTransform(x, [-200, 200], [-30, 30]);
    const numberY = useTransform(y, [-200, 200], [-15, 15]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const el = containerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    const goNext = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    };

    const goPrev = () => {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    useEffect(() => {
        const timer = window.setInterval(goNext, duration);
        return () => window.clearInterval(timer);
    }, [duration, testimonials.length]);

    const current = testimonials[activeIndex];
    const paddedIndex = String(activeIndex + 1).padStart(2, "0");
    const progressHeight = `${((activeIndex + 1) / testimonials.length) * 100}%`;

    return (
        <div className="relative w-full py-32 flex items-center justify-center overflow-hidden">
            <div
                ref={containerRef}
                className="relative w-full max-w-5xl px-8"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                {/* Oversized index number */}
                <motion.div
                    className="absolute top-1/2 left-0 z-0 -translate-y-1/2 text-[15rem] md:text-[28rem] leading-none font-bold tracking-tighter select-none pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
                    style={{ x: numberX, y: numberY }}
                >
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={activeIndex}
                            className="block"
                            initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {paddedIndex}
                        </motion.span>
                    </AnimatePresence>
                </motion.div>

                {/* Main content */}
                <div className="relative flex flex-col md:flex-row gap-12 md:gap-0">
                    {/* Left column */}
                    <div className="border-foreground/10 flex md:flex-col items-center justify-center border-b md:border-b-0 md:border-r pb-8 md:pb-0 md:pr-16">
                        <motion.span
                            className="text-muted-foreground font-mono text-[10px] tracking-[0.5em] uppercase md:[writing-mode:vertical-rl] md:rotate-180"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            {title}
                        </motion.span>

                        {/* Vertical progress line */}
                        <div className="bg-foreground/10 relative ml-8 md:ml-0 md:mt-8 h-px md:h-32 w-24 md:w-px overflow-hidden">
                            <motion.div
                                className="bg-primary absolute top-0 left-0 h-full md:w-full origin-top md:origin-left"
                                animate={{ height: progressHeight, width: '100%' }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            />
                        </div>
                    </div>

                    {/* Center content */}
                    <div className="flex-1 py-8 md:py-12 md:pl-16">
                        {/* Company badge */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                className="mb-8"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.4 }}
                            >
                                <span className="text-muted-foreground border-foreground/10 inline-flex items-center gap-3 rounded-full border px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest">
                                    <span className="bg-primary h-1.5 w-1.5 rounded-full animate-pulse" />
                                    {current.company}
                                </span>
                            </motion.div>
                        </AnimatePresence>

                        {/* Quote */}
                        <div className="relative mb-12 min-h-[200px] flex items-center">
                            <AnimatePresence mode="wait">
                                <motion.blockquote
                                    key={activeIndex}
                                    className="text-foreground text-3xl md:text-5xl leading-[1.2] font-extralight tracking-tight"
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    {current.quote.split(' ').map((word, i) => (
                                        <motion.span
                                            key={`${activeIndex}-${i}`}
                                            className="mr-[0.3em] inline-block"
                                            variants={{
                                                hidden: { opacity: 0, y: 20, rotateX: 45 },
                                                visible: {
                                                    opacity: 1,
                                                    y: 0,
                                                    rotateX: 0,
                                                    transition: {
                                                        duration: 0.5,
                                                        delay: i * 0.04,
                                                        ease: [0.22, 1, 0.36, 1],
                                                    },
                                                },
                                                exit: {
                                                    opacity: 0,
                                                    y: -10,
                                                    transition: { duration: 0.2, delay: i * 0.01 },
                                                },
                                            }}
                                        >
                                            {word}
                                        </motion.span>
                                    ))}
                                </motion.blockquote>
                            </AnimatePresence>
                        </div>

                        {/* Author row */}
                        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 md:gap-0">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    className="flex items-center gap-6"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4, delay: 0.2 }}
                                >
                                    <motion.div
                                        className="bg-primary h-px w-12"
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ duration: 0.6, delay: 0.3 }}
                                        style={{ originX: 0 }}
                                    />
                                    <div>
                                        <p className="text-foreground text-lg font-bold tracking-tight uppercase italic">{current.author}</p>
                                        <p className="text-muted-foreground text-[10px] font-mono uppercase tracking-[0.3em]">{current.role}</p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Navigation */}
                            <div className="flex items-center gap-4">
                                <motion.button
                                    className="group border-foreground/10 relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border bg-background/50 backdrop-blur-sm"
                                    whileTap={{ scale: 0.9 }}
                                    onClick={goPrev}
                                >
                                    <motion.div
                                        className="bg-primary absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
                                    />
                                    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="text-foreground transition-transform group-hover:-translate-x-1">
                                        <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </motion.button>

                                <motion.button
                                    className="group border-foreground/10 relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border bg-background/50 backdrop-blur-sm"
                                    whileTap={{ scale: 0.9 }}
                                    onClick={goNext}
                                >
                                    <motion.div
                                        className="bg-primary absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
                                    />
                                    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="text-foreground transition-transform group-hover:translate-x-1">
                                        <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom ticker */}
                <div className="absolute right-0 -bottom-24 left-0 overflow-hidden opacity-[0.05] pointer-events-none select-none">
                    <motion.div
                        className="flex text-[8rem] font-black italic tracking-tighter whitespace-nowrap"
                        animate={{ x: [0, -1000] }}
                        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    >
                        {Array.from({ length: 15 }).map((_, i) => (
                            <span key={i} className="mx-12 uppercase">
                                {testimonials.map((t) => t.company).join(" • ")} •
                            </span>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
