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

const OFFICES = [
  { city: 'Ruiru', country: 'Kenya', note: 'Head office' },
  { city: 'Mombasa', country: 'Kenya' },
  { city: 'Dar es Salaam', country: 'Tanzania' },
  { city: 'Kampala', country: 'Uganda' },
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

          <div className="grid content-start gap-4">
            <section aria-labelledby="footer-visit-title" className="rounded-2xl border border-[#E6D9C8]/12 bg-[#211713] p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[0.6rem] font-bold uppercase tracking-[0.22em] text-[#D9A05F]">Across East Africa</p>
                  <h2 id="footer-visit-title" className="mt-2 font-serif-display text-xl font-medium leading-tight text-[#F7F1E8] sm:text-2xl">
                    Find Us
                  </h2>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D9A05F]/20 bg-[#D9A05F]/10 text-[#D9A05F]">
                  <MapPin className="h-[18px] w-[18px]" strokeWidth={1.6} aria-hidden="true" />
                </span>
              </div>
              <p className="mt-2 max-w-sm text-xs leading-5 text-[#DCCEB8]/70">Rooted in Kenya, with our team and partners across the region.</p>
              <ul className="mt-5 grid grid-cols-2 gap-2" aria-label="First Cup locations">
                {OFFICES.map(({ city, country, note }) => (
                  <li key={city} className={`rounded-xl border px-3 py-3 ${note ? 'border-[#D9A05F]/35 bg-[#D9A05F]/[0.08]' : 'border-[#E6D9C8]/10 bg-[#17100D]/45'}`}>
                    <div className="flex items-center gap-1.5">
                      <span className={`h-1.5 w-1.5 rounded-full ${note ? 'bg-[#D9A05F]' : 'bg-[#9BBE6E]'}`} aria-hidden="true" />
                      <span className="font-sans text-[0.67rem] font-semibold text-[#F7F1E8]">{city}</span>
                    </div>
                    <p className="mt-1 pl-3 text-[0.62rem] text-[#DCCEB8]/65">{note ? `${country} · ${note}` : country}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="footer-contact-title" className="relative overflow-hidden rounded-2xl border border-[#D9A05F]/25 bg-gradient-to-br from-[#33241C] to-[#211713] p-5 sm:p-6">
              <div aria-hidden="true" className="absolute -right-10 -top-12 h-36 w-36 rounded-full border border-[#D9A05F]/10" />
              <div className="relative">
                <p className="text-[0.6rem] font-bold uppercase tracking-[0.22em] text-[#D9A05F]">Personal service, from first hello</p>
                <h2 id="footer-contact-title" className="mt-2 font-serif-display text-xl font-medium leading-tight text-[#F7F1E8] sm:text-2xl">
                  Talk to Our Team
                </h2>
                <p className="mt-2 text-xs leading-5 text-[#DCCEB8]/70">Questions, product enquiries, or a quote request? We’re here to help.</p>
                <div className="mt-5 space-y-3">
                  <a href="tel:+254725741543" className="group flex min-h-11 items-center gap-3 rounded-xl border border-[#E6D9C8]/10 bg-[#17100D]/35 px-3.5 py-2.5 transition-colors hover:border-[#D9A05F]/35 hover:bg-[#17100D]/65 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9A05F]">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#D9A05F]/10 text-[#D9A05F]"><Phone className="h-4 w-4" aria-hidden="true" /></span>
                    <span className="min-w-0"><span className="block text-[0.57rem] font-semibold uppercase tracking-[0.16em] text-[#DCCEB8]/55">Call us</span><span className="mt-0.5 block text-sm font-medium text-[#F7F1E8] transition-colors group-hover:text-[#F3B867]">+254 725 741 543</span></span>
                    <ArrowUpRight className="ml-auto h-4 w-4 text-[#DCCEB8]/45 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </a>
                  <a href="mailto:firstcupcoffeeltd@gmail.com" className="group flex min-h-11 items-center gap-3 rounded-xl border border-[#E6D9C8]/10 bg-[#17100D]/35 px-3.5 py-2.5 transition-colors hover:border-[#D9A05F]/35 hover:bg-[#17100D]/65 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9A05F]">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#D9A05F]/10 text-[#D9A05F]"><Mail className="h-4 w-4" aria-hidden="true" /></span>
                    <span className="min-w-0 flex-1"><span className="block text-[0.57rem] font-semibold uppercase tracking-[0.16em] text-[#DCCEB8]/55">Email</span><span className="mt-0.5 block break-all text-xs font-medium text-[#F7F1E8] transition-colors group-hover:text-[#F3B867] sm:text-[0.8rem]">firstcupcoffeeltd@gmail.com</span></span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-[#DCCEB8]/45 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </a>
                </div>
                <button
                  onClick={() => handlePageClick('contact')}
                  className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#D9A05F] px-4 py-2.5 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[#1A120E] transition hover:bg-[#E8B978] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F3B867] sm:w-auto"
                >
                  Send an enquiry
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
