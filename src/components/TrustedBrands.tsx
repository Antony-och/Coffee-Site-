import { useState } from 'react';
import { Pause, Play } from 'lucide-react';

const PARTNER_LOGOS = [
  { name: 'RocoMamas', src: '/brands/trusted/roco-mamas.png' },
  { name: 'Dream Bean House', src: '/brands/trusted/dream-bean-house.png' },
  { name: 'Bahari Beach Hotel', src: '/brands/trusted/bahari-beach-hotel.png' },
  { name: 'Marina EnglishPoint', src: '/brands/trusted/marina-english-point.png' },
  { name: 'Blue Room', src: '/brands/trusted/blue-room.png' },
];

export const TrustedBrands = () => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="overflow-hidden bg-[#F3EEE6] py-12 text-[#2A2522] sm:py-14" aria-labelledby="trusted-brands-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-7 flex items-center justify-center gap-3 sm:mb-9">
          <h2 id="trusted-brands-heading" className="font-serif-display text-2xl font-bold sm:text-3xl">
            Trusted brands
          </h2>
          <button
            type="button"
            onClick={() => setIsPaused((paused) => !paused)}
            aria-label={isPaused ? 'Resume trusted brands carousel' : 'Pause trusted brands carousel'}
            aria-pressed={isPaused}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#D8CBB9] bg-white/70 text-[#67513C] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A46A32]"
          >
            {isPaused ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
          </button>
        </div>

        <div
          className={`trusted-brands-marquee relative mx-auto max-w-7xl overflow-hidden ${isPaused ? 'is-paused' : ''}`}
          role="region"
          aria-label="Trusted brand logos"
        >
          <div className="trusted-brands-track">
            <div className="trusted-brands-group">
              {PARTNER_LOGOS.map((partner) => (
                <div key={partner.name} className="flex h-24 w-[148px] shrink-0 items-center justify-center rounded-2xl border border-[#E8DFD3] bg-white p-4 shadow-sm sm:h-28 sm:w-[184px] sm:p-5 lg:w-[204px]">
                  <img src={partner.src} alt={partner.name} className="max-h-16 max-w-full object-contain" loading="lazy" />
                </div>
              ))}
            </div>
            <div className="trusted-brands-group" aria-hidden="true">
              {PARTNER_LOGOS.map((partner) => (
                <div key={`${partner.name}-duplicate`} className="flex h-24 w-[148px] shrink-0 items-center justify-center rounded-2xl border border-[#E8DFD3] bg-white p-4 shadow-sm sm:h-28 sm:w-[184px] sm:p-5 lg:w-[204px]">
                  <img src={partner.src} alt="" className="max-h-16 max-w-full object-contain" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#F3EEE6] to-transparent sm:w-16" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#F3EEE6] to-transparent sm:w-16" />
        </div>
      </div>
    </section>
  );
};
