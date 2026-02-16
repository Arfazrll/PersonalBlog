'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';


// Grouping logic helper
const GROUP_MAPPING: Record<string, string[]> = {
    'Artificial Intelligence': ['ai', 'machine learning', 'deep learning', 'nlp', 'computer vision'],
    'Software Architecture': ['software', 'backend', 'system', 'cloud'],
};

export const HardSkills = () => {
    // State to track open categories - default is empty (all closed)
    const [openCategories, setOpenCategories] = useState<Set<string>>(new Set());

    const toggleCategory = (category: string) => {
        setOpenCategories((prev) => {
            const next = new Set(prev);
            if (next.has(category)) {
                next.delete(category);
            } else {
                next.add(category);
            }
            return next;
        });
    };

    // Categorize hard skills
    const categorizedSkills = useMemo(() => {
        const groups: Record<string, typeof portfolioData.hardSkills> = {
            'Artificial Intelligence': [],
            'Software Engineering': [],
            'Other': []
        };

        portfolioData.hardSkills.forEach(skill => {
            const cat = skill.category.toLowerCase();
            if (GROUP_MAPPING['Artificial Intelligence'].some(k => cat.includes(k))) {
                groups['Artificial Intelligence'].push(skill);
            } else if (GROUP_MAPPING['Software Architecture'].some(k => cat.includes(k))) {
                groups['Software Engineering'].push(skill);
            } else {
                groups['Other'].push(skill);
            }
        });

        return groups;
    }, []);

    return (
        <section id="hard-skills" className="py-32 px-6 relative overflow-hidden bg-slate-50 dark:bg-background">
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-24 space-y-4"
                >
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-[10px] font-mono uppercase tracking-[0.5em] text-primary/80 font-bold block"
                    >
                        Technical_Core // 02
                    </motion.span>
                    <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter leading-[0.9]">
                        Hard <br />
                        <span className="text-neutral-900 dark:text-white">Capabilities</span>
                    </h2>
                </motion.div>

                {/* Categories Layout */}
                <div className="space-y-12">
                    {Object.entries(categorizedSkills).map(([category, skills], catIdx) => {
                        if (skills.length === 0 || !skills) return null;
                        const isOpen = openCategories.has(category);

                        return (
                            <motion.div
                                key={category}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: catIdx * 0.1 }}
                                className="group section-block"
                            >
                                <button
                                    onClick={() => toggleCategory(category)}
                                    className="w-full flex items-center justify-between gap-4 mb-2 border-b border-neutral-400 dark:border-white/10 pb-4 transition-all hover:opacity-80"
                                >
                                    <div className="flex items-baseline gap-4">
                                        <span className="text-4xl font-black text-neutral-500 dark:text-muted-foreground/10 group-hover:text-primary transition-colors pointer-events-none select-none">
                                            0{catIdx + 1}
                                        </span>
                                        <h3 className="text-2xl font-bold uppercase tracking-widest text-foreground">{category}</h3>
                                    </div>
                                    <motion.div
                                        animate={{ rotate: isOpen ? 180 : 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="text-neutral-500 dark:text-white/30 group-hover:text-primary"
                                    >
                                        <ChevronDown size={32} strokeWidth={3} />
                                    </motion.div>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pt-8 pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                                {skills.map((skill, idx) => (
                                                    <motion.div
                                                        key={skill.name}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.4, delay: idx * 0.05, ease: "easeOut" }}
                                                        style={{
                                                            willChange: 'transform, opacity',
                                                            transform: 'translateZ(0)'
                                                        }}
                                                        className="relative p-6 border border-neutral-300 dark:border-white/10 bg-white dark:bg-white/[0.02] hover:border-neutral-400 dark:hover:border-white/20 hover:shadow-lg transition-all duration-300 rounded-lg shadow-md"
                                                    >
                                                        <div className="flex flex-col gap-4">
                                                            <div className="flex justify-between items-start">
                                                                <h4 className="text-lg font-bold uppercase tracking-tight text-neutral-900 dark:text-white">{skill.name}</h4>
                                                                <div className="text-[10px] font-mono px-2 py-1 bg-neutral-100 dark:bg-white/5 rounded text-neutral-500 dark:text-neutral-400 uppercase border border-neutral-200 dark:border-white/5">
                                                                    {skill.level || 'Exp'}
                                                                </div>
                                                            </div>

                                                            {/* Progress Bar Background */}
                                                            <div className="w-full bg-secondary h-1 rounded-full overflow-hidden">
                                                                <motion.div
                                                                    initial={{ scaleX: 0 }}
                                                                    animate={{
                                                                        scaleX: skill.level === 'expert' ? 1 :
                                                                            skill.level === 'advanced' ? 0.75 :
                                                                                skill.level === 'intermediate' ? 0.5 : 0.25
                                                                    }}
                                                                    transition={{ duration: 1, delay: idx * 0.05 + 0.2, ease: "easeOut" }}
                                                                    style={{
                                                                        originX: 0,
                                                                        willChange: 'transform'
                                                                    }}
                                                                    className="h-full w-full bg-primary"
                                                                />
                                                            </div>

                                                            {/* Skill Description */}
                                                            <p className="text-xs text-muted-foreground line-clamp-2">
                                                                {skill.description || 'Modul kompetensi inti aktif.'}
                                                            </p>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
