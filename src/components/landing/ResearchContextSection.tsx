import Link from 'next/link';
import Badge from '@/components/ui/Badge';

const VENUES = ['NeurIPS', 'EMNLP', 'ACL', 'ICLR', 'NAACL'];

export default function ResearchContextSection() {
  return (
    <section className="py-24 px-4 bg-surface-1/50">
      <div className="max-w-4xl mx-auto text-center">
        <span className="inline-block px-3 py-1 text-xs font-mono text-neon-purple bg-neon-purple/10 border border-neon-purple/20 rounded-full mb-4">
          Academic Foundation
        </span>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Built on Research
        </h2>
        <p className="mt-4 text-muted text-lg max-w-2xl mx-auto">
          This project synthesizes insights from 52 research papers spanning prompt
          compression, soft prompts, adversarial optimization, semantic hashing, and
          parameter-efficient fine-tuning.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {VENUES.map((venue) => (
            <Badge key={venue} variant="purple">
              {venue}
            </Badge>
          ))}
          <Badge variant="default">+ more</Badge>
        </div>

        <div className="mt-8">
          <Link
            href="/papers"
            className="text-sm text-neon-cyan hover:underline"
          >
            Browse all 52 papers &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
