'use client';

import { SimulationStats } from '@/types';

interface StatsDisplayProps {
  stats: SimulationStats;
  sampleSize: number;
}

export default function StatsDisplay({ stats, sampleSize }: StatsDisplayProps) {
  const statItems = [
    { label: 'Sample Size', value: sampleSize.toLocaleString(), color: 'text-gray-700' },
    { label: 'Mean (μ)', value: stats.mean.toFixed(2), color: 'text-green-600' },
    { label: 'Std Dev (σ)', value: stats.stdDev.toFixed(2), color: 'text-blue-600' },
    { label: 'Variance (σ²)', value: stats.variance.toFixed(2), color: 'text-blue-500' },
    { label: 'Min', value: stats.min.toFixed(2), color: 'text-gray-500' },
    { label: 'Max', value: stats.max.toFixed(2), color: 'text-gray-500' },
    { label: 'P10 (10th %ile)', value: stats.p10.toFixed(2), color: 'text-orange-500' },
    { label: 'P50 (Median)', value: stats.p50.toFixed(2), color: 'text-amber-600' },
    { label: 'P90 (90th %ile)', value: stats.p90.toFixed(2), color: 'text-red-500' },
  ];

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
      <h4 className="text-sm font-semibold text-gray-500 mb-3">Statistics</h4>
      <div className="grid grid-cols-3 gap-3">
        {statItems.map((item) => (
          <div key={item.label} className="text-center">
            <div className={`text-lg font-mono font-semibold ${item.color}`}>
              {item.value}
            </div>
            <div className="text-xs text-gray-500">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
