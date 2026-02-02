'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { cn } from '@/lib/utils';
import { Cpu, Wrench, Zap, RefreshCw, ArrowDown, ChevronDown } from 'lucide-react';

// --- Types ---
interface TechStackProps {
    techStack: string[];
    tools?: string[];
}

interface PhysicsBody {
    id: string;
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    color: string;
    icon?: string;
    isHero?: boolean;
    mass: number;
}

// --- Tech Descriptions Database ---
const TECH_DESCRIPTIONS: Record<string, string> = {
    "Next.js": "The React Framework for the Web. Chosen for its superior server-side rendering, SEO capabilities, and robust routing system that enables high-performance web applications.",
    "React": "The library for web and native user interfaces. Provides the component-based architecture effectively managing the complex UI state and interactive elements.",
    "TypeScript": "JavaScript with syntax for types. Ensures type safety and code robustness, reducing runtime errors and improving developer productivity in large-scale applications.",
    "Tailwind CSS": "A utility-first CSS framework. Enables rapid UI development and consistent design capability without leaving your HTML, perfect for modern responsive designs.",
    "Three.js": "JavaScript 3D Library. Powers the immersive 3D experiences, from the physics-based ID card to the particle systems, bringing the web to life.",
    "Framer Motion": "Production-ready motion library for React. Orchestrates the complex animations, page transitions, and fluid interactions that define the premium feel.",
    "Node.js": "JavaScript runtime built on Chrome's V8 engine. Handles the backend logic and API services with non-blocking I/O for scalable performance.",
    "Go": "Open source programming language supported by Google. Selected for backend microservices due to its brutally efficient concurrency and performance.",
    "Python": "Versatile programming language. The backbone of the AI/ML pipelines, handling data processing, model inference, and scientific computing tasks.",
    "TensorFlow": "End-to-end open source platform for machine learning. Used to build and deploy the custom deep learning models.",
    "Docker": "OS-level virtualization. Ensures consistent environments across development and production, containerizing applications for easy deployment.",
    "PostgreSQL": "Advanced open source relational database. Provides reliability and data integrity for complex structured data requirements.",
    "MongoDB": "NoSQL database program. Offers flexibility for unstructured data and rapid schema iteration during development.",
    "Solidity": "Contract-oriented programming language. Used for writing smart contracts on the Ethereum blockchain.",
    "Figma": "Interface design tool. utilized for all UI/UX prototyping and design systems before implementation.",
    "VS Code": "Code editor redefined. The primary development environment, customized with extensions for maximum efficiency.",
    "GitHub": "Software development platform. Hosts the source code and manages CI/CD pipelines and version control.",
};

const DEFAULT_DESCRIPTION = "A key technology in this project's ecosystem, selected for its efficiency, reliability, and specific capability to solve core engineering challenges.";

// Physics Constants
const MAGNETIC_FORCE = 0.8;
const DAMPING = 0.96;
const CENTER_PULL = 0.002;
const MAX_SPEED = 12;

export function TechStack({ techStack, tools }: TechStackProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [bodies, setBodies] = useState<PhysicsBody[]>([]);
    const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 });
    const [gravityOn, setGravityOn] = useState(false);
    const requestRef = useRef<number>(0);

    // --- Physics Initialization & Loop ---
    useEffect(() => {
        if (!containerRef.current) return;

        const HERO_TECHS = ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Three.js', 'Node.js', 'Go', 'Python'];
        const width = containerRef.current.offsetWidth;
        const height = containerRef.current.offsetHeight || 500;

        const createBody = (name: string, isTool: boolean, index: number, total: number): PhysicsBody => {
            const isHero = !isTool && HERO_TECHS.some(h => h.toLowerCase() === name.toLowerCase());
            const angle = (index / total) * Math.PI * 2 * (isHero ? 1 : 3);
            const distance = isHero ? 80 : 150 + Math.random() * 80;
            const startX = width / 2 + Math.cos(angle) * distance;
            const startY = height / 2 + Math.sin(angle) * distance;

            const icon = portfolioData.techStack.find(t => t.name.toLowerCase() === name.toLowerCase())?.icon ||
                portfolioData.tools.find(t => t.name.toLowerCase() === name.toLowerCase())?.icon;

            return {
                id: name + (isTool ? '-tool' : ''),
                x: Math.max(50, Math.min(width - 50, startX)),
                y: Math.max(50, Math.min(height - 50, startY)),
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                radius: isHero ? 50 : (isTool ? 28 : 38),
                color: isHero ? '#10b981' : (isTool ? '#3b82f6' : '#ffffff'),
                icon,
                isHero,
                mass: isHero ? 1.5 : 1
            };
        };

        const allItems = [...techStack, ...(tools || [])];
        const newBodies = [
            ...techStack.map((t, i) => createBody(t, false, i, allItems.length)),
            ...(tools || []).map((t, i) => createBody(t, true, i + techStack.length, allItems.length))
        ];
        setBodies(newBodies);
    }, [techStack, tools]);

    const updatePhysics = () => {
        if (!containerRef.current) return;
        const width = containerRef.current.offsetWidth;
        const height = containerRef.current.offsetHeight || 500;

        setBodies(prevBodies => {
            return prevBodies.map(body => {
                let { x, y, vx, vy, radius, mass } = body;
                const dx = x - mousePos.x;
                const dy = y - mousePos.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const interactionRadius = 250;

                if (dist < interactionRadius) {
                    const force = (1 - dist / interactionRadius) * MAGNETIC_FORCE;
                    vx += (dx / dist) * force * 3;
                    vy += (dy / dist) * force * 3;
                }

                if (gravityOn) {
                    vy += 0.4 * mass;
                } else {
                    vx += (Math.random() - 0.5) * 0.1;
                    vy += (Math.random() - 0.5) * 0.1;
                    const centerX = width / 2;
                    const centerY = height / 2;
                    vx += (centerX - x) * CENTER_PULL;
                    vy += (centerY - y) * CENTER_PULL;
                }

                prevBodies.forEach(other => {
                    if (body.id === other.id) return;
                    const diffX = x - other.x;
                    const diffY = y - other.y;
                    const distance = Math.sqrt(diffX * diffX + diffY * diffY);
                    const minDistance = radius + other.radius + 5;

                    if (distance < minDistance) {
                        const overlap = minDistance - distance;
                        const angle = Math.atan2(diffY, diffX);
                        vx += Math.cos(angle) * overlap * 0.08;
                        vy += Math.sin(angle) * overlap * 0.08;
                    }
                });

                vx *= DAMPING;
                vy *= DAMPING;
                const speed = Math.sqrt(vx * vx + vy * vy);
                if (speed > MAX_SPEED) {
                    vx = (vx / speed) * MAX_SPEED;
                    vy = (vy / speed) * MAX_SPEED;
                }
                x += vx;
                y += vy;

                const bounciness = 0.6;
                // No floor bounce if we want them to fall "through" into fog in gravity mode? 
                // No, keep floor but maybe deeper.
                if (x < radius) { x = radius; vx *= -bounciness; }
                if (x > width - radius) { x = width - radius; vx *= -bounciness; }
                if (y < radius) { y = radius; vy *= -bounciness; }
                if (y > height - radius) {
                    y = height - radius;
                    vy *= -bounciness;
                    if (gravityOn && Math.abs(vy) < 1) vy = 0;
                }

                return { ...body, x, y, vx, vy };
            });
        });
        requestRef.current = requestAnimationFrame(updatePhysics);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(updatePhysics);
        return () => cancelAnimationFrame(requestRef.current);
    }, [mousePos, gravityOn]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseLeave = () => { setMousePos({ x: -9999, y: -9999 }); };

    const resetPositions = () => {
        if (!containerRef.current) return;
        setBodies(prev => prev.map(b => ({
            ...b,
            vx: (Math.random() - 0.5) * 30,
            vy: (Math.random() - 0.5) * 30
        })));
    };

    return (
        <div className="relative min-h-[160vh]"> {/* Increased scroll height */}

            {/* Sticky Physics Header */}
            <div className="sticky top-0 h-[80vh] w-full z-0 overflow-hidden dark:mix-blend-lighten"> {/* Taller sticky area */}
                <div
                    ref={containerRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className="w-full h-full relative overflow-hidden"
                >
                    {/* Fog / Ambient Background Effects */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] animate-pulse" />
                        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] animate-pulse delay-1000" />
                        {/* Gradient Fade - Made Transparent for Blending */}
                        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-transparent to-transparent" />
                    </div>

                    {/* Controls */}
                    <div className="absolute top-4 right-4 z-50 flex gap-2">
                        <motion.button onClick={() => setGravityOn(!gravityOn)}
                            className={cn(
                                "p-2 rounded-full border backdrop-blur-md transition-all",
                                gravityOn
                                    ? "bg-emerald-100 dark:bg-emerald-500/20 border-emerald-600 dark:border-emerald-500 text-emerald-700 dark:text-emerald-400"
                                    : "bg-white dark:bg-white/5 border-zinc-400 dark:border-white/10 text-zinc-800 dark:text-muted-foreground hover:bg-zinc-100 dark:hover:bg-white/10"
                            )}>
                            <ArrowDown className="w-4 h-4" />
                        </motion.button>
                        <motion.button onClick={resetPositions}
                            className="p-2 rounded-full bg-white dark:bg-white/5 border border-zinc-400 dark:border-white/10 text-zinc-800 dark:text-muted-foreground hover:bg-zinc-100 dark:hover:bg-white/10">
                            <RefreshCw className="w-4 h-4" />
                        </motion.button>
                    </div>

                    {/* Bodies */}
                    {bodies.map((body) => (
                        <div key={body.id}
                            className={cn(
                                "absolute flex items-center justify-center rounded-full shadow-lg backdrop-blur-sm border transition-colors select-none",
                                body.isHero
                                    ? "bg-emerald-50/80 dark:bg-white/10 border-emerald-200 dark:border-emerald-500 shadow-[0_4px_20px_rgba(16,185,129,0.1)] dark:shadow-[0_0_15px_rgba(16,185,129,0.2)] text-emerald-900 dark:text-emerald-100"
                                    : "bg-white/80 dark:bg-white/5 border-zinc-200 dark:border-white/5 text-zinc-700 dark:text-white/80"
                            )}
                            style={{
                                width: body.radius * 2, height: body.radius * 2,
                                transform: `translate(${body.x - body.radius}px, ${body.y - body.radius}px)`,
                            }}
                        >
                            <div className={cn("relative flex items-center justify-center overflow-hidden", body.isHero ? "w-[65%] h-[65%]" : "w-[60%] h-[60%]")}>
                                {body.icon ? (
                                    <img
                                        src={body.icon}
                                        alt={body.id}
                                        className={cn(
                                            "w-full h-full object-contain pointer-events-none opacity-90 dark:opacity-90",
                                            ["Next.js", "GitHub"].includes(body.id.replace('-tool', '')) && "dark:invert"
                                        )}
                                    />
                                ) : (
                                    <span className={cn(
                                        "text-[10px] font-bold text-center leading-tight px-1",
                                        body.isHero ? "text-emerald-950 dark:text-white" : "text-black dark:text-white/60"
                                    )}>{body.id.replace('-tool', '')}</span>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Scroll Hint (Lowered) */}
                    <div className="absolute bottom-20 left-0 right-0 flex justify-center animate-bounce opacity-50 pointer-events-none">
                    </div>
                </div>
            </div>

            {/* Scroll Overlay Content - Transparent Background for Blending */}
            <div className="relative z-10 px-4 min-h-screen -mt-[20vh] pt-32 pb-32 bg-transparent">

                <div className="max-w-3xl mx-auto space-y-6">
                    {/* Section Header */}
                    <div className="text-center space-y-2 mb-12 opacity-80">
                        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">Tech Breakdown</h2>
                        <div className="h-1 w-20 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto rounded-full blur-[2px]" />
                    </div>

                    {techStack.map((tech, i) => (
                        <motion.div
                            key={tech}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-white/60 dark:bg-zinc-900/40 backdrop-blur-md border border-black/10 dark:border-white/5 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row gap-6 items-start hover:bg-white/80 dark:hover:bg-zinc-900/60 hover:border-emerald-500/20 transition-all group"
                        >
                            {/* Icon */}
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-black/5 to-black/0 dark:from-white/10 dark:to-white/5 p-3 shrink-0 border border-black/5 dark:border-white/5 group-hover:scale-105 transition-transform shadow-inner">
                                {portfolioData.techStack.find(t => t.name.toLowerCase() === tech.toLowerCase())?.icon ? (
                                    <img
                                        src={portfolioData.techStack.find(t => t.name.toLowerCase() === tech.toLowerCase())?.icon}
                                        alt={tech}
                                        className={cn(
                                            "w-full h-full object-contain drop-shadow-lg",
                                            ["Next.js", "GitHub"].includes(tech) && "dark:invert"
                                        )}
                                        loading="lazy"
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                            e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                        }}
                                    />
                                ) : null}
                                <div className={cn("hidden w-full h-full flex items-center justify-center font-bold text-lg text-foreground/50", !portfolioData.techStack.find(t => t.name.toLowerCase() === tech.toLowerCase())?.icon && "flex")}>
                                    {tech[0]}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex items-center gap-2">
                                    {tech}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed font-light">
                                    {TECH_DESCRIPTIONS[tech] || DEFAULT_DESCRIPTION}
                                </p>
                            </div>
                        </motion.div>
                    ))}

                    {/* Tools Section */}
                    {tools && tools.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="pt-16"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-[1px] flex-1 bg-black/10 dark:bg-white/10" />
                                <h3 className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold tracking-widest uppercase">Creative Arsenal</h3>
                                <div className="h-[1px] flex-1 bg-black/10 dark:bg-white/10" />
                            </div>

                            <div className="flex flex-wrap justify-center gap-3">
                                {tools.map(tool => (
                                    <div key={tool} className="group bg-black/5 dark:bg-white/5 hover:bg-emerald-500/10 border border-black/5 dark:border-white/5 hover:border-emerald-500/30 px-5 py-3 rounded-xl flex items-center gap-3 text-sm text-muted-foreground hover:text-emerald-700 dark:hover:text-emerald-100 transition-all cursor-default">
                                        <Wrench className="w-4 h-4 text-emerald-600/50 dark:text-emerald-500/50 group-hover:text-emerald-600 dark:group-hover:text-emerald-400" />
                                        <span className="font-medium">{tool}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
