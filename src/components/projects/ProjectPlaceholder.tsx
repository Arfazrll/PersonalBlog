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
            "relative w-full h-full flex flex-col items-center justify-center bg-zinc-900 border border-white/5 p-6 pb-32 text-center overflow-hidden",
            className
        )}>
            {/* Subtle Texture */}
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center gap-3 opacity-60">
                <div className="p-3 rounded-full bg-white/5 border border-white/5">
                    <ImageOff className="w-6 h-6 text-zinc-400" />
                </div>
                <div className="space-y-1">
                    <p className="text-sm font-medium text-zinc-300 uppercase tracking-wider">
                        {title}
                    </p>
                    <p className="text-[10px] text-zinc-500">
                        Project details available
                    </p>
                </div>
            </div>
        </div>
    );
}
