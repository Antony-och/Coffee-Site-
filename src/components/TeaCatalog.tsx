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
          <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            Purified Highland Teas
          </h1>
          <p className="text-sm sm:text-base text-[#A3C4AC] leading-relaxed">
            Including world-exclusive TRFK 306/1 Purple Tea, Kericho Safari Gold CTC Black Tea, and hand-rolled Orthodox Green Tea cultivated in the cloud forests of Kericho & Limuru.
          </p>
          <a href="#tea-process" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#A2E0B5] transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A2E0B5]">
            See the leaf-to-cup process <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
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
                className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-[1.75rem] border border-[#54745D]/50 bg-gradient-to-b from-[#294333] via-[#203729] to-[#17291D] shadow-[0_12px_38px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-1 hover:border-[#75C995]/70 hover:shadow-[0_24px_54px_rgba(0,0,0,0.34)]"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden bg-[#122319] sm:h-64">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    referrerPolicy="no-referrer"
                  />
                  <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />
                  <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent via-[#203729]/75 to-[#203729]" />
                  <div className="absolute left-4 top-4">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#102016]/70 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-md">
                      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#82D49A]" />
                      Tea type · {product.type}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex flex-1 flex-col bg-gradient-to-b from-[#203729] to-[#17291D] p-5 sm:p-6">
                  <div className="space-y-2">
                    <h3 className="font-serif-display text-xl font-bold leading-snug text-white transition-colors group-hover:text-[#8BE0A7] sm:text-2xl">
                      {product.name}
                    </h3>
                    <p className="line-clamp-3 text-sm leading-6 text-[#BBD0C0]">
                      {product.description}
                    </p>
                  </div>

                  <div className="mt-auto pt-6">
                    <button
                      onClick={(event) => { event.stopPropagation(); onSelectProduct(product); }}
                      className="group/cta flex w-full items-center justify-between rounded-2xl border border-[#75C995]/30 bg-[#1D3627] px-4 py-2.5 text-left text-[#C5EDD0] transition-all duration-200 hover:border-[#8BE0A7] hover:bg-[#69C588] hover:text-[#0E2919] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8BE0A7] focus-visible:ring-offset-2 focus-visible:ring-offset-[#17291D]"
                    >
                      <span className="text-xs font-bold uppercase tracking-[0.12em]">Choose size</span>
                      <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#68C589] text-[#0E2919] transition-colors group-hover/cta:bg-[#E7F8EB]">
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
