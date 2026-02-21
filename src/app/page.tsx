'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { useSpring as useReactSpring, animated, config } from '@react-spring/web';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsMobile } from "@/hooks/useIsMobile";
import { useTextScramble } from "@/hooks/useTextScramble";
import type { ISourceOptions } from '@tsparticles/engine';
import AOS from 'aos';
import 'aos/dist/aos.css';
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

const particlesOptions: ISourceOptions = {
    background: { color: { value: 'transparent' } },
    fpsLimit: 60,
    particles: {
        color: { value: ['#3b82f6', '#8b5cf6', '#06b6d4'] },
        links: {
            color: '#ffffff',
            distance: 150,
            enable: true,
            opacity: 0.1,
            width: 1,
        },
        move: {
            enable: true,
            speed: 1,
            direction: 'none',
            random: true,
            straight: false,
            outModes: { default: 'out' },
        },
        number: { density: { enable: true }, value: 25 },
        opacity: { value: { min: 0.1, max: 0.4 } },
        size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
};

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

    // Parallax logic: grid moves slower (0.3x)
    const yTransform = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

    return (
        <motion.div
            style={{ y: isMobile ? 0 : yTransform, opacity }}
            className="absolute inset-0 overflow-hidden pointer-events-none"
        >
            {/* Grid pattern - works for both light and dark */}
            <div
                className="absolute inset-0 opacity-[0.04] dark:opacity-[0.01]"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(0,0,0,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.15) 1px, transparent 1px)
          `,
                    backgroundSize: '80px 80px',
                }}
            />
        </motion.div>
    );
}

function ScrollIndicator() {
    const t = useTranslations('hero');
    return (
        <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.8 }}
        >
            <motion.div
                className="flex flex-col items-center gap-4 cursor-pointer group"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
                <div className="flex flex-col items-center">
                    <motion.div
                        className="w-8 h-14 rounded-full border-2 border-primary/30 flex flex-col items-center justify-start p-1 backdrop-blur-sm"
                        whileHover={{ borderColor: 'rgba(59, 130, 246, 0.6)' }}
                    >
                        <motion.div
                            className="flex flex-col items-center gap-1"
                            animate={{ y: [0, 20, 0] }}
                            transition={{ duration: 1.8, repeat: Infinity }}
                        >
                            <ChevronDown className="w-4 h-4 text-primary" />
                            <ChevronDown className="w-4 h-4 text-primary/50 -mt-2" />
                        </motion.div>
                    </motion.div>
                </div>
                <span className="text-xs text-muted-foreground uppercase tracking-[0.2em] group-hover:text-foreground transition-colors">
                    {t('scroll')}
                </span>
            </motion.div>
        </motion.div>
    );
}

function HeroIntro() {
    const containerRef = useRef<HTMLElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isDarkMode, setIsDarkMode] = useState(true);
    const t = useTranslations('hero');
    const isMobile = useIsMobile();

    const [springProps, api] = useReactSpring(() => ({
        xy: [0, 0],
        config: config.gentle,
    }));

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (isMobile) return;
        requestAnimationFrame(() => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            const x = (clientX - innerWidth / 2) / 40;
            const y = (clientY - innerHeight / 2) / 40;
            api.start({ xy: [x, y] });
            setMousePosition({ x, y });
        });
    }, [api, isMobile]);

    useEffect(() => {
        if (isMobile) return;
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
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

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            // Only keeping the scroll-triggered exit animation, 
            // the entrance is now handled by Framer Motion for better control
            gsap.to('.hero-content', {
                scale: 0.9,
                filter: 'blur(20px)',
                opacity: 0,
                y: -100,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 0.5,
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const firstName = portfolioData.personal.name.split(' ')[0];
    const lastName = portfolioData.personal.name.split(' ').slice(1).join(' ');

    const currentHyperspeedOptions = useMemo(() => {
        if (isDarkMode) return hyperspeedPresets.one;
        return {
            ...hyperspeedPresets.one,
            colors: {
                ...hyperspeedPresets.one.colors,
                background: 0xf8fafc, // slate-50
                shoulderLines: 0x0f172a, // slate-900 (the grid lines)
                sticks: 0x3b82f6, // blue-500
            }
        };
    }, [isDarkMode]);

    const [isInView, setIsInView] = useState(true);

    useEffect(() => {
        if (!containerRef.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => setIsInView(entry.isIntersecting),
            {
                threshold: 0,
                rootMargin: '200px' // Start rendering 200px before entering viewport
            }
        );
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const { scrambledText } = useTextScramble("Syahril Arfian Almazril", true, 300);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden pt-12"
            style={{ willChange: 'transform' }}
        >
            <AnimatedBackground scrollYProgress={scrollYProgress} />

            {/* Hyperspeed Background - Persistent mount with paused state for smoothness */}
            <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
                <Hyperspeed
                    effectOptions={currentHyperspeedOptions}
                    className={isDarkMode ? "opacity-40" : "opacity-20"}
                    paused={!isInView}
                />
                <div className={`absolute inset-0 bg-gradient-to-b ${isDarkMode
                    ? "from-background/0 via-background/40 to-background"
                    : "from-white/0 via-white/50 to-white"
                    }`} />
            </div>

            {/* 3D Scene - Persistent mount for stable layout */}
            <Scene3D className={`opacity-10 transition-opacity duration-1000 ${isInView ? 'opacity-10' : 'opacity-0'}`} />

            {/* Main Content */}
            <animated.div
                className="hero-content relative z-10 container-creative text-center px-4 max-w-5xl mx-auto"
                style={{
                    transform: isMobile ? 'none' : springProps.xy.to((x, y, ...args: any[]) => `translate3d(${x}px, ${y}px, 0)`),
                    willChange: 'transform, opacity'
                }}
            >
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="hero-badge inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass-card text-sm font-medium mb-10 border-primary/20 backdrop-blur-xl"
                >
                    <span className="relative flex h-2.5 w-2.5">
                        <motion.span
                            animate={{ scale: [1, 3], opacity: [0.6, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                            className="absolute inline-flex h-full w-full rounded-full bg-green-400"
                        />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                    </span>
                    <span className="tracking-wide text-foreground/80">{t('badge')}</span>
                    <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                </motion.div>

                {/* Multilingual Welcome */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="hero-welcome mb-[-25px] h-6 flex items-center justify-center overflow-hidden"
                >
                    <MultilingualWelcome isDarkMode={isDarkMode} />
                </motion.div>

                {/* Name - Canvas Text */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="hero-name mb-4 w-full max-w-6xl mx-auto flex items-center justify-center"
                >
                    {/* Desktop Name */}
                    <div className="hidden lg:block w-full h-[220px] relative">
                        <TextPressure
                            text="Syahril Arfian Almazril"
                            flex={true}
                            alpha={false}
                            stroke={false}
                            width={true}
                            weight={true}
                            italic={true}
                            textColor="hsl(var(--foreground))"
                            strokeColor="#ff0000"
                            minFontSize={120}
                        />
                    </div>
                    {/* Mobile Name */}
                    <div className="block lg:hidden w-full text-center px-4">
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-foreground">
                            Syahril <br /> Arfian <br /> Almazril
                        </h1>
                    </div>
                </motion.div>

                {/* Title & Divider */}
                <div className="mt-4 mb-8 flex flex-col items-center gap-2">
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.4, delay: 2.0, ease: "easeInOut" }}
                        className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"
                    />
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 2.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="text-xl md:text-2xl lg:text-3xl text-foreground/80 font-medium tracking-wide"
                    >
                        {portfolioData.personal.title} <span className="text-primary mx-2">•</span> {t('role')}
                    </motion.p>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.4, delay: 2.0, ease: "easeInOut" }}
                        className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"
                    />
                </div>

                {/* Subtitle / Tagline */}
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 2.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="hero-subtitle text-base md:text-lg text-muted-foreground/70 max-w-2xl mx-auto mb-12 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: t.raw('description') }}
                />

                {/* Minimalist Explore More Link */}
                <motion.div
                    className="hero-cta flex justify-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 2.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <Link
                        href="#about"
                        className="group flex items-center gap-4 text-sm font-black uppercase tracking-[0.4em] text-foreground/40 hover:text-foreground transition-all duration-700"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        <span className="relative">
                            {t('cta.exploreMore')}
                            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-700" />
                        </span>
                        <ArrowDown className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-y-3 transition-all duration-700" />
                    </Link>
                </motion.div>
            </animated.div>
        </section >
    );
}

function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            className={`group relative border border-black/5 dark:border-white/10 bg-white dark:bg-gray-900/40 overflow-hidden rounded-3xl shadow-sm dark:shadow-none ${className}`}
            onMouseMove={handleMouseMove}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                          650px circle at ${mouseX}px ${mouseY}px,
                          rgba(59, 130, 246, 0.05),
                          transparent 80%
                        )
                      `,
                }}
            />
            {children}

            {/* Holographic Border Effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                          400px circle at ${mouseX}px ${mouseY}px,
                          rgba(59, 130, 246, 0.1),
                          transparent 40%
                        )
                      `,
                    maskImage: useMotionTemplate`
                        radial-gradient(
                          200px circle at ${mouseX}px ${mouseY}px,
                          black,
                          transparent
                        )
                      `,
                }}
            />
        </div >
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
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <section ref={containerRef} className="relative h-[1200vh] z-50 bg-background dark:bg-black">
            <div className="sticky top-0 h-screen w-full z-50 bg-background dark:bg-black">
                <StatsSection scrollYProgress={scrollYProgress} />
            </div>
            <div className="relative z-50 bg-background dark:bg-black shadow-xl dark:shadow-[0_-50px_120px_rgba(0,0,0,0.9)] mt-[1000vh]" style={{ willChange: "transform" }}>
                <div className="h-[25vh]" />
                <CTASection />
                <div className="h-4" />
                <Footer />
            </div>
        </section>
    );
};

export default function HomePage() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-out-cubic',
            once: false,
            offset: 100,
            mirror: true,
        });

        const hasLoaded = sessionStorage.getItem('portfolioLoaded');
        if (hasLoaded) {
            setIsLoading(false);
        }

        return () => {
            AOS.refresh();
        };
    }, []);

    const handleLoadingComplete = () => {
        setIsLoading(false);
        sessionStorage.setItem('portfolioLoaded', 'true');
    };

    return (
        <>
            {isLoading && <LoadingScreen onComplete={handleLoadingComplete} duration={2500} />}
            <main className="relative overflow-x-clip">
                <HeroIntro />
                <ExpertiseSection />
                <AboutSection />
                <MetricCTAHijack />
                <SocialCorner className="fixed bottom-12 right-12 z-[30]" />
            </main>
        </>
    );
}
