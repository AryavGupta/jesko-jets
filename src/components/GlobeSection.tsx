"use client";

import { motion } from "framer-motion";

const destinations = [
  "New York",
  "London",
  "Dubai",
  "Tokyo",
  "Singapore",
  "Paris",
  "Sydney",
  "Los Angeles",
  "Hong Kong",
  "Zurich",
];

export default function GlobeSection() {
  return (
    <section
      id="destinations"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-32"
    >
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        style={{ mixBlendMode: "screen" }}
      >
        <source src="/globe-loop.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-jet-black/50 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <motion.p
          className="text-xs tracking-[0.3em] uppercase text-zinc-500 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Global Network
        </motion.p>
        <motion.h2
          className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Fly Anywhere
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 max-w-2xl mx-auto">
          {destinations.map((city, i) => (
            <motion.span
              key={city}
              className="text-sm md:text-base text-zinc-500 hover:text-white transition-colors duration-500 cursor-default"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
            >
              {city}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
