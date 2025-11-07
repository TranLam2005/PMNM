"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { LineChartData } from "./types";
import { METRICS } from "./registry";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useState } from "react";
import React from "react";


function LineChart({data}: {data: LineChartData[]}) {
  const chartDataBase = data.map(r => ({ d: r.period_month, ...r }));
  const [metricKey, setMetricKey] = useState<string>(METRICS[0].key);
  const selected = React.useMemo(() => METRICS.find(m => m.key === metricKey) || METRICS[0], [metricKey]);

  return ( 
    <div className="h-92 w-full rounded-md bg-white flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="text-[25px] font-medium">{selected.label}</h2>
        <div className="border border-slate-200 rounded-xl p-1 flex items-center justify-center w-fit">
          <Select
            onValueChange={setMetricKey}
            value={metricKey}
          >
            <SelectTrigger>
              <SelectValue placeholder={METRICS[0].label} />
            </SelectTrigger>
            <SelectContent>
              {METRICS.map(metric => (
                <SelectItem key={metric.key} value={metric.key}>
                  {metric.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartDataBase} margin={{ top: 10, right: 0, bottom: 0, left: 0 }}>
          <defs>
          <linearGradient id="c" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.35} />
          <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
          </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="d" tickLine={false} axisLine={false} />
          <YAxis dataKey={selected.key} />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Area
            type="monotone"
            dataKey={selected.key}
            stroke="#60a5fa"
            fillOpacity={1}
            fill="url(#c)"
            isAnimationActive
            animationDuration={300}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
   );
}

export default LineChart;