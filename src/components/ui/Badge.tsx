interface BadgeProps {
  children: React.ReactNode;
  variant?: 'cyan' | 'purple' | 'green' | 'yellow' | 'red' | 'default';
  className?: string;
}

const variants = {
  cyan: 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan/20',
  purple: 'bg-neon-purple/10 text-neon-purple border-neon-purple/20',
  green: 'bg-green-500/10 text-green-400 border-green-500/20',
  yellow: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  red: 'bg-red-500/10 text-red-400 border-red-500/20',
  default: 'bg-surface-2 text-muted border-border',
};

export default function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 text-xs font-mono border rounded-full ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
