'use client';

import React from 'react';
import { usePreloadState } from '@/components/ui/arc-preloader-hero';

interface DeferredMountProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

export function DeferredMount({ children, fallback = null }: DeferredMountProps) {
    const { phase } = usePreloadState();

    // We only defer rendering during the "intro" phase when the preloader is doing heavy animations
    // Once it hits "text", it fully covers the screen, so it's safe to mount heavy components behind it.
    // By the time "reveal" starts, the page is fully rendered and gets smoothly revealed.
    if (phase === "intro") {
        return <>{fallback}</>;
    }

    return <>{children}</>;
}
