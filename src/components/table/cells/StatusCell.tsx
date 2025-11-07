import React from "react";

export interface StatusProps {
  value: string;
  colorMap: Record<string, string>;
}

const colorClasses: Record<string, string> = {
  orange: "bg-orange-100 text-orange-700",
  green: "bg-green-100 text-green-700",
  red: "bg-red-100 text-red-700",
  blue: "bg-blue-100 text-blue-700",
  purple: "bg-purple-100 text-purple-700",
};

export const Status = ({ value, colorMap }: StatusProps) => {
  const color = colorClasses[colorMap[value]];
  return <span className={`px-2 py-1 rounded ${color}`}>{value}</span>;
};
