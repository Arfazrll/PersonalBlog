"use client";
import React from "react";
import { Boxes } from "@/components/ui/background-boxes";
import { GitHubStats } from "@/components/stats/GitHubStats";
import WakaTimeStats from "@/components/stats/WakaTimeStats";

export default function StatsSection() {
    return (
        <section className="relative py-32 lg:py-48 overflow-hidden bg-background">
            {/* Background Boxes - Premium Interactive Blending */}
            <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                {/* 
                    Using mask-image instead of overlay for a more natural "vanishing" effect.
                    This combines a vertical linear gradient (to hide edges) with a radial gradient (for the spotlight).
                */}
                <div
                    className="absolute inset-0 w-full h-full z-10"
                    style={{
                        WebkitMaskImage: `
                            linear-gradient(to bottom, transparent, black 30%, black 70%, transparent 100%),
                            radial-gradient(circle at center, black 0%, transparent 90%)
                        `,
                        maskImage: `
                            linear-gradient(to bottom, transparent, black 30%, black 70%, transparent 100%),
                            radial-gradient(circle at center, black 0%, transparent 90%)
                        `,
                        maskComposite: 'intersect',
                        WebkitMaskComposite: 'source-in'
                    }}
                >
                    <Boxes className="opacity-70 dark:opacity-90 scale-[1.2] translate-y-[-2%] translate-x-[-1%]" />
                </div>

                {/* Integration Glows - Overlapping gradients to mask section boundaries */}
                <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-background via-background/80 to-transparent z-20 pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/80 to-transparent z-20 pointer-events-none" />
            </div>

            <div className="container-creative relative z-10">
                <div className="text-center mb-16">
                    <span className="text-sm text-primary font-semibold uppercase tracking-widest">
                        Coding Activity
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black mt-4 text-foreground">
                        My <span className="text-gradient">Dev Stats</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[500px] md:h-[400px]">
                    <GitHubStats />
                    <WakaTimeStats />
                </div>
            </div>
        </section>
    );
}
