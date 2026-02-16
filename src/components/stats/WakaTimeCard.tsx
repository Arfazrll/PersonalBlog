'use client';

import { motion } from 'framer-motion';
import { Clock, Calendar, TrendingUp, Trophy, Activity, Target } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

export function WakaTimeDashboard({ data }: { data: any }) {
    const t = useTranslations('technical.wakatime');
    const [githubLanguages, setGithubLanguages] = useState<any[]>([]);

    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const res = await fetch('/api/github-languages');
                if (res.ok) {
                    const json = await res.json();
                    if (json.data) {
                        setGithubLanguages(json.data);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch GitHub languages:', error);
            }
        };
        fetchLanguages();
    }, []);

    // Colors for fallback
    const FALLBACK_COLORS = ['#FACC15', '#EAB308', '#CA8A04', '#A16207', '#854D0E', '#713F12'];

    // Mock Data and fallback logic
    const stats = {
        startDate: "January 17, 2026",
        endDate: "January 23, 2026",
        dailyAvg: data?.human_readable_daily_average || "1 hr 34 mins",
        weeklyTotal: data?.human_readable_total || "7 hrs 51 mins",
        bestDay: data?.best_day?.text || "6 hrs 21 mins",
        totalTime: data?.all_time_since_joined?.text || "1,031 hrs 47 mins",
        languages: githubLanguages.length > 0 ? githubLanguages : (data?.languages?.slice(0, 6) || [
            { name: "TypeScript", percent: 83, color: '#3178c6' },
            { name: "JSON", percent: 5, color: '#FACC15' },
            { name: "Kotlin", percent: 4, color: '#A97BFF' },
            { name: "XML", percent: 3, color: '#EAB308' },
            { name: "Python", percent: 3, color: '#3572A5' },
            { name: "HTML", percent: 2, color: '#E34C26' }
        ])
    };

    return (
        <div className="w-full font-sans transition-colors duration-300">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <Clock className="w-8 h-8 text-gray-900 dark:text-white" />
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white tracking-tight">
                    {t('title')}
                </h2>
            </div>
            <p className="text-gray-500 dark:text-[#8b949e] mb-8 -mt-6">
                {t('description')}
                <span className="float-right text-xs mt-1 text-gray-400 dark:text-[#8b949e]">Last updated: Recently</span>
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                <WakaStat
                    label={t('startDate')}
                    value={stats.startDate}
                    icon={<Calendar className="w-4 h-4 text-blue-500" />}
                />
                <WakaStat
                    label={t('endDate')}
                    value={stats.endDate}
                    icon={<Target className="w-4 h-4 text-purple-500" />}
                />
                <WakaStat
                    label={t('dailyAverage')}
                    value={stats.dailyAvg}
                    icon={<Activity className="w-4 h-4 text-green-500" />}
                    highlight
                />
                <WakaStat
                    label={t('totalWeek')}
                    value={stats.weeklyTotal}
                    icon={<TrendingUp className="w-4 h-4 text-yellow-500" />}
                    highlight
                />
                <WakaStat
                    label={t('bestDay')}
                    value={stats.bestDay} // Removed date to keep it cleaner
                    icon={<Trophy className="w-4 h-4 text-orange-500" />}
                />
                <WakaStat
                    label={t('totalSince')}
                    value={stats.totalTime}
                    icon={<Clock className="w-4 h-4 text-red-500" />}
                />
            </div>

            {/* Language Bars Section - Seamless Background */}
            <div className="w-full px-0">
                <h3 className="text-gray-900 dark:text-white mb-6 text-sm font-semibold uppercase tracking-wider flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
                    {t('topLanguages')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                    {stats.languages.map((lang: any, idx: number) => (
                        <div key={lang.name} className="group">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">{lang.name}</span>
                                <span className="text-gray-500 dark:text-gray-400 font-mono text-xs">{Math.round(lang.percent)}%</span>
                            </div>
                            <div className="h-2 bg-gray-200 dark:bg-[#30363d] rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${lang.percent}%` }}
                                    transition={{ duration: 1.2, ease: "easeOut" }}
                                    className="h-full rounded-full relative"
                                    style={{ backgroundColor: lang.color || FALLBACK_COLORS[idx % FALLBACK_COLORS.length] }}
                                >
                                    <div className="absolute inset-0 bg-white/20" />
                                </motion.div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function WakaStat({ label, value, icon, highlight = false }: { label: string, value: string, icon?: React.ReactNode, highlight?: boolean }) {
    return (
        <div className="relative group p-4 md:p-5 border border-gray-200 dark:border-[#30363d] rounded-xl hover:border-yellow-500/30 dark:hover:border-yellow-500/30 transition-all duration-300 bg-transparent hover:bg-gray-50/50 dark:hover:bg-[#161b22]/50">
            <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-md text-gray-500 dark:text-gray-400 group-hover:text-yellow-500 transition-colors duration-300">
                    {icon}
                </div>
                <span className="text-gray-500 dark:text-[#8b949e] text-xs font-medium uppercase tracking-wider">{label}</span>
            </div>
            <span className={`text-lg md:text-xl font-bold tracking-tight ${highlight ? 'text-yellow-600 dark:text-yellow-400' : 'text-gray-900 dark:text-white'}`}>
                {value}
            </span>
        </div>
    );
}

export default function GenericWakaTimeLoader({ children, render }: { children?: React.ReactNode, render: (data: any) => React.ReactNode }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/wakatime');
                if (res.ok) {
                    const json = await res.json();
                    setData(json.data);
                }
            } catch (error) {
                console.error('Failed to fetch WakaTime stats:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return null;
    return <>{render(data)}</>;
}
