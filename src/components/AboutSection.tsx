import React from 'react';
import { ArrowRight, HeartHandshake, Mountain, ShieldCheck } from 'lucide-react';
import { PageView } from '../types';

const coffeeCup = new URL('../assets/images/kenyan_coffee_beans_1786601780276.jpg', import.meta.url).href;

interface AboutSectionProps {
  setCurrentPage: (page: PageView) => void;
}

const values = [
  {
    icon: Mountain,
    title: 'A sense of place',
    copy: 'Highland elevations and rich volcanic soils give each harvest its own Kenyan character.',
  },
  {
    icon: HeartHandshake,
    title: 'People at the heart',
    copy: 'We work alongside smallholder farming communities and the people behind every crop.',
  },
  {
    icon: ShieldCheck,
    title: 'Care in every lot',
    copy: 'Thoughtful sourcing and careful selection let the quality of each origin speak for itself.',
  },
];

export const AboutSection: React.FC<AboutSectionProps> = ({ setCurrentPage }) => (
  <section aria-labelledby="about-title" className="overflow-hidden bg-[#F6F1EA] py-16 text-[#2A2522] sm:py-20 lg:py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
        <div className="relative min-h-[24rem] overflow-hidden rounded-[2rem] bg-[#2D241E] shadow-[0_26px_60px_rgba(42,37,34,0.16)] sm:min-h-[32rem]">
          <img
            src={coffeeCup}
            alt="A cup of freshly brewed coffee beside roasted beans"
            className="absolute inset-0 h-full w-full object-cover object-[66%_center]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1D1713]/85 via-[#1D1713]/10 to-transparent" />
          <div className="absolute left-5 top-5 rounded-full border border-white/25 bg-[#2D241E]/55 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm sm:left-7 sm:top-7">
            Our Kenyan roots · Since 2016
          </div>
          <div className="absolute inset-x-5 bottom-5 rounded-[1.4rem] border border-white/15 bg-[#211913]/70 p-5 text-white backdrop-blur-md sm:inset-x-7 sm:bottom-7 sm:p-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F0B866]">From the highlands</span>
            <p className="mt-2 max-w-sm font-serif-display text-2xl leading-tight sm:text-3xl">A landscape you can taste.</p>
          </div>
        </div>

        <div className="py-2 lg:py-8">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#5D6D3C]/20 bg-[#5D6D3C]/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#53623A]">
            <Mountain className="h-3.5 w-3.5" />
            Grown with purpose
          </div>
          <h2 id="about-title" className="max-w-xl font-serif-display text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-[#2A2522] sm:text-5xl lg:text-[3.8rem]">
            Rooted in Kenya.<br />
            <span className="text-[#A85C16]">Made to be shared.</span>
          </h2>
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
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-14 grid gap-4 border-t border-[#DCD2C5] pt-8 sm:grid-cols-3 lg:mt-16 lg:gap-8 lg:pt-10">
        {values.map(({ icon: Icon, title, copy }, index) => (
          <article key={title} className="flex gap-4 rounded-2xl p-3 sm:p-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#5D6D3C] shadow-sm">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#A85C16]">0{index + 1} / Our approach</div>
              <h3 className="mt-1 font-serif-display text-lg font-bold text-[#2A2522]">{title}</h3>
              <p className="mt-1.5 max-w-sm text-xs leading-6 text-[#777068]">{copy}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);
