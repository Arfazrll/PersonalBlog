'use client';

import { useEffect, useRef, useState, Suspense, lazy, useCallback, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { useSpring as useReactSpring, animated, config } from '@react-spring/web';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
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
    Mail, MapPin, ExternalLink, ArrowRight, Play
} from 'lucide-react';
import { LoadingScreen } from '@/components/layout';
import { portfolioData } from '@/data/portfolio';

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
    const [springProps, setSpringProps] = useReactSpring(() => ({
        xy: [0, 0],
        config: config.gentle,
    }));

    const handleMouseMove = useCallback((e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const x = (clientX - innerWidth / 2) / 40;
        const y = (clientY - innerHeight / 2) / 40;
        setSpringProps({ xy: [x, y] });
        setMousePosition({ x, y });
    }, [setSpringProps]);

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
                    className="hero-badge inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass-card text-sm font-medium mb-10 mt-8"
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
function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Animate stats on scroll
            gsap.fromTo('.stat-card',
                { y: 60, opacity: 0, scale: 0.9 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    scrollTrigger: {
                        trigger: '.stats-grid',
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            // Animate avatar badges
            gsap.fromTo('.floating-badge',
                { scale: 0, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: '.avatar-container',
                        start: 'top 70%',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const stats = [
        { icon: Briefcase, value: '15+', label: 'Experiences', color: 'text-blue-500' },
        { icon: Code2, value: '10+', label: 'Projects', color: 'text-purple-500' },
        { icon: Award, value: '10+', label: 'Certifications', color: 'text-green-500' },
        { icon: Star, value: '3+', label: 'Years Learning', color: 'text-orange-500' },
    ];

    return (
        <section ref={sectionRef} className="relative py-32 lg:py-40 overflow-hidden">
            {/* Background */}
            <motion.div style={{ y, opacity }} className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px]" />
                <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[80px]" />
            </motion.div>

            <div className="container-creative relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    {/* Avatar Side */}
                    <div className="relative order-2 lg:order-1 avatar-container" data-aos="fade-right" data-aos-duration="1200">
                        <div className="relative max-w-md mx-auto">
                            {/* Rotating rings */}
                            <motion.div
                                className="absolute inset-0 rounded-full border-2 border-dashed border-primary/20"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                            />
                            <motion.div
                                className="absolute inset-8 rounded-full border-2 border-dotted border-secondary/20"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                            />

                            {/* Avatar */}
                            <div className="relative m-16 aspect-square rounded-3xl glass-card overflow-hidden shadow-2xl">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-[160px] font-black text-muted/20 select-none">
                                        {portfolioData.personal.name.charAt(0)}
                                    </span>
                                </div>
                            </div>

                            {/* Floating badges */}
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    className="floating-badge absolute glass-card px-4 py-3 rounded-2xl shadow-lg"
                                    style={{
                                        top: `${10 + i * 23}%`,
                                        [i % 2 === 0 ? 'left' : 'right']: '-10%',
                                    }}
                                    animate={{ y: [0, -6, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-xl bg-muted ${stat.color}`}>
                                            <stat.icon className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <span className="text-xl font-bold">{stat.value}</span>
                                            <p className="text-xs text-muted-foreground">{stat.label}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Content Side */}
                    <div ref={contentRef} className="space-y-8 order-1 lg:order-2">
                        <div data-aos="fade-up">
                            <motion.span
                                className="inline-block text-sm text-primary font-semibold uppercase tracking-widest mb-4"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                About Me
                            </motion.span>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
                                Building the
                                <span className="text-gradient"> Future</span>
                                <br />with Code
                            </h2>
                        </div>

                        <motion.p
                            className="text-lg text-muted-foreground leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            {portfolioData.personal.bio}
                        </motion.p>

                        {/* Info cards */}
                        <div className="space-y-4" data-aos="fade-up" data-aos-delay="200">
                            <motion.div
                                className="flex items-center gap-4 p-5 rounded-2xl glass-card hover:bg-muted/50 transition-colors"
                                whileHover={{ x: 10, scale: 1.02 }}
                            >
                                <div className="p-3 rounded-xl bg-primary/10">
                                    <MapPin className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Location</p>
                                    <p className="font-semibold">{portfolioData.personal.location}</p>
                                </div>
                            </motion.div>
                            <motion.div
                                className="flex items-center gap-4 p-5 rounded-2xl glass-card hover:bg-muted/50 transition-colors"
                                whileHover={{ x: 10, scale: 1.02 }}
                            >
                                <div className="p-3 rounded-xl bg-secondary/10">
                                    <GraduationCap className="w-5 h-5 text-secondary" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Education</p>
                                    <p className="font-semibold">Telkom University - Information Technology</p>
                                </div>
                            </motion.div>
                        </div>

                        <div className="flex flex-wrap gap-4 pt-4" data-aos="fade-up" data-aos-delay="300">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link href="/experience" className="btn-creative inline-flex items-center gap-2">
                                    <Briefcase className="w-4 h-4" />
                                    View Experience
                                </Link>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link href={portfolioData.personal.resumeUrl || '#'} className="btn-outline-creative inline-flex items-center gap-2">
                                    <Play className="w-4 h-4" />
                                    Download CV
                                </Link>
                            </motion.div>
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

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo('.expertise-card',
                { y: 80, opacity: 0, rotateY: -15 },
                {
                    y: 0,
                    opacity: 1,
                    rotateY: 0,
                    duration: 1,
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: '.expertise-grid',
                        start: 'top 75%',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const expertise = [
        {
            icon: Brain,
            title: 'AI & Machine Learning',
            description: 'Deep Learning, Computer Vision, NLP, TensorFlow, PyTorch',
            gradient: 'from-purple-500 to-pink-500',
        },
        {
            icon: Code2,
            title: 'Full Stack Development',
            description: 'React, Next.js, Node.js, TypeScript, PostgreSQL, MongoDB',
            gradient: 'from-blue-500 to-cyan-500',
        },
        {
            icon: Database,
            title: 'Data Science',
            description: 'Data Analysis, Visualization, Pandas, Scikit-learn, Statistics',
            gradient: 'from-green-500 to-emerald-500',
        },
        {
            icon: Cpu,
            title: 'Blockchain & Web3',
            description: 'Solidity, Smart Contracts, DApps, Ethereum, Web3.js',
            gradient: 'from-orange-500 to-red-500',
        },
    ];

    return (
        <section ref={sectionRef} className="relative py-32 lg:py-40 overflow-hidden bg-muted/30">
            {/* Background pattern */}
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
                        backgroundSize: '60px 60px',
                        opacity: 0.02,
                    }}
                />
            </div>

            <div className="container-creative relative z-10">
                <div className="text-center mb-20" data-aos="fade-up">
                    <span className="text-sm text-primary font-semibold uppercase tracking-widest">
                        What I Do
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mt-4">
                        My <span className="text-gradient">Expertise</span>
                    </h2>
                    <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
                        Specialized in cutting-edge technologies that power the future
                    </p>
                </div>

                <div className="expertise-grid grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {expertise.map((item) => (
                        <motion.div
                            key={item.title}
                            className="expertise-card group relative"
                            whileHover={{ y: -10, scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="glass-card p-8 lg:p-10 rounded-3xl h-full overflow-hidden">
                                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                                <div className="relative z-10">
                                    <motion.div
                                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6`}
                                        whileHover={{ rotate: 10, scale: 1.1 }}
                                    >
                                        <item.icon className="w-8 h-8 text-white" />
                                    </motion.div>

                                    <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>

                                    <motion.div
                                        className="mt-8 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                                        initial={{ x: -10 }}
                                        whileHover={{ x: 0 }}
                                    >
                                        <span className="text-sm font-semibold">Explore projects</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ==================== CURRENT FOCUS SECTION ====================
function CurrentFocusSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo('.focus-card',
                { scale: 0.8, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: '.focus-grid',
                        start: 'top 80%',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const focuses = [
        { icon: Brain, label: 'AI Agents', description: 'Autonomous systems', color: 'from-purple-500 to-pink-500' },
        { icon: Cpu, label: 'Blockchain', description: 'Smart Contracts', color: 'from-orange-500 to-red-500' },
        { icon: Database, label: 'MLOps', description: 'Production ML', color: 'from-blue-500 to-cyan-500' },
        { icon: Globe, label: 'Web3', description: 'Decentralized apps', color: 'from-green-500 to-emerald-500' },
    ];

    return (
        <section ref={sectionRef} className="relative py-32 lg:py-40 overflow-hidden">
            <div className="container-creative">
                <div className="text-center mb-16" data-aos="fade-up">
                    <span className="text-sm text-primary font-semibold uppercase tracking-widest">
                        Currently Exploring
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black mt-4">
                        Tech I'm <span className="text-gradient">Learning</span>
                    </h2>
                </div>

                <div className="focus-grid grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {focuses.map((focus, idx) => (
                        <motion.div
                            key={focus.label}
                            className="focus-card text-center"
                            whileHover={{ y: -8, scale: 1.05 }}
                        >
                            <div className="glass-card p-8 rounded-3xl h-full">
                                <motion.div
                                    className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${focus.color} flex items-center justify-center`}
                                    animate={{ rotate: [0, 5, -5, 0] }}
                                    transition={{ duration: 6, repeat: Infinity, delay: idx * 0.5 }}
                                >
                                    <focus.icon className="w-10 h-10 text-white" />
                                </motion.div>
                                <h3 className="text-xl font-bold mb-2">{focus.label}</h3>
                                <p className="text-sm text-muted-foreground">{focus.description}</p>
                            </div>
                        </motion.div>
                    ))}
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
                <CurrentFocusSection />
                <CTASection />
            </main>
        </>
    );
}
