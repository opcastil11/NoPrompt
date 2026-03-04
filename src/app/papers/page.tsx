'use client';

import { useState, useMemo } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import PaperCard from '@/components/papers/PaperCard';
import PaperFilters from '@/components/papers/PaperFilters';
import { PAPERS } from '@/lib/papers-data';

export default function PapersPage() {
  const [category, setCategory] = useState('All');

  const filtered = useMemo(() => {
    if (category === 'All') return PAPERS;
    return PAPERS.filter((p) => p.category === category);
  }, [category]);

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          badge={`${PAPERS.length} Papers`}
          title="Research Papers"
          subtitle="The academic foundation behind prompt hashing — spanning compression, soft prompts, adversarial optimization, and more."
        />

        <PaperFilters active={category} onChange={setCategory} />

        <p className="text-sm text-muted text-center mb-6">
          Showing {filtered.length} of {PAPERS.length} papers
          {category !== 'All' && ` in "${category}"`}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((paper) => (
            <PaperCard key={paper.id} paper={paper} />
          ))}
        </div>
      </div>
    </div>
  );
}
