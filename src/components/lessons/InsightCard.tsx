'use client';

interface InsightCardProps {
  insight: string;
}

export default function InsightCard({ insight }: InsightCardProps) {
  return (
    <div className="bg-coral/5 border-l-4 border-coral rounded-r-lg p-6">
      <div className="flex items-start gap-3">
        <span className="text-2xl">💡</span>
        <div>
          <h4 className="text-coral font-semibold text-sm uppercase tracking-wider mb-2">
            Key Insight
          </h4>
          <p className="text-gray-800 text-lg font-medium leading-relaxed">
            {insight}
          </p>
        </div>
      </div>
    </div>
  );
}
