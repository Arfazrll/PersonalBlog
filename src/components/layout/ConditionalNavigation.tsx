'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Navbar, Footer } from '@/components/layout';
import { BackToTop } from '@/components/ui/BackToTop';

export function ConditionalNavigation({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const segments = pathname?.split('/').filter(Boolean) || [];
    const projectsIndex = segments.indexOf('projects');
    const isProjectDetail = projectsIndex !== -1 && segments.length > projectsIndex + 1;
    const blogIndex = segments.indexOf('blog');
    const isBlogDetail = blogIndex !== -1 && segments.length > blogIndex + 1;

    const useFullLayout = !(isProjectDetail || isBlogDetail);

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
