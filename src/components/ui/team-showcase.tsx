import { useState, memo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, useSpring, useVelocity } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TeamMember {
    id: string;
    name: string;
    role: string;
    description?: string;
    period?: string;
    image: string;
    social?: {
        twitter?: string;
        linkedin?: string;
        instagram?: string;
        behance?: string;
        website?: string;
    };
}

const DEFAULT_MEMBERS: TeamMember[] = [
    {
        id: '1',
        name: 'Chadrack',
        role: 'director of photography',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80',
        social: { twitter: '#', linkedin: '#', behance: '#' },
    },
    {
        id: '2',
        name: 'Mak VieSAinte',
        role: 'FOUNDER',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
        social: { twitter: '#', linkedin: '#' },
    },
    {
        id: '3',
        name: 'Osiris Balonga',
        role: 'LEAD FRONT-END',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
        social: { twitter: '#', linkedin: '#' },
    },
    {
        id: '4',
        name: 'Jacques',
        role: 'PRODUCT OWNER',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
        social: { linkedin: '#' },
    },
    {
        id: '5',
        name: 'Riche Makso',
        role: 'CTO - PRODUCT DESIGNER',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
        social: { twitter: '#', linkedin: '#' },
    },
    {
        id: '6',
        name: 'Jemima',
        role: 'MAKE-UP ARTISTE',
        image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80',
        social: { instagram: '#' } as TeamMember['social'],
    },
];

interface TeamShowcaseProps {
    members?: TeamMember[];
}

export default function TeamShowcase({ members = DEFAULT_MEMBERS }: TeamShowcaseProps) {
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // High-performance scroll tracking
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Precision momentum smoother
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 35,
        mass: 0.5,
        restDelta: 0.0001
    });

    // Tracking scroll velocity for intelligent gating
    const scrollVelocity = useVelocity(scrollYProgress);

    // Absolute Plateau Mapping (95% hold)
    const activeIndex = useTransform(smoothProgress, (p) => {
        const total = members.length;
        if (p >= 1) return total - 1;
        if (p <= 0) return 0;
        
        const segmentSize = 1 / (total - 1);
        const i = Math.floor(p / segmentSize);
        const progressInSegment = (p % segmentSize) / segmentSize;

        return progressInSegment < 0.95 ? i : i + 1;
    });

    // Stable State Logic: Prevents jitter and lag during fast scroll
    useMotionValueEvent(smoothProgress, "change", (p) => {
        const velocity = Math.abs(scrollVelocity.get());
        const targetIdx = Math.min(Math.max(Math.round(activeIndex.get()), 0), members.length - 1);
        const targetId = members[targetIdx]?.id || null;

        // Clean-Start Zone: If we are at the very beginning of the section,
        // keep everything collapsed for a professional, clean entrance.
        if (p < 0.02) {
            if (expandedId !== null) setExpandedId(null);
            return;
        }

        // End-zone buffer: Lock the "View More" item for a stable exit
        if (p > 0.98) {
            if (expandedId !== members[members.length - 1]?.id) {
                setExpandedId(members[members.length - 1]?.id);
            }
            return;
        }

        // VELOCITY HYSTERESIS: Higher threshold for closing, lower for opening
        if (velocity > 0.015) {
            if (expandedId !== null) setExpandedId(null);
        } else if (velocity < 0.008) {
            if (expandedId !== targetId) setExpandedId(targetId);
        }
    });

    const col1 = members.filter((_, i) => i % 3 === 0);
    const col2 = members.filter((_, i) => i % 3 === 1);
    const col3 = members.filter((_, i) => i % 3 === 2);

    const toggleExpand = (id: string) => {
        if (id === 'view-more') return;
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <section 
            ref={containerRef} 
            className="relative w-full"
            style={{ height: `${members.length * 80}vh` }} 
        >
            <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden min-h-[600px]">
                <div className="flex flex-col md:flex-row items-center justify-evenly select-none w-full max-w-[95vw] 2xl:max-w-[1700px] mx-auto py-4 md:py-8 px-4 md:px-6 font-sans">
                    {/* Left Side: Photo Grid - Equidistant Alignment */}
                    <div className="relative flex justify-center items-center perspective-1000 w-fit">
                        <div className="flex flex-row gap-3 md:gap-4 lg:gap-6 items-start w-fit">
                            {/* Column 1 */}
                            <div className="flex flex-col gap-3 md:gap-4 lg:gap-6">
                                {col1.map((member) => (
                                    <PhotoCard
                                        key={member.id}
                                        member={member}
                                        className="w-[20vw] h-[22vw] sm:w-[15vw] sm:h-[17vw] md:w-[12vw] md:h-[14vw] lg:w-[11vw] lg:h-[13vw] max-w-[180px] max-h-[200px]"
                                        activeId={hoveredId || expandedId}
                                        onHover={setHoveredId}
                                        onClick={() => toggleExpand(member.id)}
                                    />
                                ))}
                            </div>

                            {/* Column 2 */}
                            <div className="flex flex-col gap-3 md:gap-4 lg:gap-6 mt-[10%] md:mt-[15%]">
                                {col2.map((member) => (
                                    <PhotoCard
                                        key={member.id}
                                        member={member}
                                        className="w-[22vw] h-[24vw] sm:w-[17vw] sm:h-[19vw] md:w-[14vw] md:h-[16vw] lg:w-[13vw] lg:h-[15vw] max-w-[200px] max-h-[220px]"
                                        activeId={hoveredId || expandedId}
                                        onHover={setHoveredId}
                                        onClick={() => toggleExpand(member.id)}
                                    />
                                ))}
                            </div>

                            {/* Column 3 */}
                            <div className="flex flex-col gap-3 md:gap-4 lg:gap-6 mt-[5%] md:mt-[8%]">
                                {col3.map((member) => (
                                    <PhotoCard
                                        key={member.id}
                                        member={member}
                                        className="w-[21vw] h-[23vw] sm:w-[16vw] sm:h-[18vw] md:w-[13vw] md:h-[15vw] lg:w-[12vw] lg:h-[14vw] max-w-[190px] max-h-[210px]"
                                        activeId={hoveredId || expandedId}
                                        onHover={setHoveredId}
                                        onClick={() => toggleExpand(member.id)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Narrative List - Equidistant Alignment */}
                    <div className="relative flex flex-col items-start pt-4 md:pt-10 max-h-[70vh] md:max-h-none overflow-visible w-full md:w-[450px] lg:w-[500px] xl:w-[600px]">
                        {/* Continuous Timeline Background Line */}
                        <div 
                            className="absolute w-[1.5px] bg-foreground/10 pointer-events-none z-0" 
                            style={{ 
                                left: '9.25px', 
                                top: '24px', 
                                bottom: '48px' 
                            }} 
                        />

                        {/* Active Progress Line (Follows Scroll) */}
                        <motion.div 
                            className="absolute w-[1.5px] bg-[#D1FF4D] shadow-[0_0_10px_rgba(209,255,77,0.5)] pointer-events-none z-10 origin-top" 
                            style={{ 
                                left: '9.25px', 
                                top: '24px', 
                                height: 'calc(100% - 72px)',
                                scaleY: smoothProgress 
                            }} 
                        />

                        <AnimatePresence initial={false} mode="popLayout">
                            {members.map((member, index) => (
                                <MemberRow
                                    key={member.id}
                                    member={member}
                                    hoveredId={hoveredId}
                                    onHover={setHoveredId}
                                    isExpanded={expandedId === member.id}
                                    onToggle={() => toggleExpand(member.id)}
                                    isLast={index === members.length - 1}
                                    index={index}
                                    total={members.length}
                                    progress={smoothProgress}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────
   Photo card 
───────────────────────────────────────── */

function PhotoCard({
    member,
    className,
    activeId,
    onHover,
    onClick,
}: {
    member: TeamMember;
    className: string;
    activeId: string | null;
    onHover: (id: string | null) => void;
    onClick?: () => void;
}) {
    const isActive = activeId === member.id;
    const isDimmed = activeId !== null && !isActive;
    const isViewMore = member.id === 'view-more';

    const content = (
        <div
            className={cn(
                'overflow-hidden rounded-xl cursor-pointer flex-shrink-0 transition-all duration-500 h-full w-full',
                isDimmed ? 'opacity-60 scale-[0.98]' : 'opacity-100 scale-100',
            )}
            onMouseEnter={() => onHover(member.id)}
            onMouseLeave={() => onHover(null)}
            onClick={onClick}
        >
            <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover transition-all duration-700 bg-muted/20"
                style={{
                    filter: isActive 
                        ? 'grayscale(0) brightness(1) contrast(1.1)' 
                        : 'grayscale(1) brightness(0.6) contrast(0.9)',
                    transform: isActive ? 'scale(1.05)' : 'scale(1)',
                }}
            />
        </div>
    );

    if (isViewMore && member.social?.website) {
        return (
            <a href={member.social.website} className={cn('block h-full w-full', className)}>
                {content}
            </a>
        );
    }

    return <div className={className}>{content}</div>;
}

/* ─────────────────────────────────────────
   Member name section
 ───────────────────────────────────────── */

const MemberRow = memo(({
    member,
    hoveredId,
    onHover,
    isExpanded,
    onToggle,
    isLast,
    index,
    total,
    progress,
}: {
    member: TeamMember;
    hoveredId: string | null;
    onHover: (id: string | null) => void;
    isExpanded: boolean;
    onToggle: () => void;
    isLast: boolean;
    index: number;
    total: number;
    progress: any;
}) => {
    // A badge is highlighted if the scroll progress has reached its index
    // Threshold is slightly before the exact index to feel responsive
    const isHighlightedValue = useTransform(progress, (p: number) => {
        const threshold = index / (total - 1);
        return p >= threshold - 0.01;
    });

    const [isHighlighted, setIsHighlighted] = useState(index === 0);

    useMotionValueEvent(isHighlightedValue, "change", (latest) => {
        if (latest !== isHighlighted) setIsHighlighted(latest);
    });

    const isActive = hoveredId === member.id || isExpanded || isHighlighted;
    const isDimmed = hoveredId !== null && !isActive && !isExpanded;
    const isViewMore = member.id === 'view-more';

    const springConfig = { type: "spring", stiffness: 350, damping: 35, mass: 0.6 };

    const content = (
        <motion.div
            layout="size"
            transition={springConfig}
            className={cn(
                'cursor-pointer transition-opacity duration-300 w-full group/row relative',
                'pb-8 md:pb-10 lg:pb-10 xl:pb-12',
                isDimmed ? 'opacity-50' : 'opacity-100',
            )}
            onMouseEnter={() => onHover(member.id)}
            onMouseLeave={() => onHover(null)}
            onClick={onToggle}
            style={{ transform: "translateZ(0)" }}
        >
            <div className="flex justify-between items-start w-full relative z-10 h-full">
                <div className="flex-1">
                    <div className="flex items-start gap-2.5 h-full relative">
                        <div className="relative flex flex-col items-center pt-1.5 min-w-[20px]">
                            <motion.span
                                layout="position"
                                className={cn(
                                    'w-4 h-3 rounded-[5px] flex-shrink-0 transition-all duration-300 relative z-20',
                                    isActive ? 'bg-[#D1FF4D] w-5 shadow-[0_0_10px_rgba(209,255,77,0.6)]' : 'bg-foreground/25',
                                )}
                            />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <span
                                    className={cn(
                                        'text-base md:text-lg lg:text-xl font-bold leading-tight tracking-tight transition-colors duration-300',
                                        isActive ? 'text-foreground' : 'text-foreground/80',
                                    )}
                                >
                                    {member.name}
                                </span>
                                {!isViewMore && isExpanded && (
                                    <motion.span
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-foreground/40"
                                    >
                                        <ChevronUp size={14} />
                                    </motion.span>
                                )}
                            </div>
                            
                            {/* Role */}
                            <div className={cn(
                                "text-[10px] md:text-xs font-medium uppercase tracking-[0.2em] transition-colors duration-300 mt-1",
                                isActive ? "text-foreground/70" : "text-muted-foreground/50"
                            )}>
                                {member.role}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Description Accordion - Direct Height Animation for Max Performance */}
            {!isViewMore && member.description && (
                <motion.div
                    initial={false}
                    animate={{ 
                        height: isExpanded ? 'auto' : 0,
                        opacity: isExpanded ? 1 : 0,
                        marginTop: isExpanded ? 16 : 0
                    }}
                    transition={springConfig}
                    style={{ 
                        willChange: "height, opacity, margin-top", 
                        transform: "translateZ(0)",
                        overflow: "hidden"
                    }}
                    className="ml-[30px]"
                >
                    <div className="pb-2">
                        <p className="text-sm md:text-base text-foreground/60 leading-relaxed max-w-[90%]">
                            {member.description}
                        </p>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );

    if (isViewMore && member.social?.website) {
        return (
            <Link href={member.social.website} className="block w-full">
                {content}
            </Link>
        );
    }

    return content;
});

MemberRow.displayName = 'MemberRow';
