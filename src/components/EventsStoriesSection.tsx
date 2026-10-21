import React, { useEffect, useState } from 'react';
import { ArrowUpRight, BookOpen, CalendarDays, Coffee, MapPin, Sparkles, Users, X } from 'lucide-react';

const categories = [
  {
    id: 'events',
    eyebrow: '01 · Gather',
    title: 'Events',
    accent: 'Amber hours',
    description: 'Meet us around the cup at tastings, trade conversations, pop-ups, and moments made for slowing down together.',
    image: '/hero/hero_roastery_cupping.jpg',
    icon: CalendarDays,
    theme: 'bg-[#E9B66F] text-[#2D241E]',
    muted: 'text-[#6F4A25]',
    items: ['Cupping tables', 'Trade tastings', 'Seasonal gatherings'],
    stories: [
      { label: 'A table for curious palates', title: 'What happens at a First Cup cupping', copy: 'A guided tasting that makes room for questions, origin notes, and the small details that shape a memorable cup.' },
      { label: 'On the calendar', title: 'Gather around the next harvest', copy: 'Follow seasonal tastings and trade moments designed to bring growers, makers, and buyers closer together.' },
      { label: 'The ritual', title: 'Why shared cups taste better', copy: 'The best conversations often start with a fresh brew, a little time, and a table with room for one more.' },
    ],
  },
  {
    id: 'activations',
    eyebrow: '02 · Experience',
    title: 'Activations',
    accent: 'Bring the ritual to life',
    description: 'From café collaborations to branded service moments, we help partners turn coffee and tea into memorable experiences.',
    image: '/hero/hero_coffee_beans.jpg',
    icon: Sparkles,
    theme: 'bg-[#C96E32] text-[#FFF8EF]',
    muted: 'text-[#FFE2C6]',
    items: ['Café collaborations', 'Vending moments', 'Menu launches'],
    stories: [
      { label: 'In the field', title: 'Designing a better service moment', copy: 'From the first pour to the last detail, thoughtful activations turn everyday service into a reason to remember.' },
      { label: 'Partner notes', title: 'Coffee that works beyond the counter', copy: 'Explore flexible formats for cafés, offices, hospitality teams, and vending environments.' },
      { label: 'Made together', title: 'The thinking behind a collaboration', copy: 'A closer look at how a shared brief becomes a menu, moment, or experience with its own character.' },
    ],
  },
  {
    id: 'community',
    eyebrow: '03 · Belong',
    title: 'Community',
    accent: 'People behind the cup',
    description: 'A closer look at the growers, makers, teams, and local connections that give every First Cup story its meaning.',
    image: '/hero/hero_tea_harvest.jpg',
    icon: Users,
    theme: 'bg-[#5D6D3C] text-[#F5F2E7]',
    muted: 'text-[#D7E2BD]',
    items: ['Farmer connections', 'Local partnerships', 'Shared knowledge'],
    stories: [
      { label: 'At origin', title: 'The people behind the harvest', copy: 'Meet the care, patience, and knowledge carried through the communities that grow Kenya’s coffee and tea.' },
      { label: 'Shared knowledge', title: 'What a closer connection changes', copy: 'Better conversations at every step help create more thoughtful sourcing, preparation, and service.' },
      { label: 'Local roots', title: 'Small moments, lasting ties', copy: 'Community is built through the everyday details: showing up, listening closely, and making space to grow together.' },
    ],
  },
  {
    id: 'coffee-stories',
    eyebrow: '04 · Explore',
    title: 'Coffee Stories',
    accent: 'Origin in every detail',
    description: 'Follow the journey from highland cherry to considered cup through notes on origin, craft, roast, and the people in between.',
    image: '/hero/hero_highlands.jpg',
    icon: BookOpen,
    theme: 'bg-[#2D241E] text-[#FAF7F2]',
    muted: 'text-[#E8D8C2]/75',
    items: ['Origin notes', 'Roast journals', 'Brew guidance'],
    stories: [
      { label: 'Origin notes', title: 'A highland lot, in its own voice', copy: 'Trace the character of a coffee from altitude and cultivar to process, roast, and the final sip.' },
      { label: 'Roast journal', title: 'Finding the balance in the drum', copy: 'Roasting is a conversation between time, temperature, and the distinct personality of each lot.' },
      { label: 'Brew guidance', title: 'Make room for the details', copy: 'Small changes in grind, water, and pace can open up a whole new way to experience the cup.' },
    ],
  },
];

type Story = (typeof categories)[number]['stories'][number];

export const EventsStoriesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number] | null>(null);

  useEffect(() => {
    if (!activeCategory) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveCategory(null);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeCategory]);

  return (
  <>
  <div className="bg-[#F6F1EA] text-[#2A2522]">
    <section aria-labelledby="events-stories-title" className="relative isolate overflow-hidden bg-[#201611] text-[#FAF7F2]">
      <img src="/hero/hero_roastery_cupping.jpg" alt="Coffee cupping table at First Cup" className="absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-40" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_25%,rgba(217,160,95,0.28),transparent_34%),linear-gradient(110deg,#201611_12%,rgba(32,22,17,0.78)_55%,rgba(32,22,17,0.45))]" />
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E9B66F]/35 bg-[#E9B66F]/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#F1D6B1]"><Coffee className="h-3.5 w-3.5 text-[#E9B66F]" aria-hidden="true" /> The First Cup journal</div>
          <h1 id="events-stories-title" className="mt-6 max-w-3xl font-serif-display text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-8xl">Events &amp;<br /><span className="text-[#E9B66F]">Stories.</span></h1>
          <p className="mt-6 max-w-xl text-sm leading-7 text-[#F1E4D2]/80 sm:text-base sm:leading-8">The people, places, gatherings, and ideas that make a cup worth remembering—from Kenya’s highlands to the places we share it.</p>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[10px] font-bold uppercase tracking-[0.17em] text-[#F1D6B1]/80"><span className="inline-flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-[#E9B66F]" aria-hidden="true" /> Kenya · Ruiru</span><span className="inline-flex items-center gap-2"><CalendarDays className="h-3.5 w-3.5 text-[#E9B66F]" aria-hidden="true" /> Since 2016</span></div>
        </div>
      </div>
    </section>

    <section aria-label="Events and stories categories" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mb-10 flex flex-col gap-4 border-b border-[#DDD1C2] pb-7 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
        <div><span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A85C16]">Choose your way in</span><h2 className="mt-3 max-w-xl font-serif-display text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl">Four ways to stay close to the cup.</h2></div>
        <p className="max-w-xs text-sm leading-6 text-[#71675D]">A living collection of moments, collaborations, and origin-led stories from First Cup.</p>
      </div>

      <div className="space-y-5 sm:space-y-7">
        {categories.map(({ id, eyebrow, title, accent, description, image, icon: Icon, theme, muted, items }, index) => (
          <article key={id} id={id} className={`group relative isolate overflow-hidden rounded-[1.75rem] ${theme} shadow-[0_16px_45px_rgba(42,37,34,0.1)] ${index % 2 === 1 ? 'lg:ml-16' : 'lg:mr-16'}`}>
            <div className="grid min-h-[22rem] lg:grid-cols-[0.95fr_1.05fr]">
              <div className={`relative min-h-[13rem] overflow-hidden ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" referrerPolicy="no-referrer" />
                <div className={`absolute inset-0 ${index === 0 ? 'bg-[#A85C16]/20' : index === 1 ? 'bg-[#7E3218]/25' : index === 2 ? 'bg-[#40502A]/35' : 'bg-[#17100D]/30'}`} />
                <div className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/25 bg-black/20 backdrop-blur-sm"><Icon className="h-5 w-5 text-white" strokeWidth={1.6} aria-hidden="true" /></div>
              </div>
              <div className={`flex flex-col justify-between p-6 sm:p-8 lg:p-10 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div><div className={`text-[10px] font-bold uppercase tracking-[0.2em] ${muted}`}>{eyebrow}</div><h3 className="mt-4 font-serif-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">{title}</h3><p className={`mt-2 text-xs font-bold uppercase tracking-[0.16em] ${muted}`}>{accent}</p><p className={`mt-6 max-w-lg text-sm leading-7 ${muted}`}>{description}</p></div>
                <div className="mt-8 flex flex-wrap items-end justify-between gap-5 border-t border-current/15 pt-5"><div className="flex flex-wrap gap-x-4 gap-y-2">{items.map((item) => <span key={item} className={`text-[10px] font-bold uppercase tracking-[0.12em] ${muted}`}>{item}</span>)}</div><button type="button" onClick={() => setActiveCategory(categories.find((category) => category.id === id) ?? null)} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] transition hover:gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current">Explore <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></button></div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>

    <section className="border-t border-[#DDD1C2] bg-[#EEE6DB] py-14 sm:py-18 lg:py-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8"><div><span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A85C16]">Have a story to share?</span><h2 className="mt-3 max-w-2xl font-serif-display text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">Bring First Cup to your next gathering.</h2></div><a href="/contact" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#2D241E] px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:-translate-y-0.5 hover:bg-[#49372B]">Start a conversation <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a></div>
    </section>
  </div>
  {activeCategory && (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-[#100D0A]/75 p-4 backdrop-blur-sm" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setActiveCategory(null); }}>
      <div role="dialog" aria-modal="true" aria-labelledby="story-modal-title" className={`relative max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-[1.75rem] ${activeCategory.theme} shadow-[0_30px_100px_rgba(0,0,0,0.45)]`}>
        <button type="button" onClick={() => setActiveCategory(null)} aria-label="Close story panel" className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-current/20 bg-black/10 transition hover:bg-black/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"><X className="h-5 w-5" aria-hidden="true" /></button>
        <div className="p-6 sm:p-9">
          <div className={`text-[10px] font-bold uppercase tracking-[0.2em] ${activeCategory.muted}`}>{activeCategory.eyebrow}</div>
          <h2 id="story-modal-title" className="mt-3 pr-10 font-serif-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">{activeCategory.title}</h2>
          <p className={`mt-3 max-w-xl text-sm leading-7 ${activeCategory.muted}`}>{activeCategory.description}</p>
          <div className="mt-8 grid gap-3">
            {activeCategory.stories.map((story: Story, index: number) => (
              <article key={story.title} className="rounded-2xl border border-current/15 bg-black/[0.08] p-5 sm:p-6">
                <div className="flex items-start gap-4"><span className={`font-serif-display text-2xl ${activeCategory.muted}`}>0{index + 1}</span><div><div className={`text-[10px] font-bold uppercase tracking-[0.16em] ${activeCategory.muted}`}>{story.label}</div><h3 className="mt-2 font-serif-display text-2xl font-semibold leading-tight">{story.title}</h3><p className={`mt-3 text-sm leading-6 ${activeCategory.muted}`}>{story.copy}</p></div></div>
              </article>
            ))}
          </div>
          <a href="/contact" className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] transition hover:gap-3">Talk to the team <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
        </div>
      </div>
    </div>
  )}
  </>
  );
};
