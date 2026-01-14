'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { phases, lessons } from '@/lib/lessons/lessonData';
import { getProgress, resetProgress, getPhaseProgress } from '@/lib/storage/progress';
import { UserProgress } from '@/types';

export default function ProgressPage() {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const handleReset = () => {
    resetProgress();
    setProgress(getProgress());
    setShowResetConfirm(false);
  };

  const completedLessons = progress
    ? Object.entries(progress.lessonProgress).filter(([_, lp]) => lp.completed).length
    : 0;

  const startedLessons = progress
    ? Object.entries(progress.lessonProgress).filter(([_, lp]) => lp.started && !lp.completed).length
    : 0;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Progress Dashboard</h1>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-zinc-800 rounded-lg p-6 text-center">
          <div className="text-4xl font-bold text-green-400 mb-2">{completedLessons}</div>
          <div className="text-zinc-400">Completed</div>
        </div>
        <div className="bg-zinc-800 rounded-lg p-6 text-center">
          <div className="text-4xl font-bold text-yellow-400 mb-2">{startedLessons}</div>
          <div className="text-zinc-400">In Progress</div>
        </div>
        <div className="bg-zinc-800 rounded-lg p-6 text-center">
          <div className="text-4xl font-bold text-zinc-400 mb-2">{lessons.length - completedLessons - startedLessons}</div>
          <div className="text-zinc-400">Not Started</div>
        </div>
      </div>

      {/* Phase Progress */}
      <div className="space-y-6 mb-8">
        {phases.map((phase) => {
          const phaseProgress = progress ? getPhaseProgress(phase.lessons) : { completed: 0, total: phase.lessons.length, percentage: 0 };

          return (
            <div key={phase.id} className="bg-zinc-900 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-white">{phase.title}</h2>
                  <p className="text-zinc-500 text-sm">{phase.subtitle}</p>
                </div>
                <div className="text-right">
                  <span className={`text-2xl font-bold ${phaseProgress.percentage === 100 ? 'text-green-400' : 'text-blue-400'}`}>
                    {phaseProgress.percentage}%
                  </span>
                </div>
              </div>

              <div className="w-full bg-zinc-800 rounded-full h-3 mb-4">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${
                    phaseProgress.percentage === 100 ? 'bg-green-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${phaseProgress.percentage}%` }}
                />
              </div>

              {/* Lesson Details */}
              <div className="grid grid-cols-2 gap-2">
                {phase.lessons.map((lessonId) => {
                  const lesson = lessons.find((l) => l.id === lessonId);
                  const lp = progress?.lessonProgress[lessonId];

                  return (
                    <Link
                      key={lessonId}
                      href={`/stochastic/lesson/${lessonId}`}
                      className="flex items-center justify-between p-3 bg-zinc-800 hover:bg-zinc-700 rounded transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                          lp?.completed
                            ? 'bg-green-900 text-green-400'
                            : lp?.started
                            ? 'bg-yellow-900 text-yellow-400'
                            : 'bg-zinc-700 text-zinc-500'
                        }`}>
                          {lp?.completed ? '✓' : lessonId}
                        </span>
                        <span className="text-zinc-300 text-sm truncate">
                          {lesson?.title}
                        </span>
                      </div>
                      {lp?.quizScore !== null && lp?.quizScore !== undefined && (
                        <span className={`text-xs ${lp.quizScore >= 80 ? 'text-green-400' : 'text-red-400'}`}>
                          {lp.quizScore}%
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      {progress?.lastAccessed && (
        <div className="bg-zinc-800 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-2">Last Activity</h3>
          <p className="text-zinc-400">
            {new Date(progress.lastAccessed).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
          {progress.currentLesson && (
            <Link
              href={`/stochastic/lesson/${progress.currentLesson}`}
              className="inline-block mt-4 text-blue-400 hover:text-blue-300"
            >
              Continue Lesson {progress.currentLesson} →
            </Link>
          )}
        </div>
      )}

      {/* Reset */}
      <div className="border-t border-zinc-800 pt-8">
        {!showResetConfirm ? (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="text-red-400 hover:text-red-300 text-sm"
          >
            Reset all progress
          </button>
        ) : (
          <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
            <p className="text-red-400 mb-4">
              Are you sure? This will delete all your progress, quiz scores, and notes.
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleReset}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Yes, reset everything
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
