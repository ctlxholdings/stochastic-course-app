'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { phases, lessons } from '@/lib/lessons/lessonData';
import { getProgress } from '@/lib/storage/progress';
import { useEffect, useState } from 'react';
import { UserProgress } from '@/types';

export default function Sidebar() {
  const pathname = usePathname();
  const [progress, setProgress] = useState<UserProgress | null>(null);

  // Only show sidebar on stochastic course pages
  const isStochasticPage = pathname.startsWith('/stochastic');

  useEffect(() => {
    setProgress(getProgress());
  }, [pathname]);

  if (!isStochasticPage) {
    return null;
  }

  const isLessonComplete = (lessonId: number) => {
    return progress?.lessonProgress[lessonId]?.completed ?? false;
  };

  const isLessonStarted = (lessonId: number) => {
    return progress?.lessonProgress[lessonId]?.started ?? false;
  };

  return (
    <aside className="w-64 bg-zinc-900 text-white h-screen overflow-y-auto fixed left-0 top-0 p-4">
      <Link href="/" className="block mb-2 text-zinc-500 text-xs hover:text-zinc-300">
        ← All Courses
      </Link>
      <Link href="/stochastic" className="block mb-6">
        <h1 className="text-xl font-bold">Stochastic Math</h1>
        <p className="text-zinc-400 text-sm">Solar Project Finance</p>
      </Link>

      <nav>
        {phases.map((phase) => (
          <div key={phase.id} className="mb-4">
            <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
              {phase.title}: {phase.subtitle}
            </h2>
            <ul className="space-y-1">
              {phase.lessons.map((lessonId) => {
                const lesson = lessons.find((l) => l.id === lessonId);
                if (!lesson) return null;

                const isActive = pathname === `/stochastic/lesson/${lessonId}`;
                const completed = isLessonComplete(lessonId);
                const started = isLessonStarted(lessonId);

                return (
                  <li key={lessonId}>
                    <Link
                      href={`/stochastic/lesson/${lessonId}`}
                      className={`flex items-center gap-2 px-3 py-2 rounded text-sm transition-colors ${
                        isActive
                          ? 'bg-blue-600 text-white'
                          : 'hover:bg-zinc-800 text-zinc-300'
                      }`}
                    >
                      <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-xs">
                        {completed ? (
                          <span className="text-green-400">&#10003;</span>
                        ) : started ? (
                          <span className="text-yellow-400">&#9679;</span>
                        ) : (
                          <span className="text-zinc-600">{lessonId}</span>
                        )}
                      </span>
                      <span className="truncate">{lesson.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="mt-6 pt-4 border-t border-zinc-800">
        <Link
          href="/stochastic/progress"
          className={`flex items-center gap-2 px-3 py-2 rounded text-sm transition-colors ${
            pathname === '/stochastic/progress'
              ? 'bg-blue-600 text-white'
              : 'hover:bg-zinc-800 text-zinc-300'
          }`}
        >
          <span>Progress Dashboard</span>
        </Link>
      </div>
    </aside>
  );
}
