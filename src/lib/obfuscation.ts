import { ObfuscationResult } from '@/types';

// Seeded PRNG for deterministic shuffling
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 4294967296;
  };
}

function simpleHash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) | 0;
  }
  return h >>> 0;
}

// 1. Token Shuffle: Seeded Fisher-Yates shuffle on tokenized prompt
export function tokenShuffle(prompt: string, seed?: number): ObfuscationResult {
  const tokens = prompt.split(/\s+/).filter(Boolean);
  const s = seed ?? simpleHash(prompt);
  const rng = seededRandom(s);
  const shuffled = [...tokens];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  const result = shuffled.join(' ');
  return {
    original: prompt,
    transformed: result,
    method: 'Token Shuffle',
    reversibilityScore: 0.95,
  };
}

// 2. Synonym Replacement: Built-in synonym map
const SYNONYM_MAP: Record<string, string[]> = {
  explain: ['describe', 'elucidate', 'clarify', 'illustrate'],
  write: ['compose', 'draft', 'craft', 'author'],
  create: ['generate', 'produce', 'construct', 'build'],
  help: ['assist', 'aid', 'support', 'facilitate'],
  make: ['construct', 'fabricate', 'produce', 'form'],
  good: ['excellent', 'superb', 'outstanding', 'fine'],
  bad: ['poor', 'inferior', 'subpar', 'deficient'],
  big: ['large', 'substantial', 'considerable', 'vast'],
  small: ['tiny', 'compact', 'minute', 'diminutive'],
  fast: ['rapid', 'swift', 'quick', 'speedy'],
  slow: ['gradual', 'unhurried', 'leisurely', 'sluggish'],
  important: ['crucial', 'vital', 'essential', 'significant'],
  show: ['demonstrate', 'display', 'present', 'reveal'],
  tell: ['inform', 'notify', 'advise', 'communicate'],
  think: ['consider', 'contemplate', 'ponder', 'reflect'],
  use: ['utilize', 'employ', 'apply', 'leverage'],
  find: ['locate', 'discover', 'identify', 'detect'],
  give: ['provide', 'supply', 'furnish', 'deliver'],
  take: ['acquire', 'obtain', 'seize', 'grasp'],
  see: ['observe', 'notice', 'perceive', 'witness'],
  know: ['understand', 'comprehend', 'recognize', 'grasp'],
  get: ['obtain', 'acquire', 'receive', 'procure'],
  need: ['require', 'necessitate', 'demand', 'call for'],
  want: ['desire', 'wish', 'seek', 'aspire'],
  like: ['prefer', 'favor', 'enjoy', 'appreciate'],
  work: ['function', 'operate', 'perform', 'execute'],
  start: ['begin', 'commence', 'initiate', 'launch'],
  stop: ['cease', 'halt', 'terminate', 'discontinue'],
  run: ['execute', 'operate', 'perform', 'process'],
  come: ['arrive', 'approach', 'appear', 'emerge'],
  go: ['proceed', 'advance', 'travel', 'move'],
  keep: ['maintain', 'preserve', 'retain', 'sustain'],
  let: ['allow', 'permit', 'enable', 'authorize'],
  say: ['state', 'declare', 'mention', 'express'],
  try: ['attempt', 'endeavor', 'strive', 'aim'],
  ask: ['inquire', 'query', 'question', 'request'],
  move: ['relocate', 'transfer', 'shift', 'transport'],
  change: ['modify', 'alter', 'adjust', 'transform'],
  play: ['perform', 'engage', 'participate', 'execute'],
  learn: ['study', 'acquire', 'absorb', 'master'],
  build: ['construct', 'assemble', 'develop', 'establish'],
  new: ['novel', 'fresh', 'recent', 'modern'],
  old: ['ancient', 'aged', 'vintage', 'historical'],
  different: ['distinct', 'varied', 'diverse', 'alternative'],
  simple: ['straightforward', 'basic', 'elementary', 'uncomplicated'],
  hard: ['difficult', 'challenging', 'complex', 'demanding'],
  easy: ['effortless', 'straightforward', 'simple', 'accessible'],
  best: ['optimal', 'finest', 'premier', 'supreme'],
  code: ['program', 'script', 'implementation', 'source'],
  data: ['information', 'records', 'dataset', 'input'],
  system: ['framework', 'infrastructure', 'platform', 'architecture'],
  program: ['application', 'software', 'routine', 'procedure'],
  list: ['enumerate', 'catalog', 'itemize', 'inventory'],
  about: ['regarding', 'concerning', 'relating to', 'pertaining to'],
  many: ['numerous', 'multiple', 'several', 'various'],
  very: ['extremely', 'highly', 'remarkably', 'exceptionally'],
};

export function synonymReplace(prompt: string): ObfuscationResult {
  const words = prompt.split(/(\s+)/);
  let replacements = 0;
  const seed = simpleHash(prompt);
  const rng = seededRandom(seed);

  const transformed = words.map((word) => {
    const lower = word.toLowerCase().replace(/[^a-z]/g, '');
    if (SYNONYM_MAP[lower]) {
      const synonyms = SYNONYM_MAP[lower];
      const idx = Math.floor(rng() * synonyms.length);
      replacements++;
      const synonym = synonyms[idx];
      // Preserve capitalization
      if (word[0] === word[0].toUpperCase()) {
        return synonym.charAt(0).toUpperCase() + synonym.slice(1);
      }
      return synonym;
    }
    return word;
  });

  return {
    original: prompt,
    transformed: transformed.join(''),
    method: 'Synonym Replacement',
    reversibilityScore: 0.7,
    replacements,
  };
}

// 3. Semantic Compression: Remove stop words, reduce to keyword skeleton
const STOP_WORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
  'should', 'may', 'might', 'shall', 'can', 'to', 'of', 'in', 'for',
  'on', 'with', 'at', 'by', 'from', 'as', 'into', 'through', 'during',
  'before', 'after', 'above', 'below', 'between', 'out', 'off', 'over',
  'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when',
  'where', 'why', 'how', 'all', 'both', 'each', 'few', 'more', 'most',
  'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same',
  'so', 'than', 'too', 'very', 'just', 'because', 'but', 'and', 'or',
  'if', 'while', 'about', 'up', 'down', 'that', 'this', 'these', 'those',
  'it', 'its', 'i', 'me', 'my', 'we', 'our', 'you', 'your', 'he', 'him',
  'his', 'she', 'her', 'they', 'them', 'their', 'what', 'which', 'who',
  'whom', 'please', 'also', 'am',
]);

export function semanticCompress(prompt: string): ObfuscationResult {
  const words = prompt.split(/\s+/).filter(Boolean);
  const keywords = words.filter(
    (w) => !STOP_WORDS.has(w.toLowerCase().replace(/[^a-z]/g, ''))
  );
  const result = keywords.join(' ');

  return {
    original: prompt,
    transformed: result || prompt,
    method: 'Semantic Compression',
    reversibilityScore: 0.4,
  };
}

// 4. Character Encoding: Position-based substitution cipher
export function charEncode(prompt: string, key?: number): ObfuscationResult {
  const k = key ?? 7;
  let encoded = '';

  for (let i = 0; i < prompt.length; i++) {
    const code = prompt.charCodeAt(i);
    if (code >= 32 && code <= 126) {
      const shifted = ((code - 32 + k + i) % 95) + 32;
      encoded += String.fromCharCode(shifted);
    } else {
      encoded += prompt[i];
    }
  }

  return {
    original: prompt,
    transformed: encoded,
    method: 'Character Encoding',
    reversibilityScore: 1.0,
  };
}

// 4b. Character Decoding: Reverse the position-based substitution cipher
export function charDecode(encoded: string, key?: number): string {
  const k = key ?? 7;
  let decoded = '';

  for (let i = 0; i < encoded.length; i++) {
    const code = encoded.charCodeAt(i);
    if (code >= 32 && code <= 126) {
      const shifted = ((code - 32 - k - i) % 95 + 95) % 95 + 32;
      decoded += String.fromCharCode(shifted);
    } else {
      decoded += encoded[i];
    }
  }

  return decoded;
}
