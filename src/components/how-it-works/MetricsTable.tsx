import { TECHNIQUES } from '@/lib/techniques';
import Badge from '@/components/ui/Badge';

function ratingColor(value: string): 'green' | 'yellow' | 'red' | 'cyan' {
  const lower = value.toLowerCase();
  if (lower.includes('very fast') || lower.includes('very low') || lower.includes('98') || lower.includes('96') || lower.includes('1000')) return 'green';
  if (lower.includes('fast') || lower.includes('low') || lower.includes('90') || lower.includes('26:')) return 'cyan';
  if (lower.includes('medium') || lower.includes('85') || lower.includes('variable')) return 'yellow';
  return 'red';
}

export default function MetricsTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 text-xs font-mono text-muted uppercase tracking-wider">Technique</th>
            <th className="text-left py-3 px-4 text-xs font-mono text-muted uppercase tracking-wider">Compression</th>
            <th className="text-left py-3 px-4 text-xs font-mono text-muted uppercase tracking-wider">Fidelity</th>
            <th className="text-left py-3 px-4 text-xs font-mono text-muted uppercase tracking-wider">Speed</th>
            <th className="text-left py-3 px-4 text-xs font-mono text-muted uppercase tracking-wider">Reversibility</th>
          </tr>
        </thead>
        <tbody>
          {TECHNIQUES.map((t) => (
            <tr key={t.id} className="border-b border-border/50 hover:bg-surface-2/30 transition-colors">
              <td className="py-3 px-4 font-medium">{t.shortName}</td>
              <td className="py-3 px-4"><Badge variant={ratingColor(t.metrics.compressionRatio)}>{t.metrics.compressionRatio}</Badge></td>
              <td className="py-3 px-4"><Badge variant={ratingColor(t.metrics.fidelity)}>{t.metrics.fidelity}</Badge></td>
              <td className="py-3 px-4"><Badge variant={ratingColor(t.metrics.speed)}>{t.metrics.speed}</Badge></td>
              <td className="py-3 px-4"><Badge variant={ratingColor(t.metrics.reversibility)}>{t.metrics.reversibility}</Badge></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
