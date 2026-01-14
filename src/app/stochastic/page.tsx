'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { phases, lessons } from '@/lib/lessons/lessonData';
import { getProgress, getPhaseProgress, getCompletedLessonsCount } from '@/lib/storage/progress';
import { UserProgress } from '@/types';

export default function StochasticCourse() {
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const completedCount = progress ? getCompletedLessonsCount() : 0;
  const totalLessons = lessons.length;
  const overallProgress = Math.round((completedCount / totalLessons) * 100);

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Header */}
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-4xl mx-auto px-6 md:px-8 py-8 md:py-12">
          {/* Breadcrumb */}
          <Link
            href="/"
            className="inline-block mb-4 text-sm hover:opacity-70 transition-opacity"
            style={{ color: 'var(--coral)' }}
          >
            ← All Courses
          </Link>

          <h1 className="text-2xl md:text-4xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            Stochastic Mathematics for Solar Project Finance
          </h1>
          <p className="text-base md:text-lg mb-6" style={{ color: 'var(--text-secondary)' }}>
            Build deep intuition for quantitative risk frameworks through 15 lessons
            with interactive Monte Carlo simulations.
          </p>

          {/* Overall Progress */}
          <div className="rounded-xl p-5" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)' }}>
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium" style={{ color: 'var(--text-primary)' }}>Overall Progress</span>
              <span className="font-mono text-sm" style={{ color: 'var(--coral)' }}>
                {completedCount}/{totalLessons} lessons
              </span>
            </div>
            <div className="progress-bar">
              <div
                className={`progress-bar-fill ${overallProgress === 100 ? 'complete' : ''}`}
                style={{ width: `${overallProgress}%` }}
              />
            </div>
            <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
              {overallProgress === 0
                ? 'Start your journey into stochastic modeling'
                : overallProgress === 100
                ? 'Congratulations! You\'ve completed all lessons'
                : `${overallProgress}% complete`}
            </p>
          </div>
        </div>
      </div>

      {/* Phases */}
      <div className="max-w-4xl mx-auto px-6 md:px-8 py-8">
        <div className="space-y-6">
          {phases.map((phase, phaseIdx) => {
            const phaseProgress = progress ? getPhaseProgress(phase.lessons) : { completed: 0, total: phase.lessons.length, percentage: 0 };
            const phaseColors = ['var(--blue)', 'var(--green)', 'var(--coral)', 'var(--red)'];
            const phaseColor = phaseColors[phaseIdx % phaseColors.length];

            return (
              <div
                key={phase.id}
                className="rounded-xl p-5 md:p-6"
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  borderLeft: `4px solid ${phaseColor}`
                }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-lg md:text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {phase.title}: {phase.subtitle}
                    </h2>
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                      {phase.lessons.length} lessons
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className="text-sm font-medium"
                      style={{ color: phaseProgress.percentage === 100 ? 'var(--green)' : 'var(--text-muted)' }}
                    >
                      {phaseProgress.completed}/{phaseProgress.total} complete
                    </span>
                  </div>
                </div>

                {/* Phase Progress Bar */}
                <div className="progress-bar mb-4">
                  <div
                    className={`progress-bar-fill ${phaseProgress.percentage === 100 ? 'complete' : ''}`}
                    style={{ width: `${phaseProgress.percentage}%` }}
                  />
                </div>

                {/* Lesson Cards */}
                <div className="grid gap-2 md:gap-3">
                  {phase.lessons.map((lessonId) => {
                    const lesson = lessons.find((l) => l.id === lessonId);
                    if (!lesson) return null;

                    const lessonProgress = progress?.lessonProgress[lessonId];
                    const isCompleted = lessonProgress?.completed;
                    const isStarted = lessonProgress?.started;

                    return (
                      <Link
                        key={lessonId}
                        href={`/stochastic/lesson/${lessonId}`}
                        className="flex items-center justify-between p-3 md:p-4 rounded-lg transition-all hover:shadow-md"
                        style={{
                          background: 'var(--bg-primary)',
                          border: '1px solid var(--border)'
                        }}
                      >
                        <div className="flex items-center gap-3 md:gap-4">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold"
                            style={{
                              background: isCompleted
                                ? 'rgba(39, 174, 96, 0.15)'
                                : isStarted
                                  ? 'rgba(255, 107, 74, 0.15)'
                                  : 'var(--bg-tertiary)',
                              color: isCompleted
                                ? 'var(--green)'
                                : isStarted
                                  ? 'var(--coral)'
                                  : 'var(--text-muted)'
                            }}
                          >
                            {isCompleted ? '✓' : lessonId}
                          </div>
                          <div>
                            <h3
                              className="font-medium text-sm md:text-base"
                              style={{ color: 'var(--text-primary)' }}
                            >
                              {lesson.title}
                            </h3>
                            {lessonProgress?.quizScore !== null && lessonProgress?.quizScore !== undefined && (
                              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                Quiz: {lessonProgress.quizScore}%
                              </p>
                            )}
                          </div>
                        </div>
                        <span style={{ color: 'var(--text-muted)' }}>→</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Philosophy */}
        <div
          className="mt-8 rounded-xl p-5 md:p-6"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderLeft: '4px solid var(--coral)'
          }}
        >
          <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
            Course Philosophy
          </h3>
          <ul className="space-y-2" style={{ color: 'var(--text-secondary)' }}>
            <li className="flex items-start gap-2">
              <span style={{ color: 'var(--coral)' }}>•</span>
              <span>One concept per lesson, one simulation per lesson, one key insight per lesson</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: 'var(--coral)' }}>•</span>
              <span>No progression until mastery—complete the quiz to unlock the next lesson</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: 'var(--coral)' }}>•</span>
              <span>Math → Model → Documents (documentation is output, not input)</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
