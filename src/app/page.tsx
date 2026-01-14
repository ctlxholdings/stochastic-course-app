'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { phases, lessons } from '@/lib/lessons/lessonData';
import { getProgress, getPhaseProgress, getCompletedLessonsCount } from '@/lib/storage/progress';
import { UserProgress } from '@/types';

export default function Home() {
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const completedCount = progress ? getCompletedLessonsCount() : 0;
  const totalLessons = lessons.length;
  const overallProgress = Math.round((completedCount / totalLessons) * 100);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Hero */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">
          Stochastic Mathematics for Solar Project Finance
        </h1>
        <p className="text-zinc-400 text-lg mb-6">
          Build deep intuition for quantitative risk frameworks through 15 lessons
          with interactive Monte Carlo simulations.
        </p>

        {/* Overall Progress */}
        <div className="bg-zinc-800 rounded-lg p-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-zinc-300 font-medium">Overall Progress</span>
            <span className="text-blue-400 font-mono">{completedCount}/{totalLessons} lessons</span>
          </div>
          <div className="w-full bg-zinc-700 rounded-full h-3">
            <div
              className="bg-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          <p className="text-zinc-500 text-sm mt-2">
            {overallProgress === 0
              ? 'Start your journey into stochastic modeling'
              : overallProgress === 100
              ? 'Congratulations! You\'ve completed all lessons'
              : `${overallProgress}% complete`}
          </p>
        </div>
      </div>

      {/* Phases */}
      <div className="space-y-8">
        {phases.map((phase) => {
          const phaseProgress = progress ? getPhaseProgress(phase.lessons) : { completed: 0, total: phase.lessons.length, percentage: 0 };

          return (
            <div key={phase.id} className="bg-zinc-900 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    {phase.title}: {phase.subtitle}
                  </h2>
                  <p className="text-zinc-500 text-sm">
                    {phase.lessons.length} lessons
                  </p>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-medium ${phaseProgress.percentage === 100 ? 'text-green-400' : 'text-zinc-400'}`}>
                    {phaseProgress.completed}/{phaseProgress.total} complete
                  </span>
                </div>
              </div>

              {/* Phase Progress Bar */}
              <div className="w-full bg-zinc-800 rounded-full h-2 mb-4">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    phaseProgress.percentage === 100 ? 'bg-green-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${phaseProgress.percentage}%` }}
                />
              </div>

              {/* Lesson Cards */}
              <div className="grid gap-3">
                {phase.lessons.map((lessonId) => {
                  const lesson = lessons.find((l) => l.id === lessonId);
                  if (!lesson) return null;

                  const lessonProgress = progress?.lessonProgress[lessonId];
                  const isCompleted = lessonProgress?.completed;
                  const isStarted = lessonProgress?.started;

                  return (
                    <Link
                      key={lessonId}
                      href={`/lesson/${lessonId}`}
                      className="flex items-center justify-between p-4 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors group"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          isCompleted
                            ? 'bg-green-900 text-green-400'
                            : isStarted
                            ? 'bg-yellow-900 text-yellow-400'
                            : 'bg-zinc-700 text-zinc-400'
                        }`}>
                          {isCompleted ? '✓' : lessonId}
                        </div>
                        <div>
                          <h3 className="text-white font-medium group-hover:text-blue-400 transition-colors">
                            Lesson {lessonId}: {lesson.title}
                          </h3>
                          {lessonProgress?.quizScore !== null && lessonProgress?.quizScore !== undefined && (
                            <p className="text-zinc-500 text-sm">
                              Quiz: {lessonProgress.quizScore}%
                            </p>
                          )}
                        </div>
                      </div>
                      <span className="text-zinc-600 group-hover:text-zinc-400 transition-colors">
                        →
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Philosophy */}
      <div className="mt-12 bg-zinc-900 rounded-lg p-6 border border-zinc-800">
        <h3 className="text-lg font-semibold text-white mb-3">Course Philosophy</h3>
        <ul className="space-y-2 text-zinc-400">
          <li className="flex items-start gap-2">
            <span className="text-blue-400">•</span>
            <span>One concept per lesson, one simulation per lesson, one key insight per lesson</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400">•</span>
            <span>No progression until mastery—complete the quiz to unlock the next lesson</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400">•</span>
            <span>Math → Model → Documents (documentation is output, not input)</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
