"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface FlickeringGridProps {
    className?: string;
    squareSize?: number;
    gridGap?: number;
    flickerChance?: number;
    color?: string;
    maxOpacity?: number;
    width?: number;
    height?: number;
}

export const FlickeringGrid = ({
    className,
    squareSize = 4,
    gridGap = 6,
    flickerChance = 0.3,
    color = "rgb(0, 0, 0)",
    maxOpacity = 0.3,
    width,
    height,
}: FlickeringGridProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let w = width || canvas.offsetWidth;
        let h = height || canvas.offsetHeight;

        const cols = Math.floor(w / (squareSize + gridGap));
        const rows = Math.floor(h / (squareSize + gridGap));

        // High DPI support
        const dpr = window.devicePixelRatio || 1;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.scale(dpr, dpr);

        // Create grid state
        const grid: number[][] = [];
        for (let i = 0; i < rows; i++) {
            grid[i] = [];
            for (let j = 0; j < cols; j++) {
                grid[i][j] = 0;
            }
        }

        const drawGrid = () => {
            ctx.clearRect(0, 0, w, h);

            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    // Randomly flicker
                    if (Math.random() < flickerChance) {
                        grid[i][j] = Math.random() * maxOpacity;
                    } else {
                        // Fade out
                        grid[i][j] = Math.max(0, grid[i][j] - 0.05);
                    }

                    if (grid[i][j] > 0) {
                        ctx.fillStyle = color.replace(
                            "rgb(",
                            `rgba(`
                        ).replace(")", `, ${grid[i][j]})`);

                        const x = j * (squareSize + gridGap);
                        const y = i * (squareSize + gridGap);
                        ctx.fillRect(x, y, squareSize, squareSize);
                    }
                }
            }
        };

        let animationId: number;
        const animate = () => {
            drawGrid();
            animationId = requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            w = width || canvas.offsetWidth;
            h = height || canvas.offsetHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.scale(dpr, dpr);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", handleResize);
        };
    }, [squareSize, gridGap, flickerChance, color, maxOpacity, width, height]);

    return (
        <canvas
            ref={canvasRef}
            className={cn(
                "pointer-events-none absolute inset-0",
                className
            )}
            style={{ width: "100%", height: "100%" }}
        />
    );
};
