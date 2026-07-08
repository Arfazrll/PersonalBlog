"use client"

import type React from "react"
import { useState, useRef, forwardRef } from "react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

interface Project {
  id: string
  image: string
  title: string
}

interface AnimatedFolderProps {
  title: string
  projects: Project[]
  className?: string
}

export function AnimatedFolder({ title, projects, className }: AnimatedFolderProps) {
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter()

  return (
    <>
      <div
        className={cn(
          "relative flex flex-col items-center justify-center w-full h-full",
          "cursor-pointer",
          "transition-all duration-500 ease-out",
          "hover:shadow-primary/10",
          "group",
          className,
        )}
        style={{
          perspective: "1000px",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => {
          router.push('/gallery');
        }}
      >
        {/* Subtle background glow on hover */}
        <div
          className="absolute inset-0 rounded-[14px] transition-opacity duration-500 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 70%, var(--primary) 0%, transparent 70%)",
            opacity: isHovered ? 0.08 : 0,
          }}
        />

        <div className="relative flex items-center justify-center mb-0 mt-4" style={{ height: "140px", width: "240px" }}>
          {/* Folder back layer - z-index 10 */}
          <div
            className="absolute w-40 h-32 bg-orange-600 rounded-lg shadow-md"
            style={{
              transformOrigin: "bottom center",
              transform: isHovered ? "rotateX(-15deg)" : "rotateX(0deg)",
              transition: "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
              zIndex: 10,
            }}
          />

          {/* Folder tab - z-index 10 */}
          <div
            className="absolute w-16 h-6 bg-orange-500 rounded-t-md"
            style={{
              top: "calc(50% - 64px - 16px)",
              left: "calc(50% - 80px + 20px)",
              transformOrigin: "bottom center",
              transform: isHovered ? "rotateX(-25deg) translateY(-2px)" : "rotateX(0deg)",
              transition: "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
              zIndex: 10,
            }}
          />

          {/* Project cards - z-index 20, between back and front */}
          <div
            className="absolute"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 20,
            }}
          >
            {projects.slice(0, 3).map((project, index) => (
              <ProjectCard
                key={project.id}
                image={project.image}
                title={project.title}
                delay={index * 80}
                isVisible={isHovered}
                index={index}
              />
            ))}
          </div>

          {/* Folder front layer - z-index 30 */}
          <div
            className="absolute w-40 h-32 bg-orange-500 rounded-lg shadow-lg"
            style={{
              top: "calc(50% - 64px + 6px)",
              transformOrigin: "bottom center",
              transform: isHovered ? "rotateX(25deg) translateY(8px)" : "rotateX(0deg)",
              transition: "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
              zIndex: 30,
            }}
          />

          {/* Folder shine effect - z-index 31 */}
          <div
            className="absolute w-40 h-32 rounded-lg overflow-hidden pointer-events-none"
            style={{
              top: "calc(50% - 64px + 6px)",
              background: "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%)",
              transformOrigin: "bottom center",
              transform: isHovered ? "rotateX(25deg) translateY(8px)" : "rotateX(0deg)",
              transition: "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
              zIndex: 31,
            }}
          />
        </div>

        {/* Hover hint */}
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-xs text-muted-foreground transition-all duration-300 uppercase font-black tracking-widest pointer-events-none"
          style={{
            opacity: isHovered ? 0 : 0.6,
            transform: isHovered ? "translateY(10px)" : "translateY(0)",
          }}
        >
        </div>
      </div>
    </>
  )
}

interface ProjectCardProps {
  image: string
  title: string
  delay: number
  isVisible: boolean
  index: number
}

export const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ image, title, delay, isVisible, index }, ref) => {
    const rotations = [-12, 0, 12]
    const translations = [-70, 0, 70] // spread wider since cards are bigger

    return (
      <div
        ref={ref}
        className={cn(
          "absolute w-24 h-36 rounded-lg overflow-hidden shadow-xl", // increased from w-20 h-28
          "bg-card border border-border pointer-events-none", // pointer-events-none prevents blocking folder click
        )}
        style={{
          transform: isVisible
            ? `translateY(-110px) translateX(${translations[index]}px) rotate(${rotations[index]}deg) scale(1)`
            : "translateY(0px) translateX(0px) rotate(0deg) scale(0.5)",
          opacity: isVisible ? 1 : 0,
          transition: `all 600ms cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`,
          zIndex: 10 - index,
          left: "-48px",
          top: "-72px",
        }}
      >
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <p className="absolute bottom-1.5 left-1.5 right-1.5 text-[10px] font-medium text-primary-foreground truncate text-center">
          {title}
        </p>
      </div>
    )
  }
)

ProjectCard.displayName = "ProjectCard"
