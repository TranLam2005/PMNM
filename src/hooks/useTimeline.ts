"use client";
import { useRef } from "react";
import { useIsoLayoutEffect } from "./useIsomorphicLayoutEffect";
import { useGsapRegister } from "./useGsapRegister";

type SetupFn = (ctx: gsap.Context, tl: gsap.core.Timeline) => void;

export function useTimeline(setup: SetupFn, deps: any[] = []) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const { gsap } = useGsapRegister();

  useIsoLayoutEffect(() => {
    if (!gsap || !rootRef.current) return;

    // 1) Tạo context trước
    const ctx = gsap.context(() => {}, rootRef);

    // 2) Chạy phần setup BÊN TRONG context
    ctx.add(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      setup(ctx, tl); // ctx đã sẵn sàng, có ctx.selector
    });

    // 3) Cleanup gọn gàng
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { rootRef };
}