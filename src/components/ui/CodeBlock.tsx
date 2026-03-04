'use client';

import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export default function CodeBlock({ code, language = 'typescript', filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 bg-surface-2 border-b border-border">
          <span className="text-sm text-muted font-mono">{filename}</span>
          <button
            onClick={handleCopy}
            className="text-xs text-muted hover:text-foreground transition-colors"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}
      <pre className="p-4 bg-surface overflow-x-auto">
        <code className={`text-sm font-mono text-foreground/90 language-${language}`}>
          {code}
        </code>
      </pre>
    </div>
  );
}
