import Link from 'next/link';
import { NAV_LINKS } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <span className="text-xl font-bold tracking-tight">
              <span className="text-neon-cyan">No</span>
              <span className="text-foreground">Prompt</span>
            </span>
            <p className="mt-2 text-sm text-muted">
              An open research project exploring prompt hashing for LLMs.
            </p>
            <span className="inline-block mt-3 text-[10px] font-mono text-neon-purple border border-neon-purple/30 rounded px-2 py-0.5">
              Research Project
            </span>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Navigation</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Research */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Research</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <Link href="/papers" className="hover:text-foreground transition-colors">
                  52 Referenced Papers
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-foreground transition-colors">
                  7 Techniques Explored
                </Link>
              </li>
              <li>
                <Link href="/demo" className="hover:text-foreground transition-colors">
                  Interactive Demonstrations
                </Link>
              </li>
              <li>
                <Link href="/limitations" className="hover:text-foreground transition-colors">
                  Limitations & FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            Educational research project. Not a production service.
          </p>
          <p className="text-xs text-muted">
            Built for exploring prompt hashing concepts.
          </p>
        </div>
      </div>
    </footer>
  );
}
