import React from 'react';
import { ArrowRight, Boxes, CheckCircle2, ClipboardCheck, Download, Globe2, Mountain, Ship, ShieldCheck } from 'lucide-react';
import type { PageView } from '../types';
import { WhyChooseSection } from './WhyChooseSection';

interface AboutSectionProps {
  setCurrentPage: (page: PageView) => void;
}

const exportSteps = [
  { number: '01', icon: ClipboardCheck, title: 'Tell us what you need', copy: 'Share your preferred origin, grade, roast or tea style, pack format, and destination market.' },
  { number: '02', icon: Boxes, title: 'Review the right lots', copy: 'Our team confirms current availability, specifications, samples, and a fit-for-purpose export format.' },
  { number: '03', icon: ShieldCheck, title: 'Quality is documented', copy: 'Lot details, preparation, packaging, and agreed quality requirements are aligned before dispatch.' },
  { number: '04', icon: Ship, title: 'We coordinate delivery', copy: 'From export-ready packing to air or sea freight coordination, we help move the order forward.' },
];

export const AboutSection: React.FC<AboutSectionProps> = ({ setCurrentPage }) => (
  <>
    <section aria-labelledby="about-title" className="overflow-hidden bg-[#F6F1EA] py-16 text-[#2A2522] sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
          <div className="relative isolate flex min-h-[24rem] items-center justify-center overflow-hidden rounded-[2rem] bg-[#2D241E] shadow-[0_26px_60px_rgba(42,37,34,0.16)] sm:min-h-[32rem]">
            <div aria-hidden="true" className="pointer-events-none absolute inset-4 rounded-[1.5rem] border border-[#D9A05F]/20" />
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[23rem] w-[23rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D9A05F]/10 sm:h-[27rem] sm:w-[27rem]" />
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04]" />
            <span className="absolute left-5 top-5 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-[#E8D8C2] sm:left-7 sm:top-7">Our Kenyan roots · Since 2016</span>
            <div className="relative z-10 flex flex-col items-center px-6 py-16 text-center">
              <img src="/brand/first-cup-logo-white-500.png" alt="First Cup Coffee & Tea logo" className="h-auto w-40 drop-shadow-[0_12px_28px_rgba(0,0,0,0.25)] sm:w-52 lg:w-60" loading="lazy" />
              <div className="mt-5 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.22em] text-[#D9A05F]"><span className="h-px w-6 bg-[#D9A05F]/60" aria-hidden="true" />Coffee · Tea · Kenya<span className="h-px w-6 bg-[#D9A05F]/60" aria-hidden="true" /></div>
            </div>
          </div>

          <div className="py-2 lg:py-8">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#5D6D3C]/20 bg-[#5D6D3C]/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#53623A]"><Mountain className="h-3.5 w-3.5" aria-hidden="true" /> About Us</div>
            <h1 id="about-title" className="max-w-xl font-serif-display text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-[#2A2522] sm:text-5xl lg:text-[3.8rem]">Rooted in Kenya.<br /><span className="text-[#A85C16]">Ready for the world.</span></h1>
            <p className="mt-3 font-serif-display text-lg font-medium italic text-[#835A3B] sm:text-xl">Experience Love At First Sip</p>
            <p className="mt-6 max-w-xl text-sm leading-7 text-[#68615A] sm:text-base sm:leading-8">Founded in 2016 by Kenyan entrepreneurs Abdirizak Awel Mohammed and Ahmed Abdalla Boss, First Cup began with a simple belief: the best cup starts with a closer connection to where it comes from. Today, we connect distinctive coffees and teas from Kenya’s highland-growing communities with buyers at home and around the world.</p>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[#68615A] sm:text-base sm:leading-8">We work with roasters, cafés, retailers, hospitality teams, importers, and curious connoisseurs who want more than a catalogue. They want dependable information, responsive communication, and products with a clear sense of origin.</p>

            <div className="mt-7 grid max-w-xl grid-cols-3 divide-x divide-[#DCD2C5] border-y border-[#DCD2C5] py-4">
              <div className="pr-3 sm:pr-5"><div className="font-serif-display text-xl font-bold text-[#A85C16] sm:text-2xl">1,700–2,400m</div><div className="mt-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[#777068] sm:text-[10px]">Growing altitude</div></div>
              <div className="px-3 sm:px-5"><div className="font-serif-display text-xl font-bold text-[#A85C16] sm:text-2xl">12,400+</div><div className="mt-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[#777068] sm:text-[10px]">Smallholder farmers</div></div>
              <div className="pl-3 sm:pl-5"><div className="font-serif-display text-xl font-bold text-[#A85C16] sm:text-2xl">Since 2016</div><div className="mt-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[#777068] sm:text-[10px]">Kenyan-owned</div></div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <button type="button" onClick={() => setCurrentPage('coffee')} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#2D241E] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#49372B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A85C16]">Explore the collections<ArrowRight className="h-4 w-4" aria-hidden="true" /></button>
              <a href="/company-profile.pdf" download="First-Cup-Coffee-and-Tea-Company-Profile.pdf" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[#D6C8B7] bg-white/60 px-5 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-[#49372B] transition hover:border-[#A85C16]/50 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A85C16]">Download company profile<Download className="h-4 w-4" aria-hidden="true" /></a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section aria-labelledby="export-title" className="bg-[#2D241E] py-16 text-[#FAF7F2] sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#D9A05F]/30 bg-[#D9A05F]/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#E9B977]"><Globe2 className="h-3.5 w-3.5" aria-hidden="true" /> Export information</span>
            <h2 id="export-title" className="mt-5 max-w-md font-serif-display text-3xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-4xl lg:text-5xl">From Kenyan origin to your market.</h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-[#E8D8C2]/75 sm:text-base">Our export conversations are built around clarity. Tell us where you are, what you are looking for, and how you want to receive it; we will help shape the right next step.</p>
            <div className="mt-7 grid grid-cols-2 gap-3 text-xs sm:max-w-md"><div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4"><span className="block font-serif-display text-xl text-[#E9B977]">Coffee</span><span className="mt-1 block leading-5 text-[#E8D8C2]/65">Grades, roast profiles, green or roasted formats</span></div><div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4"><span className="block font-serif-display text-xl text-[#B8D19A]">Tea</span><span className="mt-1 block leading-5 text-[#E8D8C2]/65">Leaf styles, black, green, purple, and blends</span></div></div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {exportSteps.map(({ number, icon: Icon, title, copy }) => (
              <article key={number} className="rounded-[1.25rem] border border-white/10 bg-[#3A2B22] p-5 transition duration-200 hover:-translate-y-0.5 hover:border-[#D9A05F]/45 sm:p-6">
                <div className="flex items-start justify-between gap-4"><span className="font-serif-display text-3xl text-[#D9A05F]/60">{number}</span><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D9A05F]/15 text-[#E9B977]"><Icon className="h-[18px] w-[18px]" strokeWidth={1.6} aria-hidden="true" /></span></div>
                <h3 className="mt-8 font-serif-display text-xl font-semibold leading-tight">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#E8D8C2]/70">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section aria-labelledby="export-fit-title" className="bg-[#F3EEE6] py-14 text-[#2A2522] sm:py-18 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
          <div><span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A85C16]">Built for thoughtful trade</span><h2 id="export-fit-title" className="mt-3 max-w-lg font-serif-display text-3xl font-semibold leading-tight sm:text-4xl">Useful details before the first shipment.</h2></div>
          <div className="grid gap-3 sm:grid-cols-3"><div className="rounded-2xl border border-[#DDD2C4] bg-white/70 p-4"><CheckCircle2 className="h-5 w-5 text-[#5D6D3C]" aria-hidden="true" /><h3 className="mt-4 text-sm font-bold">Samples first</h3><p className="mt-2 text-xs leading-5 text-[#6B6259]">Request samples or a focused product shortlist before committing to a larger order.</p></div><div className="rounded-2xl border border-[#DDD2C4] bg-white/70 p-4"><CheckCircle2 className="h-5 w-5 text-[#5D6D3C]" aria-hidden="true" /><h3 className="mt-4 text-sm font-bold">Flexible formats</h3><p className="mt-2 text-xs leading-5 text-[#6B6259]">Discuss retail packs, wholesale lots, roasted coffee, or tea formats for your market.</p></div><div className="rounded-2xl border border-[#DDD2C4] bg-white/70 p-4"><CheckCircle2 className="h-5 w-5 text-[#5D6D3C]" aria-hidden="true" /><h3 className="mt-4 text-sm font-bold">Human support</h3><p className="mt-2 text-xs leading-5 text-[#6B6259]">Our team confirms availability, pricing, and delivery details before acceptance.</p></div></div>
        </div>
      </div>
    </section>

    <WhyChooseSection compact />
  </>
);
