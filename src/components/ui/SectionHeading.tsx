interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  badge,
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={`text-center mb-12 ${className}`}>
      {badge && (
        <span className="inline-block px-3 py-1 text-xs font-mono text-neon-cyan bg-neon-cyan/10 border border-neon-cyan/20 rounded-full mb-4">
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}
