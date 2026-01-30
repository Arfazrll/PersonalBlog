import React, { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from 'next-intl';
import { Cpu, Activity, Database, Award } from "lucide-react";
import { Lens } from "@/components/ui/Lens";
import { MaskContainer } from "@/components/ui/svg-mask-effect";
import { portfolioData } from "@/data/portfolio";

export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const t = useTranslations('about');

    return (
        <section ref={sectionRef} className="relative py-32 overflow-hidden">
            {/* Tech Background Grid with Organic Fade */}
            <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)`,
                    backgroundSize: '50px 50px',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
                    maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)'
                }}
            />

            <div className="container-creative relative z-10 px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

                    {/* Left Col: The Data Stream (Content) */}
                    <div className="lg:col-span-7 space-y-8 order-2 lg:order-1" ref={containerRef}>
                        <div className="holo-card">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary/20" />
                                </div>
                                <span className="text-xs font-mono text-primary tracking-[0.2em] uppercase">{t('identity')}</span>
                            </div>

                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-[0.9] tracking-tight mb-6 text-foreground">
                                {t('architecting')} <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 animate-gradient-x">
                                    {t('digitalReality')}
                                </span>
                            </h2>
                        </div>

                        <div className="holo-card glass-card p-6 md:p-8 relative overflow-hidden group shadow-lg dark:shadow-none dark:bg-black/30 border-black/5 dark:border-white/10 min-h-[300px] flex items-center justify-center">
                            {/* Decorative Corner Accents */}
                            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary/20 rounded-tl-2xl z-20 pointer-events-none" />
                            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary/20 rounded-br-2xl z-20 pointer-events-none" />

                            <div className="absolute top-6 right-8 p-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
                                <Cpu className="w-32 h-32 -rotate-12 text-primary" />
                            </div>

                            <MaskContainer
                                revealText={
                                    <p className="text-lg md:text-xl text-justify text-muted-foreground leading-relaxed font-light">
                                        {portfolioData.personal.bio}
                                    </p>
                                }
                                className="h-full bg-transparent dark:bg-transparent z-10"
                                size={0} // Hidden by default
                                revealSize={200} // Smaller spotlight as requested
                            >
                                <p className="text-lg md:text-xl text-justify text-primary font-bold leading-relaxed drop-shadow-md">
                                    {portfolioData.personal.bio}
                                </p>
                            </MaskContainer>
                        </div>
                    </div>

                    {/* Right Col: The Holographic Persona (Visuals) */}
                    <div className="lg:col-span-5 relative min-h-[500px] lg:h-[600px] flex items-center justify-center perspective-deep lg:pl-10 order-1 lg:order-2">
                        {/* Dynamic Background Aura */}
                        <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent blur-[80px] opacity-40 animate-pulse-slow" />

                        {/* Tech Ring Background - Subtle */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <motion.div
                                className="w-[280px] md:w-[500px] h-[280px] md:h-[500px] border border-foreground/5 rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 60, ease: "linear", repeat: Infinity }}
                            />
                            <motion.div
                                className="absolute w-[200px] md:w-[350px] h-[200px] md:h-[350px] border border-dashed border-foreground/10 rounded-full"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 40, ease: "linear", repeat: Infinity }}
                            />
                        </div>

                        {/* Image Container with Blending */}
                        <div className="relative w-full max-w-[420px] mx-auto z-10 aspect-[3/4] md:aspect-square lg:aspect-[3/4]">
                            <div className="relative w-full h-full">
                                <Lens zoomFactor={2} lensSize={200} isStatic={false} className="w-full h-full">
                                    <Image
                                        src={portfolioData.personal.avatar}
                                        alt="Holographic Identity"
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover object-top transition-all duration-700 hover:scale-105 hover:sepia-[.2] z-10"
                                        style={{
                                            maskImage: 'linear-gradient(to bottom, black 50%, transparent 95%)',
                                            WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 95%)'
                                        }}
                                        priority
                                    />
                                </Lens>
                            </div>

                            {/* Floating Orbital Stats - Positioned cleanly AROUND the subject */}
                            <div className="absolute inset-0 pointer-events-none z-20">
                                {/* Top Right - System Uptime */}
                                <motion.div
                                    className="absolute top-[10%] -right-0 md:-right-12 pointer-events-auto scale-90 md:scale-100"
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <div className="glass-card backdrop-blur-md px-4 py-2 border-l-2 border-blue-500 rounded-r-xl flex items-center gap-3 shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:scale-110 transition-transform cursor-default">
                                        <Activity className="w-4 h-4 text-blue-500" />
                                        <div>
                                            <div className="text-[10px] text-blue-600 dark:text-blue-200/70 tracking-wider">UPTIME</div>
                                            <div className="font-mono text-sm font-bold text-foreground">3+ YEARS</div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Bottom Right - Projects */}
                                <motion.div
                                    className="absolute bottom-[20%] -right-0 md:-right-8 pointer-events-auto scale-90 md:scale-100"
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <div className="glass-card backdrop-blur-md px-4 py-2 border-l-2 border-purple-500 rounded-r-xl flex items-center gap-3 shadow-[0_0_20px_rgba(139,92,246,0.2)] hover:scale-110 transition-transform cursor-default">
                                        <Database className="w-4 h-4 text-purple-500" />
                                        <div>
                                            <div className="text-[10px] text-purple-600 dark:text-purple-200/70 tracking-wider">PROJECTS</div>
                                            <div className="font-mono text-sm font-bold text-foreground">10+ SHIPPED</div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Bottom Left - Certifications (Floating lower) */}
                                <motion.div
                                    className="absolute bottom-[10%] left-0 md:-left-8 pointer-events-auto scale-90 md:scale-100"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    <div className="glass-card backdrop-blur-md px-4 py-2 border-r-2 border-emerald-500 rounded-l-xl flex flex-row-reverse items-center gap-3 shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:scale-110 transition-transform cursor-default text-right">
                                        <Award className="w-4 h-4 text-emerald-500" />
                                        <div>
                                            <div className="text-[10px] text-emerald-600 dark:text-emerald-200/70 tracking-wider">SKILLS</div>
                                            <div className="font-mono text-sm font-bold text-foreground">CERTIFIED</div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}
