"use client";

import { motion } from "framer-motion";

const features = [
  {
    label: "Range",
    value: "13,890",
    unit: "km",
    description: "Non-stop transcontinental capability",
  },
  {
    label: "Speed",
    value: "Mach 0.925",
    unit: "",
    description: "Among the fastest in civil aviation",
  },
  {
    label: "Cabin",
    value: "Ultra-Wide",
    unit: "body",
    description: "Spacious interior with standing headroom",
  },
  {
    label: "Service",
    value: "24/7",
    unit: "concierge",
    description: "Dedicated team at your disposal",
  },
];

export default function Features() {
  return (
    <section id="fleet" className="relative py-32 px-6 md:px-12 bg-jet-black">
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="text-xs tracking-[0.3em] uppercase text-zinc-500 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          Performance
        </motion.p>
        <motion.h2
          className="text-3xl md:text-5xl font-light tracking-tight mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Direct Access to
          <br />
          Private Travel
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.label}
              className="border border-zinc-800 p-8 md:p-10 bg-jet-dark/50 hover:border-zinc-700 transition-colors duration-500"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <p className="text-xs tracking-[0.2em] uppercase text-zinc-500 mb-3">
                {feature.label}
              </p>
              <p className="text-3xl md:text-4xl font-light tracking-tight">
                {feature.value}
                {feature.unit && (
                  <span className="text-lg text-zinc-500 ml-2">
                    {feature.unit}
                  </span>
                )}
              </p>
              <p className="text-sm text-zinc-500 mt-3">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
