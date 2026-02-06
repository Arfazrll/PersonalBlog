"use client";

import React, { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { cn } from "@/lib/utils";

interface LensProps {
    children: React.ReactNode;
    zoomFactor?: number;
    lensSize?: number;
    position?: {
        x: number;
        y: number;
    };
    isStatic?: boolean;
    isFocusing?: () => void;
    hovering?: boolean;
    setHovering?: (hovering: boolean) => void;
    className?: string;
    borderRadius?: string;
    borderWidth?: number;
    borderColor?: string;
    shadowIntensity?: 'none' | 'light' | 'medium' | 'heavy';
    animationDuration?: number;
    animationEasing?: string;
    maskShape?: 'circle' | 'square';
    opacity?: number;
    blurEdge?: boolean;
    smoothFollow?: boolean;
    disabled?: boolean;
}

export const Lens: React.FC<LensProps> = ({
    children,
    zoomFactor = 1.5,
    lensSize = 170,
    isStatic = false,
    position = { x: 200, y: 150 },
    hovering,
    setHovering,
    className,
    borderRadius = "lg",
    borderWidth = 0,
    borderColor = "border-gray-300",
    shadowIntensity = 'medium',
    animationDuration = 0.3,
    animationEasing = "easeOut",
    maskShape = 'circle',
    opacity = 1,
    blurEdge = false,
    smoothFollow = true,
    disabled = false,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [localIsHovering, setLocalIsHovering] = useState(false);

    // Use MotionValues instead of State to prevent re-renders on every frame
    const mouseX = useMotionValue(100);
    const mouseY = useMotionValue(100);

    const isHovering = hovering !== undefined ? hovering : localIsHovering;
    const setIsHovering = setHovering || setLocalIsHovering;

    const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
    const effectiveDisabled = disabled || isMobile;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (effectiveDisabled || isStatic) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Update MotionValues directly
        mouseX.set(x);
        mouseY.set(y);
    };

    const shadowClasses = {
        none: '',
        light: 'shadow-sm',
        medium: 'shadow-md',
        heavy: 'shadow-xl',
    };

    // Optimization: Create motion templates for styles that depend on mouse position
    // We only use these if NOT static. If static, we just use the fixed position.

    // Static Position Handling
    // We can't conditionally call hooks, but we can set the initial MV to the static pos if needed
    // However, if swapping between static/dynamic, MVs are better.

    const maskImage = useMotionTemplate`radial-gradient(${maskShape === 'circle' ? 'circle' : 'ellipse'} ${lensSize / 2}px ${maskShape === 'circle' ? '' : lensSize / 2 + 'px'} at ${mouseX}px ${mouseY}px, black 100%, transparent 100%)`; // simplified gradient for perf

    // For transform origin, we need px values
    const transformOrigin = useMotionTemplate`${mouseX}px ${mouseY}px`;

    // Static styles fallback
    const staticStyle = {
        maskImage: `radial-gradient(${maskShape === 'circle' ? 'circle' : 'ellipse'} ${lensSize / 2}px ${maskShape === 'circle' ? '' : lensSize / 2 + 'px'} at ${position.x}px ${position.y}px, black 100%, transparent 100%)`,
        transformOrigin: `${position.x}px ${position.y}px`
    };

    const lensContent = (
        <motion.div
            initial={{ opacity: 0, scale: 0.58 }}
            animate={{ opacity: opacity, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: animationDuration, ease: animationEasing }}
            className={cn(
                "absolute inset-0 overflow-hidden",
                borderWidth > 0 && "border-" + borderWidth + " " + borderColor,
                shadowClasses[shadowIntensity]
            )}
            style={isStatic ? {
                ...staticStyle,
                zIndex: 50,
            } : {
                maskImage,
                WebkitMaskImage: maskImage,
                transformOrigin,
                zIndex: 50,
            }}
        >
            <div
                className="absolute inset-0"
                style={isStatic ? {
                    transform: `scale(${zoomFactor})`,
                    transformOrigin: `${position.x}px ${position.y}px`
                } : {
                    transform: `scale(${zoomFactor})`,
                    transformOrigin: transformOrigin as any, // Cast to avoid type issues with MotionValue string
                }}
            >
                {children}
            </div>
        </motion.div>
    );

    return (
        <div
            ref={containerRef}
            className={cn(
                "relative overflow-hidden z-20",
                "rounded-" + borderRadius,
                disabled && "cursor-not-allowed opacity-50",
                className
            )}
            onMouseEnter={() => !effectiveDisabled && setIsHovering(true)}
            onMouseLeave={() => !effectiveDisabled && setIsHovering(false)}
            onMouseMove={handleMouseMove}
        >
            {children}

            {isStatic ? (
                <div>{lensContent}</div>
            ) : (
                <AnimatePresence>
                    {isHovering && !effectiveDisabled && (
                        <div>{lensContent}</div>
                    )}
                </AnimatePresence>
            )}
        </div>
    );
};
