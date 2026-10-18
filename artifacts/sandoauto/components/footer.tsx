import { Check, ShieldCheck } from 'lucide-react';

const footerLinks = [
  { label: 'Browse cars', href: '/cars' },
  { label: 'How inspection works', href: '/inspection' },
  { label: 'Sell your car', href: '/sell' },
];

export default function Footer() {
  return (
    <footer className="bg-deep-navy text-cream-gray">
      <div className="mx-auto max-w-[1440px] px-5 pb-6 pt-10 sm:px-8 sm:pt-12 lg:px-12">
        <div className="grid gap-9 border-b border-cream-gray/15 pb-9 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr] lg:gap-12">
          <div>
            <a
              href="/"
              aria-label="SandoAuto home"
              className="inline-flex items-center gap-2.5 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream-gray"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-forest-green">
                <Check aria-hidden="true" className="h-4 w-4" strokeWidth={2.5} />
              </span>
              <span className="text-[17px] font-bold leading-none tracking-[-0.045em]">SandoAuto</span>
            </a>
            <p className="mt-3 max-w-[240px] text-[12px] leading-5 text-cream-gray/65">
              Trust through clarity.
              <br />
              Verified used cars in Georgia.
            </p>
          </div>

          <div>
            <h2 className="font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-cream-gray/45">
              Inspection centre
            </h2>
            <p className="mt-3 text-[12px] font-semibold">Tbilisi, Georgia</p>
            <p className="mt-1 max-w-[235px] text-[11px] leading-5 text-cream-gray/65">
              I. Chavchavadze Avenue, N82
            </p>
          </div>

          <div>
            <h2 className="font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-cream-gray/45">
              Every listing includes
            </h2>
            <div className="mt-3 flex flex-col gap-2.5">
              <span className="inline-flex items-center gap-2 text-[11px] text-cream-gray/75">
                <ShieldCheck aria-hidden="true" className="h-3.5 w-3.5 text-forest-green" />
                Verified marketplace
              </span>
              <span className="inline-flex items-center gap-2 text-[11px] text-cream-gray/75">
                <Check aria-hidden="true" className="h-3.5 w-3.5 text-forest-green" />
                200+ point inspection
              </span>
            </div>
          </div>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-2 pt-5 text-[10px] text-cream-gray/60">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors duration-150 hover:text-cream-gray focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream-gray"
              >
                {link.label}
              </a>
            ))}
        </nav>
      </div>
    </footer>
  );
}
