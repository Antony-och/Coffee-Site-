import React from 'react';
import { ArrowRight, Coffee, CupSoda, Droplets, Flame, Hand, Leaf, Mountain, RefreshCw, Sparkles, Sun, Wind } from 'lucide-react';
import { PageView } from '../types';

const coffeeCup = new URL('../assets/images/kenyan_coffee_beans_1786601780276.jpg', import.meta.url).href;

interface AboutSectionProps {
  setCurrentPage: (page: PageView) => void;
}

const coffeeSteps = [
  { title: 'Harvest ripe cherries', copy: 'Carefully select ripe coffee cherries from Kenya’s highland farms.', icon: Hand },
  { title: 'Process the coffee', copy: 'Prepare each lot using its chosen washed or honey-processing method.', icon: Droplets },
  { title: 'Dry and grade', copy: 'Dry the coffee on raised beds, then sort the green beans by quality and grade.', icon: Sun },
  { title: 'Roast in small batches', copy: 'Roast to bring out the character of each coffee lot.', icon: Flame },
  { title: 'Grind and brew', copy: 'Brew the roasted coffee with your preferred method, from filter to espresso.', icon: Coffee },
];

const teaSteps = [
  { title: 'Pick fresh leaves', copy: 'Select tender tea leaves and buds from Kenya’s tea-growing regions.', icon: Leaf },
  { title: 'Wither the leaf', copy: 'Allow fresh leaves to soften as some moisture is gently reduced.', icon: Wind },
  { title: 'Roll or cut', copy: 'Shape the leaf by rolling or CTC processing, depending on the tea style.', icon: RefreshCw },
  { title: 'Finish by style', copy: 'Oxidation and drying vary across black, green, and purple teas.', icon: Sparkles },
  { title: 'Steep and enjoy', copy: 'Steep the prepared tea to draw out its aroma, colour, and flavour.', icon: CupSoda },
];

const journeys = [
  {
    id: 'coffee-process',
    name: 'Coffee',
    path: 'Bean to cup',
    icon: Coffee,
    intro: 'From ripe cherry to a carefully roasted cup.',
    steps: coffeeSteps,
    iconStyle: 'bg-[#F5EBDD] text-[#92551F]',
    numberStyle: 'bg-[#F5EBDD] text-[#92551F]',
  },
  {
    id: 'tea-process',
    name: 'Tea',
    path: 'Leaf to cup',
    icon: Leaf,
    intro: 'From fresh leaf to a cup shaped by its tea style.',
    steps: teaSteps,
    iconStyle: 'bg-[#E9EFE2] text-[#536C3B]',
    numberStyle: 'bg-[#E9EFE2] text-[#536C3B]',
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

      <section aria-labelledby="journey-title" className="relative mt-14 overflow-hidden rounded-[2rem] border border-[#3A2B22] bg-[#241713] px-5 py-8 text-[#F7F1E8] shadow-[0_24px_60px_rgba(42,37,34,0.14)] sm:mt-16 sm:px-8 sm:py-10 lg:px-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-28 h-64 w-64 rounded-full bg-[#D99A54]/10 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-[#70834E]/10 blur-3xl" />

        <div className="relative flex flex-col gap-3 border-b border-white/10 pb-6 sm:pb-7 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-xl border border-[#D6A36A]/20 bg-[#33251D]/80 px-2.5 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#D6A36A]/15 text-[#E4B574]">
                <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.17em] text-[#E4B574]">The process</span>
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[#D99A54]" />
              <span className="text-[9px] font-semibold uppercase tracking-[0.1em] text-[#E1D2C5]">Step by step</span>
            </div>
            <h3 id="journey-title" className="font-serif-display text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              From harvest to cup
            </h3>
          </div>
          <p className="max-w-xl text-sm leading-6 text-[#D8CBBF]">
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
				  className={`rounded-[1.5rem] border p-4 sm:p-5 ${isCoffee ? 'border-white/10 border-l-2 border-l-[#D9A05F] bg-white/[0.035]' : 'border-[#527046]/55 border-l-2 border-l-[#90B77B] bg-[#20351E]'}`}
				>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
                  <div className="flex items-center gap-3">
                    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${iconStyle}`}>
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#C7B8A9]">{path}</p>
                      <h4 id={`${id}-title`} className="font-serif-display text-xl font-bold text-white">{name}</h4>
                    </div>
                  </div>
                  <p className="text-xs leading-5 text-[#CFC1B4] sm:max-w-xs sm:text-right">{intro}</p>
                </div>

                <div className="relative mt-5">
				  <div aria-hidden="true" className={`pointer-events-none absolute left-[8%] right-[8%] top-7 hidden h-px xl:block ${isCoffee ? 'bg-white/15' : 'bg-[#8AAE77]/35'}`} />
				  <ol className="relative grid gap-2.5 sm:grid-cols-2 xl:grid-cols-5 xl:gap-3">
                    {steps.map(({ title, copy, icon: StepIcon }, index) => (
                      <li key={title} className={`rounded-xl border p-3.5 sm:min-h-[9rem] ${isCoffee ? 'border-white/[0.08] bg-[#2A1E18]' : 'border-[#53764A]/45 bg-[#2B4527]'}`}>
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2.5">
                            <span aria-hidden="true" className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[9px] font-bold ${numberStyle}`}>
                              {String(index + 1).padStart(2, '0')}
                            </span>
                            <span className="text-[8px] font-bold uppercase tracking-[0.16em] text-[#BBAA99]">Step {index + 1}</span>
                          </div>
                          <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${isCoffee ? 'bg-[#D9A05F]/15 text-[#E4B574]' : 'bg-[#90B77B]/20 text-[#B6D39A]'}`}>
                            <StepIcon className="h-4 w-4" aria-hidden="true" />
                          </span>
                        </div>
                        <h5 className="mt-3 text-sm font-semibold leading-5 text-white">{title}</h5>
                        <p className="mt-1.5 text-[11px] leading-[1.6] text-[#D2C5B9]">{copy}</p>
                      </li>
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
