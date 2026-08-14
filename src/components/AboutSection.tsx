import React from 'react';
import { TERROIR_STATS } from '../data/companyData';
import { PageView } from '../types';
import { Mountain, HeartHandshake, Award, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface AboutSectionProps {
  setCurrentPage: (page: PageView) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ setCurrentPage }) => {
  return (
    <section id="about" className="py-20 bg-[#FAF7F2] text-[#2A2522]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Statement */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#5D6D3C]/10 border border-[#5D6D3C]/20 text-[#5D6D3C] text-xs font-bold uppercase tracking-widest">
            <Mountain className="w-3.5 h-3.5" />
            <span>Highland Heritage</span>
          </div>
          <h1 className="font-serif-display text-3xl sm:text-5xl font-extrabold text-[#2A2522]">
            Our Kenyan Highland Story
          </h1>
          <p className="text-sm sm:text-base text-[#7A746E] leading-relaxed">
            Grown directly along the equator at extreme elevations of 1,700m–2,400m on the volcanic soils of Mount Kenya and the Kericho valley. We produce single-origin coffees and rare purple teas through direct, fair-trade partnerships with smallholder family farms.
          </p>
        </div>

        {/* Clean Impact Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {TERROIR_STATS.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E5E1DA] rounded-2xl p-5 sm:p-6 text-center shadow-sm space-y-1.5"
            >
              <span className="font-serif-display text-2xl sm:text-3xl font-extrabold text-[#D97706] block">
                {stat.value}
              </span>
              <h3 className="font-serif-display text-xs sm:text-sm font-bold text-[#2A2522]">
                {stat.label}
              </h3>
              <p className="text-[11px] text-[#7A746E] leading-snug">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>

        {/* The 3 Core Pillars */}
        <div className="space-y-6">
          <div className="text-center max-w-lg mx-auto">
            <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#2A2522]">
              The Three Pillars of Our Produce
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Pillar 1 */}
            <div className="bg-white border border-[#E5E1DA] rounded-2xl p-6 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#D97706]/10 text-[#D97706] flex items-center justify-center">
                <Mountain className="w-5 h-5" />
              </div>
              <h3 className="font-serif-display text-lg font-bold text-[#2A2522]">
                Volcanic Terroir
              </h3>
              <p className="text-xs text-[#7A746E] leading-relaxed">
                Nurtured in phosphorus-rich red clay at 1,700m–2,400m altitude. Cold mountain nights slow down ripening to concentrate organic acids, floral aromas, and bright blackcurrant acidity.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white border border-[#E5E1DA] rounded-2xl p-6 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#5D6D3C]/10 text-[#5D6D3C] flex items-center justify-center">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="font-serif-display text-lg font-bold text-[#2A2522]">
                Direct Farmer Equity
              </h3>
              <p className="text-xs text-[#7A746E] leading-relaxed">
                Partnering with 12,400+ smallholder family plots. We pay 35% above market auction prices directly via mobile money, funding soil kits and clean water wells.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white border border-[#E5E1DA] rounded-2xl p-6 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#2D241E]/10 text-[#2D241E] flex items-center justify-center">
                <Award className="w-5 h-5 text-[#2D241E]" />
              </div>
              <h3 className="font-serif-display text-lg font-bold text-[#2A2522]">
                SCA 88+ Quality Standards
              </h3>
              <p className="text-xs text-[#7A746E] leading-relaxed">
                Every micro-lot undergoes double spring water washing, African raised bed sun drying, optical color sorting, and Q-Grader cupping evaluation prior to export.
              </p>
            </div>

          </div>
        </div>

        {/* Clean Call to Action Banner */}
        <div className="bg-[#2D241E] text-white rounded-3xl p-8 sm:p-10 text-center max-w-3xl mx-auto space-y-4 shadow-xl">
          <Sparkles className="w-8 h-8 text-[#D97706] mx-auto" />
          <h2 className="font-serif-display text-xl sm:text-3xl font-bold text-white">
            Experience Kenyan Highland Reserve
          </h2>
          <p className="text-xs text-[#D4C3A3] max-w-md mx-auto leading-relaxed">
            Discover our single-origin AA/PB coffee micro-lots and rare purple tea leaves harvested directly from Mount Kenya and Kericho.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => {
                setCurrentPage('coffee');
                const el = document.getElementById('coffee');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-2.5 rounded-full bg-[#D97706] hover:bg-[#b86505] text-white font-bold text-xs tracking-wide shadow flex items-center gap-2 transition-colors"
            >
              <span>View Collections</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
