import React from 'react';
import { BadgeCheck, Handshake, Mountain, PackageCheck, Sparkles } from 'lucide-react';

const reasons = [
  {
    icon: Mountain,
    title: 'Kenyan highland origin',
    copy: 'Coffee and tea shaped by Kenya’s distinctive growing regions, volcanic soils, and high-altitude conditions.',
  },
  {
    icon: Handshake,
    title: 'People behind every harvest',
    copy: 'Long-term relationships and care for the smallholder farmers and communities behind each harvest.',
  },
  {
    icon: Sparkles,
    title: 'Crafted for character',
    copy: 'Careful selection and small-batch roasting let the character of each coffee lot shine through.',
  },
  {
    icon: BadgeCheck,
    title: 'Traceable quality',
    copy: 'Lots are cupped, logged, and traceable from source to cup, with current details confirmed by our team.',
  },
];

interface WhyChooseSectionProps {
  compact?: boolean;
}

export const WhyChooseSection: React.FC<WhyChooseSectionProps> = ({ compact = false }) => (
  <section
    aria-labelledby="why-first-cup-title"
    className={`bg-[#F3EEE6] text-[#2A2522] ${compact ? 'py-14 sm:py-16' : 'py-16 sm:py-20 lg:py-24'}`}
  >
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-14">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#A85C16]/15 bg-white/60 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#835A3B]">
            <PackageCheck className="h-3.5 w-3.5" aria-hidden="true" />
            The First Cup difference
          </span>
          <h2 id="why-first-cup-title" className="mt-4 max-w-xl font-serif-display text-3xl font-semibold leading-[1.08] tracking-[-0.035em] sm:text-4xl lg:text-5xl">
            Why Choose First Cup Coffee &amp; Tea?
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-7 text-[#68615A] sm:text-base">
            Experience Love At First Sip. Every cup connects distinctive Kenyan origins with thoughtful craft and the people who bring it to life.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          {reasons.map(({ icon: Icon, title, copy }, index) => (
            <article
              key={title}
              className="group rounded-2xl border border-[#E2D8CC] bg-[#FFFEFC] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C79A69]/60 hover:shadow-[0_12px_28px_rgba(42,37,34,0.07)] sm:p-5"
            >
              <div className="flex items-start gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#835A3B]/[0.08] text-[#835A3B] transition-colors group-hover:bg-[#835A3B]/[0.13]">
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.7} aria-hidden="true" />
                </span>
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#A85C16]">0{index + 1}</span>
                  <h3 className="mt-1 font-serif-display text-lg font-semibold leading-tight text-[#2A2522]">{title}</h3>
                  <p className="mt-2 text-xs leading-5 text-[#68615A] sm:text-[13px]">{copy}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  </section>
);
