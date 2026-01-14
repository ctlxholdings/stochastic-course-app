// Core types for the Stochastic Math Course App

export interface Lesson {
  id: number;
  title: string;
  phase: Phase;
  concept: string;
  context: string;
  simulation: SimulationConfig;
  keyInsight: string;
  rcQuestions: string[];
  quiz: Quiz;
}

export type Phase = 'A' | 'B' | 'C' | 'D';

export interface PhaseInfo {
  id: Phase;
  title: string;
  subtitle: string;
  lessons: number[];
}

export interface SimulationConfig {
  type: SimulationType;
  defaultParams: Record<string, number>;
  description: string;
}

export type SimulationType =
  | 'single-normal'
  | 'expected-vs-realized'
  | 'variance-comparison'
  | 'percentile-finder'
  | 'sum-independent'
  | 'sum-correlated'
  | 'sqrt-n-effect'
  | 'sqrt-n-correlated'
  | 'simple-cashflow'
  | 'binary-default'
  | 'multi-period'
  | 'irr-distribution'
  | 'dscr-distribution'
  | 'portfolio-aggregation'
  | 'reserve-sizing';

export interface Quiz {
  questions: QuizQuestion[];
  passingScore: number; // percentage, e.g., 80
}

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'numerical';
  question: string;
  options?: string[];
  correctAnswer: string | number | boolean;
  tolerance?: number; // for numerical questions
  explanation: string;
}

export interface LessonProgress {
  started: boolean;
  simulationCompleted: boolean;
  quizScore: number | null;
  quizAttempts: number;
  completed: boolean;
  notes: string;
  lastAccessed: string;
}

export interface UserProgress {
  lessonProgress: Record<number, LessonProgress>;
  currentLesson: number;
  lastAccessed: string;
}

export interface SimulationResult {
  samples: number[];
  stats: SimulationStats;
}

export interface SimulationStats {
  mean: number;
  variance: number;
  stdDev: number;
  min: number;
  max: number;
  p10: number;
  p50: number;
  p90: number;
}

export interface HistogramBin {
  range: string;
  count: number;
  min: number;
  max: number;
}

export interface CashflowPeriod {
  period: number;
  revenue: number;
  cost: number;
  netCashflow: number;
  debtService: number;
  dscr: number;
}

export interface ProjectSimulation {
  periods: CashflowPeriod[];
  irr: number;
  minDscr: number;
  defaulted: boolean;
}
