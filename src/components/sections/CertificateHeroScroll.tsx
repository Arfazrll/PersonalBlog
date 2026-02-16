"use client";

import { useEffect, useRef, useCallback, type FC, useState, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import Image from "next/image";
import { usePerformance } from "@/hooks/usePerformance";
import { ChevronDown } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

interface ImageItem {
    id: string;
    src: string;
    alt: string;
    isPdf: boolean;
}

interface Position {
    top: number;
    left: number;
    width: number;
    height: number;
    borderRadius: number;
    zIndex?: number;
}

interface Positions {
    initial: Record<string, Position>;
    final: Record<string, Position>;
}

interface CertificateHeroScrollProps {
    onDownloadClick?: () => void;
    isLowPowerMode?: boolean;
}

const CERTIFICATE_POOL = [
    "Data Analytics on Google Cloud.png",
    "Deep Learning Beginner.jpg",
    "Docker, Kubernetes dan DevOps.jpg",
    "Fullstack Programming Untuk Pemula.jpg",
    "Introduction to Generative AI.png",
    "Machine Learning Foundations.png",
    "Mastering Smart Contract.jpg",
    "Started with Databases.png",
    "Supervised Machine Learning Regression and Classification.jpeg",
    "elevAIte with Dicoding Program 2025.png"
];

const CertificateHeroScroll: FC<CertificateHeroScrollProps> = ({ onDownloadClick, isLowPowerMode: isLowPowerModeProp }) => {
    const spacerRef = useRef<HTMLDivElement>(null);
    const fixedContainerRef = useRef<HTMLDivElement>(null);
    const heroContentRef = useRef<HTMLDivElement>(null);
    const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
    const { isLowPowerMode: performanceLowPower, isMobile } = usePerformance();
    const isLowPowerMode = isLowPowerModeProp ?? performanceLowPower;

    // Select and randomize certificates on mount to avoid hydration mismatch
    const [randomCertificates, setRandomCertificates] = useState<ImageItem[]>([]);

    const createCertItem = useCallback((filename: string): ImageItem => ({
        id: filename.replace(/\s+/g, '-').toLowerCase(),
        src: `/certificate/${filename}`,
        alt: filename.replace(/\.(pdf|jpg|jpeg|png)$/i, ''),
        isPdf: /\.pdf$/i.test(filename)
    }), []);

    useEffect(() => {
        // Randomly pick 6 unique items from the pool
        const shuffled = [...CERTIFICATE_POOL].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 6).map(createCertItem);
        setRandomCertificates(selected);
    }, [createCertItem]);


    const getPositions = useCallback((): Positions => {
        const vw = typeof window !== "undefined" ? window.innerWidth : 1920;
        const vh = typeof window !== "undefined" ? window.innerHeight : 1080;
        const isCurrentlyMobile = vw < 768;

        // ... (Desktop positions)
        const desktopInitial: Record<string, Position> = {
            cert1: { top: vh * 0.15, left: vw * 0.05, width: vw * 0.22, height: vh * 0.22, borderRadius: 12, zIndex: 1 },
            cert2: { top: vh * 0.12, left: vw * 0.38, width: vw * 0.2, height: vh * 0.2, borderRadius: 12, zIndex: 1 },
            cert3: { top: vh * 0.18, left: vw * 0.72, width: vw * 0.22, height: vh * 0.22, borderRadius: 12, zIndex: 1 },
            cert4: { top: vh * 0.70, left: vw * 0.08, width: vw * 0.2, height: vh * 0.25, borderRadius: 12, zIndex: 1 },
            cert5: { top: vh * 0.75, left: vw * 0.42, width: vw * 0.2, height: vh * 0.18, borderRadius: 12, zIndex: 1 },
            cert6: { top: vh * 0.65, left: vw * 0.75, width: vw * 0.18, height: vh * 0.25, borderRadius: 12, zIndex: 1 },
        };

        // Mobile Grid Calculations (Pre-calculated for initial state to match final sizes and avoid layout thrashing)
        const mGap = 10;
        const mGridW = vw * 0.9;
        const mColW = (mGridW - mGap) / 2;
        const fixedHeight = 160;

        const mobileInitial: Record<string, Position> = {
            cert1: { top: vh * 0.15, left: vw * 0.05, width: mColW, height: fixedHeight, borderRadius: 8, zIndex: 1 },
            cert2: { top: vh * 0.12, left: vw * 0.52, width: mColW, height: fixedHeight, borderRadius: 8, zIndex: 1 },
            cert3: { top: vh * 0.35, left: vw * 0.08, width: mColW, height: fixedHeight, borderRadius: 8, zIndex: 1 },
            cert4: { top: vh * 0.60, left: vw * 0.10, width: mColW, height: fixedHeight, borderRadius: 8, zIndex: 1 },
            cert5: { top: vh * 0.65, left: vw * 0.55, width: mColW, height: fixedHeight, borderRadius: 8, zIndex: 1 },
            cert6: { top: vh * 0.40, left: vw * 0.50, width: mColW, height: fixedHeight, borderRadius: 8, zIndex: 1 },
        };

        const initial = isCurrentlyMobile ? mobileInitial : desktopInitial;

        const gridW = Math.min(vw * 0.85, 1400);
        const gridH = vh * 0.7;
        const startX = (vw - gridW) / 2;
        const startY = (vh - gridH) / 2 + (vh * 0.05);
        const gap = 16;
        const col1W = (gridW - 2 * gap) * 0.4;
        const col2W = (gridW - 2 * gap) * 0.3;
        const col3W = (gridW - 2 * gap) * 0.3;

        const desktopFinal: Record<string, Position> = {
            cert1: { top: startY, left: startX, width: col1W, height: (gridH - gap) * 0.55, borderRadius: 8, zIndex: 10 },
            cert2: { top: startY + (gridH - gap) * 0.55 + gap, left: startX, width: col1W, height: (gridH - gap) * 0.45, borderRadius: 8, zIndex: 10 },
            cert3: { top: startY, left: startX + col1W + gap, width: col2W, height: (gridH - gap) * 0.4, borderRadius: 8, zIndex: 10 },
            cert4: { top: startY + (gridH - gap) * 0.4 + gap, left: startX + col1W + gap, width: col2W, height: (gridH - gap) * 0.6, borderRadius: 8, zIndex: 10 },
            cert5: { top: startY, left: startX + col1W + col2W + 2 * gap, width: col3W, height: (gridH - gap) * 0.65, borderRadius: 8, zIndex: 10 },
            cert6: { top: startY + (gridH - gap) * 0.65 + gap, left: startX + col1W + col2W + 2 * gap, width: col3W, height: (gridH - gap) * 0.35, borderRadius: 8, zIndex: 10 },
        };

        const mStartX = (vw - mGridW) / 2;
        const mStartY = vh * 0.2;

        const mobileFinal: Record<string, Position> = {
            cert1: { top: mStartY, left: mStartX, width: mColW, height: 160, borderRadius: 8, zIndex: 10 },
            cert2: { top: mStartY, left: mStartX + mColW + mGap, width: mColW, height: 160, borderRadius: 8, zIndex: 10 },
            cert3: { top: mStartY + 170, left: mStartX, width: mColW, height: 160, borderRadius: 8, zIndex: 10 },
            cert4: { top: mStartY + 170, left: mStartX + mColW + mGap, width: mColW, height: 160, borderRadius: 8, zIndex: 10 },
            cert5: { top: mStartY + 340, left: mStartX, width: mColW, height: 160, borderRadius: 8, zIndex: 10 },
            cert6: { top: mStartY + 340, left: mStartX + mColW + mGap, width: mColW, height: 160, borderRadius: 8, zIndex: 10 },
        };

        const final = isCurrentlyMobile ? mobileFinal : desktopFinal;

        return { initial, final };
    }, []);

    useEffect(() => {
        if (typeof window === "undefined" || randomCertificates.length === 0) return;

        gsap.registerPlugin(ScrollTrigger);

        const { initial, final } = getPositions();
        const imageElements = imageRefs.current.filter((el): el is HTMLDivElement => el !== null);

        const ctx = gsap.context(() => {
            imageElements.forEach((img, index) => {
                const pos = initial[`cert${index + 1}`];
                if (pos) {
                    gsap.set(img, {
                        top: pos.top,
                        left: pos.left,
                        width: pos.width,
                        height: pos.height,
                        borderRadius: pos.borderRadius,
                        zIndex: pos.zIndex,
                        scale: 0.8,
                        rotate: index % 2 === 0 ? -5 : 5,
                        opacity: 0,
                    });
                }
            });

            gsap.to(imageElements, {
                opacity: 0.8,
                scale: 1,
                duration: isLowPowerMode ? 0.6 : 1.2,
                stagger: isLowPowerMode ? 0.05 : 0.1,
                ease: "power2.out",
            });

            const mainTL = gsap.timeline({
                scrollTrigger: {
                    trigger: spacerRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: isLowPowerMode ? 0.2 : 0.5, // Faster responding scrub
                },
            });

            if (heroContentRef.current) {
                mainTL.to(heroContentRef.current, { autoAlpha: 0, scale: 0.9, duration: 0.2 }, 0);
            }

            imageElements.forEach((img, index) => {
                const finalPos = final[`cert${index + 1}`];
                const initialPos = initial[`cert${index + 1}`];

                if (finalPos && initialPos) {
                    mainTL.fromTo(
                        img,
                        {
                            top: initialPos.top,
                            left: initialPos.left,
                            width: initialPos.width,
                            height: initialPos.height,
                            borderRadius: initialPos.borderRadius,
                            rotate: index % 2 === 0 ? -5 : 5,
                            opacity: 0.8,
                            scale: 1,
                            zIndex: initialPos.zIndex,
                        },
                        {
                            top: finalPos.top,
                            left: finalPos.left,
                            width: finalPos.width,
                            height: finalPos.height,
                            borderRadius: finalPos.borderRadius,
                            opacity: 1,
                            rotate: 0,
                            scale: 1,
                            zIndex: finalPos.zIndex,
                            duration: 1,
                            ease: "power2.inOut",
                            immediateRender: false
                        },
                        0
                    );
                }
            });


            // Add a buffer/pause at the end of the timeline
            // This ensures the animation finishes BEFORE the user scrolls past the spacer,
            // allowing them to see the final grid layout for a moment.
            // Timeline Total Duration becomes ~2.0 (1.0 for animation + 1.0 buffer)
            // So the animation completes at 1/2.0 = 50% of the scroll distance.
            mainTL.to({}, { duration: 1.0 });

        }, spacerRef);

        // FADE OUT HERO when scrolling past the component
        ScrollTrigger.create({
            trigger: spacerRef.current,
            start: "bottom top", // when bottom of spacer hits top of viewport
            onEnter: () => gsap.to(fixedContainerRef.current, { autoAlpha: 0, duration: 0.5 }),
            onLeaveBack: () => gsap.to(fixedContainerRef.current, { autoAlpha: 1, duration: 0.5 }),
            toggleActions: "play none none reverse"
        });

        return () => ctx.revert();
    }, [getPositions, randomCertificates, isLowPowerMode]);

    return (
        <>
            {/* SPACER: Takes up space in the document flow to allow scrolling */}
            <div ref={spacerRef} className="h-[350vh] w-full relative z-10 pointer-events-none" />

            {/* FIXED HERO: Stays behind content. z-10 ensures it sits ABOVE particles (z-0), but transparent to see them. */}
            <div ref={fixedContainerRef} className="fixed inset-0 z-10 h-screen w-full overflow-hidden bg-transparent pointer-events-none">
                {/* Background Effects */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute top-[20%] right-[10%] w-[600px] h-[600px] bg-primary/10 blur-[80px] rounded-full" />
                    <div className="absolute bottom-[10%] left-[5%] w-[500px] h-[500px] bg-secondary/10 blur-[80px] rounded-full" />
                </div>

                {/* Content */}
                <div
                    ref={heroContentRef}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-50 pt-10 pb-32"
                >
                    <div className="inline-block px-4 py-1.5 rounded-full bg-secondary/50 backdrop-blur-md border border-border/50 text-xs font-medium mb-6 animate-fade-in-up">
                        Professional Milestones
                    </div>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50 animate-fade-in-up delay-100">
                        Certificates<br />& Awards
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10 animate-fade-in-up delay-200">
                        A visual journey through certifications and achievements.
                    </p>
                    <button
                        onClick={() => window.scrollTo({ top: window.innerHeight * 1.2, behavior: 'smooth' })}
                        className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all group animate-fade-in-up delay-300 pointer-events-auto"
                    >
                        <span>Scroll to Explore</span>
                        <ChevronDown className="w-4 h-4 animate-bounce" />
                    </button>
                </div>

                {/* Images */}
                {randomCertificates.map((cert, index) => (
                    <div
                        key={`${cert.id}-${index}`}
                        ref={(el) => {
                            imageRefs.current[index] = el;
                        }}
                        className="absolute overflow-hidden shadow-2xl border border-border/20 bg-card rounded-lg"
                        style={{
                            willChange: "transform, opacity", // Optimized will-change
                            zIndex: 1 // Base z-index
                        }}
                    >
                        {cert.isPdf ? (
                            <div className="relative w-full h-full bg-white">
                                <iframe
                                    src={`${cert.src}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`}
                                    className="w-full h-full object-cover opacity-90 pointer-events-none"
                                    title={cert.alt}
                                    loading="lazy"
                                />
                                {/* Overlay to ensure no interaction */}
                                <div className="absolute inset-0 bg-transparent z-10" />
                            </div>
                        ) : (
                            <>
                                <Image
                                    src={cert.src}
                                    alt={cert.alt}
                                    fill
                                    priority={index < 2} // Priority loading for first few
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover opacity-90 hover:opacity-100 transition-opacity"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 pointer-events-none" />
                            </>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};

export default CertificateHeroScroll;
