import React from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  Coffee,
  CupSoda,
  Droplets,
  Flame,
  Hand,
  Leaf,
  RefreshCw,
  Sparkles,
  Sun,
  Wind,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

type ProcessKind = 'coffee' | 'tea';

interface ProcessStep {
  title: string;
  copy: string;
  icon: LucideIcon;
  hoverMotion: string;
}

interface Journey {
  name: string;
  path: string;
  icon: LucideIcon;
  intro: string;
  steps: ProcessStep[];
  iconStyle: string;
  numberStyle: string;
}

interface ProcessSectionProps {
  kind: ProcessKind;
}

const processTokens = {
  '--process-canvas': '#F7F4EE',
  '--process-surface': '#FFFEFC',
  '--process-ink': '#262A25',
  '--process-muted': '#6B746C',
  '--process-border': '#E3DED4',
  '--process-coffee': '#B9825B',
  '--process-coffee-ink': '#835A3B',
  '--process-coffee-soft': '#F2E8DE',
  '--process-coffee-line': '#D9C8B7',
  '--process-tea': '#45634F',
  '--process-tea-soft': '#E8EFE8',
  '--process-tea-line': '#C7D4C8',
} as React.CSSProperties;

const coffeeSteps: ProcessStep[] = [
  { title: 'Harvest ripe cherries', copy: 'Carefully select ripe coffee cherries from Kenya’s highland farms.', icon: Hand, hoverMotion: 'group-hover:-translate-y-0.5 group-hover:rotate-[-5deg]' },
  { title: 'Process the coffee', copy: 'Prepare each lot using its chosen washed or honey-processing method.', icon: Droplets, hoverMotion: 'group-hover:translate-y-0.5 group-hover:scale-110' },
  { title: 'Dry and grade', copy: 'Dry the coffee on raised beds, then sort the green beans by quality and grade.', icon: Sun, hoverMotion: 'group-hover:rotate-12' },
  { title: 'Roast in small batches', copy: 'Roast to bring out the character of each coffee lot.', icon: Flame, hoverMotion: 'group-hover:-translate-y-0.5 group-hover:scale-y-110' },
  { title: 'Grind and brew', copy: 'Brew the roasted coffee with your preferred method, from filter to espresso.', icon: Coffee, hoverMotion: 'group-hover:translate-y-0.5 group-hover:rotate-[-5deg]' },
];

const teaSteps: ProcessStep[] = [
  { title: 'Pick fresh leaves', copy: 'Select tender tea leaves and buds from Kenya’s tea-growing regions.', icon: Leaf, hoverMotion: 'group-hover:-translate-y-0.5 group-hover:rotate-6' },
  { title: 'Wither the leaf', copy: 'Allow fresh leaves to soften as some moisture is gently reduced.', icon: Wind, hoverMotion: 'group-hover:translate-x-0.5' },
  { title: 'Roll or cut', copy: 'Shape the leaf by rolling or CTC processing, depending on the tea style.', icon: RefreshCw, hoverMotion: 'group-hover:rotate-12' },
  { title: 'Finish by style', copy: 'Oxidation and drying vary across black, green, and purple teas.', icon: Sparkles, hoverMotion: 'group-hover:scale-110 group-hover:rotate-6' },
  { title: 'Steep and enjoy', copy: 'Steep the prepared tea to draw out its aroma, colour, and flavour.', icon: CupSoda, hoverMotion: 'group-hover:-translate-y-0.5 group-hover:rotate-[-4deg]' },
];

const journeys: Record<ProcessKind, Journey> = {
  coffee: {
    name: 'Coffee',
    path: 'Bean to cup',
    icon: Coffee,
    intro: 'From ripe cherry to a carefully roasted cup.',
    steps: coffeeSteps,
    iconStyle: 'bg-[var(--process-coffee-soft)] text-[var(--process-coffee-ink)]',
    numberStyle: 'border border-[var(--process-coffee-line)] bg-[var(--process-surface)] text-[var(--process-coffee-ink)]',
  },
  tea: {
    name: 'Tea',
    path: 'Leaf to cup',
    icon: Leaf,
    intro: 'From fresh leaf to a cup shaped by its tea style.',
    steps: teaSteps,
    iconStyle: 'bg-[var(--process-tea-soft)] text-[var(--process-tea)]',
    numberStyle: 'border border-[var(--process-tea-line)] bg-[var(--process-surface)] text-[var(--process-tea)]',
  },
};

export const ProcessSection: React.FC<ProcessSectionProps> = ({ kind }) => {
  const shouldReduceMotion = useReducedMotion();
  const journey = journeys[kind];
  const isCoffee = kind === 'coffee';
  const sectionId = `${kind}-process`;
  const titleId = `${sectionId}-title`;
  const JourneyIcon = journey.icon;

  return (
    <section
      id={sectionId}
      aria-labelledby={titleId}
      style={processTokens}
      className="scroll-mt-24 bg-[#F6F1EA] py-10 sm:py-14 lg:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-[var(--process-border)] bg-[var(--process-canvas)] px-4 py-7 text-[var(--process-ink)] shadow-[0_18px_45px_rgba(38,42,37,0.05)] sm:px-8 sm:py-9 lg:px-10 lg:py-10">
          <div className="relative flex flex-col gap-4 border-b border-[var(--process-border)] pb-6 sm:pb-7 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-xl border border-[var(--process-border)] bg-[var(--process-surface)] px-2.5 py-1.5 shadow-[0_2px_8px_rgba(38,42,37,0.04)]">
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-md ${
                    isCoffee
                      ? 'bg-[var(--process-coffee-soft)] text-[var(--process-coffee-ink)]'
                      : 'bg-[var(--process-tea-soft)] text-[var(--process-tea)]'
                  }`}
                >
                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </span>
                <span className={`font-sans text-[9px] font-bold uppercase leading-[1.2] tracking-[0.17em] ${isCoffee ? 'text-[var(--process-coffee-ink)]' : 'text-[var(--process-tea)]'}`}>{journey.name} process</span>
                <span aria-hidden="true" className={`h-1 w-1 rounded-full ${isCoffee ? 'bg-[var(--process-coffee)]' : 'bg-[var(--process-tea)]'}`} />
                <span className="font-sans text-[9px] font-medium uppercase leading-[1.2] tracking-[0.1em] text-[var(--process-muted)]">Step by step</span>
              </div>
              <h2 id={titleId} className="font-serif-display text-[2rem] font-medium uppercase leading-[1.02] tracking-[-0.045em] text-[var(--process-ink)] sm:text-[2.5rem] lg:text-[3rem]">
                {isCoffee ? 'FROM BEAN TO CUP' : 'FROM LEAF TO CUP'}
              </h2>
            </div>
            <p className="max-w-xl font-sans text-[13px] leading-[1.6] text-[var(--process-muted)] sm:text-sm sm:leading-6">
              {isCoffee
                ? 'Follow Kenyan coffee from carefully selected highland cherries through processing, roasting, and brewing.'
                : 'Follow Kenyan tea from freshly picked leaves through shaping, finishing, and steeping.'}
            </p>
          </div>

          <div className="relative mt-6 sm:mt-7">
            <article
              aria-labelledby={`${sectionId}-journey-title`}
              className={`rounded-[1.25rem] border border-[var(--process-border)] border-l-2 bg-[var(--process-surface)] p-4 shadow-[0_8px_28px_rgba(38,42,37,0.035)] sm:p-5 lg:p-6 ${isCoffee ? 'border-l-[var(--process-coffee)]' : 'border-l-[var(--process-tea)]'}`}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
                <div className="flex items-center gap-3">
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${journey.iconStyle}`}>
                    <JourneyIcon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <div>
                    <p className={`font-sans text-[9px] font-bold uppercase leading-[1.2] tracking-[0.18em] ${isCoffee ? 'text-[var(--process-coffee-ink)]' : 'text-[var(--process-tea)]'}`}>{journey.path}</p>
                    <h3 id={`${sectionId}-journey-title`} className="mt-0.5 font-serif-display text-[1.45rem] font-medium leading-[1.1] tracking-[-0.02em] text-[var(--process-ink)] sm:text-2xl">{journey.name}</h3>
                  </div>
                </div>
                <p className="font-sans text-xs font-normal leading-5 text-[var(--process-muted)] sm:max-w-xs sm:text-right">{journey.intro}</p>
              </div>

              <div className="relative mt-5">
                <ol className="grid grid-cols-1 gap-y-3 sm:grid-cols-2 sm:gap-x-3 xl:grid-cols-5 xl:gap-3">
                  {journey.steps.map(({ title, copy, icon: StepIcon, hoverMotion }, index) => (
                    <motion.li
                      key={title}
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{ duration: 0.32, delay: Math.min(index * 0.04, 0.16), ease: 'easeOut' }}
                      className="group relative"
                    >
                      {index < journey.steps.length - 1 && (
                        <>
                          <span aria-hidden="true" className={`pointer-events-none absolute -left-2 top-5 bottom-[-0.75rem] z-0 w-px xl:hidden ${isCoffee ? 'bg-[#D9C8B7]' : 'bg-[#C7D4C8]'}`} />
                          <span aria-hidden="true" className={`pointer-events-none absolute left-full top-7 z-0 hidden h-px w-3 xl:block ${isCoffee ? 'bg-[#D9C8B7]' : 'bg-[#C7D4C8]'}`} />
                        </>
                      )}
                      <div className={`relative z-10 h-full min-h-[9.5rem] rounded-[1rem] border bg-[var(--process-surface)] p-3.5 shadow-[0_2px_10px_rgba(38,42,37,0.025)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(38,42,37,0.08)] sm:p-4 ${isCoffee ? 'border-[var(--process-border)] hover:border-[#B9825B]/60' : 'border-[var(--process-border)] hover:border-[#45634F]/60'}`}>
                        <div className="flex items-center justify-between gap-2.5">
                          <div className="flex items-center gap-2">
                            <span aria-hidden="true" className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[9px] font-semibold ${journey.numberStyle}`}>
                              {String(index + 1).padStart(2, '0')}
                            </span>
                            <span className="font-sans text-[9px] font-semibold uppercase leading-[1.2] tracking-[0.14em] text-[var(--process-muted)]">Step {index + 1}</span>
                          </div>
                          <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 ease-out ${shouldReduceMotion ? '' : 'group-hover:scale-105'} ${isCoffee ? 'bg-[var(--process-coffee-soft)] text-[var(--process-coffee-ink)]' : 'bg-[var(--process-tea-soft)] text-[var(--process-tea)]'}`}>
                            <StepIcon className={`h-4 w-4 transform-gpu transition-transform duration-300 ease-out ${shouldReduceMotion ? '' : hoverMotion}`} strokeWidth={1.5} aria-hidden="true" />
                          </span>
                        </div>
                        <h4 className="mt-3 font-sans text-[13px] font-semibold leading-[1.35] tracking-[-0.01em] text-[var(--process-ink)]">{title}</h4>
                        <p className="mt-1.5 font-sans text-xs font-normal leading-[1.6] text-[var(--process-muted)]">{copy}</p>
                      </div>
                    </motion.li>
                  ))}
                </ol>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};
