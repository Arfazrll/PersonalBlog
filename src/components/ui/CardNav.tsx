'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChevronDown, ArrowUpRight, Trophy, MousePointer2, Briefcase, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavLink {
    label: string;
    href: string;
    description?: string;
    icon?: any;
}

interface NavItem {
    label: string;
    links: NavLink[];
}

interface CardNavProps {
    items: NavItem[];
    theme?: 'light' | 'dark';
    pathname?: string;
}

export default function CardNav({
    items,
    theme = "dark",
    pathname = "/"
}: CardNavProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsExpanded(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // About is the only item now as requested
    const aboutItem = items.find(i => i.label === "About") || items[0];

    return (
        <div ref={containerRef} className="relative">
            <motion.button
                onMouseEnter={() => setIsExpanded(true)}
                onClick={() => setIsExpanded(!isExpanded)}
                className={cn(
                    "relative px-6 py-2.5 text-sm font-bold transition-all duration-300 rounded-full flex items-center gap-2 group overflow-hidden",
                    theme === 'dark'
                        ? "text-white/70 hover:text-white"
                        : "text-black/70 hover:text-black"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <div className="absolute inset-0 bg-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10">{aboutItem.label}</span>
                <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10"
                >
                    <ChevronDown className="w-4 h-4" />
                </motion.div>
            </motion.button>

            {/* Mega Menu Dropdown */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        onMouseLeave={() => setIsExpanded(false)}
                        initial={{ opacity: 0, y: 15, scale: 0.98, rotateX: -5, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0, x: "-50%" }}
                        exit={{ opacity: 0, y: 10, scale: 0.98, x: "-50%" }}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                        }}
                        style={{ perspective: "1200px" }}
                        className="fixed top-28 left-1/2 z-[100] w-full max-w-5xl px-6"
                    >
                        <div className="relative p-1 glass-strong rounded-[2.5rem] border border-white/10 shadow-2xl shadow-black/60 overflow-hidden bg-card/95 backdrop-blur-2xl">
                            {/* Inner Content Grid - Side by Side Cards */}
                            <div className="flex flex-col md:flex-row gap-2 p-2">
                                {aboutItem.links.map((link, idx) => {
                                    // Map icons to labels
                                    const icons: Record<string, any> = {
                                        "Achievements": Trophy,
                                        "Skills": MousePointer2,
                                        "Experience": Briefcase,
                                        "Projects": Rocket
                                    };
                                    const Icon = icons[link.label] || Rocket;

                                    return (
                                        <Link
                                            key={link.label}
                                            href={link.href}
                                            className="group/card flex-1 min-h-[180px] md:min-h-[240px] relative p-6 md:p-8 rounded-[2rem] overflow-hidden transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] bg-secondary/30 dark:bg-white/5 hover:bg-white/10 dark:hover:bg-white/10"
                                        >
                                            {/* Decorative Gradient Background */}
                                            <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none">
                                                <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-foreground/5 blur-[80px] rounded-full" />
                                                <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-primary/5 blur-[80px] rounded-full" />
                                            </div>

                                            <div className="relative h-full flex flex-col justify-between z-10">
                                                <div className="flex items-start justify-between">
                                                    <div className="p-3 rounded-2xl bg-foreground/5 group-hover/card:bg-foreground/10 transition-colors">
                                                        <Icon className="w-5 h-5 text-foreground/70" />
                                                    </div>
                                                    <ArrowUpRight className="w-5 h-5 opacity-20 group-hover/card:opacity-100 group-hover/card:translate-x-1 group-hover/card:-translate-y-1 transition-all duration-300" />
                                                </div>

                                                <div>
                                                    <h4 className="text-xl md:text-2xl font-black tracking-tight mb-2 text-foreground">
                                                        {link.label}
                                                    </h4>
                                                    <p className="text-xs md:text-sm text-muted-foreground/60 leading-relaxed font-medium">
                                                        {link.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>


                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
