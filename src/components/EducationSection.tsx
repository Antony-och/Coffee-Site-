import React from 'react';
import { Bean, Check, Flame, Leaf, Sparkles } from 'lucide-react';

type EducationKind = 'coffee' | 'tea';

interface EducationSectionProps {
  kind: EducationKind;
}

const coffeeGrades = [
  { label: 'AA', detail: 'Largest screen size, prized for clarity and structure.', note: 'The flagship lot' },
  { label: 'AB', detail: 'Balanced screen profile with sweetness and dependable body.', note: 'Everyday excellence' },
  { label: 'PB', detail: 'A naturally rare single seed with concentrated fruit character.', note: 'Small, expressive lots' },
  { label: 'Micro-lot', detail: 'Traceable estate selections with a story all their own.', note: 'Limited release' },
];

const roastLevels = [
  { label: 'Light City', detail: 'Bright acidity, floral lift, and a vivid sense of place.', color: 'bg-[#EBCB9A]' },
  { label: 'Medium Full-City', detail: 'The golden balance of fruit, caramel, and a rounded finish.', color: 'bg-[#B8743E]' },
  { label: 'Dark Espresso', detail: 'Deep cocoa, toasted sweetness, and a generous, lasting body.', color: 'bg-[#4B291D]' },
];

const teaGrades = [
  { label: 'Whole leaf', detail: 'Larger, carefully shaped leaves for a slower, layered infusion.', note: 'Elegant & aromatic' },
  { label: 'Broken leaf', detail: 'More surface area for a brisker cup with clear colour and strength.', note: 'Bright & lively' },
  { label: 'CTC', detail: 'Crush-tear-curl leaves that brew quickly with body and colour.', note: 'Bold & dependable' },
  { label: 'Bud & tip', detail: 'Tender young growth selected for delicacy, sweetness, and perfume.', note: 'Small-batch reserve' },
];

const teaTypes = [
  { label: 'Black tea', detail: 'Fully oxidised leaves with malt, warmth, and a copper-bright liquor.', color: 'bg-[#A85C32]' },
  { label: 'Green tea', detail: 'Unoxidised leaves with fresh, grassy lift and a clean finish.', color: 'bg-[#739A57]' },
  { label: 'Purple tea', detail: 'Highland leaves rich in anthocyanins with soft berry character.', color: 'bg-[#8362A8]' },
  { label: 'Chai & blends', detail: 'Tea layered with native spices for a generous, comforting cup.', color: 'bg-[#C08C45]' },
];

export const EducationSection: React.FC<EducationSectionProps> = ({ kind }) => {
  const isCoffee = kind === 'coffee';
  const grades = isCoffee ? coffeeGrades : teaGrades;
  const types = isCoffee ? roastLevels : teaTypes;

  return (
    <section className={isCoffee ? 'bg-[#F6EEE5] py-16 text-[#2B211B] sm:py-20 lg:py-24' : 'bg-[#EDF3EC] py-16 text-[#213126] sm:py-20 lg:py-24'} aria-labelledby={`${kind}-education-title`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] ${isCoffee ? 'border-[#B9825B]/25 bg-white/65 text-[#835A3B]' : 'border-[#45634F]/20 bg-white/65 text-[#45634F]'}`}>
              {isCoffee ? <Bean className="h-3.5 w-3.5" aria-hidden="true" /> : <Leaf className="h-3.5 w-3.5" aria-hidden="true" />}
              Know your {isCoffee ? 'coffee' : 'tea'}
            </span>
            <h2 id={`${kind}-education-title`} className="mt-4 max-w-md font-serif-display text-3xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-4xl lg:text-5xl">
              {isCoffee ? 'A little context makes every sip better.' : 'Find the leaf behind the flavour.'}
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-[#647067] sm:text-base">
              {isCoffee ? 'Grades tell you about the bean. Roast tells you how its character is brought forward. Together, they help you choose your cup.' : 'Tea grade describes the leaf or bud. Tea type describes how it is finished. The two work together to shape colour, aroma, and body.'}
            </p>
            <div className={`mt-7 flex items-center gap-3 border-t pt-5 text-xs font-semibold uppercase tracking-[0.14em] ${isCoffee ? 'border-[#D7C4B2] text-[#835A3B]' : 'border-[#C9D8CA] text-[#45634F]'}`}>
              {isCoffee ? <Flame className="h-4 w-4" aria-hidden="true" /> : <Sparkles className="h-4 w-4" aria-hidden="true" />}
              From classification to cup
            </div>
          </div>

          <div className="space-y-10">
            <div>
              <div className="mb-4 flex items-end justify-between gap-4 border-b border-black/10 pb-3">
                <div>
                  <p className={`text-[10px] font-bold uppercase tracking-[0.18em] ${isCoffee ? 'text-[#A85C16]' : 'text-[#45634F]'}`}>{isCoffee ? '01 · Bean selection' : '01 · Leaf selection'}</p>
                  <h3 className="mt-1 font-serif-display text-2xl font-semibold">{isCoffee ? 'Grades' : 'Grades & leaf styles'}</h3>
                </div>
                <span className="hidden text-right text-xs text-[#6A746B] sm:block">How the raw ingredient is sorted</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {grades.map((item, index) => (
                  <article key={item.label} className={`group rounded-2xl border bg-white/75 p-4 transition duration-200 hover:-translate-y-0.5 hover:bg-white sm:p-5 ${isCoffee ? 'border-[#DDC9B6] hover:border-[#B9825B]' : 'border-[#CBDCCB] hover:border-[#45634F]'}`}>
                    <div className="flex items-start justify-between gap-4">
                      <span className={`font-serif-display text-2xl font-semibold ${isCoffee ? 'text-[#835A3B]' : 'text-[#45634F]'}`}>{item.label}</span>
                      <span className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold ${isCoffee ? 'bg-[#F2E2D3] text-[#835A3B]' : 'bg-[#DCEBDD] text-[#45634F]'}`}>0{index + 1}</span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-[#667067]">{item.detail}</p>
                    <p className={`mt-4 text-[10px] font-bold uppercase tracking-[0.14em] ${isCoffee ? 'text-[#A85C16]' : 'text-[#5A7A61]'}`}>{'note' in item ? item.note : ''}</p>
                  </article>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-4 flex items-end justify-between gap-4 border-b border-black/10 pb-3">
                <div>
                  <p className={`text-[10px] font-bold uppercase tracking-[0.18em] ${isCoffee ? 'text-[#A85C16]' : 'text-[#45634F]'}`}>{isCoffee ? '02 · Roasting direction' : '02 · Style & finish'}</p>
                  <h3 className="mt-1 font-serif-display text-2xl font-semibold">{isCoffee ? 'Types of roast' : 'Tea types'}</h3>
                </div>
                <span className="hidden text-right text-xs text-[#6A746B] sm:block">What shapes the final cup</span>
              </div>
              <div className={`grid gap-3 ${isCoffee ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
                {types.map((item) => (
                  <article key={item.label} className="rounded-2xl bg-[#253229] p-5 text-[#F5F7F1] shadow-[0_12px_24px_rgba(37,50,41,0.1)]">
                    <div className="flex items-center gap-3">
                      <span className={`h-3 w-3 rounded-full ${item.color} ring-4 ring-white/10`} aria-hidden="true" />
                      <h4 className="font-semibold tracking-[-0.01em]">{item.label}</h4>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-[#D4DED4]">{item.detail}</p>
                    <div className="mt-5 flex items-center gap-2 border-t border-white/10 pt-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#A8C4A9]"><Check className="h-3.5 w-3.5" aria-hidden="true" /> First Cup guidance</div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
