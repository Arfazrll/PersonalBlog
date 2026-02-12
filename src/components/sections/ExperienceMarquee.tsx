import React, { useRef } from "react";
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useMotionValue,
    useVelocity,
    useAnimationFrame,
    wrap
} from "framer-motion";
import Image from "next/image";
import { portfolioData } from "@/data/portfolio";
import { Experience } from "@/types";
import { usePerformance } from "@/hooks/usePerformance";
import { cn } from "@/lib/utils";

interface ParallaxProps {
    children: React.ReactNode;
    baseVelocity: number;
    isLowPowerMode?: boolean;
}

function ParallaxText({ children, baseVelocity = 100, isLowPowerMode = false }: ParallaxProps) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });

    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const directionFactor = useRef<number>(1);
    const isHovered = useRef(false);

    useAnimationFrame((t, delta) => {
        if (isHovered.current || isLowPowerMode) return;

        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get() * 0.5;

        baseX.set(baseX.get() + moveBy);
    });

    if (isLowPowerMode) {
        return (
            <div className="overflow-hidden whitespace-nowrap w-full py-1">
                <div className={cn(
                    "flex gap-4",
                    baseVelocity > 0 ? "animate-marquee" : "animate-marquee-reverse"
                )}>
                    {children}
                    {children}
                    {children}
                    {children}
                </div>
            </div>
        );
    }

    return (
        <div
            className="overflow-hidden whitespace-nowrap w-full py-1"
            onMouseEnter={() => isHovered.current = true}
            onMouseLeave={() => isHovered.current = false}
        >
            <motion.div className="flex gap-4" style={{ x, willChange: "transform" }}>
                {children}
                {children}
                {children}
                {children}
            </motion.div>
        </div>
    );
}

const GalleryItem = ({ exp, index }: { exp: Experience; index: number }) => {
    const logoSrc = exp.logo ? `${exp.logo}?v=1` : '/assets/placeholder.png';

    return (
        <div className="relative shrink-0 w-[200px] h-[120px] md:w-[280px] md:h-[160px] flex items-center justify-center group cursor-pointer">
            <Image
                src={logoSrc}
                alt={exp.company}
                fill
                sizes="280px"
                priority
                unoptimized
                className="object-contain p-2 grayscale hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all duration-300"
            />
        </div>
    );
};

export default function ExperienceMarquee() {
    const { isLowPowerMode } = usePerformance();
    // Select specific experiences matching the 10 uploaded logos
    const experiences = portfolioData.experiences;

    const topIds = ['prof-1', 'prof-3', 'prof-4', 'prof-5', 'prof-6', 'lead-5'];
    const bottomIds = ['lead-2', 'lead-4', 'cert-1', 'cert-3', 'cert-5', 'vol-1'];

    const row1 = experiences.filter((exp: Experience) => topIds.includes(exp.id));
    const row2 = experiences.filter((exp: Experience) => bottomIds.includes(exp.id));

    const ensureLength = (items: Experience[]) => {
        if (items.length < 4) return [...items, ...items, ...items];
        return items;
    };
    return (
        <section className="py-4 md:py-8 bg-background relative z-10 overflow-hidden">
            {/* Fog/Blur Blending Effect */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background via-background/80 to-transparent z-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background via-background/80 to-transparent z-20 pointer-events-none" />

            <div className="flex flex-col gap-2">
                <ParallaxText baseVelocity={2} isLowPowerMode={isLowPowerMode}>
                    {ensureLength(row1).map((exp: Experience, idx: number) => (
                        <GalleryItem key={`r1-${idx}`} exp={exp} index={idx} />
                    ))}
                </ParallaxText>

                <ParallaxText baseVelocity={-2} isLowPowerMode={isLowPowerMode}>
                    {ensureLength(row2).map((exp: Experience, idx: number) => (
                        <GalleryItem key={`r2-${idx}`} exp={exp} index={idx + 4} />
                    ))}
                </ParallaxText>
            </div>
        </section>
    );
}
