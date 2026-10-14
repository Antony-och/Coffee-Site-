import React from 'react';
import { PageView } from '../types';
import {
  Award,
  ArrowUpRight,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: PageView) => void;
}

const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/firstcupcoffeetea/',
    Icon: Instagram,
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61579167449954',
    Icon: Facebook,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/first-cup-coffee-and-tea/?viewAsMember=true',
    Icon: Linkedin,
  },
];

export const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
  const handlePageClick = (page: PageView) => {
    setCurrentPage(page);
    const element = document.getElementById(page);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative overflow-hidden border-t border-[#E6D9C8]/15 bg-[#17100D] text-[#F7F1E8]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D9A05F]/80 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <img
              src="/brand/first-cup-logo-white-500.png"
              alt="First Cup Coffee & Tea"
              className="h-24 w-auto max-w-[7rem] object-contain"
              loading="lazy"
            />
            <p className="mt-5 max-w-lg text-sm leading-7 text-[#DCCEB8]/80">
              From Kenya’s fertile highlands to your cup. We bring together distinctive coffees and exceptional teas, with care for origin and the people behind every harvest.
            </p>

            <div className="mt-5 flex flex-wrap gap-2.5">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#D9A05F]/25 bg-[#2F221D] px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-[#F7F1E8]">
                <ShieldCheck className="h-3.5 w-3.5 text-[#D9A05F]" aria-hidden="true" />
                KEBS Certified
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#D9A05F]/25 bg-[#2F221D] px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-[#F7F1E8]">
                <Award className="h-3.5 w-3.5 text-[#9BBE6E]" aria-hidden="true" />
                Traceable Origins
              </span>
            </div>

            <div className="mt-7">
              <p className="mb-3 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#DCCEB8]">Follow First Cup</p>
              <div className="flex items-center gap-2.5">
                {SOCIAL_LINKS.map(({ name, href, Icon }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`First Cup on ${name} (opens in a new tab)`}
                    title={name}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E6D9C8]/20 bg-[#241A16] text-[#E8D8C2] transition hover:-translate-y-0.5 hover:border-[#D9A05F]/60 hover:bg-[#39281F] hover:text-[#F3B867] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9A05F]"
                  >
                    <Icon className="h-[17px] w-[17px]" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-9 sm:grid-cols-2 lg:gap-8">
            <section aria-labelledby="footer-visit-title">
              <h2 id="footer-visit-title" className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#DCCEB8]">
                Find Us
              </h2>
              <div className="mt-5 space-y-5 text-sm text-[#E5D8C9]/80">
                <div className="flex gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#D9A05F]" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-[#F7F1E8]">Ruiru, Kenya</p>
                    <p className="mt-1 text-xs text-[#DCCEB8]/65">Retail & export office</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#D9A05F]" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-[#F7F1E8]">Nyeri County</p>
                    <p className="mt-1 text-xs text-[#DCCEB8]/65">Dry mill & roastery</p>
                  </div>
                </div>
              </div>
            </section>

            <section aria-labelledby="footer-contact-title">
              <h2 id="footer-contact-title" className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#DCCEB8]">
                Talk to Our Team
              </h2>
              <div className="mt-5 space-y-4 text-sm text-[#E5D8C9]/80">
                <a href="tel:+254725741543" className="flex items-center gap-3 transition hover:text-white">
                  <Phone className="h-4 w-4 text-[#D9A05F]" aria-hidden="true" />
                  <span>+254 725 741 543</span>
                </a>
                <a href="mailto:firstcupcoffeeltd@gmail.com" className="flex items-center gap-3 break-all transition hover:text-white">
                  <Mail className="h-4 w-4 shrink-0 text-[#D9A05F]" aria-hidden="true" />
                  <span>firstcupcoffeeltd@gmail.com</span>
                </a>
                <button
                  onClick={() => handlePageClick('contact')}
                  className="mt-1 inline-flex items-center gap-2 rounded-full bg-[#D9A05F] px-4 py-2.5 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[#1A120E] transition hover:bg-[#E8B978]"
                >
                  Contact us
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </section>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-[#E6D9C8]/10 pt-5 text-xs text-[#DCCEB8]/65 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} First Cup Coffee & Tea. Crafted for the curious cup.</p>
          <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-5">
            <button onClick={() => handlePageClick('about')} className="transition hover:text-white">Our story</button>
            <button onClick={() => handlePageClick('contact')} className="transition hover:text-white">Contact</button>
            <button onClick={() => handlePageClick('coffee')} className="transition hover:text-white">Catalog</button>
          </nav>
        </div>
      </div>
    </footer>
  );
};
