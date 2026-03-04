import Button from '@/components/ui/Button';

export default function CTASection() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Explore the{' '}
          <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
            Research
          </span>
        </h2>
        <p className="mt-4 text-muted text-lg">
          Try the interactive demo with real obfuscation algorithms, explore 7
          hashing techniques, and dive into 52 referenced research papers.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/demo" size="lg">
            Interactive Demo
          </Button>
          <Button href="/papers" variant="secondary" size="lg">
            View Papers
          </Button>
        </div>
      </div>
    </section>
  );
}
