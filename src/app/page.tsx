'use client';

import { useEffect, useRef, useState, Suspense, lazy, useCallback, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { useSpring as useReactSpring, animated, config } from '@react-spring/web';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type {
    ISourceOptions

} from '@tsparticles/engine';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
    Sparkles, Zap, Code2, Rocket, Star, Heart,
    Coffee, Globe, Terminal, Layers, Brain, Database, Cpu,
    ChevronDown, Award, Briefcase, GraduationCap,
    Mail, MapPin, ExternalLink, ArrowRight, Play, Activity
} from 'lucide-react';
import { LoadingScreen } from '@/components/layout';
import { Lens } from '@/components/ui/Lens';
import { TextPressure } from '@/components/ui/TextPressure';
import { CircularGallery } from '@/components/ui/CircularGallery';
import { portfolioData } from '@/data/portfolio';
import { GitHubStats } from '@/components/stats/GitHubStats';
import WakaTimeStats from '@/components/stats/WakaTimeStats';
import TextScrollMarquee from '@/components/ui/TextScrollMarquee';
import { InfiniteRibbon } from '@/components/ui/infinite-ribbon';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Lazy load 3D scene
const Scene3D = lazy(() => import('@/components/three/Scene3D').then(mod => ({ default: mod.Scene3D })));

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
        number: { density: { enable: true }, value: 60 },
        opacity: { value: { min: 0.1, max: 0.4 } },
        size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
};

// ==================== ANIMATED BACKGROUND ====================
function AnimatedBackground() {
    const [particlesReady, setParticlesReady] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => setParticlesReady(true));
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Particles */}
            {particlesReady && (
                <Particles
                    id="hero-particles"
                    options={particlesOptions}
                    className="absolute inset-0"
                />
            )}

            {/* Gradient orbs */}
            <motion.div
                className="absolute w-[600px] h-[600px] rounded-full blur-[100px]"
                style={{
                    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
                    top: '10%',
                    left: '-10%',
                }}
                animate={{
                    x: [0, 30, 0],
                    y: [0, 20, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
                className="absolute w-[500px] h-[500px] rounded-full blur-[80px]"
                style={{
                    background: 'radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, transparent 70%)',
                    bottom: '20%',
                    right: '-5%',
                }}
                animate={{
                    x: [0, -25, 0],
                    y: [0, -30, 0],
                }}
                transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            />

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
                    Scroll Down
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

    // React Spring for smooth mouse following
    const [springProps, api] = useReactSpring(() => ({
        xy: [0, 0],
        config: config.gentle,
    }));

    const handleMouseMove = useCallback((e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const x = (clientX - innerWidth / 2) / 40;
        const y = (clientY - innerHeight / 2) / 40;
        api.start({ xy: [x, y] });
        setMousePosition({ x, y });
    }, [api]);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [handleMouseMove]);

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
            <Suspense fallback={null}>
                <Scene3D className="opacity-20" />
            </Suspense>

            {/* Main Content */}
            <animated.div
                className="hero-content relative z-10 container-creative text-center px-4 max-w-5xl mx-auto"
                style={{
                    transform: springProps.xy.to((x, y) => `translate3d(${x}px, ${y}px, 0)`),
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
                    <span className="tracking-wide text-foreground/80">Available for opportunities</span>
                    <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                </motion.div>

                {/* Name with TextPressure Animation - Centered, Large */}
                <div className="hero-name mb-6 w-full max-w-6xl mx-auto h-[100px] sm:h-[120px] md:h-[150px] lg:h-[180px] xl:h-[220px] flex items-center justify-center">
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

                {/* Title */}
                <motion.div className="hero-subtitle mb-8 flex flex-col items-center gap-2">
                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
                    <p className="text-xl md:text-2xl lg:text-3xl text-foreground/80 font-medium tracking-wide">
                        {portfolioData.personal.title} <span className="text-primary mx-2">•</span> Creative Developer
                    </p>
                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
                </motion.div>

                {/* Subtitle */}
                <p className="hero-subtitle text-base md:text-lg text-muted-foreground/70 max-w-2xl mx-auto mb-12 leading-relaxed">
                    Crafting immersive digital experiences at the intersection of <span className="text-primary font-semibold">AI</span>, <span className="text-secondary font-semibold">Design</span>, and <span className="text-accent font-semibold">Performance</span>.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <motion.div className="hero-cta w-full sm:w-auto" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link href="/projects" className="btn-creative group inline-flex items-center justify-center gap-3 text-base w-full sm:w-auto min-w-[180px]">
                            <span>Explore Radius</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                    <motion.div className="hero-cta w-full sm:w-auto" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link href="/contact" className="btn-outline-creative inline-flex items-center justify-center gap-2 text-base w-full sm:w-auto min-w-[180px]">
                            <Mail className="w-4 h-4" />
                            <span>Initialize Contact</span>
                        </Link>
                    </motion.div>
                </div>
            </animated.div>
        </section>
    );
}

// ==================== ABOUT SECTION ====================
// ==================== ABOUT SECTION ====================
function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const t = useTranslations('hero'); // Using hero translations for now or generic

    // Scifi-style stats
    const stats = [
        { label: 'System Uptime', value: '3+ Yrs', icon: Activity, color: '#3b82f6' },
        { label: 'Projects Compiled', value: '10+', icon: Database, color: '#8b5cf6' },
        { label: 'Certifications', value: '10+', icon: Award, color: '#10b981' },
    ];

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Holographic entrance
            gsap.fromTo('.holo-card',
                { opacity: 0, scale: 0.9, y: 50, filter: 'blur(10px)' },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    duration: 1,
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 60%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );

            // Matrix-like text decode effect could go here
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative py-32 overflow-hidden">
            {/* Tech Background Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)`,
                    backgroundSize: '50px 50px'
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
                                <span className="text-xs font-mono text-primary tracking-[0.2em] uppercase">Identity Link Established</span>
                            </div>

                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-[0.9] tracking-tight mb-6 text-foreground">
                                Architecting <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 animate-gradient-x">
                                    Digital Reality
                                </span>
                            </h2>
                        </div>

                        <div className="holo-card p-6 md:p-8 rounded-[2rem] bg-white/80 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-sm relative overflow-hidden group shadow-lg dark:shadow-none">
                            {/* Decorative Corner Accents */}
                            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary/20 rounded-tl-2xl" />
                            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary/20 rounded-br-2xl" />

                            <div className="absolute top-6 right-8 p-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                                <Cpu className="w-32 h-32 -rotate-12 text-primary" />
                            </div>

                            <p className="text-lg md:text-xl text-justify text-muted-foreground leading-relaxed relative z-10 font-light">
                                <span className="text-primary font-bold text-2xl mr-2">"</span>
                                {portfolioData.personal.bio}
                                <span className="text-primary font-bold text-2xl ml-2">"</span>
                            </p>
                        </div>

                        <div className="holo-card flex flex-wrap gap-5 pt-2">
                            <Link href="/experience" className="group relative px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl overflow-hidden shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-1">
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                <span className="relative flex items-center gap-3">
                                    Initiate Protocol: Experience <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>

                            <Link href="/contact" className="group px-8 py-4 bg-white/80 dark:bg-white/5 border border-black/5 dark:border-white/10 hover:bg-white/90 dark:hover:bg-white/10 text-foreground font-semibold rounded-xl transition-all hover:-translate-y-1 flex items-center gap-3 backdrop-blur-md shadow-sm dark:shadow-none">
                                <Terminal className="w-5 h-5 text-secondary" />
                                <span>Execute: Contact</span>
                            </Link>
                        </div>
                    </div>

                    {/* Right Col: The Holographic Persona (Visuals) */}
                    <div className="lg:col-span-5 relative h-[600px] flex items-center justify-center perspective-deep lg:pl-10 order-1 lg:order-2">
                        {/* Dynamic Background Aura */}
                        <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent blur-[80px] opacity-40 animate-pulse-slow" />

                        {/* Tech Ring Background - Subtle */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <motion.div
                                className="w-[500px] h-[500px] border border-foreground/5 rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 60, ease: "linear", repeat: Infinity }}
                            />
                            <motion.div
                                className="absolute w-[350px] h-[350px] border border-dashed border-foreground/10 rounded-full"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 40, ease: "linear", repeat: Infinity }}
                            />
                        </div>

                        {/* Image Container with Blending */}
                        <div className="relative w-full h-full max-w-[420px] mx-auto z-10">
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
                                    className="absolute top-[15%] -right-4 md:-right-12 pointer-events-auto"
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
                                    className="absolute bottom-[25%] -right-2 md:-right-8 pointer-events-auto"
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
                                    className="absolute bottom-[15%] left-0 md:-left-8 pointer-events-auto"
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

// ==================== CREATIVE EXPERTISE SECTION with 3D Gallery ====================
function ExpertiseSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [isDarkMode, setIsDarkMode] = useState(true);

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

    const galleryItems = [
        { image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop', text: 'AI & Machine Learning' },
        { image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=600&fit=crop', text: 'Full Stack Development' },
        { image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop', text: 'Data Science' },
        { image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop', text: 'Web3 & Blockchain' },
        { image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop', text: 'Cloud Computing' },
        { image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop', text: 'Cybersecurity' },
    ];

    return (
        <section ref={sectionRef} className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-background via-muted to-background">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px]" />
            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.03]"
                style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
            />

            <div className="container-creative relative z-10 px-6">
                {/* Creative Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >


                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 backdrop-blur-sm mb-8">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-xs font-mono text-primary tracking-[0.2em] uppercase">Core Capabilities</span>
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    </div>

                    <div className="mb-12 w-full overflow-hidden">
                        <TextScrollMarquee baseVelocity={-2} className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight">
                            <span className="text-foreground">Creative</span>
                            <span
                                className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 ml-4 bg-[length:200%_auto]"
                                style={{ animation: 'gradient-flow 4s ease infinite' }}
                            >
                                Engineering
                            </span>
                        </TextScrollMarquee>
                    </div>

                    <p className="text-lg text-muted-foreground max-w-xl mx-auto font-light">
                        Specialized in cutting-edge technologies that power modern digital experiences
                    </p>
                </motion.div>

                {/* Circular Gallery 3D */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="h-[400px] md:h-[500px] rounded-3xl overflow-hidden"
                >
                    <CircularGallery
                        items={galleryItems}
                        bend={3}
                        textColor={isDarkMode ? "#ffffff" : "#0f172a"}
                        borderRadius={0.08}
                        font="bold 24px Inter, sans-serif"
                        scrollSpeed={3}
                        scrollEase={0.06}
                    />
                </motion.div>

                {/* Drag hint */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-center text-sm text-muted-foreground/60 font-mono mt-8 flex items-center justify-center gap-2"
                >
                    <span className="inline-block w-8 h-[1px] bg-border" />
                    Drag or scroll to explore
                    <span className="inline-block w-8 h-[1px] bg-border" />
                </motion.p>
            </div>
        </section>
    );
}

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

// ==================== STATS SECTION ====================
function StatsSection() {
    return (
        <section className="relative py-32 lg:py-40 overflow-hidden">
            <div className="container-creative relative z-10">
                <div className="text-center mb-16">
                    <span className="text-sm text-primary font-semibold uppercase tracking-widest">
                        Coding Activity
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black mt-4 text-foreground">
                        My <span className="text-gradient">Dev Stats</span>
                    </h2>
                </div>



                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[500px] md:h-[400px]">
                    <GitHubStats />
                    <WakaTimeStats />
                </div>
            </div>

            {/* Infinite Ribbons - Full Width Divider */}
            <div className="relative flex h-[500px] w-full items-center justify-center overflow-hidden pointer-events-none mt-32 mb-20 md:my-40">
                <InfiniteRibbon rotation={6} className="z-10 py-5 border-y border-blue-100 dark:border-zinc-800 shadow-xl" background="bg-white dark:bg-zinc-800" textColor="text-blue-600 dark:text-zinc-400 font-mono tracking-tighter">
                    Next.js • TypeScript • Tailwind • React • Node.js • Three.js •
                </InfiniteRibbon>
                <InfiniteRibbon rotation={-6} reverse={true} className="z-20 py-5 border-y border-white/20 dark:border-zinc-700 shadow-2xl" background="bg-blue-600 dark:bg-black" textColor="text-white dark:text-white font-bold tracking-widest uppercase">
                    Creative Developer • UI/UX Design • Full Stack Engineering • System Architecture •
                </InfiniteRibbon>
            </div>
        </section>
    );
}

// ==================== CTA SECTION ====================
function CTASection() {
    const sectionRef = useRef<HTMLElement>(null);
    const words = ['Amazing', 'Innovative', 'Intelligent', 'Creative'];
    const [currentWord, setCurrentWord] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWord((prev) => (prev + 1) % words.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo('.cta-content',
                { y: 80, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative py-32 lg:py-40 overflow-hidden">
            {/* Animated background */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 8, repeat: Infinity }}
            />

            <div className="container-creative relative z-10 text-center cta-content">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-8">
                    Let's Build Something
                    <br />
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={words[currentWord]}
                            initial={{ y: 60, opacity: 0, rotateX: -60 }}
                            animate={{ y: 0, opacity: 1, rotateX: 0 }}
                            exit={{ y: -60, opacity: 0, rotateX: 60 }}
                            transition={{ duration: 0.5 }}
                            className="inline-block text-gradient"
                        >
                            {words[currentWord]}
                        </motion.span>
                    </AnimatePresence>
                    {' '}Together
                </h2>

                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
                    Ready to collaborate on AI, Web Development, or Blockchain projects? Let's make it happen.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link href="/contact" className="btn-creative text-lg px-10 py-5 inline-flex items-center gap-3">
                            <Mail className="w-5 h-5" />
                            Start a Project
                        </Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link href="/projects" className="btn-outline-creative text-lg px-10 py-5 inline-flex items-center gap-3">
                            <Layers className="w-5 h-5" />
                            View My Work
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

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
