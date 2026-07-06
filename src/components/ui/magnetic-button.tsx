'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, ReactNode, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    variant?: 'primary' | 'outline';
    href?: string;
}

export function MagneticButton({ children, className, variant = 'primary', href }: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    
    // Magnetic pull for the container
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    
    const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        
        const rect = ref.current.getBoundingClientRect();
        
        // Calculate distance from center of the button for magnet effect
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Magnet strength (0.3 = 30% pull)
        x.set((e.clientX - centerX) * 0.3);
        y.set((e.clientY - centerY) * 0.3);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const baseStyles = "relative overflow-hidden rounded-full font-bold transition-all duration-300 shadow-xl flex items-center justify-center";
    
    const primaryStyles = "bg-neutral-900 text-white dark:bg-white dark:text-black border-2 border-neutral-900 dark:border-white";
    const outlineStyles = "bg-transparent text-neutral-900 dark:text-white border-2 border-neutral-200 dark:border-white/20";

    const variantStyles = variant === 'primary' ? primaryStyles : outlineStyles;

    const content = (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            style={{ x: springX, y: springY }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(baseStyles, variantStyles, className)}
        >
            {/* Real Fill Effect from bottom */}
            <motion.div 
                className={cn(
                    "absolute inset-0 z-0 rounded-full",
                    variant === 'primary'
                        ? 'bg-white dark:bg-neutral-900'
                        : 'bg-neutral-900 dark:bg-white'
                )}
                initial={{ y: '100%', borderRadius: '50% 50% 0 0' }}
                animate={{ 
                    y: isHovered ? '0%' : '100%',
                    borderRadius: isHovered ? '0% 0% 0 0' : '50% 50% 0 0'
                }}
                transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }} // smooth ease out
            />

            <div className={cn(
                "relative z-10 flex items-center justify-center gap-3 transition-colors duration-300 w-full h-full",
                isHovered && variant === 'outline' ? 'text-white dark:text-black' : '',
                isHovered && variant === 'primary' ? 'text-black dark:text-white' : ''
            )}>
                {children}
            </div>
        </motion.div>
    );

    if (href) {
        return (
            <Link href={href} className="block">
                {content}
            </Link>
        );
    }

    return content;
}
