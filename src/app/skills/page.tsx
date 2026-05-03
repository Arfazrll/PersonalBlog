'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useAnimationFrame, useMotionValue } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { portfolioData } from '@/data/portfolio';
import { SplineScene } from '@/components/ui/SplineScene';
import { TextPressure } from '@/components/ui/TextPressure';
import dynamic from 'next/dynamic';

const KineticTechGrid = dynamic(() => import('@/components/ui/KineticTechGrid').then(mod => mod.KineticTechGrid), { ssr: true });
const ArchedTechIconsInteractive = dynamic(() => import('@/components/ui/ArchedTechIcons').then(mod => mod.ArchedTechIconsInteractive), { ssr: true });
const HorizontalScrollCarousel = dynamic(() => import('@/components/ui/horizontal-scroll-carousel').then(mod => mod.HorizontalScrollCarousel), { ssr: true });
const HardSkills = dynamic(() => import('@/components/sections/skills/HardSkills').then(mod => mod.HardSkills), { ssr: true });
const ToolsSection = dynamic(() => import('@/components/sections/skills/ToolsSection').then(mod => mod.ToolsSection), { ssr: true });
import FeatureSection from '@/components/ui/stack-feature-section';
import { cn } from '@/lib/utils';

const techLogos: Record<string, string> = {
    'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'Next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    'Tailwind CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
    'PostgreSQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    'MongoDB': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    'Docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    'Git': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    'Solidity': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg',
    'TensorFlow': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
    'PyTorch': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg',
    'Scikit-learn': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg',
    'Pandas': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg',
    'NumPy': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg',
};

function TechSchematic() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            {/* Minimal atmospheric overlay instead of grid */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(var(--primary-rgb),0.05)_0%,transparent_50%)]" />
            {/* Architectural Callouts */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 0.2, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute top-20 right-20 font-mono text-[8px] uppercase tracking-[0.5em] text-primary/20 rotate-90 origin-right select-none"
            >

            </motion.div>
        </div>
    );
}

function Bubble({ b, mouseX, mouseY }: { b: any, mouseX: any, mouseY: any }) {
    const ref = useRef<HTMLDivElement>(null);
    const [center, setCenter] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updateCenter = () => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            setCenter({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
        };
        updateCenter();
        window.addEventListener('resize', updateCenter);
        window.addEventListener('scroll', updateCenter);
        return () => {
            window.removeEventListener('resize', updateCenter);
            window.removeEventListener('scroll', updateCenter);
        };
    }, []);

    const proximity = useTransform([mouseX, mouseY], ([x, y]) => {
        const d = Math.sqrt(Math.pow((x as number) - center.x, 2) + Math.pow((y as number) - center.y, 2));
        return Math.max(0, Math.min(1, (250 - d) / 250));
    });

    const grayscale = useTransform(proximity, [0, 1], [100, 0]);
    const scaleFactor = useTransform(proximity, [0, 1], [1, 1.2]);
    const opacityFactor = useTransform(proximity, [0, 1], [0.3, 0.8]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
                y: [0, -35, 0],
            }}
            style={{
                position: 'absolute',
                top: b.top,
                left: 'left' in b ? b.left : undefined,
                right: 'right' in b ? b.right : undefined,
                opacity: opacityFactor,
                scale: scaleFactor
            }}
            transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: b.delay,
                ease: "easeInOut"
            }}
            className="flex items-center justify-center w-14 h-14 md:w-20 md:h-20 rounded-full bg-foreground/[0.05] dark:bg-white/5 backdrop-blur-2xl border border-foreground/10 dark:border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.05)] transition-colors duration-500"
        >
            <motion.img
                src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${b.icon}/${b.icon}-original.svg`}
                className="w-7 h-7 md:w-10 md:h-10"
                style={{
                    filter: useTransform(grayscale, (v) => `grayscale(${v}%)`),
                }}
                alt={b.icon}
            />
        </motion.div>
    );
}

function FloatingTechBubbles({ mouseX, mouseY }: { mouseX: any, mouseY: any }) {
    const bubbles = [
        // LEFT SIDE (Mixed AI & Software)
        { icon: "python", top: "15%", left: "8%", delay: 0.2 },
        { icon: "react", top: "28%", left: "20%", delay: 1.5 },
        { icon: "pytorch", top: "45%", left: "6%", delay: 0.7 },
        { icon: "nodejs", top: "62%", left: "18%", delay: 2.4 },
        { icon: "tensorflow", top: "78%", left: "10%", delay: 1.1 },

        // RIGHT SIDE (Mixed AI & Software)
        { icon: "nextjs", top: "18%", right: "12%", delay: 0.4 },
        { icon: "opencv", top: "35%", right: "22%", delay: 1.8 },
        { icon: "typescript", top: "52%", right: "10%", delay: 1.3 },
        { icon: "pandas", top: "68%", right: "24%", delay: 2.8 },
        { icon: "postgresql", top: "82%", right: "15%", delay: 0.9 },
    ];

    return (
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
            {bubbles.map((b, i) => (
                <Bubble key={i} b={b} mouseX={mouseX} mouseY={mouseY} />
            ))}
        </div>
    );
}

function VaporFog({ className }: { className?: string }) {
    return (
        <div className={cn("absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30", className)}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.1)_0%,transparent_70%)]" />
        </div>
    );
}


export default function SkillsPage() {
    const t = useTranslations('skills');
    const containerRef = useRef<HTMLDivElement>(null);

    // Mouse values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        mouseX.set(clientX);
        mouseY.set(clientY);
    };

    // Parallax values based on global scroll position
    const { scrollY } = useScroll();
    const yHeroText = useTransform(scrollY, [0, 800], [0, 350]);
    const opacityHero = useTransform(scrollY, [0, 600], [1, 0]);

    const yHeroSpline = useTransform(scrollY, [0, 1000], [0, 200]);
    const scaleSpline = useTransform(scrollY, [0, 800], [1, 1.05]);

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="min-h-screen bg-background relative selection:bg-primary/20"
        >
            <TechSchematic />

            <section className="relative h-screen flex items-end justify-center overflow-hidden pb-16">
                <motion.div
                    className="absolute inset-0 z-0"
                    style={{ y: yHeroSpline, scale: scaleSpline, willChange: 'transform' }}
                >
                    <SplineScene
                        scene="https://prod.spline.design/qVnpleqGGhqRlQYK/scene.splinecode"
                        className="w-full h-full opacity-60 md:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background pointer-events-none" />
                </motion.div>

                {/* Atmospheric Effects */}
                <VaporFog className="mix-blend-overlay" />

                <FloatingTechBubbles mouseX={mouseX} mouseY={mouseY} />

                <div className="relative z-10 text-center px-6 w-full pointer-events-none select-none">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        style={{ willChange: 'transform, opacity', y: yHeroText, opacity: opacityHero }}
                        className="flex flex-col items-center"
                    >
                        {/* REFINED: Titanium Solid Typography with Crystalline Sheen */}
                        <div className="relative group px-10">
                            <motion.h1
                                className="relative text-[10vw] md:text-[8vw] font-black italic uppercase leading-none tracking-tighter text-foreground drop-shadow-[0_0_20px_rgba(var(--foreground),0.15)] select-none pointer-events-none"
                            >
                                SKILLS & TOOLS

                                {/* Crystalline Sheen (Refined Elliptical Pulse) */}
                                <div className="absolute inset-x-0 inset-y-0 flex justify-center pointer-events-none overflow-hidden">
                                    {/* Left-ward Sheen */}
                                    <motion.div
                                        animate={{
                                            left: ["50%", "2%"],
                                            opacity: [0, 0.5, 0],
                                            scale: [0.8, 1.1, 0.8]
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            repeatDelay: 3,
                                            ease: "easeInOut"
                                        }}
                                        className="absolute top-0 bottom-0 w-[40%] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.4)_0%,transparent_70%)] blur-md rounded-[100%]"
                                    />
                                    {/* Right-ward Sheen */}
                                    <motion.div
                                        animate={{
                                            left: ["50%", "98%"],
                                            opacity: [0, 0.5, 0],
                                            scale: [0.8, 1.1, 0.8]
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            repeatDelay: 3,
                                            ease: "easeInOut"
                                        }}
                                        style={{ translateX: "-100%" }}
                                        className="absolute top-0 bottom-0 w-[40%] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.4)_0%,transparent_70%)] blur-md rounded-[100%]"
                                    />
                                </div>
                            </motion.h1>
                        </div>

                        {/* Subtitle - exactly as in Gambar 1 & 2 but MAX visibility */}
                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="max-w-4xl mx-auto mt-4 text-foreground font-mono leading-relaxed uppercase tracking-[0.5em] md:tracking-[1em] text-[10px] md:text-[13px] font-black pointer-events-auto shadow-sm"
                        >
                            {t('subtitle')}
                        </motion.p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.05 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 1 }}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="w-[1px] h-24 bg-gradient-to-b from-foreground to-transparent"
                    />
                </motion.div>
            </section>

            {/* VAPOR TRANSITION */}
            <div className="relative h-64 -mt-32 z-20 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background" />
                <VaporFog className="opacity-30" />
            </div>

            <HorizontalScrollCarousel />
            <HardSkills />
            <section className="pt-12 pb-48 px-8 relative overflow-hidden bg-background">
                <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
                </div>

                <div className="max-w-7xl mx-auto relative z-10 w-full mt-12 md:mt-16">
                    <div className="relative w-full flex flex-col justify-center items-center mb-0">
                        <ArchedTechIconsInteractive
                            key="arched-tech-icons-interactive"
                            icons={portfolioData.techStack.map(t => techLogos[t.name] || (t.icon?.includes('http') ? t.icon : `https://cdn.simpleicons.org/${t.name.toLowerCase().replace(/[\s.]/g, '')}`))}
                        />

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ margin: "-100px", once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center space-y-4 max-w-3xl mx-auto px-4 relative z-10 pointer-events-auto -mt-[30px] sm:-mt-[50px] md:-mt-[70px]"
                        >
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ margin: "-100px", once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="text-[10px] font-mono uppercase tracking-[0.5em] text-primary/80 font-bold block"
                            >
                                CORE TECHNOLOGIES
                            </motion.span>
                            <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-foreground">
                                The Engineering Foundation
                            </h2>
                            <p className="text-sm md:text-base text-muted-foreground leading-relaxed pt-2">
                                Building scalable architectures using modern languages and frameworks optimized for high-performance execution.
                            </p>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ margin: "-100px", once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mt-16 sm:mt-20 md:mt-24 w-full"
                    >
                        <KineticTechGrid
                            items={portfolioData.techStack.map(t => ({
                                name: t.name,
                                icon: techLogos[t.name] || (t.icon?.includes('http') ? t.icon : `https://cdn.simpleicons.org/${t.name.toLowerCase().replace(/[\s.]/g, '')}`)
                            }))}
                        />
                    </motion.div>
                </div>
            </section>

            <ToolsSection />
            <FeatureSection />

        </div>
    );
}
