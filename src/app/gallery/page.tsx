"use client";

import dynamic from "next/dynamic";
import ManifestoHero from "@/components/sections/gallery/ManifestoHero";
const CleanFilmGrid = dynamic(() => import("@/components/sections/gallery/CleanFilmGrid"), {
    ssr: false,
});
const BlogPortalFooter = dynamic(() => import("@/components/sections/gallery/BlogPortalFooter"), {
    ssr: false,
});
import { usePerformance } from "@/hooks/usePerformance";
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

export default function GalleryPage() {
    const { isLowPowerMode } = usePerformance();

    return (
        <main className="bg-background min-h-screen selection:bg-cyan-500/30 selection:text-cyan-500 overflow-x-hidden">
            <ManifestoHero isLowPowerMode={isLowPowerMode} />
            <ErrorBoundary fallback={<div className="container mx-auto py-20 text-center">Gallery Grid Unavailable</div>}>
                <CleanFilmGrid isLowPowerMode={isLowPowerMode} />
            </ErrorBoundary>
            <BlogPortalFooter isLowPowerMode={isLowPowerMode} />
        </main>
    );
}
