"use client";
import { RefObject } from "react";
import { useIsoLayoutEffect } from "./useIsomorphicLayoutEffect";
import { useGsapRegister } from "./useGsapRegister";

type ParallaxItem = { selector: string; y?: number; x?: number };

export function usePinParallax(
  containerRef: RefObject<HTMLElement | null>,
  items: ParallaxItem[],
  opts?: { end?: string; scrub?: number | boolean }
) {
  const { gsap, ScrollTrigger } = useGsapRegister();

  useIsoLayoutEffect(() => {
    if (!gsap || !ScrollTrigger || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: opts?.end ?? "+=120%",
          pin: true,
          scrub: opts?.scrub ?? 1,
          anticipatePin: 1,
        },
      });

      items.forEach((it) => {
        tl.to(it.selector, { y: it.y ?? -100, x: it.x ?? 0 }, 0);
      });
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef, gsap, ScrollTrigger, items, opts]);
}