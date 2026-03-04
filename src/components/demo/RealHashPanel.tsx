'use client';

import { useState } from 'react';
import { sha256, quickHash, tokenize, byteSize } from '@/lib/crypto-utils';
import CopyButton from '@/components/ui/CopyButton';

export default function RealHashPanel() {
  const [input, setInput] = useState('Explain quantum computing in simple terms');
  const [hashes, setHashes] = useState<{
    sha256: string;
    fnv: string;
    tokens: string[];
    inputBytes: number;
    hashBytes: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const runHash = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const sha = await sha256(input);
    const fnv = quickHash(input);
    const tokens = tokenize(input);
    setHashes({
      sha256: sha,
      fnv,
      tokens,
      inputBytes: byteSize(input),
      hashBytes: byteSize(sha),
    });
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-neon-cyan/5 border border-neon-cyan/20 rounded-lg px-4 py-3">
        <p className="text-xs text-neon-cyan">
          Real SHA-256 via Web Crypto API. These are actual cryptographic hashes — same input always produces the same hash.
        </p>
      </div>

      <div>
        <label className="block text-xs font-mono text-muted mb-2 uppercase tracking-wider">Input Text</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={3}
          className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-neon-cyan/50 focus:shadow-[0_0_0_1px_rgba(0,255,255,0.15)] resize-none transition-all duration-200"
        />
      </div>

      <button
        onClick={runHash}
        disabled={!input.trim() || loading}
        className="px-6 py-2.5 bg-neon-cyan/10 border border-neon-cyan/50 text-neon-cyan rounded-lg text-sm font-medium hover:bg-neon-cyan/20 hover:shadow-[0_0_16px_rgba(0,255,255,0.15)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer active:scale-[0.98]"
      >
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <span className="w-3.5 h-3.5 border-2 border-neon-cyan/30 border-t-neon-cyan rounded-full animate-spin" />
            Hashing...
          </span>
        ) : (
          'Generate Real Hashes'
        )}
      </button>

      {hashes && (
        <div className="space-y-4 animate-fade-in">
          {/* SHA-256 */}
          <div className="bg-surface border border-neon-cyan/20 rounded-lg p-4 transition-all duration-200 hover:border-neon-cyan/40 group">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-mono text-neon-cyan uppercase tracking-wider">SHA-256 (Web Crypto API)</h4>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted">256 bits / 64 hex chars</span>
                <CopyButton text={hashes.sha256} />
              </div>
            </div>
            <p className="font-mono text-sm text-foreground break-all leading-relaxed">
              {hashes.sha256.match(/.{1,8}/g)?.map((chunk, i) => (
                <span key={i} className={i % 2 === 0 ? 'text-neon-cyan' : 'text-neon-purple'}>
                  {chunk}
                </span>
              ))}
            </p>
          </div>

          {/* FNV-like hash */}
          <div className="bg-surface border border-border rounded-lg p-4 transition-all duration-200 hover:border-neon-purple/30 group">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-mono text-muted uppercase tracking-wider">FNV-1a variant (128-bit)</h4>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted">128 bits / 32 hex chars</span>
                <CopyButton text={hashes.fnv} />
              </div>
            </div>
            <p className="font-mono text-sm text-foreground break-all">{hashes.fnv}</p>
          </div>

          {/* Tokenization */}
          <div className="bg-surface-1 border border-border rounded-lg p-4 transition-all duration-200 hover:border-border/80">
            <h4 className="text-xs font-mono text-muted mb-3 uppercase tracking-wider">
              Tokenization ({hashes.tokens.length} tokens)
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {hashes.tokens.map((token, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-surface-2 border border-border rounded text-xs font-mono text-foreground/80 transition-all duration-150 hover:border-neon-cyan/30 hover:bg-neon-cyan/5"
                >
                  {token}
                </span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Input Size', value: `${hashes.inputBytes} B`, color: 'text-foreground' },
              { label: 'SHA-256 Size', value: '32 B', color: 'text-neon-cyan' },
              { label: 'Compression', value: `${(hashes.inputBytes / 32).toFixed(1)}x`, color: 'text-green-400' },
              { label: 'Token Count', value: String(hashes.tokens.length), color: 'text-neon-purple' },
            ].map((stat) => (
              <div key={stat.label} className="bg-surface-1 border border-border rounded-lg p-3 text-center transition-all duration-200 hover:border-border/80 hover:bg-surface-2/50">
                <p className="text-xs text-muted">{stat.label}</p>
                <p className={`text-lg font-mono font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Determinism proof */}
          <div className="bg-surface-1 border border-border rounded-lg p-4">
            <h4 className="text-sm font-semibold mb-2">Deterministic Property</h4>
            <p className="text-sm text-muted">
              Click &quot;Generate Real Hashes&quot; again with the same input — you&#39;ll get the exact same hashes.
              Change even one character and the hash changes completely (avalanche effect).
              This is a fundamental property that makes hashing useful for prompt identification.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
