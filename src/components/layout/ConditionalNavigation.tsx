'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Navbar, Footer } from '@/components/layout';
import { BackToTop } from '@/components/ui/BackToTop';

export function ConditionalNavigation({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    // During hydration, we must match the server-side render perfectly.
    // The server-side render (and initial client render) always displays the layout
    // to prevent HTML mismatch errors.
    const [useFullLayout, setUseFullLayout] = useState(true);

    useEffect(() => {
        // After mount, we check the actual pathname to decide if we should hide the layout
        const segments = pathname?.split('/').filter(Boolean) || [];
        const projectsIndex = segments.indexOf('projects');
        const isProjectDetail = projectsIndex !== -1 && segments.length > projectsIndex + 1;
        const blogIndex = segments.indexOf('blog');
        const isBlogDetail = blogIndex !== -1 && segments.length > blogIndex + 1;

        if (isProjectDetail || isBlogDetail) {
            setUseFullLayout(false);
        } else {
            setUseFullLayout(true);
        }
    }, [pathname]);

    return (
        <div
            className={useFullLayout ? "relative min-h-screen flex flex-col" : "contents"}
        >
            {useFullLayout && <Navbar />}
            <div className={useFullLayout ? "flex-1 relative" : "contents"}>
                {children}
            </div>
            {useFullLayout && <Footer />}
            {useFullLayout && <BackToTop />}
        </div>
    );
}
