import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { TEA_PRODUCTS } from '../data/teaData';
import { TeaProduct, Currency, CartItem } from '../types';
import { formatPrice } from '../utils/currency';
import { Leaf, Plus, Check } from 'lucide-react';

interface TeaCatalogProps {
  currency: Currency;
  onSelectProduct: (product: TeaProduct) => void;
  onAddToCart: (item: CartItem) => void;
  externalSearch?: string;
}

export const TeaCatalog: React.FC<TeaCatalogProps> = ({
  currency,
  onSelectProduct,
  onAddToCart,
  externalSearch = '',
}) => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>(externalSearch);
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  const filteredProducts = useMemo(() => {
    return TEA_PRODUCTS.filter((item) => {
      const matchType = selectedType === 'all' || item.type === selectedType;
      const query = searchQuery.toLowerCase();
      const matchSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.origin.toLowerCase().includes(query) ||
        item.tastingNotes.some((note) => note.toLowerCase().includes(query)) ||
        item.type.toLowerCase().includes(query);

      return matchType && matchSearch;
    });
  }, [selectedType, searchQuery]);

  const handleQuickAdd = (product: TeaProduct, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart({
      id: `tea-${product.id}-loose`,
      type: 'tea',
      productId: product.id,
      name: product.name,
      format: product.packagingFormats[0] || '100g Loose Leaf',
      priceUsd: product.priceUsd,
      priceKes: product.priceKes,
      priceEur: product.priceEur,
      quantity: 1,
      image: product.image,
    });

    setAddedItems((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  return (
    <section id="tea" className="py-16 bg-[#162A1E] text-[#E8F3EB]">
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
            <p className="text-xs text-[#A3C4AC] mt-1">Try broadening your search term or category selection.</p>
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
                      {product.type}
                    </span>
                  </div>
                  {/* Subtle Liquor tone dot */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#122319]/80 backdrop-blur-sm border border-white/10 text-[11px] text-[#E8F3EB]">
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-white/40"
                      style={{ backgroundColor: product.liquorColor }}
                    />
                    <span>{product.origin}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-medium text-[#A3C4AC]/70">
                      {product.origin} • {product.polyphenols}
                    </div>
                    <h3 className="font-serif-display text-lg font-bold text-white group-hover:text-[#52B788] transition-colors leading-snug">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#A3C4AC]/80 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Tasting Notes */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {product.tastingNotes.slice(0, 3).map((note, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-[#122319]/60 text-[11px] text-[#A3C4AC]"
                      >
                        {note}
                      </span>
                    ))}
                  </div>

                  {/* Price & Actions */}
                  <div className="pt-3 border-t border-[#2B4B36]/60 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#A3C4AC]/60 block font-semibold">
                        From
                      </span>
                      <span className="font-serif-display text-base font-bold text-[#52B788]">
                        {formatPrice(product.priceUsd, product.priceKes, product.priceEur, currency)}
                      </span>
                    </div>

                    <button
                      onClick={(e) => handleQuickAdd(product, e)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                        addedItems[product.id]
                          ? 'bg-[#52B788] text-[#122319]'
                          : 'bg-[#2D6A4F] hover:bg-[#1f4a37] text-white'
                      }`}
                    >
                      {addedItems[product.id] ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          Added
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          Add
                        </>
                      )}
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
