import React from 'react';
import { ArrowLeft, ArrowRight, Coffee } from 'lucide-react';
import type { PageView } from '../types';

interface CoffeeTypesPageProps {
  setCurrentPage: (page: PageView) => void;
}

const COFFEE_TYPES = [
  {
    name: 'Americano',
    build: 'Espresso · hot water',
    description: 'Espresso topped with hot water for a smooth, rich cup with a lighter body.',
    image: '/coffee-types/americano-cup.webp',
    numberTone: 'bg-[#F2E6D7] text-[#8A542E]',
    iconTone: 'bg-[#F8EFE5] text-[#9B5B2C]',
  },
  {
    name: 'Latte',
    build: 'Espresso · steamed milk',
    description: 'Espresso softened with steamed milk and finished with a thin layer of silky foam.',
    image: '/coffee-types/latte-art.webp',
    numberTone: 'bg-[#E8ECDD] text-[#456044]',
    iconTone: 'bg-[#EEF2E9] text-[#456044]',
  },
  {
    name: 'Cappuccino',
    build: 'Espresso · milk · foam',
    description: 'A balanced espresso drink with steamed milk and a generous cap of airy foam.',
    image: '/hero/hero_first_cup_mug.webp',
    numberTone: 'bg-[#F0E7D6] text-[#8A652B]',
    iconTone: 'bg-[#F6F0E4] text-[#8A652B]',
  },
  {
    name: 'Mocha',
    build: 'Espresso · chocolate · milk',
    description: 'Espresso meets chocolate and steamed milk for a rich, gently sweet cup.',
    image: '/hero/hero_coffee_beans.jpg',
    numberTone: 'bg-[#EDE0DC] text-[#784539]',
    iconTone: 'bg-[#F3E9E6] text-[#784539]',
  },
  {
    name: 'Espresso',
    build: 'A concentrated coffee shot',
    description: 'A small, concentrated serving of coffee with a bold aroma and intense finish.',
    image: '/coffee-types/espresso-pull.webp',
    numberTone: 'bg-[#E4E1D9] text-[#4F493D]',
    iconTone: 'bg-[#EFEEE9] text-[#4F493D]',
  },
] as const;

export const CoffeeTypesPage: React.FC<CoffeeTypesPageProps> = ({ setCurrentPage }) => (
  <section
    aria-labelledby="coffee-types-title"
    className="relative isolate min-h-screen overflow-hidden bg-[#F3EEE6] px-4 py-6 sm:py-10"
  >
    <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-32 h-64 w-64 rounded-full border-[22px] border-[#D6C2AD]/25" />
    <div aria-hidden="true" className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[#D8E3D5]/35 blur-3xl" />

    <div className="relative mx-auto max-w-5xl">
      <header className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => setCurrentPage('vcard')}
          className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#D8CABB] bg-[#FFFCF8]/80 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.11em] text-[#514840] transition hover:border-[#34503B]/50 hover:text-[#34503B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A85C16]"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Back to digital card
        </button>
        <span className="hidden text-[9px] font-bold uppercase tracking-[0.16em] text-[#766C63] sm:block">
          First Cup Coffee &amp; Tea
        </span>
      </header>

      <section className="relative mt-5 overflow-hidden rounded-[1.75rem] bg-[#34503B] px-5 py-7 text-white shadow-[0_18px_48px_rgba(52,80,59,0.16)] sm:mt-7 sm:rounded-[2rem] sm:px-9 sm:py-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-8 -top-16 h-60 w-60 rounded-full border-[24px] border-white/[0.06] sm:right-10 sm:top-1/2 sm:h-64 sm:w-64 sm:-translate-y-1/2" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-16 right-24 h-40 w-40 rounded-full bg-[#D9A05F]/15 blur-3xl" />
        <div className="relative z-10 max-w-2xl">
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#F1C98E]">A quick coffee guide</p>
          <h1 id="coffee-types-title" className="mt-3 font-serif-display text-4xl font-semibold leading-[1.03] tracking-[-0.04em] sm:text-5xl">
            Types of Coffee
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-white/75 sm:text-base">
            Five café favourites, from a short, concentrated espresso to smooth, milk-softened classics.
          </p>
        </div>
        <Coffee className="pointer-events-none absolute -bottom-7 right-5 h-36 w-36 -rotate-12 text-white/[0.09] sm:bottom-0 sm:right-14 sm:h-48 sm:w-48" strokeWidth={1.1} aria-hidden="true" />
      </section>

      <div className="mt-7 flex items-end justify-between gap-4 sm:mt-9">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#A85C16]">The coffee menu, made simple</p>
          <p className="mt-1 max-w-2xl text-xs leading-5 text-[#766C63] sm:text-sm">
            Each drink starts with coffee; what is added gives it a different character.
          </p>
        </div>
        <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-[#81766C]">01 — 05</span>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {COFFEE_TYPES.map((drink, index) => {
          const preserveImageRatio = drink.name === 'Espresso' || drink.name === 'Latte';
          const imageAlt = drink.name === 'Espresso'
            ? 'Fresh espresso flowing from a portafilter into a white cup'
          : drink.name === 'Latte'
              ? 'Latte art in a white cup on a saucer'
              : `${drink.name} coffee`;

          return (
            <article
              key={drink.name}
              className="group overflow-hidden rounded-[1.5rem] border border-[#E2D7CA] bg-[#FFFCF8] shadow-[0_8px_24px_rgba(42,30,21,0.04)] transition duration-200 hover:-translate-y-0.5 hover:border-[#A85C16]/35 hover:shadow-[0_14px_32px_rgba(42,30,21,0.08)]"
            >
              <div className="relative h-36 overflow-hidden bg-[#3A2A20] sm:h-40">
                {preserveImageRatio && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 scale-110 bg-cover bg-center bg-no-repeat opacity-75 blur-xl"
                    style={{ backgroundImage: `url(${drink.image})` }}
                  />
                )}
                <img
                  src={drink.image}
                  alt={imageAlt}
                  className={`relative h-full w-full transition duration-500 ${preserveImageRatio ? 'object-contain' : 'object-cover group-hover:scale-105'}`}
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A211B]/65 via-transparent to-transparent" />
              </div>
              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className={`inline-flex h-8 min-w-8 items-center justify-center rounded-full px-2 text-[9px] font-bold tracking-[0.12em] ${drink.numberTone}`}>
                    0{index + 1}
                  </span>
                  <span className="text-right text-[8px] font-bold uppercase tracking-[0.11em] text-[#81766C] sm:text-[9px]">
                    {drink.build}
                  </span>
                </div>
                <span className={`mt-5 flex h-11 w-11 items-center justify-center rounded-2xl ${drink.iconTone}`}>
                  <Coffee className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <h2 className="mt-4 font-serif-display text-2xl font-semibold tracking-[-0.025em] text-[#2A2522]">
                  {drink.name}
                </h2>
                <p className="mt-2 text-xs leading-6 text-[#766C63] sm:text-[13px]">
                  {drink.description}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      <section className="mt-5 flex flex-col gap-4 rounded-[1.5rem] border border-[#E2D7CA] bg-white/75 p-5 sm:mt-6 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#A85C16]">Find your next favourite</p>
          <h2 className="mt-1 font-serif-display text-xl font-semibold text-[#2A2522]">Ready to explore our coffee?</h2>
          <p className="mt-1 text-xs leading-5 text-[#766C63]">Browse Kenyan coffees and their roast specifications.</p>
        </div>
        <button
          type="button"
          onClick={() => setCurrentPage('coffee')}
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-[#34503B] px-5 py-3 text-[9px] font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#293F2F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A85C16]"
        >
          Explore coffee catalog
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </section>
    </div>
  </section>
);
