"use client";
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import EV from "@/app/icons/EV.svg";
import { ClassNameValue } from "tailwind-merge";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import "../../index.scss";
import Link from "next/link";
import EVFC from "./EV";
import { useScrollReveal } from "@/hooks/useScrollReveal";

function Banner() {
  const router = useRouter();
  const ref = useRef<HTMLDivElement | null>(null);
  useScrollReveal(ref, "[data-reveal]", { y: 58, stagger: 0.2 });
  return (
    <div ref={ref} className="cardBanner overflow-hidden bg-linear-to-b from-[#DAEAFF] to-[#F6FAFF] h-[635px] w-full flex items-center justify-center px-[50px]">
      <div className="cardBanner2" />
      <div data-reveal className="flex-1 flex flex-col items-start justify-center gap-[30px]">
        <h2 className="text-[45px] font-bold leading-tight">
          Phần mềm{" "}
          <span className="text-[#024CAA]">
            Dữ liệu & <br /> Chuẩn đoán tỉ lệ an ATTP
          </span>
        </h2>
        <div>
          <span className="font-semibold text-[24px]">
            Giải pháp cho sự tìm kiếm an toàn thực phẩm của bạn
          </span>
          <p className="w-[85%]">
            Phần mềm An Toàn Thực Phẩm hỗ trợ số hoá và quản lý toàn diện dữ liệu về cơ sở, chứng nhận và kiểm tra an toàn thực phẩm. Hệ thống giúp tra cứu nhanh, phân tích rủi ro và tăng tính minh bạch, góp phần nâng cao hiệu quả quản lý và bảo vệ sức khỏe cộng đồng.
          </p>
        </div>
        <div className="flex gap-5">
          <Link
            href="/signup"
            className="bg-[#EC8305] flex items-center justify-center rounded-md text-white hover:bg-[#ec8405dd] font-medium cursor-pointer w-40"
          >
            Đăng kí
          </Link>
          <Button className="w-40 cursor-pointer font-medium">
            <Link href="/login">Đăng nhập</Link>
          </Button>
        </div>
      </div>
      <EVFC />
    </div>
  );
}

export default Banner;
