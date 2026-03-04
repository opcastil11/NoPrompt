'use client';

import { QUICK_PROMPTS } from '@/lib/demo-data';
import { TECHNIQUES } from '@/lib/techniques';
import Select from '@/components/ui/Select';

interface PromptInputProps {
  prompt: string;
  setPrompt: (p: string) => void;
  technique: string;
  setTechnique: (t: string) => void;
  onGenerate: () => void;
  isAnimating: boolean;
}

export default function PromptInput({
  prompt,
  setPrompt,
  technique,
  setTechnique,
  onGenerate,
  isAnimating,
}: PromptInputProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-mono text-muted mb-2 uppercase tracking-wider">
          Enter Prompt
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type a prompt or select one below..."
          rows={3}
          className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:border-neon-cyan/50 focus:shadow-[0_0_0_1px_rgba(0,255,255,0.15)] resize-none transition-all duration-200"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {QUICK_PROMPTS.map((qp) => (
          <button
            key={qp}
            onClick={() => setPrompt(qp)}
            className="text-xs px-3 py-1.5 bg-surface-2 border border-border rounded-full text-muted hover:text-foreground hover:border-neon-cyan/30 hover:bg-neon-cyan/5 transition-all duration-200 cursor-pointer active:scale-[0.97]"
          >
            {qp.length > 40 ? qp.slice(0, 40) + '...' : qp}
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-4">
        <div className="flex-1">
          <label className="block text-xs font-mono text-muted mb-2 uppercase tracking-wider">
            Technique
          </label>
          <Select
            value={technique}
            onChange={setTechnique}
            options={TECHNIQUES.map((t) => ({ value: t.id, label: t.shortName + ' — ' + t.name }))}
            className="w-full"
          />
        </div>
        <button
          onClick={onGenerate}
          disabled={!prompt.trim() || isAnimating}
          className="px-6 py-2.5 bg-neon-cyan/10 border border-neon-cyan/50 text-neon-cyan rounded-lg text-sm font-medium hover:bg-neon-cyan/20 hover:shadow-[0_0_16px_rgba(0,255,255,0.15)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer active:scale-[0.98] w-full sm:w-auto"
        >
          {isAnimating ? (
            <span className="inline-flex items-center justify-center gap-2">
              <span className="w-3.5 h-3.5 border-2 border-neon-cyan/30 border-t-neon-cyan rounded-full animate-spin" />
              Hashing...
            </span>
          ) : (
            'Generate Hash'
          )}
        </button>
      </div>
    </div>
  );
}
