import React, { useState } from 'react';
import { COFFEE_PRODUCTS } from '../data/coffeeData';
import { TEA_PRODUCTS } from '../data/teaData';
import { CoffeeProduct, TeaProduct, Currency } from '../types';
import { formatPrice } from '../utils/currency';
import { Sparkles, ArrowRight } from 'lucide-react';

interface FlavorWheelProps {
  currency: Currency;
  onSelectCoffee: (product: CoffeeProduct) => void;
  onSelectTea: (product: TeaProduct) => void;
}

const FLAVOR_TAGS = [
  { name: 'Blackcurrant', color: 'bg-purple-900 text-purple-100 border-purple-700' },
  { name: 'Grapefruit Zest', color: 'bg-amber-100 text-amber-900 border-amber-300' },
  { name: 'Wild Blackberry', color: 'bg-indigo-950 text-indigo-100 border-indigo-700' },
  { name: 'Jasmine Blossom', color: 'bg-emerald-50 text-emerald-900 border-emerald-300' },
  { name: 'Sweet Plum', color: 'bg-fuchsia-950 text-fuchsia-100 border-fuchsia-700' },
  { name: 'Dark Chocolate', color: 'bg-amber-950 text-amber-100 border-amber-800' },
  { name: 'Tropical Mango', color: 'bg-orange-100 text-orange-900 border-orange-300' },
  { name: 'Malty Cocoa', color: 'bg-[#2C1A14] text-amber-200 border-amber-700' },
  { name: 'Wild Honey', color: 'bg-amber-200 text-amber-950 border-amber-400' },
  { name: 'Fiery Ginger', color: 'bg-red-950 text-red-100 border-red-700' },
];

export const FlavorWheel: React.FC<FlavorWheelProps> = ({
  currency,
  onSelectCoffee,
  onSelectTea,
}) => {
  const [activeTag, setActiveTag] = useState<string>('Blackcurrant');

  const matchingCoffees = COFFEE_PRODUCTS.filter((c) =>
    c.flavorNotes.some((note) => note.toLowerCase().includes(activeTag.toLowerCase()))
  );

  const matchingTeas = TEA_PRODUCTS.filter((t) =>
    t.tastingNotes.some((note) => note.toLowerCase().includes(activeTag.toLowerCase()))
  );

  return (
    <section className="py-16 bg-[#2D241E] text-[#FAF7F2] border-y border-[#E5E1DA]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#5D6D3C]/20 border border-[#5D6D3C]/40 text-[#D4C3A3] text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Highland Flavor Explorer</span>
          </div>
          <h2 className="font-serif-display text-2xl sm:text-4xl font-bold text-[#FAF7F2]">
            Discover Coffees & Teas by Flavor Profile
          </h2>
          <p className="text-xs sm:text-sm text-[#D4C3A3]">
            Click any flavor note below to instantly discover matching single-origin coffee lots and rare tea harvests.
          </p>
        </div>

        {/* Flavor Tags Bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {FLAVOR_TAGS.map((tag) => {
            const isActive = activeTag === tag.name;
            return (
              <button
                key={tag.name}
                onClick={() => setActiveTag(tag.name)}
                className={`px-4 py-2 rounded-full text-xs font-bold border transition-all duration-300 shadow ${
                  isActive
                    ? 'bg-[#D97706] border-[#D4C3A3] text-white scale-105 shadow-xl'
                    : 'bg-[#4A3728] border-[#E5E1DA]/20 text-[#D4C3A3] hover:border-[#D4C3A3] hover:text-white'
                }`}
              >
                {tag.name}
              </button>
            );
          })}
        </div>

        {/* Matching Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {matchingCoffees.map((coffee) => (
            <div
              key={coffee.id}
              onClick={() => onSelectCoffee(coffee)}
              className="bg-[#4A3728] border border-[#E5E1DA]/20 rounded-2xl p-5 hover:border-[#D97706] transition-all duration-300 cursor-pointer flex gap-4 items-center group shadow-md"
            >
              <img
                src={coffee.image}
                alt={coffee.name}
                className="w-20 h-20 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 space-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D97706] block">
                  Arabica Coffee • Grade {coffee.grade}
                </span>
                <h4 className="font-serif-display text-sm font-bold text-[#FAF7F2] group-hover:text-[#D4C3A3] transition-colors">
                  {coffee.name}
                </h4>
                <p className="text-[11px] text-[#D4C3A3]/80">
                  {formatPrice(coffee.priceUsd, coffee.priceKes, coffee.priceEur, currency)} • SCA {coffee.cuppingScore}
                </p>
                <span className="text-[10px] text-[#D97706] font-semibold flex items-center gap-1 pt-1">
                  <span>Explore Lot</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}

          {matchingTeas.map((tea) => (
            <div
              key={tea.id}
              onClick={() => onSelectTea(tea)}
              className="bg-[#4A3728] border border-[#5D6D3C]/40 rounded-2xl p-5 hover:border-[#5D6D3C] transition-all duration-300 cursor-pointer flex gap-4 items-center group shadow-md"
            >
              <img
                src={tea.image}
                alt={tea.name}
                className="w-20 h-20 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 space-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#5D6D3C] block">
                  Highland Tea • {tea.type}
                </span>
                <h4 className="font-serif-display text-sm font-bold text-[#FAF7F2] group-hover:text-[#D4C3A3] transition-colors">
                  {tea.name}
                </h4>
                <p className="text-[11px] text-[#D4C3A3]/80">
                  {formatPrice(tea.priceUsd, tea.priceKes, tea.priceEur, currency)} • {tea.origin}
                </p>
                <span className="text-[10px] text-[#5D6D3C] font-semibold flex items-center gap-1 pt-1">
                  <span>View Tea Specs</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}

          {matchingCoffees.length === 0 && matchingTeas.length === 0 && (
            <div className="col-span-full text-center py-8 text-[#D4C3A3]/60 text-xs">
              No direct matches for "{activeTag}". Try selecting another flavor note.
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
