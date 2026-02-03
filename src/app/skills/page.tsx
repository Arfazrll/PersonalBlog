'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Code2, Brain, Wrench, X } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { portfolioData } from '@/data/portfolio';
import { SplineScene } from '@/components/ui/SplineScene';
import Particles from '@/components/ui/Particles';

function CursorGlow() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setMousePos({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                });
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
            <motion.div
                className="absolute w-[800px] h-[800px] rounded-full opacity-30 dark:opacity-20 blur-[120px]"
                animate={{
                    x: mousePos.x - 400,
                    y: mousePos.y - 400,
                }}
                transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.5 }}
                style={{
                    background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
                }}
            />
        </div>
    );
}

function SectionHeader({ title, subtitle, number, className }: { title: string; subtitle?: string; number: string; className?: string }) {
    return (
        <div className={cn("mb-16", className)}>
            <div className="flex items-center gap-4 mb-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-primary/60 font-black">
                    {number}
                </span>
                <div className="h-[1px] w-12 bg-primary/20" />
            </div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-none mb-6">
                {title}
            </h2>
            {subtitle && (
                <p className="text-muted-foreground font-mono text-[11px] uppercase tracking-widest leading-relaxed">
                    {subtitle}
                </p>
            )}
        </div>
    );
}

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
    'Solidity': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg',
    'TensorFlow': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
    'Scikit-learn': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg',
    'Pandas': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg',
    'NumPy': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg',
    'Matplotlib': 'https://upload.wikimedia.org/wikipedia/commons/8/84/Matplotlib_icon.svg',
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
    'Jupyter': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg',
    'Anaconda': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/anaconda/anaconda-original.svg',
    'Conda': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/anaconda/anaconda-original.svg',
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


export default function SkillsPage() {
    const t = useTranslations('skills');

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* 3D Spline Scene Hero */}
            <div className="w-full h-[500px] md:h-[600px] relative z-0">
                <SplineScene
                    scene="https://prod.spline.design/qVnpleqGGhqRlQYK/scene.splinecode"
                    className="w-full h-full"
                />
                {/* Gradient Overlay for Blending */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />
            </div>

            <FloatingShape className="w-[600px] h-[600px] -top-40 -left-40" />
            <FloatingShape className="w-[500px] h-[500px] top-1/2 -right-40" delay={2} />

            {/* Dynamic Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                <Particles
                    particleCount={150}
                    speed={0.2}
                    particleBaseSize={80}
                    particleColors={['#3b82f6', '#8b5cf6', '#1a1a1a']}
                    alphaParticles
                />
            </div>

            <CursorGlow />

            <div className="container-creative pb-20 relative z-10 -mt-20">
                <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
                    <motion.span className="inline-block px-4 py-2 rounded-full glass-card text-sm font-medium mb-6" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
                        What I Use
                    </motion.span>
                    <h1 className="heading-lg mb-4">{t('title')}</h1>
                    <p className="subheading max-w-xl mx-auto">{t('subtitle')}</p>
                </motion.div>

                {/* PREMIUM CAPABILITIES LAYOUT (HARD, TECHNICAL, SOFT SKILLS) */}
                <section className="py-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                        {/* HARD SKILLS (DOMAIN EXPERTISE) */}
                        <div className="space-y-12">
                            <div className="space-y-4">
                                <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-muted-foreground/60 font-bold">Domain_Logic // 01</span>
                                <h2 className="text-3xl font-black tracking-tighter uppercase italic">{t('hard')}</h2>
                            </div>
                            <div className="space-y-4">
                                {portfolioData.hardSkills.slice(0, 8).map((skill, idx) => (
                                    <motion.div
                                        key={skill.name}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="p-4 rounded-2xl glass-card flex items-center justify-between group hover:border-primary/50 transition-colors"
                                    >
                                        <span className="text-xs font-bold uppercase tracking-wider">{skill.name}</span>
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* TECHNICAL PROFICIENCY (BARS) */}
                        <div className="space-y-12">
                            <div className="space-y-4">
                                <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-muted-foreground/60 font-bold">System_Engine // 02</span>
                                <h2 className="text-3xl font-black tracking-tighter uppercase italic">{t('technical')}</h2>
                            </div>
                            <div className="space-y-8">
                                {portfolioData.hardSkills.slice(8).map((skill) => (
                                    <div key={skill.name} className="group">
                                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.2em] mb-3 text-muted-foreground group-hover:text-foreground transition-colors">
                                            <span>{skill.name}</span>
                                            <span className="font-mono opacity-50">{skill.level}</span>
                                        </div>
                                        <div className="h-[2px] w-full bg-border/30 overflow-hidden">
                                            <motion.div
                                                initial={{ x: '-100%' }}
                                                whileInView={{ x: '0%' }}
                                                transition={{ duration: 1.5, ease: "circOut" }}
                                                className="h-full bg-primary/40 group-hover:bg-primary transition-colors"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* SOFT SKILLS (CARDS) */}
                        <div className="space-y-12 md:col-span-2 lg:col-span-1">
                            <div className="space-y-4">
                                <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-muted-foreground/60 font-bold">Human_Interface // 03</span>
                                <h2 className="text-3xl font-black tracking-tighter uppercase italic">{t('soft')}</h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                                {portfolioData.softSkills.map((skill, idx) => (
                                    <motion.div
                                        key={skill.name}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="card-creative p-6 space-y-3"
                                    >
                                        <h3 className="text-xs font-bold text-foreground/80">{skill.name}</h3>
                                        <p className="text-[10px] text-muted-foreground leading-relaxed uppercase tracking-widest">{skill.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* PREMIUM TECH STACK GRID */}
                <section className="py-32 border-t border-border/50">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {portfolioData.techStack.map((tech, idx) => (
                            <motion.div
                                key={`${tech.name}-${idx}`}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.02 }}
                                className="card-creative flex flex-col items-center gap-6 group hover:border-primary/20"
                            >
                                <div className="w-10 h-10 relative opacity-60 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0">
                                    <Image
                                        src={techLogos[tech.name] || (tech.icon?.includes('http') ? tech.icon : `https://cdn.simpleicons.org/${tech.name.toLowerCase().replace(/[\s.]/g, '')}`)}
                                        alt={tech.name}
                                        fill
                                        className="object-contain"
                                        unoptimized
                                    />
                                </div>
                                <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground group-hover:text-foreground transition-colors text-center">{tech.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* PREMIUM TOOLS GRID */}
                <section className="py-20 border-t border-border/50">
                    <div className="text-center mb-16">
                        <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-muted-foreground/60 font-bold">Artisan_Workbench // 03</span>
                        <h2 className="text-4xl font-black tracking-tighter uppercase italic mt-4">Tools & Software</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {portfolioData.tools.map((tool, idx) => (
                            <motion.div
                                key={`${tool.name}-${idx}`}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.03 }}
                                className="card-creative flex flex-col items-center justify-center gap-6 group hover:border-primary/20"
                            >
                                <div className="w-12 h-12 relative opacity-50 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0">
                                    <Image
                                        src={toolLogos[tool.name] || (tool.icon?.includes('http') ? tool.icon : `https://cdn.simpleicons.org/${tool.name.toLowerCase().replace(/[\s.]/g, '')}`)}
                                        alt={tool.name}
                                        fill
                                        className="object-contain"
                                        unoptimized
                                    />
                                </div>
                                <div className="text-center">
                                    <span className="block text-[10px] font-bold tracking-widest uppercase text-muted-foreground group-hover:text-foreground transition-colors">{tool.name}</span>
                                    <span className="block text-[8px] font-mono uppercase text-muted-foreground/40 mt-1 tracking-tighter">{tool.category}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
