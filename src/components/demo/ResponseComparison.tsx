'use client';

interface ResponseComparisonProps {
  original: string;
  hashed: string;
}

export default function ResponseComparison({ original, hashed }: ResponseComparisonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-surface border border-border rounded-lg p-4">
        <h4 className="text-xs font-mono text-muted mb-2 uppercase tracking-wider">Original Prompt Response</h4>
        <div className="text-sm text-foreground/80 whitespace-pre-wrap">{original}</div>
      </div>
      <div className="bg-surface border border-neon-cyan/20 rounded-lg p-4">
        <h4 className="text-xs font-mono text-neon-cyan mb-2 uppercase tracking-wider">Hashed Prompt Response</h4>
        <div className="text-sm text-foreground/80 whitespace-pre-wrap">{hashed}</div>
      </div>
    </div>
  );
}
