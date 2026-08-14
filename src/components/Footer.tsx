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
    <footer className="bg-[#1C120E] text-[#FAF7F2] border-t border-[#D4C3A3]/20 pt-16 pb-12 font-sans relative overflow-hidden">
      {/* Top subtle background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-[#D97706]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Footer Grid - Clean 3 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Brand & Vision Column (5 Spans) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#D97706] flex items-center justify-center text-white shadow-md">
                <Coffee className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif-display text-lg font-bold tracking-wider text-[#FAF7F2] block">
                  KENYAN HIGHLAND
                </span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#D97706] font-semibold block">
                  Coffee & Tea Exporters
                </span>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-[#D4C3A3]/80 max-w-md">
              Direct exporter of single-origin AA Kenyan Arabica coffees and rare anthocyanin-rich Purple Teas. Grown in deep volcanic soils at 1,700m–2,400m altitude directly with smallholder farmer cooperatives.
            </p>

            {/* Quality Badges */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#2D241E] text-white text-[11px] font-semibold border border-[#D4C3A3]/15">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D97706]" />
                <span>KEBS Export Certified</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#2D241E] text-white text-[11px] font-semibold border border-[#D4C3A3]/15">
                <Award className="w-3.5 h-3.5 text-[#5D6D3C]" />
                <span>Rainforest Alliance</span>
              </div>
            </div>

            {/* Social Media Navigation Links */}
            <div className="pt-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4C3A3]/70 block mb-2.5">
                Follow & Connect
              </span>
              <div className="flex items-center gap-2.5">
                {/* Instagram */}
                <a
                  href="https://instagram.com/kenyanhighlandcoffee"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow on Instagram"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#E1306C] border border-[#D4C3A3]/20 hover:border-[#E1306C] text-[#D4C3A3] hover:text-white transition-all flex items-center justify-center shadow-sm"
                  title="Instagram @kenyanhighlandcoffee"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/254700000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat on WhatsApp"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#25D366] border border-[#D4C3A3]/20 hover:border-[#25D366] text-[#D4C3A3] hover:text-white transition-all flex items-center justify-center shadow-sm"
                  title="WhatsApp +254 (0) 700 000 000"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com/company/kenyanhighlandcoffee"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Connect on LinkedIn"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#0A66C2] border border-[#D4C3A3]/20 hover:border-[#0A66C2] text-[#D4C3A3] hover:text-white transition-all flex items-center justify-center shadow-sm"
                  title="LinkedIn Kenyan Highland Coffee & Tea Co."
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Page Links (3 Spans) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif-display text-sm font-bold text-[#FAF7F2] uppercase tracking-wider border-b border-[#D4C3A3]/15 pb-2">
              Highland Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#D4C3A3]/80">
              <li>
                <button
                  onClick={() => handlePageClick('coffee')}
                  className="hover:text-[#FAF7F2] transition-colors flex items-center gap-1.5 group"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#D97706] opacity-70 group-hover:opacity-100 transition-opacity" />
                  <span>Mount Kenya Reserve AA Arabica</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('coffee')}
                  className="hover:text-[#FAF7F2] transition-colors flex items-center gap-1.5 group"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#D97706] opacity-70 group-hover:opacity-100 transition-opacity" />
                  <span>Crimson Peaberry (PB) Lots</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('tea')}
                  className="hover:text-[#FAF7F2] transition-colors flex items-center gap-1.5 group"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#D97706] opacity-70 group-hover:opacity-100 transition-opacity" />
                  <span>Imperial Purple Tea (TRFK 306/1)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('tea')}
                  className="hover:text-[#FAF7F2] transition-colors flex items-center gap-1.5 group"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#D97706] opacity-70 group-hover:opacity-100 transition-opacity" />
                  <span>Kericho Safari Gold CTC Black Tea</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('calculator')}
                  className="hover:text-[#FAF7F2] transition-colors flex items-center gap-1.5 group"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#D97706] opacity-70 group-hover:opacity-100 transition-opacity" />
                  <span>Export Duty & Freight Calculator</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('about')}
                  className="hover:text-[#FAF7F2] transition-colors flex items-center gap-1.5 group"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#D97706] opacity-70 group-hover:opacity-100 transition-opacity" />
                  <span>Fair Trade & Sustainable Sourcing</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Locations & Contact Info (4 Spans) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-serif-display text-sm font-bold text-[#FAF7F2] uppercase tracking-wider border-b border-[#D4C3A3]/15 pb-2">
              Highland Hubs & Contact
            </h4>
            <div className="space-y-3 text-xs text-[#D4C3A3]/80">
              <div className="flex gap-2">
                <MapPin className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#FAF7F2] block">Nairobi Export HQ & Terminal</strong>
                  <span>JKIA Logistics Zone, Nairobi, Kenya</span>
                </div>
              </div>
              <div className="flex gap-2">
                <MapPin className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#FAF7F2] block">Central Dry Mill & Roastery</strong>
                  <span>Karatina-Nyeri Highway, Nyeri County</span>
                </div>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4C3A3]/70 block mb-2">
                Harvest Updates Bulletin
              </span>
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                {newsletterSubscribed ? (
                  <div className="p-2.5 rounded-xl bg-[#5D6D3C]/20 border border-[#5D6D3C]/40 text-[#FAF7F2] text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#5D6D3C] shrink-0" />
                    <span>Subscribed! You will receive crop bulletins.</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter buyer email..."
                      className="w-full bg-[#120B08] border border-[#D4C3A3]/20 rounded-xl px-3.5 py-2 text-xs text-white placeholder-[#D4C3A3]/40 focus:outline-none focus:border-[#D97706]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-[#D97706] hover:bg-[#b86505] text-white font-bold text-xs shrink-0 transition-colors flex items-center gap-1 shadow"
                    >
                      <span>Join</span>
                      <Send className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </form>
            </div>

            <div className="pt-1 text-xs text-[#D4C3A3] space-y-1">
              <p className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#5D6D3C]" />
                <span>+254 (0) 700 000 000</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#D97706]" />
                <span>export@kenyanhighlandcoffee.co.ke</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 border-t border-[#D4C3A3]/20 text-center md:text-left md:flex md:justify-between items-center text-xs text-[#D4C3A3]/60 space-y-2 md:space-y-0">
          <p>
            © {new Date().getFullYear()} Kenyan Highland Coffee & Tea Company Ltd. All Rights Reserved. Reg #KEBS-EXP-9023.
          </p>
          <div className="flex justify-center gap-6 text-[#D4C3A3]/80">
            <a href="#about" onClick={() => handlePageClick('about')} className="hover:text-[#FAF7F2]">Fair Trade Charter</a>
            <a href="#contact" onClick={() => handlePageClick('contact')} className="hover:text-[#FAF7F2]">Export Specifications</a>
            <a href="#contact" onClick={() => handlePageClick('contact')} className="hover:text-[#FAF7F2]">Nairobi HQ</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
