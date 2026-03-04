'use client';

import CopyButton from '@/components/ui/CopyButton';

interface HashOutputProps {
  hash: string;
  technique: string;
  tokens: number;
}

export default function HashOutput({ hash, technique, tokens }: HashOutputProps) {
  return (
    <div className="bg-surface-1 border border-border rounded-lg p-4 md:p-5 transition-all duration-200 hover:border-neon-cyan/20">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-mono text-neon-cyan uppercase tracking-wider">Compact Hash</span>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-muted">{technique.toUpperCase()}</span>
          <CopyButton text={hash} />
        </div>
      </div>
      <p className="font-mono text-base md:text-lg text-neon-cyan break-all" style={{ textShadow: '0 0 12px rgba(0,255,255,0.15)' }}>
        {hash}
      </p>
      <p className="text-xs text-muted mt-2">Compressed to {tokens} token{tokens !== 1 ? 's' : ''}</p>
    </div>
  );
}
