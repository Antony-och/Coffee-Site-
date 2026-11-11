import React from 'react';
import { ArrowUpRight, BadgeCheck, Handshake, Mountain, PackageCheck, Sparkles } from 'lucide-react';

const reasons = [
  {
    icon: Mountain,
    index: '01',
    title: 'Kenyan highland origin',
    copy: 'Coffee and tea shaped by volcanic soils, high altitude, and the cool rhythm of Kenya’s growing regions.',
  },
  {
    icon: Handshake,
    index: '02',
    title: 'People behind every harvest',
    copy: 'Long-term relationships with smallholder farmers and the communities who make each lot possible.',
  },
  {
    icon: Sparkles,
    index: '03',
    title: 'Crafted for character',
    copy: 'Thoughtful selection and small-batch roasting let the personality of each coffee and tea shine through.',
  },
  {
    icon: BadgeCheck,
    index: '04',
    title: 'Traceable quality',
    copy: 'Lots are cupped, logged, and traceable from source to cup, with details confirmed by our team.',
  },
];

interface WhyChooseSectionProps {
  compact?: boolean;
  onOpenAbout?: () => void;
}

export const WhyChooseSection: React.FC<WhyChooseSectionProps> = ({ compact = false, onOpenAbout }) => (
  <section
    aria-labelledby="why-first-cup-title"
    className={`relative isolate overflow-hidden bg-[#F3EEE6] text-[#2A2522] ${compact ? 'py-12 sm:py-14' : 'py-16 sm:py-20 lg:py-24'}`}
  >
    <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-8 h-64 w-64 rounded-full border-[22px] border-[#D6C2AD]/25 sm:h-80 sm:w-80" />
    <div aria-hidden="true" className="pointer-events-none absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-[#D8E3D5]/35 blur-3xl" />

    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className={`grid items-stretch gap-8 lg:grid-cols-[0.9fr_1.1fr] ${compact ? 'lg:gap-10' : 'lg:gap-16'}`}>
        <figure
          className={`group relative isolate overflow-hidden rounded-[1.75rem] bg-[#201611] shadow-[0_24px_60px_rgba(42,30,21,0.18)] sm:rounded-[2rem] ${compact ? 'min-h-[18rem] sm:min-h-[22rem] lg:min-h-[26rem]' : 'min-h-[23rem] sm:min-h-[29rem] lg:min-h-[37rem]'}`}
        >
          <img
            src="/hero/hero_highlands.jpg"
            alt="Rolling green growing fields across Kenya’s highlands at sunrise."
            loading="lazy"
            referrerPolicy="no-referrer"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#17100D]/90 via-[#17100D]/25 to-[#17100D]/10" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-[#17100D]/20 via-transparent to-transparent" />

          <div className={`absolute inset-0 z-10 flex flex-col justify-between ${compact ? 'p-5 sm:p-6' : 'p-5 sm:p-7 lg:p-8'}`}>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-[#17100D]/40 px-3.5 py-2 text-[9px] font-bold uppercase tracking-[0.17em] text-white backdrop-blur-sm sm:text-[10px]">
              <Mountain className="h-3.5 w-3.5 text-[#F0B566]" aria-hidden="true" />
              From Kenya’s highlands
            </span>

            <figcaption className="max-w-sm text-white">
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#F0B566]">Origin · care · character</span>
              <p className="mt-3 font-serif-display text-3xl font-semibold leading-[1.04] tracking-[-0.03em] sm:text-4xl lg:text-5xl">
                The origin shapes every cup.
              </p>
              <div className="mt-5 flex items-center gap-3 border-t border-white/25 pt-4">
                <PackageCheck className="h-5 w-5 shrink-0 text-[#F0B566]" aria-hidden="true" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/85 sm:text-xs">Kenyan-owned · Since 2016</span>
              </div>
            </figcaption>
          </div>
        </figure>

        <div className="flex flex-col justify-center lg:py-3">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#A85C16]/20 bg-white/70 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#835A3B]">
            <PackageCheck className="h-3.5 w-3.5" aria-hidden="true" />
            The First Cup difference
          </span>
          <h2 id="why-first-cup-title" className="mt-5 max-w-xl font-serif-display text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-5xl lg:text-[3.8rem]">
            Why it tastes like it matters.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#68615A] sm:text-base">
            Experience Love At First Sip. Every cup connects distinctive Kenyan origins with thoughtful craft and the people who bring it to life.
          </p>

          <div className="mt-7 flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.17em] text-[#835A3B] sm:mt-8 sm:text-[10px]">
            <span aria-hidden="true" className="h-px w-8 bg-[#B9825B] sm:w-10" />
            Four reasons. One shared standard.
          </div>

          <ol className="mt-3 divide-y divide-[#DCCFC0] border-y border-[#DCCFC0]">
            {reasons.map(({ icon: Icon, index, title, copy }) => (
              <li key={title} className="group flex gap-3.5 py-4 sm:gap-4 sm:py-[1.125rem]">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#DCCFC0] bg-[#FFFCF8] text-[#34503B] transition-colors duration-300 group-hover:border-[#34503B] group-hover:bg-[#34503B] group-hover:text-white sm:h-11 sm:w-11">
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.7} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                    <span className="font-serif-display text-sm leading-none text-[#A85C16]">{index}</span>
                    <h3 className="font-serif-display text-base font-semibold leading-tight text-[#2A2522] sm:text-lg">{title}</h3>
                  </div>
                  <p className="mt-1.5 max-w-xl text-xs leading-5 text-[#68615A] sm:mt-2 sm:text-[13px] sm:leading-6">{copy}</p>
                </div>
              </li>
            ))}
          </ol>

          {onOpenAbout && (
            <button
              type="button"
              onClick={onOpenAbout}
              className="mt-5 inline-flex min-h-11 w-fit items-center gap-2 rounded-full bg-[#2F4335] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#24372A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A85C16] sm:mt-6 sm:text-xs"
            >
              Explore our story
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </div>
  </section>
);
