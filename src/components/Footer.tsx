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
    <footer className="relative overflow-hidden border-t border-[#D4C3A3]/15 bg-[#1C120E] pt-16 pb-10 text-[#FAF7F2]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D97706]/60 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D97706] text-white shadow-[0_10px_25px_rgba(217,119,6,0.35)]">
                <Coffee className="h-5 w-5" />
              </div>

              <div>
                <div className="font-serif-display text-[1.1rem] font-bold uppercase tracking-[0.12em] text-[#FAF7F2]">
                  FIRST CUP
                </div>
                <div className="text-[0.58rem] font-bold uppercase tracking-[0.22em] text-[#D97706]">
                  Coffee & Tea
                </div>
              </div>
            </div>

            <p className="mt-5 max-w-md text-sm leading-7 text-[#D4C3A3]/80">
              Founded in 2016 by Kenyan entrepreneurs Abdirizak Awel Mohammed and Ahmed Abdalla Boss, we source flagship Kenyan coffees and premium teas from the fertile highlands of East Africa. Our mission is to bring sustainably grown, expertly crafted beverages to customers who value authenticity, flavor, and fair-trade impact.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D4C3A3]/15 bg-[#2D241E] px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[#FAF7F2]">
                <ShieldCheck className="h-3.5 w-3.5 text-[#D97706]" />
                <span>KEBS Export Certified</span>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-[#D4C3A3]/15 bg-[#2D241E] px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[#FAF7F2]">
                <Award className="h-3.5 w-3.5 text-[#5D6D3C]" />
                <span>Rainforest Alliance</span>
              </div>
            </div>

            <div className="mt-7">
              <div className="mb-3 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-[#D4C3A3]/70">
                Follow & Connect
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/firstcupcoffeetea/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow on Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D4C3A3]/20 bg-white/5 text-[#D4C3A3] transition hover:border-[#E1306C] hover:bg-[#E1306C] hover:text-white"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                <a
                  href="https://wa.me/254725741543"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat on WhatsApp"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D4C3A3]/20 bg-white/5 text-[#D4C3A3] transition hover:border-[#25D366] hover:bg-[#25D366] hover:text-white"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </a>

                <a
                  href="https://www.linkedin.com/company/first-cup-coffee-and-tea/?viewAsMember=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Connect on LinkedIn"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D4C3A3]/20 bg-white/5 text-[#D4C3A3] transition hover:border-[#0A66C2] hover:bg-[#0A66C2] hover:text-white"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h4 className="border-b border-[#D4C3A3]/15 pb-2 font-serif-display text-sm font-bold uppercase tracking-[0.18em] text-[#FAF7F2]">
              Highland Collections
            </h4>

            <ul className="mt-5 space-y-3 text-sm text-[#D4C3A3]/80">
              {[
                'Mount Kenya Reserve AA Arabica',
                'Crimson Peaberry (PB) Lots',
                'Imperial Purple Tea (TRFK 306/1)',
                'Kericho Safari Gold CTC Black Tea',
                'Export Duty & Freight Calculator',
                'Fair Trade & Sustainable Sourcing'
              ].map((item, index) => (
                <li key={item}>
                  <button
                    onClick={() => handlePageClick(index < 2 ? 'coffee' : index < 4 ? 'tea' : 'about')}
                    className="group flex items-center gap-2 text-left transition hover:text-[#FAF7F2]"
                  >
                    <ArrowUpRight className="h-3.5 w-3.5 text-[#D97706] transition group-hover:translate-x-0.5" />
                    <span>{item}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="border-b border-[#D4C3A3]/15 pb-2 font-serif-display text-sm font-bold uppercase tracking-[0.18em] text-[#FAF7F2]">
              Highland Hubs & Contact
            </h4>

            <div className="mt-5 space-y-4 text-sm text-[#D4C3A3]/80">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#D97706]" />
                <div>
                  <div className="font-semibold text-[#FAF7F2]">First Cup Coffee & Tea, Ruiru</div>
                  <div>Ruiru, Kenya</div>
                </div>
              </div>

              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#D97706]" />
                <div>
                  <div className="font-semibold text-[#FAF7F2]">Central Dry Mill & Roastery</div>
                  <div>Karatina-Nyeri Highway, Nyeri County</div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="mb-3 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-[#D4C3A3]/70">
                Harvest Updates Bulletin
              </div>

              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                {newsletterSubscribed ? (
                  <div className="flex items-center gap-2 rounded-2xl border border-[#5D6D3C]/50 bg-[#5D6D3C]/15 px-3 py-2.5 text-xs text-[#FAF7F2]">
                    <CheckCircle2 className="h-4 w-4 text-[#5D6D3C]" />
                    <span>Subscribed! Crop updates are on the way.</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter buyer email..."
                      className="w-full rounded-full border border-[#D4C3A3]/15 bg-[#120B08] px-3.5 py-2.5 text-xs text-white placeholder:text-[#D4C3A3]/40 focus:border-[#D97706] focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1 rounded-full bg-[#D97706] px-3.5 py-2.5 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#b86505]"
                    >
                      <span>Join</span>
                      <Send className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </form>
            </div>

            <div className="mt-6 space-y-2 text-sm text-[#D4C3A3]">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#5D6D3C]" />
                <span>+254 725 741 543</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#D97706]" />
                <span>firstcupcoffeeltd@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-[#D4C3A3]/15 pt-6 text-xs text-[#D4C3A3]/70 md:flex-row">
          <p>© {new Date().getFullYear()} Kenyan Highland Coffee & Tea Company Ltd. All Rights Reserved. Reg #KEBS-EXP-9023.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="#about" onClick={() => handlePageClick('about')} className="transition hover:text-[#FAF7F2]">
              Fair Trade Charter
            </a>
            <a href="#contact" onClick={() => handlePageClick('contact')} className="transition hover:text-[#FAF7F2]">
              Export Specifications
            </a>
            <a href="#contact" onClick={() => handlePageClick('contact')} className="transition hover:text-[#FAF7F2]">
              Nairobi HQ
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
