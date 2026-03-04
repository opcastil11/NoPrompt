'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
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
  { id: 'real-hash', label: 'Real SHA-256', shortLabel: 'SHA-256', icon: '#' },
  { id: 'lsh', label: 'Real LSH', shortLabel: 'LSH', icon: '~' },
  { id: 'obfuscation', label: 'Real Obfuscation', shortLabel: 'Obfuscation', icon: '*' },
  { id: 'hash', label: 'Hash Simulation', shortLabel: 'Hash Sim', icon: '>' },
  { id: 'peft', label: 'PEFT/LoRA Simulator', shortLabel: 'PEFT/LoRA', icon: '⊗' },
];

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState('real-hash');
  const [tabKey, setTabKey] = useState(0);
  const [prompt, setPrompt] = useState('');
  const [technique, setTechnique] = useState('bet');
  const [result, setResult] = useState<{
    hash: string;
    originalResponse: string;
    hashedResponse: string;
    similarity: number;
    tokens: number;
  } | null>(null);

  const indicatorRef = useRef<HTMLDivElement>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  const { isAnimating, currentFrame, animate } = useHashAnimation(2000);

  // Animate the tab indicator underline
  useEffect(() => {
    const container = tabsContainerRef.current;
    const indicator = indicatorRef.current;
    if (!container || !indicator) return;
    const activeBtn = container.querySelector(`[data-tab="${activeTab}"]`) as HTMLElement;
    if (!activeBtn) return;
    indicator.style.width = `${activeBtn.offsetWidth}px`;
    indicator.style.left = `${activeBtn.offsetLeft - container.scrollLeft}px`;
  }, [activeTab]);

  const handleTabChange = (tabId: string) => {
    if (tabId === activeTab) return;
    setActiveTab(tabId);
    setTabKey((k) => k + 1);
  };

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
        <div className="relative mb-8">
          <div
            ref={tabsContainerRef}
            className="flex overflow-x-auto -mx-4 px-4"
            style={{ scrollbarWidth: 'none' }}
          >
            {TABS.map((tab) => (
              <button
                key={tab.id}
                data-tab={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`group relative px-3 sm:px-4 md:px-6 py-3 text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-neon-cyan'
                    : 'text-muted hover:text-foreground'
                }`}
              >
                <span className="inline-flex items-center gap-1.5">
                  <span className={`font-mono text-xs transition-opacity duration-200 ${
                    activeTab === tab.id ? 'opacity-100' : 'opacity-40 group-hover:opacity-70'
                  }`}>
                    {tab.icon}
                  </span>
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.shortLabel}</span>
                </span>
              </button>
            ))}
          </div>
          {/* Animated underline indicator */}
          <div className="relative h-px bg-border">
            <div
              ref={indicatorRef}
              className="absolute bottom-0 h-0.5 bg-neon-cyan rounded-full transition-all duration-300 ease-out shadow-[0_0_8px_rgba(0,255,255,0.4)]"
            />
          </div>
        </div>

        {/* Tab Content with transition */}
        <div key={tabKey} className="animate-tab-in">
          {activeTab === 'real-hash' && <RealHashPanel />}
          {activeTab === 'lsh' && <LSHDemo />}
          {activeTab === 'obfuscation' && <ObfuscationPanel />}
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
          {activeTab === 'peft' && <PeftSimulation />}
        </div>
      </div>
    </div>
  );
}
