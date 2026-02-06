'use client';

import { cn } from "@/lib/utils";
import { motion, MotionProps } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface TerminalProps {
    children: React.ReactNode;
    className?: string;
}

export const Terminal = ({ children, className }: TerminalProps) => {
    return (
        <div
            className={cn(
                "z-0 h-full w-full max-h-[400px] min-h-[300px] overflow-hidden rounded-xl border border-white/10 bg-black shadow-sm text-slate-200",
                className
            )}
        >
            <div className="flex border-b border-white/5 bg-white/[0.03] p-4">
                <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
            </div>
            <div className="flex flex-col gap-y-2 p-4">
                {children}
            </div>
        </div>
    );
};

interface TypingAnimationProps extends MotionProps {
    children: string;
    className?: string;
    duration?: number;
    delay?: number;
    as?: React.ElementType;
}

export const TypingAnimation = ({
    children,
    className,
    duration = 50,
    delay = 0,
    as: Component = "span",
    ...props
}: TypingAnimationProps) => {
    const [displayedText, setDisplayedText] = useState("");
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const startTimeout = setTimeout(() => {
            setStarted(true);
        }, delay);
        return () => clearTimeout(startTimeout);
    }, [delay]);

    useEffect(() => {
        if (!started) return;

        let i = 0;
        const typingEffect = setInterval(() => {
            if (i < children.length) {
                setDisplayedText(children.substring(0, i + 1));
                i++;
            } else {
                clearInterval(typingEffect);
            }
        }, duration);

        return () => {
            clearInterval(typingEffect);
        };
    }, [children, duration, started]);

    return (
        <MotionComponent
            as={Component}
            className={cn("font-mono text-sm", className)}
            {...props}
        >
            {displayedText}
        </MotionComponent>
    );
};

interface AnimatedSpanProps extends MotionProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    as?: React.ElementType;
}

export const AnimatedSpan = ({
    children,
    className,
    delay = 0,
    as: Component = "span",
    ...props
}: AnimatedSpanProps) => {
    // Using simple framer motion fade-in for "appearance" after delay
    return (
        <MotionComponent
            as={Component}
            initial={{ opacity: 0, y: 5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: delay / 1000 }}
            className={cn("font-mono text-sm", className)}
            {...props}
        >
            {children}
        </MotionComponent>
    );
};

// Helper for dynamic framer component
const MotionComponent = ({ as: Component = "div", children, ...props }: any) => {
    // eslint-disable-next-line
    const MotionEl = (motion as any).create ? (motion as any).create(Component) : motion(Component);
    return <MotionEl {...props}>{children}</MotionEl>;
};
