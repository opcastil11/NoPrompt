export interface Technique {
  id: string;
  name: string;
  shortName: string;
  description: string;
  steps: string[];
  pros: string[];
  cons: string[];
  applicability: string;
  paperRefs: number[];
  metrics: {
    compressionRatio: string;
    fidelity: string;
    speed: string;
    reversibility: string;
  };
}

export interface DemoPrompt {
  id: string;
  prompt: string;
  category: string;
  responses: Record<string, {
    hash: string;
    response: string;
    similarity: number;
    tokens: number;
  }>;
}

export interface Paper {
  id: number;
  title: string;
  authors: string;
  year: number;
  venue: string;
  description: string;
  arxivUrl: string;
  category: PaperCategory;
}

export type PaperCategory =
  | 'Prompt Compression'
  | 'Soft Prompts'
  | 'Gist Tokens'
  | 'AutoCompressor'
  | 'Adversarial'
  | 'GCG'
  | 'LSH'
  | 'PEFT/LoRA'
  | 'Obfuscation'
  | 'Surveys'
  | 'BET';

export interface ObfuscationResult {
  original: string;
  transformed: string;
  method: string;
  reversibilityScore: number;
  replacements?: number;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

export interface Limitation {
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  details: string;
}

export interface FAQ {
  question: string;
  answer: string;
}
