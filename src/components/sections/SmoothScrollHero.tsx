// ReactLenis removed - using global provider
import {
    motion,
    useMotionTemplate,
    useScroll,
    useTransform,
    useSpring,
    MotionValue,
} from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { usePerformance } from "@/hooks/usePerformance";

export const SmoothScrollHero = () => {
    const { isLowPowerMode } = usePerformance();
    return (
        <div className="bg-background text-zinc-900 dark:text-zinc-50 relative z-0">
            <Hero isLowPowerMode={isLowPowerMode} />
        </div>
    );
};

const SECTION_HEIGHT = 1500;

const Hero = ({ isLowPowerMode }: { isLowPowerMode: boolean }) => {
    const { scrollY } = useScroll();

    // Simplify physics for low power mode
    const smoothScrollY = useSpring(scrollY, isLowPowerMode ? {
        stiffness: 50,
        damping: 30
    } : {
        mass: 0.1,
        stiffness: 100,
        damping: 20
    });

    return (
        <div
            style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
            className="relative w-full"
        >
            <CenterImage scrollY={smoothScrollY} />

            {!isLowPowerMode && <ParallaxImages scrollY={smoothScrollY} />}

            <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-transparent to-background z-20 pointer-events-none" />

            <motion.div
                className="fixed bottom-6 left-1/2 -translate-x-[65%] z-50 hidden md:flex flex-col items-center gap-2 cursor-pointer pointer-events-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
                onClick={() => {
                    document.getElementById("launch-schedule")?.scrollIntoView({
                        behavior: "smooth",
                    });
                }}
            >
            </motion.div>
        </div>
    );
};

const CenterImage = ({ scrollY }: { scrollY: MotionValue<number> }) => {
    // Animation: Scale from 50% to 100%
    const scale = useTransform(scrollY, [0, SECTION_HEIGHT], [0.5, 1]);
    const borderRadius = useTransform(scrollY, [0, SECTION_HEIGHT], [24, 0]);
    // Fade out LATER, ensuring it stays as a backdrop for the Timeline entry
    const opacity = useTransform(
        scrollY,
        [SECTION_HEIGHT + 1000, SECTION_HEIGHT + 1600],
        [1, 0]
    );

    // Text specific animations
    const textOpacity = useTransform(scrollY, [0, 200], [1, 0]);
    const textScale = useTransform(scrollY, [0, 200], [1, 1.1]);
    const textY = useTransform(scrollY, [0, 200], [0, 50]);

    const subtitleOpacity = useTransform(scrollY, [0, 150], [1, 0]);
    const subtitleY = useTransform(scrollY, [0, 150], [0, 20]);

    return (
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-0">
            <motion.div
                style={{
                    scale,
                    borderRadius,
                    opacity,
                    backgroundImage:
                        "url(https://images.unsplash.com/photo-1460186136353-977e9d6085a1?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                }}
                className="w-full h-full shadow-2xl relative origin-center"
            >
                <div className="absolute inset-0 bg-black/40" />
            </motion.div>

            {/* Title Overlay */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 px-4 mix-blend-exclusion"
            >
                <motion.h1
                    style={{
                        opacity: textOpacity,
                        scale: textScale,
                        y: textY,
                    }}
                    className="text-5xl md:text-9xl font-black text-white tracking-tighter text-center mb-6 mix-blend-exclusion"
                >
                    EXPERIENCE
                </motion.h1>
                <motion.p
                    style={{
                        opacity: subtitleOpacity,
                        y: subtitleY,
                    }}
                    className="w-full max-w-[90vw] md:max-w-6xl text-center text-lg md:text-2xl text-zinc-600 dark:text-zinc-200 font-medium tracking-wide leading-relaxed"
                >
                    Merging technical precision with creative vision. A curated timeline of my professional journey, from foundational code to advanced AI solutions.
                </motion.p>
            </motion.div>
        </div>
    );
};

const ParallaxImages = ({ scrollY }: { scrollY: MotionValue<number> }) => {
    return (
        <div className="mx-auto max-w-7xl px-4 absolute inset-0 z-20 pointer-events-none grid grid-cols-12 gap-4 h-full items-end pb-[10vh]">
            {/* 
               STRATEGY: 
               start={positive} -> Starts BELOW current view.
               end={negative} -> Moves UP past the view.
            */}

            {/* 1. Left Small - Moves Fast */}
            <div className="col-span-3 col-start-2">
                <ParallaxImg
                    scrollY={scrollY}
                    src="https://images.unsplash.com/photo-1484600899469-230e8d1d59c0?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Space launch"
                    start={800}
                    end={-1500}
                    className="w-full shadow-2xl rounded-2xl border border-white/10 aspect-[4/3] object-cover"
                />
            </div>

            {/* 2. Right Small - Moves Moderate */}
            <div className="col-span-3 col-start-10 mb-32">
                <ParallaxImg
                    scrollY={scrollY}
                    src="https://images.unsplash.com/photo-1446776709462-d6b525c57bd3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Space launch"
                    start={1000}
                    end={-1500}
                    className="w-full shadow-2xl rounded-2xl border border-white/10 aspect-square object-cover"
                />
            </div>

            {/* 3. Center Wide - Moves Slowest (Background-ish) */}
            <div className="col-span-4 col-start-5 mb-10">
                <ParallaxImg
                    scrollY={scrollY}
                    src="https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Satellite view"
                    start={900}
                    end={-1800}
                    className="w-full shadow-2xl rounded-2xl border border-white/10 aspect-video object-cover"
                />
            </div>

            {/* 4. Far Left Tall - Moves Very Fast */}
            <div className="col-span-3 col-start-1 mb-64">
                <ParallaxImg
                    scrollY={scrollY}
                    src="https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Space texture"
                    start={1200}
                    end={-2000}
                    className="w-full shadow-2xl rounded-2xl border border-white/10 aspect-[3/4] object-cover"
                />
            </div>

            {/* 5. Far Right Wide - Moves Fast */}
            <div className="col-span-4 col-start-8 mb-40">
                <ParallaxImg
                    scrollY={scrollY}
                    src="https://images.unsplash.com/photo-1494022299300-899b96e49893?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Orbiting satellite"
                    start={1100}
                    end={-2000}
                    className="w-full shadow-2xl rounded-2xl border border-white/10 aspect-video object-cover"
                />
            </div>
        </div>
    );
};

const ParallaxImg = ({ className, alt, src, start, end, scrollY }: { className?: string, alt: string, src: string, start: number, end: number, scrollY: MotionValue<number> }) => {
    const opacity = useTransform(scrollY, [0, SECTION_HEIGHT * 1.2], [1, 0]);

    // Scale slightly as they rise
    const scale = useTransform(scrollY, [0, SECTION_HEIGHT], [1, 1.2]);

    // Map global scroll to strictly strictly UPWARD movement
    const y = useTransform(scrollY, [0, SECTION_HEIGHT], [start, end]);

    // Smooth transform
    const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

    return (
        <motion.img
            src={src}
            alt={alt}
            className={className}
            style={{ transform, opacity }}
        />
    );
};
