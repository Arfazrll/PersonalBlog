'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ProjectPlaceholderProps {
    className?: string;
    title?: string;
}

// Store seeds outside the component so they persist across hovers but reset on page refresh
export const projectSeeds = new Map<string, number>();

export function getPlaceholderImageUrl(title: string) {
    if (!projectSeeds.has(title)) {
        projectSeeds.set(title, Math.floor(Math.random() * 10000));
    }
    const seed = projectSeeds.get(title);
    return `https://picsum.photos/seed/${seed}/500/300.webp`;
}

export function ProjectPlaceholder({ className, title = "No Preview Available" }: ProjectPlaceholderProps) {
    const [mounted, setMounted] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        setMounted(true);
        setImageUrl(getPlaceholderImageUrl(title));
    }, [title]);

    // Fallback while not mounted to avoid hydration mismatch
    if (!mounted) {
        return (
            <div className={cn(
                "relative w-full h-full bg-zinc-100 dark:bg-zinc-900 border border-black/10 dark:border-white/5",
                className
            )} />
        );
    }

    return (
        <div className={cn(
            "relative w-full h-full overflow-hidden",
            className
        )}>
            {imageUrl && (
                <img 
                    src={imageUrl} 
                    alt={title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700" 
                />
            )}
        </div>
    );
}
