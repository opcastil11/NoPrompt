import SectionHeading from '@/components/ui/SectionHeading';
import TechniqueCard from '@/components/how-it-works/TechniqueCard';
import ProcessDiagram from '@/components/how-it-works/ProcessDiagram';
import MetricsTable from '@/components/how-it-works/MetricsTable';
import { TECHNIQUES } from '@/lib/techniques';

export const metadata = {
  title: 'How It Works — NoPrompt',
  description: 'Explore 7 prompt hashing techniques with detailed process diagrams and metrics.',
};

export default function HowItWorksPage() {
  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          badge="7 Techniques"
          title="How Prompt Hashing Works"
          subtitle="Each technique offers different trade-offs between compression, fidelity, speed, and privacy."
        />

        {/* Process Overview */}
        <div className="mb-16 bg-surface-1 border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-2 text-center">General Pipeline</h3>
          <ProcessDiagram />
        </div>

        {/* Technique Cards */}
        <div className="space-y-6 mb-16">
          {TECHNIQUES.map((technique) => (
            <TechniqueCard key={technique.id} technique={technique} />
          ))}
        </div>

        {/* Comparison Table */}
        <div className="bg-surface-1 border border-border rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-6 text-center">Technique Comparison</h3>
          <MetricsTable />
        </div>
      </div>
    </div>
  );
}
