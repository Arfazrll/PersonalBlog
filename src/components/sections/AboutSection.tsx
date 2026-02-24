"use client";

import React, { useRef, useState } from "react";
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
import { useInView } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useCountUp } from "@/hooks/useCountUp";
import { SocialCorner } from "@/components/layout/SocialCorner";
import { cn } from "@/lib/utils";

const World = dynamic(() => import("@/components/ui/globe").then((m) => m.World), {
    ssr: false,
});

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
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const t = useTranslations('about');

    return (
        <div ref={ref} style={{ willChange: "transform, opacity" }} className="relative w-full max-w-[1500px] mx-auto px-6 md:px-10 lg:px-12 py-8 md:py-12 overflow-visible">
            {/* Header Section: Compact Horizontal Blueprint */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 relative">
                <div className="space-y-4">
                    <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        className="text-[10px] md:text-[12px] font-mono uppercase tracking-[0.5em] text-primary"
                    >
                        {t('leadIn.label')}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.85]"
                    >
                        {t('leadIn.applied')} <br />
                        <span className="font-serif-elegant italic font-light lowercase text-primary">{t('leadIn.intelligence')}</span>
                    </motion.h2>
                </div>

                <div className="hidden lg:block flex-grow h-px bg-primary/10 mx-8 mb-4 lg:mb-6" />

                <div className="text-left md:text-right space-y-4 mt-8 md:mt-0">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-3xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.85]"
                    >
                        {t('leadIn.production')} <br />
                        <span className="font-serif-elegant italic font-light lowercase text-primary">{t('leadIn.engineering')}</span>
                    </motion.h2>
                </div>
            </div>

            {/* Main Content: 3-Column Blueprint Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 pt-8 lg:pt-10 relative">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

                {/* Col 1: The Thesis */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 }}
                    className="space-y-4"
                >
                    <span className="text-[10px] font-mono text-primary/60 uppercase tracking-widest">...</span>
                    <p
                        className="text-2xl md:text-3xl lg:text-4xl font-black leading-tight tracking-tight text-foreground"
                        dangerouslySetInnerHTML={{ __html: t.raw('leadIn.thesis') }}
                    />
                </motion.div>

                {/* Col 2: The Scope */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8 }}
                    className="space-y-4 border-l border-primary/10 pl-12 lg:pl-16"
                >
                    <span className="text-[10px] font-mono text-primary/60 uppercase tracking-widest">...</span>
                    <p className="text-[13px] md:text-sm lg:text-[15px] text-muted-foreground leading-relaxed">
                        {t('leadIn.scope')}
                    </p>
                    <div className="h-px w-10 bg-primary/30" />
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed italic">
                        {t('leadIn.bridging')}
                    </p>
                </motion.div>

                {/* Col 3: The Integration & Signoff */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1 }}
                    className="space-y-4 border-l border-primary/10 pl-12 lg:pl-16 flex flex-col justify-between"
                >
                    <div className="space-y-4">
                        <span className="text-[10px] font-mono text-primary/60 uppercase tracking-widest">...</span>
                        <p className="text-[13px] md:text-sm lg:text-[15px] text-muted-foreground leading-relaxed">
                            {t('leadIn.integration')}
                        </p>
                    </div>

                    <div className="pt-8 flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-4xl lg:text-6xl font-signature text-primary">{t('leadIn.signature')}</span>
                            <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-muted-foreground">{t('leadIn.role')}</span>
                        </div>
                    </div>
                </motion.div>
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
    // STABILIZED: Keeps opacity at 1.0 until the slide is nearly finished to prevent "ghosting"
    const contentOpacity = useTransform(scrollYProgress, [0.75, 0.9], [1, 0]);
    const contentScale = useTransform(scrollYProgress, [0.75, 0.9], [1, 0.9]);
    const contentY = useTransform(scrollYProgress, [0.75, 0.9], [0, -50]);

    // INTERNAL TIMING: Globe and Tech Stack reveal [0.0 -> 0.35]
    const globeOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    const logoOpacity = useTransform(scrollYProgress, [0.15, 0.35], [0, 1]);

    // SLIDE OFFSET: Shift text column to make room for logos
    const textSlideX = useTransform(scrollYProgress, [0.15, 0.35], ["0%", "-92%"]);

    // Text alignment: right-aligned -> left-aligned after slide
    const [textIsLeft, setTextIsLeft] = useState(false);
    useMotionValueEvent(scrollYProgress, "change", (v: any) => {
        setTextIsLeft(v > 0.25);
    });
    const t = useTranslations('about');

    const gpaValue = useCountUp(3.8, 2000, 1);
    const projectsValue = useCountUp(19, 2000, 0);
    const expValue = useCountUp(2, 1500, 0);

    // Jakarta, Indonesia as default (fallback)
    const [userLat, setUserLat] = React.useState(-6.2088);
    const [userLng, setUserLng] = React.useState(106.8456);

    React.useEffect(() => {
        if (typeof window !== "undefined" && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setUserLat(pos.coords.latitude);
                    setUserLng(pos.coords.longitude);
                },
                () => { /* keep Jakarta fallback */ }
            );
        }
    }, []);

    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    const globeConfig = {
        pointSize: 4,
        globeColor: "#062056",
        showAtmosphere: true,
        atmosphereColor: isDark ? "#FFFFFF" : "#60a5fa",
        atmosphereAltitude: 0.1,
        emissive: "#062056",
        emissiveIntensity: 0.1,
        shininess: 0.9,
        polygonColor: "rgba(255, 255, 255, 0.7)",
        ambientLight: isDark ? "#38bdf8" : "#3b82f6",
        directionalLeftLight: isDark ? "#ffffff" : "#3b82f6",
        directionalTopLight: isDark ? "#ffffff" : "#ffffff",
        pointLight: isDark ? "#ffffff" : "#3b82f6",
        arcTime: 1000,
        arcLength: 0.9,
        rings: 1,
        maxRings: 3,
        initialPosition: { lat: -6.2088, lng: 106.8456 },
        autoRotate: true,
        autoRotateSpeed: 0.5,
    };

    const colors = isDark ? ["#06b6d4", "#3b82f6", "#6366f1"] : ["#3b82f6", "#2563eb", "#1d4ed8"];
    const sampleArcs = [
        { order: 1, startLat: userLat, startLng: userLng, endLat: 35.6762, endLng: 139.6503, arcAlt: 0.3, color: colors[0] },
        { order: 2, startLat: userLat, startLng: userLng, endLat: 37.7749, endLng: -122.4194, arcAlt: 0.5, color: colors[1] },
        { order: 3, startLat: userLat, startLng: userLng, endLat: 52.3676, endLng: 4.9041, arcAlt: 0.4, color: colors[2] },
    ];

    return (
        <div className="w-screen h-full flex items-center bg-background transition-colors duration-500 overflow-hidden">
            <div className="max-w-[1500px] w-full mx-auto px-[3%] h-full relative">

                {/* ─── GLOBE: absolute left-half, fades out ─── */}
                <motion.div
                    style={{ opacity: globeOpacity }}
                    className="hidden lg:block absolute left-0 top-0 w-1/2 h-full z-10 pointer-events-none"
                >
                    <div className="relative w-full h-full">
                        <World data={sampleArcs} globeConfig={globeConfig} />
                    </div>
                </motion.div>

                {/* ─── TEXT: starts at right-half, slides into left-half ─── */}
                <motion.div
                    style={{
                        opacity: contentOpacity,
                        scale: contentScale,
                        x: textSlideX,
                        y: contentY,
                        willChange: "transform, opacity",
                        transform: 'translate3d(0,0,0)'
                    }}
                    className={`absolute right-0 top-0 w-full lg:w-1/2 h-full flex flex-col justify-center z-20 space-y-10 transition-[text-align,align-items] duration-500 ${textIsLeft ? "items-start text-left" : "items-center lg:items-end text-right"
                        }`}
                >
                    <div className="space-y-4">
                        <motion.span
                            initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-[12px] md:text-[13px] font-mono uppercase tracking-[0.2em] text-muted-foreground block"
                        >
                            {t('coreEngineering.label')}
                        </motion.span>
                        <motion.h3
                            initial={{ clipPath: "inset(0 100% 0 0)" }} whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="text-[40px] md:text-[54px] font-bold text-foreground leading-[1.1] tracking-tight"
                            dangerouslySetInnerHTML={{ __html: t.raw('coreEngineering.title') }}
                        />
                    </div>

                    <div className="space-y-5 max-w-[620px]">
                        {[
                            { text: t('coreEngineering.p1'), delay: 0.5 },
                            { text: t('coreEngineering.p2'), delay: 0.6 },
                            { text: t('coreEngineering.p3'), delay: 0.7 },
                        ].map((p, i) => (
                            <motion.p key={i}
                                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: p.delay }}
                                className="text-[13px] md:text-sm lg:text-[15px] text-muted-foreground leading-relaxed"
                            >
                                {p.text}
                            </motion.p>
                        ))}
                    </div>

                    <div className="flex flex-row gap-10 md:gap-16 pt-2">
                        {[
                            { val: gpaValue, label: t('coreEngineering.gpa'), suffix: "", delay: 0.8 },
                            { val: projectsValue, label: t('coreEngineering.projects'), suffix: "+", delay: 0.9 },
                            { val: expValue, label: t('coreEngineering.years'), suffix: "+", delay: 1.0 },
                        ].map((stat, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: stat.delay }}
                                className="flex flex-col gap-2"
                            >
                                <span className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground">
                                    {i === 0 ? stat.val : Math.floor(Number(stat.val))}{stat.suffix}
                                </span>
                                <span className="text-[11px] md:text-[12px] uppercase tracking-[0.15em] text-muted-foreground">
                                    {stat.label}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* ─── LOGO GRID: right-half, fades in AFTER globe disappears ─── */}
                <motion.div
                    style={{ opacity: logoOpacity }}
                    className="hidden lg:flex absolute right-0 top-0 w-1/2 h-full items-center justify-center z-10 pointer-events-none"
                >
                    <div className="flex flex-col justify-center px-10 lg:px-20 w-full">

                        <div className="grid grid-cols-4 md:grid-cols-5 gap-x-10 gap-y-14">
                            {TECH_LOGOS.map((tech) => (
                                <div key={tech.slug} className="flex flex-col items-center gap-3 group/tech pointer-events-auto cursor-pointer">
                                    <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center brightness-0 dark:brightness-100 opacity-70 dark:opacity-40 grayscale group-hover/tech:opacity-100 group-hover/tech:grayscale-0 group-hover/tech:brightness-100 transition-all duration-500 scale-90 group-hover/tech:scale-110">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={`https://cdn.simpleicons.org/${tech.slug}`}
                                            alt={tech.name}
                                            width={48} height={48}
                                            className={cn(
                                                "w-full h-full object-contain",
                                                ["nextdotjs", "langchain", "flask", "solidity", "prisma"].includes(tech.slug) && "dark:invert"
                                            )}
                                            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                                        />
                                    </div>
                                    <span className="text-[10px] font-mono uppercase tracking-[0.08em] text-foreground/40 dark:text-muted-foreground/40 group-hover/tech:text-primary dark:group-hover/tech:text-primary transition-colors duration-500 text-center leading-tight">
                                        {tech.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

const EmergingResearchPanel = ({ isVisible }: { isVisible: boolean }) => {
    const isMobile = useIsMobile();
    const t = useTranslations('about');

    return (
        <div className="w-screen h-full flex items-center bg-background overflow-hidden transition-colors duration-500">
            <WarpBackground
                perspective={1200}
                gridColor="transparent"
                beamsPerSide={isMobile ? 2 : 6}
                beamDuration={2.5}
                beamDelayMax={1}
                className="border-none p-0 bg-transparent rounded-none h-full w-full flex items-center justify-center"
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full h-full px-[8%] md:px-[10%]">
                    {/* Left Side: Content */}
                    <div className="lg:col-span-12 space-y-12 z-10 flex flex-col items-center text-center">
                        <div className="space-y-4 max-w-2xl">
                            <motion.span
                                initial={{ opacity: 0, y: 30 }}
                                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                transition={{ duration: 0.5 }}
                                className="text-[12px] md:text-[13px] font-mono uppercase tracking-[0.2em] text-gray-400 block"
                            >
                                {t('emergingResearch.label')}
                            </motion.span>
                            <motion.h3
                                initial={{ opacity: 0, y: 50 }}
                                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                                transition={{ duration: 0.6, delay: 0.15 }}
                                className="text-[36px] md:text-[50px] font-bold text-foreground uppercase leading-tight tracking-tight"
                                dangerouslySetInnerHTML={{ __html: t.raw('emergingResearch.title') }}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
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
                                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
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
                        className="relative w-full h-full min-h-[600px] lg:min-h-[800px] shadow-2xl shadow-black/20 dark:shadow-white/5 bg-zinc-100 dark:bg-zinc-900"
                        style={{ willChange: "clip-path" }}
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
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-1000" />
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
                                <h4 className="text-sm font-mono uppercase tracking-[0.3em] text-primary">{t('profile.narrativeLabel')}</h4>
                                <ScrollReveal
                                    baseOpacity={0.4}
                                    enableBlur={false}
                                    blurStrength={2}
                                    textClassName="text-base md:text-lg text-foreground/90 leading-relaxed font-medium"
                                    containerClassName="!my-0"
                                >
                                    {t('profile.narrative')}
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

// --- Sub-Components for Opposite Scroll ---
const ExperienceCard = ({ exp, index }: { exp: any, index: number }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ x: 4 }}
        className="group relative pl-8 border-l-2 border-foreground/10 dark:border-white/5 hover:border-primary transition-colors duration-500 py-16 cursor-default flex flex-col justify-center min-h-[50vh]"
    >
        <h4 className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
            {exp.company}
        </h4>
        <div className="text-[12px] font-mono uppercase tracking-[0.2em] text-muted-foreground/40 font-bold mt-2">
            {exp.role}
        </div>
        <p className="text-[16px] text-muted-foreground/60 leading-relaxed max-w-lg font-medium mt-6 group-hover:text-muted-foreground/90 transition-colors">
            {exp.desc}
        </p>
    </motion.div>
);

const ProjectCard = ({ proj, index }: { proj: any, index: number }) => (
    <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: index * 0.1 }}
        className="space-y-4"
    >
        <h4 className="text-2xl md:text-3xl font-bold text-foreground">
            {proj.title}
        </h4>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            {proj.desc}
        </p>
    </motion.div>
);


const ViewMoreCard = ({ href, title }: { href: string, title: string }) => {
    const t = useTranslations('about');
    return (
        <Link href={href} className="group block">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="p-8 border-2 border-dashed border-primary/20 rounded-2xl flex flex-col items-center justify-center gap-6 group-hover:border-primary/50 group-hover:bg-primary/5 transition-all duration-500 min-h-[25vh]"
            >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <ArrowRight className="w-8 h-8 text-primary" />
                </div>
                <div className="text-center space-y-2">
                    <p className="text-xs font-mono uppercase tracking-[0.2em] text-primary/60 group-hover:text-primary transition-colors">{t('closing.discoverMore')}</p>
                    <h4 className="text-2xl font-bold text-foreground group-hover:italic transition-all">{title}</h4>
                </div>
            </motion.div>
        </Link>
    );
};

const GhostedHeader = ({ label, part1, part2 }: { label: string, part1: string, part2: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="space-y-2 mb-12 h-32 flex flex-col justify-end"
    >
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground/40 block">
            {label}
        </span>
        <h3 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none whitespace-nowrap">
            {part1} <span className="text-black/10 dark:text-white/[0.05]">{part2}</span>
        </h3>
    </motion.div>
);

const AboutClosing = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const leftTrackRef = useRef<HTMLDivElement>(null);
    const rightTrackRef = useRef<HTMLDivElement>(null);

    const [leftMax, setLeftMax] = React.useState(0);
    const [rightMax, setRightMax] = React.useState(0);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    // Calculate translation distance based on content vs viewport
    React.useLayoutEffect(() => {
        const updateBounds = () => {
            if (leftTrackRef.current && rightTrackRef.current) {
                const viewportH = window.innerHeight * 0.6; // Approx area minus headers
                const leftH = leftTrackRef.current.scrollHeight;
                const rightH = rightTrackRef.current.scrollHeight;

                setLeftMax(Math.max(0, leftH - viewportH));
                setRightMax(Math.max(0, rightH - viewportH));
            }
        };

        updateBounds();
        window.addEventListener("resize", updateBounds);
        return () => window.removeEventListener("resize", updateBounds);
    }, []);

    const leftY = useTransform(scrollYProgress, [0.15, 0.7], [0, -leftMax]);
    const rightY = useTransform(scrollYProgress, [0.15, 0.7], [-rightMax, 0]);

    // Section Visibility: Smoother fade in/out that respects the focus area
    const sectionOpacity = useTransform(
        scrollYProgress,
        [0, 0.05, 0.85, 0.98],
        [0, 1, 1, 0]
    );

    const smoothLeftY = useSpring(leftY, { stiffness: 40, damping: 20, mass: 0.1, restDelta: 0.001 });
    const smoothRightY = useSpring(rightY, { stiffness: 40, damping: 20, mass: 0.1, restDelta: 0.001 });

    const t = useTranslations('about');
    const experiences = t.raw('closing.experiencesList');

    const projects = t.raw('closing.projectsList');

    return (
        <section ref={sectionRef} className="relative h-[400vh] hidden md:block z-50 bg-background">
            <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">

                {/* Visual Anchors: Fade Masks */}
                <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-background to-transparent z-20 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none" />

                <motion.div
                    style={{ opacity: sectionOpacity }}
                    className="max-w-[1600px] mx-auto w-full px-12 md:px-20"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 h-[70vh]">

                        {/* LEFT: KEY EXPERIENCE (Scrolls UP) */}
                        <div className="flex flex-col h-full overflow-hidden">
                            <GhostedHeader label={t('closing.experience.label')} part1={t('closing.experience.title1')} part2={t('closing.experience.title2')} />
                            <div className="flex-1 relative overflow-hidden">
                                <motion.div
                                    ref={leftTrackRef}
                                    style={{ y: smoothLeftY, willChange: "transform" }}
                                    className="space-y-[15vh]"
                                >
                                    {experiences.map((exp: any, i: number) => (
                                        <ExperienceCard key={i} exp={exp} index={i} />
                                    ))}
                                    <ViewMoreCard href="/experience" title={t('closing.experience.viewMore')} />
                                    {/* Ruang kosong di akhir agar item terakhir sejajar di atas sebelum exit */}
                                    <div className="h-[60vh]" />
                                </motion.div>
                            </div>
                        </div>

                        {/* RIGHT: FLAGSHIP PROJECTS (Scrolls DOWN) */}
                        <div className="flex flex-col h-full overflow-hidden">
                            <GhostedHeader label={t('closing.projects.label')} part1={t('closing.projects.title1')} part2={t('closing.projects.title2')} />
                            <div className="flex-1 relative overflow-hidden">
                                <motion.div
                                    ref={rightTrackRef}
                                    style={{ y: smoothRightY, willChange: "transform" }}
                                    className="space-y-[15vh]"
                                >
                                    <div className="h-[80vh] hidden lg:block" /> {/* Top padding for projects to align with empty space and exit cleanly */}
                                    <ViewMoreCard href="/projects" title={t('closing.projects.viewMore')} />
                                    {projects.map((proj: any, i: number) => (
                                        <ProjectCard key={i} proj={proj} index={i} />
                                    ))}
                                    {/* Ruang kosong di akhir agar item terakhir sejajar di atas sebelum exit */}
                                    <div className="h-[60vh]" />
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

    const images = [
        "https://images.unsplash.com/photo-1550741111-3d5f730d28aa?q=80&w=400&h=300&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=400&h=300&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=400&h=300&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=400&h=300&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1504384308090-c89e170e6929?q=80&w=400&h=300&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=400&h=300&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=400&h=300&auto=format&fit=crop"
    ];

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
        [0, 0.5, 0.85, 1],
        ["0vw", "0vw", "-100vw", "-100vw"]
    );

    const [isComp2Visible, setIsComp2Visible] = React.useState(false);
    useMotionValueEvent(smoothProgress, "change", (v: any) => {
        // Trigger precisely as the second panel begins to enter the viewport
        if (v >= 0.55 && !isComp2Visible) setIsComp2Visible(true);
        if (v < 0.50 && isComp2Visible) setIsComp2Visible(false);
    });

    return (
        <div ref={sectionRef} className="relative h-[400vh]">
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

    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.85]);
    const opacity = useTransform(scrollYProgress, [0.05, 0.25], [1, 0]);
    const yLeadIn = useTransform(scrollYProgress, [0, 0.3], [0, -350]);

    return (
        <section
            id="about"
            ref={containerRef}
            className="relative bg-background text-foreground dark:bg-black dark:text-white transition-colors duration-500"
        >
            {/* 1. STICKY PLANE - Lead-in */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center z-0 overflow-hidden pointer-events-none">
                <motion.div
                    style={{ scale, opacity, y: yLeadIn, willChange: "transform, opacity" }}
                    className="relative py-20 px-6 w-full max-w-[1600px] mx-auto"
                >
                    <AboutLeadIn />
                </motion.div>
            </div>



            {/* 2. OVERLAY LAYER - Hijack Zone & Footer */}
            <div className="relative pointer-events-none">
                {/* Removed transparent gap to close visual hole */}

                {/* Content wrapper with background and border - now arrives later */}
                <div className="bg-background dark:bg-black border-t border-foreground/10 dark:border-white/5 transition-colors duration-500 pointer-events-auto">
                    <ScrollHijackSection />
                    <div className="max-w-[1600px] mx-auto">
                        <ProfileIntersection />
                    </div>
                    <AboutClosing />
                    <AboutClosingMobile />
                    <AuditFunnel />
                </div>
            </div>
        </section>
    );
}
