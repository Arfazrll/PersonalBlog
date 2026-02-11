"use client"

import React, { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

interface MeteorsProps {
  number?: number
  minDelay?: number
  maxDelay?: number
  minDuration?: number
  maxDuration?: number
  angle?: number
  className?: string
  isLowPowerMode?: boolean
}

export const Meteors = ({
  number,
  className,
  minDelay = 0.2,
  maxDelay = 7,
  minDuration = 2,
  maxDuration = 10,
  angle = 215,
  isLowPowerMode,
}: MeteorsProps) => {
  const [meteorStyles, setMeteorStyles] = useState<Array<React.CSSProperties>>(
    []
  )

  useEffect(() => {
    if (isLowPowerMode) {
      setMeteorStyles([]);
      return;
    }
    const styles = [...new Array(number || 20)].map(() => ({
      "--angle": -angle + "deg",
      top: "-5%",
      left: `${Math.floor(Math.random() * 100)}%`, // Use percentage for better responsiveness
      animationDelay: Math.random() * (maxDelay - minDelay) + minDelay + "s",
      animationDuration:
        Math.floor(Math.random() * (maxDuration - minDuration) + minDuration) +
        "s",
    }))
    setMeteorStyles(styles)
  }, [number, minDelay, maxDelay, minDuration, maxDuration, angle, isLowPowerMode])

  if (isLowPowerMode) {
    return null;
  }

  return (
    <>
      {[...meteorStyles].map((style, idx) => (
        // Meteor Head
        <span
          key={idx}
          style={style}
          className={cn(
            "animate-meteor pointer-events-none absolute size-1.5 rounded-full bg-primary shadow-[0_0_20px_4px_hsl(var(--primary)/0.4)] will-change-transform z-[100]",
            className
          )}
        >
          {/* Meteor Tail */}
          <div className="pointer-events-none absolute top-1/2 -z-10 h-[2px] w-[100px] -translate-y-1/2 bg-gradient-to-r from-primary to-transparent" />
        </span>
      ))}
    </>
  )
}
