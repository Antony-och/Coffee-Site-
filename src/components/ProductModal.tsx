import React, { useEffect, useRef, useState } from 'react';
import {
  Award,
  Check,
  Coffee,
  Leaf,
  MapPin,
  Minus,
  Mountain,
  Plus,
  X,
} from 'lucide-react';
import { CartItem, CoffeeProduct, TeaProduct } from '../types';

interface ProductModalProps {
  product: CoffeeProduct | TeaProduct | null;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

interface ProductModalContentProps {
  product: CoffeeProduct | TeaProduct;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

const COFFEE_ROAST_OPTIONS: CoffeeProduct['roastLevel'][] = [
  'Light City',
  'Medium Full-City',
  'Dark Espresso Roast',
];

const ProductModalContent: React.FC<ProductModalContentProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const isCoffee = 'roastLevel' in product;
  const coffee = isCoffee ? product : null;
  const tea = isCoffee ? null : product;
  const [selectedFormat, setSelectedFormat] = useState<string>(
    product.packagingFormats[0] || 'Default Packaging'
  );
  const [selectedRoast, setSelectedRoast] = useState<CoffeeProduct['roastLevel']>(
    isCoffee ? (product as CoffeeProduct).roastLevel : 'Medium Full-City'
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  const addedTimerRef = useRef<number | null>(null);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCloseRef.current();
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (addedTimerRef.current !== null) window.clearTimeout(addedTimerRef.current);
      previousFocus?.focus();
    };
  }, []);

  const handleAdd = () => {
    if (isAdded) return;

    onAddToCart({
      id: `${product.id}-${selectedRoast.replace(/\s+/g, '-')}-${selectedFormat.replace(/\s+/g, '-')}`,
      type: isCoffee ? 'coffee' : 'tea',
      productId: product.id,
      name: product.name,
      format: selectedFormat,
      roastLevel: isCoffee ? selectedRoast : undefined,
      quantity,
      image: product.image,
    });

    setIsAdded(true);
    addedTimerRef.current = window.setTimeout(() => {
      setIsAdded(false);
      onCloseRef.current();
    }, 1000);
  };

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-[#100D0A]/75 p-2 backdrop-blur-sm sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        aria-describedby="product-modal-description"
        className="relative grid h-[92vh] max-h-[760px] w-full max-w-5xl grid-rows-[220px_minmax(0,1fr)] overflow-hidden rounded-[1.75rem] border border-white/70 bg-[#FCFAF6] text-[#2A2522] shadow-[0_30px_100px_rgba(0,0,0,0.45)] sm:grid-rows-[260px_minmax(0,1fr)] md:h-[82vh] md:min-h-[600px] md:grid-cols-[0.92fr_1.08fr] md:grid-rows-1"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close product details"
          className="absolute right-3 top-3 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-[#201611]/75 text-white shadow-lg backdrop-blur-sm transition hover:bg-[#201611] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-4 sm:top-4"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="relative min-h-0 overflow-hidden bg-[#211713]">
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#17100D]/95 via-[#17100D]/15 to-[#17100D]/10" />
          <div className="absolute left-4 top-4 right-16 flex flex-wrap gap-2 sm:left-6 sm:top-6">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-[#201611]/75 px-3 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
              {isCoffee ? <Coffee className="h-3.5 w-3.5 text-[#F0B566]" aria-hidden="true" /> : <Leaf className="h-3.5 w-3.5 text-[#A9C88B]" aria-hidden="true" />}
              {isCoffee ? `Grade ${coffee?.grade}` : tea?.type}
            </span>
            {isCoffee && coffee?.isFeatured && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E9B66F]/30 bg-[#E9B66F]/90 px-3 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-[#24170E]">
                <Award className="h-3.5 w-3.5" aria-hidden="true" />
                Featured lot
              </span>
            )}
          </div>
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
            <div className="max-w-sm rounded-2xl border border-white/15 bg-[#201611]/75 p-4 text-white shadow-xl backdrop-blur-md sm:p-5">
              <span className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#E9B66F]">
                {isCoffee ? 'Cupping score' : 'Tea profile'}
              </span>
              <div className="mt-1 flex items-end gap-2">
                <span className="font-serif-display text-2xl font-bold sm:text-3xl">
                  {isCoffee ? coffee?.cuppingScore : tea?.polyphenols}
                </span>
                {isCoffee && <span className="pb-1 text-xs text-[#F1E4D2]/65">/ 100 SCA</span>}
              </div>
            </div>
          </div>
        </div>

        <div className="flex min-h-0 flex-col overflow-hidden">
          <div className="min-h-0 flex-1 space-y-5 overflow-y-auto p-5 sm:space-y-6 sm:p-7 lg:p-8">
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.13em] text-[#8A5A2B]">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                <span>{isCoffee ? coffee?.region : tea?.origin}</span>
              </div>
              <h2 id="product-modal-title" className="font-serif-display text-2xl font-bold leading-tight text-[#241B16] sm:text-3xl">
                {product.name}
              </h2>
              <p className="mt-1 text-sm font-medium text-[#756B62]">{product.subTitle}</p>
              <p id="product-modal-description" className="mt-4 text-sm leading-6 text-[#675F58]">
                {product.description}
              </p>
            </div>

            {isCoffee && (
              <dl className="grid grid-cols-2 gap-2.5 sm:gap-3">
                <div className="rounded-xl border border-[#EAE2D8] bg-white p-3 sm:p-3.5">
                  <dt className="text-[0.6rem] font-bold uppercase tracking-[0.12em] text-[#8A8178]">Cultivar</dt>
                  <dd className="mt-1 text-xs font-semibold leading-5 text-[#302721]">{coffee?.variety}</dd>
                </div>
                <div className="rounded-xl border border-[#EAE2D8] bg-white p-3 sm:p-3.5">
                  <dt className="flex items-center gap-1 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-[#8A8178]"><Mountain className="h-3 w-3" aria-hidden="true" />Altitude</dt>
                  <dd className="mt-1 text-xs font-semibold leading-5 text-[#302721]">{coffee?.altitude}</dd>
                </div>
                <div className="rounded-xl border border-[#EAE2D8] bg-white p-3 sm:p-3.5">
                  <dt className="text-[0.6rem] font-bold uppercase tracking-[0.12em] text-[#8A8178]">Choose roast</dt>
                  <dd className="mt-1 text-xs font-semibold leading-5 text-[#302721]">{selectedRoast}</dd>
                </div>
                <div className="rounded-xl border border-[#EAE2D8] bg-white p-3 sm:p-3.5">
                  <dt className="text-[0.6rem] font-bold uppercase tracking-[0.12em] text-[#8A8178]">Process</dt>
                  <dd className="mt-1 text-xs font-semibold leading-5 text-[#302721]">{coffee?.process}</dd>
                </div>
              </dl>
            )}

            <div>
              <h3 className="mb-2 text-[0.62rem] font-bold uppercase tracking-[0.15em] text-[#8A5A2B]">Tasting notes</h3>
              <div className="flex flex-wrap gap-2">
                {(isCoffee ? coffee?.flavorNotes : tea?.tastingNotes)?.map((note) => (
                  <span key={note} className="rounded-full border border-[#E5D9C9] bg-[#F5EFE6] px-3 py-1.5 text-xs font-medium text-[#4C4138]">
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {isCoffee && (
              <fieldset>
                <legend className="mb-2 text-[0.62rem] font-bold uppercase tracking-[0.15em] text-[#8A5A2B]">Choose roast</legend>
                <div className="grid grid-cols-3 gap-2">
                  {COFFEE_ROAST_OPTIONS.map((roast) => (
                    <button
                      key={roast}
                      type="button"
                      onClick={() => setSelectedRoast(roast)}
                      aria-pressed={selectedRoast === roast}
                      className={`min-h-11 rounded-xl border px-2 py-2 text-center text-[11px] font-semibold leading-4 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A46A32] sm:text-xs ${
                        selectedRoast === roast
                          ? 'border-[#34251B] bg-[#34251B] text-white shadow-sm'
                          : 'border-[#DFD5C9] bg-white text-[#4E443B] hover:border-[#A46A32] hover:bg-[#FBF7F1]'
                      }`}
                    >
                      {roast}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            <fieldset>
              <legend className="mb-2 text-[0.62rem] font-bold uppercase tracking-[0.15em] text-[#8A5A2B]">Choose pack size</legend>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                {product.packagingFormats.map((format) => (
                  <button
                    key={format}
                    type="button"
                    onClick={() => setSelectedFormat(format)}
                    aria-pressed={selectedFormat === format}
                    className={`flex min-h-11 w-full items-center justify-center rounded-xl border px-2.5 py-2 text-center text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A46A32] ${
                      selectedFormat === format
                        ? 'border-[#34251B] bg-[#34251B] text-white shadow-sm'
                        : 'border-[#DFD5C9] bg-white text-[#4E443B] hover:border-[#A46A32] hover:bg-[#FBF7F1]'
                    }`}
                  >
                    {format}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>

          <div className="shrink-0 border-t border-[#E9E1D7] bg-white/95 p-4 backdrop-blur-sm sm:px-7 sm:py-5 lg:px-8">
            <div className="flex items-center justify-between gap-3 sm:gap-5">
              <div className="min-w-0">
                <span className="block text-[0.6rem] font-bold uppercase tracking-[0.15em] text-[#81776D]">Price on request</span>
                <span className="mt-0.5 block truncate text-[11px] font-medium text-[#756B62]">Team confirms before acceptance</span>
              </div>

              <div className="flex shrink-0 flex-col items-center gap-1">
                <span className="text-[0.55rem] font-bold uppercase tracking-[0.12em] text-[#81776D]">Packs</span>
                <div role="group" aria-label="Number of packs" className="flex items-center overflow-hidden rounded-xl border border-[#DED4C8] bg-[#FAF7F2]">
                <button
                  type="button"
                  onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                  aria-label="Decrease quantity"
                  className="inline-flex h-10 w-10 items-center justify-center text-[#4B4037] transition hover:bg-[#EFE7DC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#A46A32]"
                >
                  <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
                <span className="min-w-8 text-center text-sm font-bold tabular-nums" aria-live="polite">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((current) => current + 1)}
                  aria-label="Increase quantity"
                  className="inline-flex h-10 w-10 items-center justify-center text-[#4B4037] transition hover:bg-[#EFE7DC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#A46A32]"
                >
                  <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              disabled={isAdded}
              className={`mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-md transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A46A32] ${
                isAdded ? 'bg-[#56713D]' : 'bg-[#D97706] hover:bg-[#B85F05]'
              }`}
            >
              {isAdded ? <Check className="h-4 w-4" aria-hidden="true" /> : <Plus className="h-4 w-4" aria-hidden="true" />}
              {isAdded ? 'Added to request' : 'Add to request'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToCart }) => {
  if (!product) return null;

  return (
    <ProductModalContent
      key={product.id}
      product={product}
      onClose={onClose}
      onAddToCart={onAddToCart}
    />
  );
};
