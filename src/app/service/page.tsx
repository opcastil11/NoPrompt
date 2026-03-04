import SectionHeading from '@/components/ui/SectionHeading';
import PricingCard from '@/components/service/PricingCard';
import IntegrationExample from '@/components/service/IntegrationExample';
import ModelsList from '@/components/service/ModelsList';
import Badge from '@/components/ui/Badge';
import { PRICING_TIERS } from '@/lib/constants';

export const metadata = {
  title: 'Service — NoPrompt',
  description: 'Conceptual service architecture for prompt hashing.',
};

export default function ServicePage() {
  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          badge="Conceptual"
          title="Service Architecture"
          subtitle="What a production prompt hashing service could look like. This is an illustrative design, not a live product."
        />

        {/* Conceptual Notice */}
        <div className="bg-neon-purple/10 border border-neon-purple/20 rounded-lg px-6 py-4 mb-12 max-w-3xl mx-auto text-center">
          <p className="text-sm text-foreground">
            <strong className="text-neon-purple">Conceptual Architecture.</strong> The API endpoints,
            SDK, and pricing below illustrate what a production version could look like. None of these
            are real services.
          </p>
        </div>

        {/* API Overview */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-6 text-center">REST API Design</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { method: 'POST', endpoint: '/v1/hash', desc: 'Generate hash from prompt' },
              { method: 'POST', endpoint: '/v1/infer', desc: 'Run inference with hash' },
              { method: 'GET', endpoint: '/v1/techniques', desc: 'List available techniques' },
            ].map((api) => (
              <div key={api.endpoint} className="bg-surface-1 border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="cyan">{api.method}</Badge>
                  <code className="text-sm font-mono text-foreground">{api.endpoint}</code>
                </div>
                <p className="text-sm text-muted">{api.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Integration Examples */}
        <div className="mb-16 max-w-3xl mx-auto">
          <h3 className="text-2xl font-semibold mb-6 text-center">Integration Examples</h3>
          <IntegrationExample />
        </div>

        {/* Supported Models */}
        <div className="mb-16 max-w-3xl mx-auto">
          <h3 className="text-2xl font-semibold mb-6 text-center">Supported Models</h3>
          <ModelsList />
        </div>

        {/* Pricing */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-2 text-center">Illustrative Pricing</h3>
          <p className="text-sm text-muted text-center mb-8">These tiers are illustrative examples, not actual pricing.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {PRICING_TIERS.map((tier) => (
              <PricingCard key={tier.name} tier={tier} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
