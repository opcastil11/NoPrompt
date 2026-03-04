'use client';

import { useState } from 'react';
import { tokenShuffle, synonymReplace, semanticCompress, charEncode, charDecode } from '@/lib/obfuscation';
import { byteSize, tokenize } from '@/lib/crypto-utils';
import type { ObfuscationResult } from '@/types';

const METHODS = [
  { id: 'shuffle', label: 'Token Shuffle', desc: 'Seeded Fisher-Yates shuffle on tokenized prompt' },
  { id: 'synonym', label: 'Synonym Replacement', desc: 'Replace words with synonyms from built-in map' },
  { id: 'compress', label: 'Semantic Compression', desc: 'Remove stop words, keep keyword skeleton' },
  { id: 'encode', label: 'Character Encoding', desc: 'Position-based substitution cipher (reversible!)' },
];

export default function ObfuscationPanel() {
  const [input, setInput] = useState('Explain the concept of machine learning in simple terms');
  const [method, setMethod] = useState('shuffle');
  const [result, setResult] = useState<ObfuscationResult | null>(null);
  const [decoded, setDecoded] = useState<string | null>(null);

  const runObfuscation = () => {
    if (!input.trim()) return;
    setDecoded(null);
    let res: ObfuscationResult;
    switch (method) {
      case 'shuffle': res = tokenShuffle(input); break;
      case 'synonym': res = synonymReplace(input); break;
      case 'compress': res = semanticCompress(input); break;
      case 'encode': res = charEncode(input); break;
      default: return;
    }
    setResult(res);
  };

  const handleDecode = () => {
    if (!result) return;
    const dec = charDecode(result.transformed);
    setDecoded(dec);
  };

  const origBytes = result ? byteSize(result.original) : 0;
  const transBytes = result ? byteSize(result.transformed) : 0;
  const origTokens = result ? tokenize(result.original).length : 0;
  const transTokens = result ? tokenize(result.transformed).length : 0;

  return (
    <div className="space-y-6">
      <div className="bg-neon-cyan/5 border border-neon-cyan/20 rounded-lg px-4 py-3">
        <p className="text-xs text-neon-cyan">
          These are real algorithms running in your browser. No simulation — try any text and see actual transformations.
        </p>
      </div>

      <div>
        <label className="block text-xs font-mono text-muted mb-2 uppercase tracking-wider">Input Prompt</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={3}
          className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:border-neon-cyan/50 resize-none transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs font-mono text-muted mb-2 uppercase tracking-wider">Obfuscation Method</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {METHODS.map((m) => (
            <button
              key={m.id}
              onClick={() => { setMethod(m.id); setResult(null); setDecoded(null); }}
              className={`p-3 rounded-lg border text-left transition-colors cursor-pointer ${
                method === m.id
                  ? 'border-neon-cyan/50 bg-neon-cyan/5'
                  : 'border-border bg-surface-1 hover:border-border/80'
              }`}
            >
              <p className="text-sm font-medium">{m.label}</p>
              <p className="text-xs text-muted mt-1">{m.desc}</p>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={runObfuscation}
        disabled={!input.trim()}
        className="px-6 py-2.5 bg-neon-purple/10 border border-neon-purple/50 text-neon-purple rounded-lg text-sm font-medium hover:bg-neon-purple/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
      >
        Run Obfuscation
      </button>

      {result && (
        <div className="space-y-4 animate-fade-in">
          {/* Side-by-side comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-surface border border-border rounded-lg p-4">
              <h4 className="text-xs font-mono text-muted mb-2 uppercase tracking-wider">Original</h4>
              <p className="text-sm text-foreground/80 font-mono break-all">{result.original}</p>
            </div>
            <div className="bg-surface border border-neon-purple/20 rounded-lg p-4">
              <h4 className="text-xs font-mono text-neon-purple mb-2 uppercase tracking-wider">Obfuscated</h4>
              <p className="text-sm text-foreground/80 font-mono break-all">{result.transformed}</p>
            </div>
          </div>

          {/* Decode button for Character Encoding */}
          {method === 'encode' && (
            <div className="bg-surface-1 border border-neon-cyan/20 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-mono text-neon-cyan uppercase tracking-wider">Round-Trip Decode</h4>
                <button
                  onClick={handleDecode}
                  className="px-4 py-1.5 bg-neon-cyan/10 border border-neon-cyan/50 text-neon-cyan rounded-lg text-xs font-medium hover:bg-neon-cyan/20 transition-all cursor-pointer"
                >
                  Decode Back
                </button>
              </div>
              {decoded !== null && (
                <div className="animate-fade-in">
                  <p className="text-sm font-mono text-foreground/80 mb-2">{decoded}</p>
                  <p className={`text-xs font-mono ${decoded === result.original ? 'text-green-400' : 'text-red-400'}`}>
                    {decoded === result.original
                      ? 'Perfect match — lossless round-trip confirmed!'
                      : 'Mismatch detected'}
                  </p>
                </div>
              )}
              {decoded === null && (
                <p className="text-xs text-muted">
                  This cipher is fully reversible. Click &quot;Decode Back&quot; to prove the obfuscated text can be perfectly restored.
                </p>
              )}
            </div>
          )}

          {/* Compression & Token Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-surface-1 border border-border rounded-lg p-3 text-center">
              <p className="text-xs text-muted">Original Bytes</p>
              <p className="text-lg font-mono text-foreground font-bold">{origBytes}</p>
            </div>
            <div className="bg-surface-1 border border-border rounded-lg p-3 text-center">
              <p className="text-xs text-muted">Transformed Bytes</p>
              <p className="text-lg font-mono text-foreground font-bold">{transBytes}</p>
            </div>
            <div className="bg-surface-1 border border-border rounded-lg p-3 text-center">
              <p className="text-xs text-muted">Original Tokens</p>
              <p className="text-lg font-mono text-foreground font-bold">{origTokens}</p>
            </div>
            <div className="bg-surface-1 border border-border rounded-lg p-3 text-center">
              <p className="text-xs text-muted">Transformed Tokens</p>
              <p className={`text-lg font-mono font-bold ${
                transTokens < origTokens ? 'text-green-400' : transTokens === origTokens ? 'text-neon-cyan' : 'text-yellow-400'
              }`}>
                {transTokens}
              </p>
            </div>
          </div>

          {/* Compression ratio for semantic compression */}
          {method === 'compress' && origTokens > 0 && (
            <div className="bg-surface-1 border border-green-500/20 rounded-lg p-3 text-center">
              <p className="text-xs text-muted">Compression Ratio</p>
              <p className="text-2xl font-mono text-green-400 font-bold">
                {(origTokens / Math.max(transTokens, 1)).toFixed(1)}x
              </p>
              <p className="text-xs text-muted mt-1">
                {origTokens - transTokens} tokens removed ({Math.round((1 - transTokens / origTokens) * 100)}% reduction)
              </p>
            </div>
          )}

          {/* Reversibility Score */}
          <div className="bg-surface-1 border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-muted uppercase tracking-wider">Reversibility Score</span>
              <span className="text-sm font-mono text-neon-cyan">{Math.round(result.reversibilityScore * 100)}%</span>
            </div>
            <div className="h-2 bg-surface-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full transition-all duration-500"
                style={{ width: `${result.reversibilityScore * 100}%` }}
              />
            </div>
            {result.replacements !== undefined && (
              <p className="text-xs text-muted mt-2">{result.replacements} word(s) replaced</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
