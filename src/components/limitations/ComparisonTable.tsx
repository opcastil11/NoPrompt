import { TECHNIQUES } from '@/lib/techniques';

export default function ComparisonTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 text-xs font-mono text-muted uppercase">Technique</th>
            <th className="text-left py-3 px-4 text-xs font-mono text-muted uppercase">Privacy</th>
            <th className="text-left py-3 px-4 text-xs font-mono text-muted uppercase">Fidelity</th>
            <th className="text-left py-3 px-4 text-xs font-mono text-muted uppercase">Compute</th>
            <th className="text-left py-3 px-4 text-xs font-mono text-muted uppercase">Maturity</th>
          </tr>
        </thead>
        <tbody>
          {TECHNIQUES.map((t) => {
            const ratings: Record<string, { privacy: string; fidelity: string; compute: string; maturity: string }> = {
              bet: { privacy: 'High', fidelity: 'Very High', compute: 'Medium', maturity: 'Experimental' },
              'soft-prompts': { privacy: 'High', fidelity: 'Very High', compute: 'High', maturity: 'Established' },
              lsh: { privacy: 'Medium', fidelity: 'Medium', compute: 'Very Low', maturity: 'Established' },
              'gist-tokens': { privacy: 'High', fidelity: 'High', compute: 'Medium', maturity: 'Research' },
              adversarial: { privacy: 'Very High', fidelity: 'Medium', compute: 'Very High', maturity: 'Research' },
              'soft-prompt-optimization': { privacy: 'High', fidelity: 'Very High', compute: 'High', maturity: 'Research' },
              gcg: { privacy: 'Very High', fidelity: 'Medium', compute: 'Very High', maturity: 'Research' },
            };
            const r = ratings[t.id] || { privacy: '-', fidelity: '-', compute: '-', maturity: '-' };

            const colorFor = (val: string) => {
              if (val.includes('Very High')) return 'text-green-400';
              if (val === 'High' || val === 'Established') return 'text-neon-cyan';
              if (val === 'Medium' || val === 'Research') return 'text-yellow-400';
              if (val.includes('Very Low')) return 'text-green-400';
              if (val === 'Low' || val === 'Experimental') return 'text-red-400';
              return 'text-muted';
            };

            return (
              <tr key={t.id} className="border-b border-border/50 hover:bg-surface-2/30 transition-colors">
                <td className="py-3 px-4 font-medium">{t.shortName}</td>
                <td className={`py-3 px-4 font-mono text-xs ${colorFor(r.privacy)}`}>{r.privacy}</td>
                <td className={`py-3 px-4 font-mono text-xs ${colorFor(r.fidelity)}`}>{r.fidelity}</td>
                <td className={`py-3 px-4 font-mono text-xs ${colorFor(r.compute)}`}>{r.compute}</td>
                <td className={`py-3 px-4 font-mono text-xs ${colorFor(r.maturity)}`}>{r.maturity}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
