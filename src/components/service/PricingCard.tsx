import { PricingTier } from '@/types';
import Button from '@/components/ui/Button';

export default function PricingCard({ tier }: { tier: PricingTier }) {
  return (
    <div
      className={`rounded-xl p-6 ${
        tier.highlighted
          ? 'bg-surface-1 border-2 border-neon-cyan/50 relative'
          : 'bg-surface-1 border border-border'
      }`}
    >
      {tier.highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 text-xs font-mono bg-neon-cyan text-surface rounded-full">
          Most Popular
        </span>
      )}
      <h3 className="text-xl font-semibold">{tier.name}</h3>
      <p className="text-sm text-muted mt-1">{tier.description}</p>
      <div className="mt-4">
        <span className="text-4xl font-bold">{tier.price}</span>
        {tier.price !== 'Custom' && <span className="text-muted">/mo</span>}
      </div>
      <ul className="mt-6 space-y-3">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm text-muted">
            <svg className="w-4 h-4 text-neon-cyan flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <Button variant={tier.highlighted ? 'primary' : 'ghost'} className="w-full">
          {tier.cta}
        </Button>
      </div>
    </div>
  );
}
