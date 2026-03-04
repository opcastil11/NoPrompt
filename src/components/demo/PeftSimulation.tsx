'use client';

import { useState, useMemo } from 'react';

function seededColor(seed: number): string {
  const colors = [
    'bg-neon-cyan/20', 'bg-neon-cyan/40', 'bg-neon-cyan/60',
    'bg-neon-purple/20', 'bg-neon-purple/40', 'bg-neon-purple/60',
    'bg-blue-500/20', 'bg-blue-500/40', 'bg-green-500/20', 'bg-green-500/40',
    'bg-yellow-500/20', 'bg-yellow-500/40', 'bg-red-500/20', 'bg-red-500/40',
  ];
  return colors[Math.abs(seed) % colors.length];
}

export default function PeftSimulation() {
  const [rank, setRank] = useState(4);
  const [inputText, setInputText] = useState('Explain quantum computing simply');
  const size = 8;

  const tokens = useMemo(() => inputText.split(/\s+/).filter(Boolean), [inputText]);

  // Generate deterministic weight matrix
  const weightMatrix = useMemo(() => {
    const matrix: number[][] = [];
    for (let i = 0; i < size; i++) {
      const row: number[] = [];
      for (let j = 0; j < size; j++) {
        row.push((i * size + j * 7 + 3) % 14);
      }
      matrix.push(row);
    }
    return matrix;
  }, []);

  // Matrix A (size x rank) and Matrix B (rank x size)
  const matrixA = useMemo(() => {
    const m: number[][] = [];
    for (let i = 0; i < size; i++) {
      const row: number[] = [];
      for (let j = 0; j < rank; j++) {
        row.push((i * rank + j * 5 + 1) % 14);
      }
      m.push(row);
    }
    return m;
  }, [rank]);

  const matrixB = useMemo(() => {
    const m: number[][] = [];
    for (let i = 0; i < rank; i++) {
      const row: number[] = [];
      for (let j = 0; j < size; j++) {
        row.push((i * size + j * 3 + 2) % 14);
      }
      m.push(row);
    }
    return m;
  }, [rank]);

  return (
    <div className="space-y-8">
      {/* Input prompt tokenization */}
      <div>
        <label className="block text-xs font-mono text-muted mb-2 uppercase tracking-wider">Input Prompt</label>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full bg-surface border border-border rounded-lg px-4 py-2 text-sm text-foreground focus:outline-none focus:border-neon-cyan/50 focus:shadow-[0_0_0_1px_rgba(0,255,255,0.15)] transition-all duration-200"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="text-xs font-mono text-muted mr-2">Tokens:</span>
          {tokens.map((token, idx) => (
            <span
              key={idx}
              className={`px-2 py-1 rounded text-xs font-mono ${seededColor(idx * 7 + token.charCodeAt(0))} border border-border`}
            >
              {token}
            </span>
          ))}
        </div>
      </div>

      {/* Rank slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-mono text-muted uppercase tracking-wider">LoRA Rank (r)</label>
          <span className="text-sm font-mono text-neon-cyan">r = {rank}</span>
        </div>
        <input
          type="range"
          min={1}
          max={8}
          value={rank}
          onChange={(e) => setRank(parseInt(e.target.value))}
          className="w-full accent-neon-cyan"
        />
        <div className="flex justify-between text-xs text-muted mt-1">
          <span>Max compression (r=1)</span>
          <span>Max fidelity (r=8)</span>
        </div>
      </div>

      {/* Visual matrices */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Weight Matrix W */}
        <div>
          <h4 className="text-xs font-mono text-muted mb-2 uppercase tracking-wider text-center">
            Weight Matrix W ({size}x{size})
          </h4>
          <div className="grid gap-0.5 mx-auto" style={{ gridTemplateColumns: `repeat(${size}, 1fr)`, maxWidth: '200px' }}>
            {weightMatrix.flat().map((val, idx) => (
              <div
                key={idx}
                className={`aspect-square rounded-sm ${seededColor(val)} transition-all duration-300`}
                title={`w[${Math.floor(idx / size)}][${idx % size}]`}
              />
            ))}
          </div>
          <p className="text-xs text-muted text-center mt-2">Original: {size * size} params</p>
        </div>

        {/* Adapter Matrices A and B */}
        <div className="space-y-4">
          <div>
            <h4 className="text-xs font-mono text-neon-cyan mb-2 uppercase tracking-wider text-center">
              Adapter A ({size}x{rank})
            </h4>
            <div className="grid gap-0.5 mx-auto" style={{ gridTemplateColumns: `repeat(${rank}, 1fr)`, maxWidth: `${rank * 25}px` }}>
              {matrixA.flat().map((val, idx) => (
                <div
                  key={idx}
                  className={`aspect-square rounded-sm ${seededColor(val + 3)} transition-all duration-300`}
                />
              ))}
            </div>
            <p className="text-xs text-muted text-center mt-2">{size * rank} params</p>
          </div>

          <div className="text-center text-muted text-lg">×</div>

          <div>
            <h4 className="text-xs font-mono text-neon-purple mb-2 uppercase tracking-wider text-center">
              Adapter B ({rank}x{size})
            </h4>
            <div className="grid gap-0.5 mx-auto" style={{ gridTemplateColumns: `repeat(${size}, 1fr)`, maxWidth: '200px' }}>
              {matrixB.flat().map((val, idx) => (
                <div
                  key={idx}
                  className={`aspect-square rounded-sm ${seededColor(val + 7)} transition-all duration-300`}
                />
              ))}
            </div>
            <p className="text-xs text-muted text-center mt-2">{rank * size} params</p>
          </div>
        </div>

        {/* Compressed output */}
        <div>
          <h4 className="text-xs font-mono text-muted mb-2 uppercase tracking-wider text-center">
            Compressed Representation
          </h4>
          <div className="bg-surface border border-neon-cyan/20 rounded-lg p-4">
            <div className="grid gap-0.5 mx-auto" style={{ gridTemplateColumns: `repeat(${rank}, 1fr)`, maxWidth: `${rank * 25}px` }}>
              {Array.from({ length: rank * 2 }).map((_, idx) => (
                <div
                  key={idx}
                  className={`aspect-square rounded-sm ${seededColor(idx * 3 + rank)} transition-all duration-300`}
                />
              ))}
            </div>
            <p className="text-xs text-muted text-center mt-3">
              {rank * 2} compressed tokens
            </p>
          </div>
          <div className="mt-3 bg-surface-2 rounded-lg p-3 text-center">
            <p className="text-xs text-muted">Parameter reduction</p>
            <p className="text-lg font-mono text-neon-cyan font-bold">
              {Math.round(((size * size) / (size * rank + rank * size)) * 10) / 10}x
            </p>
            <p className="text-xs text-muted">{size * rank + rank * size} vs {size * size} params</p>
          </div>
        </div>
      </div>

      {/* Educational labels */}
      <div className="bg-surface-1 border border-border rounded-lg p-4">
        <h4 className="text-sm font-semibold mb-2">How LoRA Works</h4>
        <p className="text-sm text-muted">
          Instead of updating the full weight matrix W ({size}×{size} = {size * size} parameters),
          LoRA decomposes the update into two low-rank matrices: A ({size}×{rank}) and B ({rank}×{size}).
          The total adapted parameters are {size * rank + rank * size} — a{' '}
          <span className="text-neon-cyan font-mono">
            {Math.round(((size * size) / (size * rank + rank * size)) * 10) / 10}x
          </span>{' '}
          reduction. Lower rank means more compression but potentially less fidelity.
        </p>
      </div>
    </div>
  );
}
