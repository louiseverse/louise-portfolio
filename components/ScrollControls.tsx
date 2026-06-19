"use client";

import { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

export default function ScrollControls() {
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);

  useEffect(() => {
    const updateScrollState = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      setCanScrollUp(scrollTop > 240);
      setCanScrollDown(scrollTop < maxScroll - 240);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  if (!canScrollUp && !canScrollDown) {
    return null;
  }

  return (
    <div className="fixed bottom-8 right-5 z-[999] flex flex-col gap-3 sm:right-8">
      {canScrollUp && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          title="Scroll to top"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/35 bg-[#172630]/88 text-white shadow-[0_14px_34px_rgba(0,0,0,0.28)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white hover:text-[#233239] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white"
        >
          <FaArrowUp className="h-4 w-4" />
        </button>
      )}

      {canScrollDown && (
        <button
          type="button"
          onClick={scrollToBottom}
          aria-label="Scroll to bottom"
          title="Scroll to bottom"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/35 bg-[#172630]/88 text-white shadow-[0_14px_34px_rgba(0,0,0,0.28)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white hover:text-[#233239] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white"
        >
          <FaArrowDown className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
