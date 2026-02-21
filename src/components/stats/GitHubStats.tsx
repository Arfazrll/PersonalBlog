'use client';

import { useEffect, useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import { formatDistanceToNow } from 'date-fns';
import { GitCommit, Star, Trophy, Zap, TrendingUp, Calendar as CalendarIcon, Github, GitPullRequest, ChevronDown } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { animate, useMotionValue, useTransform } from 'framer-motion';
import { Counter } from '@/components/ui/Counter';

export interface GitHubSummary {
    totalStars: number;
    totalCommits: number;
    totalPRs: number;
    totalContributions: number;
    thisWeek: number;
    bestDay: number;
    average: number;
    followers: number;
    recentActivity?: any[];
}

export function useGitHubData(username: string) {
    const [summary, setSummary] = useState<GitHubSummary | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGitHubData = async () => {
            try {
                // Fetch from our new internal API
                const res = await fetch('/api/github-stats');
                if (res.ok) {
                    const json = await res.json();
                    const data = json.data;

                    // Calculate average (approximate)
                    const average = parseFloat((data.totalContributions / 365).toFixed(1));

                    setSummary({
                        ...data,
                        average
                    });
                }
            } catch (error) {
                console.error('Failed to fetch GitHub stats:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchGitHubData();
    }, [username]);

    return { summary, loading };
}

export function GitHubHeatmap({ username }: { username: string }) {
    const { theme } = useTheme();
    const t = useTranslations('technical.github');
    const [mounted, setMounted] = useState(false);
    const [showActivity, setShowActivity] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Gold/Yellow Theme for "Kontribusi GitHub"
    const goldTheme = {
        light: ['#ebedf0', '#fefce8', '#fef08a', '#facc15', '#ca8a04'],
        dark: ['#161b22', '#422006', '#854d0e', '#eab308', '#facc15'],
    };

    const { summary } = useGitHubData(username);

    if (!mounted) return null;

    return (
        <div className="w-full font-sans transition-colors duration-300">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
                <Github className="w-6 h-6 text-gray-900 dark:text-white" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white tracking-tight">
                    {t('title')}
                </h2>
            </div>
            <p className="text-gray-500 dark:text-[#8b949e] mb-6 -mt-3 text-sm">
                {t('description')}
            </p>

            {/* NEW STATS (Real-time from API) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {/* Total Contributions */}
                <StatCard
                    label="Total"
                    value={summary?.totalContributions || 0}
                    icon={<Zap className="w-4 h-4 text-orange-500" />}
                />
                {/* ... (rest of cards) ... */}

                {/* Total Commits */}
                <StatCard
                    label="Total Commits"
                    value={summary?.totalCommits || 0}
                    icon={<GitCommit className="w-4 h-4 text-blue-500" />}
                />

                {/* PRs / Merges */}
                <StatCard
                    label="PRs & Merges"
                    value={summary?.totalPRs || 0}
                    icon={<TrendingUp className="w-4 h-4 text-green-500" />}
                />

                {/* Total Stars */}
                <StatCard
                    label="Total Stars"
                    value={summary?.totalStars || 0}
                    icon={<Star className="w-4 h-4 text-yellow-500" />}
                />
            </div>

            {/* Heatmap Container - Seamless Background */}
            <div className="w-full overflow-hidden mb-10">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-gray-900 dark:text-white text-sm font-semibold uppercase tracking-wider flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        Activity Calendar
                    </h3>
                </div>

                <div className="w-full overflow-x-auto pb-2 custom-scrollbar">
                    <div className="min-w-full">
                        <GitHubCalendar
                            username={username}
                            colorScheme={theme === 'dark' ? 'dark' : 'light'}
                            theme={goldTheme}
                            blockMargin={4}
                            blockSize={23}
                            fontSize={14}
                            showTotalCount={false}
                            showColorLegend={false}
                            labels={{
                                months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                                weekdays: ['Dom', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
                                totalCount: '{{count}} contributions in {{year}}',
                                legend: {
                                    less: t('less'),
                                    more: t('more'),
                                },
                            }}
                        />
                    </div>
                </div>

                {/* Custom Legend */}
                <div className="flex items-center gap-2 mt-4 text-xs text-gray-500 dark:text-[#8b949e]">
                    <span>{t('less')}</span>
                    <div className="flex gap-1">
                        {(theme === 'dark' ? goldTheme.dark : goldTheme.light).map((color, i) => (
                            <div key={i} className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
                        ))}
                    </div>
                    <span>{t('more')}</span>
                </div>
            </div>

            {/* Recent Activity Feed - Collapsible */}
            {summary?.recentActivity && summary.recentActivity.length > 0 && (
                <div className="w-full mb-8">
                    <button
                        onClick={() => setShowActivity(!showActivity)}
                        className="w-full flex items-center justify-between group py-2"
                    >
                        <h3 className="text-gray-900 dark:text-white text-sm font-semibold uppercase tracking-wider flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                            Recent Activity
                        </h3>
                        <div className={`p-1 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors`}>
                            <ChevronDown className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-300 ${showActivity ? 'rotate-180' : ''}`} />
                        </div>
                    </button>

                    <motion.div
                        initial={false}
                        animate={{ height: showActivity ? 'auto' : 0, opacity: showActivity ? 1 : 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="flex flex-col pt-2">
                            {summary.recentActivity.map((activity, idx) => (
                                <div key={idx} className="group flex items-center py-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors px-2 rounded-lg">
                                    <span className="text-xs font-mono text-gray-400 dark:text-gray-600 w-8">
                                        {String(idx + 1).padStart(2, '0')}
                                    </span>
                                    <div className="flex-1 flex flex-row items-center justify-between gap-4">
                                        <span className="text-sm md:text-base font-medium text-gray-900 dark:text-gray-200 group-hover:text-blue-500 transition-colors truncate">
                                            {activity.type === 'push' ? (
                                                <>Pushed to <span className="text-gray-500 dark:text-gray-500 group-hover:text-blue-400 transition-colors">{activity.repo}</span></>
                                            ) : (
                                                <>{activity.status === 'merged' ? 'Merged PR in' : 'Opened PR in'} <span className="text-gray-500 dark:text-gray-500 group-hover:text-blue-400 transition-colors">{activity.repo}</span></>
                                            )}
                                        </span>
                                        <span className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-600 whitespace-nowrap">
                                            {formatDistanceToNow(new Date(activity.date), { addSuffix: true })}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}

function StatCard({ label, value, icon }: { label: string, value: string | number, icon?: React.ReactNode }) {
    return (
        <div className="relative group p-3 border border-gray-200 dark:border-[#30363d] rounded-xl hover:border-yellow-500/30 dark:hover:border-yellow-500/30 transition-all duration-300 bg-transparent hover:bg-gray-50/50 dark:hover:bg-[#161b22]/50">
            <div className="flex items-center gap-2 mb-2">
                <div className="p-1 rounded-md text-gray-500 dark:text-gray-400 group-hover:text-yellow-500 transition-colors duration-300">
                    {icon}
                </div>
                <span className="text-gray-500 dark:text-[#8b949e] text-[10px] font-medium uppercase tracking-wider">{label}</span>
            </div>
            <span className="text-base md:text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                <Counter value={typeof value === 'string' ? parseFloat(value) : value} decimal={typeof value === 'string' && value.includes('.') ? 1 : 0} />
                {typeof value === 'string' && value.includes('+') ? '+' : ''}
            </span>
        </div>
    );
}

export function StatPod({ label, value, icon, color, delay, suffix = "" }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay }}
            className="relative flex flex-col justify-between p-6 bg-card/85 border border-border rounded-[2rem] backdrop-blur-xl group hover:border-emerald-500/40 h-full overflow-hidden shadow-lg transition-all duration-500"
        >
            <div className={`absolute top-0 right-0 w-24 h-24 blur-3xl opacity-10 transition-opacity group-hover:opacity-20 ${color.replace('text-', 'bg-')}`} />

            <div className="flex items-center gap-3 relative z-10">
                <div className={`p-2 rounded-lg bg-white/5 border border-white/5 group-hover:border-white/20 transition-colors ${color}`}>
                    {icon}
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-bold group-hover:text-foreground transition-colors">{label}</span>
            </div>

            <div className="mt-4 relative z-10">
                <div className="text-3xl font-black tracking-tighter text-foreground group-hover:scale-105 transition-transform origin-left">
                    {value}<span className="text-xs font-normal text-muted-foreground/50 ml-1">{suffix}</span>
                </div>
            </div>

            {/* Inset Decorative Element */}
            <div className="absolute -bottom-2 -right-2 w-12 h-12 border-t border-l border-white/5 rounded-tl-2xl opacity-50" />
        </motion.div>
    );
}
