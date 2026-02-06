'use client';

import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';

// Grouping logic helper
const GROUP_MAPPING: Record<string, string[]> = {
    'Artificial Intelligence': ['ai', 'machine learning', 'deep learning', 'nlp', 'computer vision'],
    'Software Architecture': ['software', 'backend', 'system', 'cloud'],
};

export const HardSkills = () => {
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
        <section className="py-32 px-6 relative overflow-hidden bg-background">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="mb-24 space-y-4">
                    <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-primary/80 font-bold block">
                        Technical_Core // 02
                    </span>
                    <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter leading-[0.9]">
                        Hard<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Capabilities</span>
                    </h2>
                </div>

                {/* Categories Layout */}
                <div className="space-y-32">
                    {Object.entries(categorizedSkills).map(([category, skills], catIdx) => {
                        if (skills.length === 0 || !skills) return null;

                        return (
                            <div key={category} className="group section-block">
                                <div className="flex items-baseline gap-4 mb-12 border-b border-border/40 pb-4">
                                    <span className="text-4xl font-black text-muted-foreground/10 group-hover:text-muted-foreground/20 transition-colors pointer-events-none select-none">
                                        0{catIdx + 1}
                                    </span>
                                    <h3 className="text-2xl font-bold uppercase tracking-widest text-foreground">{category}</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {skills.map((skill, idx) => (
                                        <div
                                            key={skill.name}
                                            className="relative p-6 border border-border/50 bg-card/50 hover:bg-card hover:border-primary/20 transition-all duration-300 rounded-lg shadow-sm dark:shadow-none"
                                        >
                                            <div className="flex flex-col gap-4">
                                                <div className="flex justify-between items-start">
                                                    <h4 className="text-lg font-bold uppercase tracking-tight text-foreground">{skill.name}</h4>
                                                    <div className="text-[10px] font-mono px-2 py-1 bg-secondary rounded text-muted-foreground uppercase">
                                                        {skill.level || 'Exp'}
                                                    </div>
                                                </div>
                                                {/* Progress Bar Background */}
                                                <div className="w-full bg-secondary h-1 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: '100%' }}
                                                        transition={{ duration: 1, delay: idx * 0.05 }}
                                                        className="h-full bg-primary origin-left"
                                                    />
                                                </div>

                                                {/* Skill Description (if any) or Placeholder for spacing */}
                                                <p className="text-xs text-muted-foreground line-clamp-2">
                                                    Core competency module active.
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
