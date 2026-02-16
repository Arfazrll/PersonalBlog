import React from "react";
import { useTranslations } from 'next-intl';
import { motion } from "framer-motion";
import { Boxes } from "@/components/ui/background-boxes";
import { GitHubHeatmap } from "@/components/stats/GitHubStats";
import WakaTimeLoader, { WakaTimeDashboard } from "@/components/stats/WakaTimeCard";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { portfolioData } from "@/data/portfolio";

export default function StatsSection() {
    const t = useTranslations('stats');
    const githubUsername = process.env.NEXT_PUBLIC_GITHUB_USERNAME ||
        portfolioData.personal.socialLinks.find(s => s.platform === 'GitHub')?.username ||
        "Arfazrll";

    return (
        <section className="relative py-24 lg:py-32 overflow-hidden bg-background">
            {/* Background Canvas Layer */}
            <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                <div
                    className="absolute inset-0 w-full h-full z-10"
                    style={{
                        WebkitMaskImage: `
                            radial-gradient(circle at 50% 50%, black 0%, transparent 70%)
                        `,
                        maskImage: `
                            radial-gradient(circle at 50% 50%, black 0%, transparent 70%)
                        `,
                    }}
                >
                    <Boxes className="opacity-30 dark:opacity-40 scale-[1.1]" />
                </div>


            </div>

            <div className="container-creative relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="mb-20 flex flex-col md:flex-row items-end justify-between border-b border-black/10 dark:border-white/10 pb-12 gap-8">
                        <div className="flex flex-col gap-4">
                            <motion.h2
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]"
                            >
                                <span className="text-gray-900 dark:text-white block">TECHNICAL</span>
                                <span className="text-yellow-600 dark:text-yellow-500 block">PORTFOLIO</span>
                            </motion.h2>
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-gray-500 dark:text-white/30"
                            >
                                ANALYTICS / INFRASTRUCTURE / PERFORMANCE METRICS
                            </motion.div>
                        </div>

                        <div className="text-right flex flex-col items-end gap-1.5 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-gray-500 dark:text-white/20">
                            <motion.div
                                initial={{ opacity: 0, x: 10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-2"
                            >
                                <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                                <span>STATUS: ONLINE</span>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                SYSTEM_LOAD: STABLE
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                LATENCY: 14MS
                            </motion.div>
                        </div>
                    </div>

                    {/* The Technical Canvas - New Dashboard Layout (Stacked) */}
                    <div className="flex flex-col gap-32 max-w-[1400px] mx-auto">
                        {/* GitHub Dashboard */}
                        <div className="w-full">
                            <GitHubHeatmap username={githubUsername} />
                        </div>

                        {/* WakaTime Dashboard */}
                        <div className="w-full">
                            <WakaTimeLoader render={(data: any) => (
                                <WakaTimeDashboard data={data} />
                            )} />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
