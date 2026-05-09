'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';
import Link from 'next/link';
import { ChevronDown, Trophy, Navigation, Briefcase, Rocket, BookOpen, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavLink {
    label: string;
    href: string;
    description?: string;
    tagline?: string;
    color?: string;
    iconColor?: string;
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

// Logic for Fisheye Icon
function DockIcon({
    link,
    mouseX,
    index,
    iconMap,
    setIsExpanded,
    theme
}: {
    link: NavLink,
    mouseX: MotionValue,
    index: number,
    iconMap: Record<string, any>,
    setIsExpanded: (v: boolean) => void,
    theme: 'light' | 'dark'
}) {
    const ref = useRef<HTMLDivElement>(null);
    const Icon = iconMap[link.href] || Sparkles;

    // Calculate distance between mouse and icon center
    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    // Interpolate scale based on distance (Fisheye effect)
    // Scale from 1 to 1.8 within 150px range
    const widthTransform = useTransform(distance, [-150, 0, 150], [60, 100, 60]);
    const width = useSpring(widthTransform, { stiffness: 350, damping: 25, mass: 0.1 });

    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link
            href={link.href}
            onClick={() => setIsExpanded(false)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="flex flex-col items-center justify-end h-full group relative px-2"
        >
            {/* Tooltip Label */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: -10, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.8 }}
                        className="absolute -top-12 px-3 py-1.5 rounded-lg bg-foreground text-background text-[10px] font-black uppercase tracking-widest whitespace-nowrap z-50 pointer-events-none"
                    >
                        {link.label}
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-foreground" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Magnified Icon Container */}
            <motion.div
                ref={ref}
                style={{ width }}
                className={cn(
                    "relative aspect-square rounded-2xl flex items-center justify-center transition-colors overflow-hidden border",
                    theme === 'dark'
                        ? "bg-white/5 border-white/10 group-hover:bg-white/10 group-hover:border-white/20"
                        : "bg-black/5 border-black/10 group-hover:bg-black/10 group-hover:border-black/20"
                )}
            >
                {/* Background Glow */}
                <motion.div
                    animate={{ opacity: isHovered ? 0.3 : 0 }}
                    className={cn(
                        "absolute inset-0 blur-xl bg-gradient-to-br",
                        link.color || "from-primary/50 to-transparent"
                    )}
                />

                <Icon className={cn(
                    "w-[40%] h-[40%] transition-transform duration-300",
                    isHovered
                        ? "scale-110 " + (link.iconColor || "text-primary")
                        : (theme === 'dark' ? "text-white/40" : "text-black/30")
                )} />
            </motion.div>
        </Link>
    );
}

export default function CardNav({
    items,
    theme = "dark",
    pathname = "/"
}: CardNavProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(Infinity);

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

    const aboutItem = items.find(i => i.label === "About") || items[0];

    const isActive = useMemo(() => {
        return aboutItem.links.some(link => pathname === link.href || pathname.startsWith(`${link.href}/`));
    }, [pathname, aboutItem.links]);

    const iconMap: Record<string, any> = {
        "/achievements": Trophy,
        "/skills": Navigation,
        "/experience": Briefcase,
        "/projects": Rocket,
        "/blog": BookOpen
    };

    return (
        <div ref={containerRef} className="relative">
            <motion.button
                onMouseEnter={() => setIsExpanded(true)}
                onClick={() => setIsExpanded(!isExpanded)}
                className={cn(
                    "relative px-6 py-2.5 text-sm font-bold transition-all duration-300 rounded-full flex items-center gap-2 group",
                    isActive
                        ? (theme === 'dark' ? "text-white bg-white/10" : "text-black bg-black/5")
                        : (theme === 'dark' ? "text-white/70 hover:text-white" : "text-black/70 hover:text-black")
                )}
            >
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
                <span className="relative z-10 flex items-center gap-2">
                    {isActive && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex items-center justify-center"
                        >
                            <motion.span 
                                animate={{ opacity: [1, 0.4, 1], scale: [1, 1.3, 1] }}
                                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                className="w-1.5 h-1.5 rounded-full bg-[#D1FF4D] shadow-[0_0_8px_rgba(209,255,77,0.6)]"
                            />
                        </motion.div>
                    )}
                    {aboutItem.label}
                </span>
                <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10"
                >
                    <ChevronDown className="w-4 h-4 opacity-50" />
                </motion.div>
            </motion.button>

            {/* Elastic Glass Ribbon (Dock Style) */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        onMouseMove={(e) => mouseX.set(e.clientX)}
                        onMouseLeave={() => {
                            mouseX.set(Infinity);
                            setIsExpanded(false);
                        }}
                        initial={{ opacity: 0, y: -20, scale: 0.95, x: "-50%" }}
                        animate={{ opacity: 1, y: 15, scale: 1, x: "-50%" }}
                        exit={{ opacity: 0, y: -10, scale: 0.95, x: "-50%" }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-full left-1/2 mt-2 z-[100] pointer-events-auto"
                    >
                        <motion.div
                            className={cn(
                                "relative px-4 py-3 rounded-[2.5rem] border shadow-2xl flex items-end gap-1 backdrop-blur-3xl transition-all duration-500 min-h-[100px]",
                                theme === 'dark'
                                    ? "bg-[#0a0a0a]/60 border-white/10 shadow-black/80"
                                    : "bg-white/80 border-black/10 shadow-black/5"
                            )}
                        >
                            {/* Visual Noise/Grain effect could go here */}

                            {aboutItem.links.map((link, idx) => (
                                <DockIcon
                                    key={link.href}
                                    link={link}
                                    mouseX={mouseX}
                                    index={idx}
                                    iconMap={iconMap}
                                    setIsExpanded={setIsExpanded}
                                    theme={theme}
                                />
                            ))}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
