"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { ClassNameValue } from "tailwind-merge";
import EV from "@/app/icons/EV.svg";
import { useTimeline } from "@/hooks/useTimeline";

function EVFC() {
  const { rootRef } = useTimeline((ctx, tl) => {
    const q = ctx.selector!;

    tl.from(q(".ev-icon"), { y: 40, opacity: 0, duration: 0.8 })
      .from(q(".metric-1"), { y: 20, opacity: 0, duration: 0.6 }, "-=0.2")
      .from(q(".metric-2"), { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
      .from(q(".metric-3"), { y: 20, opacity: 0, duration: 0.6 }, "-=0.4");
  }, []);

  return ( 
    <div ref={rootRef} className="flex-1 flex flex-col items-center justify-center">
      <EV className="relative top-[110px] z-10 ev-icon" />
      <div className="relative left-[127px] bottom-40 z-20 metric-1">
        <KeyMetric award="6" description="Nguồn dữ liệu" />
      </div>
      <div className="relative right-[130px] top-[-140px] z-20 metric-2">
        <KeyMetric award="90%" description="Xử lý thành công" />
      </div>
      <div className="relative bottom-[90px] z-20 metric-3">
        <KeyMetric award="10%" description="Xử lý lỗi" />
      </div>
    </div>
   );
}

export default EVFC;

const KeyMetric: React.FC<{ award: string; description: string; className?: ClassNameValue }> = ({
  award,
  description,
  className,
}) => {
  return (
    <div
      className={cn(
        "bg-white/5 backdrop-blur-sm w-[260px] h-[62px] flex items-center justify-center gap-[10px] text-[#EC8305] font-bold text-[30px] rounded-sm border border-[#7389D9]",
        className
      )}
    >
      {award} <p className="text-black text-[20px] font-semibold">{description}</p>
    </div>
  );
};