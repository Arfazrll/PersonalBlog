"use client";

import React, { useRef } from "react";
import { motion, useTransform, useSpring, easeOut, easeInOut, circOut } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { portfolioData } from "@/data/portfolio";
import { InfiniteMarquee } from "@/components/ui/InfiniteMarquee";
import { BrandScroller, BrandScrollerReverse } from "@/components/ui/brand-scroller";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import MagneticEffect from "@/components/ui/MagneticEffect";

interface IdentitySequenceProps {
    scrollYProgress: any; // Parent scroll progress [0, 1]
    isVisible: boolean;
}

export const IdentitySequence = ({ scrollYProgress, isVisible }: IdentitySequenceProps) => {
    const t = useTranslations("about");
    const [isHovered, setIsHovered] = React.useState(false);

    // Local progress with refined, responsive physics
    const localProgress = useTransform(scrollYProgress, [0.4, 1], [0, 1]);
    const smoothLocalProgress = useSpring(localProgress, {
        stiffness: 100,
        damping: 30,
        mass: 1,
        restDelta: 0.001
    });

    // 1. Card Transformation (Entrance & Scaling)
    const cardScale = useTransform(smoothLocalProgress, [0, 0.4], [0.8, 1], { ease: easeInOut });
    const cardY = useTransform(smoothLocalProgress, [0, 0.4], ["60vh", "0vh"], { ease: easeInOut });
    const cardBorderRadius = useTransform(smoothLocalProgress, [0.1, 0.4], ["60px", "0px"], { ease: easeInOut });

    // 2. Internal Content Scroll
    const contentY = useTransform(smoothLocalProgress, [0.35, 1], ["0%", "-70%"], { ease: easeInOut });

    // 3. Elements specific animations
    const phase0Opacity = useTransform(smoothLocalProgress, [0, 0.15], [1, 0]);
    const cardContentOpacity = useTransform(smoothLocalProgress, [0.1, 0.3], [0, 1]);
    const photoScale = useTransform(smoothLocalProgress, [0.3, 0.8], [1.15, 1], { ease: easeInOut });
    const textOpacity = useTransform(smoothLocalProgress, [0.85, 1], [0, 1]);

    // 4. Background Color Transition (Smoothing the exit)
    const cardBg = useTransform(
        smoothLocalProgress, 
        [0.8, 1], 
        ["#EBEBEB", "#FFFFFF"]
    );
    const cardBgDark = useTransform(
        smoothLocalProgress, 
        [0.8, 1], 
        ["#18181b", "#000000"]
    );

    const { resolvedTheme } = useTheme();
    const cardBgValue = resolvedTheme === 'dark' ? cardBgDark : cardBg;

    const marqueeItems = [
        <span key="1" className="text-[10rem] md:text-[16rem] font-black uppercase tracking-tighter mx-12 text-black dark:text-white leading-none">
            {portfolioData.personal.title}
        </span>,
        <div key="icon" className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-[#D1FF4D] flex items-center justify-center mx-12">
            <svg viewBox="0 0 100 100" className="w-20 h-20 md:w-32 md:h-32 fill-black dark:fill-zinc-900">
                <path d="M50 0 C60 30 100 40 100 50 C100 60 60 70 50 100 C40 70 0 60 0 50 C0 40 40 30 50 0" />
            </svg>
        </div>
    ];

    return (
        <div className="relative w-screen h-full flex flex-col items-center justify-center overflow-hidden bg-background dark:bg-black">
            {/* Phase 0: The Lead-in UI (Visible before card scales) */}
            <motion.div
                style={{ opacity: phase0Opacity }}
                className="absolute inset-0 z-0 flex flex-col items-center justify-center pointer-events-none -translate-y-12"
            >
                {/* Center Unified Action - Magnetic Group */}
                <div className="mb-16 pointer-events-auto">
                    <MagneticEffect>
                        <div className="group flex items-center gap-1 cursor-pointer">
                            <div className="relative px-10 py-5 rounded-full bg-[#D1FF4D] overflow-hidden transition-all duration-500">
                                <div className="absolute inset-0 bg-black dark:bg-white -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                                <div className="relative z-10 h-7 overflow-hidden">
                                    <div className="flex flex-col transition-transform duration-500 ease-out group-hover:-translate-y-1/2">
                                        <span className="text-black group-hover:text-white dark:group-hover:text-black font-bold text-xl leading-7 transition-colors duration-500">
                                            {t("leadIn.aboutMe")}
                                        </span>
                                        <span className="text-black group-hover:text-white dark:group-hover:text-black font-bold text-xl leading-7 transition-colors duration-500">
                                            {t("leadIn.aboutMe")}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="relative w-16 h-16 rounded-full bg-[#D1FF4D] overflow-hidden flex items-center justify-center transition-all duration-500">
                                <div className="absolute inset-0 bg-black dark:bg-white -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                                <div className="relative z-10 h-8 overflow-hidden">
                                    <div className="flex flex-col transition-transform duration-500 ease-out group-hover:-translate-y-1/2">
                                        <ArrowUpRight className="w-8 h-8 text-black group-hover:text-white dark:group-hover:text-black transition-colors duration-500" />
                                        <ArrowUpRight className="w-8 h-8 text-black group-hover:text-white dark:group-hover:text-black transition-colors duration-500" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </MagneticEffect>
                </div>

                {/* Unified Bottom Labels Layer */}
                <div className="w-full max-w-[1200px] flex items-center justify-between px-12">
                    <div className="flex items-center gap-3 text-zinc-500 dark:text-white/60 text-sm font-medium tracking-tight">
                        <motion.span
                            animate={{ y: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-4 h-4 flex items-center justify-center"
                        >
                            ↓
                        </motion.span>
                        <span>{t("leadIn.scroll")}</span>
                    </div>

                    <div className="text-zinc-500 dark:text-white/60 text-sm font-medium tracking-tight">
                        {t("leadIn.shortStory")}
                    </div>
                </div>
            </motion.div>

            {/* The Main Card Container */}
            <motion.div
                style={{
                    scale: cardScale,
                    y: cardY,
                    borderRadius: cardBorderRadius,
                    backgroundColor: cardBgValue,
                    willChange: "transform, background-color",
                }}
                className="relative w-full h-full flex flex-col overflow-hidden origin-bottom z-10"
            >
                {/* Unified Scrolling Content Wrapper */}
                <motion.div
                    style={{ y: contentY }}
                    className="relative w-full flex flex-col items-center"
                >
                    {/* Phase 1: Marquee Header (Top of the long card) */}
                    <div className="w-full h-screen flex items-center justify-center flex-shrink-0">
                        <motion.div style={{ opacity: cardContentOpacity }} className="w-full">
                            <InfiniteMarquee
                                items={marqueeItems}
                                speed={18}
                                className="w-full"
                                itemClassName="py-12"
                            />
                        </motion.div>
                    </div>

                    {/* Phase 2: The Large Portrait (The "Explore" area) */}
                    <div className="relative w-full h-[100vh] flex flex-col items-center flex-shrink-0 px-4 md:px-10 lg:px-20">
                        <div
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            className="relative w-full h-full max-w-[1500px] overflow-hidden group/photo cursor-pointer"
                        >
                            <motion.div
                                style={{
                                    scale: photoScale,
                                    clipPath: 'inset(40px 40px 40px 40px)', // Aggressive 4-sided clipping
                                    zIndex: 0
                                }}
                                animate={{
                                    filter: isHovered ? "grayscale(0%) contrast(1)" : "grayscale(100%) contrast(1.1)",
                                }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="relative w-full h-full will-change-transform"
                            >
                                <div
                                    className="relative w-[calc(100%+100px)] h-[calc(100%+100px)] -top-[50px] -left-[50px]"
                                    style={{ transform: 'translateZ(0)' }}
                                >
                                    <Image
                                        src={portfolioData.personal.avatar}
                                        alt="Profile"
                                        fill
                                        className="object-cover object-bottom"
                                        priority
                                    />
                                </div>
                            </motion.div>

                            {/* The "Vault" Frame - A solid 4-sided boundary that seals all corners */}
                            <div className="absolute inset-0 pointer-events-none z-50">
                                {/* Solid 25px Frame on all 4 sides */}
                                <div className="absolute top-0 left-0 right-0 h-[25px] bg-[#EBEBEB] dark:bg-zinc-900" />
                                <div className="absolute bottom-0 left-0 right-0 h-[25px] bg-[#EBEBEB] dark:bg-zinc-900" />
                                <div className="absolute top-0 bottom-0 left-0 w-[25px] bg-[#EBEBEB] dark:bg-zinc-900" />
                                <div className="absolute top-0 bottom-0 right-0 w-[25px] bg-[#EBEBEB] dark:bg-zinc-900" />

                                {/* Inner Gradients for depth */}
                                <div className="absolute top-[25px] left-0 right-0 h-40 bg-gradient-to-b from-[#EBEBEB] dark:from-zinc-900 to-transparent" />
                                <div className="absolute bottom-[25px] left-0 right-0 h-40 bg-gradient-to-t from-[#EBEBEB] dark:from-zinc-900 to-transparent" />
                            </div>

                            <div className="absolute inset-0 bg-black/5 pointer-events-none z-0" />


                        </div>
                    </div>

                    {/* Phase 3: Final Layout Text */}
                    <motion.div
                        style={{ opacity: textOpacity }}
                        className="w-full max-w-[1700px] mx-auto px-8 md:px-16 lg:px-24 py-12 md:pb-12 flex-shrink-0"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
                            {/* Header Left */}
                            <div className="md:col-span-7">
                                <h3
                                    className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-snug text-black dark:text-white"
                                    dangerouslySetInnerHTML={{ __html: t.raw("profile.title") }}
                                />
                            </div>

                            {/* Paragraph Right */}
                            <div className="md:col-span-5 pt-1">
                                <p className="text-[13px] md:text-[15px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
                                    {t("profile.narrative")} {t("profile.narrative2")}
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Phase 4: Tech Stack & Tools Scrollers */}
                    <motion.div 
                        style={{ opacity: textOpacity }}
                        className="w-full max-w-[1700px] mx-auto py-20 flex flex-col gap-8 flex-shrink-0"
                    >
                        <div className="px-8 md:px-16 lg:px-24 mb-6">
                            <h4 className="text-lg md:text-xl uppercase tracking-[0.15em] font-bold text-zinc-500 dark:text-zinc-400">
                                Tech Stack & Ecosystem
                            </h4>
                        </div>
                        <BrandScroller />
                        <BrandScrollerReverse />
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
};
