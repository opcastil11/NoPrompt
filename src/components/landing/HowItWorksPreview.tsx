'use client';

import SectionHeading from '@/components/ui/SectionHeading';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const STEPS = [
  {
    number: '01',
    title: 'Input Prompt',
    description: 'Natural language prompt is received',
    icon: '📝',
  },
  {
    number: '02',
    title: 'Hash Transform',
    description: 'Compressed into a compact hash representation',
    icon: '🔄',
  },
  {
    number: '03',
    title: 'Equivalent Output',
    description: 'LLM produces semantically equivalent response',
    icon: '✨',
  },
];

export default function HowItWorksPreview() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section ref={ref} className="py-24 px-4 bg-surface-1/50">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          badge="Process"
          title="How Prompt Hashing Works"
          subtitle="A simplified view of the prompt-to-hash-to-output pipeline."
        />
        <div
          className={`flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {STEPS.map((step, idx) => (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center text-center w-48">
                <div className="w-20 h-20 rounded-2xl bg-surface-2 border border-border flex items-center justify-center text-3xl mb-3">
                  {step.icon}
                </div>
                <span className="text-xs font-mono text-neon-cyan mb-1">
                  {step.number}
                </span>
                <h3 className="font-semibold text-sm">{step.title}</h3>
                <p className="text-xs text-muted mt-1">{step.description}</p>
              </div>
              {idx < STEPS.length - 1 && (
                <div className="hidden md:block w-16 border-t border-dashed border-border mx-2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
