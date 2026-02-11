"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, useMotionTemplate, animate } from "framer-motion";
import { cn } from "@/lib/utils";

export const MaskContainer = ({
  children,
  revealText,
  size = 10,
  revealSize = 600,
  className,
}: {
  children?: string | React.ReactNode;
  revealText?: string | React.ReactNode;
  size?: number;
  revealSize?: number;
  className?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  // Framer Motion values for performance
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const maskSize = useMotionValue(size);

  // Animate mask size when hover state changes
  useEffect(() => {
    animate(maskSize, isHovered ? revealSize : size, {
      duration: 0.2,
      ease: "easeOut",
    });
  }, [isHovered, revealSize, size, maskSize]);

  // Update cached rect bounds
  const updateRect = () => {
    if (containerRef.current) {
      rectRef.current = containerRef.current.getBoundingClientRect();
    }
  };

  // Update mouse position using cached rect
  const updateMousePosition = useCallback((e: MouseEvent) => {
    if (!rectRef.current) return;
    x.set(e.clientX - rectRef.current.left);
    y.set(e.clientY - rectRef.current.top);
  }, [x, y]);

  useEffect(() => {
    // Initial rect calculation
    updateRect();

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return; // Optimization: Disable on mobile

    const container = containerRef.current;
    if (!container) return;

    // Recalculate rect on resize/scroll or mouse enter to ensure accuracy
    window.addEventListener("resize", updateRect);
    window.addEventListener("scroll", updateRect); // Handle scrolling affecting fixed/relative pos
    container.addEventListener("mouseenter", updateRect);
    container.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect);
      container.removeEventListener("mouseenter", updateRect);
      container.removeEventListener("mousemove", updateMousePosition);
    };
  }, [updateMousePosition]);

  // Dynamic mask position: center the mask on the cursor
  const maskPosition = useMotionTemplate`calc(${x}px - ${maskSize}px / 2) calc(${y}px - ${maskSize}px / 2)`;
  const maskSizeStyle = useMotionTemplate`${maskSize}px`;

  return (
    <div
      ref={containerRef}
      className={cn("relative h-[20rem] overflow-hidden rounded-2xl", className)}
    >
      <motion.div
        className="absolute flex h-full w-full items-center justify-center bg-background text-6xl [mask-image:url(/mask.svg)] [mask-repeat:no-repeat]"
        style={{
          maskPosition,
          WebkitMaskPosition: maskPosition, // Safari/Chrome support
          maskSize: maskSizeStyle,
          WebkitMaskSize: maskSizeStyle,
          willChange: "mask-position, mask-size", // Hint browser for optimization
        }}
      >
        {/* Revealed Content (Foreground) */}
        <div className="absolute inset-0 z-0 h-full w-full opacity-50 bg-primary/10" />
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative z-20 mx-auto max-w-4xl text-center text-4xl font-bold"
        >
          {children}
        </div>
      </motion.div>

      {/* Base Content (Background) */}
      <div className="flex h-full w-full items-center justify-center pointer-events-none">
        {revealText}
      </div>
    </div>
  );
};
