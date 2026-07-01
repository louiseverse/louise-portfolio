"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  {
    value: "03",
    label: "Projects Built",
  },
  {
    value: "169",
    label: "Git Commits",
  },
  {
    value: "29",
    label: "Tech Stack",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.52,
      ease: "easeOut" as const,
    },
  },
};

export default function AboutStats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="w-full border-y border-[#4C5C68]/60 py-6 sm:py-8 lg:py-10"
    >
      <div className="flex flex-col sm:flex-row items-stretch justify-between w-full">
        {stats.map((stat, index) => (
          <div key={stat.label} className="flex-1 flex items-center justify-center">
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.3, ease: "easeOut" } }}
              className="relative flex items-center justify-center w-full py-4 text-center group cursor-default"
            >
              {/* Huge Background Number */}
              <span className="select-none text-[6.5rem] sm:text-[8rem] lg:text-[10rem] font-black leading-none text-[#C5C3C6]/60 tracking-tighter transition-all duration-300 group-hover:scale-105">
                {stat.value}
              </span>

              {/* Foreground Label (Centered overlay) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-base sm:text-lg lg:text-xl font-extrabold tracking-wide text-[#36454F] whitespace-nowrap">
                  {stat.label}
                </span>
              </div>
            </motion.div>

            {index < stats.length - 1 && (
              <div className="hidden sm:block w-[1px] h-20 bg-[#4C5C68]/40 self-center" />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
