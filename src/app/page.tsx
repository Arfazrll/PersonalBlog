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
import { portfolioData } from '@/data/portfolio';
import { GitHubStats } from '@/components/stats/GitHubStats';
import WakaTimeStats from '@/components/stats/WakaTimeStats';

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
                className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-[100px]"
                style={{
                    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.5) 0%, transparent 70%)',
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
                className="absolute w-[500px] h-[500px] rounded-full opacity-15 blur-[80px]"
                style={{
                    background: 'radial-gradient(circle, rgba(168, 85, 247, 0.5) 0%, transparent 70%)',
                    bottom: '20%',
                    right: '-5%',
                }}
                animate={{
                    x: [0, -25, 0],
                    y: [0, -30, 0],
                }}
                transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
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

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

            tl.fromTo('.hero-badge',
                { y: 60, opacity: 0, scale: 0.8 },
                { y: 0, opacity: 1, scale: 1, duration: 1.2 }
            )
                .fromTo('.hero-title-line',
                    { y: 150, opacity: 0, rotationX: -60 },
                    { y: 0, opacity: 1, rotationX: 0, duration: 1.4, stagger: 0.2 },
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
                className="hero-content relative z-10 container-creative text-center px-4"
                style={{
                    transform: springProps.xy.to((x, y) => `translate3d(${x}px, ${y}px, 0)`),
                }}
            >


                {/* Badge - with more top margin to avoid navbar */}
                <motion.div
                    className="hero-badge inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass-card text-sm font-medium mb-10"
                >
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                    </span>
                    <span>Available for opportunities</span>
                    <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                </motion.div>

                {/* Name */}
                <div className="perspective-deep mb-8">
                    <h1 className="leading-[0.9]">
                        <span className="hero-title-line block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[10rem] font-black tracking-tighter">
                            {firstName}
                        </span>
                        <span className="hero-title-line block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[10rem] font-black tracking-tighter text-gradient">
                            {lastName || 'Almazril'}
                        </span>
                    </h1>
                </div>

                {/* Title */}
                <motion.p className="hero-subtitle text-xl md:text-2xl lg:text-3xl text-muted-foreground font-medium mb-3">
                    {portfolioData.personal.title}
                </motion.p>

                {/* Subtitle */}
                <p className="hero-subtitle text-base md:text-lg text-muted-foreground/70 max-w-xl mx-auto mb-12">
                    AI Engineer • Full Stack Developer • Blockchain Enthusiast
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <motion.div className="hero-cta" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link href="/projects" className="btn-creative group inline-flex items-center gap-3 text-base">
                            <span>Explore My Work</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                    <motion.div className="hero-cta" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link href="/contact" className="btn-outline-creative inline-flex items-center gap-2 text-base">
                            <Mail className="w-4 h-4" />
                            <span>Get in Touch</span>
                        </Link>
                    </motion.div>
                </div>
            </animated.div>

            <ScrollIndicator />
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
                                className="w-[500px] h-[500px] border border-white/5 rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 60, ease: "linear", repeat: Infinity }}
                            />
                            <motion.div
                                className="absolute w-[350px] h-[350px] border border-dashed border-white/10 rounded-full"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 40, ease: "linear", repeat: Infinity }}
                            />
                        </div>

                        {/* Image Container with Blending */}
                        <div className="relative w-full h-full max-w-[420px] mx-auto z-10">
                            <div className="relative w-full h-full">
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
                                        <Activity className="w-4 h-4 text-blue-400" />
                                        <div>
                                            <div className="text-[10px] text-blue-200/70 tracking-wider">UPTIME</div>
                                            <div className="font-mono text-sm font-bold text-white">3+ YEARS</div>
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
                                        <Database className="w-4 h-4 text-purple-400" />
                                        <div>
                                            <div className="text-[10px] text-purple-200/70 tracking-wider">PROJECTS</div>
                                            <div className="font-mono text-sm font-bold text-white">10+ SHIPPED</div>
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
                                        <Award className="w-4 h-4 text-emerald-400" />
                                        <div>
                                            <div className="text-[10px] text-emerald-200/70 tracking-wider">SKILLS</div>
                                            <div className="font-mono text-sm font-bold text-white">CERTIFIED</div>
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

// ==================== EXPERTISE SECTION ====================
function ExpertiseSection() {
    const sectionRef = useRef<HTMLElement>(null);

    const expertise = [
        {
            title: 'AI & Machine Learning',
            icon: Brain,
            desc: 'Deep Learning, Computer Vision, NLP, TensorFlow, PyTorch',
            color: 'from-pink-500 to-rose-500',
        },
        {
            title: 'Full Stack Development',
            icon: Code2,
            desc: 'React, Next.js, Node.js, TypeScript, PostgreSQL, MongoDB',
            color: 'from-blue-500 to-cyan-500',
        },
        {
            title: 'Data Science',
            icon: Database,
            desc: 'Data Analysis, Visualization, Pandas, Scikit-learn, Statistics',
            color: 'from-emerald-500 to-green-500',
        },
        {
            title: 'Blockchain & Web3',
            icon: Cpu, // Changed from Cube to Cpu for available icon
            desc: 'Solidity, Smart Contracts, DApps, Ethereum, Web3.js',
            color: 'from-orange-500 to-amber-500',
        }
    ];

    return (
        <section ref={sectionRef} className="relative py-32 overflow-hidden bg-gray-50 dark:bg-black/50 transition-colors duration-500">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-20 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(100,100,100,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }}
            />

            <div className="container-creative relative z-10 px-6">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block relative"
                    >
                        <span className="text-sm font-mono text-primary tracking-[0.3em] uppercase mb-4 block">System Capabilities</span>
                        <h2 className="text-5xl md:text-7xl font-black tracking-tight text-foreground">
                            Elite <span className="text-primary">Expertise</span>
                        </h2>
                        {/* Glitch underline */}
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-primary shadow-[0_0_20px_#3b82f6] animate-pulse" />
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {expertise.map((item, idx) => (
                        <SpotlightCard key={idx} className="h-full">
                            <div className="relative z-10 p-8 h-full flex flex-col justify-between group-hover:translate-x-1 transition-transform duration-300">
                                <div>
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} p-0.5 mb-6 group-hover:scale-110 transition-transform duration-500`}>
                                        <div className="w-full h-full bg-white/90 dark:bg-black/90 rounded-2xl flex items-center justify-center backdrop-blur-xl">
                                            <item.icon className="w-7 h-7 text-primary dark:text-white" />
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors flex items-center gap-2 text-foreground">
                                        {item.title}
                                        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary" />
                                    </h3>
                                    <p className="text-muted-foreground font-mono text-sm leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>

                                <div className="mt-8 pt-8 border-t border-black/5 dark:border-white/5 flex justify-between items-center opacity-60 group-hover:opacity-100 transition-opacity">
                                    <span className="text-xs font-mono tracking-widest uppercase text-muted-foreground">Explore Module</span>
                                    <div className="flex gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors delay-100" />
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors delay-200" />
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors delay-300" />
                                    </div>
                                </div>
                            </div>
                        </SpotlightCard>
                    ))}
                </div>
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
