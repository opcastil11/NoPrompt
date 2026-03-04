'use client';

import { useEffect, useState } from 'react';

interface HashingAnimationProps {
  currentFrame: string;
  isAnimating: boolean;
}

export default function HashingAnimation({ currentFrame, isAnimating }: HashingAnimationProps) {
  const [progress, setProgress] = useState(0);
  const [revealCount, setRevealCount] = useState(0);

  useEffect(() => {
    if (!isAnimating) {
      setProgress(100);
      setRevealCount(currentFrame.length);
      return;
    }

    setProgress(0);
    setRevealCount(0);

    const startTime = Date.now();
    const duration = 2000;

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);
      setRevealCount(Math.floor((pct / 100) * currentFrame.length));
      if (pct < 100) requestAnimationFrame(tick);
    };

    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isAnimating, currentFrame.length]);

  if (!currentFrame) return null;

  return (
    <div className="my-6 bg-surface border border-border rounded-lg p-4 md:p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-mono text-muted uppercase tracking-wider">
          {isAnimating ? 'Generating hash...' : 'Hash generated'}
        </p>
        {isAnimating && (
          <span className="text-xs font-mono text-neon-cyan/70 tabular-nums">
            {Math.round(progress)}%
          </span>
        )}
      </div>

      <div className="font-mono text-sm md:text-base break-all leading-relaxed">
        {currentFrame.split('').map((char, idx) => {
          const isRevealed = !isAnimating || idx < revealCount;
          return (
            <span
              key={idx}
              className={`inline-block transition-all duration-150 ${
                isRevealed
                  ? 'text-neon-cyan'
                  : 'text-neon-cyan/30'
              }`}
              style={{
                transform: isRevealed ? 'translateY(0)' : 'translateY(2px)',
                textShadow: isRevealed && !isAnimating ? '0 0 8px rgba(0,255,255,0.3)' : 'none',
              }}
            >
              {char}
            </span>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="mt-3 h-1 bg-surface-2 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-neon-cyan/70 to-neon-cyan rounded-full transition-none"
          style={{
            width: `${isAnimating ? progress : 100}%`,
            boxShadow: isAnimating ? '0 0 12px rgba(0,255,255,0.4)' : 'none',
          }}
        />
      </div>
    </div>
  );
}
