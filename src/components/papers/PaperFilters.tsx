'use client';

import { PAPER_CATEGORIES } from '@/lib/papers-data';

interface PaperFiltersProps {
  active: string;
  onChange: (category: string) => void;
}

export default function PaperFilters({ active, onChange }: PaperFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8">
      {PAPER_CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-4 py-2 text-sm rounded-lg border transition-colors cursor-pointer ${
            active === cat
              ? 'border-neon-cyan/50 bg-neon-cyan/10 text-neon-cyan'
              : 'border-border text-muted hover:text-foreground hover:border-border/80'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
