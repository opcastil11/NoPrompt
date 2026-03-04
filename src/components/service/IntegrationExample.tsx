'use client';

import { useState } from 'react';
import CodeBlock from '@/components/ui/CodeBlock';

const EXAMPLES = {
  python: {
    label: 'Python',
    filename: 'example.py',
    code: `from noprompt import HashClient

client = HashClient(api_key="np_...")

# Generate a hash from a prompt
result = client.hash(
    prompt="Explain quantum computing",
    technique="bet",
    model="gpt-4"
)

print(result.hash)        # BET:7f3a...c9d1
print(result.tokens)      # 1
print(result.fidelity)    # 0.94

# Use the hash for inference
response = client.infer(hash=result.hash)
print(response.text)`,
  },
  typescript: {
    label: 'TypeScript',
    filename: 'example.ts',
    code: `import { NoPrompt } from '@noprompt/sdk';

const client = new NoPrompt({ apiKey: 'np_...' });

// Generate a hash
const result = await client.hash({
  prompt: 'Explain quantum computing',
  technique: 'bet',
  model: 'gpt-4',
});

console.log(result.hash);     // BET:7f3a...c9d1
console.log(result.tokens);   // 1
console.log(result.fidelity); // 0.94

// Use hash for inference
const response = await client.infer({ hash: result.hash });
console.log(response.text);`,
  },
  curl: {
    label: 'cURL',
    filename: 'request.sh',
    code: `# Generate hash
curl -X POST https://api.noprompt.dev/v1/hash \\
  -H "Authorization: Bearer np_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "Explain quantum computing",
    "technique": "bet",
    "model": "gpt-4"
  }'

# Response:
# {
#   "hash": "BET:7f3a...c9d1",
#   "tokens": 1,
#   "fidelity": 0.94
# }

# Use hash for inference
curl -X POST https://api.noprompt.dev/v1/infer \\
  -H "Authorization: Bearer np_..." \\
  -H "Content-Type: application/json" \\
  -d '{ "hash": "BET:7f3a...c9d1" }'`,
  },
};

type Lang = keyof typeof EXAMPLES;

export default function IntegrationExample() {
  const [lang, setLang] = useState<Lang>('python');

  return (
    <div>
      <div className="flex border-b border-border mb-4">
        {(Object.keys(EXAMPLES) as Lang[]).map((key) => (
          <button
            key={key}
            onClick={() => setLang(key)}
            className={`px-4 py-2 text-sm font-mono transition-colors cursor-pointer ${
              lang === key
                ? 'text-neon-cyan border-b-2 border-neon-cyan'
                : 'text-muted hover:text-foreground'
            }`}
          >
            {EXAMPLES[key].label}
          </button>
        ))}
      </div>
      <CodeBlock
        code={EXAMPLES[lang].code}
        language={lang}
        filename={EXAMPLES[lang].filename}
      />
    </div>
  );
}
