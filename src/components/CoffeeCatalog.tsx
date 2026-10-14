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
                className="group bg-[#2A1B16] rounded-2xl border border-[#442E25] hover:border-[#E58E26]/70 transition-all duration-200 overflow-hidden flex flex-col cursor-pointer shadow-sm hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative h-48 bg-[#1C120E] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <span className="px-2.5 py-1 rounded-full bg-[#1C120E]/80 backdrop-blur-sm text-white text-[11px] font-semibold border border-white/10">
                      Grade {product.grade}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="font-serif-display text-lg font-bold text-white group-hover:text-[#F5B041] transition-colors leading-snug">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#D4C3B7]/80 line-clamp-3 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#442E25]/60">
                    <button
                      onClick={(event) => { event.stopPropagation(); onSelectProduct(product); }}
                      className="w-full px-3.5 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors bg-[#E58E26] hover:bg-[#c9781b] text-white"
                    >
                      Choose size
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
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
