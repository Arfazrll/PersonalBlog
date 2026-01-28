"use client";

import React, { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
    const [mousePosition, setMousePosition] = useState({ x: 100, y: 100 });

    const isHovering = hovering !== undefined ? hovering : localIsHovering;
    const setIsHovering = setHovering || setLocalIsHovering;

    // Mobile Optimization: Disable Lens on touch devices automatically
    useEffect(() => {
        const checkMobile = () => {
            if (window.matchMedia('(max-width: 768px)').matches) {
                // We don't have a direct 'setDisabled' prop, but we can effectively disable it
                // by returning early in handleMouseMove or treating it as static.
                // Since 'disabled' is a prop, we can't change it, but we can override behavior.
            }
        };
        // Better approach: wrap logic in handleMouseMove
    }, []);

    const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
    const effectiveDisabled = disabled || isMobile;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (effectiveDisabled || isStatic) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (smoothFollow) {
            setMousePosition({ x, y });
        } else {
            // Snap to grid for less smooth following
            const gridSize = 20;
            setMousePosition({
                x: Math.round(x / gridSize) * gridSize,
                y: Math.round(y / gridSize) * gridSize,
            });
        }
    };

    const shadowClasses = {
        none: '',
        light: 'shadow-sm',
        medium: 'shadow-md',
        heavy: 'shadow-xl',
    };

    const getMaskImage = (x: number, y: number) => {
        const radius = lensSize / 2;
        // Using string concatenation for shape and gradient
        const shape =
            maskShape === 'circle'
                ? "circle " + radius + "px at " + x + "px " + y + "px"
                : "ellipse " + radius + "px " + radius + "px at " + x + "px " + y + "px";

        const gradient = blurEdge
            ? "radial-gradient(" + shape + ", black 60%, transparent 100%)"
            : "radial-gradient(" + shape + ", black 100%, transparent 100%)";

        return gradient;
    };

    const currentX = isStatic ? position.x : mousePosition.x;
    const currentY = isStatic ? position.y : mousePosition.y;

    const lensContent = (
        <motion.div
            initial={{ opacity: 0, scale: 0.58 }}
            animate={{ opacity: opacity, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: animationDuration, ease: animationEasing }}
            className={cn(
                "absolute inset-0 overflow-hidden",
                borderWidth > 0 && "border-" + borderWidth + " " + borderColor, // String concatenation
                shadowClasses[shadowIntensity]
            )}
            style={{
                maskImage: getMaskImage(currentX, currentY),
                WebkitMaskImage: getMaskImage(currentX, currentY),
                transformOrigin: currentX + "px " + currentY + "px", // String concatenation
                zIndex: 50,
            }}
        >
            <div
                className="absolute inset-0"
                style={{
                    transform: "scale(" + zoomFactor + ")", // String concatenation
                    transformOrigin: currentX + "px " + currentY + "px", // String concatenation
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
                "rounded-" + borderRadius, // String concatenation
                disabled && "cursor-not-allowed opacity-50",
                className
            )}
            onMouseEnter={function () {
                return !effectiveDisabled && setIsHovering(true);
            }}
            onMouseLeave={function () {
                return !effectiveDisabled && setIsHovering(false);
            }}
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
