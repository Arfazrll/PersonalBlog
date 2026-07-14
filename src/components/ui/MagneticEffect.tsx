"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticEffectProps {
    children: React.ReactNode;
    strength?: number;
    stiffness?: number;
    damping?: number;
    mass?: number;
}

export default function MagneticEffect({ 
    children, 
    strength = 0.35, 
    stiffness = 150, 
    damping = 15, 
    mass = 0.1 
}: MagneticEffectProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const boundingRect = ref.current?.getBoundingClientRect();
        if (boundingRect) {
            const { left, top, width, height } = boundingRect;
            const centerX = left + width / 2;
            const centerY = top + height / 2;
            const distanceX = clientX - centerX;
            const distanceY = clientY - centerY;
            
            setPosition({ x: distanceX * strength, y: distanceY * strength });
        }
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness, damping, mass }}
            className="inline-block"
        >
            {children}
        </motion.div>
    );
}
