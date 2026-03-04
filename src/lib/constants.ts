import { NavLink, PricingTier, Limitation, FAQ } from '@/types';

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Demo', href: '/demo' },
  { label: 'Service', href: '/service' },
  { label: 'Limitations', href: '/limitations' },
  { label: 'Papers', href: '/papers' },
];

export const SITE_METADATA = {
  title: 'NoPrompt — Prompt Hashing Research',
  description: 'An educational exploration of prompt compression, obfuscation, and semantic hashing for LLMs.',
  url: 'https://noprompt.research',
};

export const FEATURES = [
  {
    title: 'Privacy Research',
    description: 'Exploring how prompt hashing could protect sensitive instructions from exposure during LLM inference.',
    icon: '🔒',
  },
  {
    title: 'Compression Techniques',
    description: '7 distinct approaches from soft prompts to adversarial optimization, each with unique trade-offs.',
    icon: '📦',
  },
  {
    title: 'Model Agnostic Concepts',
    description: 'Techniques studied across GPT, Claude, Llama, and other architectures for generalizability.',
    icon: '🔄',
  },
  {
    title: 'Deterministic Output',
    description: 'Same hash reliably produces semantically equivalent responses — a key research goal.',
    icon: '🎯',
  },
];

export const PRICING_TIERS: PricingTier[] = [
  {
    name: 'Free',
    price: '$0',
    description: 'For research and experimentation',
    features: [
      '100 hash generations/month',
      '3 techniques available',
      'Community support',
      'Basic analytics',
    ],
    cta: 'Get Started',
  },
  {
    name: 'Pro',
    price: '$49',
    description: 'For teams building with prompt hashing',
    features: [
      'Unlimited hash generations',
      'All 7 techniques',
      'Priority support',
      'Advanced analytics',
      'Custom hash configurations',
      'API access',
    ],
    highlighted: true,
    cta: 'Start Free Trial',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For organizations at scale',
    features: [
      'Everything in Pro',
      'Dedicated infrastructure',
      'SLA guarantees',
      'Custom technique training',
      'On-premise deployment',
      'SSO & audit logs',
    ],
    cta: 'Contact Sales',
  },
];

export const SUPPORTED_MODELS = [
  { name: 'GPT-4', provider: 'OpenAI', status: 'Tested' },
  { name: 'Claude', provider: 'Anthropic', status: 'Tested' },
  { name: 'Llama 3', provider: 'Meta', status: 'Tested' },
  { name: 'Gemini', provider: 'Google', status: 'Tested' },
  { name: 'Mistral', provider: 'Mistral AI', status: 'Tested' },
  { name: 'Command R+', provider: 'Cohere', status: 'Tested' },
];

export const LIMITATIONS: Limitation[] = [
  {
    title: 'Semantic Drift',
    description: 'Hashed prompts may produce responses that drift from the original intent, especially for nuanced or ambiguous queries.',
    severity: 'high',
    details: 'Compression inevitably loses information. The more aggressive the compression, the greater the semantic drift. Current techniques achieve 85-95% fidelity at moderate compression ratios.',
  },
  {
    title: 'Model Dependency',
    description: 'Hash effectiveness varies significantly across different LLM architectures and versions.',
    severity: 'high',
    details: 'A hash trained for GPT-4 may not work with Claude or Llama. Model updates can also invalidate existing hashes, requiring regeneration.',
  },
  {
    title: 'Computational Overhead',
    description: 'Some techniques (GCG, soft prompt optimization) require significant compute for hash generation.',
    severity: 'medium',
    details: 'GCG can take minutes per prompt. Soft prompt tuning requires GPU access. Only LSH and token-based methods are truly lightweight.',
  },
  {
    title: 'Limited Context Windows',
    description: 'Extreme compression may lose critical context for complex, multi-part prompts.',
    severity: 'medium',
    details: 'While compression helps fit more into context windows, the trade-off is potential loss of conditional logic, specific constraints, or nuanced instructions.',
  },
  {
    title: 'Reversibility Concerns',
    description: 'Some hashing methods are partially reversible, reducing privacy guarantees.',
    severity: 'medium',
    details: 'Soft prompts and LoRA adapters can potentially be reverse-engineered. True one-way hashing with semantic preservation remains an open research problem.',
  },
  {
    title: 'Evaluation Difficulty',
    description: 'Measuring "semantic equivalence" between original and hashed prompt responses lacks standardized metrics.',
    severity: 'low',
    details: 'Current evaluation relies on BLEU, ROUGE, and human judgment. No single metric captures the full spectrum of semantic preservation.',
  },
];

export const FAQS: FAQ[] = [
  {
    question: 'Is NoPrompt a production-ready service?',
    answer: 'No. NoPrompt is a research project exploring the theoretical foundations and practical feasibility of prompt hashing. The "service" page illustrates what a production version could look like, but this is an educational exploration.',
  },
  {
    question: 'Can I actually use these techniques to hide my prompts?',
    answer: 'The techniques described are based on real research papers, but most require model-specific training and significant compute. The demo provides simulations and real obfuscation examples, but full prompt hashing remains an active research area.',
  },
  {
    question: 'How is this different from prompt encryption?',
    answer: 'Encryption preserves the full information and is reversible with a key. Prompt hashing aims to create a compact, irreversible representation that produces equivalent LLM behavior — more analogous to lossy compression than encryption.',
  },
  {
    question: 'Which technique works best?',
    answer: 'It depends on your priorities. Soft prompt optimization offers the best fidelity but requires training. LSH is fastest but least precise. BET is most promising but still experimental. See the comparison table on the Limitations page.',
  },
  {
    question: 'Are the 52 research papers all directly about prompt hashing?',
    answer: 'No. Prompt hashing as described here is a synthesis of multiple research directions: prompt compression, soft prompts, adversarial optimization, hashing, and PEFT. The papers span these related fields that collectively inform the concept.',
  },
  {
    question: 'Can hashed prompts work across different models?',
    answer: 'Currently, most techniques are model-specific. Cross-model hash transferability is a major open research challenge. Some approaches like LSH and semantic compression show more model-agnostic properties.',
  },
  {
    question: 'What about prompt injection attacks on hashed prompts?',
    answer: 'Hashed prompts could theoretically be more resistant to injection since the prompt structure is obscured. However, this is speculative — adversarial robustness of hashed prompts has not been thoroughly studied.',
  },
  {
    question: 'How can I contribute to this research?',
    answer: 'This is an open educational project. You can explore the referenced papers, experiment with the techniques described, and contribute to the growing body of research on prompt compression and obfuscation.',
  },
];
