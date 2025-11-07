// src/components/RevealSection.tsx
"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type Props = { title: string; items: string[] };

export default function RevealSection({ title, items }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  useScrollReveal(ref, "[data-reveal]", { y: 28, stagger: 0.1 });

  return (
    <section ref={ref} className="py-16">
      <h2 data-reveal className="text-2xl font-semibold">{title}</h2>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((t, i) => (
          <div
            key={i}
            data-reveal
            className="rounded-xl border p-6 shadow-sm"
          >
            {t}
          </div>
        ))}
      </div>
    </section>
  );
}
