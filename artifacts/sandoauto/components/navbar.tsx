'use client';

import { useState } from 'react';
import { ArrowRight, Check, Menu, X } from 'lucide-react';

const links = [
  { label: 'Browse cars', href: '/cars' },
  { label: 'How inspection works', href: '/inspection' },
  { label: 'Sell your car', href: '/sell' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative z-20 border-b border-deep-navy/15 bg-cream-gray text-deep-navy">
      <div className="mx-auto flex min-h-[76px] max-w-[1440px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
        <a
          href="/"
          aria-label="SandoAuto home"
          className="inline-flex min-w-fit items-center gap-2.5 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest-green"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-forest-green text-cream-gray">
            <Check aria-hidden="true" className="h-4 w-4" strokeWidth={2.5} />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-[17px] font-bold tracking-[-0.045em]">SandoAuto</span>
            <span lang="ka" className="mt-1 text-[9px] tracking-[0.025em] text-deep-navy/65">
              საქართველო
            </span>
          </span>
        </a>

        <nav aria-label="Main navigation" className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-sm py-2 text-[12px] font-semibold text-deep-navy/80 transition-colors duration-150 hover:text-forest-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest-green"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="/cars"
            className="group inline-flex min-h-10 items-center gap-2 bg-forest-green px-4 text-[11px] font-bold tracking-[0.055em] text-cream-gray transition-colors duration-150 hover:bg-deep-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-green"
          >
            Search Verified Cars
            <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
          </a>
          <span aria-label="Language: Georgian" className="border-l border-deep-navy/20 pl-4 font-mono text-[10px] font-medium tracking-[0.08em] text-deep-navy/65">
            GE
          </span>
        </div>

        <button
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex h-10 w-10 items-center justify-center border border-deep-navy/20 text-deep-navy transition-colors duration-150 hover:bg-deep-navy/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-green lg:hidden"
        >
          {menuOpen ? <X aria-hidden="true" className="h-[18px] w-[18px]" /> : <Menu aria-hidden="true" className="h-[18px] w-[18px]" />}
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="absolute left-0 right-0 top-full border-b border-deep-navy/20 bg-cream-gray px-5 pb-5 pt-2 shadow-sm sm:px-8 lg:hidden"
        >
          <div className="mx-auto max-w-[1440px]">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex min-h-12 items-center justify-between border-b border-deep-navy/10 text-sm font-semibold text-deep-navy transition-colors duration-150 hover:text-forest-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-forest-green"
              >
                {link.label}
                <ArrowRight aria-hidden="true" className="h-4 w-4 text-forest-green" />
              </a>
            ))}
            <a
              href="/cars"
              onClick={() => setMenuOpen(false)}
              className="mt-4 flex min-h-11 items-center justify-center gap-2 bg-forest-green px-4 text-[11px] font-bold tracking-[0.055em] text-cream-gray transition-colors duration-150 hover:bg-deep-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-green"
            >
              Search Verified Cars
              <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
