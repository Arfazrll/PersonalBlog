"use client"

import React, { HTMLAttributes, useCallback, useMemo } from "react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

interface WarpBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  perspective?: number
  beamsPerSide?: number
  beamSize?: number
  beamDelayMax?: number
  beamDelayMin?: number
  beamDuration?: number
  gridColor?: string
  paused?: boolean
}

const Beam = ({
  width,
  x,
  delay,
  duration,
  paused,
}: {
  width: string | number
  x: string | number
  delay: number
  duration: number
  paused?: boolean
}) => {
  const hue = useMemo(() => Math.floor(Math.random() * 360), [])
  const ar = useMemo(() => Math.floor(Math.random() * 10) + 1, [])

  return (
    <motion.div
      style={
        {
          "--x": `${x}`,
          "--width": `${width}`,
          "--aspect-ratio": `${ar}`,
          "--background": `linear-gradient(to top, hsl(${hue} 50% 65% / 0.8), transparent)`,
        } as React.CSSProperties
      }
      className="absolute top-0 left-[var(--x)] [aspect-ratio:1/var(--aspect-ratio)] [width:var(--width)] [background-image:var(--background)] mix-blend-screen opacity-70"
      initial={{ y: "100cqmax", x: "-50%" }}
      animate={paused ? {} : { y: "-100cqi", x: "-50%" }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  )
}

export const WarpBackground: React.FC<WarpBackgroundProps> = ({
  children,
  perspective = 100,
  className,
  beamsPerSide = 3,
  beamSize = 5,
  beamDelayMax = 3,
  beamDelayMin = 0,
  beamDuration = 3,
  gridColor = "var(--border)",
  paused = false,
  ...props
}) => {
  const generateBeams = useCallback(() => {
    const beams = []
    const cellsPerSide = Math.floor(100 / beamSize)
    const step = cellsPerSide / beamsPerSide

    for (let i = 0; i < beamsPerSide; i++) {
      const x = Math.floor(i * step)
      const delay = Math.random() * (beamDelayMax - beamDelayMin) + beamDelayMin
      beams.push({ x, delay })
    }
    return beams
  }, [beamsPerSide, beamSize, beamDelayMax, beamDelayMin])

  const topBeams = useMemo(() => generateBeams(), [generateBeams])
  const rightBeams = useMemo(() => generateBeams(), [generateBeams])
  const bottomBeams = useMemo(() => generateBeams(), [generateBeams])
  const leftBeams = useMemo(() => generateBeams(), [generateBeams])

  return (
    <div className={cn("relative rounded border p-20", className)} {...props}>
      <div
        style={
          {
            "--perspective": `${perspective}px`,
            "--grid-color": gridColor,
            "--beam-size": `${beamSize}%`,
          } as React.CSSProperties
        }
        className={
          "[container-type:size] pointer-events-none absolute top-0 left-0 size-full overflow-hidden [clipPath:inset(0)] [perspective:var(--perspective)] [transform-style:preserve-3d]"
        }
      >
        {/* top side */}
        <div className="[container-type:inline-size] absolute z-20 [height:100cqmax] [width:100cqi] [transform-origin:50%_0%] [transform:rotateX(-90deg)] [background-size:var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,_var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)] [transform-style:preserve-3d]">
          {topBeams.map((beam, index) => (
            <Beam
              key={`top-${index}`}
              width={`${beamSize}%`}
              x={`${beam.x * beamSize}%`}
              delay={beam.delay}
              duration={beamDuration}
              paused={paused}
            />
          ))}
        </div>
        {/* bottom side */}
        <div className="[container-type:inline-size] absolute top-full [height:100cqmax] [width:100cqi] [transform-origin:50%_0%] [transform:rotateX(-90deg)] [background-size:var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,_var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)] [transform-style:preserve-3d]">
          {bottomBeams.map((beam, index) => (
            <Beam
              key={`bottom-${index}`}
              width={`${beamSize}%`}
              x={`${beam.x * beamSize}%`}
              delay={beam.delay}
              duration={beamDuration}
              paused={paused}
            />
          ))}
        </div>
        {/* left side */}
        <div className="[container-type:inline-size] absolute top-0 left-0 [height:100cqmax] [width:100cqh] [transform-origin:0%_0%] [transform:rotate(90deg)_rotateX(-90deg)] [background-size:var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,_var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)] [transform-style:preserve-3d]">
          {leftBeams.map((beam, index) => (
            <Beam
              key={`left-${index}`}
              width={`${beamSize}%`}
              x={`${beam.x * beamSize}%`}
              delay={beam.delay}
              duration={beamDuration}
              paused={paused}
            />
          ))}
        </div>
        {/* right side */}
        <div className="[container-type:inline-size] absolute top-0 right-0 [height:100cqmax] [width:100cqh] [transform-origin:100%_0%] [transform:rotate(-90deg)_rotateX(-90deg)] [background-size:var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,_var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)] [transform-style:preserve-3d]">
          {rightBeams.map((beam, index) => (
            <Beam
              key={`right-${index}`}
              width={`${beamSize}%`}
              x={`${beam.x * beamSize}%`}
              delay={beam.delay}
              duration={beamDuration}
              paused={paused}
            />
          ))}
        </div>
      </div>
      <div className="relative">{children}</div>
    </div>
  )
}
