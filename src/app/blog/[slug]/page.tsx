'use client';

import { use } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { portfolioData } from '@/data/portfolio';
import { Clock, Copy, Linkedin, Github, BookOpen, Link as LinkIcon, ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const t = useTranslations('blog');

    const implementedSlugs = [
        'future-of-ai-agents',
        'web3-ux-challenges',
        'mastering-nextjs-performance',
        'ai-driven-security',
        'llm-fine-tuning'
    ];
    const isImplemented = implementedSlugs.includes(slug);

    const post = portfolioData.blogs.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-background pb-24 pt-32">
            {/* Header Section */}
            <div className="container max-w-7xl mx-auto px-6 mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium hover:text-primary transition-colors">
                            <Link href="/blog" className="flex items-center gap-2">
                                <ArrowLeft className="w-4 h-4" />
                                <span>Back</span>
                            </Link>
                        </div>
                    </div>

                    <div className="max-w-4xl">
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight text-foreground mb-6 leading-[1.1]">
                            {post.title}
                        </h1>

                        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl font-light">
                            {post.excerpt}
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Hero Image */}
            <div className="container max-w-7xl mx-auto px-6 mb-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="relative w-full aspect-[21/9] md:aspect-[2/1] rounded-3xl overflow-hidden border border-border/40 shadow-2xl"
                >
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </motion.div>
            </div>

            {/* Metadata Bar */}
            <div className="container max-w-7xl mx-auto px-6 mb-16">
                <div className="flex flex-col md:flex-row items-center justify-between border-y border-border/40 py-6 gap-6">
                    <div className="flex items-center gap-12 w-full md:w-auto justify-between md:justify-start">
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Written by</span>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-foreground">{post.author.name}</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Published on</span>
                            <span className="font-bold text-foreground">{post.date}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                        <button className="flex items-center gap-2 px-4 py-2 bg-secondary/10 hover:bg-secondary/20 text-muted-foreground hover:text-foreground text-xs font-bold uppercase tracking-wider rounded-lg transition-all">
                            <Copy className="w-4 h-4" /> <span className="hidden sm:inline">Copy link</span>
                        </button>
                        <div className="w-px h-6 bg-border/40 hidden sm:block" />
                        <Link href="https://linkedin.com/in/syahril-arfian-almazril" target="_blank" className="p-2 text-muted-foreground hover:text-primary transition-colors bg-secondary/10 rounded-lg hover:bg-primary/10">
                            <Linkedin className="w-4 h-4" />
                        </Link>
                        <Link href="https://github.com/Arfazrll" target="_blank" className="p-2 text-muted-foreground hover:text-primary transition-colors bg-secondary/10 rounded-lg hover:bg-primary/10">
                            <Github className="w-4 h-4" />
                        </Link>
                        <Link href="https://medium.com/@arfazrll" target="_blank" className="p-2 text-muted-foreground hover:text-primary transition-colors bg-secondary/10 rounded-lg hover:bg-primary/10">
                            <BookOpen className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Content & Sidebar Grid */}
            <div className="container max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left Column: Article Content */}
                    <div className={isImplemented ? "lg:col-span-8" : "lg:col-span-12"}>
                        <div className="prose prose-lg prose-invert prose-primary max-w-none prose-headings:font-black prose-headings:tracking-tight prose-p:leading-loose prose-p:text-muted-foreground">

                            {slug === 'future-of-ai-agents' && (
                                <>
                                    <h2 id="intro" className="text-3xl font-bold mb-6 text-foreground scroll-mt-32">The Rise of Autonomous Agents</h2>
                                    <p className="mb-8">
                                        The landscape of enterprise software is undergoing a seismic shift. We are moving beyond static automation and scripted workflows into an era of <strong>Autonomous AI Agents</strong>. These agents are not just tools; they are proactive entities capable of perceiving, reasoning, acting, and learning to achieve complex goals with minimal human intervention.
                                    </p>
                                    <p className="mb-8">
                                        In the traditional software paradigm, humans defined every step of a process. If condition A met condition B, then action C was executed. Today, agents powered by Large Language Models (LLMs) can understand vague instructions like "analyze our Q3 sales data and generate a strategy for Q4," and then autonomously figure out the necessary steps—querying databases, running statistical models, and drafting reports—all on their own.
                                    </p>

                                    <div className="my-12 relative w-full aspect-video rounded-2xl overflow-hidden border border-border/40 bg-secondary/5">
                                        <Image
                                            src="/images/gallery/1.png"
                                            alt="AI Agents Architecture"
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>

                                    <h2 id="core" className="text-3xl font-bold mb-6 text-foreground scroll-mt-32">Architecting for Autonomy</h2>
                                    <p className="mb-8">
                                        Building an effective AI agent requires a rethinking of software architecture. It isn't just about the model; it's about the <strong>Cognitive Architecture</strong> that surrounds it.
                                    </p>
                                    <ul className="list-disc pl-6 mb-8 sapce-y-2 text-muted-foreground">
                                        <li><strong>Memory:</strong> Agents need short-term memory (context window) to manage immediate tasks and long-term memory (vector databases) to recall past interactions and knowledge.</li>
                                        <li><strong>Tools:</strong> An agent is only as powerful as the tools it can wield. We specifically design interfaces (APIs) that allow agents to interact with CRMs, ERPs, and the broader web.</li>
                                        <li><strong>Planning:</strong> The ability to break down a high-level goal into a sequence of executable actions (Chain of Thought) is what separates a chatbot from an agent.</li>
                                    </ul>

                                    <blockquote className="border-l-4 border-primary pl-6 my-12 italic text-xl font-medium text-foreground">
                                        "The future of software is not humans telling computers what to do, but computers asking humans what they want to achieve."
                                        <footer className="mt-4 text-sm font-bold not-italic text-primary flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-secondary overflow-hidden relative">
                                                <Image src={post.author.avatar} alt="Author" fill className="object-cover" />
                                            </div>
                                            <div>
                                                <div className="text-foreground">{post.author.name}</div>
                                                <div className="text-muted-foreground text-xs font-normal">AI Engineer</div>
                                            </div>
                                        </footer>
                                    </blockquote>

                                    <h2 id="impact" className="text-3xl font-bold mb-6 text-foreground scroll-mt-32">Redefining Decision Making</h2>
                                    <p className="mb-8">
                                        The integration of agents into decision-making processes brings a new level of speed and data-driven accuracy. Agents doesn't act on intuition; they act on data. They can synthesize millions of data points in seconds to catch anomalies in cybersecurity, optimize supply chains in real-time, or personalize customer experiences at scale.
                                    </p>
                                    <p className="mb-8">
                                        However, this power comes with responsibility. The challenge now shifts to <strong>Alignment</strong> and <strong>Governance</strong>—ensuring that these autonomous systems act in accordance with human values and business objectives.
                                    </p>
                                </>
                            )}

                            {slug === 'web3-ux-challenges' && (
                                <>
                                    <h2 id="ux-gap" className="text-3xl font-bold mb-6 text-foreground scroll-mt-32">The UX Gap in Web3</h2>
                                    <p className="mb-8">
                                        We often hear that "Web3 is the future," but for the average user, it feels like stepping back into the dial-up era. Managing private keys, understanding gas fees, and the terrifying irreversibility of transactions are massive hurdles. To reach mass adoption, Web3 applications must feel indistinguishable from the Web2 apps we use every day—intuitive, fast, and forgiving.
                                    </p>
                                    <p className="mb-8">
                                        The core problem lies in the friction between <strong>security</strong> and <strong>convenience</strong>. In traditional finance, banks act as custodians, resetting your password if you forget it. In DeFi, if you lose your seed phrase, your assets are gone forever. We need to bridge this gap without compromising the decentralized ethos.
                                    </p>

                                    <div className="my-12 relative w-full aspect-video rounded-2xl overflow-hidden border border-border/40 bg-secondary/5">
                                        <Image
                                            src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2000&auto=format&fit=crop"
                                            alt="Web3 UX"
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>

                                    <h2 id="seed-phrases" className="text-3xl font-bold mb-6 text-foreground scroll-mt-32">The Death of Seed Phrases</h2>
                                    <p className="mb-8">
                                        The biggest barrier to entry is the wallet. Expecting users to safeguard a 12-word mnemonic is unrealistic for global scale. Enter <strong>Account Abstraction (ERC-4337)</strong>.
                                    </p>
                                    <ul className="list-disc pl-6 mb-8 sapce-y-2 text-muted-foreground">
                                        <li><strong>Social Recovery:</strong> Lose your key? Recover your account via trusted friends or biometric authentication.</li>
                                        <li><strong>Sponsored Transactions:</strong> DApps can pay gas fees for users, eliminating the need to buy ETH just to try a new service.</li>
                                        <li><strong>Bundled Transactions:</strong> Approve and swap in a single click, rather than signing multiple confusing pop-ups.</li>
                                    </ul>

                                    <blockquote className="border-l-4 border-primary pl-6 my-12 italic text-xl font-medium text-foreground">
                                        "The next billion users won't know they're using the blockchain. They'll just know they're using a better, fairer internet."
                                        <footer className="mt-4 text-sm font-bold not-italic text-primary flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-secondary overflow-hidden relative">
                                                <Image src={post.author.avatar} alt="Author" fill className="object-cover" />
                                            </div>
                                            <div>
                                                <div className="text-foreground">{post.author.name}</div>
                                                <div className="text-muted-foreground text-xs font-normal">Blockchain Developer</div>
                                            </div>
                                        </footer>
                                    </blockquote>

                                    <h2 id="latency" className="text-3xl font-bold mb-6 text-foreground scroll-mt-32">Managing Latency & Feedback</h2>
                                    <p className="mb-8">
                                        Blockchains are inherently slower than centralized servers. Users shouldn't stare at a spinner for 15 seconds. <strong>Optimistic UI</strong> updates are crucial—show the user the action succeeded immediately while the transaction confirms in the background. If it fails, gracefully roll back and inform the user.
                                    </p>
                                    <p className="mb-8">
                                        Furthermore, transaction data is cryptic. Instead of showing "0x... sent to 0x...", we need human-readable transaction simulations that tell the user: "You are giving OpenSea permission to move your Bored Ape." Clarity is the best security feature.
                                    </p>
                                </>
                            )}

                            {slug === 'mastering-nextjs-performance' && (
                                <>
                                    <h2 id="rendering" className="text-3xl font-bold mb-6 text-foreground scroll-mt-32">Rendering Patterns: SSG, SSR, & PPR</h2>
                                    <p className="mb-8">
                                        Performance starts with how you deliver content. Next.js offers a spectrum of rendering strategies. <strong>Static Site Generation (SSG)</strong> is the gold standard for speed, serving pre-built HTML from the Edge. However, for dynamic content, we traditionally relied on Server-Side Rendering (SSR), which can introduce latency.
                                    </p>
                                    <p className="mb-8">
                                        The game changer is <strong>Partial Prerendering (PPR)</strong>. It allows us to keep the shell of the application static (instant load) while streaming in dynamic parts (like user data) in parallel. This hybrid model mimics the speed of static sites with the flexibility of server-rendered apps.
                                    </p>

                                    <div className="my-12 relative w-full aspect-video rounded-2xl overflow-hidden border border-border/40 bg-secondary/5">
                                        <Image
                                            src="https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=2000&auto=format&fit=crop"
                                            alt="Next.js Performance"
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>

                                    <h2 id="assets" className="text-3xl font-bold mb-6 text-foreground scroll-mt-32">Optimizing Assets (Images & Fonts)</h2>
                                    <p className="mb-8">
                                        Largest Contentful Paint (LCP) is often dragged down by unoptimized images. The standard <code>&lt;img&gt;</code> tag is insufficient. The Next.js <code>&lt;Image&gt;</code> component automatically handles resizing, lazy loading, and serving modern formats like WebP/AVIF.
                                    </p>
                                    <ul className="list-disc pl-6 mb-8 sapce-y-2 text-muted-foreground">
                                        <li><strong>Size Attribute:</strong> Always define explicit width/height or uses <code>fill</code> with a parent container to prevent layout shifts (CLS).</li>
                                        <li><strong>Priority:</strong> Mark your LCP image (usually the hero) with the <code>priority</code> prop to preload it.</li>
                                        <li><strong>Next/Font:</strong> Self-host Google fonts automatically to eliminate layout shifts and zero internal network requests.</li>
                                    </ul>

                                    <blockquote className="border-l-4 border-primary pl-6 my-12 italic text-xl font-medium text-foreground">
                                        "Performance is not just a metric; it's a user experience feature. A fast site builds trust."
                                        <footer className="mt-4 text-sm font-bold not-italic text-primary flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-secondary overflow-hidden relative">
                                                <Image src={post.author.avatar} alt="Author" fill className="object-cover" />
                                            </div>
                                            <div>
                                                <div className="text-foreground">{post.author.name}</div>
                                                <div className="text-muted-foreground text-xs font-normal">Fullstack Developer</div>
                                            </div>
                                        </footer>
                                    </blockquote>

                                    <h2 id="bundles" className="text-3xl font-bold mb-6 text-foreground scroll-mt-32">Code Splitting & Bundle Size</h2>
                                    <p className="mb-8">
                                        JavaScript execution time blocks the main thread. Shipping a massive single bundle is a recipe for a slow First Input Delay (FID). Next.js splits code by route automatically, but we can go further.
                                    </p>
                                    <p className="mb-8">
                                        Use <code>next/dynamic</code> to lazy load heavy components that aren't critical for the initial viewport (e.g., a modal or a complex chart below the fold).
                                    </p>
                                    <div className="p-4 bg-secondary/10 rounded-lg border border-border/40 font-mono text-xs mb-8">
                                        <code>
                                            const HeavyChart = dynamic(() =&gt; import('./HeavyChart'), &#123; ssr: false, loading: () =&gt; &lt;p&gt;Loading...&lt;/p&gt; &#125;);
                                        </code>
                                    </div>
                                </>
                            )}

                            {slug === 'ai-driven-security' && (
                                <>
                                    <h2 id="threats" className="text-3xl font-bold mb-6 text-foreground scroll-mt-32">The Speed of Modern Attacks</h2>
                                    <p className="mb-8">
                                        The traditional SOC (Security Operations Center) model is broken. Analysts are drowning in false positives while attackers use automation to scan, breach, and exfiltrate data in minutes. Human reaction time is simply too slow.
                                    </p>
                                    <p className="mb-8">
                                        <strong>AI-Driven Security</strong> changes the equation. Instead of relying on static signatures (looking for known bad files), AI models analyze behavior. They learn what "normal" network traffic looks like for your specific organization and can instantly flag anomalies—like a marketing intern accessing the production database at 3 AM.
                                    </p>

                                    <div className="my-12 relative w-full aspect-video rounded-2xl overflow-hidden border border-border/40 bg-secondary/5">
                                        <Image
                                            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop"
                                            alt="Cybersecurity"
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>

                                    <h2 id="detection" className="text-3xl font-bold mb-6 text-foreground scroll-mt-32">Deep Learning for Detection</h2>
                                    <p className="mb-8">
                                        Deep Learning models excel at pattern recognition. In cybersecurity, this means detecting zero-day exploits that have never been seen before.
                                    </p>
                                    <ul className="list-disc pl-6 mb-8 sapce-y-2 text-muted-foreground">
                                        <li><strong>User Entity Behavior Analytics (UEBA):</strong> Tracking user habits to detect compromised credentials.</li>
                                        <li><strong>Malware DNA:</strong> Analyzing the actual code structure of a file rather than just its hash to identify polymorphic malware.</li>
                                        <li><strong>Phishing Detection:</strong> NLP models reading emails to detect intent and urgency, not just keyword matching.</li>
                                    </ul>

                                    <blockquote className="border-l-4 border-primary pl-6 my-12 italic text-xl font-medium text-foreground">
                                        "Defenders have to be right every time. Attackers only have to be right once. AI helps level the playing field."
                                        <footer className="mt-4 text-sm font-bold not-italic text-primary flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-secondary overflow-hidden relative">
                                                <Image src={post.author.avatar} alt="Author" fill className="object-cover" />
                                            </div>
                                            <div>
                                                <div className="text-foreground">{post.author.name}</div>
                                                <div className="text-muted-foreground text-xs font-normal">Security Researcher</div>
                                            </div>
                                        </footer>
                                    </blockquote>

                                    <h2 id="adversarial" className="text-3xl font-bold mb-6 text-foreground scroll-mt-32">Adversarial AI</h2>
                                    <p className="mb-8">
                                        The arms race is escalating. Attackers are now using their own AI to generate convincing deepfake voice notes for CEO fraud, write polymorphic code that evades detection, and automate vulnerability scanning.
                                    </p>
                                    <p className="mb-8">
                                        To combat this, we utilize <strong>Generative Adversarial Networks (GANs)</strong> to pit two AIs against each other—one trying to create an attack, and the other trying to block it—constantly improving our defenses through simulation.
                                    </p>
                                </>
                            )}

                            {slug === 'llm-fine-tuning' && (
                                <>
                                    <h2 id="why-visual" className="text-3xl font-bold mb-6 text-foreground scroll-mt-32">Why Fine-Tune Locally?</h2>
                                    <p className="mb-8">
                                        The release of Llama 3 and Mistral has democratized access to powerful LLMs. However, base models are generalists. To make them excel at specific tasks—like writing SQL queries for your proprietary schema or answering customer support tickets with your brand voice—you need <strong>Fine-Tuning</strong>.
                                    </p>
                                    <p className="mb-8">
                                        Running this locally (or on a private cloud) ensures <strong>Data Privacy</strong>. Sending sensitive legal contracts or medical data to OpenAI's API is often a non-starter for enterprises. Local fine-tuning keeps your data within your perimeter.
                                    </p>

                                    <div className="my-12 relative w-full aspect-video rounded-2xl overflow-hidden border border-border/40 bg-secondary/5">
                                        <Image
                                            src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&auto=format&fit=crop"
                                            alt="LLM Fine-Tuning"
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>

                                    <h2 id="lora" className="text-3xl font-bold mb-6 text-foreground scroll-mt-32">LoRA & QLoRA Explained</h2>
                                    <p className="mb-8">
                                        Full fine-tuning updates all 7 billion+ parameters of a model, requiring massive GPU VRAM. <strong>Low-Rank Adaptation (LoRA)</strong> freezes the pre-trained model weights and injects trainable rank decomposition matrices into each layer of the Transformer architecture.
                                    </p>
                                    <p className="mb-8">
                                        <strong>QLoRA</strong> takes this further by quantizing the base model to 4-bit precision, allowing you to fine-tune a 70B parameter model on a single 48GB GPU, or a 7B model on a consumer RTX 4090.
                                    </p>

                                    <h2 id="ollama" className="text-3xl font-bold mb-6 text-foreground scroll-mt-32">The Stack: Ollama + Unsloth</h2>
                                    <p className="mb-8">
                                        For local inference, <strong>Ollama</strong> is the easiest way to run GGUF models. For training, <strong>Unsloth</strong> is currently the fastest library, offering 2-5x faster training speeds and 60% less memory usage than standard HuggingFace implementations.
                                    </p>

                                    <div className="p-4 bg-secondary/10 rounded-lg border border-border/40 font-mono text-xs mb-8 overflow-x-auto">
                                        <p className="text-muted-foreground mb-2"># Install Unsloth and export model to Ollama</p>
                                        <code className="block whitespace-pre">
                                            {`from unsloth import FastLanguageModel
model, tokenizer = FastLanguageModel.from_pretrained(
    model_name = "unsloth/llama-3-8b-bnb-4bit",
    max_seq_length = 2048,
    load_in_4bit = True,
)

# ... Training loop ...

model.save_pretrained_gguf("model_name", tokenizer, quantization_method = "q4_k_m")`}
                                        </code>
                                    </div>

                                    <blockquote className="border-l-4 border-primary pl-6 my-12 italic text-xl font-medium text-foreground">
                                        "Fine-tuning is the bridge between a generic reasoning engine and a specialized expert system."
                                        <footer className="mt-4 text-sm font-bold not-italic text-primary flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-secondary overflow-hidden relative">
                                                <Image src={post.author.avatar} alt="Author" fill className="object-cover" />
                                            </div>
                                            <div>
                                                <div className="text-foreground">{post.author.name}</div>
                                                <div className="text-muted-foreground text-xs font-normal">AI Engineer</div>
                                            </div>
                                        </footer>
                                    </blockquote>
                                </>
                            )}

                            {!isImplemented && (
                                <div className="flex flex-col items-center justify-center py-20 text-center">
                                    <div className="p-4 rounded-full bg-secondary/10 text-muted-foreground mb-4">
                                        <BookOpen className="w-8 h-8" />
                                    </div>
                                    <h2 className="text-2xl font-bold mb-2">Content Coming Soon</h2>
                                    <p className="text-muted-foreground">This article is currently being written. Check back later!</p>
                                </div>
                            )}

                            {isImplemented && (
                                <div className="mt-12 pt-12 border-t border-border/40">
                                    <h3 className="text-lg font-bold mb-6">Related Topics</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {post.tags.map(tag => (
                                            <Link key={tag} href={`/search?q=${tag}`} className="px-4 py-2 bg-secondary/10 hover:bg-primary/10 text-muted-foreground hover:text-primary border border-transparent hover:border-primary/20 rounded-lg text-sm transition-all font-medium">
                                                #{tag}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Sidebar */}
                    {isImplemented && (
                        <div className="lg:col-span-4 space-y-8">
                            <div className="sticky top-12 space-y-8">
                                {/* Table of Contents */}
                                <div>
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6 pb-4 border-b border-border/40">
                                        Table of Contents
                                    </h3>
                                    <div className="flex flex-col gap-4">
                                        {slug === 'future-of-ai-agents' && [
                                            { id: 'intro', label: 'The Rise of Agents' },
                                            { id: 'core', label: 'Cognitive Architecture' },
                                            { id: 'impact', label: 'Decision Making' }
                                        ].map((item, index) => (
                                            <a
                                                key={item.id}
                                                href={`#${item.id}`}
                                                className={`
                                                group flex items-center gap-3 text-sm font-medium transition-colors
                                                ${index === 0 ? 'text-primary pl-0' : 'text-muted-foreground hover:text-foreground'}
                                            `}
                                            >
                                                <span className={`h-px w-4 transition-all ${index === 0 ? 'bg-primary' : 'bg-transparent group-hover:bg-border'}`} />
                                                {item.label}
                                            </a>
                                        ))}

                                        {slug === 'web3-ux-challenges' && [
                                            { id: 'ux-gap', label: 'The UX Gap' },
                                            { id: 'seed-phrases', label: 'Account Abstraction' },
                                            { id: 'latency', label: 'Latency & Feedback' }
                                        ].map((item, index) => (
                                            <a
                                                key={item.id}
                                                href={`#${item.id}`}
                                                className={`
                                                group flex items-center gap-3 text-sm font-medium transition-colors
                                                ${index === 0 ? 'text-primary pl-0' : 'text-muted-foreground hover:text-foreground'}
                                            `}
                                            >
                                                <span className={`h-px w-4 transition-all ${index === 0 ? 'bg-primary' : 'bg-transparent group-hover:bg-border'}`} />
                                                {item.label}
                                            </a>
                                        ))}

                                        {slug === 'mastering-nextjs-performance' && [
                                            { id: 'rendering', label: 'Rendering Patterns' },
                                            { id: 'assets', label: 'Assets Optimization' },
                                            { id: 'bundles', label: 'Bundle Size' }
                                        ].map((item, index) => (
                                            <a
                                                key={item.id}
                                                href={`#${item.id}`}
                                                className={`
                                                group flex items-center gap-3 text-sm font-medium transition-colors
                                                ${index === 0 ? 'text-primary pl-0' : 'text-muted-foreground hover:text-foreground'}
                                            `}
                                            >
                                                <span className={`h-px w-4 transition-all ${index === 0 ? 'bg-primary' : 'bg-transparent group-hover:bg-border'}`} />
                                                {item.label}
                                            </a>
                                        ))}

                                        {slug === 'ai-driven-security' && [
                                            { id: 'threats', label: 'Modern Threats' },
                                            { id: 'detection', label: 'Deep Learning' },
                                            { id: 'adversarial', label: 'Adversarial AI' }
                                        ].map((item, index) => (
                                            <a
                                                key={item.id}
                                                href={`#${item.id}`}
                                                className={`
                                                group flex items-center gap-3 text-sm font-medium transition-colors
                                                ${index === 0 ? 'text-primary pl-0' : 'text-muted-foreground hover:text-foreground'}
                                            `}
                                            >
                                                <span className={`h-px w-4 transition-all ${index === 0 ? 'bg-primary' : 'bg-transparent group-hover:bg-border'}`} />
                                                {item.label}
                                            </a>
                                        ))}

                                        {slug === 'llm-fine-tuning' && [
                                            { id: 'why-visual', label: 'Why Fine-Tune?' },
                                            { id: 'lora', label: 'LoRA & QLoRA' },
                                            { id: 'ollama', label: 'Ollama + Unsloth' }
                                        ].map((item, index) => (
                                            <a
                                                key={item.id}
                                                href={`#${item.id}`}
                                                className={`
                                                group flex items-center gap-3 text-sm font-medium transition-colors
                                                ${index === 0 ? 'text-primary pl-0' : 'text-muted-foreground hover:text-foreground'}
                                            `}
                                            >
                                                <span className={`h-px w-4 transition-all ${index === 0 ? 'bg-primary' : 'bg-transparent group-hover:bg-border'}`} />
                                                {item.label}
                                            </a>
                                        ))}
                                    </div>
                                </div>

                                {/* Other Resources */}
                                <div>
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6 pb-4 border-b border-border/40">
                                        Related Resources
                                    </h3>
                                    <ul className="space-y-6">
                                        {(slug === 'web3-ux-challenges' ? [
                                            {
                                                title: "Vitalik on Account Abstraction",
                                                time: "Article",
                                                image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=2000&auto=format&fit=crop",
                                                category: "Ethereum",
                                                url: "https://ethereum-magicians.org/t/implementing-account-abstraction-as-part-of-eth1-x/4020"
                                            },
                                            {
                                                title: "Web3 UX Design Principles",
                                                time: "Guide",
                                                image: "https://images.unsplash.com/photo-1642104704074-907c0698b98d?q=80&w=2000&auto=format&fit=crop",
                                                category: "Design",
                                                url: "https://www.nngroup.com/articles/web3-user-experience/"
                                            },
                                            {
                                                title: "EIP-4337 Documentation",
                                                time: "Docs",
                                                image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2000&auto=format&fit=crop",
                                                category: "Technical",
                                                url: "https://eips.ethereum.org/EIPS/eip-4337"
                                            }
                                        ] : slug === 'mastering-nextjs-performance' ? [
                                            {
                                                title: "Next.js Core Web Vitals",
                                                time: "Docs",
                                                image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2000&auto=format&fit=crop",
                                                category: "Performance",
                                                url: "https://nextjs.org/docs/app/building-your-application/optimizing"
                                            },
                                            {
                                                title: "Optimize LCP",
                                                time: "Article",
                                                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
                                                category: "Web Vitals",
                                                url: "https://web.dev/lcp/"
                                            },
                                            {
                                                title: "React Profiler Guide",
                                                time: "Guide",
                                                image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2000&auto=format&fit=crop",
                                                category: "Debugging",
                                                url: "https://react.dev/reference/react/Profiler"
                                            }
                                        ] : slug === 'ai-driven-security' ? [
                                            {
                                                title: "NIST AI Safety Institute",
                                                time: "Standard",
                                                image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=2000&auto=format&fit=crop",
                                                category: "Framework",
                                                url: "https://www.nist.gov/isi"
                                            },
                                            {
                                                title: "MITRE ATT&CK",
                                                time: "Docs",
                                                image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2000&auto=format&fit=crop",
                                                category: "Security",
                                                url: "https://attack.mitre.org/"
                                            },
                                            {
                                                title: "Darktrace AI Research",
                                                time: "Paper",
                                                image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop",
                                                category: "Research",
                                                url: "https://darktrace.com/research"
                                            }
                                        ] : slug === 'llm-fine-tuning' ? [
                                            {
                                                title: "Unsloth Library",
                                                time: "Repo",
                                                image: "https://images.unsplash.com/photo-1655720357761-f18ea9e5e7e6?q=80&w=2000&auto=format&fit=crop",
                                                category: "Optimization",
                                                url: "https://github.com/unslothai/unsloth"
                                            },
                                            {
                                                title: "Ollama Documentation",
                                                time: "Docs",
                                                image: "https://images.unsplash.com/photo-1596778402284-8398c7b09521?q=80&w=2000&auto=format&fit=crop",
                                                category: "Inference",
                                                url: "https://ollama.com/"
                                            },
                                            {
                                                title: "LoRA Paper",
                                                time: "Paper",
                                                image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2000&auto=format&fit=crop",
                                                category: "Research",
                                                url: "https://arxiv.org/abs/2106.09685"
                                            }
                                        ] : [
                                            {
                                                title: "AutoGPT & BabyAGI: The Beginning",
                                                time: "Video",
                                                image: "/images/gallery/1.png",
                                                category: "History",
                                                url: "https://www.youtube.com/results?search_query=AutoGPT+BabyAGI"
                                            },
                                            {
                                                title: "Vector Databases Explained",
                                                time: "Article",
                                                image: "/images/gallery/2.png",
                                                category: "Technical",
                                                url: "https://www.pinecone.io/learn/vector-database/"
                                            },
                                            {
                                                title: "LLM Orchestration with LangChain",
                                                time: "Docs",
                                                image: "/images/gallery/3.png",
                                                category: "Tutorial",
                                                url: "https://python.langchain.com/docs/get_started/introduction"
                                            }
                                        ]).map((resource, i) => (
                                            <li key={i} className="group">
                                                <Link href={resource.url} target="_blank" className="flex gap-4 items-start">
                                                    <div className="relative w-24 aspect-[3/2] rounded-lg overflow-hidden flex-shrink-0 bg-secondary/10 border border-border/40">
                                                        <Image
                                                            src={resource.image}
                                                            alt={resource.title}
                                                            fill
                                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                        />
                                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors flex items-center justify-center">
                                                            <LinkIcon className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col gap-1.5 pt-0.5">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-[9px] font-black uppercase tracking-wider text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                                                                {resource.category}
                                                            </span>
                                                        </div>
                                                        <h5 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                                                            {resource.title}
                                                        </h5>
                                                        <span className="text-[10px] text-muted-foreground font-medium flex items-center gap-1.5">
                                                            {resource.time === 'Video' ? <div className="w-1.5 h-1.5 rounded-full bg-red-500" /> : <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
                                                            {resource.time}
                                                        </span>
                                                    </div>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Tags / Topics (New addition to fill space) */}
                                <div>
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6 pb-4 border-b border-border/40">
                                        Trending Topics
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {(slug === 'web3-ux-challenges'
                                            ? ['Web3', 'UX', 'Wallet', 'Security', 'Ethereum', 'DeFi', 'Onboarding']
                                            : slug === 'mastering-nextjs-performance'
                                                ? ['Next.js', 'React', 'Performance', 'Web Vitals', 'Edge', 'Vercel']
                                                : slug === 'ai-driven-security'
                                                    ? ['CyberSec', 'AI', 'ZeroTrust', 'ThreatIntel', 'DevSecOps', 'Malware']
                                                    : slug === 'llm-fine-tuning'
                                                        ? ['LLM', 'FineTuning', 'Ollama', 'Python', 'AI', 'OpenSource']
                                                        : ['Agents', 'LLM', 'Automation', 'Enterprise', 'RAG', 'VectorDB', 'Python']
                                        ).map(tag => (
                                            <Link
                                                key={tag}
                                                href={`/search?q=${tag}`}
                                                className="px-3 py-1.5 bg-secondary/5 hover:bg-primary/10 text-xs font-medium text-muted-foreground hover:text-primary border border-border/40 hover:border-primary/20 rounded-md transition-all"
                                            >
                                                {tag}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Latest From Blog Section */}
            <div className="container max-w-7xl mx-auto px-6 mt-16 border-t border-border/40 pt-16">
                <div className="flex items-center justify-between mb-12">
                    <h3 className="text-2xl font-black tracking-tight">From the blog</h3>
                    <Link href="/blog" className="px-6 py-2 rounded-lg bg-secondary/10 border border-border/40 text-sm font-bold hover:bg-secondary/20 transition-all">
                        View all posts
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {portfolioData.blogs.filter(b => b.slug !== slug).slice(0, 2).map((b) => (
                        <div key={b.slug} className="group">
                            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-6 bg-secondary/5 border border-border/40">
                                <Image src={b.image} alt={b.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                                <div className="absolute bottom-4 left-4">
                                    <span className="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
                                        {t(`categories.${b.category}`)}
                                    </span>
                                </div>
                            </div>
                            <h4 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors flex items-center gap-2">
                                {b.title}
                            </h4>
                            <p className="text-muted-foreground line-clamp-2 mb-4">{b.excerpt}</p>
                            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                                <div className="w-6 h-6 rounded-full bg-secondary/20 relative overflow-hidden">
                                    <Image src={b.author.avatar} alt={b.author.name} fill className="object-cover" />
                                </div>
                                {b.author.name} · {b.date}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
