'use client';

interface RCQuestionsProps {
  questions: string[];
}

export default function RCQuestions({ questions }: RCQuestionsProps) {
  return (
    <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-6">
      <h4 className="text-zinc-400 font-semibold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
        <span>🏛️</span>
        Risk Committee Questions
      </h4>
      <p className="text-zinc-500 text-xs mb-3">
        Questions institutional investors typically ask about this concept:
      </p>
      <ul className="space-y-2">
        {questions.map((question, idx) => (
          <li key={idx} className="flex items-start gap-2 text-zinc-300">
            <span className="text-blue-400 mt-1">•</span>
            <span className="italic">&quot;{question}&quot;</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
