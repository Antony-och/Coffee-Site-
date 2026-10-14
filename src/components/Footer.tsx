import React from 'react';
import { PageView } from '../types';
import {
  Award,
  ArrowUpRight,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
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

const OFFICES = [
  { city: 'Ruiru', country: 'Kenya', note: 'Head office' },
  { city: 'Mombasa', country: 'Kenya' },
  { city: 'Dar es Salaam', country: 'Tanzania' },
  { city: 'Kampala', country: 'Uganda' },
];

export const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
  const handlePageClick = (page: PageView) => {
    setCurrentPage(page);
    const element = document.getElementById(page === 'process' ? 'journey-title' : page);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative overflow-hidden border-t border-[#E6D9C8]/15 bg-[#17100D] text-[#F7F1E8]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D9A05F]/80 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-9 lg:px-8">
        <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-[1.18fr_0.7fr_0.95fr_1.05fr] lg:gap-x-10">
          <section aria-label="First Cup Coffee & Tea" className="min-w-0">
            <img
              src="/brand/first-cup-logo-white-500.png"
              alt="First Cup Coffee & Tea"
              className="h-14 w-auto max-w-[5.5rem] object-contain object-left"
              loading="lazy"
            />
            <p className="mt-3 max-w-[18rem] text-xs leading-[1.65] text-[#DCCEB8]/75">
              <span className="block">From Kenya’s highlands to your cup.</span>
              <span className="block">Distinctive coffee and tea, thoughtfully sourced.</span>
            </p>

            <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5">
              <span className="inline-flex items-center gap-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-[#F7F1E8]/85">
                <ShieldCheck className="h-3.5 w-3.5 text-[#D9A05F]" aria-hidden="true" />
                KEBS Certified
              </span>
              <span className="inline-flex items-center gap-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-[#F7F1E8]/85">
                <Award className="h-3.5 w-3.5 text-[#9BBE6E]" aria-hidden="true" />
                Traceable
              </span>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <span className="sr-only">Follow First Cup</span>
                {SOCIAL_LINKS.map(({ name, href, Icon }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`First Cup on ${name} (opens in a new tab)`}
                    title={name}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E6D9C8]/15 text-[#E8D8C2]/80 transition hover:-translate-y-0.5 hover:border-[#D9A05F]/60 hover:text-[#F3B867] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9A05F]"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                ))}
            </div>
          </section>

          <nav aria-labelledby="footer-links-title" className="pt-1">
            <h2 id="footer-links-title" className="text-[0.62rem] font-bold uppercase tracking-[0.19em] text-[#D9A05F]">Quick Links</h2>
            <ul className="mt-4 space-y-2.5 text-[0.78rem] text-[#DCCEB8]/80">
              <li><button onClick={() => handlePageClick('about')} className="transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9A05F]">Our Story</button></li>
              <li><button onClick={() => handlePageClick('coffee')} className="transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9A05F]">Catalog</button></li>
              <li><button onClick={() => handlePageClick('process')} className="transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9A05F]">Process</button></li>
              <li><button onClick={() => handlePageClick('contact')} className="transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9A05F]">Contact</button></li>
            </ul>
          </nav>

          <section aria-labelledby="footer-visit-title" className="pt-1">
            <h2 id="footer-visit-title" className="text-[0.62rem] font-bold uppercase tracking-[0.19em] text-[#D9A05F]">Find Us</h2>
            <ul className="mt-4 space-y-2.5 text-[0.75rem]" aria-label="First Cup regional offices">
              {OFFICES.map(({ city, country, note }) => (
                <li key={city} className="flex items-baseline gap-2">
                  <span className={`h-1.5 w-1.5 shrink-0 self-center rounded-full ${note ? 'bg-[#D9A05F]' : 'bg-[#9BBE6E]'}`} aria-hidden="true" />
                  <span className="font-medium text-[#F7F1E8]">{city}</span>
                  <span className="text-[#DCCEB8]/60">{note ? '— Head Office' : `— ${country}`}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="footer-contact-title" className="pt-1">
            <h2 id="footer-contact-title" className="text-[0.62rem] font-bold uppercase tracking-[0.19em] text-[#D9A05F]">Talk to Our Team</h2>
            <div className="mt-4 space-y-3 text-[0.75rem]">
              <a href="tel:+254725741543" className="flex items-center gap-2.5 text-[#F7F1E8] transition-colors hover:text-[#F3B867] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9A05F]">
                <Phone className="h-3.5 w-3.5 shrink-0 text-[#D9A05F]" aria-hidden="true" />
                <span>+254 725 741 543</span>
              </a>
              <a href="mailto:firstcupcoffeeltd@gmail.com" className="flex items-center gap-2.5 break-all text-[#DCCEB8]/75 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9A05F]">
                <Mail className="h-3.5 w-3.5 shrink-0 text-[#D9A05F]" aria-hidden="true" />
                <span>firstcupcoffeeltd@gmail.com</span>
              </a>
              <button
                onClick={() => handlePageClick('contact')}
                className="mt-1 inline-flex min-h-9 items-center gap-2 rounded-full bg-[#D9A05F] px-3.5 py-2 text-[0.59rem] font-bold uppercase tracking-[0.12em] text-[#1A120E] transition hover:bg-[#E8B978] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F3B867]"
              >
                Send Enquiry
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </section>
          </div>

        <div className="mt-7 flex flex-col gap-3 border-t border-[#E6D9C8]/10 pt-4 text-[0.65rem] text-[#DCCEB8]/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} First Cup Coffee & Tea. Crafted for the curious cup.</p>
          <nav aria-label="Legal links" className="flex items-center gap-5">
            <a href="mailto:firstcupcoffeeltd@gmail.com?subject=Privacy%20Policy%20Request" aria-label="Request the privacy policy by email" className="transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9A05F]">Privacy policy request</a>
          </nav>
        </div>
      </div>
    </footer>
  );
};
