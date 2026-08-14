import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { COFFEE_PRODUCTS } from '../data/coffeeData';
import { CoffeeProduct, Currency, CartItem } from '../types';
import { formatPrice } from '../utils/currency';
import { Coffee, Plus, Check } from 'lucide-react';

interface CoffeeCatalogProps {
  currency: Currency;
  onSelectProduct: (product: CoffeeProduct) => void;
  onAddToCart: (item: CartItem) => void;
  externalSearch?: string;
}

export const CoffeeCatalog: React.FC<CoffeeCatalogProps> = ({
  currency,
  onSelectProduct,
  onAddToCart,
  externalSearch = '',
}) => {
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [selectedRoast, setSelectedRoast] = useState<string>('all');
  const [selectedVariety, setSelectedVariety] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>(externalSearch);
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  const filteredProducts = useMemo(() => {
    return COFFEE_PRODUCTS.filter((item) => {
      const matchGrade = selectedGrade === 'all' || item.grade.includes(selectedGrade);
      const matchRoast = selectedRoast === 'all' || item.roastLevel === selectedRoast;
      const matchVariety = selectedVariety === 'all' || item.variety.includes(selectedVariety);
      const query = searchQuery.toLowerCase();
      const matchSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.region.toLowerCase().includes(query) ||
        item.flavorNotes.some((note) => note.toLowerCase().includes(query)) ||
        item.variety.toLowerCase().includes(query);

      return matchGrade && matchRoast && matchVariety && matchSearch;
    });
  }, [selectedGrade, selectedRoast, selectedVariety, searchQuery]);

  const handleQuickAdd = (product: CoffeeProduct, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart({
      id: `coffee-${product.id}-250g`,
      type: 'coffee',
      productId: product.id,
      name: product.name,
      format: product.packagingFormats[0] || '250g Valve Bag',
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
    <section id="coffee" className="py-16 bg-[#241713] text-[#F5EBE6]">
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
            <p className="text-xs text-[#D4C3B7] mt-1">Try searching for a different roast, grade, or region.</p>
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
                    {product.cuppingScore && (
                      <span className="px-2.5 py-1 rounded-full bg-[#5D6D3C]/90 backdrop-blur-sm text-white text-[11px] font-semibold border border-white/10">
                        SCA {product.cuppingScore}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-medium text-[#D4C3B7]/70">
                      {product.region} • {product.altitude}
                    </div>
                    <h3 className="font-serif-display text-lg font-bold text-white group-hover:text-[#F5B041] transition-colors leading-snug">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#D4C3B7]/80 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Flavor Notes */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {product.flavorNotes.slice(0, 3).map((note, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-[#1C120E]/60 text-[11px] text-[#D4C3B7]"
                      >
                        {note}
                      </span>
                    ))}
                  </div>

                  {/* Price & Action */}
                  <div className="pt-3 border-t border-[#442E25]/60 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#D4C3B7]/60 block font-semibold">
                        From
                      </span>
                      <span className="font-serif-display text-base font-bold text-[#F5B041]">
                        {formatPrice(product.priceUsd, product.priceKes, product.priceEur, currency)}
                      </span>
                    </div>

                    <button
                      onClick={(e) => handleQuickAdd(product, e)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                        addedItems[product.id]
                          ? 'bg-[#5D6D3C] text-white'
                          : 'bg-[#E58E26] hover:bg-[#c9781b] text-white'
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
