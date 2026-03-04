export default function ResearchBanner() {
  return (
    <div className="bg-neon-purple/10 border border-neon-purple/20 rounded-lg px-6 py-4 max-w-4xl mx-auto">
      <div className="flex items-start gap-3">
        <span className="text-neon-purple text-lg mt-0.5">&#9432;</span>
        <div>
          <p className="text-sm text-foreground">
            <strong className="text-neon-purple">Open Research Project.</strong>{' '}
            This is an educational exploration of prompt hashing — we study the theoretical
            foundations and practical feasibility of transforming LLM prompts into compact,
            privacy-preserving representations.
          </p>
        </div>
      </div>
    </div>
  );
}
