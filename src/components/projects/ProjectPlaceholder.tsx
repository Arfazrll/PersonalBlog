'use client';

import { cn } from '@/lib/utils';
import { ImageOff } from 'lucide-react';

interface ProjectPlaceholderProps {
    className?: string;
    title?: string;
}

export function ProjectPlaceholder({ className, title = "No Preview Available" }: ProjectPlaceholderProps) {
    return (
        <div className={cn(
            "relative w-full h-full flex flex-col items-center justify-center bg-zinc-100 dark:bg-zinc-900 border border-black/10 dark:border-white/5 p-6 pb-32 text-center overflow-hidden",
            className
        )}>
            {/* Subtle Texture */}
            <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '24px 24px' }} />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center gap-3 opacity-60">
                <div className="relative z-10 w-16 h-16 rounded-3xl bg-black/10 dark:bg-white/5 flex items-center justify-center mb-6 border border-black/10 dark:border-white/5">
                    <ImageOff className="w-8 h-8 text-zinc-500 dark:text-zinc-500" /> {/* Changed to ImageOff as Box is not imported */}
                </div>
                <div className="relative z-10 max-w-[240px]">
                    <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-100 mb-2 leading-tight">
                        {title}
                    </h3>
                    <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                        Project details available {/* Replaced {t('placeholderDescription')} with original text */}
                    </p>
                </div>
            </div>
        </div>
    );
}
