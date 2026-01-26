'use client';

import { useEffect, useRef, useState, Suspense, lazy } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ArrowDown, Sparkles, MousePointer2, Zap, Code2, Palette, Rocket, Star, Heart, Coffee, Globe, Terminal, Layers, Play } from 'lucide-react';
import { LoadingScreen } from '@/components/layout';
import { portfolioData } from '@/data/portfolio';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

// Lazy load 3D scene
const Scene3D = lazy(() => import('@/components/three/Scene3D').then(mod => ({ default: mod.Scene3D })));

// ==================== INTRO SECTION ====================
function IntroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const badgeRef = useRef<HTMLSpanElement>(null);
    const t = useTranslations('hero');

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Animate badge
            gsap.fromTo(badgeRef.current,
                { y: 30, opacity: 0, scale: 0.8 },
                { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'elastic.out(1, 0.5)', delay: 0.5 }
            );

            // Animate title with split text effect
            if (titleRef.current) {
                const chars = titleRef.current.querySelectorAll('.char');
                gsap.fromTo(chars,
                    { y: 100, opacity: 0, rotateX: -90 },
                    {
                        y: 0,
                        opacity: 1,
                        rotateX: 0,
                        duration: 1.2,
                        ease: 'power4.out',
                        stagger: 0.03,
                        delay: 0.8
                    }
                );
            }

            // Animate subtitle
            gsap.fromTo(subtitleRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1.5 }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const firstName = portfolioData.personal.name.split(' ')[0];
    const lastName = portfolioData.personal.name.split(' ').slice(1).join(' ');

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-primary/30"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -100, 0],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 3,
                            repeat: Infinity,
                            delay: Math.random() * 3,
                            ease: 'linear',
                        }}
                    />
                ))}
            </div>

            {/* 3D Scene Background */}
            <Suspense fallback={null}>
                <Scene3D className="opacity-40" />
            </Suspense>

            {/* Content */}
            <div className="relative z-10 container-creative text-center">
                {/* Badge */}
                <span
                    ref={badgeRef}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card text-sm font-medium mb-8 opacity-0"
                >
                    <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                    <span>{t('greeting')}</span>
                    <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                </span>

                {/* Title */}
                <h1
                    ref={titleRef}
                    className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[12rem] font-black tracking-tighter leading-none mb-6"
                    style={{ perspective: '1000px' }}
                >
                    <span className="block overflow-hidden">
                        {firstName.split('').map((char, i) => (
                            <span key={i} className="char inline-block" style={{ transformStyle: 'preserve-3d' }}>
                                {char}
                            </span>
                        ))}
                    </span>
                    <span className="block overflow-hidden text-gradient">
                        {(lastName || portfolioData.personal.title).split('').map((char, i) => (
                            <span key={i} className="char inline-block" style={{ transformStyle: 'preserve-3d' }}>
                                {char === ' ' ? '\u00A0' : char}
                            </span>
                        ))}
                    </span>
                </h1>

                {/* Subtitle */}
                <p
                    ref={subtitleRef}
                    className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-light max-w-3xl mx-auto mb-12 opacity-0"
                >
                    {portfolioData.personal.subtitle}
                </p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, duration: 0.8 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link href="/projects" className="btn-creative group">
                        <span className="flex items-center gap-2">
                            Explore My Work
                            <motion.span
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                →
                            </motion.span>
                        </span>
                    </Link>
                    <Link href="/contact" className="btn-outline-creative flex items-center gap-2">
                        <Coffee className="w-4 h-4" />
                        Let's Chat
                    </Link>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 15, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="flex flex-col items-center gap-3 cursor-pointer group"
                >
                    <span className="text-xs text-muted-foreground uppercase tracking-[0.3em] group-hover:text-foreground transition-colors">
                        Scroll to explore
                    </span>
                    <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/50 flex justify-center p-2 group-hover:border-foreground transition-colors">
                        <motion.div
                            animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-1 h-2 rounded-full bg-muted-foreground group-hover:bg-foreground"
                        />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}

// ==================== ABOUT ME SECTION ====================
function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
    const rotate = useTransform(scrollYProgress, [0, 1], [5, -5]);

    useEffect(() => {
        AOS.refresh();
    }, []);

    const highlights = [
        { icon: Code2, label: 'Clean Code', value: '100%' },
        { icon: Rocket, label: 'Projects', value: '50+' },
        { icon: Coffee, label: 'Coffee Cups', value: '∞' },
        { icon: Heart, label: 'Passion', value: '❤️' },
    ];

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen py-32 overflow-hidden"
        >
            {/* Background decoration */}
            <motion.div
                style={{ y, opacity }}
                className="absolute inset-0 pointer-events-none"
            >
                <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
                <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-secondary/5 blur-3xl" />
            </motion.div>

            <div className="container-creative relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Image Side */}
                    <motion.div
                        ref={imageRef}
                        style={{ scale, rotate }}
                        className="relative"
                        data-aos="fade-right"
                        data-aos-duration="1000"
                    >
                        <div className="relative aspect-square max-w-lg mx-auto">
                            {/* Decorative rings */}
                            <motion.div
                                className="absolute inset-0 rounded-full border-2 border-dashed border-primary/20"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                            />
                            <motion.div
                                className="absolute inset-4 rounded-full border-2 border-dotted border-secondary/20"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                            />

                            {/* Main image container */}
                            <div className="absolute inset-8 rounded-3xl glass-card overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-[200px] font-black text-muted/20">
                                        {portfolioData.personal.name.charAt(0)}
                                    </span>
                                </div>
                            </div>

                            {/* Floating badges */}
                            {highlights.map((item, i) => (
                                <motion.div
                                    key={item.label}
                                    className="absolute glass-card px-4 py-2 rounded-2xl"
                                    style={{
                                        top: `${20 + i * 20}%`,
                                        [i % 2 === 0 ? 'left' : 'right']: '-20%',
                                    }}
                                    animate={{
                                        y: [0, -10, 0],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        delay: i * 0.5,
                                    }}
                                >
                                    <div className="flex items-center gap-2">
                                        <item.icon className="w-4 h-4 text-primary" />
                                        <span className="text-sm font-medium">{item.value}</span>
                                    </div>
                                    <span className="text-xs text-muted-foreground">{item.label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Content Side */}
                    <div className="space-y-8">
                        <div data-aos="fade-up" data-aos-delay="100">
                            <span className="text-sm text-primary font-medium uppercase tracking-widest">
                                About Me
                            </span>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mt-4 leading-tight">
                                Crafting Digital
                                <span className="text-gradient"> Experiences</span>
                            </h2>
                        </div>

                        <p
                            className="text-lg text-muted-foreground leading-relaxed"
                            data-aos="fade-up"
                            data-aos-delay="200"
                        >
                            {portfolioData.personal.bio}
                        </p>

                        <div
                            className="grid grid-cols-2 gap-4"
                            data-aos="fade-up"
                            data-aos-delay="300"
                        >
                            {[
                                { label: 'Years Experience', value: '5+' },
                                { label: 'Happy Clients', value: '30+' },
                                { label: 'Projects Done', value: '50+' },
                                { label: 'Awards', value: '12' },
                            ].map((stat) => (
                                <div key={stat.label} className="glass-card p-6 rounded-2xl text-center">
                                    <span className="text-3xl md:text-4xl font-black text-gradient">{stat.value}</span>
                                    <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        <motion.div
                            data-aos="fade-up"
                            data-aos-delay="400"
                            className="flex items-center gap-4"
                        >
                            <Link href="/experience" className="btn-creative">
                                View My Journey
                            </Link>
                            <Link
                                href={portfolioData.personal.resumeUrl || '#'}
                                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <Play className="w-4 h-4" />
                                Download CV
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ==================== WHAT I DO SECTION ====================
function WhatIDoSection() {
    const services = [
        {
            icon: Terminal,
            title: 'Web Development',
            description: 'Building modern, responsive websites with cutting-edge technologies',
            gradient: 'from-blue-500 to-cyan-500',
        },
        {
            icon: Palette,
            title: 'UI/UX Design',
            description: 'Creating beautiful and intuitive user interfaces',
            gradient: 'from-purple-500 to-pink-500',
        },
        {
            icon: Globe,
            title: 'Full Stack',
            description: 'End-to-end development from frontend to backend',
            gradient: 'from-green-500 to-emerald-500',
        },
        {
            icon: Layers,
            title: 'System Architecture',
            description: 'Designing scalable and maintainable systems',
            gradient: 'from-orange-500 to-red-500',
        },
    ];

    return (
        <section className="relative min-h-screen py-32 overflow-hidden bg-muted/30">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
                    backgroundSize: '40px 40px',
                }} />
            </div>

            <div className="container-creative relative z-10">
                <div className="text-center mb-20" data-aos="fade-up">
                    <span className="text-sm text-primary font-medium uppercase tracking-widest">
                        Services
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mt-4">
                        What I <span className="text-gradient">Do</span>
                    </h2>
                    <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
                        I specialize in creating exceptional digital experiences that combine creativity with technical excellence
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            className="relative group"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                            whileHover={{ y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="glass-card p-8 rounded-3xl h-full overflow-hidden">
                                {/* Gradient overlay on hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                                <div className="relative z-10">
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6`}>
                                        <service.icon className="w-8 h-8 text-white" />
                                    </div>

                                    <h3 className="text-2xl font-bold mb-4 group-hover:text-gradient transition-all duration-300">
                                        {service.title}
                                    </h3>

                                    <p className="text-muted-foreground leading-relaxed">
                                        {service.description}
                                    </p>

                                    {/* Arrow indicator */}
                                    <motion.div
                                        className="mt-6 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                                        initial={{ x: -10 }}
                                        whileHover={{ x: 0 }}
                                    >
                                        <span className="text-sm font-medium">Learn more</span>
                                        <motion.span
                                            animate={{ x: [0, 5, 0] }}
                                            transition={{ duration: 1, repeat: Infinity }}
                                        >
                                            →
                                        </motion.span>
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

// ==================== PHILOSOPHY SECTION ====================
function PhilosophySection() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const x = useTransform(scrollYProgress, [0, 1], ['-50%', '50%']);

    const philosophies = [
        { icon: Star, text: 'Clean Code', emphasis: 'Always' },
        { icon: Zap, text: 'Fast Performance', emphasis: 'Essential' },
        { icon: Heart, text: 'User First', emphasis: 'Priority' },
        { icon: Rocket, text: 'Innovation', emphasis: 'Constant' },
        { icon: Code2, text: 'Best Practices', emphasis: 'Standard' },
        { icon: Globe, text: 'Accessibility', emphasis: 'Inclusive' },
    ];

    return (
        <section ref={sectionRef} className="relative py-32 overflow-hidden">
            <div className="container-creative text-center mb-16" data-aos="fade-up">
                <span className="text-sm text-primary font-medium uppercase tracking-widest">
                    Philosophy
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mt-4">
                    My <span className="text-gradient">Principles</span>
                </h2>
            </div>

            {/* Horizontal scrolling text */}
            <div className="relative py-8 overflow-hidden">
                <motion.div
                    style={{ x }}
                    className="flex gap-16 whitespace-nowrap"
                >
                    {[...philosophies, ...philosophies].map((item, i) => (
                        <div key={i} className="flex items-center gap-4 text-6xl md:text-8xl font-black text-muted/20">
                            <item.icon className="w-12 h-12 md:w-16 md:h-16" />
                            <span>{item.text}</span>
                            <span className="text-primary">•</span>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Philosophy cards */}
            <div className="container-creative mt-16">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {philosophies.map((item, index) => (
                        <motion.div
                            key={item.text}
                            className="glass-card p-6 rounded-2xl text-center"
                            data-aos="zoom-in"
                            data-aos-delay={index * 50}
                            whileHover={{ scale: 1.05, rotateY: 10 }}
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            <item.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                            <p className="font-bold text-sm">{item.text}</p>
                            <span className="text-xs text-muted-foreground">{item.emphasis}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ==================== CTA SECTION ====================
function CTASection() {
    const words = ["Amazing", "Creative", "Innovative", "Stunning"];
    const [currentWord, setCurrentWord] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWord((prev) => (prev + 1) % words.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative min-h-[80vh] flex items-center justify-center py-32 overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0">
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10"
                    animate={{
                        backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        repeatType: 'reverse',
                    }}
                />
            </div>

            <div className="container-creative relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight">
                        Ready to build something
                        <br />
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={words[currentWord]}
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -50, opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="inline-block text-gradient"
                            >
                                {words[currentWord]}
                            </motion.span>
                        </AnimatePresence>
                        ?
                    </h2>

                    <p className="text-xl text-muted-foreground mt-8 max-w-2xl mx-auto">
                        Let's collaborate and bring your ideas to life with modern technologies and creative solutions.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
                        <Link href="/contact" className="btn-creative text-lg px-10 py-5">
                            Start a Project
                        </Link>
                        <Link href="/projects" className="btn-outline-creative text-lg px-10 py-5">
                            View Portfolio
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// ==================== MAIN PAGE COMPONENT ====================
export default function HomePage() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Initialize AOS
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50,
        });

        const hasLoaded = sessionStorage.getItem('portfolioLoaded');
        if (hasLoaded) {
            setIsLoading(false);
        }
    }, []);

    const handleLoadingComplete = () => {
        setIsLoading(false);
        sessionStorage.setItem('portfolioLoaded', 'true');
    };

    return (
        <>
            {isLoading && <LoadingScreen onComplete={handleLoadingComplete} duration={2500} />}
            <main className="relative">
                <IntroSection />
                <AboutSection />
                <WhatIDoSection />
                <PhilosophySection />
                <CTASection />
            </main>
        </>
    );
}
