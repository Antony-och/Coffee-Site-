import { useState } from 'react';
import { Pause, Play } from 'lucide-react';

const PARTNER_LOGOS = [
  { name: 'RocoMamas', src: '/brands/trusted/roco-mamas.png' },
  { name: 'Dream Bean House', src: '/brands/trusted/dream-bean-house.png' },
  { name: 'Bahari Beach Hotel', src: '/brands/trusted/bahari-beach-hotel.png' },
  { name: 'Marina EnglishPoint', src: '/brands/trusted/marina-english-point.png' },
  { name: 'Blue Room', src: '/brands/trusted/blue-room.png' },
  { name: 'CrimeShield Security Ltd', src: '/brands/trusted/crimeshield-security.webp' },
];

export const TrustedBrands = () => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="relative overflow-hidden bg-[#F3EEE6] py-14 text-[#2A2522] sm:py-20" aria-labelledby="trusted-brands-heading">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full border-[34px] border-[#D8C8B4]/20" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-5 border-b border-[#D8CABB] pb-7 sm:mb-10 sm:flex-row sm:items-end sm:justify-between sm:pb-8">
          <div className="max-w-2xl">
            <p className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.22em] text-[#A85C16]">
              <span aria-hidden="true" className="h-px w-7 bg-[#A85C16]" />
              In good company
            </p>
            <h2 id="trusted-brands-heading" className="mt-3 font-serif-display text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-4xl">
              Trusted brands, <span className="text-[#58704F]">shared moments.</span>
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#71675D] sm:text-base">
              Proud to serve alongside the people and places that make every cup—and every gathering—more memorable.
            </p>
          </div>

          <div className="flex items-center justify-between gap-4 sm:justify-end">
            <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#81766C]">
              Our partners <span className="mx-1 text-[#B8A995]">/</span> {String(PARTNER_LOGOS.length).padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={() => setIsPaused((paused) => !paused)}
              aria-label={isPaused ? 'Resume trusted brands carousel' : 'Pause trusted brands carousel'}
              aria-pressed={isPaused}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#CDBDA9] bg-[#FFFCF8] text-[#34503B] shadow-sm transition hover:border-[#34503B] hover:bg-[#34503B] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A46A32]"
            >
              {isPaused ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
            </button>
          </div>
        </div>

        <div
          className={`trusted-brands-marquee relative overflow-hidden rounded-[1.75rem] border border-[#E1D5C6] bg-[#EDE5D9]/65 py-4 sm:rounded-[2rem] sm:py-5 ${isPaused ? 'is-paused' : ''}`}
          role="region"
          aria-label="Trusted brand logos"
        >
          <div className="trusted-brands-track">
            <div className="trusted-brands-group">
              {PARTNER_LOGOS.map((partner) => (
                <div key={partner.name} className="group flex h-24 w-[156px] shrink-0 items-center justify-center rounded-2xl border border-[#E9E0D5] bg-[#FFFCF8] p-4 shadow-[0_5px_18px_rgba(57,42,29,0.05)] transition duration-300 hover:-translate-y-0.5 hover:border-[#C8B69F] hover:shadow-[0_10px_24px_rgba(57,42,29,0.09)] sm:h-28 sm:w-[194px] sm:p-5 lg:w-[214px]">
                  <img src={partner.src} alt={partner.name} className="max-h-16 max-w-full object-contain transition duration-300 group-hover:scale-[1.03]" loading="lazy" />
                </div>
              ))}
            </div>
            <div className="trusted-brands-group" aria-hidden="true">
              {PARTNER_LOGOS.map((partner) => (
                <div key={`${partner.name}-duplicate`} className="flex h-24 w-[156px] shrink-0 items-center justify-center rounded-2xl border border-[#E9E0D5] bg-[#FFFCF8] p-4 shadow-[0_5px_18px_rgba(57,42,29,0.05)] sm:h-28 sm:w-[194px] sm:p-5 lg:w-[214px]">
                  <img src={partner.src} alt="" className="max-h-16 max-w-full object-contain" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#EEE6DB] to-transparent sm:w-16" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#EEE6DB] to-transparent sm:w-16" />
        </div>
      </div>
    </section>
  );
};
