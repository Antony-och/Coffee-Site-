import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, CalendarDays, Coffee, MapPin, Sparkles, Users, X } from 'lucide-react';
import { EVENT_STORY_POSTS, STORY_CATEGORY_ORDER, type StoryCategory, type StoryPost } from '../data/eventsStoriesData';

const CATEGORY_CONFIG: Record<StoryCategory, { icon: React.ElementType; shortLabel: string; className: string; tagClassName: string; accentClassName: string }> = {
  Events: {
    icon: CalendarDays,
    shortLabel: 'Gather',
    className: 'bg-[#E9B66F] text-[#2D241E]',
    tagClassName: 'border-[#8E5E2A]/20 bg-[#F4D49E] text-[#6F4A25]',
    accentClassName: 'text-[#8B5B26]',
  },
  Activations: {
    icon: Sparkles,
    shortLabel: 'Experience',
    className: 'bg-[#C96E32] text-[#FFF8EF]',
    tagClassName: 'border-[#FFE2C6]/25 bg-[#A94F23] text-[#FFE2C6]',
    accentClassName: 'text-[#FFE2C6]',
  },
  Community: {
    icon: Users,
    shortLabel: 'Belong',
    className: 'bg-[#5D6D3C] text-[#F5F2E7]',
    tagClassName: 'border-[#D7E2BD]/25 bg-[#46562C] text-[#D7E2BD]',
    accentClassName: 'text-[#D7E2BD]',
  },
  'Coffee Stories': {
    icon: BookOpen,
    shortLabel: 'Explore',
    className: 'bg-[#2D241E] text-[#FAF7F2]',
    tagClassName: 'border-[#E8D8C2]/20 bg-[#453329] text-[#E8D8C2]',
    accentClassName: 'text-[#E9B977]',
  },
};

const formatDate = (date: string) => new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(`${date}T12:00:00`));

const PostMeta: React.FC<{ post: StoryPost; muted?: boolean }> = ({ post, muted = false }) => {
  const config = CATEGORY_CONFIG[post.category];
  const detail = post.category === 'Events' ? post.eventDate : post.category === 'Activations' ? post.partner : post.category === 'Community' ? post.location : post.origin;
  const DetailIcon = post.category === 'Events' || post.category === 'Community' ? MapPin : Coffee;
  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-bold uppercase tracking-[0.13em] ${muted ? 'text-current/65' : config.accentClassName}`}>
      <span>{formatDate(post.date)}</span>
      <span className="h-1 w-1 rounded-full bg-current/40" aria-hidden="true" />
      <span>{post.readTime}</span>
      {detail && <><span className="h-1 w-1 rounded-full bg-current/40" aria-hidden="true" /><span className="inline-flex items-center gap-1.5"><DetailIcon className="h-3 w-3" aria-hidden="true" />{detail}</span></>}
    </div>
  );
};

const PostCard: React.FC<{ post: StoryPost; onOpen: (post: StoryPost) => void; featured?: boolean }> = ({ post, onOpen, featured = false }) => {
  const config = CATEGORY_CONFIG[post.category];
  const Icon = config.icon;
  return (
    <article className={`group overflow-hidden rounded-[1.5rem] border border-[#E4D9CB] bg-[#FFFCF8] shadow-[0_12px_35px_rgba(42,37,34,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(42,37,34,0.1)] ${featured ? 'lg:grid lg:grid-cols-[1.1fr_0.9fr]' : ''}`}>
      <div className={`relative overflow-hidden ${featured ? 'min-h-[18rem] lg:min-h-full' : 'aspect-[1.45/1]'}`}>
        <div className="grid h-full grid-cols-[1.45fr_0.85fr] gap-1 bg-[#E7D9C8]">
          <img src={post.images[0]} alt="" className="h-full min-h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" referrerPolicy="no-referrer" />
          <div className="grid grid-rows-2 gap-1">
            {post.images.slice(1, 3).map((image) => <img key={image} src={image} alt="" className="h-full min-h-0 w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" referrerPolicy="no-referrer" />)}
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#17100D]/55 via-transparent to-transparent" />
        <span className={`absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.15em] backdrop-blur-sm ${config.tagClassName}`}><Icon className="h-3 w-3" aria-hidden="true" />{post.category}</span>
      </div>
      <div className={`flex flex-col justify-between p-5 ${featured ? 'sm:p-7 lg:p-9' : 'sm:p-6'}`}>
        <div><PostMeta post={post} /><h3 className={`mt-4 font-serif-display font-semibold leading-[1.04] tracking-[-0.03em] ${featured ? 'text-3xl sm:text-4xl' : 'text-2xl'}`}>{post.title}</h3><p className="mt-4 text-sm leading-6 text-[#71675D]">{post.excerpt}</p></div>
        <button type="button" onClick={() => onOpen(post)} className="mt-7 inline-flex w-fit items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#A85C16] transition hover:gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A85C16]">Read story <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></button>
      </div>
    </article>
  );
};

export const EventsStoriesSection: React.FC = () => {
  // EDITABLE CONTENT: add or update posts in src/data/eventsStoriesData.ts.
  const [activeCategory, setActiveCategory] = useState<'All' | StoryCategory>('All');
  const [activePost, setActivePost] = useState<StoryPost | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const posts = useMemo(() => [...EVENT_STORY_POSTS].sort((a, b) => b.date.localeCompare(a.date)), []);
  const filteredPosts = activeCategory === 'All' ? posts : posts.filter((post) => post.category === activeCategory);
  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);
  const openPost = (post: StoryPost) => {
    setActivePost(post);
    setActiveImageIndex(0);
  };

  useEffect(() => {
    if (!activePost) return;
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') setActivePost(null); };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', handleKeyDown); };
  }, [activePost]);

  return (
    <div className="bg-[#F6F1EA] text-[#2A2522]">
      <section aria-labelledby="events-stories-title" className="relative isolate overflow-hidden bg-[#201611] text-[#FAF7F2]">
        <img src="/hero/events-stories-hero.png" alt="First Cup coffee cup surrounded by roasted coffee beans" className="absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-40" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_25%,rgba(217,160,95,0.28),transparent_34%),linear-gradient(110deg,#201611_12%,rgba(32,22,17,0.78)_55%,rgba(32,22,17,0.45))]" />
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32"><div className="max-w-3xl"><div className="inline-flex items-center gap-2 rounded-full border border-[#E9B66F]/35 bg-[#E9B66F]/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#F1D6B1]"><Coffee className="h-3.5 w-3.5 text-[#E9B66F]" aria-hidden="true" /> The First Cup journal</div><h1 id="events-stories-title" className="mt-6 max-w-3xl font-serif-display text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-8xl">Events &amp;<br /><span className="text-[#E9B66F]">Stories.</span></h1><p className="mt-6 max-w-xl text-sm leading-7 text-[#F1E4D2]/80 sm:text-base sm:leading-8">A living feed of gatherings, collaborations, community notes, and coffee stories from Kenya’s highlands to every place we share the cup.</p><div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[10px] font-bold uppercase tracking-[0.17em] text-[#F1D6B1]/80"><span className="inline-flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-[#E9B66F]" aria-hidden="true" /> Kenya · Ruiru</span><span className="inline-flex items-center gap-2"><CalendarDays className="h-3.5 w-3.5 text-[#E9B66F]" aria-hidden="true" /> Newest first</span></div></div></div>
      </section>

      {/* JOURNAL FEED: category filters, newest-first sorting, and reusable post cards. */}
      <section aria-labelledby="journal-feed-title" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mb-9 flex flex-col gap-6 border-b border-[#DDD1C2] pb-8 lg:flex-row lg:items-end lg:justify-between"><div><span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A85C16]">The journal</span><h2 id="journal-feed-title" className="mt-3 font-serif-display text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl">Stories worth staying for.</h2></div><div role="tablist" aria-label="Filter stories by category" className="flex max-w-full flex-wrap gap-2">{(['All', ...STORY_CATEGORY_ORDER] as const).map((category) => { const isActive = activeCategory === category; const config = category === 'All' ? null : CATEGORY_CONFIG[category]; const Icon = config?.icon; return <button key={category} type="button" role="tab" aria-selected={isActive} onClick={() => setActiveCategory(category)} className={`inline-flex min-h-10 items-center gap-2 rounded-full border px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.12em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A85C16] ${isActive ? category === 'All' ? 'border-[#2D241E] bg-[#2D241E] text-white' : `${config?.className} border-transparent` : 'border-[#D8CCBD] bg-white/60 text-[#756B62] hover:border-[#A85C16]/50 hover:text-[#2D241E]'}`}>{Icon && <Icon className="h-3.5 w-3.5" aria-hidden="true" />}{category}</button>; })}</div></div>

        <div className="mb-7 flex items-center justify-between gap-4"><p className="text-sm text-[#756B62]">Showing <span className="font-semibold text-[#2D241E]">{activeCategory === 'All' ? 'all stories' : activeCategory}</span> · {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}</p><p className="hidden text-[10px] font-bold uppercase tracking-[0.15em] text-[#A85C16] sm:block">Newest first</p></div>

        {featuredPost ? <><PostCard post={featuredPost} onOpen={openPost} featured /><div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{remainingPosts.map((post) => <PostCard key={post.id} post={post} onOpen={openPost} />)}</div></> : <div className="rounded-2xl border border-dashed border-[#CFC0AE] bg-white/60 p-10 text-center"><p className="font-serif-display text-2xl">No stories in this category yet.</p><p className="mt-2 text-sm text-[#756B62]">New posts will appear here as the journal grows.</p></div>}
      </section>

      <section className="border-t border-[#DDD1C2] bg-[#EEE6DB] py-14 sm:py-18 lg:py-20"><div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8"><div><span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A85C16]">Have a story to share?</span><h2 className="mt-3 max-w-2xl font-serif-display text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">Bring First Cup to your next gathering.</h2></div><a href="/contact" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#2D241E] px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:-translate-y-0.5 hover:bg-[#49372B]">Start a conversation <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a></div></section>

      {/* POST SLIDESHOW: image gallery, controls, thumbnails, and story detail. */}
      {activePost && <div className="fixed inset-0 z-[90] flex items-center justify-center bg-[#100D0A]/75 p-4 backdrop-blur-sm" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setActivePost(null); }}><div role="dialog" aria-modal="true" aria-labelledby="post-dialog-title" className="relative max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-[1.75rem] bg-[#FFFCF8] text-[#2D241E] shadow-[0_30px_100px_rgba(0,0,0,0.45)]"><button type="button" onClick={() => setActivePost(null)} aria-label="Close post" className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-[#201611]/70 text-white transition hover:bg-[#201611] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"><X className="h-5 w-5" aria-hidden="true" /></button><div className="relative h-56 bg-[#E7D9C8] sm:h-72"><img src={activePost.images[activeImageIndex]} alt={`${activePost.title} image ${activeImageIndex + 1}`} className="h-full w-full object-cover" /><button type="button" onClick={() => setActiveImageIndex((index) => (index - 1 + activePost.images.length) % activePost.images.length)} aria-label="Previous post image" className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-[#201611]/65 text-white backdrop-blur-sm transition hover:bg-[#201611] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"><ArrowLeft className="h-4 w-4" aria-hidden="true" /></button><button type="button" onClick={() => setActiveImageIndex((index) => (index + 1) % activePost.images.length)} aria-label="Next post image" className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-[#201611]/65 text-white backdrop-blur-sm transition hover:bg-[#201611] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"><ArrowRight className="h-4 w-4" aria-hidden="true" /></button><span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-[#201611]/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white backdrop-blur-sm">{activeImageIndex + 1} / {activePost.images.length}</span></div><div className="flex gap-1.5 bg-[#2D241E] p-2">{activePost.images.map((image, index) => <button key={image} type="button" onClick={() => setActiveImageIndex(index)} aria-label={`Show post image ${index + 1}`} aria-pressed={activeImageIndex === index} className={`h-12 flex-1 overflow-hidden rounded-lg border-2 transition ${activeImageIndex === index ? 'border-[#E9B66F]' : 'border-transparent opacity-65 hover:opacity-100'}`}><img src={image} alt="" className="h-full w-full object-cover" /></button>)}</div><div className="p-6 sm:p-9"><div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.15em] ${CATEGORY_CONFIG[activePost.category].tagClassName}`}>{React.createElement(CATEGORY_CONFIG[activePost.category].icon, { className: 'h-3 w-3', 'aria-hidden': true })}{activePost.category}</div><PostMeta post={activePost} /><h2 id="post-dialog-title" className="mt-4 font-serif-display text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl">{activePost.title}</h2><p className="mt-5 text-base leading-8 text-[#5E554D]">{activePost.body}</p><div className="mt-8 border-t border-[#E5D9CC] pt-5"><a href="/contact" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#A85C16]">Talk to the team <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a></div></div></div></div>}
    </div>
  );
};
