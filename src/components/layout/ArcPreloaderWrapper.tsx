"use client";

import { usePathname } from "next/navigation";
import { ArcRevealHero } from "@/components/ui/arc-preloader-hero";

export function ArcPreloaderWrapper({ children }: { children: React.ReactNode }) {
    return (
        <ArcRevealHero>
            {children}
        </ArcRevealHero>
    );
}
