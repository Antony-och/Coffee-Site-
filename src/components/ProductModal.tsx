import React, { useState } from 'react';
import { CoffeeProduct, TeaProduct, Currency, CartItem } from '../types';
import { formatPrice } from '../utils/currency';
import { X, Award, Mountain, Check, Plus, Coffee, Leaf, Thermometer, Clock } from 'lucide-react';

interface ProductModalProps {
  product: CoffeeProduct | TeaProduct | null;
  onClose: () => void;
  currency: Currency;
  onAddToCart: (item: CartItem) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  currency,
  onAddToCart,
}) => {
  if (!product) return null;

  const isCoffee = 'roastLevel' in product;
  const coffee = isCoffee ? (product as CoffeeProduct) : null;
  const tea = !isCoffee ? (product as TeaProduct) : null;

  const [selectedFormat, setSelectedFormat] = useState<string>(
    product.packagingFormats[0] || 'Default Packaging'
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  const handleAdd = () => {
    onAddToCart({
      id: `${product.id}-${selectedFormat.replace(/\s+/g, '-')}`,
      type: isCoffee ? 'coffee' : 'tea',
      productId: product.id,
      name: product.name,
      format: selectedFormat,
      priceUsd: product.priceUsd,
      priceKes: product.priceKes,
      priceEur: product.priceEur,
      quantity,
      image: product.image,
    });

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      
      <div className="bg-white border border-[#E5E1DA] rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative my-8 text-[#2A2522]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors"
          title="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12">
          
          {/* Image & Key Badges Column */}
          <div className="md:col-span-5 relative h-64 md:h-full min-h-[280px] bg-[#2D241E]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2D241E] via-transparent to-transparent"></div>

            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <span className="px-3 py-1 rounded-full bg-[#D97706] text-white text-xs font-bold uppercase tracking-wider shadow">
                {isCoffee ? `Grade ${coffee?.grade}` : tea?.type}
              </span>
            </div>

            {/* Cupping / Polyphenol Badge */}
            <div className="absolute bottom-4 left-4 right-4 bg-[#2D241E]/90 border border-[#D4C3A3]/20 p-3 rounded-2xl text-xs text-[#FAF7F2] backdrop-blur-md">
              <span className="text-[#D4C3A3] font-bold block uppercase tracking-wider text-[10px]">
                {isCoffee ? 'SCA Cupping Calibration' : 'Antioxidant Metric'}
              </span>
              <span className="text-sm font-bold">
                {isCoffee ? `SCA Score: ${coffee?.cuppingScore} / 100` : tea?.polyphenols}
              </span>
            </div>
          </div>

          {/* Details Column */}
          <div className="md:col-span-7 p-6 sm:p-8 space-y-5 flex flex-col justify-between">
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                {isCoffee ? (
                  <Coffee className="w-4 h-4 text-[#D97706]" />
                ) : (
                  <Leaf className="w-4 h-4 text-[#5D6D3C]" />
                )}
                <span className="text-xs font-bold uppercase tracking-wider text-[#7A746E]">
                  {isCoffee ? coffee?.region : tea?.origin}
                </span>
              </div>

              <h2 className="font-serif-display text-2xl font-bold text-[#2A2522] leading-snug">
                {product.name}
              </h2>

              <p className="text-xs text-[#7A746E] leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Spec Breakdown */}
            <div className="bg-[#FAF7F2] rounded-2xl p-4 text-xs space-y-2 border border-[#E5E1DA]">
              {isCoffee ? (
                <>
                  <div className="flex justify-between">
                    <span className="text-[#7A746E]">Cultivar:</span>
                    <strong className="text-[#2A2522]">{coffee?.variety}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A746E]">Highland Elevation:</span>
                    <strong className="text-[#2A2522]">{coffee?.altitude}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A746E]">Roast Intensity:</span>
                    <strong className="text-[#2A2522]">{coffee?.roastLevel}</strong>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between">
                    <span className="text-[#7A746E]">Oxidation State:</span>
                    <strong className="text-[#2A2522]">{tea?.oxidationLevel}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A746E]">Steep Temp:</span>
                    <strong className="text-[#2A2522] flex items-center gap-1">
                      <Thermometer className="w-3.5 h-3.5 text-[#D97706]" />
                      {tea?.steepTemp}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A746E]">Steep Time:</span>
                    <strong className="text-[#2A2522] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#5D6D3C]" />
                      {tea?.steepTime}
                    </strong>
                  </div>
                </>
              )}
            </div>

            {/* Flavor Tags */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A746E] block mb-1">
                Aroma & Tasting Spectrum:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(isCoffee ? coffee?.flavorNotes : tea?.tastingNotes)?.map((note, i) => (
                  <span key={i} className="px-2.5 py-0.5 rounded bg-[#FAF7F2] border border-[#E5E1DA] text-xs font-semibold text-[#2A2522]">
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Packaging Format Selection */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7A746E] mb-1.5">
                Select Packaging Format / Size
              </label>
              <div className="grid grid-cols-2 gap-2">
                {product.packagingFormats.map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setSelectedFormat(fmt)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-left truncate ${
                      selectedFormat === fmt
                        ? 'bg-[#2A2522] border-[#2A2522] text-white'
                        : 'bg-white border-[#E5E1DA] text-[#2A2522] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Price Action */}
            <div className="pt-2 border-t border-[#E5E1DA] flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A746E] block">
                  Order Price
                </span>
                <span className="font-serif-display text-2xl font-bold text-[#D97706]">
                  {formatPrice(product.priceUsd * quantity, product.priceKes * quantity, product.priceEur * quantity, currency)}
                </span>
              </div>

              {/* Quantity Counter */}
              <div className="flex items-center border border-[#E5E1DA] rounded-xl overflow-hidden bg-[#FAF7F2]">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1.5 font-bold hover:bg-[#2A2522]/10"
                >
                  -
                </button>
                <span className="px-3 font-bold text-xs">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1.5 font-bold hover:bg-[#2A2522]/10"
                >
                  +
                </button>
              </div>

              {/* Add Button */}
              <button
                onClick={handleAdd}
                className={`px-6 py-3 rounded-full font-bold text-xs flex items-center gap-2 transition-all shadow-md ${
                  isAdded ? 'bg-[#5D6D3C] text-white' : 'bg-[#D97706] hover:bg-[#b86505] text-white'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" /> Added
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" /> Add to Order
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
