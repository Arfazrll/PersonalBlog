'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsMobile } from "@/hooks/useIsMobile";

import { Sparkles, ChevronDown, Mail, ArrowRight, ArrowDown } from 'lucide-react';
import { LoadingScreen } from '@/components/layout';
import { TextPressure } from '@/components/ui/TextPressure';
import { portfolioData } from '@/data/portfolio';
import { cn } from "@/lib/utils";
import { SocialCorner } from '@/components/layout/SocialCorner';

const Footer = dynamic(() => import("@/components/layout/Footer").then(mod => mod.Footer), {
    ssr: false
});

const Hyperspeed = dynamic(() => import('@/components/ui/Hyperspeed'), { ssr: false });
const { hyperspeedPresets } = require('@/components/ui/Hyperspeed');

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const Scene3D = dynamic(() => import('@/components/three/Scene3D').then(mod => ({ default: mod.Scene3D })), {
    ssr: false,
    loading: () => null
});

const AboutSection = dynamic(() => import("@/components/sections/AboutSection"), {
    ssr: false,
    loading: () => <div className="h-[600px] w-full animate-pulse bg-zinc-100/5 dark:bg-zinc-800/5" />
});

const ExpertiseSection = dynamic(() => import("@/components/sections/ExpertiseSection"), {
    ssr: false,
    loading: () => <div className="h-[500px] w-full animate-pulse bg-zinc-100/5 dark:bg-zinc-800/5" />
});

const welcomeWords = [
    { lang: 'English', text: 'Hello, I am' },
    { lang: 'Indonesian', text: 'Halo, saya' },
    { lang: 'Spanish', text: 'Hola, soy' },
    { lang: 'French', text: 'Bonjour, je suis' },
    { lang: 'German', text: 'Hallo, ich bin' },
    { lang: 'Japanese', text: 'こんにちは、私は' },
    { lang: 'Korean', text: '안녕하세요, 저는' },
    { lang: 'Chinese', text: '你好，我是' },
    { lang: 'Arabic', text: 'مرحبًا ، أنا' },
    { lang: 'Russian', text: 'Привет, я' },
    { lang: 'Italian', text: 'Ciao, sono' },
    { lang: 'Portuguese', text: 'Olá, eu sou' },
];

function MultilingualWelcome({ isDarkMode }: { isDarkMode: boolean }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % welcomeWords.length);
        }, 2000);
        return () => clearInterval(timer);
    }, []);

    return (
        <AnimatePresence mode="wait">
            <motion.p
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="text-base md:text-lg font-mono uppercase tracking-[0.2em] text-primary/80 font-bold"
            >
                {welcomeWords[index].text}
            </motion.p>
        </AnimatePresence>
    );
}

function AnimatedBackground({ scrollYProgress }: { scrollYProgress: any }) {
    const isMobile = useIsMobile();
    const yTransform = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

    return (
        <motion.div
            style={{ y: isMobile ? 0 : yTransform, opacity }}
            className="absolute inset-0 overflow-hidden pointer-events-none"
        >
            <div
                className="absolute inset-0 opacity-[0.08] dark:opacity-[0.01]"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(0,0,0,0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.2) 1px, transparent 1px)
          `,
                    backgroundSize: '80px 80px',
                }}
            />
        </motion.div>
    );
}

function HeroIntro() {
    const containerRef = useRef<HTMLElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothX = useSpring(mouseX, { stiffness: 40, damping: 20, mass: 0.1 });
    const smoothY = useSpring(mouseY, { stiffness: 40, damping: 20, mass: 0.1 });
    const [isDarkMode, setIsDarkMode] = useState(true);
    const t = useTranslations('hero');
    const isMobile = useIsMobile();
    const rafRef = useRef<number | null>(null);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (isMobile) return;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            mouseX.set((clientX - innerWidth / 2) / 40);
            mouseY.set((clientY - innerHeight / 2) / 40);
        });
    }, [isMobile, mouseX, mouseY]);

    useEffect(() => {
        if (isMobile) return;
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [handleMouseMove, isMobile]);

    useEffect(() => {
        const checkTheme = () => {
            setIsDarkMode(document.documentElement.classList.contains('dark'));
        };
        checkTheme();
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    const currentHyperspeedOptions = useMemo(() => {
        if (isDarkMode) return hyperspeedPresets.one;
        return {
            ...hyperspeedPresets.one,
            colors: {
                ...hyperspeedPresets.one.colors,
                background: 0xf8fafc,
                shoulderLines: 0x0f172a,
                sticks: 0x3b82f6,
            }
        };
    }, [isDarkMode]);

    const [isInView, setIsInView] = useState(false);
    const [isFullyReady, setIsFullyReady] = useState(false);

    useEffect(() => {
        if (!containerRef.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => setIsInView(entry.isIntersecting),
            { threshold: 0, rootMargin: '200px' }
        );
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (isInView) {
            const timer = setTimeout(() => setIsFullyReady(true), 1000);
            return () => clearTimeout(timer);
        } else {
            setIsFullyReady(false);
        }
    }, [isInView]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);
    const heroScrollY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);

    return (
        <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-12">
            <AnimatedBackground scrollYProgress={scrollYProgress} />
            <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${isFullyReady ? 'opacity-100' : 'opacity-0'}`}>
                <Hyperspeed effectOptions={currentHyperspeedOptions} className={isDarkMode ? "opacity-40" : "opacity-20"} paused={!isFullyReady} />
                <div className={`absolute inset-0 bg-gradient-to-b ${isDarkMode ? "from-background/0 via-background/40 to-background" : "from-white/0 via-white/50 to-white"}`} />
            </div>
            <Scene3D className={`opacity-10 transition-opacity duration-1000 ${isFullyReady ? 'opacity-10' : 'opacity-0'}`} paused={!isFullyReady} />
            <motion.div className="hero-content relative z-10 container-creative text-center px-4 max-w-5xl mx-auto" style={{ x: isMobile ? 0 : smoothX, y: isMobile ? 0 : smoothY, opacity: heroOpacity, scale: heroScale, translateY: heroScrollY }}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }} className="hero-badge inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass-card text-sm font-medium mb-10 border-primary/20 backdrop-blur-xl">
                    <span className="relative flex h-2.5 w-2.5">
                        <motion.span animate={{ scale: [1, 3], opacity: [0.6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }} className="absolute inline-flex h-full w-full rounded-full bg-green-400" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                    </span>
                    <span className="tracking-wide text-foreground/80">{t('badge')}</span>
                    <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }} className="hero-welcome mb-[-25px] h-6 flex items-center justify-center overflow-hidden">
                    <MultilingualWelcome isDarkMode={isDarkMode} />
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.0, delay: 1.5, ease: [0.16, 1, 0.3, 1] }} className="hero-name mb-4 w-full max-w-6xl mx-auto flex items-center justify-center">
                    <div className="hidden lg:block w-full h-[220px] relative">
                        <TextPressure text="Syahril Arfian Almazril" flex={true} alpha={false} stroke={false} width={true} weight={true} italic={true} textColor="hsl(var(--foreground))" strokeColor="#ff0000" minFontSize={120} />
                    </div>
                    <div className="block lg:hidden w-full text-center px-4">
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-foreground">Syahril <br /> Arfian <br /> Almazril</h1>
                    </div>
                </motion.div>
                <div className="mt-4 mb-8 flex flex-col items-center gap-2">
                    <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 2.2, ease: "easeInOut" }} className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent opacity-80 md:opacity-50" />
                    <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 2.5, ease: [0.25, 0.46, 0.45, 0.94] }} className="text-xl md:text-2xl lg:text-3xl text-foreground/90 dark:text-foreground/80 font-medium tracking-wide">
                        {portfolioData.personal.title} <span className="text-primary mx-2 font-bold">•</span> {t('role')}
                    </motion.p>
                    <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 2.2, ease: "easeInOut" }} className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent opacity-80 md:opacity-50" />
                </div>
                <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 2.8, ease: [0.25, 0.46, 0.45, 0.94] }} className="hero-subtitle text-base md:text-lg text-muted-foreground/70 max-w-2xl mx-auto mb-12 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.raw('description') }} />
                <motion.div className="hero-cta flex justify-center" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 3.2, ease: [0.25, 0.46, 0.45, 0.94] }}>
                    <Link href="#about" className="group flex items-center gap-4 text-sm font-black uppercase tracking-[0.4em] text-foreground/40 hover:text-foreground transition-all duration-700" onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }}>
                        <span className="relative">{t('cta.exploreMore')}<span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-700" /></span>
                        <ArrowDown className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-y-3 transition-all duration-700" />
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
}

const StatsSection = dynamic(() => import("@/components/sections/StatsSection"), {
    ssr: false,
    loading: () => <div className="h-[500px] w-full animate-pulse bg-zinc-100/5 dark:bg-zinc-800/5" />
});

const CTASection = dynamic(() => import("@/components/sections/CTASection"), {
    ssr: false,
    loading: () => <div className="h-[400px] w-full animate-pulse bg-zinc-100/5 dark:bg-zinc-800/5" />
});

const MetricCTAHijack = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
    return (
        <section ref={containerRef} className="relative bg-background dark:bg-black">
            <div className="sticky top-0 h-screen w-full z-10 bg-background dark:bg-black overflow-hidden">
                <StatsSection scrollYProgress={scrollYProgress} />
            </div>
            <div className="h-[150vh] pointer-events-none" />
            <div className="relative z-50 bg-background dark:bg-black shadow-[0_-20px_50px_rgba(0,0,0,0.5)] dark:shadow-[0_-50px_120px_rgba(0,0,0,0.9)]" style={{ transform: 'translate3d(0,0,0)' }}>
                <div className="h-[15vh]" />
                <CTASection />
                <div className="h-10" />
            </div>
        </section>
    );
};

export default function HomePage() {
    const [isLoading, setIsLoading] = useState(true);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const hasLoaded = sessionStorage.getItem('portfolioLoaded');
        if (hasLoaded) {
            setIsLoading(false);
            setIsExiting(true);
        }

        if (typeof window === 'undefined' || !('ResizeObserver' in window)) return;
        const refreshLayout = () => {
            window.dispatchEvent(new Event('resize'));
            ScrollTrigger.refresh();
        };
        const resizeObserver = new ResizeObserver(() => { refreshLayout(); });
        resizeObserver.observe(document.body);
        window.addEventListener('load', refreshLayout);
        const ctx = gsap.context(() => {});
        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('load', refreshLayout);
            ctx.revert();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    useEffect(() => {
        if (isExiting) {
            const refreshStages = [100, 500, 1000, 2000, 5000];
            refreshStages.forEach(delay => {
                setTimeout(() => { ScrollTrigger.refresh(); }, delay);
            });
        }
    }, [isExiting]);

    const handleLoadingComplete = () => {
        setIsLoading(false);
        window.scrollTo({ top: 0, behavior: 'instant' });
        sessionStorage.setItem('portfolioLoaded', 'true');
        setTimeout(() => { ScrollTrigger.refresh(); }, 100);
    };

    const handleExitStart = () => { setIsExiting(true); };

    return (
        <>
            {isLoading && <LoadingScreen onComplete={handleLoadingComplete} onExitStart={handleExitStart} duration={2500} />}
            <motion.main initial={{ opacity: 0, scale: 1.05 }} animate={isExiting ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }} className="relative overflow-x-clip">
                <HeroIntro />
                <ExpertiseSection />
                <AboutSection />
                <MetricCTAHijack />
                <SocialCorner className="fixed bottom-12 right-12 z-[30]" />
            </motion.main>
        </>
    );
}
