'use client';

import React, { ReactElement, ReactNode, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SiGithub, SiLinkedin, SiX, SiInstagram, SiSpotify, SiDiscord } from 'react-icons/si';
import { MessageCircle, Mail, ArrowUpRight } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { portfolioData } from '@/data/portfolio';

// --- MAIN WRAPPER COMPONENT ---
export const ProjectContact = ({ isLowPowerMode }: { isLowPowerMode?: boolean }) => {
    return (
        <section className="relative z-10 w-full bg-transparent px-4 py-20 md:py-24 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-32 overflow-hidden">

            {/* Ambient Background Glow - Smoother */}
            {!isLowPowerMode && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-transparent rounded-full blur-[180px] pointer-events-none" />
            )}

            <div className="relative z-10">
                <BlockInTextCard
                    tag="/ Let's Connect"
                    isLowPowerMode={isLowPowerMode}
                    text={
                        <>
                            <strong>Ready to build something extra ordinary?</strong> wether it's AI, Blockchain, or a wild 3D web experience. I'm always open to discussing new ideas.
                        </>
                    }
                    examples={[
                        "Looking for a Software & AI Engineer?",
                        "Need an AI solution for your business?",
                        "Just want to say hi?",
                    ]}
                />
            </div>

            <div className="relative z-10">
                <LogoRolodex
                    isLowPowerMode={isLowPowerMode}
                    items={[
                        // GitHub - White/Black
                        <LogoItem key={1} className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900">
                            <SiGithub />
                        </LogoItem>,
                        // LinkedIn - Blue
                        <LogoItem key={2} className="bg-blue-600 text-white">
                            <SiLinkedin />
                        </LogoItem>,
                        // Twitter/X - Black/White
                        <LogoItem key={3} className="bg-black text-white">
                            <SiX />
                        </LogoItem>,
                        // Instagram - Gradient-ish (Pink/Orange)
                        <LogoItem key={4} className="bg-gradient-to-br from-purple-500 to-orange-500 text-white">
                            <SiInstagram />
                        </LogoItem>,
                        // Spotify - Green
                        <LogoItem key={5} className="bg-[#1DB954] text-white">
                            <SiSpotify />
                        </LogoItem>
                    ]}
                />
            </div>
        </section>
    );
};

// --- LEFT TEXT CARD COMPONENT ---
const BlockInTextCard = ({
    tag,
    text,
    examples,
    isLowPowerMode,
}: {
    tag: string;
    text: ReactNode;
    examples: string[];
    isLowPowerMode?: boolean;
}) => {
    return (
        <div className="w-full max-w-2xl space-y-10 border-none">
            <div>
                <p className="mb-4 text-base font-mono text-muted-foreground uppercase tracking-wider">{tag}</p>
            </div>

            <div className="max-w-2xl text-3xl md:text-5xl leading-tight text-foreground font-light">
                {text}
            </div>

            <div className="w-full border-none">
                <Typewrite examples={examples} isLowPowerMode={isLowPowerMode} />

                <div className="pt-6"> {/* Replaced border-div with padding */}
                    <a
                        href={`mailto:${portfolioData.personal.email}`}
                        className="w-full group relative flex items-center justify-between py-6 transition-all hover:px-2 border-none ring-0 outline-none"
                    >
                        <span className="text-xl md:text-2xl font-black uppercase tracking-tighter text-foreground group-hover:text-emerald-500 transition-colors">
                            Send Message
                        </span>
                        <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-foreground text-background transition-transform duration-300 group-hover:-rotate-45 group-hover:bg-emerald-500 group-hover:text-white">
                            <ArrowUpRight className="h-5 w-5" />
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
};

// --- TYPEWRITER COMPONENT ---
const LETTER_DELAY = 0.025;
const BOX_FADE_DURATION = 0.125;
const FADE_DELAY = 5;
const MAIN_FADE_DURATION = 0.25;
const SWAP_DELAY_IN_MS = 5500;

const Typewrite = ({ examples, isLowPowerMode }: { examples: string[]; isLowPowerMode?: boolean }) => {
    const [exampleIndex, setExampleIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setExampleIndex((pv) => (pv + 1) % examples.length);
        }, SWAP_DELAY_IN_MS);

        return () => clearInterval(intervalId);
    }, [examples]);

    return (
        <div className="flex items-start gap-4">
            <span className={twMerge("mt-1.5 shrink-0 size-2 rounded-full bg-emerald-500", !isLowPowerMode && "animate-pulse")} />
            <div className="flex-1">
                <p className="text-xs font-mono text-muted-foreground mb-2 uppercase tracking-widest">
                    DISCUSSION TOPIC:
                </p>
                <div className="min-h-[3rem] text-lg font-medium text-foreground">
                    {isLowPowerMode ? examples[exampleIndex] : examples[exampleIndex].split("").map((l, i) => (
                        <motion.span
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 0 }}
                            transition={{
                                delay: FADE_DELAY,
                                duration: MAIN_FADE_DURATION,
                                ease: "easeInOut",
                            }}
                            key={`${exampleIndex}-${i}`}
                            className="relative"
                        >
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: i * LETTER_DELAY, duration: 0 }}
                            >
                                {l}
                            </motion.span>
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{
                                    delay: i * LETTER_DELAY,
                                    times: [0, 0.1, 1],
                                    duration: BOX_FADE_DURATION,
                                    ease: "easeInOut",
                                }}
                                className="absolute bottom-[3px] left-[1px] right-0 top-[3px] bg-emerald-500/50"
                            />
                        </motion.span>
                    ))}
                </div>
            </div>
        </div>
    );
};


// --- ORIGAMI LOGO ROLODEX ---
const DELAY_IN_MS = 2500;
const TRANSITION_DURATION_IN_SECS = 1.5;

const LogoRolodex = ({ items, isLowPowerMode }: { items: ReactElement[]; isLowPowerMode?: boolean }) => {
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setIndex((pv) => pv + 1);
        }, isLowPowerMode ? DELAY_IN_MS * 1.5 : DELAY_IN_MS);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    return (
        <div
            style={{
                transformStyle: "preserve-3d",
            }}
            className="relative z-0 h-52 w-72 md:h-72 md:w-[28rem] shrink-0 rounded-3xl border-none bg-transparent shadow-none"
        >
            <AnimatePresence mode="sync">
                <motion.div
                    style={{
                        y: "-50%",
                        x: "-50%",
                        clipPath: isLowPowerMode ? "none" : "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
                        zIndex: -index,
                        backfaceVisibility: "hidden",
                    }}
                    key={index}
                    transition={{
                        duration: isLowPowerMode ? 0.5 : TRANSITION_DURATION_IN_SECS,
                        ease: "easeInOut",
                    }}
                    initial={isLowPowerMode ? { opacity: 0 } : { rotateX: "0deg" }}
                    animate={isLowPowerMode ? { opacity: 1 } : { rotateX: "0deg" }}
                    exit={isLowPowerMode ? { opacity: 0 } : { rotateX: "-180deg" }}
                    className="absolute left-1/2 top-1/2"
                >
                    {items[index % items.length]}
                </motion.div>
                {!isLowPowerMode && (
                    <motion.div
                        style={{
                            y: "-50%",
                            x: "-50%",
                            clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
                            zIndex: index,
                            backfaceVisibility: "hidden",
                        }}
                        key={(index + 1) * 2}
                        initial={{ rotateX: "180deg" }}
                        animate={{ rotateX: "0deg" }}
                        exit={{ rotateX: "0deg" }}
                        transition={{
                            duration: TRANSITION_DURATION_IN_SECS,
                            ease: "easeInOut",
                        }}
                        className="absolute left-1/2 top-1/2"
                    >
                        {items[index % items.length]}
                    </motion.div>
                )}
            </AnimatePresence>


        </div>
    );
};

const LogoItem = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div
            className={twMerge(
                "grid h-44 w-60 md:h-60 md:w-[26rem] place-content-center rounded-2xl text-7xl md:text-8xl",
                className
            )}
        >
            {children}
        </div>
    );
};
