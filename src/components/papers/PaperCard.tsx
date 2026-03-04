import { Paper } from '@/types';
import Badge from '@/components/ui/Badge';

const categoryVariant: Record<string, 'cyan' | 'purple' | 'green' | 'yellow' | 'red' | 'default'> = {
  'Prompt Compression': 'cyan',
  'Soft Prompts': 'purple',
  'Gist Tokens': 'green',
  AutoCompressor: 'yellow',
  Adversarial: 'red',
  GCG: 'red',
  LSH: 'cyan',
  'PEFT/LoRA': 'purple',
  Obfuscation: 'yellow',
  Surveys: 'default',
  BET: 'green',
};

export default function PaperCard({ paper }: { paper: Paper }) {
  return (
    <div className="bg-surface-1 border border-border rounded-lg p-4 hover:border-neon-cyan/20 transition-colors">
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="text-sm font-semibold leading-snug">{paper.title}</h3>
        <span className="text-xs font-mono text-muted flex-shrink-0">#{paper.id}</span>
      </div>
      <p className="text-xs text-muted mb-2">{paper.authors} &middot; {paper.year}</p>
      <p className="text-sm text-foreground/70 mb-3">{paper.description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant={categoryVariant[paper.category] || 'default'}>{paper.category}</Badge>
          <Badge variant="default">{paper.venue}</Badge>
        </div>
        <a
          href={paper.arxivUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-neon-cyan hover:underline"
        >
          Paper &rarr;
        </a>
      </div>
    </div>
  );
}
