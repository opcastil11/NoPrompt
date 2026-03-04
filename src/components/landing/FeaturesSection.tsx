'use client';

import { FEATURES } from '@/lib/constants';
import Card from '@/components/ui/Card';
import SectionHeading from '@/components/ui/SectionHeading';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export default function FeaturesSection() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section ref={ref} className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          badge="Research Areas"
          title="Exploring Prompt Privacy"
          subtitle="Four key dimensions of our prompt hashing research."
        />
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {FEATURES.map((feature) => (
            <Card key={feature.title}>
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
