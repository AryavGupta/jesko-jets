"use client";

import { motion, useScroll, useTransform } from "framer-motion";

const navLinks = ["Fleet", "Experience", "Destinations", "Contact"];

export default function Navbar() {
  const { scrollY } = useScroll();

  // Visible at start, fades out after ~20 frames of hero scroll
  // Hero is 500vh with 120 frames → frame 20 ≈ 83vh ≈ ~750px
  const opacity = useTransform(scrollY, [0, 600, 800], [1, 1, 0]);
  const y = useTransform(scrollY, [600, 800], [0, -20]);
  const bgOpacity = useTransform(scrollY, [0, 300], [0, 0.85]);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex items-center justify-between backdrop-blur-md border-b border-white/[0.06]"
      style={{
        opacity,
        y,
        backgroundColor: useTransform(bgOpacity, (v) => `rgba(5, 5, 5, ${v})`),
        pointerEvents: useTransform(opacity, (v) => (v < 0.1 ? "none" : "auto")) as unknown as string,
      }}
    >
      <div className="text-sm tracking-[0.3em] uppercase font-light">
        JESKO JETS
      </div>

      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="text-[11px] tracking-[0.15em] uppercase text-zinc-400 hover:text-white transition-colors duration-300"
          >
            {link}
          </a>
        ))}
        <a
          href="#contact"
          className="text-[11px] tracking-[0.15em] uppercase px-5 py-2 border border-zinc-700 hover:border-white hover:bg-white hover:text-black transition-all duration-300"
        >
          Book Now
        </a>
      </div>
    </motion.nav>
  );
}
