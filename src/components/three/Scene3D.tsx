'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

interface Scene3DProps {
    className?: string;
}

export function Scene3D({ className = '' }: Scene3DProps) {
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';

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
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full animate-pulse"
                        style={{
                            width: `${Math.random() * 4 + 2}px`,
                            height: `${Math.random() * 4 + 2}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            backgroundColor: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(59,130,246,0.4)',
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 3}s`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

export default Scene3D;
