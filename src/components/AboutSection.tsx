import React from 'react';
import { TERROIR_STATS } from '../data/companyData';
import { PageView } from '../types';
import { Mountain, HeartHandshake, Award, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface AboutSectionProps {
  setCurrentPage: (page: PageView) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ setCurrentPage }) => {
  const factChips = [
    '90% of Kenya’s coffee is grown by smallholder farmers',
    'AA is the highest grade bean size for premium Kenyan coffee',
    'Kenya is the world’s top coffee exporter and tea leader',
    'Tea cultivation in Kenya began in 1924 and remains a national strength'
  ];

  const pillars = [
    {
      icon: Mountain,
      title: 'Volcanic Terroir',
      description:
        'Nurtured in phosphorus-rich red clay at 1,700m–2,400m altitude. Cold mountain nights slow down ripening to concentrate organic acids, floral aromas, and bright blackcurrant complexity.',
      accent: 'bg-[#D97706]/10 text-[#D97706]',
    },
    {
      icon: HeartHandshake,
      title: 'Direct Farmer Equity',
      description:
        'Partnering with 12,400+ smallholder family plots. We pay 35% above market auction prices directly, funding soil care, education, and clean water access in tea and coffee communities.',
      accent: 'bg-[#5D6D3C]/10 text-[#5D6D3C]',
    },
    {
      icon: Award,
      title: 'Precision Quality',
      description:
        'Every micro-lot is hand-sorted, washed, dried, and cupped with strict SCA standards to protect quality, traceability, and the distinctive flavor of the region.',
      accent: 'bg-[#2A2522]/10 text-[#2A2522]',
    },
  ];

  return (
    <section id="about" className="bg-[#F6F1EA] py-20 text-[#2A2522]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.2rem] border border-[#E2DDD2] bg-[#F9F4EE] p-6 shadow-[0_18px_40px_rgba(42,37,34,0.03)] sm:p-8 lg:p-12">
          <div className="absolute -right-16 top-10 h-56 w-56 rounded-full bg-[#D97706]/10 blur-3xl" />
          <div className="absolute -left-14 bottom-6 h-48 w-48 rounded-full bg-[#5D6D3C]/8 blur-3xl" />

          <div className="relative grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#6E7C5A]/20 bg-[#E8E2D8] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#5D6D3C]">
                <Mountain className="h-3.5 w-3.5" />
                <span>Highland Heritage</span>
              </div>

              <h1 className="font-serif-display text-[2.6rem] leading-[0.9] tracking-[-0.05em] text-[#2A2522] sm:text-[4rem] lg:text-[4.4rem]">
                Our Kenyan
                <span className="mt-1 block text-[#D97706]">Highland Story</span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-[1.9] text-[#5F5A56] sm:text-[1.08rem]">
                Founded in 2016 by Kenyan entrepreneurs Abdirizak Awel Mohammed and Ahmed Abdalla Boss, our business grew from a shared belief that exceptional coffee and tea should be traceable, honest, and unforgettable. From the foothills of Mount Kenya to the red soils of the Rift Valley, we source with purpose.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                {factChips.map((fact) => (
                  <span
                    key={fact}
                    className="rounded-full border border-[#E1D9CF] bg-white/70 px-3 py-2 text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-[#3F3A36]"
                  >
                    {fact}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-[2rem] border border-[#E1D9CF] bg-[#2A2522] p-5 text-[#F8F1E9] shadow-[0_24px_50px_rgba(42,37,34,0.2)] sm:p-6">
                <div className="flex items-center justify-between text-[0.58rem] font-bold uppercase tracking-[0.22em] text-[#D8C7A8]">
                  <span>Since 2016</span>
                  <span>Kenya • East Africa</span>
                </div>

                <div className="mt-6 font-serif-display text-[2.2rem] leading-[0.9] tracking-[-0.06em] text-[#F8F1E9] sm:text-[2.7rem]">
                  From mountain farms
                  <span className="mt-1 block text-[#D97706]">to your cup.</span>
                </div>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[1.2rem] border border-white/10 bg-white/5 p-4">
                    <div className="text-[1.5rem] font-serif-display font-bold text-[#F6C98F]">12,400+</div>
                    <div className="mt-1 text-[0.58rem] uppercase tracking-[0.14em] text-[#E9DBC5]">smallholder partners</div>
                  </div>
                  <div className="rounded-[1.2rem] border border-white/10 bg-white/5 p-4">
                    <div className="text-[1.5rem] font-serif-display font-bold text-[#F6C98F]">1,700m</div>
                    <div className="mt-1 text-[0.58rem] uppercase tracking-[0.14em] text-[#E9DBC5]">to 2,400m altitude</div>
                  </div>
                </div>

                <div className="mt-6 rounded-[1.25rem] border border-[#D97706]/35 bg-[#D97706]/10 p-4 text-sm leading-relaxed text-[#F0E2CE]">
                  “We source with patience, precision, and respect for the people who grow every harvest.”
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 rounded-full border border-[#D97706]/40 bg-[#F7F2EC] px-4 py-2 text-[0.58rem] font-bold uppercase tracking-[0.18em] text-[#2A2522] shadow-lg">
                Rooted in the Highlands
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {TERROIR_STATS.map((stat, idx) => (
            <div
              key={idx}
              className="group rounded-[1.6rem] border border-[#E2DDD2] bg-[#F7F2EC] p-5 shadow-[0_1px_0_rgba(42,37,34,0.02)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(42,37,34,0.08)] sm:p-6"
            >
              <div className="font-serif-display text-[2.2rem] font-extrabold leading-none tracking-[-0.05em] text-[#D97706] sm:text-[2.6rem]">
                {stat.value}
              </div>

              <div className="mt-3 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#2A2522]">
                {stat.label}
              </div>

              <p className="mt-3 text-[0.72rem] leading-[1.6] text-[#7A746E]">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#2A2522]/20 bg-[#F7F2EC] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#2A2522]">
            <span className="flex h-4 w-4 items-center justify-center rounded-full border border-[#2A2522]/35 text-[#2A2522]">
              <ShieldCheck className="h-2.5 w-2.5" />
            </span>
            <span>What guides us</span>
          </div>
          <h2 className="font-serif-display text-[2.5rem] font-bold uppercase leading-[0.95] tracking-[-0.06em] text-[#2A2522] sm:text-[4rem]">
            The Three Pillars of Our
            <span className="mt-1 block">Produce</span>
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {pillars.map(({ icon: Icon, title, description, accent }) => (
            <div
              key={title}
              className="rounded-[1.7rem] border border-[#E2DDD2] bg-[#F7F2EC] p-6 shadow-[0_1px_0_rgba(42,37,34,0.02)]"
            >
              <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${accent}`}>
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-serif-display text-[1.05rem] font-bold uppercase tracking-[0.08em] text-[#2A2522]">
                {title}
              </h3>
              <p className="mt-4 text-[0.73rem] leading-[1.8] text-[#7A746E]">
                {description}
              </p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-5xl rounded-[2rem] bg-[#2A2522] px-8 py-10 text-center text-white shadow-[0_22px_35px_rgba(42,37,34,0.18)] sm:px-10 lg:px-12">
          <div className="mb-5 flex justify-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#D97706]/15 text-[#D97706]">
              <Sparkles className="h-5 w-5" />
            </div>
          </div>

          <h2 className="font-serif-display text-[2.15rem] font-bold uppercase leading-[0.96] tracking-[-0.06em] text-white sm:text-[3rem]">
            Experience First Cup Reserve
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#E0D5C6]">
            Discover single-origin Kenyan coffee and carefully selected teas, harvested directly from the highlands and prepared for unforgettable daily rituals.
          </p>

          <div className="mt-7 flex justify-center">
            <button
              onClick={() => {
                setCurrentPage('coffee');
                const el = document.getElementById('coffee');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 rounded-full bg-[#D97706] px-6 py-3 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-[#b86505]"
            >
              <span>View Collections</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
