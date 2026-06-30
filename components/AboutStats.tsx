"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  {
    value: "03+",
    label: "PROJECTS",
    caption: "Built",
  },
  {
    value: "160+",
    label: "GIT COMMITS",
    caption: null,
  },
  {
    value: "10+",
    label: "TECH STACK",
    caption: null,
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
      className="w-full border-y border-[#cfd4d7] py-12 sm:py-14 lg:py-16"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            whileHover={{ y: -4, transition: { duration: 0.3, ease: "easeOut" } }}
            className={`group flex flex-col items-center justify-center py-8 text-center transition-all duration-300 sm:py-10 ${
              index !== stats.length - 1
                ? "border-b border-[#cfd4d7] sm:border-b-0 sm:border-r"
                : ""
            }`}
          >
            {/* Number */}
            <span className="text-2xl font-black leading-none tracking-tight text-[#344754] transition-colors duration-300 group-hover:text-[#263941] sm:text-3xl lg:text-4xl">
              {stat.value}
            </span>

            {/* Label */}
            <span className="mt-2 text-xs font-extrabold uppercase tracking-[0.14em] text-[#8a9398] sm:text-sm">
              {stat.label}
            </span>

            {/* Optional caption */}
            {stat.caption && (
              <span className="mt-1 text-xs font-medium lowercase tracking-[0.06em] text-[#aab3b8]">
                {stat.caption}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
