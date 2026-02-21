"use client"

import * as React from "react"
import { useEffect } from "react"
import { motion, stagger, useAnimate, useInView } from "framer-motion"
import { cn } from "@/lib/utils"
import { Icons } from "../icons"

export type LogoIconType =
  | "discord"
  | "twitter"
  | "gitHub"
  | "react"
  | "ts"
  | "tailwind"
  | "radix"
  | "googleDrive"
  | "notion"
  | "whatsapp"
  | "messenger"
  | "openai"
  | "zapier"
  | "v0"
  | "paypal"
  | "applePay"
  | "server"
  | "unknown"
  | "nextjs"
  | "typescript"
  | "nodejs"
  | "express"
  | "postgresql"
  | "mongodb"
  | "graphql"
  | "apollo"
  | "docker"
  | "kubernetes"
  | "aws"
  | "azure"
  | "gcp"
  | "figma"
  | "vercel"
  | "git"
  | "github"
  | "vscode"
  | "jira"
  | "slack"
  | "postman"
  | "framer"
  | "storybook"
  | "netlify"
  | "stripe"
  | "auth0"
  | string;

export interface LogoItem {
  label: string
  icon: LogoIconType
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
  isLowPowerMode?: boolean
}

export function LogoTimeline({
  title,
  subtitle = "The technologies and tools I use to build amazing projects",
  height = "h-[280px] sm:h-[350px] md:h-[400px] lg:h-[480px]",
  className,
  iconSize = 16,
  isLowPowerMode,
}: {
  title?: string;
  subtitle?: string;
  height?: string;
  className?: string;
  iconSize?: number;
  isLowPowerMode?: boolean;
}) {
  const [scope, animate] = useAnimate()
  const isInView = useInView(scope, { once: true })

  // Define comprehensive items from portfolioData
  const techItems: LogoItem[] = [
    { label: "React", icon: "react" as LogoIconType, animationDelay: 0, animationDuration: 20, row: 0 },
    { label: "Next.js", icon: "nextjs" as LogoIconType, animationDelay: 0, animationDuration: 25, row: 0 },
    { label: "TypeScript", icon: "typescript" as LogoIconType, animationDelay: 0, animationDuration: 22, row: 0 },
    { label: "Tailwind CSS", icon: "tailwind" as LogoIconType, animationDelay: 0, animationDuration: 28, row: 0 },
    { label: "Three.js", icon: "framer" as LogoIconType, animationDelay: 0, animationDuration: 24, row: 1 },
    { label: "GSAP", icon: "framer" as LogoIconType, animationDelay: 0, animationDuration: 26, row: 1 },
    { label: "Python", icon: "server" as LogoIconType, animationDelay: 0, animationDuration: 21, row: 1 },
    { label: "Flask", icon: "server" as LogoIconType, animationDelay: 0, animationDuration: 24, row: 1 },
    { label: "LangChain", icon: "openai" as LogoIconType, animationDelay: 0, animationDuration: 27, row: 2 },
    { label: "Ollama", icon: "openai" as LogoIconType, animationDelay: 0, animationDuration: 20, row: 2 },
    { label: "TensorFlow", icon: "server" as LogoIconType, animationDelay: 0, animationDuration: 29, row: 2 },
    { label: "Keras", icon: "server" as LogoIconType, animationDelay: 0, animationDuration: 23, row: 2 },
    { label: "Go", icon: "server" as LogoIconType, animationDelay: 0, animationDuration: 25, row: 3 },
    { label: "Gin", icon: "server" as LogoIconType, animationDelay: 0, animationDuration: 28, row: 3 },
    { label: "Solidity", icon: "v0" as LogoIconType, animationDelay: 0, animationDuration: 22, row: 3 },
    { label: "Ethereum", icon: "applePay" as LogoIconType, animationDelay: 0, animationDuration: 26, row: 3 },
    { label: "Java", icon: "server" as LogoIconType, animationDelay: 0, animationDuration: 23, row: 4 },
    { label: "Spring Boot", icon: "server" as LogoIconType, animationDelay: 0, animationDuration: 25, row: 4 },
    { label: "Laravel", icon: "server" as LogoIconType, animationDelay: 0, animationDuration: 21, row: 4 },
    { label: "PostgreSQL", icon: "postgresql" as LogoIconType, animationDelay: 0, animationDuration: 24, row: 4 },
    { label: "MongoDB", icon: "mongodb" as LogoIconType, animationDelay: 0, animationDuration: 27, row: 5 },
    { label: "Firebase", icon: "googleDrive" as LogoIconType, animationDelay: 0, animationDuration: 20, row: 5 },
    { label: "Prisma", icon: "radix" as LogoIconType, animationDelay: 0, animationDuration: 29, row: 5 },
    { label: "Docker", icon: "docker" as LogoIconType, animationDelay: 0, animationDuration: 22, row: 5 },
    { label: "Kubernetes", icon: "kubernetes" as LogoIconType, animationDelay: 0, animationDuration: 30, row: 6 },
    { label: "AWS", icon: "aws" as LogoIconType, animationDelay: 0, animationDuration: 25, row: 6 },
    { label: "Azure", icon: "azure" as LogoIconType, animationDelay: 0, animationDuration: 28, row: 6 },
    { label: "Vercel", icon: "vercel" as LogoIconType, animationDelay: 0, animationDuration: 22, row: 6 },
  ];

  const toolItems: LogoItem[] = [
    { label: "Git", icon: "git" as LogoIconType, animationDelay: 0, animationDuration: 20, row: 0 },
    { label: "GitHub", icon: "github" as LogoIconType, animationDelay: 0, animationDuration: 25, row: 0 },
    { label: "VS Code", icon: "vscode" as LogoIconType, animationDelay: 0, animationDuration: 22, row: 0 },
    { label: "Figma", icon: "figma" as LogoIconType, animationDelay: 0, animationDuration: 28, row: 1 },
    { label: "Postman", icon: "postman" as LogoIconType, animationDelay: 0, animationDuration: 23, row: 1 },
    { label: "Jira", icon: "jira" as LogoIconType, animationDelay: 0, animationDuration: 26, row: 2 },
    { label: "Slack", icon: "slack" as LogoIconType, animationDelay: 0, animationDuration: 21, row: 2 },
    { label: "Docker", icon: "docker" as LogoIconType, animationDelay: 0, animationDuration: 24, row: 3 },
    { label: "Vercel", icon: "vercel" as LogoIconType, animationDelay: 0, animationDuration: 27, row: 3 },
    { label: "Netlify", icon: "netlify" as LogoIconType, animationDelay: 0, animationDuration: 20, row: 4 },
    { label: "MetaMask", icon: "paypal" as LogoIconType, animationDelay: 0, animationDuration: 29, row: 4 },
  ];

  const rows = React.useMemo(() => {
    // Final polish: 7 rows with unique partitioning
    const rowCount = 7;
    const itemsPerRow = 4;

    const allItems = [...techItems, ...toolItems];

    return Array.from({ length: rowCount }).map((_, rowIndex) => {
      const isReverse = rowIndex % 2 === 1;

      // Fixed duration for all items in a row to maintain relative spacing
      const rowBaseDuration = 18 + (rowIndex * 2);

      const items = Array.from({ length: itemsPerRow }).map((_, i) => {
        // Partitioned index to ensure NO duplicates across any row
        const itemIndex = (rowIndex * itemsPerRow + i) % allItems.length;
        const item = allItems[itemIndex];

        return {
          ...item,
          animationDuration: rowBaseDuration * (isLowPowerMode ? 1.5 : 1)
        };
      });
      return items;
    });
  }, [isLowPowerMode]);

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

      {/* Timeline container - dynamic filling */}
      <div
        className={cn("relative overflow-hidden w-full", isLowPowerMode ? "h-64" : height)}
      >
        {/* Blur effects - Subtle Edges */}
        {!isLowPowerMode && (
          <>
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />
          </>
        )}

        <div className="flex flex-col justify-between h-full w-full py-2 sm:py-4 relative z-10">
          {rows.map((rowItems, rowIndex) => {
            const isReverse = rowIndex % 2 === 1

            return (
              <div key={rowIndex} className="relative w-full h-8 sm:h-12">
                {/* Dotted track line - Light blue in light mode, white in dark mode */}
                <div
                  className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-px z-0 dotted-track"
                />

                {rowItems.map((item, itemIndex) => {
                  const IconComponent = (Icons as any)[item.icon] || Icons.unknown
                  const totalItems = rowItems.length
                  const offsetPercent = (itemIndex / totalItems) * 100

                  return (
                    <motion.div
                      key={`${item.label}-${itemIndex}`}
                      className="absolute top-1/2 flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full border border-border/40 dark:border-white/5 bg-background/60 dark:bg-background/40 backdrop-blur-sm hover:bg-background/80 transition-colors cursor-default z-10 shadow-sm"
                      style={{ y: "-50%" }}
                      initial={{ left: isReverse ? "120%" : "-20%" }}
                      animate={{ left: isReverse ? "-20%" : "120%" }}
                      transition={{
                        left: {
                          duration: item.animationDuration,
                          repeat: Infinity,
                          repeatType: "mirror", // Seamless back-and-forth yoyo
                          ease: "easeInOut", // Natural acceleration/deceleration
                          delay: -((item.animationDuration * offsetPercent) / 100)
                        }
                      }}
                    >
                      <IconComponent style={{ width: iconSize, height: iconSize }} className="text-foreground/70 flex-shrink-0 w-3 h-3 sm:w-4 sm:h-4" />
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
            background-image: repeating-linear-gradient(to right, rgba(96, 165, 250, 0.2) 0, rgba(96, 165, 250, 0.2) 3px, transparent 3px, transparent 10px);
          }
          .dark .dotted-track {
            background-image: repeating-linear-gradient(to right, rgba(255,255,255,0.08) 0, rgba(255,255,255,0.08) 3px, transparent 3px, transparent 15px);
          }
        `}</style>
      </div>
    </div>
  )
}
