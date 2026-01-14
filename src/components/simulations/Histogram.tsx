'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { HistogramBin } from '@/types';

interface HistogramProps {
  data: HistogramBin[];
  mean?: number;
  p10?: number;
  p50?: number;
  p90?: number;
  xLabel?: string;
  yLabel?: string;
  color?: string;
  showPercentiles?: boolean;
}

export default function Histogram({
  data,
  mean,
  p10,
  p50,
  p90,
  xLabel = 'Value',
  yLabel = 'Frequency',
  color = '#3b82f6',
  showPercentiles = true,
}: HistogramProps) {
  // Format data for chart - use midpoint of bin as x value
  const chartData = data.map((bin) => ({
    name: ((bin.min + bin.max) / 2).toFixed(0),
    count: bin.count,
    range: bin.range,
  }));

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="name"
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            label={{ value: xLabel, position: 'bottom', fill: '#9ca3af', offset: 0 }}
          />
          <YAxis
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            label={{ value: yLabel, angle: -90, position: 'insideLeft', fill: '#9ca3af' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              border: '1px solid #374151',
              borderRadius: '8px',
            }}
            labelStyle={{ color: '#f3f4f6' }}
            itemStyle={{ color: '#60a5fa' }}
            formatter={(value) => [String(value ?? 0), 'Count']}
            labelFormatter={(label) => `Value: ${label}`}
          />
          <Bar dataKey="count" fill={color} radius={[2, 2, 0, 0]} />

          {showPercentiles && mean !== undefined && (
            <ReferenceLine
              x={mean.toFixed(0)}
              stroke="#22c55e"
              strokeWidth={2}
              label={{ value: `μ=${mean.toFixed(0)}`, fill: '#22c55e', position: 'top' }}
            />
          )}
          {showPercentiles && p10 !== undefined && (
            <ReferenceLine
              x={p10.toFixed(0)}
              stroke="#f97316"
              strokeDasharray="5 5"
              label={{ value: `P10`, fill: '#f97316', position: 'top' }}
            />
          )}
          {showPercentiles && p90 !== undefined && (
            <ReferenceLine
              x={p90.toFixed(0)}
              stroke="#ef4444"
              strokeDasharray="5 5"
              label={{ value: `P90`, fill: '#ef4444', position: 'top' }}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
