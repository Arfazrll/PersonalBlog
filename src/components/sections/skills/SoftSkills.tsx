'use client';

import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { cn } from '@/lib/utils';
import { useMemo, useState, useEffect } from 'react';


// --- SUB-COMPONENT: Skill Card Content ---
const SkillCard = ({ skill, index, isBack = false }: { skill: any, index: number, isBack?: boolean }) => {
    return (
        <div className={cn(
            "h-full w-full relative p-8 md:p-12 flex flex-col justify-between overflow-hidden transition-colors duration-500 border border-neutral-300 dark:border-white/10 bg-white dark:bg-card text-card-foreground",
            // Shadows for depth in light mode
            "shadow-lg dark:shadow-none"
        )}>
            {/* Hover Gradient Bloom */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full justify-between gap-8 md:gap-12">
                <div className="space-y-4 md:space-y-6">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-muted-foreground/60 group-hover:text-primary transition-colors duration-500">
                            {(index + 1).toString().padStart(2, '0')}
                        </span>
                        <div className="w-2 h-2 rounded-full bg-foreground/10 group-hover:bg-primary transition-colors duration-500" />
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-foreground group-hover:translate-x-2 transition-transform duration-500 will-change-transform">
                        {skill.name}
                    </h3>
                </div>

                <div className="space-y-4 md:space-y-6">
                    <div className="h-px w-full bg-foreground/10 group-hover:bg-primary/20 transition-colors duration-500 origin-left group-hover:scale-x-100" />
                    <p className="text-xs md:text-sm text-muted-foreground group-hover:text-foreground leading-relaxed transition-colors duration-500">
                        {skill.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

// --- SUB-COMPONENT: Flipping Card Logic ---
const FlippingCard = ({ front, back, index }: { front: any, back: any, index: number }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        // Random interval between 2.5s and 4.0s for organic feel
        // We add a stagger based on index to prevent initial sync
        const baseInterval = 3000;
        const randomOffset = Math.random() * 1500;
        const intervalTime = baseInterval + randomOffset;

        const interval = setInterval(() => {
            if (!isHovered) {
                setIsFlipped((prev) => !prev);
            }
        }, intervalTime);

        // Initial stagger timeout to descynchronize the very first flip
        const initialDelay = index * 200;

        return () => clearInterval(interval);
    }, [isHovered, index]);

    return (
        <div
            className="group relative w-full h-[320px] md:h-[400px] perspective-1000 cursor-default"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                className="relative w-full h-full preserve-3d"
                initial={false}
                animate={{ rotateX: isFlipped ? 180 : 0 }}
                transition={{
                    duration: 0.7,
                    ease: [0.65, 0, 0.35, 1]
                }}
                style={{
                    transformStyle: 'preserve-3d',
                    willChange: 'transform',
                    transform: 'translateZ(0)'
                }}
            >
                {/* FRONT FACE */}
                <div
                    className="absolute inset-0 backface-hidden"
                    style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'translateZ(0)'
                    }}
                >
                    <SkillCard skill={front} index={index} />
                </div>

                {/* BACK FACE */}
                <div
                    className="absolute inset-0 backface-hidden"
                    style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateX(180deg) translateZ(0)'
                    }}
                >
                    <SkillCard skill={back} index={index + 4} isBack={true} />
                </div>
            </motion.div>
        </div>
    );
};

export const SoftSkills = () => {
    // We want 4 cards but 8 skills.
    // Card 1: Skill 0 & 4
    // Card 2: Skill 1 & 5
    // Card 3: Skill 2 & 6
    // Card 4: Skill 3 & 7
    const pairs = useMemo(() => {
        const p = [];
        const source = portfolioData.softSkills;
        // Ensure we have enough skills, fallback if not
        if (source.length < 8) return [];

        for (let i = 0; i < 4; i++) {
            p.push({
                front: source[i],
                back: source[i + 4],
                id: i
            });
        }
        return p;
    }, []);

    return (
        <section id="soft-skills" className="py-32 px-6 relative overflow-hidden bg-slate-50 dark:bg-background">

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header - Minimalist Typography */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-neutral-400 dark:border-white/10 pb-12"
                >
                    <div className="space-y-4">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-[10px] font-mono uppercase tracking-[0.5em] text-primary/80 font-bold block"
                        >
                            Competency_Matrix // 01
                        </motion.span>
                        <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter leading-[0.9]">
                            <span className="text-gray-900 dark:text-white block transition-colors duration-300">Strategic</span>
                            <span className="text-yellow-600 dark:text-yellow-500 transition-colors duration-300 font-light not-italic">Directives</span>
                        </h2>
                    </div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="max-w-md text-sm text-neutral-800 dark:text-muted-foreground/60 font-mono leading-relaxed"
                    >
                        Interpersonal capabilities engineered for high-impact leadership and systemic problem solving in complex environments.
                    </motion.p>
                </motion.div>

                {/* Grid Layout - 2x2 but flipping with GAP */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pairs.map((pair, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                        >
                            <FlippingCard
                                front={pair.front}
                                back={pair.back}
                                index={idx}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
