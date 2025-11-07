import Image from "next/image";
import React from "react";

export interface PackageCellProps {
  value: string;
}

export const PackageCell = ({ value }: PackageCellProps) => {
  return (
    <div className="md:flex items-center gap-2">
      <Image
        src={"/login/background.jpg"}
        alt="Package"
        width={32}
        height={32}
        className="rounded-full w-[24px] h-[24px]"
      />
      <span>{value}</span>
    </div>
  );
};
