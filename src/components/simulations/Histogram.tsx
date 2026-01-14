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
  color = '#FF6B4A',
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
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis
            dataKey="name"
            tick={{ fill: '#6B7280', fontSize: 12 }}
            label={{ value: xLabel, position: 'bottom', fill: '#6B7280', offset: 0 }}
          />
          <YAxis
            tick={{ fill: '#6B7280', fontSize: 12 }}
            label={{ value: yLabel, angle: -90, position: 'insideLeft', fill: '#6B7280' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
            labelStyle={{ color: '#1F2937' }}
            itemStyle={{ color: '#FF6B4A' }}
            formatter={(value) => [String(value ?? 0), 'Count']}
            labelFormatter={(label) => `Value: ${label}`}
          />
          <Bar dataKey="count" fill={color} radius={[2, 2, 0, 0]} />

          {showPercentiles && mean !== undefined && (
            <ReferenceLine
              x={mean.toFixed(0)}
              stroke="#16A34A"
              strokeWidth={2}
              label={{ value: `μ=${mean.toFixed(0)}`, fill: '#16A34A', position: 'top' }}
            />
          )}
          {showPercentiles && p10 !== undefined && (
            <ReferenceLine
              x={p10.toFixed(0)}
              stroke="#EA580C"
              strokeDasharray="5 5"
              label={{ value: `P10`, fill: '#EA580C', position: 'top' }}
            />
          )}
          {showPercentiles && p90 !== undefined && (
            <ReferenceLine
              x={p90.toFixed(0)}
              stroke="#DC2626"
              strokeDasharray="5 5"
              label={{ value: `P90`, fill: '#DC2626', position: 'top' }}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
