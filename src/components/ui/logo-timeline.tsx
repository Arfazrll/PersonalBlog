"use client"

import * as React from "react"
import { useEffect } from "react"
import { motion, stagger, useAnimate, useInView } from "framer-motion"
import { cn } from "@/lib/utils"
import { Icons } from "../icons"

export interface LogoItem {
  label: string
  icon: keyof typeof Icons
  animationDelay: number
  animationDuration: number
  row: number
}

interface LogoTimelineProps {
  items: LogoItem[]
  title?: string
  subtitle?: string
  height?: string
  className?: string
  iconSize?: number
}

export function LogoTimeline({
  items,
  title,
  subtitle = "The technologies and tools I use to build amazing projects",
  height = "h-[280px] sm:h-[350px] md:h-[400px] lg:h-[480px]",
  className,
  iconSize = 16,
}: LogoTimelineProps) {
  const [scope, animate] = useAnimate()
  const isInView = useInView(scope, { once: true })

  const rows = React.useMemo(() => {
    const grouped: Record<number, LogoItem[]> = {}
    items.forEach((item) => {
      if (!grouped[item.row]) grouped[item.row] = []
      grouped[item.row].push(item)
    })
    return Object.keys(grouped)
      .sort((a, b) => Number(a) - Number(b))
      .map((key) => grouped[Number(key)])
  }, [items])

  // Animate title words
  useEffect(() => {
    if (isInView && title) {
      animate(
        ".title-word",
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        },
        {
          duration: 0.6,
          delay: stagger(0.1),
        }
      )
    }
  }, [isInView, animate, title])

  const titleWords = title?.split(" ") || []

  return (
    <div className={cn("relative", className)}>
      {/* Animated Title at the top */}
      {title && (
        <div ref={scope} className="text-center mb-4 sm:mb-6 md:mb-8 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-2 sm:mb-3 md:mb-4 pb-2 overflow-visible">
            {titleWords.map((word, idx) => (
              <motion.span
                key={word + idx}
                className="title-word inline-block opacity-0"
                style={{
                  filter: "blur(10px)",
                  transform: "translateY(20px)",
                  paddingRight: "0.2em",
                }}
              >
                <span className="bg-gradient-to-r from-foreground via-primary to-cyan-500 dark:from-white dark:via-primary dark:to-cyan-400 bg-clip-text text-transparent">
                  {word}
                </span>
              </motion.span>
            ))}
          </h2>
          <motion.p
            className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {subtitle}
          </motion.p>
        </div>
      )}

      {/* Timeline container - responsive margins */}
      <div
        className={cn("relative overflow-hidden mx-4 sm:mx-8 md:mx-16 lg:mx-24", height)}
      >
        {/* Blur/Fog Effects on Left and Right - responsive width */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-30 w-12 sm:w-16 md:w-24 lg:w-32"
          style={{
            background: 'linear-gradient(to right, hsl(var(--background)) 0%, hsl(var(--background) / 0.95) 40%, hsl(var(--background) / 0.6) 70%, transparent 100%)'
          }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-30 w-12 sm:w-16 md:w-24 lg:w-32"
          style={{
            background: 'linear-gradient(to left, hsl(var(--background)) 0%, hsl(var(--background) / 0.95) 40%, hsl(var(--background) / 0.6) 70%, transparent 100%)'
          }}
        />

        <div className="flex flex-col justify-evenly h-full w-full py-2 sm:py-4 relative z-10">
          {rows.map((rowItems, rowIndex) => {
            const isReverse = rowIndex % 2 === 1

            return (
              <div key={rowIndex} className="relative w-full h-8 sm:h-10">
                {/* Dotted track line - Light blue in light mode, white in dark mode */}
                <div
                  className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-px z-0 dotted-track"
                />

                {rowItems.map((item, itemIndex) => {
                  const Icon = Icons[item.icon] || Icons.unknown
                  const totalItems = rowItems.length
                  const offsetPercent = (itemIndex / totalItems) * 100

                  return (
                    <motion.div
                      key={`${item.label}-${itemIndex}`}
                      className="absolute top-1/2 flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full border border-border/50 dark:border-white/10 bg-background/90 dark:bg-background/70 backdrop-blur-sm hover:bg-background hover:border-border dark:hover:border-white/20 transition-colors cursor-default z-10 shadow-sm"
                      style={{ y: "-50%" }}
                      initial={{ x: isReverse ? "-100%" : "100vw" }}
                      animate={{ x: isReverse ? "100vw" : "-100%" }}
                      transition={{
                        x: {
                          duration: item.animationDuration,
                          repeat: Infinity,
                          ease: "linear",
                          delay: -((item.animationDuration * offsetPercent) / 100)
                        }
                      }}
                    >
                      <Icon style={{ width: iconSize, height: iconSize }} className="text-foreground/70 flex-shrink-0 w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-sm font-medium text-muted-foreground whitespace-nowrap">{item.label}</span>
                    </motion.div>
                  )
                })}
              </div>
            )
          })}
        </div>

        {/* CSS for dotted track - different colors for light/dark mode */}
        <style>{`
          .dotted-track {
            background-image: repeating-linear-gradient(to right, #60a5fa 0, #60a5fa 3px, transparent 3px, transparent 10px);
          }
          .dark .dotted-track {
            background-image: repeating-linear-gradient(to right, rgba(255,255,255,0.15) 0, rgba(255,255,255,0.15) 3px, transparent 3px, transparent 10px);
          }
        `}</style>
      </div>
    </div>
  )
}
