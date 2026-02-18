"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from "@/lib/utils";
import { portfolioData } from "@/data/portfolio";
import { ArrowUpRight } from "lucide-react";

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
            className="w-full max-w-7xl mx-auto px-4 relative min-h-screen flex flex-col justify-center py-20"
            onMouseLeave={handleMouseLeave}
        >
            {/*
                Innovative Cross-Fade Background
                - No mode="wait" means images blend into each other.
                - scroll-linked opacity handles the Hero/Footer leak automatically.
            */}
            <div className="fixed inset-0 z-[-1] pointer-events-none hidden lg:block overflow-hidden">
                <AnimatePresence>
                    {hoveredImage && (
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

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-left mb-16 relative z-10 border-b border-neutral-200 dark:border-neutral-800 pb-8"
            >
                <div className="flex items-end justify-between">
                    <div>
                        <h2 className="text-4xl md:text-7xl font-black text-neutral-900 dark:text-white mb-2 tracking-tighter">
                            INDEX
                        </h2>
                        <p className="text-neutral-500 dark:text-neutral-400 font-mono text-sm tracking-widest uppercase">
                            Table of Contents / Navigation
                        </p>
                    </div>
                    <div className="hidden md:block text-right">
                        <p className="text-xs font-mono text-neutral-400">
                            LATEST UPDATE<br />
                            {new Date().getFullYear()}
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* List Layout */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-16">
                {categories.map((category, catIdx) => (
                    <motion.div
                        key={category.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: catIdx * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-4">
                            <motion.span
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                transition={{ duration: 1, delay: catIdx * 0.2 }}
                                viewport={{ once: true }}
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
                                    onMouseEnter={() => {
                                        setHoveredImage(itemImageMap[item.id]);
                                    }}
                                >
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: (catIdx * 0.2) + (idx * 0.1) }}
                                        viewport={{ once: true }}
                                        className="flex items-baseline py-4 border-b border-neutral-200 dark:border-neutral-800 group-hover:border-primary/50 transition-colors duration-500"
                                    >
                                        <span className="font-mono text-xs md:text-sm text-neutral-400 group-hover:text-primary transition-all duration-500 w-12 shrink-0">
                                            {item.id}_
                                        </span>
                                        <div className="flex-1 flex items-center justify-between">
                                            <span className="text-xl md:text-3xl font-medium text-neutral-800 dark:text-neutral-200 group-hover:text-black dark:group-hover:text-white transition-all duration-500 group-hover:tracking-[0.1em] group-hover:italic">
                                                {item.title}
                                            </span>
                                            <div className="flex items-center gap-4">
                                                <span className="hidden md:block text-[10px] font-mono text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity duration-700 uppercase tracking-widest whitespace-nowrap">
                                                    More Details
                                                </span>
                                                <ArrowUpRight className="w-5 h-5 text-neutral-400 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-primary" />
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Mobile Image Preview Logic (Optional or Simplified) */}
            <div className="mt-20 text-center lg:hidden">
                <p className="text-xs text-neutral-500 font-mono">
                    Select a section to navigate
                </p>
            </div>
        </div>
    );
};
