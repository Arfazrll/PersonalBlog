"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from "@/lib/utils";
import { portfolioData } from "@/data/portfolio";
import { ArrowUpRight } from "lucide-react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Gallery assets for background randomization
const GALLERY_IMAGES = [
    '/gallery/Foto Utama.jpeg',
    '/gallery/FotoSC1.jpeg',
    '/gallery/FotoSC2.jpeg',
    '/gallery/FotoSC3.jpeg',
    '/gallery/FotoSC4.jpeg',
    '/gallery/FotoSC5.jpeg',
    '/gallery/academicaffairsdivision1.jpg',
    '/gallery/computernetworkpracticumassistant2.jpg',
    '/gallery/dataentryassistant1.jpg',
    '/gallery/delegateaiesecfutureleaders20241.jpg',
    '/gallery/environmentalhygieneteam1.jpg',
    '/gallery/environmentalhygieneteam2.jpg',
    '/gallery/logisticsoperatorcampusexpo20242.jpg',
    '/gallery/researchassistant1.jpg',
    '/gallery/researchassistant2.jpg',
];

export const NavigationShortcuts = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredImage, setHoveredImage] = useState<string | null>(null);
    const [itemImageMap, setItemImageMap] = useState<Record<string, string>>({});
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { amount: 0.05 });

    // INNOVATIVE: Scroll-linked opacity to physically block leaks
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // WIDENED RANGE: Background is visible for much longer (10% to 90% of viewport presence)
    const backgroundOpacity = useTransform(
        scrollYProgress,
        [0, 0.1, 0.9, 1],
        [0, 0.15, 0.15, 0]
    );

    const backgroundScale = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        [1.05, 1, 1.05]
    );
    // Randomize images on mount
    useEffect(() => {
        const shuffled = [...GALLERY_IMAGES].sort(() => Math.random() - 0.5);
        const map: Record<string, string> = {};

        // Items list for mapping
        const allItemIds = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        allItemIds.forEach((id, index) => {
            map[id] = shuffled[index % shuffled.length];
        });

        setItemImageMap(map);
    }, []);

    // REFRESH: Synchronize ScrollTrigger with layout shifts (Index Open/Close)
    useEffect(() => {
        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 850); // Matches duration + small buffer
        return () => clearTimeout(timer);
    }, [isOpen]);

    const categories = [
        {
            title: "Volume I: Identity",
            items: [
                { id: '01', title: 'About Me', href: '/#about' },
                { id: '02', title: 'Resume', href: portfolioData.personal.resumeUrl, external: true },
                { id: '03', title: 'Contact', href: '/contact' },
            ]
        },
        {
            title: "Volume II: Professional Sequence",
            items: [
                { id: '04', title: 'Experience', href: '/experience' },
                { id: '05', title: 'Education', href: '/experience' },
                { id: '06', title: 'Projects', href: '/projects' },
                { id: '07', title: 'Certifications', href: '/achievements' },
            ]
        },
        {
            title: "Volume III: Competency Matrix",
            items: [
                { id: '08', title: 'Hard Skills', href: '/skills#hard-skills' },
                { id: '09', title: 'Soft Skills', href: '/skills#soft-skills' },
                { id: '10', title: 'Tools & Tech', href: '/skills#tools' },
            ]
        },
        {
            title: "Volume IV: Creative Output",
            items: [
                { id: '11', title: 'Blog', href: '/blog' },
                { id: '12', title: 'Gallery', href: '/gallery' },
            ]
        }
    ];

    // INNOVATIVE: Global Bounds Tracker (STABILIZED)
    const handleMouseLeave = () => setHoveredImage(null);

    return (
        <div
            ref={containerRef}
            className={cn(
                "w-full max-w-full px-0 relative flex flex-col justify-center pt-0 pb-4 transition-all duration-700",
                isOpen ? "min-h-screen" : "min-h-[15vh]"
            )}
            onMouseLeave={handleMouseLeave}
        >
            {/*
                Innovative Cross-Fade Background
                - No mode="wait" means images blend into each other.
                - scroll-linked opacity handles the Hero/Footer leak automatically.
            */}
            <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
                {/* Mobile/Fallback Subtle Background */}
                <div className="absolute inset-0 bg-background lg:hidden opacity-50 dark:opacity-20" />
                <div className="absolute inset-0 lg:hidden pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-background" />
                </div>

                <AnimatePresence>
                    {hoveredImage && isOpen && (
                        <motion.div
                            key={hoveredImage}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{
                                scale: backgroundScale,
                                // Combine with fixed opacity logic
                                // Note: We use style for scroll progress but Framer's animate for hover
                            }}
                            className="absolute inset-0 w-full h-full"
                        >
                            <motion.div
                                style={{ opacity: backgroundOpacity }}
                                className="absolute inset-0 w-full h-full"
                            >
                                <Image
                                    src={hoveredImage}
                                    alt="Section Preview"
                                    fill
                                    className="object-cover grayscale contrast-125 brightness-75 scale-110"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

                                {/* Scan Line Overlay */}
                                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
                                    <div className="w-full h-1 bg-primary/40 absolute top-[-5%] animate-[scan_4s_linear_infinite]" />
                                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
                                </div>

                                {/* Preview Metadata */}
                                <div className="absolute bottom-12 right-12 text-right hidden md:block">
                                    <div className="text-[10px] font-mono tracking-[0.2em] text-primary/60 uppercase mb-1">Preview Mode</div>
                                    <div className="text-[10px] font-mono tracking-[0.1em] text-primary/40">ID_REF: {hoveredImage.split('/').pop()}</div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Toggle Button Container - Perfected Corner Alignment (Absolute Corner) */}
            <div className="relative z-[100] flex items-center justify-start py-8 -mt-40 mb-10 px-10">
                <div className="flex items-center gap-0">
                    {/* ULTIMATE MINIMALIST CIRCULAR TOGGLE - Force White for Contrast, Sized to be 'just right' */}
                    <motion.button
                        onClick={() => setIsOpen(!isOpen)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-white dark:bg-white text-black h-14 w-14 md:h-18 md:w-18 flex items-center justify-center rounded-full shadow-[0_0_50px_rgba(255,255,255,0.3)] group transition-all duration-500 overflow-hidden relative border-none"
                    >
                        <motion.div
                            animate={{
                                rotate: isOpen ? 135 : 0,
                            }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            className="relative z-10"
                        >
                            <ArrowUpRight className="w-7 h-7 md:w-9 md:h-9 text-black" />
                        </motion.div>
                        {/* Signature Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </motion.button>
                </div>
            </div>

            {/* Expanding List Section (Original Downward Logic) */}
            <AnimatePresence mode="wait">
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="pt-8 px-8 md:px-16 lg:px-24 grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-16">
                            {categories.map((category, catIdx) => (
                                <motion.div
                                    key={category.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: catIdx * 0.1 }}
                                >
                                    <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-4">
                                        <motion.span
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: 1 }}
                                            transition={{ duration: 1, delay: catIdx * 0.2 }}
                                            className="w-8 h-[1px] bg-primary origin-left"
                                        />
                                        {category.title}
                                    </h3>

                                    <div className="space-y-0">
                                        {category.items.map((item, idx) => (
                                            <Link
                                                key={item.id}
                                                href={item.href || '#'}
                                                target={item.external ? "_blank" : undefined}
                                                className="group block relative"
                                                onClick={() => setIsOpen(false)}
                                                onMouseEnter={() => setHoveredImage(itemImageMap[item.id])}
                                            >
                                                <motion.div
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.5, delay: (catIdx * 0.2) + (idx * 0.1) }}
                                                    className="flex items-baseline py-4 border-b border-black/[0.05] dark:border-white/[0.05] group-hover:border-primary/50 transition-colors duration-500"
                                                >
                                                    <span className="font-mono text-xs md:text-sm text-neutral-400 group-hover:text-primary transition-all duration-500 w-12 shrink-0">
                                                        {item.id}_
                                                    </span>
                                                    <div className="flex-1 flex items-center justify-between">
                                                        <span className="text-xl md:text-3xl font-medium text-neutral-800 dark:text-neutral-200 group-hover:text-black dark:group-hover:text-white transition-all duration-500 group-hover:tracking-[0.1em] group-hover:italic">
                                                            {item.title}
                                                        </span>
                                                        <ArrowUpRight className="w-5 h-5 text-neutral-400 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-primary" />
                                                    </div>
                                                </motion.div>
                                            </Link>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
