"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  const rows = new Array(40).fill(1);
  const cols = new Array(25).fill(1);
  let colors = [
    "#f8fafc", // slate-50 (pure bright)
    "#e2e8f0", // slate-200
    "#94a3b8", // slate-400
    "#475569", // slate-600
    "#1e293b", // slate-800
    "#f4f4f5", // zinc-100
    "#a1a1aa", // zinc-400
    "#3f3f46", // zinc-700
    "#18181b", // zinc-950
    "#334155", // slate-700
    "#1e3a8a", // deep blue (rich)
    "#312e81", // indigo-900 (rich)
    "#4c1d95", // purple-900 (rich)
    "#0f172a", // slate-950
    "#ffffff", // pure white
  ];
  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div
      style={{
        transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
      }}
      className={cn(
        "absolute -top-1/4 left-1/4 z-0 flex h-full w-full -translate-x-1/2 -translate-y-1/2 p-4",
        className,
      )}
      {...rest}
    >
      {rows.map((_, i) => (
        <motion.div
          key={`row` + i}
          className="relative h-24 w-40 border-l border-zinc-200/60 dark:border-zinc-700/80"
        >
          {cols.map((_, j) => (
            <motion.div
              whileHover={{
                backgroundColor: `${getRandomColor()}`,
                transition: { duration: 0 },
              }}
              animate={{
                transition: { duration: 2 },
              }}
              key={`col` + j}
              className="relative h-24 w-40 border-t border-r border-zinc-200/60 dark:border-zinc-700/80"
            >
              {j % 2 === 0 && i % 2 === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="pointer-events-none absolute -top-[14px] -left-[22px] h-6 w-10 stroke-[1.5px] text-zinc-400/30 dark:text-zinc-500/40"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
