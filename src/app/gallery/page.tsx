"use client";

import ManifestoHero from "@/components/sections/gallery/ManifestoHero";
import CleanFilmGrid from "@/components/sections/gallery/CleanFilmGrid";
import BlogPortalFooter from "@/components/sections/gallery/BlogPortalFooter";

export default function GalleryPage() {
    return (
        <main className="bg-background min-h-screen selection:bg-cyan-500/30 selection:text-cyan-500 overflow-x-hidden">
            <ManifestoHero />
            <CleanFilmGrid />
            <BlogPortalFooter />
        </main>
    );
}
