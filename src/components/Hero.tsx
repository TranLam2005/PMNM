"use client";
import { useTimeline } from "@/hooks/useTimeline";

export default function Hero() {
  const { rootRef } = useTimeline((ctx, tl) => {
    const q = ctx.selector!;

    tl.from(q(".hero-title"), { y: 40, opacity: 0, duration: 0.8 })
      .from(q(".hero-sub"),   { y: 20, opacity: 0, duration: 0.6 }, "-=0.3")
      .from(q(".hero-cta"),   { scale: 0.9, opacity: 0, duration: 0.5 }, "-=0.2");
  }, []);

  return (
    <section
      ref={rootRef}
      className="min-h-[60vh] flex flex-col items-center justify-center text-center"
    >
      <h1 className="hero-title text-4xl font-bold">Welcome to the Playground</h1>
      <p className="hero-sub mt-3 text-neutral-600">GSAP + React, mượt như bơ</p>
      <button className="hero-cta mt-6 rounded-lg bg-black px-4 py-2 text-white">
        Get Started
      </button>
    </section>
  );
}
