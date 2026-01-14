import { SimulationStats, HistogramBin } from '@/types';

/**
 * Calculate mean of an array
 */
export function mean(arr: number[]): number {
  if (arr.length === 0) return 0;
  return arr.reduce((sum, val) => sum + val, 0) / arr.length;
}

/**
 * Calculate variance of an array (sample variance)
 */
export function variance(arr: number[]): number {
  if (arr.length < 2) return 0;
  const m = mean(arr);
  const squaredDiffs = arr.map(val => (val - m) ** 2);
  return squaredDiffs.reduce((sum, val) => sum + val, 0) / (arr.length - 1);
}

/**
 * Calculate standard deviation
 */
export function stdDev(arr: number[]): number {
  return Math.sqrt(variance(arr));
}

/**
 * Calculate percentile (0-100)
 */
export function percentile(arr: number[], p: number): number {
  if (arr.length === 0) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const index = (p / 100) * (sorted.length - 1);
  const lower = Math.floor(index);
  const upper = Math.ceil(index);

  if (lower === upper) return sorted[lower];

  const weight = index - lower;
  return sorted[lower] * (1 - weight) + sorted[upper] * weight;
}

/**
 * Calculate min of an array
 */
export function min(arr: number[]): number {
  if (arr.length === 0) return 0;
  return Math.min(...arr);
}

/**
 * Calculate max of an array
 */
export function max(arr: number[]): number {
  if (arr.length === 0) return 0;
  return Math.max(...arr);
}

/**
 * Calculate all common statistics for a sample
 */
export function calculateStats(samples: number[]): SimulationStats {
  return {
    mean: mean(samples),
    variance: variance(samples),
    stdDev: stdDev(samples),
    min: min(samples),
    max: max(samples),
    p10: percentile(samples, 10),
    p50: percentile(samples, 50),
    p90: percentile(samples, 90),
  };
}

/**
 * Create histogram bins from samples
 */
export function createHistogramBins(samples: number[], numBins: number = 20): HistogramBin[] {
  if (samples.length === 0) return [];

  const minVal = min(samples);
  const maxVal = max(samples);
  const range = maxVal - minVal;
  const binWidth = range / numBins;

  const bins: HistogramBin[] = [];

  for (let i = 0; i < numBins; i++) {
    const binMin = minVal + i * binWidth;
    const binMax = minVal + (i + 1) * binWidth;
    bins.push({
      range: `${binMin.toFixed(0)}-${binMax.toFixed(0)}`,
      count: 0,
      min: binMin,
      max: binMax,
    });
  }

  // Count samples in each bin
  for (const sample of samples) {
    const binIndex = Math.min(
      Math.floor((sample - minVal) / binWidth),
      numBins - 1
    );
    if (binIndex >= 0 && binIndex < numBins) {
      bins[binIndex].count++;
    }
  }

  return bins;
}

/**
 * Calculate correlation coefficient between two arrays
 */
export function correlation(x: number[], y: number[]): number {
  if (x.length !== y.length || x.length < 2) return 0;

  const meanX = mean(x);
  const meanY = mean(y);

  let sumXY = 0;
  let sumX2 = 0;
  let sumY2 = 0;

  for (let i = 0; i < x.length; i++) {
    const dx = x[i] - meanX;
    const dy = y[i] - meanY;
    sumXY += dx * dy;
    sumX2 += dx * dx;
    sumY2 += dy * dy;
  }

  const denominator = Math.sqrt(sumX2 * sumY2);
  if (denominator === 0) return 0;

  return sumXY / denominator;
}

/**
 * Calculate Internal Rate of Return (IRR) using Newton-Raphson method
 */
export function calculateIRR(cashflows: number[], guess: number = 0.1): number {
  const maxIterations = 100;
  const tolerance = 1e-7;
  let rate = guess;

  for (let i = 0; i < maxIterations; i++) {
    let npv = 0;
    let dnpv = 0;

    for (let t = 0; t < cashflows.length; t++) {
      npv += cashflows[t] / Math.pow(1 + rate, t);
      dnpv -= t * cashflows[t] / Math.pow(1 + rate, t + 1);
    }

    if (Math.abs(dnpv) < 1e-10) break;

    const newRate = rate - npv / dnpv;

    if (Math.abs(newRate - rate) < tolerance) {
      return newRate;
    }

    rate = newRate;
  }

  return rate;
}

/**
 * Calculate Debt Service Coverage Ratio
 */
export function calculateDSCR(netCashflow: number, debtService: number): number {
  if (debtService === 0) return Infinity;
  return netCashflow / debtService;
}
