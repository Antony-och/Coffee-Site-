import React from 'react';
import { ArrowRight, Coffee, Leaf, Mountain } from 'lucide-react';
import { COFFEE_PRODUCTS } from '../data/coffeeData';
import { TEA_PRODUCTS } from '../data/teaData';
import { SITE_ASSETS } from '../data/siteAssets';
import type { PageView } from '../types';
import { HeroSlideshow } from './HeroSlideshow';
import { WhyChooseSection } from './WhyChooseSection';

interface HomePageProps {
  setCurrentPage: (page: PageView) => void;
}

const featuredCoffee = COFFEE_PRODUCTS.find((product) => product.isFeatured) ?? COFFEE_PRODUCTS[0];
const featuredTea = TEA_PRODUCTS.find((product) => product.isFeatured) ?? TEA_PRODUCTS[0];

export const HomePage: React.FC<HomePageProps> = ({ setCurrentPage }) => {
  // EDITABLE CONTENT: Home collection cards. Change copy here and image paths in src/data/siteAssets.ts.
  const collections = [
    {
      id: 'coffee',
      page: 'coffee' as const,
      icon: <Coffee className="h-4 w-4" aria-hidden="true" />,
      category: `Kenyan coffee · Grade ${featuredCoffee.grade}`,
      name: 'Premium Coffee',
      detail: featuredCoffee.subTitle,
      origin: featuredCoffee.region,
      image: SITE_ASSETS.home.premiumCoffeeCollection,
      cta: 'Explore coffee',
    },
    {
      id: 'tea',
      page: 'tea' as const,
      icon: <Leaf className="h-4 w-4" aria-hidden="true" />,
      category: `Kenyan tea · ${featuredTea.type}`,
      name: featuredTea.name,
      detail: featuredTea.subTitle,
      origin: featuredTea.origin,
      image: SITE_ASSETS.home.premiumTeaCollection,
      cta: 'Explore tea',
    },
  ];

  return (
    <>
      {/* HOME HERO: slide content lives in src/data/companyData.ts. */}
      <section id="home" aria-label="Home">
        <HeroSlideshow setCurrentPage={setCurrentPage} />
      </section>

      {/* HOME COLLECTIONS: featured coffee and tea cards. */}
      <section aria-labelledby="home-collections-title" className="bg-[#FAF7F2] py-16 text-[#2A2522] sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-9 flex flex-col gap-5 sm:mb-12 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#A85C16]/15 bg-[#A85C16]/[0.06] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#835A3B]">
                <Mountain className="h-3.5 w-3.5" aria-hidden="true" />
                From Kenya’s highlands
              </span>
              <h2 id="home-collections-title" className="mt-4 font-serif-display text-3xl font-semibold leading-[1.08] tracking-[-0.035em] sm:text-4xl lg:text-5xl">
                Two harvests.<br className="hidden sm:block" /> One memorable cup.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-[#68615A] sm:text-base">
                Discover distinctive Kenyan coffee and tea, thoughtfully selected from highland-growing communities.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 md:gap-6">
            {collections.map((collection) => (
              <button
                key={collection.id}
                type="button"
                onClick={() => setCurrentPage(collection.page)}
                className="group relative isolate min-h-[23rem] overflow-hidden rounded-[1.75rem] bg-[#2D241E] text-left shadow-[0_18px_50px_rgba(42,37,34,0.14)] transition-transform duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A85C16] sm:min-h-[27rem]"
              >
                <img
                  src={collection.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#17100D]/95 via-[#17100D]/45 to-[#17100D]/10" />
                <span className="relative z-10 flex min-h-[23rem] h-full flex-col justify-between p-5 text-white sm:min-h-[27rem] sm:p-7 lg:p-8">
                  <span className="flex flex-wrap items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#17100D]/45 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm sm:text-[10px]">
                      {collection.icon}
                      {collection.category}
                    </span>
                    <span className="rounded-full border border-white/20 bg-[#17100D]/40 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#F3D4A6] backdrop-blur-sm">
                      Price on request
                    </span>
                  </span>

                  <span className="block max-w-lg">
                    <span className="block text-[10px] font-bold uppercase tracking-[0.19em] text-[#F3B867]">{collection.origin}</span>
                    <span className="mt-2 block font-serif-display text-3xl font-semibold leading-tight sm:text-4xl">{collection.name}</span>
                    <span className="mt-3 block max-w-md text-sm leading-6 text-white/80">{collection.detail}</span>
                    <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-white">
                      {collection.cta}
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* HOME STORY: About Us bridge and company proof points. */}
      <section aria-labelledby="home-story-title" className="relative isolate overflow-hidden bg-[#2D241E] py-14 text-[#FAF7F2] sm:py-16 lg:py-20">
        <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-24 h-80 w-80 rounded-full border-[24px] border-white/[0.035]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#E9B977]/25 bg-white/[0.04] px-3.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-[#E9B977] sm:text-[10px]">
                <Mountain className="h-3.5 w-3.5" aria-hidden="true" />
                Kenyan-owned · Since 2016
              </span>
              <h2 id="home-story-title" className="mt-5 font-serif-display text-4xl font-medium leading-[1.02] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                Rooted in the highlands.<br />
                <span className="text-[#E9B977]">Made to be shared.</span>
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-[#E8D8C2]/80 sm:text-base sm:leading-8">
                First Cup brings people closer to the origins of their coffee and tea, with a story shaped by Kenya’s growing communities.
              </p>
              <div className="mt-7 flex flex-wrap gap-3 sm:mt-8">
                <button
                  type="button"
                  onClick={() => setCurrentPage('about')}
                  className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#D9A05F] px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-[#241713] transition hover:bg-[#E8B978] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Our story
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage('contact')}
                  className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/25 bg-white/[0.03] px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white transition hover:border-white/50 hover:bg-white/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Talk to our team
                </button>
              </div>
            </div>

            <figure className="group relative isolate min-h-[18rem] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#17100D] shadow-[0_24px_60px_rgba(0,0,0,0.25)] sm:min-h-[24rem] sm:rounded-[2rem] lg:min-h-[27rem]">
              <img
                src="/hero/hero_coffee_harvest.jpg"
                alt="A coffee grower harvesting ripe cherries among green highland plants."
                loading="lazy"
                referrerPolicy="no-referrer"
                className="absolute inset-0 h-full w-full object-cover object-[62%_center] transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#17100D]/85 via-[#17100D]/10 to-[#17100D]/15" />
              <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-3 p-4 sm:p-5">
                <span className="rounded-full border border-white/25 bg-[#17100D]/40 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm">From the harvest</span>
                <span className="rounded-full border border-white/25 bg-[#17100D]/40 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#F3D4A6] backdrop-blur-sm">Kenya</span>
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#E9B977]">People · place · purpose</span>
                <p className="mt-2 max-w-sm font-serif-display text-xl font-semibold leading-tight text-white sm:text-2xl">A closer connection to every harvest.</p>
              </figcaption>
            </figure>
          </div>

          <dl className="mt-9 grid divide-y divide-white/15 border-y border-white/15 sm:mt-11 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <div className="flex items-center justify-between gap-4 py-3.5 sm:block sm:px-5 sm:py-5 sm:first:pl-0">
              <dt className="text-[9px] font-semibold uppercase tracking-[0.1em] text-[#E8D8C2]/65 sm:mt-1 sm:text-[10px]">Growing altitude</dt>
              <dd className="font-serif-display text-xl font-bold text-[#E9B977] sm:text-2xl">1,700–2,400m</dd>
            </div>
            <div className="flex items-center justify-between gap-4 py-3.5 sm:block sm:px-5 sm:py-5">
              <dt className="text-[9px] font-semibold uppercase tracking-[0.1em] text-[#E8D8C2]/65 sm:mt-1 sm:text-[10px]">Smallholder farmers</dt>
              <dd className="font-serif-display text-xl font-bold text-[#E9B977] sm:text-2xl">12,400+</dd>
            </div>
            <div className="flex items-center justify-between gap-4 py-3.5 sm:block sm:px-5 sm:py-5 sm:last:pr-0">
              <dt className="text-[9px] font-semibold uppercase tracking-[0.1em] text-[#E8D8C2]/65 sm:mt-1 sm:text-[10px]">Kenyan-owned</dt>
              <dd className="font-serif-display text-xl font-bold text-[#E9B977] sm:text-2xl">Since 2016</dd>
            </div>
          </dl>
        </div>
      </section>

      <WhyChooseSection onOpenAbout={() => setCurrentPage('about')} />
    </>
  );
};
