"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface BeamDividerProps {
    orientation?: "horizontal" | "vertical";
    className?: string;
    reverse?: boolean;
    active?: boolean;
}

export const BeamDivider = ({
    orientation = "horizontal",
    className,
    reverse = false,
    active = true,
}: BeamDividerProps) => {
    // Continuous looping animation range using transforms
    const initialPos = reverse ? "110%" : "-110%";
    const animatePos = reverse ? "-110%" : "110%";

    const transformProp = orientation === "horizontal" ? "x" : "y";

    return (
        <div
            className={cn(
                "relative pointer-events-none z-20 overflow-hidden",
                orientation === "horizontal" ? "w-full h-px" : "h-full w-px",
                "bg-black/5 dark:bg-white/[0.01]", // Base line visibility (samar namun jelas)
                className
            )}
        >
            {active && (
                <motion.div
                    initial={{
                        [transformProp]: initialPos
                    }}
                    animate={{
                        [transformProp]: animatePos
                    }}
                    transition={{
                        duration: 5, // Slightly slower for more natural feel
                        repeat: Infinity,
                        repeatType: "reverse", // Back and forth movement
                        ease: "easeInOut", // Natural acceleration/deceleration
                    }}
                    className={cn(
                        "absolute transform-gpu will-change-transform translate-z-0",
                        orientation === "horizontal"
                            ? "h-[1.5px] w-80 -top-[0.25px] left-0 bg-gradient-to-r from-transparent via-primary to-transparent blur-[1.5px]"
                            : "w-[1.5px] h-80 -left-[0.25px] top-0 bg-gradient-to-b from-transparent via-primary to-transparent blur-[1.5px]"
                    )}
                />
            )}

            {/* Inner "pulse" glow for life */}
            <div className={cn(
                "absolute inset-0 bg-primary/2 transition-opacity duration-1000",
                "opacity-40 group-hover:opacity-100"
            )} />
        </div>
    );
};
