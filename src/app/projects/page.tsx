'use client';

import { useState, useMemo, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Search, Filter, ExternalLink, Github, X, Calendar, ChevronRight, Layers } from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import { portfolioData } from '@/data/portfolio';
import { Project } from '@/types';

type FilterType = 'all' | 'ongoing' | 'completed';

function FloatingShape({ className, gradient, delay = 0 }: { className?: string; gradient: string; delay?: number }) {
    return (
        <motion.div
            className={`absolute rounded-full blur-3xl opacity-20 pointer-events-none ${className}`}
            style={{ background: gradient }}
            animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 8, repeat: Infinity, delay }}
        />
    );
}

function TechMarquee({ items, direction = 'left', speed = 25 }: { items: string[]; direction?: 'left' | 'right'; speed?: number }) {
    const duplicatedItems = [...items, ...items, ...items];
    return (
        <div className="relative overflow-hidden py-3">
            <motion.div className="flex gap-3" animate={{ x: direction === 'left' ? ['0%', '-33.33%'] : ['-33.33%', '0%'] }} transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}>
                {duplicatedItems.map((item, index) => (
                    <span key={`${item}-${index}`} className="px-4 py-2 rounded-full text-sm glass-card whitespace-nowrap">{item}</span>
                ))}
            </motion.div>
        </div>
    );
}

const ProjectCard = forwardRef<HTMLDivElement, { project: Project; onClick: () => void; index: number }>(
    ({ project, onClick, index }, ref) => {
        return (
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                onClick={onClick}
                className="card-creative cursor-pointer overflow-hidden group"
            >
                <div className="aspect-video relative bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 overflow-hidden">
                    <motion.div className="absolute inset-0 flex items-center justify-center" whileHover={{ scale: 1.1, rotate: 5 }}>
                        <span className="text-8xl font-black text-white/10">{project.title.charAt(0)}</span>
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-90" />
                    <div className="absolute top-4 right-4">
                        <span className={cn('px-3 py-1.5 rounded-full text-xs font-semibold glass-card', project.status === 'ongoing' ? 'text-green-400 border border-green-500/30' : 'text-blue-400 border border-blue-500/30')}>
                            {project.status}
                        </span>
                    </div>
                </div>
                <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-gradient transition-all">{project.title}</h3>
                    <p className="text-white/60 mb-4 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.techStack.slice(0, 4).map((tech) => (
                            <span key={tech} className="px-2 py-1 rounded-lg text-xs bg-white/5 border border-white/10">{tech}</span>
                        ))}
                        {project.techStack.length > 4 && <span className="px-2 py-1 rounded-lg text-xs bg-white/5">+{project.techStack.length - 4}</span>}
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-white/40 flex items-center gap-2"><Calendar className="w-3 h-3" />{formatDate(project.startDate)}</span>
                        <span className="text-sm font-medium text-gradient flex items-center gap-1">
                            View Details
                            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-xl p-4 overflow-y-auto" onClick={onClose}>
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="glass-strong rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative my-8" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 z-10"><X className="w-5 h-5" /></button>
                <div className="aspect-video relative bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20">
                    <div className="absolute inset-0 flex items-center justify-center"><span className="text-[12rem] font-black text-white/5">{project.title.charAt(0)}</span></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                </div>
                <div className="p-8 -mt-16 relative">
                    <span className={cn('inline-block px-4 py-1.5 rounded-full text-sm font-semibold glass-card mb-4', project.status === 'ongoing' ? 'text-green-400' : 'text-blue-400')}>{project.status}</span>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h2>
                    <div className="flex flex-wrap gap-4 text-white/60 mb-6">
                        <span className="flex items-center gap-2"><Calendar className="w-4 h-4" />{formatDate(project.startDate)} - {project.endDate ? formatDate(project.endDate) : 'Present'}</span>
                    </div>
                    <p className="text-lg text-white/70 mb-8">{project.longDescription || project.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div>
                            <h3 className="font-semibold mb-4 flex items-center gap-2"><Layers className="w-5 h-5 text-primary" />Tech Stack</h3>
                            <div className="flex flex-wrap gap-2">{project.techStack.map((tech) => (<span key={tech} className="px-3 py-1.5 rounded-full text-sm bg-primary/10 text-primary border border-primary/20">{tech}</span>))}</div>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Tools Used</h3>
                            <div className="flex flex-wrap gap-2">{project.tools.map((tool) => (<span key={tool} className="px-3 py-1.5 rounded-full text-sm bg-secondary/10 text-secondary border border-secondary/20">{tool}</span>))}</div>
                        </div>
                    </div>
                    {project.highlights && project.highlights.length > 0 && (
                        <div className="mb-8">
                            <h3 className="font-semibold mb-4">Key Highlights</h3>
                            <ul className="space-y-2">{project.highlights.map((highlight, i) => (<li key={i} className="flex items-start gap-3 text-white/70"><ChevronRight className="w-4 h-4 mt-1 text-primary flex-shrink-0" />{highlight}</li>))}</ul>
                        </div>
                    )}
                    <div className="flex flex-wrap gap-4">
                        {project.demoUrl && (<a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-creative inline-flex items-center gap-2"><span>{t('liveDemo')}</span><ExternalLink className="w-4 h-4" /></a>)}
                        {project.repoUrl && (<a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn-outline-creative inline-flex items-center gap-2"><Github className="w-4 h-4" /><span>{t('sourceCode')}</span></a>)}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function ProjectsPage() {
    const t = useTranslations('projects');
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState<FilterType>('all');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;

    const allTechStack = Array.from(new Set(portfolioData.projects.flatMap((p) => p.techStack)));
    const allTools = Array.from(new Set(portfolioData.projects.flatMap((p) => p.tools)));

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
        <div className="min-h-screen pt-32 pb-20 relative overflow-hidden">
            <FloatingShape className="w-[600px] h-[600px] -top-40 -left-40" gradient="radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)" />
            <FloatingShape className="w-[500px] h-[500px] bottom-20 -right-40" gradient="radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)" delay={3} />

            <div className="container-creative relative">
                <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
                    <motion.span className="inline-block px-4 py-2 rounded-full glass-card text-sm font-medium mb-6" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>My Work</motion.span>
                    <h1 className="heading-lg mb-4">{t('title')}</h1>
                    <p className="subheading max-w-xl mx-auto">{t('subtitle')}</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-12">
                    <TechMarquee items={allTechStack} direction="left" speed={20} />
                    <TechMarquee items={allTools} direction="right" speed={25} />
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-col sm:flex-row gap-4 mb-12">
                    <div className="relative flex-1">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <input type="text" placeholder={t('search')} value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} className="w-full pl-14 pr-5 py-4 rounded-2xl glass-card bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-white/40" />
                        {filters.map((f) => (
                            <motion.button key={f.key} onClick={() => { setFilter(f.key); setCurrentPage(1); }} className={cn('px-5 py-4 rounded-2xl text-sm font-medium transition-all', filter === f.key ? 'bg-gradient-to-r from-primary to-secondary text-white' : 'glass-card hover:bg-white/10')} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>{f.label}</motion.button>
                        ))}
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    <AnimatePresence mode="popLayout">{paginatedProjects.map((project, index) => (<ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} index={index} />))}</AnimatePresence>
                </div>

                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2">
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <motion.button key={i} onClick={() => setCurrentPage(i + 1)} className={cn('w-10 h-10 rounded-full transition-all font-medium', currentPage === i + 1 ? 'bg-gradient-to-r from-primary to-secondary text-white' : 'glass-card hover:bg-white/10')} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>{i + 1}</motion.button>
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
