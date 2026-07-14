'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsMobile } from "@/hooks/useIsMobile";

import { Sparkles, Mail, ArrowRight, ArrowDown } from 'lucide-react';
import { LoadingScreen } from '@/components/layout';
import { TextPressure } from '@/components/ui/TextPressure';
import { portfolioData } from '@/data/portfolio';
import { cn } from "@/lib/utils";
import { SocialCorner } from '@/components/layout/SocialCorner';
import { DeferredMount } from '@/components/ui/DeferredMount';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const Hyperspeed = dynamic(() => import('@/components/ui/Hyperspeed'), { ssr: false });
const { hyperspeedPresets } = require('@/components/ui/Hyperspeed');

const Scene3D = dynamic(() => import('@/components/three/Scene3D').then(mod => ({ default: mod.Scene3D })), {
    ssr: false,
    loading: () => null
});

import AboutSection from "@/components/sections/AboutSection";
import ExpertiseSection from "@/components/sections/ExpertiseSection";
import { HeroVisual } from "@/components/sections/HeroVisual";
import StatsSection from "@/components/sections/StatsSection";
import CTASection from "@/components/sections/CTASection";
import { usePreloadState } from "@/components/ui/arc-preloader-hero";


// ─── Helpers (Keeping Original Design) ───────────────────────────────────────

const MetricCTAHijack = () => {
    return (
        <>
            <StatsSection showOnly="top" />
            <section className="relative">
                {/* Layer 1: The Blog/Book Slider (Sticky) */}
                <div className="sticky top-0 z-0 overflow-hidden">
                    <StatsSection showOnly="bottom" />
                </div>

                {/* Layer 2: The CTA Section (Slides Over) */}
                <div className="relative z-20 bg-background dark:bg-black">
                    {/* Top shadow element to prevent downward bleeding into footer */}
                    <div className="absolute top-0 left-0 w-full h-10 dark:shadow-[0_-50px_150px_rgba(0,0,0,0.8)] -z-10" />

                    <div className="h-[10vh]" />
                    <CTASection />
                    <div className="h-20" />
                </div>
            </section>
        </>
    );
};

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function HomePage() {
    const { phase } = usePreloadState();
    const [isLoading, setIsLoading] = useState(true);
    const [isInitialLoadingExit, setIsInitialLoadingExit] = useState(false);
    const [skipAnimation, setSkipAnimation] = useState(false);

    useEffect(() => {
        const hasLoaded = sessionStorage.getItem('portfolioLoaded');
        if (hasLoaded) {
            setSkipAnimation(true);
            setIsLoading(false);
        }

        if (typeof window === 'undefined' || !('ResizeObserver' in window)) return;
        const refreshLayout = () => {
            window.dispatchEvent(new Event('resize'));
            ScrollTrigger.refresh();
        };
        const resizeObserver = new ResizeObserver(() => { refreshLayout(); });
        resizeObserver.observe(document.body);
        window.addEventListener('load', refreshLayout);
        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('load', refreshLayout);
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    // Animasikan konten saat LoadingScreen selesai (visit pertama) 
    // ATAU saat arc preloader mulai naik/selesai (visit kedua dst)
    const isReadyToAnimate = isLoading ? isInitialLoadingExit : (phase === "reveal" || phase === "done");

    useEffect(() => {
        if (isReadyToAnimate) {
            const timer = setTimeout(() => {
                ScrollTrigger.refresh();
            }, 1500); // Once, after transition is likely done
            return () => clearTimeout(timer);
        }
    }, [isReadyToAnimate]);

    const handleLoadingComplete = () => {
        setIsLoading(false);
        window.scrollTo({ top: 0, behavior: 'instant' });
        sessionStorage.setItem('portfolioLoaded', 'true');
        setTimeout(() => { ScrollTrigger.refresh(); }, 100);
    };

    const handleExitStart = () => {
        setIsInitialLoadingExit(true);
    };

    return (
        <>
            {isLoading && <LoadingScreen onComplete={handleLoadingComplete} onExitStart={handleExitStart} duration={2500} />}
            <motion.main
                initial={skipAnimation ? false : { opacity: 0, y: 40 }}
                animate={skipAnimation ? { opacity: 1, y: 0 } : (isReadyToAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 })}
                transition={{
                    duration: skipAnimation ? 0 : 1.4,
                    ease: skipAnimation ? "linear" : [0.16, 1, 0.3, 1], // Expo out for snappy yet smooth feel
                    opacity: { duration: skipAnimation ? 0 : 0.8 }
                }}
                className="relative overflow-x-clip will-change-transform will-change-opacity"
            >
                <HeroVisual isExiting={isReadyToAnimate} />

                <DeferredMount>
                    <ExpertiseSection />
                    <AboutSection />
                    <MetricCTAHijack />
                    <SocialCorner className="fixed bottom-12 right-12 z-[30]" />
                </DeferredMount>
            </motion.main>
        </>
    );
}
