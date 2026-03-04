'use client';

import { useTypingAnimation } from '@/hooks/useTypingAnimation';
import AnimatedBackground from '@/components/shared/AnimatedBackground';
import Button from '@/components/ui/Button';

const TYPING_TEXTS = [
  '"Explain quantum computing" → BET:7f3a...c9d1',
  '"Write a sorting function" → SPT:a2e8...4f17',
  '"What is photosynthesis?" → LSH:d491...b3e2',
  '"ML vs deep learning" → GCG:3e7a...d1b5',
];

export default function HeroSection() {
  const typedText = useTypingAnimation(TYPING_TEXTS, 40, 25, 2500);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16">
      <AnimatedBackground />
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <div className="animate-fade-in">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight">
            Your Prompts,{' '}
            <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
              Hashed.
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-muted max-w-2xl mx-auto">
            An educational exploration of prompt compression, obfuscation, and
            semantic hashing for LLMs.
          </p>

          {/* Typing animation */}
          <div className="mt-8 inline-block bg-surface-1 border border-border rounded-lg px-6 py-3">
            <span className="font-mono text-sm text-neon-cyan">
              {typedText}
              <span className="inline-block w-0.5 h-4 bg-neon-cyan ml-1 animate-typing-cursor" />
            </span>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/demo" size="lg">
              Try the Demo
            </Button>
            <Button href="/how-it-works" variant="ghost" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
