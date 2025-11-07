"use client";
import Image from "next/image";
import React, { useRef } from "react";
import Upload from "@/app/icons/Upload.svg";
import Scan from "@/app/icons/Scan.svg";
import Finish from "@/app/icons/Finish.svg";
import Push from "@/app/icons/Push.svg";
import { Circle } from "./Circle";
import { useScrollReveal } from "@/hooks/useScrollReveal";

function WorkSteps(): React.ReactNode {
  const ref = useRef<HTMLDivElement | null>(null);
  useScrollReveal(ref, "[data-reveal]", { y: 28, stagger: 0.2 });

  return (
    <div ref={ref} className="w-full h-[902px] flex items-center justify-center">
      <div className="w-[1160px] h-full flex flex-col items-center justify-center gap-[30px]">
        <div className="flex flex-col items-center justify-center">
          <span className="text-[#5C64B5] text-[26px] font-semibold">Cách thức hoạt hộng</span>
          <span className="text-[36px] font-bold">Các bước</span>
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-[30px]">
          {/* Step 1 */}
          <div className="w-full flex items-center gap-[40px] relative left-[55px]">
            <div className="flex-1 flex items-center justify-center gap-[40px]">
              <div data-reveal className="flex flex-col items-end justify-center">
                <span className="text-[#BD6904] text-[20px]">1.Tải dữ liệu</span>
                <p className="text-end">
                  Chúng tôi sẽ tải dữ liệu vào hệ thống để tiến hành các bước xử lý dữ liệu.
                </p>
              </div>
              <Image
                src="/Vector 1.png"
                alt="Step 1"
                width={150}
                height={150}
                className="w-[27px] h-[137px]"
              />
            </div>
            <div className="flex-1 flex items-center">
              <Circle icon={<Upload className="w-[60px] h-[60px]" />} />
            </div>
          </div>
          {/* Step 2 */}
          <div className="w-full flex items-center justify-end gap-[40px] relative right-[50px]">
            <div className="flex-1 flex items-center justify-end">
              <Circle icon={<Scan className="w-[50px] h-[50px]" />} />
            </div>
            <div className="flex-1 flex items-center justify-center gap-[40px]">
              <Image
                src="/Vector 2.png"
                alt="Step 2"
                width={150}
                height={150}
                className="w-[27px] h-[137px]"
              />
              <div data-reveal className="flex flex-col items-start justify-center">
                <span className="text-[#BD6904] text-[20px]">2.Xử lý dữ liệu</span>
                <p>
                  Chúng tôi sẽ tiến hành làm sạch dữ liệu, kiểm tra hợp lệ và đảm bảo có dữ liệu cần thiết.
                </p>
              </div>
            </div>
          </div>
          {/* Step 3 */}
          <div className="w-full flex items-center justify-end gap-[40px] relative left-[55px]">
            <div className="flex-1 flex items-center justify-center gap-[40px]">
              <div data-reveal className="flex flex-col items-end justify-center">
                <span className="text-[#BD6904] text-[20px]">3.Huấn luyện model</span>
                <span className="text-end">
                  Sau khi dữ liệu đã được xử lý, chúng tôi sẽ tiến hành huấn luyện mô hình để dự đoán các chỉ số.
                </span>
              </div>
              <Image
                src="/Vector 3.png"
                alt="Step 3"
                width={150}
                height={150}
                className="w-[27px] h-[137px]"
              />
            </div>
            <div className="flex-1 flex items-center">
              <Circle icon={<Finish className="w-[60px] h-[60px]" />} />
            </div>
          </div>
          {/* Step 4 */}
          <div className="w-full flex items-center justify-end gap-[40px] relative right-[50px]">
            <div className="flex-1 flex items-center justify-end">
              <Circle icon={<Push className="w-[60px] h-[60px]" />} />
            </div>
            <div className="flex-1 flex items-center justify-center gap-[40px]">
              <Image
                src="/Vector 4.png"
                alt="Step 4"
                width={150}
                height={150}
                className="w-[27px] h-[137px]"
              />
              <div data-reveal className="flex flex-col items-start justify-center">
                <span className="text-[#BD6904] text-[20px]">2.Đưa dữ liệu lên client</span>
                <p>
                  Sau khi hoàn thành các bước huấn luyện và đánh giá mô hình, chúng tôi sẽ đưa dữ liệu và mô hình lên hệ thống client để sử dụng.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkSteps;
