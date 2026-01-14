import { UserProgress, LessonProgress } from '@/types';

const STORAGE_KEY = 'stochastic-course-progress';

const defaultLessonProgress: LessonProgress = {
  started: false,
  simulationCompleted: false,
  quizScore: null,
  quizAttempts: 0,
  completed: false,
  notes: '',
  lastAccessed: '',
};

const defaultProgress: UserProgress = {
  lessonProgress: {},
  currentLesson: 1,
  lastAccessed: new Date().toISOString(),
};

export function getProgress(): UserProgress {
  if (typeof window === 'undefined') {
    return defaultProgress;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return defaultProgress;
    }
    return JSON.parse(stored) as UserProgress;
  } catch {
    return defaultProgress;
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;

  try {
    progress.lastAccessed = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save progress:', error);
  }
}

export function getLessonProgress(lessonId: number): LessonProgress {
  const progress = getProgress();
  return progress.lessonProgress[lessonId] || { ...defaultLessonProgress };
}

export function updateLessonProgress(
  lessonId: number,
  updates: Partial<LessonProgress>
): void {
  const progress = getProgress();
  const current = progress.lessonProgress[lessonId] || { ...defaultLessonProgress };

  progress.lessonProgress[lessonId] = {
    ...current,
    ...updates,
    lastAccessed: new Date().toISOString(),
  };

  saveProgress(progress);
}

export function markLessonStarted(lessonId: number): void {
  updateLessonProgress(lessonId, { started: true });

  const progress = getProgress();
  progress.currentLesson = lessonId;
  saveProgress(progress);
}

export function markSimulationCompleted(lessonId: number): void {
  updateLessonProgress(lessonId, { simulationCompleted: true });
}

export function saveQuizScore(lessonId: number, score: number, passingScore: number): void {
  const current = getLessonProgress(lessonId);
  const passed = score >= passingScore;

  updateLessonProgress(lessonId, {
    quizScore: score,
    quizAttempts: current.quizAttempts + 1,
    completed: passed,
  });
}

export function saveLessonNotes(lessonId: number, notes: string): void {
  updateLessonProgress(lessonId, { notes });
}

export function resetProgress(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

export function getCompletedLessonsCount(): number {
  const progress = getProgress();
  return Object.values(progress.lessonProgress).filter(lp => lp.completed).length;
}

export function getPhaseProgress(phaseLessons: number[]): {
  completed: number;
  total: number;
  percentage: number;
} {
  const progress = getProgress();
  const completed = phaseLessons.filter(
    id => progress.lessonProgress[id]?.completed
  ).length;

  return {
    completed,
    total: phaseLessons.length,
    percentage: Math.round((completed / phaseLessons.length) * 100),
  };
}
