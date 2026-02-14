"use client";

import { useRef, useEffect, useCallback } from "react";
import { useScroll, useTransform, motion, useMotionValueEvent } from "framer-motion";

interface PlaneMorphProps {
  images: HTMLImageElement[];
}

export default function PlaneMorph({ images }: PlaneMorphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, 119]);

  const title1Opacity = useTransform(scrollYProgress, [0.05, 0.15, 0.3, 0.4], [0, 1, 1, 0]);
  const title1Y = useTransform(scrollYProgress, [0.05, 0.15, 0.3, 0.4], [30, 0, 0, -30]);
  const title2Opacity = useTransform(scrollYProgress, [0.45, 0.55, 0.7, 0.8], [0, 1, 1, 0]);
  const title2Y = useTransform(scrollYProgress, [0.45, 0.55, 0.7, 0.8], [30, 0, 0, -30]);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !images.length) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[index];
    if (!img || !img.complete) return;

    const dpr = window.devicePixelRatio || 1;
    const displayW = canvas.clientWidth;
    const displayH = canvas.clientHeight;

    if (canvas.width !== displayW * dpr || canvas.height !== displayH * dpr) {
      canvas.width = displayW * dpr;
      canvas.height = displayH * dpr;
      ctx.scale(dpr, dpr);
    }

    ctx.clearRect(0, 0, displayW, displayH);

    const scale = Math.max(displayW / img.width, displayH / img.height);
    const w = img.width * scale;
    const h = img.height * scale;
    const x = (displayW - w) / 2;
    const y = (displayH - h) / 2;

    ctx.drawImage(img, x, y, w, h);
  }, [images]);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    const index = Math.min(119, Math.max(0, Math.round(latest)));
    if (index !== currentFrameRef.current) {
      currentFrameRef.current = index;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => drawFrame(index));
    }
  });

  useEffect(() => {
    if (images.length > 0 && images[0]?.complete) {
      drawFrame(0);
    }

    const handleResize = () => drawFrame(currentFrameRef.current);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [images, drawFrame]);

  return (
    <div ref={containerRef} className="h-[400vh] relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ willChange: "transform" }}>
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-jet-black/40 via-transparent to-jet-black/60 pointer-events-none" />

        {/* First text overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <motion.h2
            className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-center"
            style={{ opacity: title1Opacity, y: title1Y }}
          >
            Engineered for Excellence
          </motion.h2>
          <motion.p
            className="text-sm md:text-base text-zinc-400 mt-3 tracking-wide text-center max-w-md"
            style={{ opacity: title1Opacity, y: title1Y }}
          >
            Every detail crafted to perfection
          </motion.p>
        </div>

        {/* Second text overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <motion.h2
            className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-center"
            style={{ opacity: title2Opacity, y: title2Y }}
          >
            Unmatched Interior
          </motion.h2>
          <motion.p
            className="text-sm md:text-base text-zinc-400 mt-3 tracking-wide text-center max-w-md"
            style={{ opacity: title2Opacity, y: title2Y }}
          >
            Hand-stitched leather, ambient lighting, whisper-quiet cabin
          </motion.p>
        </div>
      </div>
    </div>
  );
}
