'use client';

import { motion } from 'framer-motion';
import { Code2, Award, Sparkles, TrendingUp } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { Counter } from '@/components/ui/Counter';

// Calculate metrics from portfolio data
const calculateMetrics = () => {
    const totalProjects = portfolioData.projects?.length || 0;
    const completedProjects = portfolioData.projects?.filter(p => p.status === 'completed').length || 0;
    const totalTechStack = portfolioData.techStack?.length || 0;
    const totalTools = portfolioData.tools?.length || 0;

    // Calculate years of experience (assuming earliest project start date)
    const yearsExp = 2; // Hardcoded based on resume/experience

    return {
        projects: totalProjects,
        completed: completedProjects,
        techCount: totalTechStack + totalTools,
        yearsExp,
        // Creative metrics
        impactScore: '12+', // GitHub stars, downloads, or impact metric
        satisfaction: '98%'   // Client/user satisfaction rate
    };
};

interface StatCardProps {
    value: string;
    label: string;
    icon: React.ReactNode;
    delay: number;
    gradient: string;
    isLowPowerMode?: boolean;
}

const StatCard = ({ value, label, icon, delay, gradient, isLowPowerMode }: StatCardProps) => {
    return (
        <motion.div
            initial={isLowPowerMode ? { opacity: 0, y: 10 } : { opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ margin: "-100px" }}
            transition={{ duration: isLowPowerMode ? 0.4 : 0.6, delay: isLowPowerMode ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
            className="group relative"
        >
            <motion.div
                className="relative h-full p-6 sm:p-8 flex flex-col items-center justify-center text-center"
                whileHover={isLowPowerMode ? {} : { scale: 1.05, y: -8 }}
                transition={{ duration: 0.3 }}
            >
                {/* Card Content */}
                <div className="relative z-10">
                    {/* Value */}
                    <motion.div
                        className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-br from-foreground via-primary to-foreground bg-clip-text text-transparent mb-2"
                        animate={isLowPowerMode ? {} : {
                            backgroundPosition: ["0%", "100%", "0%"]
                        }}
                        transition={isLowPowerMode ? {} : {
                            duration: 5,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        style={{
                            backgroundSize: isLowPowerMode ? "100% 100%" : "200% 200%"
                        }}
                    >
                        <Counter
                            value={parseFloat(value.replace(/[^0-9.]/g, ''))}
                            decimal={value.includes('.') ? 1 : 0}
                        />
                        {value.includes('+') ? '+' : ''}
                        {value.includes('%') ? '%' : ''}
                    </motion.div>

                    {/* Label */}
                    <p className="text-sm sm:text-base font-medium text-muted-foreground uppercase tracking-wider">
                        {label}
                    </p>
                </div>

                {/* Hover Glow - Subtle */}
                {!isLowPowerMode && (
                    <motion.div
                        className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
                        style={{
                            background: `radial-gradient(circle at center, ${gradient.split(',')[0]}20, transparent 70%)`
                        }}
                    />
                )}
            </motion.div>
        </motion.div>
    );
};

export function ProjectStats({ isLowPowerMode }: { isLowPowerMode?: boolean }) {
    const metrics = calculateMetrics();

    const stats = [
        {
            value: `${metrics.projects}+`,
            label: 'Projects Built',
            icon: <Code2 className="w-6 h-6 text-primary" />,
            gradient: 'rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.3)'
        },
        {
            value: `${metrics.yearsExp}+`,
            label: 'Years Experience',
            icon: <TrendingUp className="w-6 h-6 text-emerald-500" />,
            gradient: 'rgba(16, 185, 129, 0.3), rgba(6, 182, 212, 0.3), rgba(16, 185, 129, 0.3)'
        },
        {
            value: `${metrics.techCount}+`,
            label: 'Tech Stack',
            icon: <Code2 className="w-6 h-6 text-violet-500" />,
            gradient: 'rgba(139, 92, 246, 0.3), rgba(236, 72, 153, 0.3), rgba(139, 92, 246, 0.3)'
        },
        {
            value: metrics.impactScore,
            label: 'Active Deployments',
            icon: <Award className="w-6 h-6 text-amber-500" />,
            gradient: 'rgba(245, 158, 11, 0.3), rgba(251, 146, 60, 0.3), rgba(245, 158, 11, 0.3)'
        }
    ];

    return (
        <section className="relative py-16 sm:py-20 md:py-24 overflow-hidden bg-background">

            <div className="container-creative relative z-10 px-4 sm:px-6 md:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-6"
                        animate={isLowPowerMode ? {} : { scale: [1, 1.05, 1] }}
                        transition={isLowPowerMode ? {} : { duration: 2, repeat: Infinity }}
                    >
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider">
                            Project Impact
                        </span>
                    </motion.div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-3">
                        Building The Future
                    </h2>

                    <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                        Transforming ideas into production-ready solutions that drive real-world impact
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {stats.map((stat, index) => (
                        <StatCard
                            key={stat.label}
                            {...stat}
                            delay={index * 0.1}
                            isLowPowerMode={isLowPowerMode}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
