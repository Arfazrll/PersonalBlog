'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Search } from 'lucide-react';

import { portfolioData } from '@/data/portfolio';
import { cn } from '@/lib/utils';
import type { Project } from '@/types';

type FilterType = 'all' | 'ongoing' | 'completed';

function ProjectListItem({
    project,
    index,
    onClick,
}: {
    project: Project;
    index: number;
    onClick: () => void;
}) {
    const [isHovered, setIsHovered] = useState(false);
    const isOngoing = project.status === 'ongoing';
    const displayIndex = String(index + 1).padStart(2, '0');

    return (
        <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.25) }}
            className="group relative border-b border-black/10 dark:border-white/10"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <button
                type="button"
                onClick={onClick}
                className="relative flex w-full items-center gap-4 overflow-hidden px-4 py-7 text-left transition-colors duration-300 hover:bg-black/[0.025] dark:hover:bg-white/[0.025] sm:gap-8 sm:px-8 sm:py-10"
            >
                <motion.span
                    animate={{ x: isHovered ? 5 : 0, scale: isHovered ? 1.06 : 1 }}
                    transition={{ duration: 0.25 }}
                    className={cn(
                        'shrink-0 font-black tabular-nums transition-colors duration-300',
                        'text-3xl sm:text-4xl md:text-5xl',
                        isHovered
                            ? isOngoing
                                ? 'text-emerald-500 dark:text-emerald-400'
                                : 'text-blue-500 dark:text-blue-400'
                            : 'text-muted-foreground/20'
                    )}
                >
                    {displayIndex}
                </motion.span>

                <div className="min-w-0 flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-3 sm:gap-4">
                        <motion.h2
                            animate={{ x: isHovered ? 8 : 0 }}
                            transition={{ duration: 0.25 }}
                            className="text-xl font-bold tracking-tight text-foreground sm:text-2xl md:text-3xl lg:text-4xl"
                        >
                            {project.title}
                        </motion.h2>

                        <span
                            className={cn(
                                'shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider sm:text-xs',
                                isOngoing
                                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                    : 'border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400'
                            )}
                        >
                            {isOngoing ? 'ongoing' : 'done'}
                        </span>
                    </div>

                    <p className="max-w-3xl text-sm text-muted-foreground sm:text-base">
                        {project.description}
                    </p>

                    <p
                        className={cn(
                            'mt-4 hidden font-mono text-xs tracking-wide sm:block',
                            isOngoing
                                ? 'text-emerald-600/60 dark:text-emerald-400/60'
                                : 'text-blue-600/60 dark:text-blue-400/60'
                        )}
                    >
                        {project.techStack.join(' • ')}
                    </p>
                </div>

                <motion.div
                    animate={{ x: isHovered ? 5 : 0, opacity: isHovered ? 1 : 0.45 }}
                    transition={{ duration: 0.25 }}
                    className="hidden shrink-0 items-center gap-2 sm:flex"
                >
                    <span className="text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                        view
                    </span>
                    <ArrowRight
                        className={cn(
                            'h-5 w-5 transition-colors',
                            isHovered
                                ? isOngoing
                                    ? 'text-emerald-500 dark:text-emerald-400'
                                    : 'text-blue-500 dark:text-blue-400'
                                : 'text-muted-foreground'
                        )}
                    />
                </motion.div>

                <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground sm:hidden" />
            </button>
        </motion.article>
    );
}

export default function ProjectsPage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<FilterType>('all');
    const [categoryFilter, setCategoryFilter] = useState('all');

    const projects = portfolioData.projects;

    const categories = useMemo(() => {
        const unique = Array.from(
            new Set(projects.map((project) => project.category).filter(Boolean) as string[])
        );
        return ['all', ...unique];
    }, [projects]);

    const filteredProjects = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        return projects.filter((project) => {
            const matchesSearch =
                !query ||
                project.title.toLowerCase().includes(query) ||
                project.description.toLowerCase().includes(query) ||
                project.techStack.some((tech) => tech.toLowerCase().includes(query));

            const matchesStatus =
                statusFilter === 'all' || project.status === statusFilter;

            const matchesCategory =
                categoryFilter === 'all' || project.category === categoryFilter;

            return matchesSearch && matchesStatus && matchesCategory;
        });
    }, [projects, searchQuery, statusFilter, categoryFilter]);

    return (
        <main className="min-h-screen bg-background text-foreground">
            <section className="mx-auto w-full max-w-[110rem] px-4 pb-20 pt-28 sm:px-6 md:px-12 md:pt-32">
                <header className="mb-10 border-b border-black/10 pb-8 dark:border-white/10 md:mb-14">
                    <div className="mb-8 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                        <div>
                            <div className="mb-6 flex items-center gap-3">
                                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                <p className="font-mono text-xs uppercase tracking-[0.35em] text-muted-foreground sm:text-sm">
                                    Projects Archive
                                </p>
                                <span className="rounded-md border border-black/10 px-2 py-1 font-mono text-[10px] text-muted-foreground dark:border-white/10">
                                    {projects.length}
                                </span>
                            </div>

                            <nav className="flex max-w-5xl flex-wrap gap-x-7 gap-y-3" aria-label="Project categories">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        type="button"
                                        onClick={() => setCategoryFilter(category)}
                                        className={cn(
                                            'border-b pb-2 text-sm transition-colors',
                                            categoryFilter === category
                                                ? 'border-foreground font-semibold text-foreground'
                                                : 'border-transparent text-muted-foreground hover:text-foreground'
                                        )}
                                    >
                                        {category === 'all' ? 'All Projects' : category}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        <div className="flex w-full flex-col gap-4 lg:w-auto lg:min-w-[420px]">
                            <label className="relative block">
                                <Search className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <input
                                    type="search"
                                    value={searchQuery}
                                    onChange={(event) => setSearchQuery(event.target.value)}
                                    placeholder="Search projects..."
                                    className="w-full border-b border-black/10 bg-transparent py-3 pl-7 pr-2 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-foreground dark:border-white/10 lg:min-w-[320px]"
                                />
                            </label>

                            <div className="flex flex-wrap rounded-xl border border-black/10 p-1 dark:border-white/10">
                                {(['all', 'ongoing', 'completed'] as FilterType[]).map((filter) => (
                                    <button
                                        key={filter}
                                        type="button"
                                        onClick={() => setStatusFilter(filter)}
                                        className={cn(
                                            'rounded-lg px-4 py-2 text-xs font-medium capitalize transition-colors sm:text-sm',
                                            statusFilter === filter
                                                ? 'bg-foreground text-background'
                                                : 'text-muted-foreground hover:text-foreground'
                                        )}
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </header>

                <section aria-label="Projects list" className="border-t border-black/10 dark:border-white/10">
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((project, index) => (
                            <ProjectListItem
                                key={project.id}
                                project={project}
                                index={index}
                                onClick={() => router.push(`/projects/${project.slug}`)}
                            />
                        ))
                    ) : (
                        <div className="py-24 text-center">
                            <p className="text-lg font-medium text-foreground">No projects found</p>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Try another search term or filter.
                            </p>
                        </div>
                    )}
                </section>
            </section>
        </main>
    );
}
