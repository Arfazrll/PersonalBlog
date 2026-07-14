'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Mail, ArrowUpRight } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { portfolioData } from '@/data/portfolio';
import { InteractiveRobotSpline } from '@/components/ui/interactive-3d-robot';
import Link from 'next/link';

// --- INLINE 3D FLIP COMPONENT ---
const Hover3DFlipText = ({ text }: { text: string }) => {
    return (
        <span className="relative inline-block cursor-default">
            {text.split(" ").map((word, wIdx) => (
                <motion.span key={wIdx} initial="initial" whileHover="hover" className="inline-block mr-[0.25em] whitespace-nowrap">
                    {word.split("").map((char, cIdx) => {
                        return (
                            <span key={cIdx} className="relative inline-block" style={{ perspective: 1000 }}>
                                <span className="invisible inline-block">{char}</span>
                                <motion.span
                                    variants={{
                                        initial: { rotateX: 0, rotateY: 0, rotateZ: 0, y: 0, scale: 1, opacity: 1 },
                                        hover: { 
                                            rotateX: 180, rotateY: 90, rotateZ: 45, y: -40, scale: 0.2, opacity: 0, 
                                            transition: { delay: cIdx * 0.02, type: "spring", damping: 15, stiffness: 300 } 
                                        }
                                    }}
                                    className="absolute inset-0 inline-block transition-colors"
                                    style={{ transformOrigin: "center" }}
                                >
                                    {char}
                                </motion.span>
                                <motion.span
                                    variants={{
                                        initial: { rotateX: -180, rotateY: -90, rotateZ: -45, y: 40, scale: 0.2, opacity: 0 },
                                        hover: { 
                                            rotateX: 0, rotateY: 0, rotateZ: 0, y: 0, scale: 1, opacity: 1, 
                                            transition: { delay: cIdx * 0.02, type: "spring", damping: 12, stiffness: 400, mass: 0.8 } 
                                        }
                                    }}
                                    className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500 inline-block drop-shadow-xl font-bold"
                                    style={{ transformOrigin: "center" }}
                                >
                                    {char}
                                </motion.span>
                            </span>
                        );
                    })}
                </motion.span>
            ))}
        </span>
    );
};

// --- MAIN WRAPPER COMPONENT ---
export const ProjectContact = ({ isLowPowerMode }: { isLowPowerMode?: boolean }) => {
    const ROBOT_SCENE_URL = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

    return (
        <section className="relative z-10 w-full bg-transparent px-6 md:px-12 py-20 md:py-32 overflow-hidden">

            {/* Ambient Background Glow - Smoother */}
            {!isLowPowerMode && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-transparent rounded-full blur-[180px] pointer-events-none" />
            )}

            <div className="max-w-[1536px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-20">
                <div className="relative z-10 w-full lg:w-1/2">
                    <BlockInTextCard
                        tag="/ Let's Connect"
                        isLowPowerMode={isLowPowerMode}
                        text={
                            <>
                                <strong><Hover3DFlipText text="Ready to build the extraordinary?" /></strong> <Hover3DFlipText text="From intelligent AI solutions to scalable software architectures, let's collaborate on your big idea." />
                            </>
                        }
                        examples={[
                            "Looking for a Software & AI Engineer?",
                            "Need an AI solution for your business?",
                            "Just want to say hi?",
                        ]}
                    />
                </div>

                <div className="relative z-10 w-full lg:w-1/2 flex justify-center lg:justify-end h-[400px] md:h-[500px]">
                    <div className="relative w-full h-full overflow-hidden flex items-center justify-center [mask-image:radial-gradient(circle_at_center,black_40%,transparent_75%)] md:[mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)] translate-x-6 lg:translate-x-12">
                        <div className="absolute inset-0 scale-[1.15] md:scale-110">
                            <InteractiveRobotSpline
                                scene={ROBOT_SCENE_URL}
                                className="w-full h-full"
                            />
                        </div>
                    </div>
                </div>
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
        <div className="w-full max-w-3xl space-y-12 border-none">
            <div>
                <p className="mb-4 text-base md:text-lg font-mono text-muted-foreground uppercase tracking-wider">{tag}</p>
            </div>

            <div className="max-w-2xl text-4xl lg:text-5xl leading-[1.2] lg:leading-[1.15] text-foreground font-medium tracking-tight">
                {text}
            </div>

            <div className="w-full border-none pt-4">
                <Typewrite examples={examples} isLowPowerMode={isLowPowerMode} />

                <div className="pt-8">
                    <Link
                        href="/contact"
                        className="group w-fit relative flex items-center gap-6 py-6 transition-all hover:px-2 border-none ring-0 outline-none"
                    >
                        <span className="relative text-2xl md:text-4xl font-bold uppercase tracking-wide text-foreground pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-foreground group-hover:after:w-full after:transition-all after:duration-300 after:ease-out">
                            Send Message
                        </span>
                        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-foreground text-background transition-all duration-300 ease-out group-hover:-rotate-45 group-hover:scale-110">
                            <ArrowUpRight className="h-6 w-6" />
                        </div>
                    </Link>
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
                                transition={{
                                    delay: i * LETTER_DELAY,
                                    duration: 0,
                                }}
                            >
                                {l}
                            </motion.span>
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0 }}
                                transition={{
                                    delay: i * LETTER_DELAY,
                                    duration: BOX_FADE_DURATION,
                                    ease: "easeOut",
                                }}
                                className="absolute bottom-[3px] left-[1px] right-0 top-[3px] bg-foreground"
                            />
                        </motion.span>
                    ))}
                </div>
            </div>
        </div>
    );
};
