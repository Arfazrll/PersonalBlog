"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    offset: ["start end", "end start"],
    target: container,
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <div className="mx-2 mt-10 mb-160 overflow-hidden rounded-4xl bg-white">
      <div
        className="relative flex h-[80vh] items-center justify-center overflow-hidden bg-white"
        ref={container}
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <div className="relative z-10 flex h-full w-full flex-col justify-between p-20 text-white mix-blend-difference">
          <p className="w-[50vw] self-end text-[2vw] uppercase mix-blend-difference">
            Beauty and quality need the right time to be conceived and realised
            even in a world that is in too much of a hurry.
          </p>
          <p className="text-[5vw] uppercase mix-blend-difference">
            Background Parallax
          </p>
        </div>
        <div className="fixed top-[-10vh] left-0 h-[120vh] w-full">
          <motion.div className="relative h-full w-full" style={{ y }}>
            <Image
              alt="image"
              className="grayscale-0"
              fill
              src={"https://images.cnippet.dev/image/upload/v1770400411/img_23001.png"}
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 100vw"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
