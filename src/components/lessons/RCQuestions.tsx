'use client';

interface RCQuestionsProps {
  questions: string[];
}

export default function RCQuestions({ questions }: RCQuestionsProps) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
      <h4 className="text-gray-500 font-semibold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
        <span>🏛️</span>
        Risk Committee Questions
      </h4>
      <p className="text-gray-500 text-xs mb-3">
        Questions institutional investors typically ask about this concept:
      </p>
      <ul className="space-y-2">
        {questions.map((question, idx) => (
          <li key={idx} className="flex items-start gap-2 text-gray-700">
            <span className="text-coral mt-1">•</span>
            <span className="italic">&quot;{question}&quot;</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
