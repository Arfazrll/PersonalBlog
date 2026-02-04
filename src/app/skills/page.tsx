'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Code2, Brain, Wrench, X, Layout, Zap, Cpu, Database, Network, ChevronRight, Terminal, Globe, Anchor } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { portfolioData } from '@/data/portfolio';
import { SplineScene } from '@/components/ui/SplineScene';
import { TextPressure } from '@/components/ui/TextPressure';
import { SkillRadar } from '@/components/ui/SkillRadar';
import { KineticTechGrid } from '@/components/ui/KineticTechGrid';
import { OrbitingCircles } from '@/components/ui/orbiting-circles';
import Particles from '@/components/ui/Particles';
import { DesignTestimonials, TestimonialItem } from '@/components/DesignTestimonials';

// Tech logo mapping
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

// Tool logo mapping
const toolLogos: Record<string, string> = {
    'VS Code': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
    'Figma': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
    'Postman': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg',
    'GitHub': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
    'Linux': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
    'Jupyter': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg',
};

// Mapping helper for custom icons or processing
const TechIcon = ({ name, icon, className }: { name: string, icon: string, className?: string }) => {
    return (
        <motion.div
            whileHover={{ y: -5, scale: 1.1 }}
            className={cn("relative flex items-center justify-center group cursor-crosshair", className)}
        >
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 scale-150" />
            <img
                src={icon}
                alt={name}
                className={cn(
                    "w-full h-full object-contain transition-all duration-500 transform drop-shadow-[0_0_8px_rgba(var(--primary-rgb),0.3)] group-hover:drop-shadow-[0_0_15px_rgba(var(--primary-rgb),0.6)]",
                    name.toLowerCase() === 'github' ? "dark:invert" : ""
                )}
            />
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none whitespace-nowrap">
                <div className="flex flex-col items-center">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary bg-background/80 backdrop-blur-md px-3 py-1 rounded-full border border-primary/20 shadow-xl">{name}</span>
                    <div className="w-[1px] h-4 bg-gradient-to-t from-primary to-transparent mt-1" />
                </div>
            </div>
        </motion.div>
    );
};

function VaporFog({ className }: { className?: string }) {
    return (
        <div className={cn("absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30", className)}>
            {/* Single fixed background glow for maximum performance */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.1)_0%,transparent_70%)]" />
        </div>
    );
}

function TechSchematic() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.02] mix-blend-overlay" />
            <div className="absolute inset-0 opacity-[0.05]">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid-large" width="100" height="100" patternUnits="userSpaceOnUse">
                            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="1" />
                        </pattern>
                        <pattern id="grid-small" width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid-small)" />
                    <rect width="100%" height="100%" fill="url(#grid-large)" strokeWidth="2" />
                </svg>
            </div>
            {/* Architectural Callouts */}
            <div className="absolute top-20 right-20 font-mono text-[8px] uppercase tracking-[0.5em] text-primary/20 rotate-90 origin-right select-none">
                System_Ref: 0xFF-01 // Architectural_Blueprint_Active
            </div>
        </div>
    );
}

export default function SkillsPage() {
    const t = useTranslations('skills');
    const containerRef = useRef<HTMLDivElement>(null);

    // Group skills for radar chart (V16 MACRO DOMAINS)
    const radarSkills = [
        { name: 'Machine Intelligence', level: 'advanced' },
        { name: 'System Engineering', level: 'expert' },
        { name: 'Strategic Leadership', level: 'expert' },
        { name: 'Web3 Architects', level: 'intermediate' },
        { name: 'Data Engineering', level: 'advanced' },
        { name: 'Human Logic', level: 'expert' },
    ];

    // Responsive state for Orbits
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

    return (
        <div ref={containerRef} className="min-h-screen bg-background relative selection:bg-primary/20">
            <TechSchematic />

            {/* HER0: IMMERSIVE FULL-WIDTH SPLINE (V13 TITAN BOOSST) */}
            <section className="relative h-screen flex items-end justify-center overflow-hidden pb-12">
                <div className="absolute inset-0 z-0">
                    <SplineScene
                        scene="https://prod.spline.design/qVnpleqGGhqRlQYK/scene.splinecode"
                        className="w-full h-full opacity-60 md:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background pointer-events-none" />
                </div>

                <div className="relative z-10 text-center px-6 w-full pointer-events-none select-none">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="h-[180px] md:h-[320px] w-full max-w-full mx-auto relative flex items-center justify-center overflow-visible">
                            <TextPressure
                                text={t('title')}
                                flex={false}
                                textColor="hsl(var(--foreground))"
                                strokeWidth={1}
                                minFontSize={80}
                                maxFontSize={220} // Titan Scale
                                className="font-black italic" // Removed expensive drop-shadow
                            />
                        </div>
                        {/* TIGHTENED SPACING: Reduced mt-6 to mt-1 for professional cohesion */}
                        <p className="max-w-4xl mx-auto mt-1 text-foreground/40 font-mono leading-relaxed uppercase tracking-[1.5em] text-[9px] pointer-events-auto">
                            {t('subtitle')}
                        </p>
                    </motion.div>
                </div>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-5">
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="w-[1px] h-24 bg-gradient-to-b from-foreground to-transparent"
                    />
                </div>
            </section>

            {/* VAPOR TRANSITION: HERO TO MANIFESTO */}
            <div className="relative h-64 -mt-32 z-20 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background" />
                <VaporFog className="opacity-30" />
            </div>

            {/* SECTION 01: CORE COMPETENCIES (POLISHED RADAR) - MOVED UP */}
            {/* SECTION 01: CORE COMPETENCIES (POLISHED RADAR) - MOVED UP */}
            <section className="py-24 md:py-64 px-4 md:px-8 relative overflow-hidden bg-secondary/5 dark:bg-black/20">
                <div className="absolute inset-0 bg-primary/[0.01] skew-y-6 z-0" />

                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-24 relative z-10">
                    <div className="flex-1 space-y-12">
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 text-primary">
                                <Cpu size={24} className="animate-pulse" />
                                <span className="text-[10px] font-mono uppercase tracking-[0.5em] font-black">Core_Logic // 01</span>
                            </div>
                            <h2 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter leading-[0.85]">
                                Expertise<br /><span className="text-primary">Manifesto</span>
                            </h2>
                        </div>
                        <p className="text-xl text-muted-foreground/70 max-w-xl leading-relaxed font-medium uppercase tracking-tight">
                            A multi-dimensional breakdown of capabilities. This radar mesh visualizes the intersection of complex engineering and strategic leadership.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
                            {[
                                { name: 'Neural Exploration', desc: 'SOTA Model Engineering', icon: Brain },
                                { name: 'Architectural Integrity', desc: 'Distributed Systems Design', icon: Cpu },
                                { name: 'Decision Science', desc: 'Tactical Operation Sync', icon: Network },
                                { name: 'Information Pipelines', desc: 'Large-scale ETL/ELT', icon: Database }
                            ].map((item, idx) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="group relative py-4"
                                >
                                    {/* FLOATING Glow AURA */}
                                    <div className="absolute -inset-x-6 -inset-y-4 bg-primary/0 group-hover:bg-primary/[0.03] blur-2xl rounded-full transition-all duration-700" />

                                    <div className="relative z-10 flex items-start gap-6">
                                        <div className="p-3 bg-white/0 border border-white/5 rounded-2xl group-hover:border-primary/40 group-hover:bg-primary/5 transition-all duration-500">
                                            <item.icon size={22} className="text-primary/40 group-hover:text-primary transition-colors duration-500" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-foreground/80 group-hover:text-primary transition-colors duration-500">{item.name}</h3>
                                            <p className="text-[10px] text-muted-foreground/30 group-hover:text-muted-foreground/60 uppercase tracking-widest font-mono transition-colors duration-500">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 flex justify-center relative w-full md:w-auto overflow-visible">
                        <div className="absolute inset-x-0 inset-y-0 bg-primary/2 blur-[160px] rounded-full scale-75 animate-pulse" />
                        <div className="relative p-2 md:p-12 border border-primary/5 rounded-full">
                            <div className="absolute inset-0 border border-primary/10 rounded-full scale-[1.05] opacity-20" />
                            <SkillRadar skills={radarSkills} size={isMobile ? 280 : 550} className="relative z-10" />
                        </div>
                    </div>
                </div>
            </section>

            {/* VAPOR TRANSITION: MANIFESTO TO HORIZONTAL */}
            <div className="relative h-96 -mt-48 z-20 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-black/60" />
                <VaporFog className="scale-150 rotate-180 opacity-40 blur-xl" />
            </div>

            {/* HORIZONTAL SKILLS EXPERIENCE (V17.2 - RESPONSIVE STACK) */}
            <section ref={targetRef} className="relative h-auto md:h-[400vh] -mt-12 md:-mt-24">
                <div className="relative md:sticky md:top-0 h-auto md:h-screen overflow-hidden">
                    {/* FIXED CINEMATIC BACKGROUND */}
                    <div className="absolute inset-0 z-0 bg-background/80 dark:bg-black/60 backdrop-blur-[6px]">
                        <Particles className="opacity-30" />
                        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
                    </div>

                    <motion.div style={{ x: isMobile ? 0 : x }} className="flex flex-col md:flex-row h-auto md:h-full w-full md:w-[200vw] relative z-10">

                        {/* SLIDE 01: STRATEGIC INTEL (SOFT SKILLS) - FLOATING V15 */}
                        <div className="w-full md:w-screen min-h-screen md:h-screen flex flex-col justify-center px-6 md:px-24 py-24 md:py-0">
                            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-32 items-center">
                                <div className="md:col-span-5 space-y-8">
                                    <div className="space-y-4">
                                        <span className="text-[10px] font-mono uppercase tracking-[0.6em] text-primary font-black block">Phase_Alpha // 01</span>
                                        <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter leading-[0.9]">
                                            Strategic<br /><span className="text-primary italic font-light">Intelligence</span>
                                        </h2>
                                    </div>
                                    <p className="text-muted-foreground/40 uppercase text-[11px] font-black tracking-[0.4em] leading-[2.2] max-w-sm">
                                        Human-centric leadership and systemic problem solving for global scale execution.
                                    </p>
                                </div>

                                <div className="md:col-span-7 relative">
                                    {/* REMOVED CONTAINER BG & BORDER: Now content floats */}
                                    <div className="grid grid-cols-1 gap-y-12 relative z-10">
                                        {portfolioData.softSkills.slice(0, 4).map((skill, idx) => (
                                            <motion.div
                                                key={skill.name}
                                                initial={{ opacity: 0, x: 20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.1 }}
                                                className="group/card relative py-3"
                                            >
                                                {/* INTEGRATED GLOW: Subtle focus instead of rigid box */}
                                                <div className="absolute -inset-x-8 -inset-y-4 bg-primary/0 group-hover/card:bg-primary/[0.03] blur-2xl rounded-full transition-all duration-700" />

                                                <div className="relative z-10 space-y-3">
                                                    <div className="flex items-center justify-between">
                                                        <h3 className="text-2xl font-black italic uppercase tracking-tight group-hover/card:text-primary transition-colors duration-500 scale-100 group-hover/card:scale-[1.02] origin-left">{skill.name}</h3>
                                                        <div className="flex gap-1.5">
                                                            {[1, 2, 3, 4, 5].map(dot => (
                                                                <div key={dot} className={cn("w-1.5 h-1.5 rounded-full transition-all duration-700", dot <= (idx % 2 === 0 ? 5 : 4) ? "bg-primary group-hover/card:shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]" : "bg-white/5")} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <p className="text-[10px] leading-relaxed text-muted-foreground/40 group-hover/card:text-muted-foreground/70 uppercase tracking-[0.25em] font-bold transition-colors duration-500">
                                                        {skill.description}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SLIDE 02: TECHNICAL CORE (HARD SKILLS) - FLOATING V15 */}
                        <div className="w-full md:w-screen min-h-screen md:h-screen flex flex-col justify-center px-6 md:px-24 py-24 md:py-0">
                            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-32 items-center">
                                <div className="md:col-span-5 space-y-8">
                                    <div className="space-y-4">
                                        <span className="text-[10px] font-mono uppercase tracking-[0.6em] text-primary font-black block">Phase_Beta // 02</span>
                                        <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter leading-[0.9] text-primary">
                                            Technical<br /><span className="text-foreground dark:text-white">Core</span>
                                        </h2>
                                    </div>
                                    <p className="text-muted-foreground/40 uppercase text-[11px] font-black tracking-[0.4em] leading-[2.2] max-w-sm">
                                        Merging artificial intelligence with robust software architecture to build autonomous systems.
                                    </p>
                                    <div className="flex flex-col gap-4">
                                        <p className="text-[9px] font-mono uppercase text-muted-foreground/20 italic tracking-widest">Horizontal Progress Tracker</p>
                                        <div className="w-full h-[1px] bg-white/5 relative overflow-hidden">
                                            <motion.div
                                                style={{ scaleX: scrollYProgress }}
                                                className="absolute inset-y-0 left-0 w-full bg-primary origin-left shadow-[0_0_15px_rgba(var(--primary-rgb),0.8)]"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="md:col-span-7 relative">
                                    {/* REMOVED CONTAINER BG & BORDER: Now content floats */}
                                    <div className="grid grid-cols-1 gap-12 relative z-10">
                                        {[
                                            {
                                                name: 'AI & Machine Intelligence',
                                                category: 'AI/ML',
                                                skills: portfolioData.hardSkills.filter(s => s.category === 'ai').slice(0, 5).map(s => s.name)
                                            },
                                            {
                                                name: 'System Architecture',
                                                category: 'Engineering',
                                                skills: portfolioData.hardSkills.filter(s => s.category === 'software').slice(0, 5).map(s => s.name)
                                            }
                                        ].map((item, idx) => (
                                            <motion.div
                                                key={item.name}
                                                initial={{ opacity: 0, y: 10 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ delay: idx * 0.1 }}
                                                className="group/card relative p-10 flex flex-col md:flex-row md:items-center justify-between gap-12"
                                            >
                                                {/* INTEGRATED GLOW: Expansive aura instead of box */}
                                                <div className="absolute inset-0 bg-primary/0 group-hover/card:bg-primary/[0.02] blur-[80px] rounded-full transition-all duration-1000" />

                                                <div className="space-y-6 relative z-10 flex-1">
                                                    <div className="flex items-center gap-6">
                                                        <h3 className="text-3xl font-black italic uppercase tracking-tight group-hover/card:text-primary transition-colors duration-500">{item.name}</h3>
                                                        <span className="px-4 py-1.5 bg-primary/0 text-primary rounded-full text-[11px] font-black uppercase tracking-[0.2em] border border-primary/20 group-hover/card:bg-primary/10 transition-all duration-700">
                                                            {item.category}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-wrap gap-x-8 gap-y-4">
                                                        {item.skills.map(s => (
                                                            <span key={s} className="text-[12px] font-mono uppercase text-white/20 group-hover/card:text-white/50 transition-colors duration-500 tracking-[0.3em] font-medium">{s}</span>
                                                        ))}
                                                    </div>
                                                </div>

                                                <motion.div
                                                    whileHover={{ scale: 1.1, x: 5 }}
                                                    className="w-14 h-14 rounded-full bg-white/0 flex items-center justify-center border border-white/5 group-hover/card:bg-primary/10 group-hover/card:border-primary/40 transition-all duration-500 relative z-10"
                                                >
                                                    <ChevronRight size={20} className="text-primary/20 group-hover/card:text-primary transition-colors" />
                                                </motion.div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* SECTION 02: KINETIC TECH MATRIX */}
            <section className="py-48 px-8 relative overflow-hidden">
                <TechSchematic />
                <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
                    <Particles className="opacity-10" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-32 gap-12">
                        <div className="space-y-4">
                            <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-primary font-black block">Engine_Core // 02</span>
                            <h2 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter">Hyper-Arsenal</h2>
                        </div>
                        <p className="max-w-sm text-muted-foreground/60 uppercase text-[10px] font-black tracking-[0.3em] leading-[2.5]">
                            A kinetic collection of technologies maintained at the bleeding edge of software engineering.
                        </p>
                    </div>

                    <KineticTechGrid
                        items={portfolioData.techStack.map(t => ({
                            name: t.name,
                            icon: techLogos[t.name] || (t.icon?.includes('http') ? t.icon : `https://cdn.simpleicons.org/${t.name.toLowerCase().replace(/[\s.]/g, '')}`)
                        }))}
                    />
                </div>
            </section>

            {/* SECTION 03: ORBITAL WORKBENCH (V20 RESPONSIVE & REBRANDED) */}
            <section className="relative bg-background transition-colors duration-1000 min-h-screen py-32 flex flex-col items-center justify-center overflow-hidden">
                <TechSchematic />
                <VaporFog className="opacity-40" />

                {/* SECTION HEADER: Adding clear context as requested */}
                <div className="relative z-20 text-center mb-24 px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="space-y-4"
                    >
                        <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-primary font-black block">Tool_Ecosystem // 03</span>
                        <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter">Tech Arsenal</h2>
                        <p className="max-w-lg mx-auto text-muted-foreground/60 uppercase text-[10px] font-black tracking-[0.3em] leading-relaxed">
                            The professional instruments and environments that power my creative and analytical output.
                        </p>
                    </motion.div>
                </div>

                <div className="relative flex h-[600px] md:h-[900px] w-full flex-col items-center justify-center overflow-hidden">
                    {/* REBRANDED TEXT: ARSENAL instead of ORBITAL */}
                    <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-primary to-primary/20 bg-clip-text text-center text-5xl md:text-9xl font-black italic leading-none text-transparent mb-12 select-none opacity-20">
                        ARSENAL
                    </span>

                    {/* Outer Circle (Infrastructure) - RESPONSIVE RADII */}
                    <OrbitingCircles
                        className="border-none bg-transparent"
                        duration={40}
                        radius={isMobile ? 160 : 320}
                        iconSize={isMobile ? 30 : 45}
                    >
                        {portfolioData.tools
                            .filter(t => ['GitHub', 'Git', 'Docker', 'Linux'].some(k => t.name.toLowerCase().includes(k.toLowerCase())))
                            .map((tool) => (
                                <TechIcon key={tool.name} name={tool.name} icon={tool.icon} />
                            ))}
                    </OrbitingCircles>

                    {/* Middle Circle (IDE) - RESPONSIVE RADII */}
                    <OrbitingCircles
                        className="border-none bg-transparent"
                        duration={30}
                        radius={isMobile ? 100 : 190}
                        iconSize={isMobile ? 35 : 50}
                        reverse
                    >
                        {portfolioData.tools
                            .filter(t => ['VS Code', 'Jupyter', 'Google Colab'].some(k => t.name.toLowerCase().includes(k.toLowerCase())))
                            .map((tool) => (
                                <TechIcon key={tool.name} name={tool.name} icon={tool.icon} />
                            ))}
                    </OrbitingCircles>

                    {/* Inner Circle (Utilities) - RESPONSIVE RADII */}
                    <OrbitingCircles
                        className="border-none bg-transparent"
                        duration={20}
                        radius={isMobile ? 60 : 100}
                        iconSize={isMobile ? 25 : 35}
                    >
                        {portfolioData.tools
                            .filter(t => ['Figma', 'Postman', 'Conda'].some(k => t.name.toLowerCase().includes(k.toLowerCase())))
                            .map((tool) => (
                                <TechIcon key={tool.name} name={tool.name} icon={tool.icon} />
                            ))}
                    </OrbitingCircles>
                </div>
            </section>

            {/* SECTION 04: STRATEGIC DIRECTIVES (V8.2 MANIFESTO CONCEPT) */}
            <section className="py-32 relative overflow-hidden bg-muted/30 dark:bg-[#000000]">
                <div className="absolute inset-0 bg-primary/[0.02] mix-blend-overlay pointer-events-none" />
                <DesignTestimonials
                    title="Strategic Directives"
                    testimonials={collaborationLogs}
                    duration={10000}
                />
            </section>
        </div>
    );
}

const collaborationLogs: TestimonialItem[] = [
    {
        quote: "Technical innovation is meaningless without strategic execution. My goal is to build solutions that don't just work, but scale and solve real problems.",
        author: "Strategic Execution",
        role: "Bio Manifesto // 01",
        company: "Telkom University"
    },
    {
        quote: "As an AI Researcher at CPS Lab, I've learned that deep technical expertise must be translated into blueprints that humans can navigate and utilize.",
        author: "Technical Innovation",
        role: "Research Philosophy // 02",
        company: "CPS Laboratory"
    },
    {
        quote: "Bridging the gap between a student of Information Technology and a leader in digital transformation is the ultimate engineering challenge.",
        author: "Tech Explorer",
        role: "Operational Directive // 03",
        company: "Syahril Arfian Almazril"
    }
];
