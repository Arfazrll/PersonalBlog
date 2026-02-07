"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedMistProps {
    className?: string;
    position?: "top" | "bottom" | "both";
}

export const AnimatedMist = ({
    className,
    position = "bottom"
}: AnimatedMistProps) => {
    const mistVariants = {
        animate: {
            x: [0, 20, 0],
            opacity: [0.1, 0.2, 0.1],
        }
    };

    const MistLayer = ({ delay = 0 }: { delay?: number }) => (
        <motion.div
            className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-primary/5 to-transparent"
            style={{ filter: "blur(20px)" }}
            variants={mistVariants}
            animate="animate"
            transition={{
                duration: 20,
                delay,
                repeat: Infinity,
                ease: "linear"
            }}
        />
    );

    return (
        <div className={cn("absolute inset-x-0 pointer-events-none", className)}>
            {(position === "top" || position === "both") && (
                <div className="absolute top-0 inset-x-0 h-24 overflow-hidden">
                    <MistLayer delay={0} />
                    <MistLayer delay={10} />
                </div>
            )}
            {(position === "bottom" || position === "both") && (
                <div className="absolute bottom-0 inset-x-0 h-24 overflow-hidden">
                    <MistLayer delay={5} />
                    <MistLayer delay={15} />
                </div>
            )}
        </div>
    );
};
