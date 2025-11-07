import React from "react";
import { format as formatDateFn } from "date-fns";

export interface DateTimeCellProps {
  value: number;
  format?: string;
}

export const DateTimeCell: React.FC<DateTimeCellProps> = ({
  value,
  format = "yyyy-MM-dd HH:mm:ss",
}) => {
  const date = new Date(value);
  let text: string;

  try {
    text = formatDateFn(date, format);
  } catch (error) {
    console.error("Invalid date format:", format, error);
    text = date.toLocaleString();
  }
  return <span>{text} (UTC)</span>;
};
