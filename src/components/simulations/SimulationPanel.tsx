'use client';

import { useState, useCallback } from 'react';
import { Lesson, SimulationStats, HistogramBin } from '@/types';
import { sampleNormal, sampleCorrelatedNormals } from '@/lib/simulations/random';
import { calculateStats, createHistogramBins, mean, stdDev } from '@/lib/simulations/statistics';
import Histogram from './Histogram';
import StatsDisplay from './StatsDisplay';

interface SimulationPanelProps {
  lesson: Lesson;
  onComplete: () => void;
}

export default function SimulationPanel({ lesson, onComplete }: SimulationPanelProps) {
  const [hasRun, setHasRun] = useState(false);
  const [samples, setSamples] = useState<number[]>([]);
  const [stats, setStats] = useState<SimulationStats | null>(null);
  const [histogramData, setHistogramData] = useState<HistogramBin[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  // Dynamic parameters based on lesson type
  const [params, setParams] = useState(lesson.simulation.defaultParams);

  const runSimulation = useCallback(() => {
    setIsRunning(true);

    // Small delay to show loading state
    setTimeout(() => {
      let newSamples: number[] = [];

      switch (lesson.simulation.type) {
        case 'single-normal':
        case 'expected-vs-realized':
        case 'percentile-finder':
          newSamples = sampleNormal(
            params.samples || 1000,
            params.mean || 1500,
            params.stdDev || 100
          );
          break;

        case 'variance-comparison':
          // For comparison, we'll just show the first distribution
          newSamples = sampleNormal(
            params.samples || 1000,
            params.mean || 1500,
            params.stdDev1 || 50
          );
          break;

        case 'sum-independent':
          const x1 = sampleNormal(params.samples || 1000, params.mean1 || 100, params.std1 || 20);
          const y1 = sampleNormal(params.samples || 1000, params.mean2 || 100, params.std2 || 20);
          newSamples = x1.map((xi, i) => xi + y1[i]);
          break;

        case 'sum-correlated':
          const { x, y } = sampleCorrelatedNormals(
            params.samples || 1000,
            params.mean1 || 100,
            params.std1 || 20,
            params.mean2 || 100,
            params.std2 || 20,
            params.rho || 0.5
          );
          newSamples = x.map((xi, i) => xi + y[i]);
          break;

        case 'simple-cashflow':
          const revenues = sampleNormal(params.samples || 1000, params.revenueMean || 150, params.revenueStd || 20);
          const costs = sampleNormal(params.samples || 1000, params.costMean || 80, params.costStd || 10);
          newSamples = revenues.map((r, i) => r - costs[i]);
          break;

        case 'binary-default':
          const cashflows = sampleNormal(params.samples || 10000, params.cashflowMean || 70, params.cashflowStd || 22);
          newSamples = cashflows.map(cf => Math.random() < (params.defaultProb || 0.05) ? 0 : cf);
          break;

        default:
          newSamples = sampleNormal(params.samples || 1000, params.mean || 100, params.stdDev || 20);
      }

      const newStats = calculateStats(newSamples);
      const bins = createHistogramBins(newSamples, 25);

      setSamples(newSamples);
      setStats(newStats);
      setHistogramData(bins);
      setHasRun(true);
      setIsRunning(false);
      onComplete();
    }, 100);
  }, [lesson, params, onComplete]);

  const updateParam = (key: string, value: number) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Interactive Simulation</h3>
      <p className="text-gray-600 text-sm mb-4">{lesson.simulation.description}</p>

      {/* Parameter Controls */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        {Object.entries(params).map(([key, value]) => (
          <div key={key}>
            <label className="block text-xs text-gray-500 mb-1 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </label>
            <input
              type="number"
              value={value}
              onChange={(e) => updateParam(key, parseFloat(e.target.value) || 0)}
              className="w-full bg-gray-50 text-gray-900 border border-gray-200 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral"
            />
          </div>
        ))}
      </div>

      {/* Run Button */}
      <button
        onClick={runSimulation}
        disabled={isRunning}
        className="w-full bg-coral hover:bg-coral-dark disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors mb-6"
      >
        {isRunning ? 'Running Simulation...' : hasRun ? 'Run Again' : 'Run Simulation'}
      </button>

      {/* Results */}
      {hasRun && stats && (
        <div className="space-y-6">
          <Histogram
            data={histogramData}
            mean={stats.mean}
            p10={stats.p10}
            p90={stats.p90}
            xLabel={lesson.id <= 4 ? 'kWh/kWp' : 'Value'}
            showPercentiles={true}
          />
          <StatsDisplay stats={stats} sampleSize={samples.length} />
        </div>
      )}
    </div>
  );
}
