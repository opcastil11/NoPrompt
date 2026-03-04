'use client';

import { useState } from 'react';
import { lshCompare, type LSHResult } from '@/lib/crypto-utils';
import CopyButton from '@/components/ui/CopyButton';

const EXAMPLE_PAIRS = [
  { a: 'Explain quantum computing', b: 'Describe quantum computation' },
  { a: 'Write a Python sort function', b: 'Code a sorting algorithm in Python' },
  { a: 'What is machine learning?', b: 'How do cats purr?' },
];

export default function LSHDemo() {
  const [textA, setTextA] = useState('Explain quantum computing in simple terms');
  const [textB, setTextB] = useState('Describe quantum computation simply');
  const [result, setResult] = useState<{
    hashA: LSHResult;
    hashB: LSHResult;
    hammingDistance: number;
    hashSimilarity: number;
    vectorSimilarity: number;
  } | null>(null);

  const runCompare = () => {
    if (!textA.trim() || !textB.trim()) return;
    setResult(lshCompare(textA, textB));
  };

  const simColor = (v: number) =>
    v >= 0.8 ? 'text-green-400' : v >= 0.5 ? 'text-yellow-400' : 'text-red-400';

  const simBarColor = (v: number) =>
    v >= 0.8 ? 'bg-green-400' : v >= 0.5 ? 'bg-yellow-400' : 'bg-red-400';

  return (
    <div className="space-y-6">
      <div className="bg-neon-cyan/5 border border-neon-cyan/20 rounded-lg px-4 py-3">
        <p className="text-xs text-neon-cyan">
          Real LSH with 16 random hyperplanes on 128-dim character n-gram vectors. Similar texts get similar hashes — try it.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono text-muted mb-2 uppercase tracking-wider">Text A</label>
          <textarea
            value={textA}
            onChange={(e) => setTextA(e.target.value)}
            rows={2}
            className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-neon-cyan/50 focus:shadow-[0_0_0_1px_rgba(0,255,255,0.15)] resize-none transition-all duration-200"
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-muted mb-2 uppercase tracking-wider">Text B</label>
          <textarea
            value={textB}
            onChange={(e) => setTextB(e.target.value)}
            rows={2}
            className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-neon-cyan/50 focus:shadow-[0_0_0_1px_rgba(0,255,255,0.15)] resize-none transition-all duration-200"
          />
        </div>
      </div>

      {/* Quick examples */}
      <div className="flex flex-wrap gap-2">
        <span className="text-xs text-muted self-center">Try:</span>
        {EXAMPLE_PAIRS.map((pair, idx) => (
          <button
            key={idx}
            onClick={() => { setTextA(pair.a); setTextB(pair.b); setResult(null); }}
            className="text-xs px-3 py-1.5 bg-surface-2 border border-border rounded-full text-muted hover:text-foreground hover:border-neon-cyan/30 hover:bg-neon-cyan/5 transition-all duration-200 cursor-pointer active:scale-[0.97]"
          >
            &quot;{pair.a.slice(0, 20)}...&quot; vs &quot;{pair.b.slice(0, 20)}...&quot;
          </button>
        ))}
      </div>

      <button
        onClick={runCompare}
        disabled={!textA.trim() || !textB.trim()}
        className="px-6 py-2.5 bg-neon-cyan/10 border border-neon-cyan/50 text-neon-cyan rounded-lg text-sm font-medium hover:bg-neon-cyan/20 hover:shadow-[0_0_16px_rgba(0,255,255,0.15)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer active:scale-[0.98]"
      >
        Compare LSH Hashes
      </button>

      {result && (
        <div className="space-y-4 animate-fade-in">
          {/* Binary hashes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Hash A', hash: result.hashA, other: result.hashB },
              { label: 'Hash B', hash: result.hashB, other: result.hashA },
            ].map(({ label, hash, other }) => (
              <div key={label} className="bg-surface border border-border rounded-lg p-4 transition-all duration-200 hover:border-neon-cyan/20">
                <h4 className="text-xs font-mono text-muted mb-1 uppercase tracking-wider">{label}</h4>
                <div className="flex gap-0.5 mb-2 flex-wrap">
                  {hash.binaryHash.split('').map((bit, i) => (
                    <span
                      key={i}
                      className={`w-5 h-6 flex items-center justify-center text-xs font-mono rounded transition-colors duration-150 ${
                        bit === other.binaryHash[i]
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {bit}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted">
                    Hex: <span className="text-neon-cyan font-mono">0x{hash.hexHash}</span>
                    {' '}(bucket {hash.bucketId})
                  </p>
                  <CopyButton text={`0x${hash.hexHash}`} />
                </div>
              </div>
            ))}
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-surface-1 border border-border rounded-lg p-4 text-center transition-all duration-200 hover:border-border/80">
              <p className="text-xs text-muted mb-1">Hamming Distance</p>
              <p className={`text-2xl font-mono font-bold ${
                result.hammingDistance <= 3 ? 'text-green-400' :
                result.hammingDistance <= 8 ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {result.hammingDistance}
              </p>
              <p className="text-xs text-muted mt-1">of 16 bits differ</p>
            </div>
            {[
              { label: 'Hash Similarity', value: result.hashSimilarity },
              { label: 'Vector Cosine Sim', value: result.vectorSimilarity },
            ].map((metric) => (
              <div key={metric.label} className="bg-surface-1 border border-border rounded-lg p-4 text-center transition-all duration-200 hover:border-border/80">
                <p className="text-xs text-muted mb-1">{metric.label}</p>
                <p className={`text-2xl font-mono font-bold ${simColor(metric.value)}`}>
                  {Math.round(metric.value * 100)}%
                </p>
                <div className="mt-2 h-1.5 bg-surface-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${simBarColor(metric.value)}`}
                    style={{ width: `${Math.max(0, metric.value) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Explanation */}
          <div className="bg-surface-1 border border-border rounded-lg p-4">
            <h4 className="text-sm font-semibold mb-2">How This LSH Works</h4>
            <ol className="text-sm text-muted space-y-1 list-decimal list-inside">
              <li>Text is converted to character 3-grams (e.g., &quot;exp&quot;, &quot;xpl&quot;, &quot;pla&quot;...)</li>
              <li>N-grams are hashed into a 128-dimensional sparse vector</li>
              <li>16 random hyperplanes partition the space — each gives 1 bit</li>
              <li>The 16-bit binary hash maps to one of 65,536 buckets</li>
              <li>Similar texts land in the same or nearby buckets</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}
