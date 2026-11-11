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
    id: 'before-the-gates-masterclass-crimeshield-2026',
    category: 'Events',
    title: 'First Cup Coffee & Tea Partners with CrimeShield Security for the Before the Gates Masterclass 2026',
    date: '2026-11-11',
    excerpt: "Supporting safer events, building industry connections, and bringing exceptional coffee experiences to the forefront of Kenya's events industry.",
    body: `Great events are built on partnerships, collaboration, and a shared commitment to creating meaningful experiences.

On **6th November 2026**, First Cup Coffee & Tea was proud to be part of the **Before the Gates Masterclass 2026**, hosted by **CrimeShield Security Limited** at Wojo, Nairobi.

As an **Event Sponsor and Hospitality Partner**, First Cup Coffee & Tea joined other industry stakeholders in supporting an important initiative dedicated to strengthening event safety, security, and professional standards within Kenya's events industry.

### Supporting a Safer Events Industry

The Before the Gates Masterclass was designed to equip event professionals and stakeholders with practical knowledge and insights into creating safer, better-managed events.

Hosted by CrimeShield Security Limited, the masterclass explored critical areas including event security readiness, pre-crowd assessments, entry point management, crowd control, VIP protection, and incident response.

These conversations highlighted an important reality: successful events begin long before the audience arrives. Proper preparation, effective security planning, and collaboration are essential to delivering safe and memorable experiences.

At First Cup Coffee & Tea, we recognise the importance of initiatives that contribute to the growth and professionalism of the events industry. Supporting this masterclass was an opportunity to be part of a conversation that matters.

### First Cup Coffee & Tea: More Than a Coffee Experience

Our involvement as an Event Sponsor and Hospitality Partner reflects our commitment to supporting events, creating connections, and contributing to memorable guest experiences.

We believe coffee plays an important role in bringing people together. From corporate conferences and professional workshops to sporting events and VIP gatherings, a great coffee experience creates opportunities for conversations, networking, and collaboration.

Through our partnership, we were proud to bring the First Cup Coffee & Tea experience into a professional learning environment, supporting the people and conversations shaping the future of the events industry.

### Partnerships That Create Impact

Being part of the Before the Gates Masterclass reinforces our belief in the power of meaningful partnerships.

We appreciate **CrimeShield Security Limited** for creating a platform that brings event professionals together to share knowledge, improve industry practices, and champion safer event environments.

We are proud to support initiatives that go beyond the event itself and contribute to building a stronger, more prepared, and more professional events industry.

### Our Commitment to the Events Industry

From premium sporting experiences and VVIP hospitality to corporate gatherings, masterclasses, and industry events, First Cup Coffee & Tea continues to explore opportunities to serve, support, and partner with organisations across different sectors.

Our participation in the Before the Gates Masterclass is another step in that journey.

We look forward to building more partnerships, supporting impactful initiatives, and bringing quality coffee experiences to events that bring people together.

**First Cup Coffee & Tea — Bringing people together, one cup at a time.**

**Interested in partnering with us?**

Whether you are organising a corporate event, conference, masterclass, sporting occasion, or private function, First Cup Coffee & Tea is ready to be part of your experience.

Get in touch with our team for event sponsorship collaborations, hospitality partnerships, coffee catering, and event vending opportunities.`,
    images: ['/hero/hero_first_cup_coffee_cups.webp', '/hero/hero_roastery_cupping.jpg', '/hero/hero_coffee_beans.jpg'],
    readTime: '3 min read',
    eventDate: '6 November 2026 · Before the Gates Masterclass 2026',
    location: 'Wojo, Nairobi',
  },
  {
    id: 'nyayo-stadium-afc-leopards-shabana-fc-2026',
    category: 'Events',
    title: 'First Cup Coffee & Tea Returns to Nyayo Stadium for AFC Leopards vs Shabana FC',
    date: '2026-11-11',
    excerpt: 'Bringing the coffee experience to another exciting Kenyan Premier League matchday on 25th October 2026.',
    body: `Great experiences are worth repeating, and for First Cup Coffee & Tea, the opportunity to be part of the sporting atmosphere at Nyayo National Stadium was another memorable milestone.

On **25th October 2026**, First Cup Coffee & Tea had the pleasure of vending coffee in the **VVIP section at Nyayo National Stadium, Nairobi**, during the Kenyan Premier League (KPL) fixture between **AFC Leopards and Shabana FC**.

Following our previous experience serving guests during the CAF Confederation Cup encounter between Tusker FC and Singida Black Stars FC, returning to the same prestigious setting was another exciting opportunity for our brand.

### Another Matchday, Another Coffee Experience

Nyayo National Stadium once again provided the perfect setting for a day where Kenyan football, hospitality, and great experiences came together.

With two well-supported Kenyan football clubs taking to the pitch, the atmosphere was filled with the excitement and passion that make local football special.

For our team, being part of the VVIP hospitality experience meant another opportunity to bring quality coffee service closer to guests attending the match.

### Serving Coffee Beyond the Café

At First Cup Coffee & Tea, we believe coffee should be part of every great experience.

Whether it is a morning coffee break, a corporate gathering, a private function, or a major sporting event, our goal remains the same: delivering enjoyable coffee experiences wherever people come together.

Our participation at Nyayo Stadium continues to demonstrate our commitment to taking our coffee services beyond traditional café settings and into unique hospitality environments.

### Building on Our Sporting Event Experience

Being invited back to serve at Nyayo Stadium was particularly meaningful. It represented an opportunity to build on our previous event experience, strengthen our presence in the hospitality space, and connect with a wider audience.

From continental football to the Kenyan Premier League, we are proud to see First Cup Coffee & Tea becoming part of experiences that bring people together.

We appreciate the opportunity, the hospitality, and everyone who made the experience possible.

### The Journey Continues

Every event creates a new opportunity to connect, serve, and grow.

As we continue expanding our reach, we look forward to partnering with more event organisers, businesses, institutions, and sporting platforms to bring the First Cup Coffee & Tea experience to more people.

**First Cup Coffee & Tea — Bringing people together, one cup at a time.**

Planning a sporting event, corporate function, or special occasion? Let us bring the coffee experience to you.

**Get in touch with First Cup Coffee & Tea for event vending and coffee catering partnerships.**`,
    images: ['/hero/hero_first_cup_coffee_cups.webp', '/hero/hero_roastery_cupping.jpg', '/hero/hero_coffee_beans.jpg'],
    readTime: '3 min read',
    eventDate: '25 October 2026 · Kenyan Premier League matchday',
    location: 'VVIP section · Nyayo National Stadium, Nairobi',
  },
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
