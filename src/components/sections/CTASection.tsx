"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useTranslations } from 'next-intl';
import { Mail, Layers } from "lucide-react";
import { InfiniteRibbon } from "@/components/ui/infinite-ribbon";

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
        <section ref={sectionRef} className="relative py-32 lg:py-40 overflow-hidden dark:bg-black">
            {/* Infinite Ribbons - Moved from Stats Section */}
            <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden pointer-events-none mb-20">
                <InfiniteRibbon rotation={6} className="z-10 py-5 border-y border-blue-100 dark:border-zinc-800 shadow-xl" background="bg-white dark:bg-zinc-800" textColor="text-blue-600 dark:text-zinc-400 font-mono tracking-tighter">
                    Next.js • TypeScript • Tailwind • React • Node.js • Three.js •
                </InfiniteRibbon>
                <InfiniteRibbon rotation={-6} reverse={true} className="z-20 py-5 border-y border-white/20 dark:border-zinc-700 shadow-2xl" background="bg-blue-600 dark:bg-black" textColor="text-white dark:text-white font-bold tracking-widest uppercase">
                    Creative Developer • UI/UX Design • Full Stack Engineering • System Architecture •
                </InfiniteRibbon>
            </div>

            {/* Animated background */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-black dark:via-black/40 dark:to-black"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 8, repeat: Infinity }}
            />

            <div className="container-creative relative z-10 text-center cta-content">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-12">
                    {t('title')}
                    <br />
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={words[currentWord]}
                            initial={{ y: 60, opacity: 0, rotateX: -60 }}
                            animate={{ y: 0, opacity: 1, rotateX: 0 }}
                            exit={{ y: -60, opacity: 0, rotateX: 60 }}
                            transition={{ duration: 0.5 }}
                            className="inline-block text-gradient"
                        >
                            {words[currentWord]}
                        </motion.span>
                    </AnimatePresence>
                    {' '}{t('together')}
                </h2>

                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-16">
                    {t('subtitle')}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link href="/contact" className="btn-creative text-lg px-10 py-5 inline-flex items-center gap-3">
                            <Mail className="w-5 h-5" />
                            <span>{t('start')}</span>
                        </Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link href="/projects" className="btn-outline-creative text-lg px-10 py-5 inline-flex items-center gap-3">
                            <Layers className="w-5 h-5" />
                            <span>{t('work')}</span>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
