import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useTransform, PanInfo, animate } from 'framer-motion';

interface ArchedIconsProps {
  icons: string[];
}


export function ArchedTechIconsInteractive({ icons }: ArchedIconsProps) {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Motion Values are stable and SSR-safe. We define them at the top level.
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotation = useMotionValue(0);
  
  // Cursor stretching mechanics
  const mouseVelocityX = useMotionValue(0);
  const cursorScaleX = useTransform(mouseVelocityX, [-3000, 0, 3000], [1.5, 1, 1.5], { clamp: true });

  // Transforms are also stable hook calls.
  const cursorX = useTransform(mouseX, (x) => x);
  const cursorY = useTransform(mouseY, (y) => y);
  const counterRotation = useTransform(rotation, (v) => -v);

  useEffect(() => {
    setMounted(true);
    
    // Safety Logic: Stop animations during scroll to prevent visual glitches
    const handleScroll = () => {
      // Forcefully halt the motion value immediately without extra renders
      rotation.stop();
      setIsDragging(false);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [rotation]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const newX = e.clientX - rect.left;
    const prevX = mouseX.get();
    
    // Smooth velocity calculation to prevent cursor jitter
    mouseVelocityX.set((newX - prevX) * 40);
    mouseX.set(newX);
    mouseY.set(e.clientY - rect.top);
  };

  const handlePanStart = () => {
    setIsDragging(true);
  };

  const handlePan = (e: any, info: PanInfo) => {
    // Extreme industrial weight 
    rotation.set(rotation.get() + info.delta.x * 0.05);
  };

  const handlePanEnd = (e: any, info: PanInfo) => {
    setIsDragging(false);
    const velocity = info.velocity.x;
    
    // HEAVY INDUSTRIAL MOMENTUM: Mass 5, High Damping
    if (Math.abs(velocity) > 20) {
      animate(rotation, rotation.get() + velocity * 0.1, {
        type: 'spring',
        stiffness: 20,
        damping: 50,
        mass: 5, // Heavy wheel physics
        restDelta: 0.01
      });
    }
  };

  const wrapperStyle = {
    opacity: mounted ? 1 : 0,
    transition: 'opacity 0.5s ease-in-out',
    width: '100%',
    height: '100%'
  };

  return (
    <div 
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="relative w-full max-w-full overflow-hidden flex justify-center z-0 h-[220px] sm:h-[280px] md:h-[350px] cursor-none select-none"
      style={{ touchAction: 'pan-y' }}
    >
      <div style={wrapperStyle}>
        {/* REDESIGNED DRAG CURSOR - Adaptive Glassmorphic Pill */}
        <motion.div
          className="pointer-events-none absolute z-[100] flex items-center justify-center gap-2 px-8 py-3 bg-[#0a0a0a]/10 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/20 rounded-full shadow-xl overflow-hidden"
          style={{ 
            x: cursorX, 
            y: cursorY,
            translateX: "-50%",
            translateY: "-50%",
            scaleX: cursorScaleX
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? (isDragging ? 1.1 : 1) : 0,
            width: isHovered ? 'auto' : 0,
          }}
          transition={{ type: "spring", damping: 25, stiffness: 400 }}
        >
          <span className="text-[10px] font-bold text-black dark:text-white tracking-[0.4em] uppercase whitespace-nowrap">DRAG</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 dark:via-white/5 to-transparent -translate-x-full animate-[move-x_3s_infinite]" />
        </motion.div>

        {/* Drag Capture Surface - touch-action: none prevents accidental page-bounce */}
        <motion.div 
          className="absolute inset-0 z-50 cursor-none"
          style={{ touchAction: 'none' }}
          onPanStart={handlePanStart}
          onPan={handlePan}
          onPanEnd={handlePanEnd}
        />

        {/* Arch Wheel: Enforce permanent GPU composition to eliminate scroll-snapping glitches */}
        <div className="absolute left-1/2 top-[30px] sm:top-[40px] md:top-[60px] w-[800px] h-[800px] sm:w-[1200px] sm:h-[1200px] md:w-[1700px] md:h-[1700px] -translate-x-1/2 rounded-full pointer-events-none perspective-[1000px] will-change-transform transform-gpu">
          <motion.div 
            className="w-full h-full rounded-full transform-gpu transition-shadow duration-500"
            style={{ 
              rotate: rotation, 
              WebkitBackfaceVisibility: 'hidden', 
              backfaceVisibility: 'hidden',
              translateZ: 0 
            }}
          >
            {icons.map((icon, i) => {
              const angle = (i / icons.length) * 360;
              return (
                <div 
                  key={`icon-${icon}-${i}`} 
                  className="absolute inset-0 preserve-3d" 
                  style={{ transform: `rotate(${angle}deg)` }}
                >
                  <div className="absolute top-0 left-1/2 -ml-[28px] sm:-ml-[32px] md:-ml-[42px] -mt-[28px] sm:-mt-[32px] md:-mt-[42px] w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] md:w-[84px] md:h-[84px]">
                    <motion.div 
                      className="w-full h-full rounded-[14px] sm:rounded-[18px] md:rounded-[22px] bg-white/95 dark:bg-[#0a0a0a]/95 border border-gray-200 dark:border-white/10 flex items-center justify-center p-2.5 sm:p-3 md:p-4 transform-gpu shadow-sm"
                      style={{ 
                        rotate: counterRotation, 
                        WebkitBackfaceVisibility: 'hidden', 
                        backfaceVisibility: 'hidden',
                        translateZ: 0 
                      }}
                    >
                      <div className="w-full h-full relative" style={{ WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' }}>
                          <Image 
                            src={icon} 
                            alt={`tech-icon-${i}`} 
                            fill 
                            className="object-contain opacity-90 transform-gpu" 
                            unoptimized 
                            priority={true} 
                            draggable={false}
                          />
                      </div>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Ambient Gradients - Explicit GPU Layering */}
        <div className="absolute inset-x-0 bottom-0 h-16 sm:h-20 md:h-28 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none z-10 transform-gpu" />
        <div className="absolute inset-y-0 left-0 w-8 sm:w-16 md:w-32 bg-gradient-to-r from-background to-transparent pointer-events-none z-10 transform-gpu" />
        <div className="absolute inset-y-0 right-0 w-8 sm:w-16 md:w-32 bg-gradient-to-l from-background to-transparent pointer-events-none z-10 transform-gpu" />
      </div>
    </div>
  );
}
