export type StoryCategory = 'Events' | 'Activations' | 'Community' | 'Coffee Stories';

export interface StoryPost {
  id: string;
  category: StoryCategory;
  title: string;
  date: string;
  excerpt: string;
  body: string;
  images: string[];
  readTime: string;
  location?: string;
  eventDate?: string;
  partner?: string;
  origin?: string;
}

export const STORY_CATEGORY_ORDER: StoryCategory[] = ['Events', 'Activations', 'Community', 'Coffee Stories'];

/** Add future posts here. The feed automatically sorts every post newest first and uses the same gallery/card/detail template. */
export const EVENT_STORY_POSTS: StoryPost[] = [
  {
    id: 'nyayo-stadium-vvip-coffee-experience',
    category: 'Events',
    title: 'First Cup Coffee & Tea Takes the Coffee Experience to the VVIP Section at Nyayo Stadium',
    date: '2026-11-11',
    excerpt: 'A special opportunity to showcase quality Kenyan coffee at the CAF Confederation Cup clash between Tusker FC and Singida Black Stars FC.',
    body: `Some opportunities are more than just business engagements — they are moments that allow a brand to step into new spaces, connect with new audiences, and showcase what it does best.

For First Cup Coffee & Tea, one such memorable opportunity came at Nyayo National Stadium in Nairobi, where we had the privilege of vending coffee in the VVIP section during the CAF Confederation Cup second qualifying round encounter between Kenya's Tusker FC and Tanzania's Singida Black Stars FC.

A Special Matchday Experience

The occasion brought together the excitement of African football and the atmosphere of one of Kenya's major sporting venues. With football fans, distinguished guests, and VIP attendees gathering for this continental fixture, it was an exciting opportunity for First Cup Coffee & Tea to be part of the matchday experience.

Being selected to serve in the VVIP section was a proud moment for our team. It gave us an opportunity to bring our coffee experience into a premium sporting environment and introduce our brand to a different audience.

Bringing Great Coffee to the Game

At First Cup Coffee & Tea, we believe great coffee belongs everywhere — from homes and offices to hospitality spaces and major events.

Our participation at Nyayo Stadium reflected this belief. Beyond vending coffee, we were proud to represent a Kenyan coffee brand in an environment where quality, hospitality, and memorable experiences come together.

It was also an opportunity to demonstrate the versatility of our coffee offering and our interest in serving different occasions, audiences, and event settings.

Beyond the Football Pitch

The CAF Confederation Cup fixture was more than a football match for us. It was an opportunity to build connections, increase brand visibility, and gain valuable experience in event-based coffee service.

Being part of an event of this calibre reinforces our ambition to take First Cup Coffee & Tea into more corporate gatherings, sporting events, hospitality spaces, and premium experiences.

We are grateful for the opportunity and proud of our team for representing the brand.

More Experiences. More Connections. More Coffee.

From the farm to the cup, and now to major sporting occasions, our journey continues to create opportunities to share the quality and experience of coffee.

This is one of the many experiences that remind us why we do what we do.

First Cup Coffee & Tea — Bringing people together, one cup at a time.

For event vending, corporate coffee services, and partnership opportunities, get in touch with our team.

Let's make your next event a memorable coffee experience.`,
    images: ['/hero/hero_first_cup_coffee_cups.webp', '/hero/hero_roastery_cupping.jpg', '/hero/hero_coffee_beans.jpg'],
    readTime: '5 min read',
    eventDate: 'CAF Confederation Cup matchday · Nyayo National Stadium',
  },
  {
    id: 'first-cup-cupping-table',
    category: 'Events',
    title: 'A table for curious palates',
    date: '2026-10-14',
    excerpt: 'What happens at a First Cup cupping, and why the best tasting notes often begin with a good question.',
    body: 'A cupping table is an invitation to slow down. We taste side by side, compare how a lot changes as it cools, and make space for the questions that turn a product detail into a real sense of place.',
    images: ['/hero/hero_roastery_cupping.jpg', '/hero/hero_coffee_beans.jpg', '/hero/hero_highlands.jpg'],
    readTime: '4 min read',
    location: 'Ruiru, Kenya',
    eventDate: 'October 14, 2026',
  },
  {
    id: 'ritual-at-the-counter',
    category: 'Activations',
    title: 'Designing a better service moment',
    date: '2026-10-07',
    excerpt: 'From the first pour to the last detail, thoughtful activations turn everyday service into a reason to remember.',
    body: 'A strong activation starts with the people using it. We work from the rhythm of the space, the needs of the team, and the character of the coffee or tea to create a service moment that feels natural rather than staged.',
    images: ['/hero/hero_coffee_beans.jpg', '/hero/hero_roastery_cupping.jpg', '/hero/hero_coffee_harvest.jpg'],
    readTime: '5 min read',
    partner: 'Café and hospitality partners',
  },
  {
    id: 'people-behind-the-harvest',
    category: 'Community',
    title: 'The people behind the harvest',
    date: '2026-09-28',
    excerpt: 'A closer look at the care, patience, and knowledge carried through the communities that grow Kenya’s coffee and tea.',
    body: 'Origin is not only a coordinate on a map. It is a collection of people, decisions, seasons, and shared knowledge. Our community stories follow those connections from the growing highlands to the teams who help bring each lot forward.',
    images: ['/hero/hero_tea_harvest.jpg', '/hero/hero_coffee_harvest.jpg', '/hero/hero_highlands.jpg'],
    readTime: '6 min read',
    location: 'Kenya’s highland-growing communities',
  },
  {
    id: 'highland-lot-in-its-own-voice',
    category: 'Coffee Stories',
    title: 'A highland lot, in its own voice',
    date: '2026-09-19',
    excerpt: 'Trace the character of a coffee from altitude and cultivar to process, roast, and the final sip.',
    body: 'The most useful coffee story is one that helps you taste. We follow a lot through altitude, cultivar, processing, and roast to show how each decision contributes to brightness, sweetness, body, and balance in the finished cup.',
    images: ['/hero/hero_highlands.jpg', '/hero/hero_coffee_harvest.jpg', '/hero/hero_roastery_cupping.jpg'],
    readTime: '7 min read',
    origin: 'Mount Kenya highlands',
  },
  {
    id: 'shared-cups-taste-better',
    category: 'Events',
    title: 'Why shared cups taste better',
    date: '2026-09-10',
    excerpt: 'The best conversations often start with a fresh brew, a little time, and a table with room for one more.',
    body: 'There is a reason tastings feel different when they are shared. Another person notices a note you missed, asks a better question, or simply gives you time to stay with the cup a little longer.',
    images: ['/hero/hero_roastery_cupping.jpg', '/hero/hero_tea_harvest.jpg', '/hero/hero_coffee_beans.jpg'],
    readTime: '3 min read',
    location: 'First Cup tasting table',
    eventDate: 'September 10, 2026',
  },
  {
    id: 'coffee-beyond-the-counter',
    category: 'Activations',
    title: 'Coffee that works beyond the counter',
    date: '2026-08-31',
    excerpt: 'Exploring flexible formats for cafés, offices, hospitality teams, and vending environments.',
    body: 'The right coffee format depends on the moment it needs to serve. We think through pack sizes, service speed, preparation, and the experience a guest should have before recommending a route forward.',
    images: ['/hero/hero_coffee_harvest.jpg', '/hero/hero_coffee_beans.jpg', '/hero/hero_roastery_cupping.jpg'],
    readTime: '4 min read',
    partner: 'Trade, vending, and supply partners',
  },
  {
    id: 'small-moments-lasting-ties',
    category: 'Community',
    title: 'Small moments, lasting ties',
    date: '2026-08-18',
    excerpt: 'Community is built through the everyday details: showing up, listening closely, and making space to grow together.',
    body: 'The work behind a better cup is often quiet. It lives in repeated visits, honest conversations, and practical support that makes a relationship stronger one season at a time.',
    images: ['/hero/hero_coffee_harvest.jpg', '/hero/hero_tea_harvest.jpg', '/hero/hero_highlands.jpg'],
    readTime: '5 min read',
    location: 'Central Kenya',
  },
  {
    id: 'finding-balance-in-the-drum',
    category: 'Coffee Stories',
    title: 'Finding the balance in the drum',
    date: '2026-08-05',
    excerpt: 'Roasting is a conversation between time, temperature, and the distinct personality of each lot.',
    body: 'A roast profile should reveal rather than replace a coffee’s character. We look for the point where sweetness, acidity, and body come into balance, then cup the result so the profile can keep learning from the lot.',
    images: ['/hero/hero_roastery_cupping.jpg', '/hero/hero_coffee_beans.jpg', '/hero/hero_highlands.jpg'],
    readTime: '6 min read',
    origin: 'Nyeri central roastery',
  },
];
