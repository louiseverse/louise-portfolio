"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { projects, type Project } from "@/lib/projects";

interface CarouselItem extends Project {
  instanceId: string;
}

const initialSlides: CarouselItem[] = [
  { ...projects[0], instanceId: "slide-1" },
  { ...projects[1], instanceId: "slide-2" },
  { ...projects[2], instanceId: "slide-3" },
  { ...projects[0], instanceId: "slide-4" },
  { ...projects[1], instanceId: "slide-5" },
  { ...projects[2], instanceId: "slide-6" },
];

const getCaption = (id: string) => {
  switch (id) {
    case "bridgetalk":
      return "BridgeTalk v1.0 - Real-time ASL ↔ English Translation";
    case "decktago":
      return "DeckTago v1.0 - Premium E-commerce Store";
    case "inventory":
      return "DeckTaGo Inventory v1.0 - Smart Sales & Stock Management";
    default:
      return "";
  }
};

export default function Project() {
  const [items, setItems] = useState<CarouselItem[]>(initialSlides);

  const nextSlide = () => {
    setItems((prev) => [...prev.slice(1), prev[0]]);
  };

  const handleCardClick = (idx: number) => {
    if (idx === 2) {
      nextSlide();
    } else if (idx === 3) {
      setItems((prev) => [...prev.slice(2), ...prev.slice(0, 2)]);
    }
  };

  const activeProject = items[1];
  if (!activeProject) return null;

  return (
    <section
      id="projects"
      className="relative flex min-h-screen items-center justify-center bg-[#DCDCDD] px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="relative z-10 w-full max-w-[1600px]">
        {/* Outer wrapper — no overflow clip so the last card can stick outside */}
        <div className="relative mx-auto w-full max-w-[1400px]">
          {/* Main container with clipped corners for background */}
          <div
            className="relative overflow-hidden rounded-[32px] shadow-[0_32px_64px_rgba(0,0,0,0.25)] sm:rounded-[40px] lg:rounded-[48px]"
            style={{ height: "clamp(480px, 50vw, 750px)" }}
          >
            {/* ── Full-bleed background image (active project) ── */}
            <AnimatePresence initial={false} mode="sync">
              <motion.div
                key={activeProject.instanceId + "-bg"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 z-0"
              >
                <Image
                  src={activeProject.screenshots[0] || activeProject.heroImage}
                  alt={activeProject.title}
                  fill
                  sizes="1400px"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/20" />
              </motion.div>
            </AnimatePresence>

            {/* ── Text content + navigation ── */}
            <div className="relative z-10 flex h-full flex-col justify-between p-8 sm:p-12 lg:p-16">
              <div className="my-auto lg:max-w-[40%]">
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key={activeProject.id + "-text"}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col text-white"
                  >
                    <h2 className="font-sans text-3xl font-extrabold uppercase leading-none tracking-tight sm:text-5xl lg:text-6xl">
                      {activeProject.title}
                    </h2>

                    <p className="mt-5 max-w-[440px] text-sm leading-relaxed text-white/75 sm:text-base">
                      {activeProject.shortDescription}
                    </p>

                    <div className="mt-8">
                      <Link
                        href={`/projects#${activeProject.id}`}
                        className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-2.5 text-xs font-bold text-black shadow-md transition-all duration-300 hover:bg-[#DCDCDD] active:scale-95 sm:px-8 sm:py-3.5 sm:text-sm lg:text-base lg:rounded-2xl"
                      >
                        View Project
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>


            </div>
          </div>

          {/* ── Preview cards – same vertical center, last card overflows outside ── */}
          <PreviewCards items={items} onCardClick={handleCardClick} />
        </div>
      </div>
    </section>
  );
}

/* ─── Preview Cards Sub-component ─── */

function PreviewCards({
  items,
  onCardClick,
}: {
  items: CarouselItem[];
  onCardClick: (idx: number) => void;
}) {
  const [screen, setScreen] = useState<"mobile" | "tablet" | "desktop">("desktop");

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setScreen("mobile");
      else if (window.innerWidth < 1024) setScreen("tablet");
      else setScreen("desktop");
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Card positions per breakpoint — both cards share the same top (50%) for perfect alignment
  const positions = {
    desktop: {
      card2: { right: "16%", width: 340, height: 460, borderRadius: 32 },
      card3: { right: "-6%", width: 340, height: 460, borderRadius: 28 },
    },
    tablet: {
      card2: { right: "10%", width: 260, height: 350, borderRadius: 24 },
      card3: { right: "-7%", width: 240, height: 320, borderRadius: 22 },
    },
    mobile: {
      card2: { right: "3%", width: 165, height: 220, borderRadius: 20 },
      card3: { right: "-9%", width: 150, height: 200, borderRadius: 18 },
    },
  };

  const pos = positions[screen];

  return (
    <>
      {items.map((item, index) => {
        if (index < 2 || index > 3) return null;

        const isFirst = index === 2;
        const cfg = isFirst ? pos.card2 : pos.card3;

        return (
          <motion.div
            key={item.instanceId}
            layout
            transition={{ layout: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } }}
            onClick={() => onCardClick(index)}
            className="absolute cursor-pointer"
            style={{
              top: "50%",
              right: cfg.right,
              width: cfg.width,
              height: cfg.height,
              y: "-50%",
              zIndex: isFirst ? 20 : 30,
            }}
          >
            <div
              className="relative h-full w-full overflow-hidden border border-white/15 shadow-[0_24px_50px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-[1.03]"
              style={{ borderRadius: cfg.borderRadius }}
            >
              <Image
                src={item.screenshots[0] || item.heroImage}
                alt={item.title}
                fill
                sizes={`${cfg.width}px`}
                className="object-cover"
              />
            </div>
          </motion.div>
        );
      })}
    </>
  );
}
