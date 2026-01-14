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
    <div className="min-h-screen bg-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
          <Link href="/stochastic" className="hover:text-coral">Course</Link>
          <span>/</span>
          <span className="text-gray-700">Progress</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Progress Dashboard</h1>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 text-center shadow-sm">
            <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-2">{completedLessons}</div>
            <div className="text-gray-500 text-sm">Completed</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 text-center shadow-sm">
            <div className="text-3xl sm:text-4xl font-bold text-amber-500 mb-2">{startedLessons}</div>
            <div className="text-gray-500 text-sm">In Progress</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 text-center shadow-sm">
            <div className="text-3xl sm:text-4xl font-bold text-gray-400 mb-2">{lessons.length - completedLessons - startedLessons}</div>
            <div className="text-gray-500 text-sm">Not Started</div>
          </div>
        </div>

        {/* Phase Progress */}
        <div className="space-y-6 mb-8">
          {phases.map((phase) => {
            const phaseProgress = progress ? getPhaseProgress(phase.lessons) : { completed: 0, total: phase.lessons.length, percentage: 0 };

            return (
              <div key={phase.id} className="bg-gray-50 border border-gray-200 rounded-xl p-4 sm:p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{phase.title}</h2>
                    <p className="text-gray-500 text-sm">{phase.subtitle}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-2xl font-bold ${phaseProgress.percentage === 100 ? 'text-green-600' : 'text-coral'}`}>
                      {phaseProgress.percentage}%
                    </span>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${
                      phaseProgress.percentage === 100 ? 'bg-green-500' : 'bg-coral'
                    }`}
                    style={{ width: `${phaseProgress.percentage}%` }}
                  />
                </div>

                {/* Lesson Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {phase.lessons.map((lessonId) => {
                    const lesson = lessons.find((l) => l.id === lessonId);
                    const lp = progress?.lessonProgress[lessonId];

                    return (
                      <Link
                        key={lessonId}
                        href={`/stochastic/lesson/${lessonId}`}
                        className="flex items-center justify-between p-3 bg-white border border-gray-200 hover:border-coral rounded-lg transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                            lp?.completed
                              ? 'bg-green-100 text-green-700'
                              : lp?.started
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-gray-100 text-gray-500'
                          }`}>
                            {lp?.completed ? '✓' : lessonId}
                          </span>
                          <span className="text-gray-700 text-sm truncate">
                            {lesson?.title}
                          </span>
                        </div>
                        {lp?.quizScore !== null && lp?.quizScore !== undefined && (
                          <span className={`text-xs font-medium ${lp.quizScore >= 80 ? 'text-green-600' : 'text-red-500'}`}>
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
          <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 mb-8 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Last Activity</h3>
            <p className="text-gray-500">
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
                className="inline-block mt-4 text-coral hover:text-coral-dark font-medium"
              >
                Continue Lesson {progress.currentLesson} →
              </Link>
            )}
          </div>
        )}

        {/* Reset */}
        <div className="border-t border-gray-200 pt-8">
          {!showResetConfirm ? (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="text-red-500 hover:text-red-600 text-sm"
            >
              Reset all progress
            </button>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700 mb-4">
                Are you sure? This will delete all your progress, quiz scores, and notes.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleReset}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                >
                  Yes, reset everything
                </button>
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg border border-gray-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
