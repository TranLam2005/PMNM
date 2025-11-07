"use client";
import { RefObject } from "react";
import { useIsoLayoutEffect } from "./useIsomorphicLayoutEffect";
import { useGsapRegister } from "./useGsapRegister";

type Options = {
  y?: number;
  duration?: number;
  stagger?: number;
  once?: boolean;
};

export function useScrollReveal(
  containerRef: RefObject<HTMLElement | null>,
  selectors = "[data-reveal]",
  options: Options = {}
) {
  const { gsap, ScrollTrigger } = useGsapRegister();
  const { y = 24, duration = 0.8, stagger = 0.08, once = true } = options;

  useIsoLayoutEffect(() => {
    if (!gsap || !ScrollTrigger || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const els = gsap.utils.toArray(selectors) as HTMLElement[];
      gsap.set(els, { opacity: 0, y });

      els.forEach((el, i) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration,
          delay: i * stagger,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: once ? "play none none none" : "play none none reverse",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef, gsap, ScrollTrigger, y, duration, stagger, once]);
}