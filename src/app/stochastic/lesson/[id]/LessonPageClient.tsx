'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getLesson, getPhaseForLesson, getNextLesson, getPreviousLesson } from '@/lib/lessons/lessonData';
import { markLessonStarted, markSimulationCompleted, saveQuizScore, getLessonProgress, saveLessonNotes } from '@/lib/storage/progress';
import { Lesson, LessonProgress } from '@/types';
import SimulationPanel from '@/components/simulations/SimulationPanel';
import QuizContainer from '@/components/quiz/QuizContainer';
import InsightCard from '@/components/lessons/InsightCard';
import RCQuestions from '@/components/lessons/RCQuestions';

export default function LessonPageClient() {
  const params = useParams();
  const lessonId = parseInt(params.id as string);

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [progress, setProgress] = useState<LessonProgress | null>(null);
  const [activeTab, setActiveTab] = useState<'learn' | 'simulate' | 'quiz'>('learn');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const lessonData = getLesson(lessonId);
    if (lessonData) {
      setLesson(lessonData);
      markLessonStarted(lessonId);
      const lessonProgress = getLessonProgress(lessonId);
      setProgress(lessonProgress);
      setNotes(lessonProgress.notes || '');
    }
  }, [lessonId]);

  if (!lesson) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl text-gray-900">Lesson not found</h1>
        <Link href="/" className="text-coral hover:underline mt-4 block">
          Return to dashboard
        </Link>
      </div>
    );
  }

  const phase = getPhaseForLesson(lessonId);
  const nextLesson = getNextLesson(lessonId);
  const prevLesson = getPreviousLesson(lessonId);

  const handleSimulationComplete = () => {
    markSimulationCompleted(lessonId);
    setProgress(prev => prev ? { ...prev, simulationCompleted: true } : null);
  };

  const handleQuizComplete = (score: number) => {
    saveQuizScore(lessonId, score, lesson.quiz.passingScore);
    setProgress(getLessonProgress(lessonId));
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
    saveLessonNotes(lessonId, e.target.value);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-8 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Link href="/stochastic" className="hover:text-coral">Course</Link>
            <span>/</span>
            <span>{phase?.title}</span>
            <span>/</span>
            <span className="text-gray-700">Lesson {lessonId}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Lesson {lessonId}: {lesson.title}
          </h1>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            {progress?.completed && (
              <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
                Completed
              </span>
            )}
            {progress?.simulationCompleted && !progress?.completed && (
              <span className="bg-coral/10 text-coral text-sm px-3 py-1 rounded-full">
                Simulation done
              </span>
            )}
            {progress?.quizScore !== null && progress?.quizScore !== undefined && (
              <span className="text-gray-500 text-sm">
                Quiz: {progress.quizScore}% ({progress.quizAttempts} attempt{progress.quizAttempts !== 1 ? 's' : ''})
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-1">
            {(['learn', 'simulate', 'quiz'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 sm:px-6 py-3 font-medium text-sm transition-colors relative ${
                  activeTab === tab
                    ? 'text-coral'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab === 'learn' && 'Learn'}
                {tab === 'simulate' && 'Simulate'}
                {tab === 'quiz' && 'Quiz'}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-coral" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-8">
        <div className="max-w-4xl mx-auto">
          {activeTab === 'learn' && (
            <div className="space-y-8">
              {/* Concept */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Concept</h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {lesson.concept}
                </p>
              </section>

              {/* Context */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Real-World Context</h2>
                <p className="text-gray-600 leading-relaxed">
                  {lesson.context}
                </p>
              </section>

              {/* Key Insight */}
              <InsightCard insight={lesson.keyInsight} />

              {/* RC Questions */}
              <RCQuestions questions={lesson.rcQuestions} />

              {/* Notes */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Notes</h2>
                <textarea
                  value={notes}
                  onChange={handleNotesChange}
                  placeholder="Write your notes here... They'll be saved automatically."
                  className="w-full h-32 bg-gray-50 text-gray-700 border border-gray-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral resize-none"
                />
              </section>
            </div>
          )}

          {activeTab === 'simulate' && (
            <SimulationPanel lesson={lesson} onComplete={handleSimulationComplete} />
          )}

          {activeTab === 'quiz' && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Test Your Understanding</h2>
                <p className="text-gray-600">
                  Pass with {lesson.quiz.passingScore}% to complete this lesson.
                </p>
              </div>
              <QuizContainer quiz={lesson.quiz} onComplete={handleQuizComplete} />
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
            {prevLesson ? (
              <Link
                href={`/stochastic/lesson/${prevLesson}`}
                className="flex items-center gap-2 text-gray-500 hover:text-coral transition-colors"
              >
                <span>←</span>
                <span>Previous</span>
              </Link>
            ) : (
              <div />
            )}

            {nextLesson ? (
              <Link
                href={`/stochastic/lesson/${nextLesson}`}
                className={`flex items-center gap-2 transition-colors ${
                  progress?.completed
                    ? 'text-coral hover:text-coral-dark'
                    : 'text-gray-400'
                }`}
              >
                <span>Next</span>
                <span>→</span>
              </Link>
            ) : (
              <Link
                href="/stochastic"
                className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
              >
                <span>Complete Course</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
