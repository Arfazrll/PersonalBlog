'use client';

import { useEffect, useState, useMemo } from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

interface Scene3DProps {
    className?: string;
    paused?: boolean;
}

export function Scene3D({ className = '', paused = false }: Scene3DProps) {
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';

    // Memoize random particle data to prevent recalculation on every render
    const particles = useMemo(() =>
        Array.from({ length: 15 }, () => ({
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            left: Math.random() * 100,
            top: Math.random() * 100,
            delay: Math.random() * 3,
            duration: 2 + Math.random() * 3,
        })), []
    );

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className={`absolute inset-0 -z-10 ${className}`} />;
    }

    return (
        <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
            <div
                className="absolute inset-0"
                style={{
                    background: isDark
                        ? 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%)'
                        : 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.05) 0%, transparent 70%)',
                }}
            />
            <div className="absolute inset-0 overflow-hidden">
                {particles.map((p, i) => (
                    <div
                        key={i}
                        className={cn(
                            "absolute rounded-full",
                            !paused && "animate-pulse"
                        )}
                        style={{
                            width: `${p.width}px`,
                            height: `${p.height}px`,
                            left: `${p.left}%`,
                            top: `${p.top}%`,
                            backgroundColor: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(59,130,246,0.4)',
                            animationDelay: `${p.delay}s`,
                            animationDuration: `${p.duration}s`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

export default Scene3D;
