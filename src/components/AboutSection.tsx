import React from 'react';
import { ArrowRight, Coffee, CupSoda, Droplets, Flame, Hand, Leaf, Mountain, RefreshCw, Sparkles, Sun, Wind } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { PageView } from '../types';

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

interface AboutSectionProps {
  setCurrentPage: (page: PageView) => void;
}

const coffeeSteps = [
  { title: 'Harvest ripe cherries', copy: 'Carefully select ripe coffee cherries from Kenya’s highland farms.', icon: Hand, hoverMotion: 'group-hover:-translate-y-0.5 group-hover:rotate-[-5deg]' },
  { title: 'Process the coffee', copy: 'Prepare each lot using its chosen washed or honey-processing method.', icon: Droplets, hoverMotion: 'group-hover:translate-y-0.5 group-hover:scale-110' },
  { title: 'Dry and grade', copy: 'Dry the coffee on raised beds, then sort the green beans by quality and grade.', icon: Sun, hoverMotion: 'group-hover:rotate-12' },
  { title: 'Roast in small batches', copy: 'Roast to bring out the character of each coffee lot.', icon: Flame, hoverMotion: 'group-hover:-translate-y-0.5 group-hover:scale-y-110' },
  { title: 'Grind and brew', copy: 'Brew the roasted coffee with your preferred method, from filter to espresso.', icon: Coffee, hoverMotion: 'group-hover:translate-y-0.5 group-hover:rotate-[-5deg]' },
];

const teaSteps = [
  { title: 'Pick fresh leaves', copy: 'Select tender tea leaves and buds from Kenya’s tea-growing regions.', icon: Leaf, hoverMotion: 'group-hover:-translate-y-0.5 group-hover:rotate-6' },
  { title: 'Wither the leaf', copy: 'Allow fresh leaves to soften as some moisture is gently reduced.', icon: Wind, hoverMotion: 'group-hover:translate-x-0.5' },
  { title: 'Roll or cut', copy: 'Shape the leaf by rolling or CTC processing, depending on the tea style.', icon: RefreshCw, hoverMotion: 'group-hover:rotate-12' },
  { title: 'Finish by style', copy: 'Oxidation and drying vary across black, green, and purple teas.', icon: Sparkles, hoverMotion: 'group-hover:scale-110 group-hover:rotate-6' },
  { title: 'Steep and enjoy', copy: 'Steep the prepared tea to draw out its aroma, colour, and flavour.', icon: CupSoda, hoverMotion: 'group-hover:-translate-y-0.5 group-hover:rotate-[-4deg]' },
];

const journeys = [
  {
    id: 'coffee-process',
    name: 'Coffee',
    path: 'Bean to cup',
    icon: Coffee,
    intro: 'From ripe cherry to a carefully roasted cup.',
    steps: coffeeSteps,
    iconStyle: 'bg-[var(--process-coffee-soft)] text-[var(--process-coffee-ink)]',
    numberStyle: 'border border-[var(--process-coffee-line)] bg-[var(--process-surface)] text-[var(--process-coffee-ink)]',
  },
  {
    id: 'tea-process',
    name: 'Tea',
    path: 'Leaf to cup',
    icon: Leaf,
    intro: 'From fresh leaf to a cup shaped by its tea style.',
    steps: teaSteps,
    iconStyle: 'bg-[var(--process-tea-soft)] text-[var(--process-tea)]',
    numberStyle: 'border border-[var(--process-tea-line)] bg-[var(--process-surface)] text-[var(--process-tea)]',
  },
];

export const AboutSection: React.FC<AboutSectionProps> = ({ setCurrentPage }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
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
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <section
        aria-labelledby="journey-title"
        style={processTokens}
        className="relative mt-14 overflow-hidden rounded-[1.75rem] border border-[var(--process-border)] bg-[var(--process-canvas)] px-4 py-7 text-[var(--process-ink)] shadow-[0_18px_45px_rgba(38,42,37,0.05)] sm:mt-16 sm:px-8 sm:py-9 lg:px-10 lg:py-10"
      >
        <div className="relative flex flex-col gap-4 border-b border-[var(--process-border)] pb-6 sm:pb-7 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-xl border border-[var(--process-border)] bg-[var(--process-surface)] px-2.5 py-1.5 shadow-[0_2px_8px_rgba(38,42,37,0.04)]">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[var(--process-coffee-soft)] text-[var(--process-coffee-ink)]">
                <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </span>
              <span className="font-sans text-[9px] font-bold uppercase leading-[1.2] tracking-[0.17em] text-[var(--process-coffee-ink)]">The process</span>
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[var(--process-coffee)]" />
              <span className="font-sans text-[9px] font-medium uppercase leading-[1.2] tracking-[0.1em] text-[var(--process-muted)]">Step by step</span>
            </div>
            <h3 id="journey-title" className="font-serif-display text-[2rem] font-medium uppercase leading-[1.02] tracking-[-0.045em] text-[var(--process-ink)] sm:text-[2.5rem] lg:text-[3rem]">
              FROM HARVEST TO CUP
            </h3>
          </div>
          <p className="max-w-xl font-sans text-[13px] leading-[1.6] text-[var(--process-muted)] sm:text-sm sm:leading-6">
            Two ingredients, two journeys. Follow the key steps that shape coffee and tea from the highlands to your cup.
          </p>
        </div>

        <div className="relative mt-6 space-y-4 sm:mt-7 sm:space-y-5">
          {journeys.map(({ id, name, path, icon: Icon, intro, steps, iconStyle, numberStyle }) => {
            const isCoffee = id === 'coffee-process';

            return (
              <article
                key={id}
                aria-labelledby={`${id}-title`}
                className={`rounded-[1.25rem] border border-[var(--process-border)] border-l-2 bg-[var(--process-surface)] p-4 shadow-[0_8px_28px_rgba(38,42,37,0.035)] sm:p-5 lg:p-6 ${isCoffee ? 'border-l-[var(--process-coffee)]' : 'border-l-[var(--process-tea)]'}`}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
                  <div className="flex items-center gap-3">
                    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${iconStyle}`}>
                      <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    <div>
                      <p className={`font-sans text-[9px] font-bold uppercase leading-[1.2] tracking-[0.18em] ${isCoffee ? 'text-[var(--process-coffee-ink)]' : 'text-[var(--process-tea)]'}`}>{path}</p>
                      <h4 id={`${id}-title`} className="mt-0.5 font-serif-display text-[1.45rem] font-medium leading-[1.1] tracking-[-0.02em] text-[var(--process-ink)] sm:text-2xl">{name}</h4>
                    </div>
                  </div>
                  <p className="font-sans text-xs font-normal leading-5 text-[var(--process-muted)] sm:max-w-xs sm:text-right">{intro}</p>
                </div>

                <div className="relative mt-5">
                  <ol className="grid grid-cols-1 gap-y-3 sm:grid-cols-2 sm:gap-x-3 xl:grid-cols-5 xl:gap-3">
                    {steps.map(({ title, copy, icon: StepIcon, hoverMotion }, index) => (
                      <motion.li
                        key={title}
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.32, delay: Math.min(index * 0.04, 0.16), ease: 'easeOut' }}
                        className="group relative"
                      >
                        {index < steps.length - 1 && (
                          <>
                            <span aria-hidden="true" className={`pointer-events-none absolute -left-2 top-5 bottom-[-0.75rem] z-0 w-px xl:hidden ${isCoffee ? 'bg-[#D9C8B7]' : 'bg-[#C7D4C8]'}`} />
                            <span aria-hidden="true" className={`pointer-events-none absolute left-full top-7 z-0 hidden h-px w-3 xl:block ${isCoffee ? 'bg-[#D9C8B7]' : 'bg-[#C7D4C8]'}`} />
                          </>
                        )}
                        <div className={`relative z-10 h-full min-h-[9.5rem] rounded-[1rem] border bg-[var(--process-surface)] p-3.5 shadow-[0_2px_10px_rgba(38,42,37,0.025)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(38,42,37,0.08)] sm:p-4 ${isCoffee ? 'border-[var(--process-border)] hover:border-[#B9825B]/60' : 'border-[var(--process-border)] hover:border-[#45634F]/60'}`}>
                          <div className="flex items-center justify-between gap-2.5">
                            <div className="flex items-center gap-2">
                              <span aria-hidden="true" className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[9px] font-semibold ${numberStyle}`}>
                                {String(index + 1).padStart(2, '0')}
                              </span>
                              <span className="font-sans text-[9px] font-semibold uppercase leading-[1.2] tracking-[0.14em] text-[var(--process-muted)]">Step {index + 1}</span>
                            </div>
                            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 ease-out ${shouldReduceMotion ? '' : 'group-hover:scale-105'} ${isCoffee ? 'bg-[var(--process-coffee-soft)] text-[var(--process-coffee-ink)]' : 'bg-[var(--process-tea-soft)] text-[var(--process-tea)]'}`}>
                              <StepIcon className={`h-4 w-4 transform-gpu transition-transform duration-300 ease-out ${shouldReduceMotion ? '' : hoverMotion}`} strokeWidth={1.5} aria-hidden="true" />
                            </span>
                          </div>
                          <h5 className="mt-3 font-sans text-[13px] font-semibold leading-[1.35] tracking-[-0.01em] text-[var(--process-ink)]">{title}</h5>
                          <p className="mt-1.5 font-sans text-xs font-normal leading-[1.6] text-[var(--process-muted)]">{copy}</p>
                        </div>
                      </motion.li>
                    ))}
                  </ol>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  </section>
  );
};
