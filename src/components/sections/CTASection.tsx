"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useTranslations } from 'next-intl';
import { Mail, Layers } from "lucide-react";
import { InfiniteRibbon } from "@/components/ui/infinite-ribbon";
import { MagneticButton } from "@/components/ui/magnetic-button";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function CTASection() {
    const sectionRef = useRef<HTMLElement>(null);
    const t = useTranslations('ctaSection');
    const words = [t('words.amazing'), t('words.innovative'), t('words.intelligent'), t('words.creative')];
    const [currentWord, setCurrentWord] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWord((prev) => (prev + 1) % words.length);
        }, 2500);
        return () => clearInterval(interval);
    }, [words.length]);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo('.cta-content',
                { y: 80, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative py-12 lg:py-16 overflow-hidden bg-background">
            {/* Infinite Ribbons - Moved from Stats Section */}
            <div className="relative flex h-[300px] w-full items-center justify-center pointer-events-none mb-10">
                <InfiniteRibbon rotation={6} baseVelocity={1} className="z-10 py-5 border-y border-blue-200 dark:border-white/5 shadow-xl" background="bg-white dark:bg-zinc-900" textColor="text-blue-700 dark:text-zinc-400 font-mono tracking-tighter">
                    {t('ribbon1')}
                </InfiniteRibbon>
                <InfiniteRibbon rotation={-6} reverse={true} baseVelocity={1.2} className="z-20 py-5 border-y border-white/40 dark:border-white/10 shadow-2xl" background="bg-blue-600 dark:bg-black" textColor="text-white font-bold tracking-widest uppercase">
                    {t('ribbon2')}
                </InfiniteRibbon>
            </div>



            <div className="max-w-[1600px] mx-auto relative z-10 px-6 md:px-12 lg:px-24 text-center cta-content mt-16">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-0">
                    {t('title')}
                    <br />
                    <span className="inline-grid place-items-center pb-4">
                        {/* Invisible longest word ensures the container NEVER changes width/height */}
                        <span className="col-start-1 row-start-1 invisible pointer-events-none text-gradient mx-2 pb-2">
                            {words.reduce((a, b) => a.length > b.length ? a : b, "")}
                        </span>
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={words[currentWord]}
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -30, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                className="col-start-1 row-start-1 inline-block text-gradient mx-2 pb-2"
                            >
                                {words[currentWord]}
                            </motion.span>
                        </AnimatePresence>
                    </span>
                    <span className="whitespace-nowrap">{t('together')}</span>
                </h2>

                <p className="text-xl text-muted-foreground max-w-4xl mx-auto mt-4 mb-10 text-center">
                    {t('subtitle').split('. ').map((sentence, i, arr) => (
                        <span key={i}>
                            {sentence}{i < arr.length - 1 ? '.' : ''}
                            {i < arr.length - 1 && <br className="hidden md:block" />}
                            {i < arr.length - 1 && " "}
                        </span>
                    ))}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <MagneticButton href="/contact" variant="primary" className="text-lg px-10 py-5">
                        <Mail className="w-5 h-5" />
                        <span>{t('start')}</span>
                    </MagneticButton>
                    <MagneticButton href="/resume" variant="outline" className="text-lg px-10 py-5">
                        <Layers className="w-5 h-5" />
                        <span>{t('work')}</span>
                    </MagneticButton>
                </div>
            </div>
        </section>
    );
}
