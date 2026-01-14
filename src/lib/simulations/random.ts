// Random number generation and statistical sampling

/**
 * Generate a random number from standard normal distribution (mean=0, std=1)
 * using Box-Muller transform
 */
export function randomStandardNormal(): number {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

/**
 * Generate a random number from normal distribution N(mean, stdDev)
 */
export function randomNormal(mean: number, stdDev: number): number {
  return mean + stdDev * randomStandardNormal();
}

/**
 * Generate n samples from normal distribution N(mean, stdDev)
 */
export function sampleNormal(n: number, mean: number, stdDev: number): number[] {
  const samples: number[] = [];
  for (let i = 0; i < n; i++) {
    samples.push(randomNormal(mean, stdDev));
  }
  return samples;
}

/**
 * Generate two correlated normal samples using Cholesky decomposition
 * Returns [x, y] where correlation(x, y) = rho
 */
export function correlatedNormalPair(
  mean1: number,
  std1: number,
  mean2: number,
  std2: number,
  rho: number
): [number, number] {
  const z1 = randomStandardNormal();
  const z2 = randomStandardNormal();

  const x = mean1 + std1 * z1;
  const y = mean2 + std2 * (rho * z1 + Math.sqrt(1 - rho * rho) * z2);

  return [x, y];
}

/**
 * Generate n pairs of correlated normal samples
 */
export function sampleCorrelatedNormals(
  n: number,
  mean1: number,
  std1: number,
  mean2: number,
  std2: number,
  rho: number
): { x: number[]; y: number[] } {
  const x: number[] = [];
  const y: number[] = [];

  for (let i = 0; i < n; i++) {
    const [xi, yi] = correlatedNormalPair(mean1, std1, mean2, std2, rho);
    x.push(xi);
    y.push(yi);
  }

  return { x, y };
}

/**
 * Generate a Bernoulli random variable (1 with probability p, 0 otherwise)
 */
export function randomBernoulli(p: number): number {
  return Math.random() < p ? 1 : 0;
}

/**
 * Generate n Bernoulli samples
 */
export function sampleBernoulli(n: number, p: number): number[] {
  const samples: number[] = [];
  for (let i = 0; i < n; i++) {
    samples.push(randomBernoulli(p));
  }
  return samples;
}

/**
 * Generate a uniform random number in [min, max]
 */
export function randomUniform(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

/**
 * Set seed for reproducibility (basic implementation)
 * Note: JavaScript Math.random() doesn't support seeding natively
 * This is a simple seeded PRNG for demonstration
 */
let seed = Date.now();

export function setSeed(s: number): void {
  seed = s;
}

export function seededRandom(): number {
  seed = (seed * 1103515245 + 12345) & 0x7fffffff;
  return seed / 0x7fffffff;
}
