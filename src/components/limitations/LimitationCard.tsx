import { Limitation } from '@/types';
import Badge from '@/components/ui/Badge';

const severityVariant = {
  high: 'red' as const,
  medium: 'yellow' as const,
  low: 'green' as const,
};

export default function LimitationCard({ limitation }: { limitation: Limitation }) {
  return (
    <div className="bg-surface-1 border border-border rounded-xl p-6 hover:border-border/80 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold">{limitation.title}</h3>
        <Badge variant={severityVariant[limitation.severity]}>
          {limitation.severity}
        </Badge>
      </div>
      <p className="text-sm text-muted mb-3">{limitation.description}</p>
      <p className="text-sm text-foreground/70">{limitation.details}</p>
    </div>
  );
}
