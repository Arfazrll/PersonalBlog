import { Zap, Clock, TrendingUp, Trophy, History } from 'lucide-react';
import { motion, useInView, animate } from 'framer-motion';
import { cn } from "@/lib/utils";
import React, { useState, useEffect, useRef } from "react";

const Counter = ({ value, duration = 1.5, trigger = true }: { value: string | number, duration?: number, trigger?: boolean }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const targetValue = typeof value === 'string' ? parseInt(value.replace(/[^0-9]/g, '')) || 0 : value;

  useEffect(() => {
    if (isInView && trigger && targetValue > 0) {
      const controls = animate(0, targetValue, {
        duration,
        onUpdate: (latest) => setCount(Math.floor(latest)),
        ease: "easeOut"
      });
      return () => controls.stop();
    }
  }, [isInView, trigger, targetValue, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
    </span>
  );
};

export const WakaTimeShowcase = () => {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    fetch('/api/wakatime-stats')
      .then(r => r.ok ? r.json() : null)
      .then(result => { if (result) setData(result); })
      .catch(e => console.error("WakaTime fetch failed:", e))
      .finally(() => setLoading(false));
  }, []);

  if (!mounted) return null;

  const stats = [
    { label: "Total This Week", value: loading ? "..." : (data?.totalThisWeek || "—") },
    { label: "Daily Average", value: loading ? "..." : (data?.dailyAverage || "—") },
    { label: "Best Day", value: loading ? "..." : (data?.bestDay?.text || "—") },
    { label: "All-Time", value: loading ? "..." : (data?.allTimeCoding || "—") },
  ];

  return (
    <section id='wakatime-stats' className='w-full max-w-[1700px] mx-auto px-6 py-6'>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className={cn(
          "relative bg-white dark:bg-[#0A0A0A] border border-black/5 dark:border-white/10",
          "rounded-[3rem] shadow-2xl overflow-hidden p-8 md:p-10 transition-all duration-700",
          loading && "opacity-50"
        )}
      >
        <div className="flex flex-col md:flex-row items-start justify-between w-full gap-8 relative z-10">
          <div className="space-y-6 max-w-2xl">
            <div className="flex items-center gap-3 text-[#f97316]">
              <Zap className="w-8 h-8" />
              <span className="text-sm font-bold tracking-[0.3em] uppercase opacity-70">WakaTime Metrics</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[0.9em] text-black dark:text-white">
              Coding{" "}
              <span className="flex items-center gap-2">
                Velocity <span className="text-[#f97316]">Analyzed.</span>
              </span>
            </h2>

            <div className="flex flex-wrap gap-8 items-center">
              {stats.map((s, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-2xl md:text-3xl font-black text-[#f97316] tabular-nums tracking-tighter flex items-baseline gap-1">
                    <Counter value={s.value} trigger={!loading} />
                    <span className="text-sm font-bold opacity-60">
                      {typeof s.value === 'string' ? s.value.split(" ")[1] : ''}
                    </span>
                  </span>
                  <span className="text-[10px] font-black uppercase opacity-40 tracking-widest">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="max-w-sm font-semibold text-lg text-black/50 dark:text-white/40 leading-relaxed pt-12 md:pt-20">
            Coding activity over the past 7&nbsp;days, streamed directly from the WakaTime authenticated API.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
          <p className="text-[10px] font-black uppercase opacity-20 tracking-widest">
            Verified WakaTime Pulse Integration
          </p>
          <div className="flex items-center gap-2 opacity-30">
            <div className="w-1.5 h-1.5 rounded-full bg-[#f97316] animate-pulse" />
            <span className="text-[9px] font-bold">Live Authenticated Stream</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default WakaTimeShowcase;
