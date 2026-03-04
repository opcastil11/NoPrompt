// Real SHA-256 hashing via Web Crypto API
export async function sha256(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

// Real MD5-like hash (djb2 extended to 128-bit for display)
export function quickHash(input: string): string {
  let h1 = 0x811c9dc5;
  let h2 = 0x1000193;
  let h3 = 0xcbf29ce4;
  let h4 = 0x84222325;
  for (let i = 0; i < input.length; i++) {
    const c = input.charCodeAt(i);
    h1 = Math.imul(h1 ^ c, 0x01000193) >>> 0;
    h2 = Math.imul(h2 ^ c, 0x01000193) >>> 0;
    h3 = Math.imul(h3 ^ c, 0x100001b3) >>> 0;
    h4 = Math.imul(h4 ^ c, 0x100001b3) >>> 0;
  }
  return [h1, h2, h3, h4].map((h) => h.toString(16).padStart(8, '0')).join('');
}

// Simple word-level tokenizer (approximates BPE for display)
export function tokenize(input: string): string[] {
  // Split on whitespace and punctuation boundaries
  return input
    .replace(/([.,!?;:'"()\[\]{}])/g, ' $1 ')
    .split(/\s+/)
    .filter(Boolean);
}

// Byte size of string (UTF-8)
export function byteSize(str: string): number {
  return new TextEncoder().encode(str).length;
}

// ---- Locality-Sensitive Hashing (LSH) ----

// Generate character n-grams from text
function charNgrams(text: string, n: number = 3): string[] {
  const normalized = text.toLowerCase().trim();
  const grams: string[] = [];
  for (let i = 0; i <= normalized.length - n; i++) {
    grams.push(normalized.slice(i, i + n));
  }
  return grams;
}

// Convert text to a sparse vector using n-gram hashing
function textToVector(text: string, dimensions: number = 128): number[] {
  const vec = new Array(dimensions).fill(0);
  const grams = charNgrams(text, 3);
  for (const gram of grams) {
    let h = 0;
    for (let i = 0; i < gram.length; i++) {
      h = Math.imul(h * 31 + gram.charCodeAt(i), 1) >>> 0;
    }
    vec[h % dimensions] += 1;
  }
  // Normalize
  const magnitude = Math.sqrt(vec.reduce((s, v) => s + v * v, 0));
  if (magnitude > 0) {
    for (let i = 0; i < vec.length; i++) vec[i] /= magnitude;
  }
  return vec;
}

// Deterministic random hyperplanes (seeded)
function generateHyperplanes(
  numPlanes: number,
  dimensions: number,
  seed: number = 42
): number[][] {
  let s = seed;
  const next = () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return (s / 4294967296) * 2 - 1; // range [-1, 1]
  };

  const planes: number[][] = [];
  for (let p = 0; p < numPlanes; p++) {
    const plane: number[] = [];
    for (let d = 0; d < dimensions; d++) {
      plane.push(next());
    }
    planes.push(plane);
  }
  return planes;
}

// Dot product
function dot(a: number[], b: number[]): number {
  let sum = 0;
  for (let i = 0; i < a.length; i++) sum += a[i] * b[i];
  return sum;
}

// Cosine similarity
export function cosineSimilarity(a: number[], b: number[]): number {
  const dotAB = dot(a, b);
  const magA = Math.sqrt(dot(a, a));
  const magB = Math.sqrt(dot(b, b));
  if (magA === 0 || magB === 0) return 0;
  return dotAB / (magA * magB);
}

// Main LSH class-like functions
const LSH_DIMENSIONS = 128;
const LSH_NUM_PLANES = 16; // 16-bit hash
const LSH_HYPERPLANES = generateHyperplanes(LSH_NUM_PLANES, LSH_DIMENSIONS);

export interface LSHResult {
  inputText: string;
  vector: number[];
  binaryHash: string;
  hexHash: string;
  bucketId: number;
}

export function lshHash(text: string): LSHResult {
  const vector = textToVector(text, LSH_DIMENSIONS);
  const bits: number[] = [];

  for (const plane of LSH_HYPERPLANES) {
    bits.push(dot(vector, plane) >= 0 ? 1 : 0);
  }

  const binaryHash = bits.join('');
  const bucketId = parseInt(binaryHash, 2);
  const hexHash = bucketId.toString(16).padStart(4, '0');

  return { inputText: text, vector, binaryHash, hexHash, bucketId };
}

// Compare two texts via LSH — returns hamming distance of their hashes
export function lshCompare(
  a: string,
  b: string
): {
  hashA: LSHResult;
  hashB: LSHResult;
  hammingDistance: number;
  hashSimilarity: number;
  vectorSimilarity: number;
} {
  const hashA = lshHash(a);
  const hashB = lshHash(b);

  let hammingDistance = 0;
  for (let i = 0; i < hashA.binaryHash.length; i++) {
    if (hashA.binaryHash[i] !== hashB.binaryHash[i]) hammingDistance++;
  }

  const hashSimilarity = 1 - hammingDistance / LSH_NUM_PLANES;
  const vectorSimilarity = cosineSimilarity(hashA.vector, hashB.vector);

  return { hashA, hashB, hammingDistance, hashSimilarity, vectorSimilarity };
}
