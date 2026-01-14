'use client';

interface InsightCardProps {
  insight: string;
}

export default function InsightCard({ insight }: InsightCardProps) {
  return (
    <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border border-yellow-600/50 rounded-lg p-6">
      <div className="flex items-start gap-3">
        <span className="text-2xl">💡</span>
        <div>
          <h4 className="text-yellow-400 font-semibold text-sm uppercase tracking-wider mb-2">
            Key Insight
          </h4>
          <p className="text-yellow-100 text-lg font-medium leading-relaxed">
            {insight}
          </p>
        </div>
      </div>
    </div>
  );
}
