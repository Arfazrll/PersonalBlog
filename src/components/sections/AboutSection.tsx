"use client";

import React, { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { WarpBackground } from "@/components/ui/warp-background";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import { useTheme } from "next-themes";
import ImageTrail from "@/components/ImageTrail";
import Image from "next/image";
import InfiniteMenu from "@/components/InfiniteMenu";
import { portfolioData } from "@/data/portfolio";
import { BeamDivider } from "@/components/ui/BeamDivider";
import ScrollReveal from "@/components/ScrollReveal";
import { Github, Linkedin, Instagram, MessageSquare, ArrowRight, ArrowUpRight } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useCountUp } from "@/hooks/useCountUp";
import { SocialCorner } from "@/components/layout/SocialCorner";
import { cn } from "@/lib/utils";

import Testimonial1 from "@/components/ui/testimonial-1";

const GALLERY_IMAGES = [
    "/gallery/Foto Utama.jpeg",
    "/gallery/FotoSC1.jpeg",
    "/gallery/FotoSC2.jpeg",
    "/gallery/FotoSC3.jpeg",
    "/gallery/FotoSC4.jpeg",
    "/gallery/FotoSC5.jpeg",
    "/gallery/academicaffairsdivision1.jpg",
    "/gallery/computernetworkpracticumassistant2.jpg",
    "/gallery/dataentryassistant1.jpg",
    "/gallery/delegateaiesecfutureleaders20241.jpg",
    "/gallery/environmentalhygieneteam1.jpg",
    "/gallery/environmentalhygieneteam2.jpg",
    "/gallery/logisticsoperatorcampusexpo20242.jpg",
    "/gallery/researchassistant1.jpg",
    "/gallery/researchassistant2.jpg"
];

const AboutLeadInImageStack = () => {
    const [randomData, setRandomData] = useState<{ src: string, rotate: number, x: number, y: number }[]>([]);
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (!mounted) return;
        const shuffled = [...GALLERY_IMAGES].sort(() => 0.5 - Math.random()).slice(0, 2);
        const data = shuffled.map((src, i) => {
            const offsetMultiplier = i === 0 ? -1 : 1;
            return {
                src,
                rotate: Math.round(offsetMultiplier * 15 + (Math.random() * 8 - 4)),
                x: Math.round(offsetMultiplier * 25 + (Math.random() * 10 - 5)),
                y: Math.round(Math.random() * 10 - 5),
            };
        });
        setRandomData(data);
    }, [mounted]);

    if (!mounted || randomData.length === 0) return null;

    return (
        <div className="relative flex items-center justify-center w-56 h-32 md:w-72 md:h-44 mb-8 lg:mb-10 overflow-visible">
            {randomData.map((item, i) => (
                <div
                    key={item.src}
                    className="absolute w-24 h-28 md:w-32 md:h-40 rounded-xl overflow-hidden border-[4px] border-white shadow-[0_10px_30px_rgba(0,0,0,0.3)] bg-white"
                    style={{
                        zIndex: i === 1 ? 20 : 10,
                        transform: `translate(${item.x}px, ${item.y}px) rotate(${item.rotate}deg)`,
                    }}
                >
                    <div className="relative w-full h-full">
                        <Image
                            src={item.src}
                            alt="Gallery Piece"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100px, 120px"
                            priority={i === 1}
                        />
                        <div className="absolute inset-0 bg-black/5 pointer-events-none" />
                    </div>
                </div>
            ))}
        </div>
    );
};

// --- Utility: Slide Reveal (Smooth & Cinematic) ---
const SlideReveal = ({ children, delay = 0, y = 30 }: { children: React.ReactNode; delay?: number; y?: number }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95, y }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
            duration: 0.8,
            delay,
            ease: [0.16, 1, 0.3, 1],
            scale: { duration: 1, ease: [0.16, 1, 0.3, 1] }
        }}
    >
        {children}
    </motion.div>
);

// --- Component 1: Editorial Lead-in ---
const AboutLeadIn = () => {
    const t = useTranslations('about');

    return (
        <div className="w-full max-w-[1650px] mx-auto px-6 py-6 flex justify-center items-center">
            {/* The Reference Card Container (Gambar 1 Style with Dark/Light Support) */}
            <div className="relative w-full bg-white dark:bg-black border border-red-600/20 dark:border-red-600/40 p-6 md:p-12 lg:p-16 overflow-hidden group shadow-xl dark:shadow-2xl transition-colors duration-500">

                {/* 1. Grid Background Overlay (Dynamic Colors) */}
                <div className="absolute inset-0 z-0 bg-[radial-gradient(circle,_#00000008_1px,_transparent_1px)] dark:bg-[radial-gradient(circle,_#ffffff08_1px,_transparent_1px)] bg-[size:20px_20px] pointer-events-none transition-opacity" />

                {/* 2. Red Corner Tabs */}
                <div className="absolute top-0 left-0 w-2.5 h-2.5 bg-red-600 -translate-x-1 translate-y-[-50%] z-10" />
                <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-600 translate-x-1 translate-y-[-50%] z-10" />
                <div className="absolute bottom-0 left-0 w-2.5 h-2.5 bg-red-600 -translate-x-1 translate-y-[50%] z-10" />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-red-600 translate-x-1 translate-y-[50%] z-10" />

                {/* 3. Content Layer */}
                <div className="relative z-10">
                    {/* Top Tagline */}
                    <div className="flex justify-between items-start mb-6 md:mb-10">
                        <span className="text-red-600 dark:text-red-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em]">I BELIEVE</span>
                        <span className="text-zinc-400 dark:text-zinc-600 text-[9px] font-mono tracking-widest uppercase hidden md:block">{t('leadIn.role')}</span>
                    </div>

                    {/* Massive Typography - Quote Style */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-8 md:mb-14"
                    >
                        <h2 className="text-[32px] sm:text-[48px] md:text-[64px] lg:text-[76px] xl:text-[88px] font-bold tracking-tight leading-[0.92] text-zinc-900 dark:text-white transition-colors">
                            <span className="text-zinc-300 dark:text-zinc-700 mr-2">"</span>
                            {t('leadIn.applied')} <span className="text-zinc-400 dark:text-zinc-500 font-medium">{t('leadIn.intelligence')}</span>. <br className="hidden md:block" />
                            <span className="text-zinc-900 dark:text-white">because</span> production <span className="font-serif italic font-normal text-zinc-900 dark:text-white lowercase opacity-90">{t('leadIn.engineering')}</span>
                            <span className="text-zinc-300 dark:text-zinc-700 ml-1">.."</span>
                        </h2>
                    </motion.div>

                    {/* Detail Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 border-t border-zinc-100 dark:border-zinc-900 pt-8 md:pt-12">
                        {/* Left narrative */}
                        <div className="md:col-span-5">
                            <p
                                className="text-base md:text-lg lg:text-xl font-medium text-zinc-600 dark:text-zinc-400 leading-relaxed tracking-tight"
                                dangerouslySetInnerHTML={{ __html: t.raw('leadIn.thesis') }}
                            />
                        </div>

                        {/* Right columns */}
                        <div className="md:col-span-7 flex flex-col sm:flex-row gap-8 text-[13px]">
                            <div className="flex-1 space-y-3">
                                <span className="text-zinc-800 dark:text-zinc-200 font-bold uppercase tracking-widest block border-b border-zinc-100 dark:border-zinc-900 pb-3">Scope & Platform</span>
                                <p className="text-zinc-500 leading-relaxed">
                                    {t('leadIn.scope')}
                                </p>
                                <p className="text-red-600/80 dark:text-red-500/70 font-medium italic">
                                    {t('leadIn.bridging')}
                                </p>
                            </div>
                            <div className="flex-1 space-y-3 flex flex-col">
                                <span className="text-zinc-800 dark:text-zinc-200 font-bold uppercase tracking-widest block border-b border-zinc-100 dark:border-zinc-900 pb-3">Integration</span>
                                <p className="text-zinc-500 leading-relaxed">
                                    {t('leadIn.integration')}
                                </p>
                                <div className="mt-6 md:mt-auto pt-4">
                                    <span className="text-3xl lg:text-4xl font-signature text-zinc-900 dark:text-white/90">{t('leadIn.signature')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Tech Stack Logos (from portfolio.ts project data) ---
const TECH_LOGOS = [
    { name: "Python", slug: "python" },
    { name: "TensorFlow", slug: "tensorflow" },
    { name: "Next.js", slug: "nextdotjs" },
    { name: "React", slug: "react" },
    { name: "TypeScript", slug: "typescript" },
    { name: "Docker", slug: "docker" },
    { name: "FastAPI", slug: "fastapi" },
    { name: "PostgreSQL", slug: "postgresql" },
    { name: "LangChain", slug: "langchain" },
    { name: "Firebase", slug: "firebase" },
    { name: "Spring Boot", slug: "springboot" },
    { name: "Solidity", slug: "solidity" },
    { name: "Go", slug: "go" },
    { name: "Prisma", slug: "prisma" },
    { name: "Flask", slug: "flask" },
];

// --- Component 2: Core Engineering Panel ---
const CoreEngineeringPanel = ({ scrollYProgress }: { scrollYProgress: any }) => {
    const contentOpacity = useTransform(scrollYProgress, [0.75, 0.9], [1, 0]);
    const contentScale = useTransform(scrollYProgress, [0.75, 0.9], [1, 0.9]);
    const contentY = useTransform(scrollYProgress, [0.75, 0.9], [0, -50]);

    return (
        <div className="w-screen h-full flex items-center bg-background transition-colors duration-500 overflow-hidden">
            <motion.div
                style={{
                    opacity: contentOpacity,
                    scale: contentScale,
                    y: contentY,
                    willChange: "transform, opacity",
                }}
                className="w-full h-full flex items-center justify-center"
            >
                <Testimonial1 />
            </motion.div>
        </div>
    );
};

const EmergingResearchPanel = ({ isVisible: isParentVisible }: { isVisible: boolean }) => {
    const isMobile = useIsMobile();
    const t = useTranslations('about');
    const containerRef = useRef<HTMLDivElement>(null);
    const [isCurrentlyVisible, setIsCurrentlyVisible] = useState(false);

    useEffect(() => {
        if (!containerRef.current) return;
        const observer = new IntersectionObserver(([entry]) => {
            setIsCurrentlyVisible(entry.isIntersecting);
        }, { threshold: 0.1 });
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    // Active if parent thinks it's visible AND it's physically in the viewport
    const active = isParentVisible && isCurrentlyVisible;

    return (
        <div ref={containerRef} className="w-screen h-full flex items-center bg-background overflow-hidden transition-colors duration-500">
            <WarpBackground
                perspective={1200}
                gridColor="transparent"
                beamsPerSide={isMobile ? 2 : 6}
                beamDuration={2.5}
                beamDelayMax={1}
                paused={!active}
                className="border-none p-0 bg-transparent rounded-none h-full w-full flex items-center justify-center"
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full h-full px-[8%] md:px-[10%]">
                    {/* Left Side: Content */}
                    <div className="lg:col-span-12 space-y-12 z-10 flex flex-col items-center text-center">
                        <div className="space-y-4 max-w-2xl">
                            <motion.span
                                initial={{ opacity: 0, y: 30 }}
                                animate={isParentVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                transition={{ duration: 0.5 }}
                                className="text-[12px] md:text-[13px] font-mono uppercase tracking-[0.2em] text-gray-400 block"
                            >
                                {t('emergingResearch.label')}
                            </motion.span>
                            <motion.h3
                                initial={{ opacity: 0, y: 50 }}
                                animate={isParentVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                                transition={{ duration: 0.6, delay: 0.15 }}
                                className="text-[36px] md:text-[50px] font-bold text-foreground uppercase leading-tight tracking-tight"
                                dangerouslySetInnerHTML={{ __html: t.raw('emergingResearch.title') }}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={isParentVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="space-y-3"
                            >
                                <h4 className="text-[13px] font-bold uppercase tracking-[0.1em] text-foreground">{t('emergingResearch.agentic.title')}</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {t('emergingResearch.agentic.desc')}
                                </p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={isParentVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.5, delay: 0.42 }}
                                className="space-y-3"
                            >
                                <h4 className="text-[13px] font-bold uppercase tracking-[0.1em] text-foreground">{t('emergingResearch.web3.title')}</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {t('emergingResearch.web3.desc')}
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </WarpBackground>
        </div>
    );
};

// --- Component 3: Profile Intersection ---
const ProfileIntersection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });
    const t = useTranslations('about');

    // Ultra-Tight Fade Out (Only at the very end of its exit)
    const contentOpacity = useTransform(scrollYProgress, [0.98, 1.0], [1, 0]);

    return (
        <motion.div
            ref={sectionRef}
            style={{ opacity: contentOpacity }}
            className="relative z-10 pt-24 lg:pt-32 pb-0 px-6 md:px-10 lg:px-12 max-w-[1600px] mx-auto"
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 gap-x-0 items-stretch">
                {/* Left: Optimized Image Column (5/12) */}
                <div className="lg:col-span-5 relative group flex flex-col items-stretch overflow-hidden">
                    <motion.div
                        initial={{ clipPath: "circle(0% at 50% 50%)" }}
                        whileInView={{ clipPath: "circle(75% at 50% 50%)" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full h-full min-h-[600px] lg:min-h-[800px] shadow-2xl shadow-black/20 dark:shadow-white/5 bg-background dark:bg-black"
                    >
                        <motion.div
                            initial={{ scale: 1.15 }}
                            whileInView={{ scale: 1 }}
                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                            className="w-full h-full relative grayscale group-hover:grayscale-0 transition-all duration-1000"
                        >
                            <Image
                                src={portfolioData.personal.avatar}
                                alt="Azril Profile"
                                fill
                                className="object-cover block object-center"
                                sizes="(max-width: 768px) 100vw, 40vw"
                                priority
                            />
                        </motion.div>
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-1000 pointer-events-none" />

                        {/* Edge Blending Gradients (Slight Awan / Blur effect into background) */}
                        <div className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-1000 opacity-90 group-hover:opacity-40">
                            {/* Top Edge */}
                            <div className="absolute inset-x-0 top-0 h-10 md:h-12 bg-gradient-to-b from-background dark:from-black to-transparent" />
                            {/* Bottom Edge */}
                            <div className="absolute inset-x-0 bottom-0 h-10 md:h-12 bg-gradient-to-t from-background dark:from-black to-transparent" />
                            {/* Left Edge */}
                            <div className="absolute inset-y-0 left-0 w-8 md:w-10 bg-gradient-to-r from-background dark:from-black to-transparent" />
                            {/* Right Edge */}
                            <div className="absolute inset-y-0 right-0 w-8 md:w-10 bg-gradient-to-l from-background dark:from-black to-transparent" />
                        </div>
                    </motion.div>
                </div>

                {/* Right: Text Block (7/12) - Highlighted */}
                <div className="lg:col-span-7 flex flex-col justify-center space-y-12 p-8 lg:py-16 lg:pr-16 lg:pl-20 relative">
                    <SlideReveal delay={0.2} y={60}>
                        <h3
                            className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[0.9] text-foreground dark:text-white tracking-tighter uppercase"
                            dangerouslySetInnerHTML={{ __html: t.raw('profile.title') }}
                        />
                    </SlideReveal>

                    <SlideReveal delay={0.4} y={40}>
                        <div className="space-y-12">
                            <div className="space-y-6 border-l-2 border-primary/20 pl-8">
                                <ScrollReveal
                                    baseOpacity={0.4}
                                    enableBlur={false}
                                    blurStrength={2}
                                    textClassName="text-base md:text-lg text-foreground/90 leading-relaxed font-medium"
                                    containerClassName="!my-0"
                                >
                                    {t('profile.narrative')}
                                </ScrollReveal>
                                <ScrollReveal
                                    baseOpacity={0.4}
                                    enableBlur={false}
                                    blurStrength={2}
                                    textClassName="text-base md:text-lg text-foreground/90 leading-relaxed font-medium"
                                    containerClassName="!mt-5 !mb-0"
                                >
                                    {t('profile.narrative2')}
                                </ScrollReveal>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {[
                                    { title: t('profile.pillars.reliable.title'), desc: t('profile.pillars.reliable.desc') },
                                    { title: t('profile.pillars.optimized.title'), desc: t('profile.pillars.optimized.desc') },
                                    { title: t('profile.pillars.maintainable.title'), desc: t('profile.pillars.maintainable.desc') },
                                    { title: t('profile.pillars.evolvable.title'), desc: t('profile.pillars.evolvable.desc') }
                                ].map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 25 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: idx * 0.12 }}
                                        className="space-y-2 group"
                                    >
                                        <h5 className="text-lg font-bold text-foreground flex items-center gap-2">
                                            <motion.span
                                                initial={{ scale: 0 }}
                                                whileInView={{ scale: 1 }}
                                                className="w-1.5 h-1.5 rounded-full bg-primary"
                                            />
                                            {item.title}
                                        </h5>
                                        <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </SlideReveal>
                </div>
            </div>
        </motion.div>
    );
};

// --- Unified Typography-Focused Card for Bitwise Symmetry ---
const ClosingCard = ({ title, subtitle, desc, index, direction }: { title: string, subtitle: string, desc: string, index: number, direction: 'left' | 'right' }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`group relative h-[50vh] flex flex-col justify-center ${direction === 'right' ? 'items-end text-right' : 'items-start text-left'}`}
    >
        <div className={`flex flex-col gap-6 relative z-10 w-full px-4 ${direction === 'right' ? 'items-end' : 'items-start'}`}>
            {/* Minimalist Index & Role Indicator */}
            <div className={`flex items-center gap-6 w-full ${direction === 'left' ? 'flex-row-reverse' : ''}`}>
                <span className="text-xl md:text-2xl font-serif-elegant italic text-muted-foreground/30 group-hover:text-primary transition-colors duration-500">
                    {String(index + 1).padStart(2, '0')}
                </span>
                <div className="h-px bg-foreground/10 flex-1 group-hover:bg-primary/30 transition-colors duration-500" />
                <span className="text-[11px] md:text-[13px] font-mono uppercase tracking-[0.3em] text-primary/80 font-semibold group-hover:tracking-[0.4em] transition-all duration-700">
                    {subtitle}
                </span>
            </div>

            {/* Title with subtle hover shift */}
            <h4 className={`text-4xl md:text-5xl lg:text-[64px] font-black text-foreground tracking-tighter leading-[1.1] transition-all duration-500 ${direction === 'right' ? 'group-hover:pr-4 origin-right' : 'group-hover:pl-4 origin-left'}`}>
                {title}
            </h4>

            {/* Description fading in slightly on hover */}
            <p className="text-[16px] md:text-[18px] lg:text-[20px] text-muted-foreground/60 leading-relaxed max-w-[85%] font-medium mt-4 group-hover:text-foreground/90 transition-colors duration-500 line-clamp-3">
                {desc}
            </p>
        </div>
    </motion.div>
);

const ViewMoreCard = ({ href, title }: { href: string, title: string }) => {
    const t = useTranslations('about');
    return (
        <Link href={href} className="group block h-[50vh] flex flex-col justify-center">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative flex flex-col items-center justify-center gap-10"
            >
                {/* Minimalist circular arrow */}
                <div className="w-24 h-24 rounded-full border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-700 ease-out">
                    <ArrowRight className="w-10 h-10 text-primary group-hover:text-primary-foreground group-hover:translate-x-2 transition-all duration-500" />
                </div>

                <div className="text-center space-y-4">
                    <p className="text-[12px] md:text-[14px] font-mono uppercase tracking-[0.4em] text-muted-foreground group-hover:text-primary transition-colors">{t('closing.discoverMore')}</p>
                    <h4 className="text-4xl lg:text-5xl font-black text-foreground/80 group-hover:text-foreground transition-all">{title}</h4>
                </div>
            </motion.div>
        </Link>
    );
};

const GhostedHeader = ({ label, part1, part2, direction = "left" }: { label: string, part1: string, part2: string, direction?: "left" | "right" }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className={`space-y-3 mb-16 h-32 flex flex-col justify-end ${direction === 'right' ? 'items-end text-right' : 'items-start text-left'}`}
    >
        <div className={`flex items-center gap-4 ${direction === 'right' ? 'flex-row-reverse' : ''}`}>
            <div className="w-8 h-px bg-primary/50" />
            <span className="text-[10px] md:text-[11px] font-mono uppercase tracking-[0.3em] text-primary/80 font-bold">
                {label}
            </span>
        </div>
        <h3 className={`text-4xl md:text-5xl lg:text-5xl xl:text-[54px] font-black uppercase tracking-tighter leading-none flex items-center gap-x-3 gap-y-1 ${direction === 'right' ? 'flex-row-reverse flex-wrap-reverse justify-start' : 'flex-wrap'}`}>
            <span className="text-foreground drop-shadow-sm">{part1}</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground/20 to-transparent dark:from-white/20 dark:to-transparent">{part2}</span>
        </h3>
    </motion.div>
);

const AboutClosing = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const leftTrackRef = useRef<HTMLDivElement>(null);
    const rightTrackRef = useRef<HTMLDivElement>(null);

    const t = useTranslations('about');

    const [bounds, setBounds] = React.useState({ leftStart: 0, leftEnd: 0, rightStart: 0, rightEnd: 0 });

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    // Calculate exact translation distances based on absolute DOM boxes
    React.useLayoutEffect(() => {
        const updateBounds = () => {
            if (leftTrackRef.current && rightTrackRef.current) {
                // Expand container area
                const containerH = leftTrackRef.current.parentElement?.clientHeight || window.innerHeight * 0.82;

                const leftH = leftTrackRef.current.scrollHeight;
                const rightH = rightTrackRef.current.scrollHeight;

                // Make the start and end fully offscreen for the "blank" entrance/exit
                // Left moves UP (positive to negative)
                const leftStart = containerH;
                const leftEnd = -leftH;

                // Right moves DOWN (negative to positive)
                const rightStart = -rightH;
                const rightEnd = containerH;

                setBounds({ leftStart, leftEnd, rightStart, rightEnd });
            }
        };

        const timer = setTimeout(updateBounds, 100); // give DOM time to render fonts
        window.addEventListener("resize", updateBounds);
        return () => {
            clearTimeout(timer);
            window.removeEventListener("resize", updateBounds);
        };
    }, [t]);

    const leftY = useTransform(scrollYProgress, [0, 1], [bounds.leftStart, bounds.leftEnd]);
    const rightY = useTransform(scrollYProgress, [0, 1], [bounds.rightStart, bounds.rightEnd]);

    // Section Visibility: Smoother fade in/out that respects the focus area
    const sectionOpacity = useTransform(
        scrollYProgress,
        [0, 0.05, 0.95, 1],
        [0, 1, 1, 0]
    );

    const smoothLeftY = useSpring(leftY, { stiffness: 40, damping: 20, mass: 0.1, restDelta: 0.1 });
    const smoothRightY = useSpring(rightY, { stiffness: 40, damping: 20, mass: 0.1, restDelta: 0.1 });

    const experiences = t.raw('closing.experiencesList') || [];
    const projects = t.raw('closing.projectsList') || [];

    // Equal length arrays to ensure perfect 1:1 row alignment
    const maxLength = Math.max(experiences.length, projects.length);
    const paddedExperiences = Array.from({ length: maxLength }).map((_, i) => experiences[i] || null);
    const paddedProjects = Array.from({ length: maxLength }).map((_, i) => projects[i] || null);

    return (
        <section ref={sectionRef} className="relative h-[500vh] hidden md:block z-50 bg-background">
            <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">

                {/* Visual Anchors: Fade Masks */}
                <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-background to-transparent z-20 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none" />

                <motion.div
                    style={{ opacity: sectionOpacity }}
                    className="max-w-[1600px] mx-auto w-full px-12 md:px-20"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 h-[82vh] max-h-[900px] mb-8 pb-12">

                        {/* LEFT: KEY EXPERIENCE (Scrolls UP) */}
                        <div className="flex flex-col h-full overflow-hidden">
                            <GhostedHeader label={t('closing.experience.label')} part1={t('closing.experience.title1')} part2={t('closing.experience.title2')} />
                            <div className="flex-1 relative overflow-hidden">
                                <motion.div
                                    ref={leftTrackRef}
                                    style={{ y: smoothLeftY }}
                                    className="flex flex-col"
                                >
                                    {paddedExperiences.map((exp: any, i: number) => (
                                        exp ? (
                                            <ClosingCard key={i} title={exp.company} subtitle={exp.role} desc={exp.desc} index={i} direction="left" />
                                        ) : (
                                            <div key={`empty-exp-${i}`} className="h-[50vh]" />
                                        )
                                    ))}
                                    <ViewMoreCard href="/experience" title={t('closing.experience.viewMore')} />
                                </motion.div>
                            </div>
                        </div>

                        {/* RIGHT: FLAGSHIP PROJECTS (Scrolls DOWN) */}
                        <div className="flex flex-col h-full overflow-hidden items-end">
                            <GhostedHeader direction="right" label={t('closing.projects.label')} part1={t('closing.projects.title1')} part2={t('closing.projects.title2')} />
                            <div className="flex-1 relative overflow-hidden">
                                <motion.div
                                    ref={rightTrackRef}
                                    style={{ y: smoothRightY }}
                                    className="flex flex-col"
                                >
                                    <ViewMoreCard href="/projects" title={t('closing.projects.viewMore')} />
                                    {paddedProjects.map((proj: any, i: number) => (
                                        proj ? (
                                            <ClosingCard key={i} title={proj.title} subtitle="Featured Project" desc={proj.desc} index={i} direction="right" />
                                        ) : (
                                            <div key={`empty-proj-${i}`} className="h-[50vh]" />
                                        )
                                    ))}
                                </motion.div>
                            </div>
                        </div>

                    </div>
                </motion.div>
            </div>
        </section>
    );
};

// --- Mobile Version of AboutClosing ---
const AboutClosingMobile = () => {
    const t = useTranslations('about');
    const experiences = t.raw('closing.experiencesList');
    const projects = t.raw('closing.projectsList');

    return (
        <div className="md:hidden px-6 py-20 space-y-24 border-t border-white/5">
            <div className="space-y-12">
                <GhostedHeader label={t('closing.experience.label')} part1={t('closing.experience.title1')} part2={t('closing.experience.title2')} />
                <div className="space-y-12 pl-4">
                    {experiences.map((exp: any, i: number) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="pl-6 border-l border-primary/30"
                        >
                            <h4 className="text-xl font-bold">{exp.company}</h4>
                            <p className="text-xs uppercase font-mono tracking-widest text-muted-foreground mt-1">
                                {exp.role}
                            </p>
                        </motion.div>
                    ))}
                </div>
                <ViewMoreCard href="/experience" title={t('closing.experience.viewMore')} />
            </div>

            <div className="space-y-12">
                <GhostedHeader label={t('closing.projects.label')} part1={t('closing.projects.title1')} part2={t('closing.projects.title2')} />
                <div className="space-y-12 pl-4">
                    {projects.map((proj: any, i: number) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="space-y-3"
                        >
                            <div className="w-10 h-0.5 bg-primary/40" />
                            <h4 className="text-xl font-bold">{proj.title}</h4>
                        </motion.div>
                    ))}
                </div>
                <ViewMoreCard href="/projects" title={t('closing.projects.viewMore')} />
            </div>
        </div>
    );
};


// --- Component 5: Audit Funnel ---
const AuditFunnel = () => {
    const isMobile = useIsMobile();
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });
    const t = useTranslations('about');
    const tCommon = useTranslations('common');

    const scale = useTransform(scrollYProgress, [0, 0.5], [0.6, 1]);
    const lineScaleY = useTransform(scrollYProgress, [0.3, 0.8], [0, 1]);

    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        const galleryItems = [
            "/gallery/Foto Utama.jpeg",
            "/gallery/FotoSC1.jpeg",
            "/gallery/FotoSC2.jpeg",
            "/gallery/FotoSC3.jpeg",
            "/gallery/FotoSC4.jpeg",
            "/gallery/FotoSC5.jpeg",
            "/gallery/academicaffairsdivision1.jpg",
            "/gallery/computernetworkpracticumassistant2.jpg",
            "/gallery/dataentryassistant1.jpg",
            "/gallery/delegateaiesecfutureleaders20241.jpg",
            "/gallery/environmentalhygieneteam1.jpg",
            "/gallery/environmentalhygieneteam2.jpg",
            "/gallery/logisticsoperatorcampusexpo20242.jpg",
            "/gallery/researchassistant1.jpg",
            "/gallery/researchassistant2.jpg"
        ];
        // Shuffle and pick 8 random images for the trail to avoid overwhelming the DOM
        const shuffled = [...galleryItems].sort(() => 0.5 - Math.random());
        setImages(shuffled.slice(0, 8));
    }, []);

    return (
        <div ref={sectionRef} className="relative overflow-hidden group min-h-[80vh] md:min-h-[120vh] flex items-center justify-center bg-background z-50 pb-20 md:pb-60">
            <motion.div
                className="flex flex-col items-center text-center py-20 md:py-40 space-y-12 md:space-y-16 relative z-10 pointer-events-none"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
            >
                <div className="space-y-6 md:space-y-10 flex flex-col items-center px-6 relative z-10">
                    <motion.h4
                        style={{ scale, willChange: "transform" }}
                        className="text-xl md:text-4xl lg:text-6xl font-black tracking-[-0.05em] text-foreground max-w-6xl tracking-tighter leading-[0.9] lg:px-12 uppercase text-center"
                    >
                        {t('architecting')} <br></br>
                        <motion.span
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-primary italic font-serif-elegant font-light lowercase tracking-normal"
                        >
                            {t('digitalReality')}
                        </motion.span>.
                    </motion.h4>
                </div>

                <div className="flex flex-col items-center gap-8 pt-12">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="text-[10px] font-mono text-muted-foreground tracking-[0.5em] uppercase"
                    >
                        {tCommon('scrollAudit')}
                    </motion.div>
                    <div className="relative h-40 w-px bg-black/5 dark:bg-white/[0.01] overflow-hidden">
                        <motion.div
                            style={{ scaleY: lineScaleY }}
                            className="absolute top-0 left-0 w-full h-full bg-primary origin-top"
                        />
                    </div>
                </div>
            </motion.div>

            {/* Image Trail Layer - Disabled on Mobile for performance */}
            {!isMobile && (
                <div className="absolute inset-0 z-50">
                    <ImageTrail items={images} variant={3} />
                </div>
            )}

            {/* Subtle Grain Texture Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            </div>
        </div>
    );
};



const ScrollHijackSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: sectionRef });

    // SLIGHTLY WEIGHTIER PHYSICS: Better inertia for "card" movement
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25, mass: 0.5 });

    const x = useTransform(
        smoothProgress,
        [0, 0.1, 0.5, 1],
        ["0vw", "0vw", "-100vw", "-100vw"]
    );

    const [isComp2Visible, setIsComp2Visible] = React.useState(false);
    useMotionValueEvent(smoothProgress, "change", (v: any) => {
        // Trigger precisely as the second panel begins to enter the viewport
        if (v >= 0.15 && !isComp2Visible) setIsComp2Visible(true);
        if (v < 0.10 && isComp2Visible) setIsComp2Visible(false);
    });

    return (
        <div ref={sectionRef} className="relative h-[250vh]">
            <div className="sticky top-0 h-screen w-full overflow-hidden z-50">
                <motion.div
                    className="flex h-full"
                    style={{ width: "200vw", x }}
                >
                    <div className="h-full w-screen flex-shrink-0">
                        <CoreEngineeringPanel scrollYProgress={smoothProgress} />
                    </div>
                    <div className="h-full w-screen flex-shrink-0">
                        <EmergingResearchPanel isVisible={isComp2Visible} />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default function AboutSection() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // REALIGNED TIMING: Parent is ~900vh long. The first 100vh delay = ~11% (0.11) of total scroll.
    const scale = useTransform(scrollYProgress, [0, 0.12], [1, 0.92]);
    const opacity = useTransform(scrollYProgress, [0.03, 0.12], [1, 0]);
    const yLeadIn = useTransform(scrollYProgress, [0, 0.12], [0, -80]);

    const leadInTriggerRef = useRef(null);

    return (
        <section
            id="about"
            ref={containerRef}
            className="relative bg-background text-foreground dark:bg-black dark:text-white transition-colors duration-500"
        >
            {/* 1. STICKY PLANE - Lead-in */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center z-0 overflow-hidden pointer-events-none">
                <motion.div
                    style={{ scale, opacity, y: yLeadIn }}
                    className="relative px-4 md:px-6 w-full max-w-[1700px] mx-auto"
                    ref={leadInTriggerRef}
                >
                    <AboutLeadIn />
                </motion.div>
            </div>

            {/* 2. OVERLAY LAYER - Hijack Zone & Footer */}
            <div className="relative pointer-events-none mt-[80vh] md:mt-[100vh]">
                {/* Content wrapper with background and border - now arrives later */}
                <div className="bg-background dark:bg-black rounded-t-[50px] md:rounded-t-[80px] transition-colors duration-500 pointer-events-auto relative">
                    {/* Decorative curved edges with fade-out mask for natural transition */}
                    <div 
                        className="absolute top-0 left-0 right-0 h-48 border-t-2 border-x-2 border-neutral-200 dark:border-zinc-800 rounded-t-[50px] md:rounded-t-[80px] pointer-events-none z-[100]" 
                        style={{ maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)' }}
                    />
                    
                    <ScrollHijackSection />
                    <div className="max-w-[1600px] mx-auto">
                        <ProfileIntersection />
                    </div>
                    <AboutClosing />
                    <AboutClosingMobile />
                    <AuditFunnel />
                </div>
            </div>
        </section >
    );
}
