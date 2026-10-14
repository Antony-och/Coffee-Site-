import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'motion/react';
import { TEA_PRODUCTS } from '../data/teaData';
import { TeaProduct } from '../types';
import { Leaf, ArrowRight } from 'lucide-react';

interface TeaCatalogProps {
  onSelectProduct: (product: TeaProduct) => void;
  externalSearch?: string;
}

export const TeaCatalog: React.FC<TeaCatalogProps> = ({
  onSelectProduct,
  externalSearch = '',
}) => {
  const [searchQuery, setSearchQuery] = useState<string>(externalSearch);

  useEffect(() => setSearchQuery(externalSearch), [externalSearch]);

  const filteredProducts = useMemo(() => {
    return TEA_PRODUCTS.filter((item) => {
      const query = searchQuery.toLowerCase();
      const matchSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.origin.toLowerCase().includes(query) ||
        item.tastingNotes.some((note) => note.toLowerCase().includes(query)) ||
        item.type.toLowerCase().includes(query);

      return matchSearch;
    });
  }, [searchQuery]);

  return (
    <section className="py-16 bg-[#162A1E] text-[#E8F3EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#284934] border border-[#3E6B4D] text-[#A2E0B5] text-xs font-bold uppercase tracking-widest">
            <Leaf className="w-3.5 h-3.5 text-[#52B788]" />
            <span>Highland Artisanal Teas</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            Purified Highland Teas
          </h2>
          <p className="text-sm sm:text-base text-[#A3C4AC] leading-relaxed">
            Including world-exclusive TRFK 306/1 Purple Tea, Kericho Safari Gold CTC Black Tea, and hand-rolled Orthodox Green Tea cultivated in the cloud forests of Kericho & Limuru.
          </p>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-[#1F3728] rounded-2xl border border-dashed border-[#2D503C]">
            <Leaf className="w-12 h-12 text-[#52B788]/40 mx-auto mb-3" />
            <h3 className="font-serif-display text-lg font-bold text-white">No tea products found</h3>
            <p className="text-xs text-[#A3C4AC] mt-1">Try a different search or clear it to see all tea products.</p>
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
                className="group bg-[#1A3123] rounded-2xl border border-[#2B4B36] hover:border-[#52B788]/70 transition-all duration-200 overflow-hidden flex flex-col cursor-pointer shadow-sm hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative h-48 bg-[#122319] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <span className="px-2.5 py-1 rounded-full bg-[#122319]/80 backdrop-blur-sm text-white text-[11px] font-semibold border border-white/10">
                      Tea type · {product.type}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="font-serif-display text-lg font-bold text-white group-hover:text-[#52B788] transition-colors leading-snug">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#A3C4AC]/80 line-clamp-3 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#2B4B36]/60">
                    <button
                      onClick={(event) => { event.stopPropagation(); onSelectProduct(product); }}
                      className="w-full px-3.5 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors bg-[#2D6A4F] hover:bg-[#1f4a37] text-white"
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
