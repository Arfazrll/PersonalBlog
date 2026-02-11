"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function ManifestoHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <section ref={containerRef} className="relative h-[150vh] bg-background dark:bg-black text-foreground" style={{ backgroundColor: 'var(--background-override, "")' }}>
            {/* Force Pitch Black in Dark Mode via element style if needed, or rely on dark:bg-black class which is #000 */}
            <style jsx>{`
                :global(.dark) section.relative {
                    background-color: #000000 !important;
                }
            `}</style>

            <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center">

                {/* Background Noise/Grain for Cinema Feel - Hidden in Dark Mode for Pitch Black */}
                <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-0 pointer-events-none bg-[url('/noise.svg')]" />

                <motion.div style={{ y, opacity }} className="relative z-10 px-4 md:px-12 max-w-7xl mx-auto text-center">

                    {/* The Narrative (Kinetic Typography) */}
                    <div className="flex flex-col gap-2 md:gap-6">
                        <div className="overflow-hidden">
                            <motion.h1
                                initial={{ y: 100 }}
                                animate={{ y: 0 }}
                                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                                className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8]"
                            >
                                <span className="font-serif italic font-light opacity-80 text-muted-foreground">The</span> Code
                            </motion.h1>
                        </div>

                        <div className="flex items-center justify-center gap-4 md:gap-8 overflow-hidden">
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
                                className="h-px bg-foreground/30 w-12 md:w-32"
                            />
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 0.8 }}
                                className="font-mono text-xs md:text-sm uppercase tracking-widest text-muted-foreground"
                            >
                                Is merely a vessel for
                            </motion.p>
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
                                className="h-px bg-foreground/30 w-12 md:w-32"
                            />
                        </div>

                        <div className="overflow-hidden">
                            <motion.h1
                                initial={{ y: -100 }}
                                animate={{ y: 0 }}
                                transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                                className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8]"
                            >
                                Human <span className="font-serif italic font-light text-primary">Emotion.</span>
                            </motion.h1>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.2 }}
                        className="mt-12 md:mt-24 max-w-xl mx-auto"
                    >
                        <p className="text-lg md:text-xl font-serif text-muted-foreground leading-relaxed">
                            "We build systems not just to process data, but to feel something.
                            This archive is a collection of moments where logic met beauty."
                        </p>
                    </motion.div>

                </motion.div>

                {/* Scroll Prompt */}
                <motion.div
                    style={{ opacity }}
                    className="absolute bottom-12 flex flex-col items-center gap-4 z-10"
                >
                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">To Begin</span>
                    <ArrowDown className="w-5 h-5 text-foreground animate-bounce" />
                </motion.div>

            </div>

        </section>
    );
}
