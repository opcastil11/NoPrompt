'use client';

interface HashingAnimationProps {
  currentFrame: string;
  isAnimating: boolean;
}

export default function HashingAnimation({ currentFrame, isAnimating }: HashingAnimationProps) {
  if (!currentFrame) return null;

  return (
    <div className="my-6 bg-surface border border-border rounded-lg p-4 overflow-hidden">
      <p className="text-xs font-mono text-muted mb-2 uppercase tracking-wider">
        {isAnimating ? 'Generating hash...' : 'Hash generated'}
      </p>
      <div className="font-mono text-sm break-all">
        {currentFrame.split('').map((char, idx) => (
          <span
            key={idx}
            className={`inline-block transition-colors duration-100 ${
              isAnimating ? 'text-neon-cyan/60' : 'text-neon-cyan'
            }`}
          >
            {char}
          </span>
        ))}
      </div>
      {isAnimating && (
        <div className="mt-2 h-1 bg-surface-2 rounded-full overflow-hidden">
          <div className="h-full bg-neon-cyan/50 rounded-full animate-pulse-glow" style={{ width: '60%' }} />
        </div>
      )}
    </div>
  );
}
