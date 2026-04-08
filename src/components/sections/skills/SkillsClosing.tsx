"use client";
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePerformance } from '@/hooks/usePerformance';

export const SkillsClosing = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { isLowPowerMode } = usePerformance();

    const phases = [
        {
            time: "Stage 01",
            title: "Concept Audit",
            desc: "Analyzing project requirements, feasibility check, and establishing core technical objectives."
        },
        {
            time: "Stage 02",
            title: "Strategic Blueprint",
            desc: "Architecting the system design, choosing the stack, and finalizing the development roadmap."
        },
        {
            time: "Stage 03",
            title: "Launch & Scale",
            desc: "Full-scale development, rigorous testing, and initial deployment of the production system."
        }
    ];

    return (
        <section
            ref={containerRef}
            className="group relative w-full bg-background overflow-hidden flex flex-col items-center justify-center min-h-[90vh] py-24 md:py-32 select-none"
        >
            {/* 0. SECTION FRAME: Curved Top Line (Fades out at edges) */}
            <div className="absolute top-0 inset-x-0 h-24 pointer-events-none px-4 md:px-8 lg:px-12">
                <div className="h-full border-t border-x border-border/40 rounded-t-[48px] md:rounded-t-[64px] [mask-image:linear-gradient(to_bottom,black_0%,transparent_100%)]" />
            </div>
            {/* 1. BACKGROUND: "Wireframe Landscape" - Re-integrated */}
            <div className="absolute inset-x-0 bottom-0 top-1/2 bg-[linear-gradient(to_right,rgba(128,128,128,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.1)_1px,transparent_1px)] bg-[size:60px_60px] [transform:perspective(500px)_rotateX(60deg)_scale(2)] origin-top opacity-20 pointer-events-none" />

            {/* 2. KINETIC TYPOGRAPHY (Marquee) - Re-integrated */}
            <div className="absolute top-12 inset-x-4 md:inset-x-8 lg:inset-x-12 overflow-hidden opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
                <motion.div
                    animate={isLowPowerMode ? {} : { x: ["0%", "-50%"] }}
                    transition={isLowPowerMode ? {} : { duration: 40, repeat: Infinity, ease: "linear" }}
                    className="flex whitespace-nowrap gap-24 text-[12vw] font-black uppercase leading-none text-foreground"
                >
                    <span>System Architecture</span>
                    <span>System Architecture</span>
                </motion.div>
            </div>

            <div className="absolute bottom-12 inset-x-4 md:inset-x-8 lg:inset-x-12 overflow-hidden opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
                <motion.div
                    animate={isLowPowerMode ? {} : { x: ["-50%", "0%"] }}
                    transition={isLowPowerMode ? {} : { duration: 45, repeat: Infinity, ease: "linear" }}
                    className="flex whitespace-nowrap gap-24 text-[12vw] font-black uppercase leading-none text-foreground"
                >
                    <span>Creative Engineering</span>
                    <span>Creative Engineering</span>
                </motion.div>
            </div>

            {/* 3. CENTER CONTENT: "The Split" */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                {/* LEFT: Massive Statement & Action */}
                <div className="space-y-10 md:space-y-12">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-6"
                    >
                        <h2 className="font-black tracking-tighter text-foreground leading-[0.8] uppercase flex flex-col">
                            <span className="text-7xl md:text-9xl lg:text-[140px]">DRIVE</span>
                            <span className="text-5xl md:text-7xl lg:text-[80px] lg:tracking-[-0.04em]">INNOVATION</span>
                        </h2>

                        <p className="text-base md:text-lg text-muted-foreground/70 max-w-lg leading-relaxed font-medium">
                            Precision engineering meets <span className="text-foreground font-bold underline decoration-primary/30 underline-offset-4">unbound imagination</span>.
                            Let's transform ambitious ideas into production-ready solutions and construct a legacy of innovation.
                        </p>
                    </motion.div>

                    {/* CTA Button - GLIDE STYLE */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <Link
                            href="/projects"
                            className="group relative inline-flex items-center gap-4 bg-primary/10 hover:bg-primary/20 backdrop-blur-md border border-primary/20 text-primary px-10 py-5 rounded-xl text-lg font-black transition-all shadow-2xl hover:shadow-primary/20 active:scale-95 uppercase tracking-tight"
                        >
                            <span>More Projects</span>
                            <MoveRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
                        </Link>
                    </motion.div>
                </div>

                {/* RIGHT: Vertical Timeline - GLIDE STYLE */}
                <div className="relative border-l-2 border-border/20 pl-8 md:pl-12 space-y-16">
                    {phases.map((phase, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 + idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                            className="relative group"
                        >
                            {/* Connection Node */}
                            <div className="absolute -left-[41px] md:-left-[57px] top-4 w-4 h-4 rounded-full bg-background border-4 border-primary/40 group-hover:border-primary transition-colors duration-500 z-20" />

                            {/* Glide Pill Marker */}
                            <div className="mb-6">
                                <span className="inline-block px-4 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-foreground font-extrabold text-xs uppercase tracking-[0.2em] shadow-sm border border-border/50">
                                    {phase.time}
                                </span>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-2xl md:text-3xl font-black text-foreground tracking-tight group-hover:text-primary transition-colors duration-300">
                                    {phase.title}
                                </h4>
                                <p className="text-base text-muted-foreground leading-relaxed max-w-md font-medium">
                                    {phase.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}

                    {/* Background Progress Line Glow */}
                    <div className="absolute top-0 bottom-0 -left-[1px] w-[2px] bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />
                </div>
            </div>

            {/* Background Glows */}
            <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none opacity-40" />
            <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none opacity-40" />
        </section>
    );
};
