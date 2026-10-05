import React, { useState } from 'react';
import { PageView } from '../types';
import { Coffee, ShieldCheck, Award, MapPin, Phone, Mail, ArrowUpRight, Send, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handlePageClick = (page: PageView) => {
    setCurrentPage(page);
    const element = document.getElementById(page);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="relative overflow-hidden border-t border-[#E6D9C8]/20 bg-[#1A120E] text-[#F7F1E8]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D9A05F] to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-[#E6D9C8]/10 bg-[#231A17]/90 p-6 shadow-[0_20px_60px_rgba(20,12,9,0.35)] sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.8fr_0.9fr_1.3fr] lg:gap-8">
            <div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D9A05F] text-[#1A120E] shadow-[0_12px_26px_rgba(217,160,95,0.35)]">
                  <Coffee className="h-5 w-5" />
                </div>

                <div>
                  <div className="font-serif-display text-[1.08rem] font-bold uppercase tracking-[0.14em] text-[#F7F1E8]">
                    First Cup
                  </div>
                  <div className="text-[0.58rem] font-bold uppercase tracking-[0.22em] text-[#D9A05F]">
                    Coffee & Tea
                  </div>
                </div>
              </div>

              <p className="mt-5 max-w-md text-sm leading-7 text-[#DCCEB8]/80">
                Sourced from the fertile highlands of Kenya and refined for the cup. We bring together premium coffees, exceptional teas, and a slower, more thoughtful ritual of good taste.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-2.5">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#D9A05F]/25 bg-[#2F221D] px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-[#F7F1E8]">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#D9A05F]" />
                  <span>KEBS Certified</span>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-[#D9A05F]/25 bg-[#2F221D] px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-[#F7F1E8]">
                  <Award className="h-3.5 w-3.5 text-[#9BBE6E]" />
                  <span>Traceable Origins</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="pb-2 text-[0.66rem] font-bold uppercase tracking-[0.2em] text-[#DCCEB8]">
                Collections
              </h4>

              <ul className="mt-4 space-y-3 text-sm text-[#E5D8C9]/80">
                {[
                  'Mount Kenya Reserve',
                  'Peaberry Lots',
                  'Imperial Purple Tea',
                  'Safari Gold Tea'
                ].map((item, index) => (
                  <li key={item}>
                    <button
                      onClick={() => handlePageClick(index < 2 ? 'coffee' : 'tea')}
                      className="group inline-flex items-center gap-2 text-left transition hover:text-[#F7F1E8]"
                    >
                      <ArrowUpRight className="h-3.5 w-3.5 text-[#D9A05F] transition group-hover:translate-x-0.5" />
                      <span>{item}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="pb-2 text-[0.66rem] font-bold uppercase tracking-[0.2em] text-[#DCCEB8]">
                Visit Us
              </h4>

              <div className="mt-4 space-y-4 text-sm text-[#E5D8C9]/80">
                <div className="flex gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#D9A05F]" />
                  <div>
                    <div className="font-semibold text-[#F7F1E8]">Ruiru, Kenya</div>
                    <div>Retail & Export Hubs</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#D9A05F]" />
                  <div>
                    <div className="font-semibold text-[#F7F1E8]">Nyeri County</div>
                    <div>Dry Mill & Roastery</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="pb-2 text-[0.66rem] font-bold uppercase tracking-[0.2em] text-[#DCCEB8]">
                Stay in the loop
              </h4>

              <form onSubmit={handleNewsletterSubmit} className="mt-4 space-y-3">
                {newsletterSubscribed ? (
                  <div className="flex items-center gap-2 rounded-2xl border border-[#9BBE6E]/30 bg-[#112311]/40 px-3 py-2.5 text-xs text-[#F7F1E8]">
                    <CheckCircle2 className="h-4 w-4 text-[#9BBE6E]" />
                    <span>Subscribed. New harvest notes are on the way.</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 rounded-full border border-[#E6D9C8]/15 bg-[#140E0B] p-1.5">
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Your email"
                      className="w-full rounded-full bg-transparent px-3.5 py-2.5 text-xs text-[#F7F1E8] placeholder:text-[#DCCEB8]/45 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1 rounded-full bg-[#D9A05F] px-3.5 py-2.5 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-[#1A120E] transition hover:bg-[#c98c46]"
                    >
                      <span>Join</span>
                      <Send className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </form>

              <div className="mt-5 space-y-2 text-sm text-[#E5D8C9]/80">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[#D9A05F]" />
                  <span>+254 725 741 543</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#D9A05F]" />
                  <span>firstcupcoffeeltd@gmail.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 border-t border-[#E6D9C8]/10 pt-5 text-xs text-[#DCCEB8]/70 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} First Cup Coffee & Tea. Crafted for the curious cup.</p>

            <div className="flex flex-wrap items-center gap-4">
              <a href="#about" onClick={() => handlePageClick('about')} className="transition hover:text-[#F7F1E8]">
                Story
              </a>
              <a href="#contact" onClick={() => handlePageClick('contact')} className="transition hover:text-[#F7F1E8]">
                Contact
              </a>
              <a href="#coffee" onClick={() => handlePageClick('coffee')} className="transition hover:text-[#F7F1E8]">
                Catalog
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
