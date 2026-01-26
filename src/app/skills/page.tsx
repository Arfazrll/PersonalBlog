'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Code2, Brain, Wrench, X } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { portfolioData } from '@/data/portfolio';

// Tech logo mapping using devicon CDN
const techLogos: Record<string, string> = {
    'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'Next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    'Vue.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
    'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    'Tailwind CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
    'PostgreSQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    'MongoDB': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    'Redis': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
    'AWS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
    'Docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    'Git': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    'HTML': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    'CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    'Sass': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg',
    'GraphQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg',
    'Firebase': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
    'Kubernetes': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
    'Linux': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
    'Rust': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg',
    'Go': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',
    'Java': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    'Spring': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
    'MySQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    'Express': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
    'NestJS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg',
    'Angular': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
    'Svelte': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg',
};

// Tool logo mapping
const toolLogos: Record<string, string> = {
    'VS Code': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
    'WebStorm': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webstorm/webstorm-original.svg',
    'Figma': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
    'Notion': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/notion/notion-original.svg',
    'Slack': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg',
    'GitHub': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
    'Jira': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg',
    'Postman': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg',
    'Chrome': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chrome/chrome-original.svg',
    'Trello': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/trello/trello-plain.svg',
    'GitLab': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg',
    'Bitbucket': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bitbucket/bitbucket-original.svg',
    'IntelliJ': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg',
    'PyCharm': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pycharm/pycharm-original.svg',
    'Xcode': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xcode/xcode-original.svg',
    'Android Studio': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg',
    'Vim': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vim/vim-original.svg',
    'Bash': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg',
    'npm': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg',
    'Yarn': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/yarn/yarn-original.svg',
};

function FloatingShape({ className, delay = 0 }: { className?: string; delay?: number }) {
    return (
        <>
            <motion.div
                className={`absolute rounded-full blur-3xl opacity-20 dark:block hidden ${className}`}
                style={{ background: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%)' }}
                animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
                transition={{ duration: 8, repeat: Infinity, delay }}
            />
            <motion.div
                className={`absolute rounded-full blur-3xl opacity-30 dark:hidden block ${className}`}
                style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)' }}
                animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
                transition={{ duration: 8, repeat: Infinity, delay }}
            />
        </>
    );
}

function TechCarousel({ items, direction = 'left', speed = 30 }: { items: typeof portfolioData.techStack; direction?: 'left' | 'right'; speed?: number }) {
    const [isPaused, setIsPaused] = useState(false);
    const duplicatedItems = [...items, ...items];

    return (
        <div
            className="relative overflow-hidden py-4"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <motion.div
                className="flex gap-6"
                animate={{ x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'] }}
                transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
                style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
            >
                {duplicatedItems.map((tech, index) => {
                    const logoUrl = techLogos[tech.name];
                    return (
                        <motion.div
                            key={`${tech.name}-${index}`}
                            className="flex items-center gap-3 px-6 py-4 rounded-2xl glass-card whitespace-nowrap"
                            whileHover={{ scale: 1.05, y: -3 }}
                        >
                            {logoUrl ? (
                                <div className="w-10 h-10 relative flex-shrink-0">
                                    <Image
                                        src={logoUrl}
                                        alt={tech.name}
                                        width={40}
                                        height={40}
                                        className="object-contain"
                                        unoptimized
                                    />
                                </div>
                            ) : (
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center flex-shrink-0">
                                    <span className="text-sm font-bold">{tech.name.charAt(0)}</span>
                                </div>
                            )}
                            <span className="font-medium">{tech.name}</span>
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
}

function SkillBar({ name, level }: { name: string; level?: 'beginner' | 'intermediate' | 'advanced' | 'expert' }) {
    const levelPercentage = { beginner: 25, intermediate: 50, advanced: 75, expert: 95 };
    const percentage = level ? levelPercentage[level] : 50;

    return (
        <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group"
        >
            <div className="flex justify-between mb-2">
                <span className="font-medium">{name}</span>
                <span className="text-sm text-muted-foreground capitalize">{level}</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
                    className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                />
            </div>
        </motion.div>
    );
}

function ToolsCloud() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
    const [selectedTool, setSelectedTool] = useState<typeof portfolioData.tools[0] | null>(null);

    const toolPositions = portfolioData.tools.map((_, i) => ({
        x: 10 + (i % 4) * 22 + Math.random() * 8,
        y: 10 + Math.floor(i / 4) * 35 + Math.random() * 10,
        rotate: Math.random() * 10 - 5,
        scale: 0.85 + Math.random() * 0.3,
    }));

    return (
        <motion.section ref={containerRef} className="relative min-h-[600px] py-20" style={{ opacity }}>
            <div className="container-creative">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="p-3 rounded-xl bg-muted">
                            <Wrench className="w-6 h-6 text-foreground" />
                        </div>
                        <h2 className="text-2xl font-bold">Tools & Software</h2>
                    </div>
                    <p className="text-muted-foreground">Click to explore</p>
                </motion.div>

                <div className="relative h-[400px]">
                    {portfolioData.tools.map((tool, index) => {
                        const logoUrl = toolLogos[tool.name];
                        return (
                            <motion.div
                                key={tool.name}
                                className="absolute cursor-pointer"
                                style={{ left: `${toolPositions[index].x}%`, top: `${toolPositions[index].y}%` }}
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: toolPositions[index].scale, rotate: toolPositions[index].rotate }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08, type: 'spring' }}
                                whileHover={{ scale: toolPositions[index].scale * 1.15, rotate: 0, zIndex: 10 }}
                                onClick={() => setSelectedTool(tool)}
                            >
                                <div className="card-creative p-4 md:p-5">
                                    {logoUrl ? (
                                        <div className="w-12 h-12 md:w-14 md:h-14 relative mb-2">
                                            <Image
                                                src={logoUrl}
                                                alt={tool.name}
                                                width={56}
                                                height={56}
                                                className="object-contain dark:invert-0"
                                                unoptimized
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-muted flex items-center justify-center mb-2">
                                            <span className="text-lg md:text-xl font-bold">{tool.name.charAt(0)}</span>
                                        </div>
                                    )}
                                    <span className="text-sm font-medium whitespace-nowrap">{tool.name}</span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            <AnimatePresence>
                {selectedTool && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-xl p-4"
                        onClick={() => setSelectedTool(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="glass-strong rounded-3xl p-8 max-w-md w-full relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button onClick={() => setSelectedTool(null)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted">
                                <X className="w-5 h-5" />
                            </button>
                            <div className="flex items-center gap-4 mb-6">
                                {toolLogos[selectedTool.name] ? (
                                    <div className="w-16 h-16 relative">
                                        <Image
                                            src={toolLogos[selectedTool.name]}
                                            alt={selectedTool.name}
                                            width={64}
                                            height={64}
                                            className="object-contain"
                                            unoptimized
                                        />
                                    </div>
                                ) : (
                                    <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
                                        <span className="text-2xl font-bold">{selectedTool.name.charAt(0)}</span>
                                    </div>
                                )}
                                <div>
                                    <h3 className="text-2xl font-bold">{selectedTool.name}</h3>
                                    <p className="text-muted-foreground capitalize">{selectedTool.category}</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.section>
    );
}

export default function SkillsPage() {
    const t = useTranslations('skills');

    const frontendTech = portfolioData.techStack.filter((t) => t.category === 'framework' || t.category === 'library');
    const backendTech = portfolioData.techStack.filter((t) => t.category === 'language' || t.category === 'database');

    return (
        <div className="min-h-screen pt-32 relative overflow-hidden">
            <FloatingShape className="w-[600px] h-[600px] -top-40 -left-40" />
            <FloatingShape className="w-[500px] h-[500px] top-1/2 -right-40" delay={2} />

            <div className="container-creative pb-20 relative">
                <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
                    <motion.span className="inline-block px-4 py-2 rounded-full glass-card text-sm font-medium mb-6" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
                        What I Use
                    </motion.span>
                    <h1 className="heading-lg mb-4">{t('title')}</h1>
                    <p className="subheading max-w-xl mx-auto">{t('subtitle')}</p>
                </motion.div>

                <section className="mb-20">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
                        <h2 className="text-2xl font-bold mb-2">Tech Stack</h2>
                        <p className="text-muted-foreground">Technologies I use daily</p>
                    </motion.div>
                    <TechCarousel items={frontendTech} direction="left" speed={25} />
                    <TechCarousel items={backendTech} direction="right" speed={30} />
                </section>

                <section className="mb-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 rounded-xl bg-muted">
                                    <Code2 className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold">{t('hard')}</h2>
                            </div>
                            <div className="space-y-6">
                                {portfolioData.hardSkills.map((skill) => (
                                    <SkillBar key={skill.name} name={skill.name} level={skill.level} />
                                ))}
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 rounded-xl bg-muted">
                                    <Brain className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold">{t('soft')}</h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {portfolioData.softSkills.map((skill, index) => (
                                    <motion.div
                                        key={skill.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05 }}
                                        className="card-creative"
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <h3 className="font-semibold mb-1">{skill.name}</h3>
                                        {skill.description && <p className="text-sm text-muted-foreground">{skill.description}</p>}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>

            <ToolsCloud />
        </div>
    );
}
