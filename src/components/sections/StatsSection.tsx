import React from "react";
import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from "framer-motion";
import { GitHubHeatmap } from "@/components/stats/GitHubStats";
import WakaTimeLoader, { WakaTimeDashboard } from "@/components/stats/WakaTimeCard";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { portfolioData } from "@/data/portfolio";

export default function StatsSection({ scrollYProgress }: { scrollYProgress?: any }) {
    // Default progress if not provided
    const internalScroll = useScroll();
    const progress = scrollYProgress || internalScroll.scrollYProgress;

    // Content translation: Slower movement to match the 1000vh depth
    // Adjusted to end at 0.8 mark (800vh entry point for next section)
    const contentY = useTransform(progress, [0.1, 0.8], ["0%", "-55%"]);

    // Cinematic transformations: delayed until the next section starts appearing
    const scale = useTransform(progress, [0.9, 0.98], [1, 0.95]);
    const opacity = useTransform(progress, [0.92, 0.999], [1, 0]);
    const blur = useTransform(progress, [0.92, 0.999], ["0px", "5px"]);








    const t = useTranslations('stats');
    const githubUsername = process.env.NEXT_PUBLIC_GITHUB_USERNAME ||
        portfolioData.personal.socialLinks.find(s => s.platform === 'GitHub')?.username ||
        "Arfazrll";

    return (
        <section className="relative pb-0 pt-0 bg-background">
            {/* Background Layer - Boxes Removed */}

            <motion.div
                style={{ scale, opacity, filter: blur, y: contentY, willChange: "transform" }}
                className="max-w-[1600px] mx-auto relative z-10 px-6 md:px-12 lg:px-24 w-full pt-20"
            >
                <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full flex flex-col gap-6"
                >
                    <div className="mb-12 flex flex-col md:flex-row items-end justify-between border-b border-black/10 dark:border-white/[0.02] pb-8 gap-8">
                        <div className="flex flex-col gap-4">
                            <motion.h2
                                animate={{ opacity: 1, x: 0 }}
                                initial={{ opacity: 0, x: -20 }}
                                className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9]"
                            >
                                <span className="text-foreground block">ENGINEERING</span>
                                <span className="text-yellow-600 dark:text-yellow-500 block">METRICS</span>
                            </motion.h2>
                            <motion.div
                                animate={{ opacity: 1 }}
                                initial={{ opacity: 0 }}
                                transition={{ delay: 0.2 }}
                                className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-gray-500 dark:text-white/30"
                            >
                                ANALYTICS / INFRASTRUCTURE / PERFORMANCE DATA
                            </motion.div>
                        </div>

                        <div className="text-right flex flex-col items-end gap-1.5 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-gray-500 dark:text-white/20">
                            <motion.div
                                animate={{ opacity: 1, x: 0 }}
                                initial={{ opacity: 0, x: 10 }}
                                className="flex items-center gap-2"
                            >
                                <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                                <span>STATUS: ONLINE</span>
                            </motion.div>
                            <motion.div
                                animate={{ opacity: 1, x: 0 }}
                                initial={{ opacity: 0, x: 10 }}
                                transition={{ delay: 0.1 }}
                            >
                                SYSTEM_LOAD: STABLE
                            </motion.div>
                            <motion.div
                                animate={{ opacity: 1, x: 0 }}
                                initial={{ opacity: 0, x: 10 }}
                                transition={{ delay: 0.2 }}
                            >
                                LATENCY: 14MS
                            </motion.div>
                        </div>
                    </div>

                    {/* The Technical Canvas - Original Dashboard Layout (Stacked) */}
                    <div className="flex flex-col gap-8 w-full pb-12">
                        {/* GitHub Dashboard - Nested Staggered Entry */}
                        <motion.div
                            animate={{ opacity: 1, y: 0 }}
                            initial={{ opacity: 0, y: 30 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="w-full scale-95 md:scale-100 origin-top"
                        >
                            <GitHubHeatmap username={githubUsername} />
                        </motion.div>

                        {/* WakaTime Dashboard - Nested Staggered Entry */}
                        <motion.div
                            animate={{ opacity: 1, y: 0 }}
                            initial={{ opacity: 0, y: 30 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="w-full scale-90 md:scale-95 origin-top"
                        >
                            <WakaTimeLoader render={(data: any) => (
                                <WakaTimeDashboard data={data} />
                            )} />
                        </motion.div>
                    </div>
                </motion.div>
                {/* Safety Spacer: Ensures next section hits empty space first */}
                <div className="h-[40vh]" />
            </motion.div>
        </section >
    );
}
