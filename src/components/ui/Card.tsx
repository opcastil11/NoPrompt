interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <div
      className={`bg-surface-1 border border-border rounded-xl p-6 ${
        hover ? 'hover:border-neon-cyan/30 transition-colors duration-200' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
