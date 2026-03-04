'use client';

import { useState } from 'react';
import { Technique } from '@/types';
import Badge from '@/components/ui/Badge';
import Link from 'next/link';

export default function TechniqueCard({ technique }: { technique: Technique }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-surface-1 border border-border rounded-xl overflow-hidden hover:border-neon-cyan/30 transition-colors">
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <Badge variant="cyan">{technique.shortName}</Badge>
            <h3 className="text-xl font-semibold mt-2">{technique.name}</h3>
          </div>
        </div>
        <p className="text-sm text-muted mb-4">{technique.description}</p>

        {/* Process Steps */}
        <div className="mb-4">
          <h4 className="text-xs font-mono text-neon-cyan mb-2 uppercase tracking-wider">Process</h4>
          <div className="space-y-2">
            {technique.steps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-surface-2 border border-border flex items-center justify-center text-xs font-mono text-muted">
                  {idx + 1}
                </span>
                <p className="text-sm text-foreground/80">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm text-neon-cyan hover:underline cursor-pointer"
        >
          {expanded ? 'Show less' : 'Show details'}
        </button>

        {expanded && (
          <div className="mt-4 space-y-4 animate-fade-in">
            {/* Applicability */}
            <div className="bg-surface-2/50 border border-border rounded-lg p-4">
              <h4 className="text-xs font-mono text-neon-purple mb-1 uppercase tracking-wider">Applicability</h4>
              <p className="text-sm text-muted">{technique.applicability}</p>
            </div>

            {/* Pros & Cons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-xs font-mono text-green-400 mb-2 uppercase tracking-wider">Pros</h4>
                <ul className="space-y-1">
                  {technique.pros.map((pro, i) => (
                    <li key={i} className="text-sm text-muted flex items-start gap-2">
                      <span className="text-green-400 mt-1">+</span> {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-mono text-red-400 mb-2 uppercase tracking-wider">Cons</h4>
                <ul className="space-y-1">
                  {technique.cons.map((con, i) => (
                    <li key={i} className="text-sm text-muted flex items-start gap-2">
                      <span className="text-red-400 mt-1">-</span> {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(technique.metrics).map(([key, value]) => (
                <div key={key} className="bg-surface-2 rounded-lg p-3 text-center">
                  <p className="text-xs text-muted capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                  <p className="text-sm font-mono text-neon-cyan mt-1">{value}</p>
                </div>
              ))}
            </div>

            {/* Paper References */}
            {technique.paperRefs.length > 0 && (
              <div>
                <h4 className="text-xs font-mono text-muted mb-1 uppercase tracking-wider">Related Papers</h4>
                <div className="flex flex-wrap gap-1">
                  {technique.paperRefs.map((ref) => (
                    <Link
                      key={ref}
                      href="/papers"
                      className="text-xs font-mono text-neon-purple hover:text-neon-purple/80 bg-neon-purple/10 rounded px-2 py-0.5"
                    >
                      [{ref}]
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
