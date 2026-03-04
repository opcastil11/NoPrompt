'use client';

interface MetricsDisplayProps {
  similarity: number;
  tokens: number;
  technique: string;
}

export default function MetricsDisplay({ similarity, tokens, technique }: MetricsDisplayProps) {
  const simPercent = Math.round(similarity * 100);
  const simColor = simPercent >= 90 ? 'text-green-400' : simPercent >= 80 ? 'text-yellow-400' : 'text-red-400';
  const barColor = simPercent >= 90 ? 'bg-green-400' : simPercent >= 80 ? 'bg-yellow-400' : 'bg-red-400';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
      <div className="bg-surface-1 border border-border rounded-lg p-4 text-center transition-all duration-200 hover:border-border/80 hover:bg-surface-2/50">
        <p className="text-xs text-muted mb-1">Similarity</p>
        <p className={`text-2xl font-mono font-bold ${simColor}`}>{simPercent}%</p>
        <div className="mt-2 h-1.5 bg-surface-2 rounded-full overflow-hidden">
          <div className={`h-full ${barColor} rounded-full transition-all duration-500`} style={{ width: `${simPercent}%` }} />
        </div>
      </div>
      <div className="bg-surface-1 border border-border rounded-lg p-4 text-center transition-all duration-200 hover:border-border/80 hover:bg-surface-2/50">
        <p className="text-xs text-muted mb-1">Hash Tokens</p>
        <p className="text-2xl font-mono font-bold text-neon-cyan">{tokens}</p>
      </div>
      <div className="bg-surface-1 border border-border rounded-lg p-4 text-center transition-all duration-200 hover:border-border/80 hover:bg-surface-2/50">
        <p className="text-xs text-muted mb-1">Technique</p>
        <p className="text-lg font-mono font-bold text-neon-purple">{technique}</p>
      </div>
    </div>
  );
}
