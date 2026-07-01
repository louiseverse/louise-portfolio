"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { projects, type Project } from "@/lib/projects";

/* ─── Types ─── */
interface GalleryState {
  index: number;
  dir: number;
}

/* ─── Constants ─── */
const EASE: [number, number, number, number] = [0.32, 0.72, 0, 1];

/* ─── Variants ─── */
const galleryVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({
    x: dir > 0 ? -60 : 60,
    opacity: 0,
  }),
};

const galleryTransition = { duration: 0.42, ease: EASE };

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.07, ease: EASE },
  }),
};

/* ─── Per-Project Gallery Component ─── */
function ProjectGallery({
  project,
  gallery,
  onNavigate,
}: {
  project: Project;
  gallery: GalleryState;
  onNavigate: (dir: number) => void;
}) {
  const total = project.screenshots.length;
  const current = gallery.index;

  return (
    <div className="w-full">
      {/* Image container */}
      <div className="relative overflow-hidden rounded-2xl xl:rounded-3xl">
        <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[16/9] lg:aspect-[16/9]">
          <AnimatePresence initial={false} custom={gallery.dir} mode="popLayout">
            <motion.div
              key={project.id + "-" + current}
              custom={gallery.dir}
              variants={galleryVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={galleryTransition}
              className="absolute inset-0"
            >
              <Image
                src={project.screenshots[current]}
                alt={`${project.title} screenshot ${current + 1}`}
                fill
                sizes="(max-width: 1023px) 100vw, 60vw"
                className="object-cover"
                priority={current === 0}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Gallery controls */}
      <div className="mt-5 flex items-center justify-between gap-4 sm:mt-6">
        <button
          onClick={() => onNavigate(-1)}
          aria-label="Previous image"
          disabled={total <= 1}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C5C3C6] text-[#4C5C68] transition-all duration-200 hover:border-[#36454F] hover:bg-[#36454F] hover:text-white cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed sm:h-11 sm:w-11"
        >
          ←
        </button>

        {/* Dots + counter */}
        <div className="flex flex-col items-center gap-2.5">
          <div className="flex items-center gap-2">
            {project.screenshots.map((_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? "h-2 w-5 bg-[#36454F]"
                    : "h-2 w-2 bg-[#C5C3C6]"
                }`}
              />
            ))}
          </div>
          <span className="text-[11px] font-semibold tabular-nums text-[#899097]">
            {current + 1} / {total}
          </span>
        </div>

        <button
          onClick={() => onNavigate(1)}
          aria-label="Next image"
          disabled={total <= 1}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C5C3C6] text-[#4C5C68] transition-all duration-200 hover:border-[#36454F] hover:bg-[#36454F] hover:text-white cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed sm:h-11 sm:w-11"
        >
          →
        </button>
      </div>
    </div>
  );
}

/* ─── Project Section ─── */
function ProjectSection({
  project,
  isEven,
  gallery,
  onNavigate,
}: {
  project: Project;
  isEven: boolean;
  gallery: GalleryState;
  onNavigate: (dir: number) => void;
}) {
  return (
    <section
      id={project.id}
      className="scroll-mt-24 py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1200px]">
        {/* Project header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="mb-10 sm:mb-12 lg:mb-14"
        >
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.24em] text-[#899097]">
            Project
          </p>
          <h2 className="text-3xl font-extrabold leading-tight text-[#36454F] sm:text-4xl lg:text-5xl">
            {project.title}
          </h2>
          <p className="mt-4 max-w-[640px] text-base leading-[1.85] text-[#4C5C68] sm:text-lg sm:mt-5">
            {project.shortDescription}
          </p>
        </motion.div>

        {/* Main layout: image left/right + features */}
        <div
          className={`flex flex-col gap-10 lg:gap-12 lg:flex-row ${
            isEven ? "lg:flex-row-reverse" : ""
          } lg:items-start`}
        >
          {/* Gallery */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={fadeUp}
            className="w-full lg:w-[58%] lg:flex-shrink-0"
          >
            <ProjectGallery
              project={project}
              gallery={gallery}
              onNavigate={onNavigate}
            />
          </motion.div>

          {/* Features + Tech Stack */}
          <div className="flex flex-col gap-8 lg:flex-1 lg:pt-2">
            {/* Features */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
            >
              <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#899097]">
                Features
              </p>
              <ul className="space-y-3">
                {project.features.map((feature, i) => (
                  <motion.li
                    key={feature}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={i}
                    variants={fadeUp}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#36454F] text-[10px] text-white">
                      ✓
                    </span>
                    <span className="text-sm leading-relaxed text-[#4C5C68] sm:text-base">
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
            >
              <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#899097]">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2.5">
                {project.techStack.map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.88 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04, duration: 0.3, ease: "easeOut" }}
                    className="rounded-full border border-[#4C5C68]/25 bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-[#36454F] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#36454F]/50 hover:shadow-md sm:px-4 sm:py-2 sm:text-sm"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Divider ─── */
function Divider() {
  return (
    <div className="mx-auto max-w-[1200px]">
      <div className="h-px bg-gradient-to-r from-transparent via-[#C5C3C6] to-transparent" />
    </div>
  );
}

/* ─── Main Page ─── */
export default function ProjectsPage() {
  const [galleries, setGalleries] = useState<Record<string, GalleryState>>({});

  function getGallery(id: string): GalleryState {
    return galleries[id] ?? { index: 0, dir: 0 };
  }

  function navigate(id: string, dir: number, total: number) {
    setGalleries((prev) => {
      const current = prev[id]?.index ?? 0;
      const next = (current + dir + total) % total;
      return { ...prev, [id]: { index: next, dir } };
    });
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(180deg, #DCDCDD 0%, #C5C3C6 100%)" }}
    >
      {/* ── Page Header ── */}
      <div
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(to bottom, #36454F 0%, #4C5C68 55%, #899097 80%, #C5C3C6 100%)",
        }}
      >
        {/* Dot overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.45) 1px, transparent 1px)",
            backgroundSize: "14px 14px",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 30%, black 70%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 30%, black 70%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-[1200px] px-4 pb-20 pt-36 sm:px-8 sm:pb-24 sm:pt-40 lg:px-10 lg:pb-28 lg:pt-44">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE }}
          >
            <Link
              href="/#projects"
              className="mb-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-white/80"
            >
              ← Back to Home
            </Link>
            <h1 className="text-5xl font-extrabold leading-[1.05] text-white sm:text-6xl lg:text-7xl xl:text-8xl">
              Projects
            </h1>
            <p className="mt-5 max-w-xl text-base leading-[1.85] text-white/65 sm:text-lg sm:mt-6 lg:text-xl">
              A collection of work that reflects my craft across AI, full-stack development, and systems design.
            </p>
          </motion.div>

          {/* Quick nav */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18, ease: EASE }}
            className="mt-10 flex flex-wrap gap-3 sm:mt-12"
          >
            {projects.map((p) => (
              <a
                key={p.id}
                href={`#${p.id}`}
                className="rounded-full border border-white/20 bg-white/8 px-5 py-2.5 text-sm font-semibold text-white/75 backdrop-blur-sm transition-all duration-200 hover:border-white/50 hover:bg-white/15 hover:text-white"
              >
                {p.title}
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Projects ── */}
      <div className="px-4 sm:px-8 lg:px-10">
        {projects.map((project, i) => (
          <div key={project.id}>
            <ProjectSection
              project={project}
              isEven={i % 2 !== 0}
              gallery={getGallery(project.id)}
              onNavigate={(dir) =>
                navigate(project.id, dir, project.screenshots.length)
              }
            />
            {i < projects.length - 1 && <Divider />}
          </div>
        ))}
      </div>

      {/* ── Footer CTA ── */}
      <div className="px-4 pb-24 pt-8 sm:px-8 sm:pb-28 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mx-auto max-w-[1200px] rounded-2xl border border-[#C5C3C6]/60 bg-white/50 p-8 text-center sm:p-12 xl:rounded-3xl"
        >
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#899097]">
            What&apos;s Next
          </p>
          <h2 className="text-2xl font-extrabold text-[#36454F] sm:text-3xl lg:text-4xl">
            Let&apos;s build something together
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-[#4C5C68]">
            I&apos;m always open to interesting projects and opportunities.
          </p>
          <div className="mt-8">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#36454F] px-8 py-3.5 text-sm font-bold text-white transition-all hover:bg-[#4C5C68] hover:shadow-lg sm:text-base"
            >
              Get in Touch →
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
