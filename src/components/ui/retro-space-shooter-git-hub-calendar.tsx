"use client";

import { memo, useMemo, useState, useEffect, useId, useRef } from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export type ContributionData = {
  [date: string]: {
    level: ContributionLevel;
    label?: string;
    count?: number;
  };
};

export type ThemeColors = {
  level0: string;
  level1: string;
  level2: string;
  level3: string;
  level4: string;
};

export type CellShape = "rounded" | "circle";

export type GithubCalendarProps = {
  username?: string; // GitHub username
  data?: ContributionData; //Optional - Only for manual data
  startDate?: string;
  endDate?: string;
  startsOnSunday?: boolean; //Want to start weeks on Sunday or not ?
  cellSize?: number;
  cellGap?: number;
  cellShape?: CellShape; //Rounded | Circle
  theme?: "github" | ThemeColors;
  showMonthLabels?: boolean; // Want the month labels on top
  showStats?: boolean;
  showLegend?: boolean;
  className?: string; // Custom class for custom styling
};

// ─── Built-in themes ──────────────────────────────────────────────────────────

const THEMES: Record<string, ThemeColors> = {
  github: {
    level0: "#ebedf0",
    level1: "#9be9a8",
    level2: "#40c463",
    level3: "#30a14e",
    level4: "#216e39",
  },
};

const DARK_THEMES: Record<string, ThemeColors> = {
  github: {
    level0: "#161b22",
    level1: "#0e4429",
    level2: "#006d32",
    level3: "#26a641",
    level4: "#39d353",
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parseDate(dateStr: string): Date {
  const parts = dateStr.split("-").map(Number);
  const y = parts[0] ?? 0;
  const m = parts[1] ?? 1;
  const d = parts[2] ?? 1;
  return new Date(y, m - 1, d);
}

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const FULL_MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getOrdinalSuffix(day: number): string {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

function formatTooltipDate(dateStr: string): string {
  try {
    const date = parseDate(dateStr);
    const month = FULL_MONTH_NAMES[date.getMonth()];
    const day = date.getDate();
    const suffix = getOrdinalSuffix(day);
    return `${month} ${day}${suffix}`;
  } catch (e) {
    return dateStr;
  }
}

function playSound(type: "laser" | "explosion" | "hit" | "victory") {
  // Sound effects disabled
}

// ─── API fetch ────────────────────────────────────────────────────────────────

type APIResponse = {
  total: Record<string, number>;
  contributions: { date: string; count: number; level: number }[];
};

async function fetchContributions(username: string): Promise<ContributionData> {
  const res = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${username}`,
  );
  if (!res.ok) {
    throw new Error(
      `Could not fetch contributions for "${username}" (${res.status})`,
    );
  }
  const json: APIResponse = await res.json();

  const result: ContributionData = {};
  for (const entry of json.contributions) {
    result[entry.date] = {
      level: Math.min(4, Math.max(0, entry.level)) as ContributionLevel,
      count: entry.count,
    };
  }
  return result;
}

// ─── Build calendar grid ──────────────────────────────────────────────────────

function buildGrid(
  startDate: string,
  endDate: string,
  startsOnSunday: boolean,
): {
  weeks: (string | null)[][];
  monthLabels: { label: string; weekIndex: number }[];
  gridStart: string;
} {
  const start = parseDate(startDate);
  const end = parseDate(endDate);

  const startDay = startsOnSunday ? 0 : 1;
  const startDow = start.getDay();
  const offset = (startDow - startDay + 7) % 7;
  const gridStart = addDays(start, -offset);

  const weeks: (string | null)[][] = [];
  const monthLabels: { label: string; weekIndex: number }[] = [];

  let current = new Date(gridStart);
  let weekIndex = 0;
  let lastMonth = -1;

  while (
    current <= end ||
    (weeks.length > 0 && (weeks[weeks.length - 1]?.length ?? 0) < 7)
  ) {
    const week: (string | null)[] = [];

    for (let d = 0; d < 7; d++) {
      const dateStr = formatDate(current);
      const isInRange = current >= start && current <= end;
      week.push(isInRange ? dateStr : null);

      if (isInRange && current.getMonth() !== lastMonth) {
        lastMonth = current.getMonth();
        monthLabels.push({
          label: MONTH_NAMES[current.getMonth()]!,
          weekIndex,
        });
      }

      current = addDays(current, 1);
    }

    weeks.push(week);
    weekIndex++;

    if (
      current > end &&
      weeks.length > 0 &&
      (weeks[weeks.length - 1]?.every(
        (d) => d === null || parseDate(d) > end,
      ) ??
        false)
    )
      break;
  }

  return { weeks, monthLabels, gridStart: formatDate(gridStart) };
}

// ─── Tooltip state type ───────────────────────────────────────────────────────

type TooltipState = {
  visible: boolean;
  date: string;
  count: number | undefined;
  label: string | undefined;
  x: number;
  y: number;
};

// ─── Loading Skeleton ─────────────────────────────────────────────────────────

function CalendarSkeleton({
  cellSize = 12,
  cellGap = 3,
  className,
}: {
  cellSize?: number;
  cellGap?: number;
  className?: string;
}) {
  const step = cellSize + cellGap;
  const weeks = 53;
  const days = 7;
  return (
    <div className={cn("w-fit mx-auto space-y-3 animate-pulse", className)}>
      <div className="flex gap-6">
        <div className="h-4 w-32 rounded bg-muted" />
        <div className="h-4 w-20 rounded bg-muted" />
        <div className="h-4 w-24 rounded bg-muted" />
      </div>
      <div className="overflow-x-auto">
        <svg
          width={weeks * step - cellGap}
          height={16 + days * step - cellGap}
          className="overflow-visible"
        >
          {Array.from({ length: weeks }).map((_, wi) =>
            Array.from({ length: days }).map((_, di) => (
              <rect
                key={`${wi}-${di}`}
                x={wi * step}
                y={16 + di * step}
                width={cellSize}
                height={cellSize}
                rx={cellSize * 0.2}
                className="fill-muted"
              />
            )),
          )}
        </svg>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export const GithubCalendar = memo(function GithubCalendar({
  username,
  data: dataProp,
  startDate,
  endDate,
  startsOnSunday = true,
  cellSize = 12,
  cellGap = 3,
  cellShape = "rounded",
  theme = "github",
  showMonthLabels = true,
  showStats = true,
  showLegend = true,
  className,
}: GithubCalendarProps) {
  const id = useId();
  // Scroll ref — used to auto-scroll to most recent months on compact viewports
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const checkDark = () => {
      setIsDark(
        document.documentElement.classList.contains("dark") ||
          document.body.classList.contains("dark"),
      );
    };

    checkDark();

    const observer = new MutationObserver(checkDark);
    const opts = { attributes: true, attributeFilter: ["class"] };
    observer.observe(document.documentElement, opts);
    observer.observe(document.body, opts);

    return () => observer.disconnect();
  }, []);

  // ── Fetch state ────────────────────────────────────────────────────────
  const [fetchedData, setFetchedData] = useState<ContributionData | null>(null);
  const [loading, setLoading] = useState(!!username);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) return;
    setFetchedData(null);
    setFetchError(null);
    setLoading(true);

    fetchContributions(username)
      .then((d) => setFetchedData(d))
      .catch((e) => setFetchError(e instanceof Error ? e.message : String(e)))
      .finally(() => setLoading(false));
  }, [username]);

  // ── Choose data source ─────────────────────────────────────────────────
  const data: ContributionData = dataProp ?? fetchedData ?? {};

  // ── Resolve dates ──────────────────────────────────────────────────────
  const resolvedEnd = endDate ?? formatDate(new Date());
  const resolvedStart = useMemo(() => {
    if (startDate) return startDate;
    const d = parseDate(resolvedEnd);
    d.setFullYear(d.getFullYear() - 1);
    d.setDate(d.getDate() + 1);
    return formatDate(d);
  }, [startDate, resolvedEnd]);

  const activeColors = useMemo(() => {
    if (typeof theme === "object") return theme;
    // Base colors based on system theme
    const base = isDark ? DARK_THEMES.github : THEMES.github;
    return base;
  }, [theme, isDark]);

  // ── Tooltip state ──────────────────────────────────────────────────────
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    date: "",
    count: undefined,
    label: undefined,
    x: 0,
    y: 0,
  });

  // ── Build grid ─────────────────────────────────────────────────────────
  const { weeks, monthLabels, gridStart } = useMemo(
    () => buildGrid(resolvedStart, resolvedEnd, startsOnSunday),
    [resolvedStart, resolvedEnd, startsOnSunday],
  );

  // ── Stats ──────────────────────────────────────────────────────────────
  const stats = useMemo(() => {
    const entries = Object.entries(data);
    const total = entries.reduce(
      (sum, [, v]) => sum + (v.count ?? (v.level > 0 ? 1 : 0)),
      0,
    );
    const activeDays = entries.filter(([, v]) => v.level > 0).length;
    const maxStreak = (() => {
      let max = 0;
      let cur = 0;
      const sorted = entries
        .filter(([, v]) => v.level > 0)
        .map(([d]) => d)
        .sort();
      for (let i = 0; i < sorted.length; i++) {
        if (i === 0) {
          cur = 1;
          max = 1;
          continue;
        }
        const prev = parseDate(sorted[i - 1]!);
        const curr = parseDate(sorted[i]!);
        const diff = (curr.getTime() - prev.getTime()) / 86400000;
        if (diff === 1) {
          cur++;
          max = Math.max(max, cur);
        } else cur = 1;
      }
      return max;
    })();
    return { total, activeDays, maxStreak };
  }, [data]);

  // ── Dimensions ────────────────────────────────────────────────────────
  const step = cellSize + cellGap;
  const monthLabelHeight = showMonthLabels && !gameActive ? 20 : 0;
  const svgWidth = weeks.length * step - cellGap;
  const svgHeight = monthLabelHeight + 7 * step - cellGap;
  // Auto-scroll to the right end (most recent months) — must be before early returns
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [fetchedData, dataProp]);

  // Game loop and autoplay logic
  useEffect(() => {
    if (!gameActive) {
      // Restore all cells opacity and colors when game is stopped
      weeks.forEach((week) => {
        week.forEach((date) => {
          if (!date) return;
          const rect = document.getElementById(`cell-${id}-${date}`);
          if (rect) {
            rect.style.opacity = "1";
            rect.style.pointerEvents = "auto";
            const originalLevel = data[date]?.level ?? 0;
            const originalColor =
              activeColors[`level${originalLevel}` as keyof ThemeColors] ||
              activeColors.level0;
            rect.setAttribute("fill", originalColor);
            rect.style.pointerEvents = "auto";
          }
        });
      });
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const width = svgWidth;
    const height = svgHeight + 80;
    canvas.width = width;
    canvas.height = height;

    // Local mutable map for dynamic cell levels
    const cellLevels = new Map<string, number>();
    weeks.forEach((week) => {
      week.forEach((date) => {
        if (!date) return;
        const entry = data[date];
        const initialLevel = entry?.level ?? 0;
        cellLevels.set(date, initialLevel);
        const rect = document.getElementById(`cell-${id}-${date}`);
        if (rect) {
          if (initialLevel === 0) {
            rect.style.pointerEvents = "none";
          } else {
            rect.style.pointerEvents = "auto";
          }
        }
      });
    });

    // Player (Spacecraft) with automatic direction sweep
    const player = {
      x: width / 2 - 15,
      y: height - 25,
      width: 30,
      height: 20,
      speed: 4,
      direction: 1, // 1 = right, -1 = left
      color: "#38bdf8",
    };

    // Bullets
    type GameBullet = {
      x: number;
      y: number;
      vy: number;
      width: number;
      height: number;
      color: string;
    };
    let bullets: GameBullet[] = [];
    let lastShot = 0;
    const cooldown = 140; // Autoplay shooting speed

    const shoot = () => {
      bullets.push({
        x: player.x + player.width / 2 - 1.5,
        y: player.y - 4,
        vy: -6,
        width: 3,
        height: 8,
        color: "#fbbf24", // Yellow laser
      });
      playSound("laser");
    };

    // Stars background (Space effect)
    const stars = Array.from({ length: 140 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: Math.random() * 0.4 + 0.1,
      size: Math.random() * 1.2 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    // Particles (for explosions)
    type GameParticle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      size: number;
      alpha: number;
      life: number;
      maxLife: number;
    };
    let particles: GameParticle[] = [];
    const explode = (x: number, y: number, color: string) => {
      playSound("explosion");
      for (let i = 0; i < 12; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2.5 + 1.2;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color,
          size: Math.random() * 2 + 1,
          alpha: 1,
          life: 0,
          maxLife: Math.random() * 15 + 15,
        });
      }
    };

    const update = () => {
      // Find the min and max column index (wi) that still has active cells (level > 0)
      let minWi = -1;
      let maxWi = -1;
      weeks.forEach((week, wi) => {
        week.forEach((date) => {
          if (!date) return;
          if ((cellLevels.get(date) ?? 0) > 0) {
            if (minWi === -1) minWi = wi;
            minWi = Math.min(minWi, wi);
            maxWi = Math.max(maxWi, wi);
          }
        });
      });

      // If there are active cells, restrict player boundary
      let minX = 0;
      let maxX = width - player.width;
      if (minWi !== -1 && maxWi !== -1) {
        minX = minWi * step;
        maxX = Math.max(
          minX,
          Math.min(width - player.width, (maxWi + 1) * step - player.width),
        );
      }

      // Clamp player position
      player.x = Math.max(minX, Math.min(maxX, player.x));

      // ── Side-to-Side Sweep Ship Movement ──────────────────────────────────
      player.x += player.speed * player.direction;
      if (player.x >= maxX) {
        player.x = maxX;
        player.direction = -1;
      } else if (player.x <= minX) {
        player.x = minX;
        player.direction = 1;
      }

      // ── Continuous Auto-Shooting ──────────────────────────────────────────
      const now = Date.now();
      if (now - lastShot >= cooldown) {
        shoot();
        lastShot = now;
      }

      // ── Reset Game if all contribution cells are cleared to level 0 ──────
      let anyActive = false;
      cellLevels.forEach((level) => {
        if (level > 0) anyActive = true;
      });

      if (!anyActive) {
        playSound("victory");
        // Reset all cell levels back to their original levels
        weeks.forEach((week) => {
          week.forEach((date) => {
            if (!date) return;
            const originalLevel = data[date]?.level ?? 0;
            cellLevels.set(date, originalLevel);
            const rect = document.getElementById(`cell-${id}-${date}`);
            if (rect) {
              const originalColor =
                activeColors[`level${originalLevel}` as keyof ThemeColors] ||
                activeColors.level0;
              rect.setAttribute("fill", originalColor);
              if (originalLevel === 0) {
                rect.style.pointerEvents = "none";
              } else {
                rect.style.pointerEvents = "auto";
              }
            }
          });
        });
      }

      // ── Update Environment ────────────────────────────────────────────────
      // Move Stars
      stars.forEach((s) => {
        s.y += s.speed;
        if (s.y > height) {
          s.y = 0;
          s.x = Math.random() * width;
        }
      });

      // Move Bullets
      bullets = bullets.filter((b) => {
        b.y += b.vy;
        return b.y > 0;
      });

      // Move Particles
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        p.alpha = 1 - p.life / p.maxLife;
      });
      particles = particles.filter((p) => p.life < p.maxLife);

      // Check laser collisions with cells
      bullets.forEach((bullet, bulletIdx) => {
        weeks.forEach((week, wi) => {
          week.forEach((date, di) => {
            if (!date) return;

            const currentLevel = cellLevels.get(date) ?? 0;
            if (currentLevel === 0) return; // Already finished / level 0

            const cellX = wi * step;
            const cellY = monthLabelHeight + di * step;

            // Simple box-overlap collision check
            if (
              bullet.x < cellX + cellSize &&
              bullet.x + bullet.width > cellX &&
              bullet.y < cellY + cellSize &&
              bullet.y + bullet.height > cellY
            ) {
              // Collision detected! Remove the bullet
              bullets.splice(bulletIdx, 1);

              // Decrement the level by 1
              const newLevel = currentLevel - 1;
              cellLevels.set(date, newLevel);

              // Instantly update the cell color in the SVG DOM
              const rect = document.getElementById(`cell-${id}-${date}`);
              if (rect) {
                const newColor =
                  activeColors[`level${newLevel}` as keyof ThemeColors] ||
                  activeColors.level0;
                rect.setAttribute("fill", newColor);
                if (newLevel === 0) {
                  rect.style.pointerEvents = "none";
                }
              }

              // Play hit explosion effect using the level color before hit
              const hitColor =
                activeColors[`level${currentLevel}` as keyof ThemeColors] ||
                activeColors.level0;
              explode(cellX + cellSize / 2, cellY + cellSize / 2, hitColor);
            }
          });
        });
      });
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw starry space background
      ctx.fillStyle = isDark ? "#ffffff" : "#94a3b8"; // Darker stars for light mode
      stars.forEach((s) => {
        ctx.globalAlpha = s.alpha;
        ctx.fillRect(s.x, s.y, s.size, s.size);
      });
      ctx.globalAlpha = 1.0;

      // Draw bullets
      bullets.forEach((b) => {
        ctx.fillStyle = b.color;
        ctx.fillRect(b.x, b.y, b.width, b.height);
      });

      // Draw particles
      particles.forEach((p) => {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      });
      ctx.globalAlpha = 1.0;

      // Draw Player Ship (Cyan space fighter style)
      ctx.fillStyle = player.color;
      ctx.shadowColor = player.color;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.moveTo(player.x + player.width / 2, player.y);
      ctx.lineTo(player.x + player.width, player.y + player.height);
      ctx.lineTo(
        player.x + player.width * 0.7,
        player.y + player.height * 0.75,
      );
      ctx.lineTo(
        player.x + player.width * 0.3,
        player.y + player.height * 0.75,
      );
      ctx.lineTo(player.x, player.y + player.height);
      ctx.closePath();
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    const loop = () => {
      update();
      render();
      if (gameActive) {
        animationFrameId = requestAnimationFrame(loop);
      }
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [
    gameActive,
    data,
    weeks,
    step,
    cellSize,
    cellGap,
    monthLabelHeight,
    activeColors,
    id,
  ]);

  // ── Loading / error states ───────────────────────────
  if (loading) {
    return (
      <CalendarSkeleton
        cellSize={cellSize}
        cellGap={cellGap}
        className={className}
      />
    );
  }

  if (fetchError) {
    return (
      <div
        className={cn(
          "w-fit mx-auto flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive",
          className,
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        {fetchError}
      </div>
    );
  }

  const cellRx = cellShape === "circle" ? cellSize / 2 : cellSize * 0.2;

  return (
    <div
      className={cn(
        "w-fit mx-auto overflow-x-hidden border border-transparent rounded-sm transition-all duration-500",
        className,
      )}
    >
      <div className="w-fit mx-auto max-w-full flex flex-col gap-3 p-3">
        <div
          ref={scrollRef}
          className={cn(
            "relative overflow-x-auto transition-all duration-500",
            gameActive ? "pb-[80px]" : "",
          )}
          style={
            {
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            } as React.CSSProperties
          }
        >
          <svg
            width={svgWidth}
            height={svgHeight}
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="overflow-visible"
          >
            {/* month labels */}
            {showMonthLabels &&
              !gameActive &&
              (() => {
                const byWeek = new Map<number, string>();
                monthLabels.forEach(({ label, weekIndex }) =>
                  byWeek.set(weekIndex, label),
                );
                const entries = Array.from(byWeek.entries());
                const validEntries: [number, string][] = [];
                for (let i = 0; i < entries.length; i++) {
                  const current = entries[i]!;
                  const next = entries[i + 1];
                  // If the first month is too close to the second, skip the first one
                  if (i === 0 && next && next[0] - current[0] < 3) {
                    continue;
                  }
                  // If this month is too close to the last added one, skip it
                  const lastValid = validEntries[validEntries.length - 1];
                  if (lastValid && current[0] - lastValid[0] < 3) {
                    continue;
                  }
                  validEntries.push(current);
                }
                return validEntries.map(([weekIndex, label]) => (
                  <text
                    key={`${label}-${weekIndex}`}
                    x={weekIndex * step}
                    y={10}
                    fontSize={14}
                    fill={isDark ? "#fafafa" : "#0a0a0a"}
                    fontFamily="inherit"
                  >
                    {label}
                  </text>
                ));
              })()}

            {/* cells */}
            {weeks.map((week, wi) =>
              week.map((date, di) => {
                const entry = date ? data[date] : undefined;
                const level: ContributionLevel = entry?.level ?? 0;
                const cellCenterX = wi * step + cellSize / 2;
                const cellTopY = monthLabelHeight + di * step;

                if (!date) {
                  const cellDate = formatDate(
                    addDays(parseDate(gridStart), wi * 7 + di),
                  );
                  if (cellDate > resolvedEnd) return null;
                }

                return (
                  <rect
                    key={`${wi}-${di}`}
                    id={date ? `cell-${id}-${date}` : undefined}
                    x={wi * step}
                    y={cellTopY}
                    width={cellSize}
                    height={cellSize}
                    rx={cellRx}
                    fill={activeColors[`level${level}` as keyof ThemeColors]}
                    style={{
                      transition: "opacity 0.1s",
                      pointerEvents: gameActive
                        ? level === 0 || !date
                          ? "none"
                          : "auto"
                        : "auto",
                    }}
                    onMouseEnter={() => {
                      if (!date || gameActive) return;
                      setTooltip({
                        visible: true,
                        date,
                        count: entry?.count,
                        label: entry?.label,
                        x: cellCenterX,
                        y: cellTopY,
                      });
                    }}
                    onMouseLeave={() =>
                      setTooltip((t) => ({ ...t, visible: false }))
                    }
                  />
                );
              }),
            )}
          </svg>

          {/* Game canvas overlay */}
          {gameActive && (
            <canvas
              ref={canvasRef}
              className="absolute inset-0 pointer-events-auto z-10 cursor-crosshair"
              style={{ width: svgWidth, height: svgHeight + 80 }}
            />
          )}

          {/* custom tooltip */}
          {tooltip.visible &&
            (() => {
              const count = tooltip.count ?? 0;
              const formattedDate = formatTooltipDate(tooltip.date);
              const tooltipText = tooltip.label
                ? `${tooltip.label} on ${formattedDate}.`
                : count === 0
                  ? `No contributions on ${formattedDate}.`
                  : `${count} contribution${count !== 1 ? "s" : ""} on ${formattedDate}.`;

              return (
                <div
                  className="pointer-events-none absolute z-50 rounded bg-[#24292e] dark:bg-[#161b22] px-2.5 py-1 text-[11px] font-medium text-white shadow-md border border-neutral-700/30 whitespace-nowrap"
                  style={{
                    left: tooltip.x,
                    top: tooltip.y,
                    transform: "translate(-50%, calc(-100% - 6px))",
                  }}
                >
                  {tooltipText}
                  {/* Small arrow pointing down */}
                  <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rotate-45 bg-[#24292e] dark:bg-[#161b22] border-r border-b border-neutral-700/30" />
                </div>
              );
            })()}
        </div>

        <div className="flex items-center justify-between gap-x-4">
          {/* legend (left) */}
          {showLegend && (
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground shrink-0 mt-0.5">
              <div className="flex items-center gap-1.5">
                <span>Less</span>
                {([0, 1, 2, 3, 4] as ContributionLevel[]).map((level) => (
                  <svg key={level} width={cellSize} height={cellSize}>
                    <rect
                      width={cellSize}
                      height={cellSize}
                      rx={cellRx}
                      fill={activeColors[`level${level}`]}
                    />
                  </svg>
                ))}
                <span>More</span>
              </div>

              {/* Game Mode Switch */}
              <div className="flex items-center gap-2 border-l border-neutral-200 dark:border-neutral-800 pl-4">
                <span className="text-[11px] text-muted-foreground select-none">Game Mode</span>
                <button
                  onClick={() => setGameActive(!gameActive)}
                  className={cn(
                    "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                    gameActive ? "bg-emerald-500" : "bg-neutral-800"
                  )}
                >
                  <span
                    className={cn(
                      "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                      gameActive ? "translate-x-4" : "translate-x-0"
                    )}
                  />
                </button>
              </div>
            </div>
          )}

          {/* stats line (right) */}
          {showStats && (
            <div className="flex flex-1 flex-wrap justify-end ml-auto text-sm font-sans tracking-wide">
              <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-x-1 text-muted-foreground select-none"
              >
                <span className="font-semibold text-foreground">
                  {username}
                </span>
                <span>contributed</span>
                <span className="font-bold text-[#39d353]">
                  {stats.total.toLocaleString()}
                </span>
                <span>this year on</span>
                <span className="font-semibold text-foreground underline decoration-muted-foreground underline-offset-4">
                  GitHub
                </span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

GithubCalendar.displayName = "GithubCalendar";

export default GithubCalendar;
