'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { portfolioData } from '@/data/portfolio';
import { SplineScene } from '@/components/ui/SplineScene';
import { TextPressure } from '@/components/ui/TextPressure';
import { KineticTechGrid } from '@/components/ui/KineticTechGrid';
import { SoftSkills } from '@/components/sections/skills/SoftSkills';
import { HardSkills } from '@/components/sections/skills/HardSkills';
import { ToolsSection } from '@/components/sections/skills/ToolsSection';
import { SkillsClosing } from '@/components/sections/skills/SkillsClosing';
import Particles from '@/components/ui/Particles';
import { cn } from '@/lib/utils';

// ==================== [PRESERVED CONSTANTS] ==================== //
// Tech logo mapping (Used for KineticTechGrid)
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

    return (
        <div ref={containerRef} className="min-h-screen bg-background relative selection:bg-primary/20">
            <TechSchematic />

            {/* ==================== HERO: ROBOT (PRESERVED) ==================== */}
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

            {/* VAPOR TRANSITION */}
            <div className="relative h-64 -mt-32 z-20 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background" />
                <VaporFog className="opacity-30" />
            </div>

            {/* ==================== NEW: SOFT SKILLS (MINIMALIST) ==================== */}
            <SoftSkills />

            {/* ==================== NEW: HARD SKILLS (CATEGORIZED) ==================== */}
            <HardSkills />

            {/* ==================== HYPER-ARSENAL (PRESERVED) ==================== */}
            <section className="py-48 px-8 relative overflow-hidden bg-background">
                <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
                    {/* Removed heavy particles, using simpler static/CSS if needed */}
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

            {/* ==================== NEW: TOOLS (BENTO GRID) ==================== */}
            <ToolsSection />

            {/* ==================== NEW: CLOSING (NATURAL SOFT) ==================== */}
            <SkillsClosing />

        </div>
    );
}
