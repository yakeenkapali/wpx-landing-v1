"use client";

import { useEffect, useRef, useState } from "react";

export function useInView(once = true) {
  const ref = useRef<HTMLDivElement>(null);
  const [enhanced, setEnhanced] = useState(false);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    )
      return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setEnhanced(true);
        if (entry.isIntersecting) setVisible(true);
        setActive(entry.isIntersecting);
        if (entry.isIntersecting && once) observer.unobserve(element);
      },
      { threshold: 0.12 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [once]);

  return { ref, enhanced, visible, active };
}
