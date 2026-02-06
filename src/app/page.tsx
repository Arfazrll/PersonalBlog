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
// Particles removed for performance
import { useIsMobile } from "@/hooks/useIsMobile";
import type { ISourceOptions } from '@tsparticles/engine';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Sparkles, ChevronDown, Mail, ArrowRight } from 'lucide-react';
import { LoadingScreen } from '@/components/layout';
import { TextPressure } from '@/components/ui/TextPressure';
import { portfolioData } from '@/data/portfolio';

// Register GSAP plugins
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

// ==================== PARTICLES CONFIG ====================
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
        number: { density: { enable: true }, value: 25 }, // Optimized count
        opacity: { value: { min: 0.1, max: 0.4 } },
        size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
};
// ==================== ANIMATED BACKGROUND ====================
function AnimatedBackground() {
    const isMobile = useIsMobile();

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Particles Removed */}
            {/* Gradient orbs - Reduced on mobile */}
            <motion.div
                className="absolute w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full blur-[60px] md:blur-[100px]"
                style={{
                    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
                    top: '10%',
                    left: '-10%',
                    willChange: 'transform',
                }}
                animate={isMobile ? {} : {
                    x: [0, 30, 0],
                    y: [0, 20, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            />
            {!isMobile && (
                <motion.div
                    className="absolute w-[500px] h-[500px] rounded-full blur-[80px]"
                    style={{
                        background: 'radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, transparent 70%)',
                        bottom: '20%',
                        right: '-5%',
                        willChange: 'transform',
                    }}
                    animate={{
                        x: [0, -25, 0],
                        y: [0, -30, 0],
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
                />
            )}

            {/* Grid pattern - works for both light and dark */}
            <div
                className="absolute inset-0 opacity-[0.04] dark:opacity-[0.02]"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(0,0,0,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.15) 1px, transparent 1px)
          `,
                    backgroundSize: '80px 80px',
                }}
            />
        </div>
    );
}

// ==================== SCROLL INDICATOR ====================
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

// ==================== HERO INTRO SECTION ====================
function HeroIntro() {
    const containerRef = useRef<HTMLElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isDarkMode, setIsDarkMode] = useState(true);
    const t = useTranslations('hero');
    const isMobile = useIsMobile();

    // React Spring for smooth mouse following
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

    // Detect theme changes
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
            const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

            tl.fromTo('.hero-badge',
                { y: 60, opacity: 0, scale: 0.8 },
                { y: 0, opacity: 1, scale: 1, duration: 1.2 }
            )
                .fromTo('.hero-name',
                    { y: 100, opacity: 0, scale: 0.95 },
                    { y: 0, opacity: 1, scale: 1, duration: 1.4 },
                    '-=0.6'
                )
                .fromTo('.hero-subtitle',
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1 },
                    '-=0.8'
                )
                .fromTo('.hero-cta',
                    { y: 40, opacity: 0, scale: 0.9 },
                    { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15 },
                    '-=0.5'
                );

            // Scroll-triggered parallax
            gsap.to('.hero-content', {
                y: 150,
                opacity: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1,
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const firstName = portfolioData.personal.name.split(' ')[0];
    const lastName = portfolioData.personal.name.split(' ').slice(1).join(' ');

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24"
        >
            <AnimatedBackground />

            {/* 3D Scene */}
            <Scene3D className="opacity-20" />

            {/* Main Content */}
            <animated.div
                className="hero-content relative z-10 container-creative text-center px-4 max-w-5xl mx-auto"
                style={{
                    transform: isMobile ? 'none' : springProps.xy.to((x, y) => `translate3d(${x}px, ${y}px, 0)`),
                }}
            >
                {/* Badge */}
                <motion.div
                    className="hero-badge inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass-card text-sm font-medium mb-10 border-primary/20 backdrop-blur-xl"
                >
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                    </span>
                    <span className="tracking-wide text-foreground/80">{t('badge')}</span>
                    <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                </motion.div>

                {/* Name - Responsive Switch: Canvas on Desktop, Static Text on Mobile */}
                <div className="hero-name mb-6 w-full max-w-6xl mx-auto flex items-center justify-center">
                    {/* Mobile: Static Text (Guarantees wrapping) */}
                    <h1 className="block md:hidden text-5xl font-black text-center leading-tight tracking-tighter">
                        <span className="text-foreground">Syahril</span> <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent animate-gradient-x">
                            Arfian Almazril
                        </span>
                    </h1>

                    {/* Desktop: TextPressure Canvas (No wrapping needed) */}
                    <div className="hidden md:flex w-full h-[150px] lg:h-[180px] xl:h-[220px] items-center justify-center">
                        <TextPressure
                            text="Syahril Arfian Almazril"
                            flex={false}
                            alpha={false}
                            stroke={false}
                            width={true}
                            weight={true}
                            italic={true}
                            textColor={isDarkMode ? "#ffffff" : "#0f172a"}
                            minFontSize={72}
                            className="w-full h-full flex items-center justify-center"
                        />
                    </div>
                </div>

                {/* Title */}
                <motion.div className="hero-subtitle mb-8 flex flex-col items-center gap-2">
                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
                    <p className="text-xl md:text-2xl lg:text-3xl text-foreground/80 font-medium tracking-wide">
                        {portfolioData.personal.title} <span className="text-primary mx-2">•</span> {t('role')}
                    </p>
                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
                </motion.div>

                {/* Subtitle */}
                <p
                    className="hero-subtitle text-base md:text-lg text-muted-foreground/70 max-w-2xl mx-auto mb-12 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: t.raw('description') }}
                />

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <motion.div className="hero-cta w-full sm:w-auto" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link href="/projects" className="btn-creative group inline-flex items-center justify-center gap-3 text-base w-full sm:w-auto min-w-[180px]">
                            <span>{t('cta.primary')}</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                    <motion.div className="hero-cta w-full sm:w-auto" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link href="/contact" className="btn-outline-creative inline-flex items-center justify-center gap-2 text-base w-full sm:w-auto min-w-[180px]">
                            <Mail className="w-4 h-4" />
                            <span>{t('cta.secondary')}</span>
                        </Link>
                    </motion.div>
                </div>
            </animated.div>
        </section>
    );
}

// Helper Component for Spotlight Effect

// Helper Component for Spotlight Effect
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
        </div>
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

// ==================== MAIN PAGE ====================
export default function HomePage() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Initialize AOS with more options
        AOS.init({
            duration: 1000,
            easing: 'ease-out-cubic',
            once: false, // Allow animations to replay
            offset: 100,
            mirror: true, // Animate out when scrolling past
        });

        const hasLoaded = sessionStorage.getItem('portfolioLoaded');
        if (hasLoaded) {
            setIsLoading(false);
        }

        // Refresh AOS on route change
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
            <main className="relative overflow-x-hidden">
                <HeroIntro />
                <AboutSection />
                <ExpertiseSection />
                <StatsSection />
                <CTASection />
            </main>
        </>
    );
}
