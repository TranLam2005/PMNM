"use client";

import { useRef } from "react";
import { usePinParallax } from "@/hooks/usePinParallax";

export default function PinPanel() {
  const ref = useRef<HTMLDivElement | null>(null);

  usePinParallax(
    ref,
    [
      { selector: ".layer-1", y: -80 },
      { selector: ".layer-2", y: -140 },
      { selector: ".layer-3", y: -220 },
    ],
    { end: "+=150%", scrub: 1.2 }
  );

  return (
    <section ref={ref} className="relative h-[120vh] overflow-hidden w-full">
      <div className="absolute inset-0 flex items-center justify-center">
        <h3 className="text-3xl font-bold">Pinned Parallax</h3>
      </div>

      <img className="layer-1 absolute left-10 top-10 w-40 opacity-80" src="/logo.avif" alt="" />
      <img className="layer-2 absolute right-10 top-24 w-48 opacity-80" src="/logo.avif" alt="" />
      <img className="layer-3 absolute left-1/2 bottom-8 w-64 -translate-x-1/2 opacity-80" src="/logo.avif" alt="" />
    </section>
  );
}
