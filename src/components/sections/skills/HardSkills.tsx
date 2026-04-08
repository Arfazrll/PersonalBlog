'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { X, ChevronRight, Cpu, Shield, Zap } from 'lucide-react';

// Configuration for category showcase
const CATEGORY_META: Record<string, { icon: any, label: string, color: string, description: string }> = {
    'Intelligent Systems & Applied AI': {
        icon: Cpu,
        label: 'Applied AI',
        color: 'text-blue-500',
        description: 'Engineering intelligent agents and neural architectures for systemic problem solving.'
    },
    'Software Architecture & Systems Engineering': {
        icon: Shield,
        label: 'Architecture',
        color: 'text-emerald-500',
        description: 'Designing resilient, distributed systems with a focus on scalability and high-availability.'
    },
    'Infrastructure & Platform Engineering': {
        icon: Zap,
        label: 'Infrastructure',
        color: 'text-purple-500',
        description: 'Orchestrating cloud-native foundations and high-performance delivery pipelines.'
    }
};

const GROUP_MAPPING: Record<string, string[]> = {
    'Intelligent Systems & Applied AI': ['ai', 'machine learning', 'deep learning', 'nlp', 'computer vision', 'intelligent'],
    'Software Architecture & Systems Engineering': ['software', 'backend', 'system', 'cloud', 'architecture', 'engineering'],
};

export const HardSkills = () => {
    const [activeTab, setActiveTab] = useState('Intelligent Systems & Applied AI');
    const [isExpanded, setIsExpanded] = useState(false);

    // Categorize hard skills memo
    const categorizedSkills = useMemo(() => {
        const groups: Record<string, typeof portfolioData.hardSkills> = {
            'Intelligent Systems & Applied AI': [],
            'Software Architecture & Systems Engineering': [],
            'Infrastructure & Platform Engineering': []
        };

        portfolioData.hardSkills.forEach(skill => {
            const cat = skill.category.toLowerCase();
            if (GROUP_MAPPING['Intelligent Systems & Applied AI'].some(k => cat.includes(k))) {
                groups['Intelligent Systems & Applied AI'].push(skill);
            } else if (GROUP_MAPPING['Software Architecture & Systems Engineering'].some(k => cat.includes(k))) {
                groups['Software Architecture & Systems Engineering'].push(skill);
            } else {
                groups['Infrastructure & Platform Engineering'].push(skill);
            }
        });

        return groups;
    }, []);

    const categories = Object.keys(categorizedSkills);
    const activeMeta = CATEGORY_META[activeTab];
    const activeSkillsList = categorizedSkills[activeTab];

    return (
        <section id="hard-skills" className="py-32 px-6 relative overflow-hidden bg-background">
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header - Synchronized & Right Aligned */}
                <div className="mb-24 flex flex-col items-end gap-4 text-right">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-6xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.05] max-w-5xl"
                    >
                        Technical <br /> Precision
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 0.5 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-foreground text-lg font-sans max-w-2xl pt-6 leading-relaxed border-t border-border mt-4"
                    >
                        High-fidelity engineering expertise focused on systemic performance,
                        infrastructure resilience, and intelligent neural architectures.
                    </motion.p>
                </div>

                {/* INTEGRATED SPLIT-VIEW CONTAINER (Blogie AI Style + Layout Expansion) */}
                <div className="relative border border-border/40 rounded-[40px] overflow-hidden shadow-2xl shadow-black/5 bg-card/10 transition-colors duration-500">

                    {/* Integrated Tab Bar - Subtle Vertical Grid */}
                    <div className="flex border-b border-border/40 bg-secondary/5 h-16 md:h-14">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveTab(cat)}
                                className={cn(
                                    "flex-1 px-4 text-[11px] md:text-xs font-mono uppercase tracking-[0.2em] transition-all duration-300 relative border-r border-border/40 last:border-r-0",
                                    activeTab === cat
                                        ? "bg-card text-foreground"
                                        : "text-muted-foreground/50 hover:text-foreground hover:bg-secondary/10"
                                )}
                            >
                                <span className="relative z-10">{CATEGORY_META[cat]?.label || cat}</span>
                                {activeTab === cat && (
                                    <motion.div
                                        layoutId="activeTabIndicator"
                                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary/80"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* DYNAMIC CONTENT AREA (SPLIT-VIEW) */}
                    <div className="flex flex-col lg:flex-row min-h-[520px] relative">
                        <motion.div
                            layout
                            className={cn(
                                "p-10 md:p-16 flex flex-col justify-between transition-all duration-700 ease-in-out",
                                isExpanded ? "lg:w-[45%]" : "lg:w-full"
                            )}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.4 }}
                                    className="space-y-8"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-primary/60">{activeTab}</span>
                                    </div>
                                    <h3 className={cn(
                                        "font-sans font-bold tracking-tight text-foreground transition-all duration-700",
                                        isExpanded ? "text-3xl md:text-4xl leading-[1.2]" : "text-5xl md:text-6xl leading-[1.1] max-w-4xl"
                                    )}>
                                        {activeMeta.description}
                                    </h3>
                                    <p className="text-lg font-sans text-muted-foreground/60 leading-relaxed max-w-xl">
                                        Synthesizing deep technical expertise into production-ready architectures that drive systemic value and growth.
                                    </p>
                                </motion.div>
                            </AnimatePresence>

                            <div className="mt-12 flex items-center gap-4">
                                <button
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    className={cn(
                                        "group flex items-center gap-3 px-8 py-4 rounded-full font-bold transition-all duration-500 shadow-xl active:scale-95",
                                        isExpanded
                                            ? "bg-white text-black hover:bg-white/90"
                                            : "bg-foreground text-background hover:scale-105 shadow-black/10"
                                    )}
                                >
                                    <span>{isExpanded ? 'Minimize View' : 'View technical Catalog'}</span>
                                    {isExpanded ? (
                                        <X size={18} className="rotate-0 group-hover:rotate-90 transition-transform duration-500" />
                                    ) : (
                                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform duration-500" />
                                    )}
                                </button>

                                {isExpanded && (
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-[10px] font-mono uppercase tracking-widest text-primary/40 animate-pulse"
                                    >

                                    </motion.span>
                                )}
                            </div>
                        </motion.div>

                        {/* RIGHT SIDE: INTEGRATED CATALOG (REVEALED ON EXPAND) */}
                        <AnimatePresence>
                            {isExpanded && (
                                <motion.div
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ width: "auto", opacity: 1 }}
                                    exit={{ width: 0, opacity: 0 }}
                                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                    className="flex-1 bg-secondary/[0.03] overflow-hidden"
                                >
                                    <div className="p-8 md:p-12 lg:p-16 h-full min-w-[320px] lg:min-w-[600px]">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {activeSkillsList.map((skill, idx) => (
                                                <motion.div
                                                    key={skill.name}
                                                    initial={{ opacity: 0, y: 15 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.1 + idx * 0.05 }}
                                                    className="p-6 bg-card/20 border border-border/20 hover:border-border rounded-2xl transition-all duration-300 group"
                                                >
                                                    <div className="flex justify-between items-start mb-4">
                                                        <h5 className="font-sans font-bold text-base tracking-tight">{skill.name}</h5>
                                                        <span className="text-[10px] font-sans font-medium px-2 py-0.5 bg-background border border-border/20 rounded text-muted-foreground/50 uppercase tracking-wider">{skill.level || 'Exp'}</span>
                                                    </div>
                                                    <div className="w-full h-0.5 bg-background/30 rounded-full overflow-hidden mb-4">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: skill.level === 'expert' ? '95%' : skill.level === 'advanced' ? '80%' : '60%' }}
                                                            transition={{ duration: 1.2, delay: 0.4 + idx * 0.05 }}
                                                            className="h-full bg-primary/20"
                                                        />
                                                    </div>
                                                    <p className="text-[13px] font-sans text-muted-foreground/70 leading-relaxed line-clamp-2">
                                                        {skill.description || `Core proficiency in deployment and maintenance of ${skill.name} architectures.`}
                                                    </p>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Subtle background decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/[0.01] rounded-full blur-[120px] pointer-events-none" />
        </section>
    );
};
