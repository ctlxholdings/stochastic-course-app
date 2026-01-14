import { lessons } from '@/lib/lessons/lessonData';
import LessonPageClient from './LessonPageClient';

export function generateStaticParams() {
  return lessons.map((lesson) => ({
    id: String(lesson.id),
  }));
}

export default function LessonPage() {
  return <LessonPageClient />;
}
