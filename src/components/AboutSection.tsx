import React from 'react';
import { ArrowRight, Mountain } from 'lucide-react';
import type { PageView } from '../types';

interface AboutSectionProps {
  setCurrentPage: (page: PageView) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ setCurrentPage }) => (
  <section aria-labelledby="about-title" className="overflow-hidden bg-[#F6F1EA] py-16 text-[#2A2522] sm:py-20 lg:py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
        <div className="relative isolate flex min-h-[24rem] items-center justify-center overflow-hidden rounded-[2rem] bg-[#2D241E] shadow-[0_26px_60px_rgba(42,37,34,0.16)] sm:min-h-[32rem]">
          <div aria-hidden="true" className="pointer-events-none absolute inset-4 rounded-[1.5rem] border border-[#D9A05F]/20" />
          <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[23rem] w-[23rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D9A05F]/10 sm:h-[27rem] sm:w-[27rem]" />
          <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04]" />
          <span className="absolute left-5 top-5 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-[#E8D8C2] sm:left-7 sm:top-7">
            Our Kenyan roots · Since 2016
          </span>
          <div className="relative z-10 flex flex-col items-center px-6 py-16 text-center">
            <img
              src="/brand/first-cup-logo-white-500.png"
              alt="First Cup Coffee & Tea logo"
              className="h-auto w-40 drop-shadow-[0_12px_28px_rgba(0,0,0,0.25)] sm:w-52 lg:w-60"
              loading="lazy"
            />
            <div className="mt-5 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.22em] text-[#D9A05F]">
              <span className="h-px w-6 bg-[#D9A05F]/60" aria-hidden="true" />
              Coffee · Tea · Kenya
              <span className="h-px w-6 bg-[#D9A05F]/60" aria-hidden="true" />
            </div>
          </div>
        </div>

        <div className="py-2 lg:py-8">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#5D6D3C]/20 bg-[#5D6D3C]/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#53623A]">
            <Mountain className="h-3.5 w-3.5" aria-hidden="true" />
            Grown with purpose
          </div>
          <h1 id="about-title" className="max-w-xl font-serif-display text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-[#2A2522] sm:text-5xl lg:text-[3.8rem]">
            Rooted in Kenya.<br />
            <span className="text-[#A85C16]">Made to be shared.</span>
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-7 text-[#68615A] sm:text-base sm:leading-8">
            Founded in 2016 by Kenyan entrepreneurs Abdirizak Awel Mohammed and Ahmed Abdalla Boss, First Cup began with a simple belief: the best cup starts with a closer connection to where it comes from. Today, we bring together distinctive coffees and teas from Kenya’s highland-growing communities.
          </p>

          <div className="mt-7 grid max-w-xl grid-cols-3 divide-x divide-[#DCD2C5] border-y border-[#DCD2C5] py-4">
            <div className="pr-3 sm:pr-5">
              <div className="font-serif-display text-xl font-bold text-[#A85C16] sm:text-2xl">1,700–2,400m</div>
              <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[#777068] sm:text-[10px]">Growing altitude</div>
            </div>
            <div className="px-3 sm:px-5">
              <div className="font-serif-display text-xl font-bold text-[#A85C16] sm:text-2xl">12,400+</div>
              <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[#777068] sm:text-[10px]">Smallholder farmers</div>
            </div>
            <div className="pl-3 sm:pl-5">
              <div className="font-serif-display text-xl font-bold text-[#A85C16] sm:text-2xl">Since 2016</div>
              <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[#777068] sm:text-[10px]">Kenyan-owned</div>
            </div>
          </div>

          <button
            onClick={() => setCurrentPage('coffee')}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#2D241E] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#49372B] focus-visible:outline-offset-4"
          >
            Explore the collections
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </section>
);
