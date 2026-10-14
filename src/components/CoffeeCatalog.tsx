import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'motion/react';
import { COFFEE_PRODUCTS } from '../data/coffeeData';
import { CoffeeProduct } from '../types';
import { Coffee, ArrowRight } from 'lucide-react';

interface CoffeeCatalogProps {
  onSelectProduct: (product: CoffeeProduct) => void;
  externalSearch?: string;
}

export const CoffeeCatalog: React.FC<CoffeeCatalogProps> = ({
  onSelectProduct,
  externalSearch = '',
}) => {
  const [searchQuery, setSearchQuery] = useState<string>(externalSearch);

  useEffect(() => setSearchQuery(externalSearch), [externalSearch]);

  const filteredProducts = useMemo(() => {
    return COFFEE_PRODUCTS.filter((item) => {
      const query = searchQuery.toLowerCase();
      const matchSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.region.toLowerCase().includes(query) ||
        item.flavorNotes.some((note) => note.toLowerCase().includes(query)) ||
        item.variety.toLowerCase().includes(query);

      return matchSearch;
    });
  }, [searchQuery]);

  return (
    <section className="py-16 bg-[#241713] text-[#F5EBE6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E58E26]/20 border border-[#E58E26]/30 text-[#F5B041] text-xs font-bold uppercase tracking-widest">
            <Coffee className="w-3.5 h-3.5 text-[#F5B041]" />
            <span>High-Altitude Arabica Reserve</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            Single-Origin Coffee Reserve
          </h2>
          <p className="text-sm sm:text-base text-[#D4C3B7] leading-relaxed">
            Hand-harvested at 1,800m–2,200m altitude from Mount Kenya & Nyeri volcanic soils. Double fermented in mountain spring waters and sun-dried on African raised beds.
          </p>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-[#33221B] rounded-2xl border border-dashed border-[#483229]">
            <Coffee className="w-12 h-12 text-[#E58E26]/40 mx-auto mb-3" />
            <h3 className="font-serif-display text-lg font-bold text-white">No matching coffee lots found</h3>
            <p className="text-xs text-[#D4C3B7] mt-1">Try a different search or clear it to see all coffee lots.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: (index % 3) * 0.08 }}
                onClick={() => onSelectProduct(product)}
                className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-[1.75rem] border border-[#6B4931]/45 bg-gradient-to-b from-[#38271D] via-[#2B1C15] to-[#211510] shadow-[0_12px_38px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-1 hover:border-[#E9A54B]/70 hover:shadow-[0_24px_54px_rgba(0,0,0,0.34)]"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden bg-[#1C120E] sm:h-64">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    referrerPolicy="no-referrer"
                  />
                  <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />
                  <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent via-[#2B1C15]/75 to-[#2B1C15]" />
                  <div className="absolute left-4 top-4">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#19100C]/65 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md">
                      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#E9A54B]" />
                      Grade {product.grade}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col bg-gradient-to-b from-[#2B1C15] to-[#211510] p-5 sm:p-6">
                  <div className="space-y-2">
                    <h3 className="font-serif-display text-xl font-bold leading-snug text-white transition-colors group-hover:text-[#F5B041] sm:text-2xl">
                      {product.name}
                    </h3>
                    <p className="line-clamp-3 text-sm leading-6 text-[#D4C3B7]/85">
                      {product.description}
                    </p>
                  </div>

                  <div className="mt-auto pt-6">
                    <button
                      onClick={(event) => { event.stopPropagation(); onSelectProduct(product); }}
                      className="group/cta flex w-full items-center justify-between rounded-2xl border border-[#C98A46]/35 bg-[#3B281D] px-4 py-2.5 text-left text-[#F6D5A6] transition-all duration-200 hover:border-[#E9A54B] hover:bg-[#E9A54B] hover:text-[#25160D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B041] focus-visible:ring-offset-2 focus-visible:ring-offset-[#211510]"
                    >
                      <span className="text-xs font-bold uppercase tracking-[0.12em]">Choose size</span>
                      <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E9A54B] text-[#27170C] transition-colors group-hover/cta:bg-[#FFF2DA]">
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-0.5" />
                      </span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
