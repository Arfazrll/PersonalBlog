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

const World = dynamic(() => import("@/components/ui/globe").then((m) => m.World), {
    ssr: false,
});

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
        const shuffled = [...GALLERY_IMAGES].sort(() => 0.5 - Math.random()).slice(0, 3);
        const data = shuffled.map((src, i) => ({
            src,
            rotate: Math.round((i - 1) * 15 + (Math.random() * 8 - 4)),
            x: Math.round((i - 1) * 45 + (Math.random() * 10 - 5)),
            y: Math.round(Math.abs(i - 1) * 10 + (Math.random() * 6 - 3)),
        }));
        setRandomData(data);
    }, [mounted]);

    if (!mounted || randomData.length === 0) return null;

    return (
        <div className="relative flex items-center justify-center w-56 h-32 md:w-72 md:h-44 mb-8 lg:mb-10">
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
        <div className="relative w-full max-w-[1500px] mx-auto px-6 md:px-10 lg:px-12 py-8 md:py-12 overflow-visible">
            {/* Header Section: Compact Horizontal Blueprint */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 relative">
                <div className="space-y-4 relative z-30">
                    <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="text-[10px] md:text-[12px] font-mono uppercase tracking-[0.5em] text-primary"
                        style={{ backfaceVisibility: "hidden" }}
                    >
                        {t('leadIn.label')}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.85]"
                        style={{ backfaceVisibility: "hidden" }}
                    >
                        {t('leadIn.applied')} <br />
                        <span className="font-serif-elegant italic font-light lowercase text-primary">{t('leadIn.intelligence')}</span>
                    </motion.h2>
                </div>

                <div className="flex flex-grow items-center justify-center px-4 md:px-0 order-2 md:order-none my-8 md:my-0 pb-10 md:pb-0">
                    <AboutLeadInImageStack />
                </div>

                <div className="text-left md:text-right space-y-4 mt-8 md:mt-0 relative z-30">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
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
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="space-y-4"
                >
                    <span className="text-[10px] font-mono text-primary/60 uppercase tracking-widest">01</span>
                    <p
                        className="text-2xl md:text-3xl lg:text-4xl font-black leading-tight tracking-tight text-foreground"
                        dangerouslySetInnerHTML={{ __html: t.raw('leadIn.thesis') }}
                    />
                </motion.div>

                {/* Col 2: The Scope */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    className="space-y-4 border-l border-primary/10 pl-12 lg:pl-16"
                >
                    <span className="text-[10px] font-mono text-primary/60 uppercase tracking-widest">02</span>
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
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1 }}
                    className="space-y-4 border-l border-primary/10 pl-12 lg:pl-16 flex flex-col justify-between"
                >
                    <div className="space-y-4">
                        <span className="text-[10px] font-mono text-primary/60 uppercase tracking-widest">03</span>
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

    // MOUNT GUARD: Unmount Globe when fully faded to save resources
    const [isGlobeMounted, setIsGlobeMounted] = useState(true);
    useMotionValueEvent(globeOpacity, "change", (v: any) => {
        if (v <= 0 && isGlobeMounted) setIsGlobeMounted(false);
        else if (v > 0 && !isGlobeMounted) setIsGlobeMounted(true);
    });

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
                        {isGlobeMounted && <World data={sampleArcs} globeConfig={globeConfig} />}
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
        <div ref={sectionRef} className="relative h-[300vh]">
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
                    className="relative py-20 px-6 w-full max-w-[1600px] mx-auto"
                    ref={leadInTriggerRef}
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
        </section >
    );
}
