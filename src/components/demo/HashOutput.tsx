'use client';

interface HashOutputProps {
  hash: string;
  technique: string;
  tokens: number;
}

export default function HashOutput({ hash, technique, tokens }: HashOutputProps) {
  return (
    <div className="bg-surface-1 border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-mono text-neon-cyan uppercase tracking-wider">Compact Hash</span>
        <span className="text-xs font-mono text-muted">{technique.toUpperCase()}</span>
      </div>
      <p className="font-mono text-lg text-neon-cyan">{hash}</p>
      <p className="text-xs text-muted mt-2">Compressed to {tokens} token{tokens !== 1 ? 's' : ''}</p>
    </div>
  );
}
