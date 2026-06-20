"use client";

import { useEffect, useRef, useState } from "react";

type CursorParticle = {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
};

const maxParticles = 50;
const particleLifetime = 560;
const spawnEveryMs = 14;

export default function CursorAnimation() {
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [pointer, setPointer] = useState({ x: -100, y: -100 });
  const [particles, setParticles] = useState<CursorParticle[]>([]);
  const nextParticleId = useRef(0);
  const lastSpawnedAt = useRef(0);

  useEffect(() => {
    const canUseFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateEnabledState = () => {
      setIsEnabled(canUseFinePointer.matches && !reduceMotion.matches);
    };

    updateEnabledState();
    canUseFinePointer.addEventListener("change", updateEnabledState);
    reduceMotion.addEventListener("change", updateEnabledState);

    return () => {
      canUseFinePointer.removeEventListener("change", updateEnabledState);
      reduceMotion.removeEventListener("change", updateEnabledState);
    };
  }, []);

  useEffect(() => {
    if (!isEnabled) {
      setIsVisible(false);
      setParticles([]);
      document.documentElement.classList.remove("custom-cursor-active");
      return;
    }

    document.documentElement.classList.add("custom-cursor-active");

    const handlePointerMove = (event: PointerEvent) => {
      const now = performance.now();
      const nextPointer = { x: event.clientX, y: event.clientY };

      setPointer(nextPointer);
      setIsVisible(true);

      if (now - lastSpawnedAt.current < spawnEveryMs) {
        return;
      }

      lastSpawnedAt.current = now;

      const particle: CursorParticle = {
        id: nextParticleId.current,
        x: nextPointer.x,
        y: nextPointer.y,
        rotation: (nextParticleId.current * 31) % 360,
        scale: 0.86 + (nextParticleId.current % 5) * 0.06,
      };

      nextParticleId.current += 1;

      setParticles((currentParticles) => [...currentParticles, particle].slice(-maxParticles));

      window.setTimeout(() => {
        setParticles((currentParticles) =>
          currentParticles.filter((currentParticle) => currentParticle.id !== particle.id),
        );
      }, particleLifetime);
    };

    const handlePointerDown = () => setIsPressed(true);
    const handlePointerUp = () => setIsPressed(false);
    const handlePointerLeave = () => setIsVisible(false);
    const handlePointerEnter = () => setIsVisible(true);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    document.documentElement.addEventListener("mouseleave", handlePointerLeave);
    document.documentElement.addEventListener("mouseenter", handlePointerEnter);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      document.documentElement.removeEventListener("mouseleave", handlePointerLeave);
      document.documentElement.removeEventListener("mouseenter", handlePointerEnter);
    };
  }, [isEnabled]);

  if (!isEnabled) {
    return null;
  }

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1000]">
      <div
        className={`portfolio-cursor-hotspot ${isPressed ? "portfolio-cursor-hotspot-pressed" : ""}`}
        style={{
          left: pointer.x,
          opacity: isVisible ? 1 : 0,
          top: pointer.y,
        }}
      />

      {particles.map((particle) => (
        <div
          key={particle.id}
          className="portfolio-loader-container"
          style={{
            height: 96 * particle.scale,
            left: particle.x - (96 * particle.scale) / 2,
            top: particle.y - (96 * particle.scale) / 2,
            width: 96 * particle.scale,
          }}
        >
          <div className="portfolio-loader" style={{ transform: `rotate(${particle.rotation}deg)` }} />
        </div>
      ))}
    </div>
  );
}
