'use client';

import { useState, useMemo, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Search, Filter, ExternalLink, Github, X, Calendar, ChevronRight, Layers } from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import { portfolioData } from '@/data/portfolio';
import { Project } from '@/types';
import { HeroParallax } from '@/components/ui/hero-parallax';
import { LogoTimeline, LogoItem } from '@/components/ui/logo-timeline';
import { Icons } from '@/components/icons';

type FilterType = 'all' | 'ongoing' | 'completed';

const ProjectCard = forwardRef<HTMLDivElement, { project: Project; onClick: () => void; index: number }>(
    ({ project, onClick, index }, ref) => {
        return (
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onClick={onClick}
                className="card-creative cursor-pointer overflow-hidden group"
            >
                <div className="aspect-video relative bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 overflow-hidden">
                    <motion.div className="absolute inset-0 flex items-center justify-center" whileHover={{ scale: 1.1, rotate: 5 }}>
                        <span className="text-6xl sm:text-7xl md:text-8xl font-black text-foreground/5">{project.title.charAt(0)}</span>
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-90" />
                    <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
                        <span className={cn('px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold glass-card', project.status === 'ongoing' ? 'text-green-400 border border-green-500/30' : 'text-blue-400 border border-blue-500/30')}>
                            {project.status}
                        </span>
                    </div>
                </div>
                <div className="p-4 sm:p-5 md:p-6">
                    <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-gradient transition-all">{project.title}</h3>
                    <p className="text-muted-foreground text-sm sm:text-base mb-3 sm:mb-4 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                        {project.techStack.slice(0, 3).map((tech) => (
                            <span key={tech} className="px-2 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-xs bg-muted/50 border border-border/50">{tech}</span>
                        ))}
                        {project.techStack.length > 3 && <span className="px-2 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-xs bg-muted/50">+{project.techStack.length - 3}</span>}
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] sm:text-xs text-muted-foreground flex items-center gap-1 sm:gap-2"><Calendar className="w-3 h-3" />{formatDate(project.startDate)}</span>
                        <span className="text-xs sm:text-sm font-medium text-gradient flex items-center gap-1">
                            View Details
                            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
                        </span>
                    </div>
                </div>
            </motion.div>
        );
    }
);
ProjectCard.displayName = 'ProjectCard';

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
    const t = useTranslations('projects');
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-xl p-2 sm:p-4 overflow-y-auto" onClick={onClose}>
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} className="glass-strong rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto relative my-2 sm:my-8" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-3 right-3 sm:top-6 sm:right-6 p-2 rounded-full hover:bg-muted/50 z-10"><X className="w-4 h-4 sm:w-5 sm:h-5" /></button>
                <div className="aspect-video relative bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20">
                    <div className="absolute inset-0 flex items-center justify-center"><span className="text-6xl sm:text-8xl md:text-[10rem] lg:text-[12rem] font-black text-foreground/5">{project.title.charAt(0)}</span></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                </div>
                <div className="p-4 sm:p-6 md:p-8 -mt-8 sm:-mt-12 md:-mt-16 relative">
                    <span className={cn('inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold glass-card mb-3 sm:mb-4', project.status === 'ongoing' ? 'text-green-400' : 'text-blue-400')}>{project.status}</span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{project.title}</h2>
                    <div className="flex flex-wrap gap-2 sm:gap-4 text-muted-foreground mb-4 sm:mb-6 text-sm">
                        <span className="flex items-center gap-1 sm:gap-2"><Calendar className="w-3 h-3 sm:w-4 sm:h-4" />{formatDate(project.startDate)} - {project.endDate ? formatDate(project.endDate) : 'Present'}</span>
                    </div>
                    <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 sm:mb-8">{project.longDescription || project.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
                        <div>
                            <h3 className="font-semibold mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base"><Layers className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />Tech Stack</h3>
                            <div className="flex flex-wrap gap-1.5 sm:gap-2">{project.techStack.map((tech) => (<span key={tech} className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm bg-primary/10 text-primary border border-primary/20">{tech}</span>))}</div>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Tools Used</h3>
                            <div className="flex flex-wrap gap-1.5 sm:gap-2">{project.tools.map((tool) => (<span key={tool} className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm bg-secondary/10 text-secondary border border-secondary/20">{tool}</span>))}</div>
                        </div>
                    </div>
                    {project.highlights && project.highlights.length > 0 && (
                        <div className="mb-6 sm:mb-8">
                            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Key Highlights</h3>
                            <ul className="space-y-2">{project.highlights.map((highlight, i) => (<li key={i} className="flex items-start gap-2 sm:gap-3 text-muted-foreground text-sm sm:text-base"><ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 mt-1 text-primary flex-shrink-0" />{highlight}</li>))}</ul>
                        </div>
                    )}
                    <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                        {project.demoUrl && (<a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-creative inline-flex items-center justify-center gap-2 text-sm sm:text-base py-2 sm:py-3"><span>{t('liveDemo')}</span><ExternalLink className="w-4 h-4" /></a>)}
                        {project.repoUrl && (<a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn-outline-creative inline-flex items-center justify-center gap-2 text-sm sm:text-base py-2 sm:py-3"><Github className="w-4 h-4" /><span>{t('sourceCode')}</span></a>)}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// Helper to map string to icon key
const getIconKey = (name: string): keyof typeof Icons => {
    const lower = name.toLowerCase().replace('.', '').replace(/\s+/g, '');
    if (lower.includes('react')) return 'react';
    if (lower.includes('next')) return 'react';
    if (lower.includes('node')) return 'ts';
    if (lower.includes('typescript')) return 'ts';
    if (lower.includes('tailwind')) return 'tailwind';
    if (lower.includes('github')) return 'gitHub';
    if (lower.includes('git')) return 'gitHub';
    return (Object.keys(Icons).find(k => lower.includes(k.toLowerCase())) as keyof typeof Icons) || 'unknown';
};

export default function ProjectsPage() {
    const t = useTranslations('projects');
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState<FilterType>('all');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const products = useMemo(() => {
        const techImages = [
            "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2832&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2670&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1531297424005-066e2c6ec9ce?q=80&w=2670&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2670&auto=format&fit=crop",
        ];

        const baseProducts = portfolioData.projects.map((p, i) => ({
            title: p.title,
            link: p.repoUrl || p.demoUrl || '#',
            thumbnail: techImages[i % techImages.length]
        }));
        return [...baseProducts, ...baseProducts, ...baseProducts].slice(0, 8);
    }, []);

    // Generate Timeline Items - delay is calculated in component based on index
    const timelineItems: LogoItem[] = useMemo(() => {
        const tech = portfolioData.techStack.map(t => t.name);
        const tools = portfolioData.tools ? portfolioData.tools.map(t => t.name) : [];
        const allItems = [...tech, ...tools];

        // Distribute across 7 rows
        const rowCount = 7;

        return allItems.map((name, index) => {
            const row = (index % rowCount) + 1;
            const duration = 22 + (row * 2); // 24s, 26s, 28s, 30s, 32s, 34s, 36s - varied speeds

            return {
                label: name,
                icon: getIconKey(name),
                animationDelay: 0, // Calculated in component
                animationDuration: duration,
                row: row
            };
        });
    }, []);

    const filteredProjects = useMemo(() => {
        let projects = [...portfolioData.projects];
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            projects = projects.filter((p) => p.title.toLowerCase().includes(query) || p.description.toLowerCase().includes(query) || p.techStack.some((t) => t.toLowerCase().includes(query)));
        }
        if (filter !== 'all') projects = projects.filter((p) => p.status === filter);
        return projects;
    }, [searchQuery, filter]);

    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
    const paginatedProjects = filteredProjects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const filters: { key: FilterType; label: string }[] = [{ key: 'all', label: t('filters.all') }, { key: 'ongoing', label: t('filters.ongoing') }, { key: 'completed', label: t('filters.completed') }];

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            <HeroParallax products={products} />

            {/* Logo Timeline - Full Width */}
            <div className="relative w-full z-10 -mt-16 mb-12">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    <LogoTimeline
                        items={timelineItems}
                        title="Technologies & Tools"
                        height="h-[380px] md:h-[480px]"
                        iconSize={18}
                        className="w-full"
                    />
                </motion.div>
            </div>

            <div className="container-creative relative z-10 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 md:px-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-col gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                        <input type="text" placeholder={t('search')} value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} className="w-full pl-11 sm:pl-14 pr-4 sm:pr-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl glass-card bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm sm:text-base" />
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                        <Filter className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
                        {filters.map((f) => (
                            <motion.button key={f.key} onClick={() => { setFilter(f.key); setCurrentPage(1); }} className={cn('px-3 py-2 sm:px-5 sm:py-3 md:py-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-medium transition-all', filter === f.key ? 'bg-gradient-to-r from-primary to-secondary text-white' : 'glass-card hover:bg-muted/50')} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>{f.label}</motion.button>
                        ))}
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10 md:mb-12">
                    <AnimatePresence mode="popLayout">{paginatedProjects.map((project, index) => (<ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} index={index} />))}</AnimatePresence>
                </div>

                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <motion.button key={i} onClick={() => setCurrentPage(i + 1)} className={cn('w-8 h-8 sm:w-10 sm:h-10 rounded-full transition-all font-medium text-sm sm:text-base', currentPage === i + 1 ? 'bg-gradient-to-r from-primary to-secondary text-white' : 'glass-card hover:bg-muted/50')} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>{i + 1}</motion.button>
                        ))}
                    </div>
                )}

                {filteredProjects.length === 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                        <Layers className="w-16 h-16 mx-auto text-white/20 mb-4" />
                        <p className="text-lg text-white/50">No projects found</p>
                    </motion.div>
                )}
            </div>

            <AnimatePresence>{selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}</AnimatePresence>
        </div>
    );
}
