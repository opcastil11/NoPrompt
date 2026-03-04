// Deterministic pseudo-random number generator (mulberry32)
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Simple string hash (djb2)
function djb2Hash(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return hash >>> 0;
}

// Generate deterministic hex hash from input
export function generateHash(input: string, technique: string): string {
  const seed = djb2Hash(input.toLowerCase().trim() + ':' + technique);
  const rng = mulberry32(seed);
  const prefixes: Record<string, string> = {
    bet: 'BET',
    'soft-prompts': 'SPT',
    lsh: 'LSH',
    'gist-tokens': 'GST',
    adversarial: 'ADV',
    'soft-prompt-optimization': 'SPO',
    gcg: 'GCG',
  };
  const prefix = prefixes[technique] || 'HSH';
  const hex = Array.from({ length: 16 }, () =>
    Math.floor(rng() * 16).toString(16)
  ).join('');
  return `${prefix}:${hex.slice(0, 4)}...${hex.slice(12)}`;
}

// Generate full hash for display
export function generateFullHash(input: string, technique: string): string {
  const seed = djb2Hash(input.toLowerCase().trim() + ':' + technique);
  const rng = mulberry32(seed);
  return Array.from({ length: 64 }, () =>
    Math.floor(rng() * 16).toString(16)
  ).join('');
}

// Generate scramble frames for animation
export function generateScrambleFrames(
  finalHash: string,
  frameCount: number = 20
): string[] {
  const chars = '0123456789abcdef';
  const frames: string[] = [];
  const clean = finalHash.replace(/[^0-9a-f]/gi, '');

  for (let f = 0; f < frameCount; f++) {
    const progress = f / frameCount;
    let frame = '';
    for (let i = 0; i < clean.length; i++) {
      if (Math.random() < progress) {
        frame += clean[i];
      } else {
        frame += chars[Math.floor(Math.random() * chars.length)];
      }
    }
    frames.push(frame);
  }
  frames.push(clean);
  return frames;
}

// Compute simple similarity score between two strings
export function computeSimilarity(a: string, b: string): number {
  const wordsA = new Set(a.toLowerCase().split(/\s+/));
  const wordsB = new Set(b.toLowerCase().split(/\s+/));
  const intersection = new Set([...wordsA].filter((x) => wordsB.has(x)));
  const union = new Set([...wordsA, ...wordsB]);
  return union.size > 0 ? intersection.size / union.size : 0;
}
