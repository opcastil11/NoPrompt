export default function ProcessDiagram() {
  const stages = [
    { label: 'Prompt', sublabel: 'Natural language', color: 'border-neon-cyan/50 bg-neon-cyan/5' },
    { label: 'Encode', sublabel: 'Tokenize + embed', color: 'border-neon-purple/50 bg-neon-purple/5' },
    { label: 'Hash', sublabel: 'Compress to hash', color: 'border-neon-cyan/50 bg-neon-cyan/5' },
    { label: 'Decode', sublabel: 'Model inference', color: 'border-neon-purple/50 bg-neon-purple/5' },
    { label: 'Response', sublabel: 'Equivalent output', color: 'border-neon-cyan/50 bg-neon-cyan/5' },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 py-8">
      {stages.map((stage, idx) => (
        <div key={stage.label} className="flex items-center">
          <div className={`rounded-lg border ${stage.color} px-4 py-3 text-center min-w-[100px]`}>
            <p className="text-sm font-semibold">{stage.label}</p>
            <p className="text-xs text-muted">{stage.sublabel}</p>
          </div>
          {idx < stages.length - 1 && (
            <svg className="w-6 h-6 text-border mx-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}
