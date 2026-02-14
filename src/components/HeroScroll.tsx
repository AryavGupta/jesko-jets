"use client";

import { useRef, useEffect, useCallback } from "react";
import { useScroll, useTransform, motion, useMotionValueEvent } from "framer-motion";

interface HeroScrollProps {
  images: HTMLImageElement[];
}

export default function HeroScroll({ images }: HeroScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, 119]);

  // Phase 1: Opening headline (early frames, ground/static shots)
  const phase1Opacity = useTransform(scrollYProgress, [0.0, 0.06, 0.18, 0.25], [0, 1, 1, 0]);
  const phase1Y = useTransform(scrollYProgress, [0.0, 0.06, 0.18, 0.25], [40, 0, 0, -40]);

  // Phase 2: Transition text (mid frames, takeoff / sky appearing)
  const phase2Opacity = useTransform(scrollYProgress, [0.28, 0.35, 0.48, 0.56], [0, 1, 1, 0]);
  const phase2Y = useTransform(scrollYProgress, [0.28, 0.35, 0.48, 0.56], [40, 0, 0, -40]);

  // Phase 3: Sky/cloud text (blue sky frames)
  const phase3Opacity = useTransform(scrollYProgress, [0.58, 0.65, 0.78, 0.86], [0, 1, 1, 0]);
  const phase3Y = useTransform(scrollYProgress, [0.58, 0.65, 0.78, 0.86], [40, 0, 0, -40]);

  // Scroll indicator
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.04], [1, 0]);

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
    <div ref={containerRef} className="h-[500vh] relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ willChange: "transform" }}>
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />

        {/* Vignette overlay */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, transparent 50%, rgba(5,5,5,0.5) 100%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-jet-black/20 via-transparent to-jet-black/50 pointer-events-none" />

        {/* Phase 1: Opening */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6">
          <motion.p
            className="text-[11px] tracking-[0.4em] uppercase text-white/50 mb-5"
            style={{ opacity: phase1Opacity, y: phase1Y }}
          >
            Private Aviation
          </motion.p>
          <motion.h1
            className="text-4xl md:text-6xl lg:text-[5.5rem] font-extralight tracking-tight text-center leading-[1.1]"
            style={{ opacity: phase1Opacity, y: phase1Y }}
          >
            Your freedom
            <br />
            to enjoy life.
          </motion.h1>
          <motion.div
            className="w-12 h-[1px] bg-white/30 mt-8"
            style={{ opacity: phase1Opacity }}
          />
        </div>

        {/* Phase 2: Ascent / Takeoff */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6">
          <motion.p
            className="text-[11px] tracking-[0.4em] uppercase text-white/50 mb-5"
            style={{ opacity: phase2Opacity, y: phase2Y }}
          >
            Elevation
          </motion.p>
          <motion.h2
            className="text-3xl md:text-5xl lg:text-[4.5rem] font-extralight tracking-tight text-center leading-[1.1]"
            style={{ opacity: phase2Opacity, y: phase2Y }}
          >
            Leave the world
            <br />
            beneath you.
          </motion.h2>
          <motion.p
            className="text-sm md:text-base text-white/40 mt-6 tracking-wide text-center max-w-sm"
            style={{ opacity: phase2Opacity, y: phase2Y }}
          >
            Climb to 51,000 ft in whisper-quiet comfort
          </motion.p>
        </div>

        {/* Phase 3: Blue sky / Clouds */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6">
          <motion.p
            className="text-[11px] tracking-[0.4em] uppercase text-white/50 mb-5"
            style={{ opacity: phase3Opacity, y: phase3Y }}
          >
            Above It All
          </motion.p>
          <motion.h2
            className="text-3xl md:text-5xl lg:text-[4.5rem] font-extralight tracking-tight text-center leading-[1.1]"
            style={{ opacity: phase3Opacity, y: phase3Y }}
          >
            Where the sky
            <br />
            has no limits.
          </motion.h2>
          <motion.p
            className="text-sm md:text-base text-white/40 mt-6 tracking-wide text-center max-w-sm"
            style={{ opacity: phase3Opacity, y: phase3Y }}
          >
            Mach 0.925 &mdash; faster than time itself
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: scrollIndicatorOpacity }}
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-500">
            Scroll
          </span>
          <div className="w-[1px] h-8 bg-zinc-700 relative overflow-hidden">
            <motion.div
              className="absolute inset-x-0 top-0 h-full bg-white"
              animate={{ y: ["0%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
