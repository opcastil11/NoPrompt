import SectionHeading from '@/components/ui/SectionHeading';
import LimitationCard from '@/components/limitations/LimitationCard';
import ComparisonTable from '@/components/limitations/ComparisonTable';
import FAQAccordion from '@/components/limitations/FAQAccordion';
import { LIMITATIONS } from '@/lib/constants';

export const metadata = {
  title: 'Limitations — NoPrompt',
  description: 'Known limitations and frequently asked questions about prompt hashing.',
};

export default function LimitationsPage() {
  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          badge="Honest Assessment"
          title="Limitations & Challenges"
          subtitle="Prompt hashing is an active research area with significant open problems."
        />

        {/* Limitation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {LIMITATIONS.map((limitation) => (
            <LimitationCard key={limitation.title} limitation={limitation} />
          ))}
        </div>

        {/* Comparison Table */}
        <div className="mb-16 bg-surface-1 border border-border rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-6 text-center">Technique Trade-offs</h3>
          <ComparisonTable />
        </div>

        {/* Ethical Considerations */}
        <div className="mb-16 bg-neon-purple/10 border border-neon-purple/20 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Ethical Considerations</h3>
          <div className="space-y-3 text-sm text-foreground/80">
            <p>
              Prompt hashing techniques, particularly adversarial methods (GCG), were originally studied
              in the context of AI safety and alignment. While we explore these techniques for privacy-preserving
              applications, we acknowledge their dual-use nature.
            </p>
            <p>
              Researchers and practitioners should consider the potential for misuse when developing
              prompt obfuscation tools. Transparency about limitations and honest framing of capabilities
              is essential.
            </p>
            <p>
              This project is explicitly educational — we present techniques as they exist in the
              literature, with clear attribution, and do not provide production-ready attack tools.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h3 className="text-2xl font-semibold mb-6 text-center">Frequently Asked Questions</h3>
          <FAQAccordion />
        </div>
      </div>
    </div>
  );
}
