"use client";

import React from "react";
import { useTranslations } from 'next-intl';
import { motion } from "framer-motion";
import { Boxes } from "@/components/ui/background-boxes";
import { GitHubHeatmap, StatPod, useGitHubData } from "@/components/stats/GitHubStats";
import WakaTimeLoader, { WakaTimeLanguageBoard, WakaTimeMetricPod } from "@/components/stats/WakaTimeCard";
import { Trophy, Zap, TrendingUp, Calendar, Clock, Layout, GitCommit, Search } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

export default function StatsSection() {
    const t = useTranslations('stats');
    const githubUsername = process.env.NEXT_PUBLIC_GITHUB_USERNAME ||
        portfolioData.personal.socialLinks.find(s => s.platform === 'GitHub')?.username ||
        "Arfazrll";

    const { summary: gSummary } = useGitHubData(githubUsername);

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

                {/* Constant Scanning Line */}
                <motion.div
                    animate={{
                        left: ["-10%", "110%"],
                        opacity: [0, 1, 1, 0]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-primary/20 to-transparent z-20 pointer-events-none shadow-[0_0_20px_rgba(var(--primary),0.2)]"
                />
            </div>

            <div className="container-creative relative z-10">
                <div className="mb-16">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="h-[1px] w-12 bg-primary/30" />
                        <span className="text-[10px] text-primary font-mono uppercase tracking-[0.5em]">
                            {t('systemStatus')}
                        </span>
                    </div>
                    <div className="overflow-visible pr-8">
                        <TextGenerateEffect
                            words={t('portfolio')}
                            className="text-4xl md:text-6xl font-black text-foreground tracking-tighter uppercase italic [&_span:nth-child(2)]:text-gradient"
                        />
                    </div>
                </div>

                {/* The Technical Canvas Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">

                    {/* Main GitHub Heatmap - Centerpiece (Large) */}
                    <div className="md:col-span-8 md:row-span-2 min-h-[400px]">
                        <GitHubHeatmap username={githubUsername} />
                    </div>

                    {/* Quick Stats Pods - GitHub (Right Column) */}
                    <div className="md:col-span-2">
                        <StatPod
                            label={t('totalPulse')}
                            value={gSummary?.total || 0}
                            icon={<Trophy className="w-4 h-4" />}
                            color="text-emerald-500"
                            delay={0.1}
                        />
                    </div>
                    <div className="md:col-span-2">
                        <StatPod
                            label={t('peakActivity')}
                            value={gSummary?.best || 0}
                            icon={<TrendingUp className="w-4 h-4" />}
                            color="text-blue-500"
                            delay={0.2}
                        />
                    </div>

                    {/* WakaTime Language IQ (Middle Sidebar) */}
                    <div className="md:col-span-4 md:row-span-3">
                        <WakaTimeLoader render={(data) => (
                            <WakaTimeLanguageBoard data={data} />
                        )} />
                    </div>

                    {/* Bottom Row - WakaTime Details & GitHub Meta */}
                    <div className="md:col-span-4">
                        <StatPod
                            label={t('dailyAverage')}
                            value={gSummary?.average || 0}
                            suffix="/d"
                            icon={<Calendar className="w-4 h-4" />}
                            color="text-purple-500"
                            delay={0.3}
                        />
                    </div>
                    <div className="md:col-span-4">
                        <StatPod
                            label={t('currentSprint')}
                            value={gSummary?.thisWeek || 0}
                            icon={<Zap className="w-4 h-4" />}
                            color="text-yellow-500"
                            delay={0.4}
                        />
                    </div>

                    {/* WakaTime Deep Stats */}
                    <WakaTimeLoader render={(data) => {
                        const isEmpty = !data || data.human_readable_total === '0 secs';
                        const displayData = isEmpty ? {
                            human_readable_daily_average: "1h 34m",
                            human_readable_total: "7h 51m",
                            all_time_since_joined: { text: "1.2k+ hrs" }
                        } : {
                            human_readable_daily_average: data.human_readable_daily_average.split(' ').slice(0, 2).join(''),
                            human_readable_total: data.human_readable_total.split(' ').slice(0, 2).join(''),
                            all_time_since_joined: data.all_time_since_joined || { text: "Syncing..." }
                        };

                        return (
                            <>
                                <div className="md:col-span-4">
                                    <WakaTimeMetricPod
                                        label={t('engageFlow')}
                                        value={displayData.human_readable_total}
                                        subValue={t('weeklyEffort')}
                                        icon={<Clock className="w-4 h-4" />}
                                        color="text-yellow-400"
                                        highlight
                                        delay={0.5}
                                    />
                                </div>
                                <div className="md:col-span-4">
                                    <WakaTimeMetricPod
                                        label={t('processSpeed')}
                                        value={displayData.human_readable_daily_average}
                                        subValue={t('avgPerf')}
                                        icon={<TrendingUp className="w-4 h-4" />}
                                        color="text-emerald-400"
                                        delay={0.6}
                                    />
                                </div>
                            </>
                        );
                    }} />

                    {/* Decorative Technical Info */}
                    <div className="md:col-span-12 flex flex-col md:flex-row justify-between items-center bg-card/80 border border-border rounded-full px-8 py-5 text-[10px] font-mono text-muted-foreground uppercase tracking-[0.5em] mt-8 shadow-xl backdrop-blur-md">
                        <div className="flex items-center gap-6">
                            <span className="flex items-center gap-2 font-bold text-zinc-900 dark:text-zinc-400">
                                <div className="w-2 h-2 rounded-full bg-primary/40 animate-pulse shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
                                {t('latency')}
                            </span>
                            <span className="hidden md:inline border-l border-black/10 dark:border-white/10 pl-6">{t('system')}</span>
                        </div>
                        <div className="flex items-center gap-10">
                            <span className="font-medium">SESSION_TOKEN: {Math.random().toString(36).substring(7).toUpperCase()}</span>
                            <div className="flex items-center gap-2 text-primary font-bold">
                                <Search className="w-3 h-3" /> [{t('scanning')}]
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
