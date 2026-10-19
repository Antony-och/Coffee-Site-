import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { ArrowDownRight, Coffee, CupSoda, Droplets, Flame, Hand, Leaf, RefreshCw, Sparkles, Sun, Wind } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

type ProcessKind = 'coffee' | 'tea';
interface ProcessStep { title: string; copy: string; icon: LucideIcon; }
interface ProcessSectionProps { kind: ProcessKind; }

const journeys: Record<ProcessKind, { name: string; path: string; intro: string; icon: LucideIcon; steps: ProcessStep[] }> = {
  coffee: {
    name: 'Coffee', path: 'Bean to cup', intro: 'A considered route from ripe cherry to a roast with a clear sense of place.', icon: Coffee,
    steps: [
      { title: 'Harvest ripe cherries', copy: 'Only ripe cherries are selected from Kenya’s highland farms.', icon: Hand },
      { title: 'Process the coffee', copy: 'Washed and honey methods reveal different kinds of sweetness.', icon: Droplets },
      { title: 'Dry and grade', copy: 'Raised beds, careful turning, and hand sorting protect quality.', icon: Sun },
      { title: 'Roast in small batches', copy: 'Heat is guided to bring the lot’s best character forward.', icon: Flame },
      { title: 'Grind and brew', copy: 'The journey ends in your preferred ritual, from filter to espresso.', icon: Coffee },
    ],
  },
  tea: {
    name: 'Tea', path: 'Leaf to cup', intro: 'A gentle sequence that lets each tea style speak in its own way.', icon: Leaf,
    steps: [
      { title: 'Pick fresh leaves', copy: 'Tender leaves and buds are selected from Kenya’s tea regions.', icon: Leaf },
      { title: 'Wither the leaf', copy: 'Fresh leaves soften as moisture is gently reduced.', icon: Wind },
      { title: 'Roll or cut', copy: 'Rolling or CTC processing shapes the eventual tea style.', icon: RefreshCw },
      { title: 'Finish by style', copy: 'Oxidation and drying create colour, body, and aroma.', icon: Sparkles },
      { title: 'Steep and enjoy', copy: 'Water draws out the finished leaf’s most expressive notes.', icon: CupSoda },
    ],
  },
};

export const ProcessSection: React.FC<ProcessSectionProps> = ({ kind }) => {
  const reduceMotion = useReducedMotion();
  const journey = journeys[kind];
  const isCoffee = kind === 'coffee';
  const sectionId = `${kind}-process`;
  const JourneyIcon = journey.icon;
  const accent = isCoffee ? '#B9825B' : '#45634F';
  const soft = isCoffee ? 'bg-[#F2E8DE]' : 'bg-[#E8EFE8]';
  const ink = isCoffee ? 'text-[#835A3B]' : 'text-[#45634F]';

  return (
    <section id={sectionId} aria-labelledby={`${sectionId}-title`} className={`scroll-mt-24 py-16 sm:py-20 lg:py-24 ${isCoffee ? 'bg-[#FBF8F3]' : 'bg-[#F4F8F3]'}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-start lg:gap-20">
          <div className="lg:sticky lg:top-28">
            <span className={`inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] ${ink}`}><JourneyIcon className="h-3.5 w-3.5" aria-hidden="true" /> {journey.name} process</span>
            <h2 id={`${sectionId}-title`} className="mt-5 max-w-md font-serif-display text-4xl font-semibold leading-[0.98] tracking-[-0.045em] text-[#252B26] sm:text-5xl lg:text-[4.2rem]">From {isCoffee ? 'bean' : 'leaf'}<br /><span className={ink}>to cup.</span></h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-[#6B746C] sm:text-base">{journey.intro} Follow the details that make the final cup feel unmistakably First Cup.</p>
            <div className={`mt-8 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.18em] ${ink}`}><ArrowDownRight className="h-4 w-4" aria-hidden="true" /> Five considered steps</div>
          </div>

          <div className="relative">
            <div aria-hidden="true" className="absolute bottom-6 left-[1.25rem] top-6 w-px bg-[#D6DED6] sm:left-[1.45rem]" />
            <ol className="space-y-4">
              {journey.steps.map(({ title, copy, icon: StepIcon }, index) => (
                <motion.li key={title} initial={reduceMotion ? false : { opacity: 0, x: 14 }} whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.35, delay: index * 0.05 }} className="group relative flex gap-4 sm:gap-6">
                  <div className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-white text-xs font-bold shadow-[0_4px_12px_rgba(40,55,43,0.1)] ${soft} ${ink}`}>{String(index + 1).padStart(2, '0')}</div>
                  <article className="flex-1 rounded-[1.25rem] border border-[#E0E6DE] bg-white/90 p-4 shadow-[0_8px_24px_rgba(43,58,47,0.045)] transition duration-300 group-hover:-translate-y-0.5 group-hover:border-[#BFCFC0] group-hover:shadow-[0_16px_30px_rgba(43,58,47,0.09)] sm:p-5">
                    <div className="flex items-start justify-between gap-4"><div><p className={`text-[9px] font-bold uppercase tracking-[0.18em] ${ink}`}>{journey.path} · 0{index + 1}</p><h3 className="mt-1.5 font-serif-display text-xl font-semibold leading-tight text-[#262A25] sm:text-2xl">{title}</h3></div><span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${soft} ${ink} transition duration-300 group-hover:rotate-6 group-hover:scale-105`}><StepIcon className="h-[18px] w-[18px]" strokeWidth={1.6} aria-hidden="true" /></span></div>
                    <p className="mt-3 max-w-xl text-sm leading-6 text-[#6B746C]">{copy}</p>
                  </article>
                </motion.li>
              ))}
            </ol>
            <div className={`mt-5 ml-14 rounded-2xl border border-dashed px-4 py-3 text-xs leading-5 ${isCoffee ? 'border-[#D9C8B7] bg-[#F7EFE7] text-[#835A3B]' : 'border-[#C7D4C8] bg-[#EDF4ED] text-[#45634F]'}`}>The process is never rushed. It is the quiet work between the milestones that protects the flavour in your cup.</div>
          </div>
        </div>
      </div>
    </section>
  );
};
