'use client';

import { useState, useCallback } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import PromptInput from '@/components/demo/PromptInput';
import HashingAnimation from '@/components/demo/HashingAnimation';
import HashOutput from '@/components/demo/HashOutput';
import ResponseComparison from '@/components/demo/ResponseComparison';
import MetricsDisplay from '@/components/demo/MetricsDisplay';
import ObfuscationPanel from '@/components/demo/ObfuscationPanel';
import PeftSimulation from '@/components/demo/PeftSimulation';
import RealHashPanel from '@/components/demo/RealHashPanel';
import LSHDemo from '@/components/demo/LSHDemo';
import { useHashAnimation } from '@/hooks/useHashAnimation';
import { findBestMatch } from '@/lib/demo-data';
import { generateHash } from '@/lib/hash-utils';
import { TECHNIQUES } from '@/lib/techniques';

const TABS = [
  { id: 'real-hash', label: 'Real SHA-256' },
  { id: 'lsh', label: 'Real LSH' },
  { id: 'obfuscation', label: 'Real Obfuscation' },
  { id: 'hash', label: 'Hash Simulation' },
  { id: 'peft', label: 'PEFT/LoRA Simulator' },
];

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState('real-hash');
  const [prompt, setPrompt] = useState('');
  const [technique, setTechnique] = useState('bet');
  const [result, setResult] = useState<{
    hash: string;
    originalResponse: string;
    hashedResponse: string;
    similarity: number;
    tokens: number;
  } | null>(null);

  const { isAnimating, currentFrame, animate } = useHashAnimation(2000);

  const handleGenerate = useCallback(() => {
    if (!prompt.trim() || isAnimating) return;

    const match = findBestMatch(prompt);
    const cleanup = animate(prompt, technique);

    const techniqueData = match?.responses[technique];
    const hash = techniqueData?.hash || generateHash(prompt, technique);

    setTimeout(() => {
      setResult({
        hash,
        originalResponse: techniqueData?.response || match?.responses.bet?.response || 'No pre-built response available for this prompt. Try one of the quick prompts for a full demonstration.',
        hashedResponse: techniqueData?.response || 'Simulated response based on hash lookup. The actual response would depend on the model and technique configuration.',
        similarity: techniqueData?.similarity || 0.85,
        tokens: techniqueData?.tokens || 8,
      });
    }, 2100);

    return cleanup;
  }, [prompt, technique, isAnimating, animate]);

  const techniqueName = TECHNIQUES.find((t) => t.id === technique)?.shortName || technique;

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          badge="Interactive"
          title="Prompt Hashing Demo"
          subtitle="Real hashing algorithms, real obfuscation, real LSH — all running in your browser."
        />

        {/* Tabs */}
        <div className="flex overflow-x-auto border-b border-border mb-8 -mx-4 px-4">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 md:px-6 py-3 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-neon-cyan border-b-2 border-neon-cyan'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab: Real SHA-256 */}
        {activeTab === 'real-hash' && <RealHashPanel />}

        {/* Tab: Real LSH */}
        {activeTab === 'lsh' && <LSHDemo />}

        {/* Tab: Real Obfuscation */}
        {activeTab === 'obfuscation' && <ObfuscationPanel />}

        {/* Tab: Hash Simulation */}
        {activeTab === 'hash' && (
          <div className="space-y-6">
            <PromptInput
              prompt={prompt}
              setPrompt={setPrompt}
              technique={technique}
              setTechnique={setTechnique}
              onGenerate={handleGenerate}
              isAnimating={isAnimating}
            />

            <HashingAnimation currentFrame={currentFrame} isAnimating={isAnimating} />

            {result && !isAnimating && (
              <div className="space-y-6 animate-fade-in">
                <HashOutput hash={result.hash} technique={techniqueName} tokens={result.tokens} />
                <ResponseComparison original={result.originalResponse} hashed={result.hashedResponse} />
                <MetricsDisplay similarity={result.similarity} tokens={result.tokens} technique={techniqueName} />
              </div>
            )}
          </div>
        )}

        {/* Tab: PEFT/LoRA Simulator */}
        {activeTab === 'peft' && <PeftSimulation />}
      </div>
    </div>
  );
}
