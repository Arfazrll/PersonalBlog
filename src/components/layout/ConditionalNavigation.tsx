'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Navbar, Footer } from '@/components/layout';
import { BackToTop } from '@/components/ui/BackToTop';

export function ConditionalNavigation({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Hide navbar and footer on project detail pages (/projects/[slug])
    // A project detail page usually has more than 2 segments (e.g., /projects/my-project)
    const segments = pathname?.split('/').filter(Boolean) || [];
    // Handle both /projects/... and /en/projects/... or /id/projects/...
    const projectsIndex = segments.indexOf('projects');
    const isProjectDetail = projectsIndex !== -1 && segments.length > projectsIndex + 1;

    // During hydration, we must match the server-side render.
    // The server-side render (and initial client render) always displays the layout
    // because it cannot know the pathname during build/SSR.
    if (isProjectDetail && isMounted) {
        return <>{children}</>;
    }

    return (
        <div className="relative min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 relative">{children}</main>
            <Footer />
            <BackToTop />
        </div>
    );
}
