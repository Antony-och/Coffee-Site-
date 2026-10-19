import React from 'react';
import { ArrowUpRight, BadgeCheck, Handshake, Mountain, PackageCheck, Sparkles } from 'lucide-react';

const reasons = [
  { icon: Mountain, index: '01', title: 'Kenyan highland origin', copy: 'Coffee and tea shaped by volcanic soils, high altitude, and the cool rhythm of Kenya’s growing regions.', accent: 'bg-[#E8D2BF]' },
  { icon: Handshake, index: '02', title: 'People behind every harvest', copy: 'Long-term relationships with smallholder farmers and the communities who make each lot possible.', accent: 'bg-[#DDE7D9]' },
  { icon: Sparkles, index: '03', title: 'Crafted for character', copy: 'Thoughtful selection and small-batch roasting let the personality of each coffee and tea shine through.', accent: 'bg-[#F2DFB8]' },
  { icon: BadgeCheck, index: '04', title: 'Traceable quality', copy: 'Lots are cupped, logged, and traceable from source to cup, with details confirmed by our team.', accent: 'bg-[#DAD5E8]' },
];

interface WhyChooseSectionProps { compact?: boolean; }

export const WhyChooseSection: React.FC<WhyChooseSectionProps> = ({ compact = false }) => (
  <section aria-labelledby="why-first-cup-title" className={`relative overflow-hidden bg-[#EFE7DC] text-[#2A2522] ${compact ? 'py-14 sm:py-16' : 'py-20 sm:py-24 lg:py-28'}`}>
    <div aria-hidden="true" className="absolute -right-24 top-12 h-72 w-72 rounded-full border-[24px] border-[#D6C2AD]/35" />
    <div aria-hidden="true" className="absolute -left-20 bottom-8 h-48 w-48 rounded-full bg-[#D8E3D5]/45 blur-3xl" />
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[0.74fr_1.26fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#A85C16]/20 bg-white/60 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#835A3B]"><PackageCheck className="h-3.5 w-3.5" aria-hidden="true" /> The First Cup difference</span>
          <h2 id="why-first-cup-title" className="mt-5 max-w-xl font-serif-display text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-5xl lg:text-[4.25rem]">Why it tastes like it matters.</h2>
          <p className="mt-5 max-w-md text-sm leading-7 text-[#68615A] sm:text-base">Experience Love At First Sip. Every cup connects distinctive Kenyan origins with thoughtful craft and the people who bring it to life.</p>
          <div className="mt-8 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#835A3B]"><span className="h-px w-10 bg-[#B9825B]" /> Origin · care · character</div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {reasons.map(({ icon: Icon, index, title, copy, accent }) => (
            <article key={title} className="group relative min-h-[15.5rem] overflow-hidden rounded-[1.5rem] border border-[#DCCBBC] bg-[#FFFCF8] p-5 shadow-[0_14px_35px_rgba(75,52,34,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_45px_rgba(75,52,34,0.12)] sm:p-6">
              <div className={`absolute -right-8 -top-8 h-28 w-28 rounded-full ${accent} opacity-60 transition duration-500 group-hover:scale-125`} />
              <div className="relative flex h-full flex-col justify-between">
                <div className="flex items-start justify-between gap-4"><span className="font-serif-display text-4xl leading-none text-[#CDBBA9]">{index}</span><span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#2F4335] text-[#F9F3EA] transition duration-300 group-hover:rotate-[-8deg] group-hover:scale-105"><Icon className="h-[18px] w-[18px]" strokeWidth={1.6} aria-hidden="true" /></span></div>
                <div className="mt-10"><h3 className="max-w-[13rem] font-serif-display text-xl font-semibold leading-tight text-[#2A2522]">{title}</h3><p className="mt-3 max-w-sm text-[13px] leading-6 text-[#68615A]">{copy}</p></div>
                <div className="mt-5 flex items-center justify-between border-t border-[#EEE4D8] pt-3 text-[9px] font-bold uppercase tracking-[0.16em] text-[#A85C16]"><span>What sets us apart</span><ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" /></div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  </section>
);
