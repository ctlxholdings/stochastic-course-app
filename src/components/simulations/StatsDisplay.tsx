'use client';

import { SimulationStats } from '@/types';

interface StatsDisplayProps {
  stats: SimulationStats;
  sampleSize: number;
}

export default function StatsDisplay({ stats, sampleSize }: StatsDisplayProps) {
  const statItems = [
    { label: 'Sample Size', value: sampleSize.toLocaleString(), color: 'text-zinc-300' },
    { label: 'Mean (μ)', value: stats.mean.toFixed(2), color: 'text-green-400' },
    { label: 'Std Dev (σ)', value: stats.stdDev.toFixed(2), color: 'text-blue-400' },
    { label: 'Variance (σ²)', value: stats.variance.toFixed(2), color: 'text-blue-300' },
    { label: 'Min', value: stats.min.toFixed(2), color: 'text-zinc-400' },
    { label: 'Max', value: stats.max.toFixed(2), color: 'text-zinc-400' },
    { label: 'P10 (10th %ile)', value: stats.p10.toFixed(2), color: 'text-orange-400' },
    { label: 'P50 (Median)', value: stats.p50.toFixed(2), color: 'text-yellow-400' },
    { label: 'P90 (90th %ile)', value: stats.p90.toFixed(2), color: 'text-red-400' },
  ];

  return (
    <div className="bg-zinc-900 rounded-lg p-4">
      <h4 className="text-sm font-semibold text-zinc-400 mb-3">Statistics</h4>
      <div className="grid grid-cols-3 gap-3">
        {statItems.map((item) => (
          <div key={item.label} className="text-center">
            <div className={`text-lg font-mono font-semibold ${item.color}`}>
              {item.value}
            </div>
            <div className="text-xs text-zinc-500">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
