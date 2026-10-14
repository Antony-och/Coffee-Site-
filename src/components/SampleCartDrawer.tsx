import React, { useEffect } from 'react';
import {
  ArrowRight,
  Coffee,
  Leaf,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react';
import { CartItem, PageView } from '../types';

interface SampleCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  setCurrentPage: (page: PageView) => void;
  onOpenCheckout: () => void;
}

export const SampleCartDrawer: React.FC<SampleCartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  setCurrentPage,
  onOpenCheckout,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleProceedToInquiry = () => {
    onClose();
    window.setTimeout(() => setCurrentPage('contact'), 80);
  };

  const handleProceedToCheckout = () => {
    onClose();
    onOpenCheckout();
  };

  return (
    <div className="fixed inset-0 z-[70] flex justify-end bg-[#130D0A]/65 backdrop-blur-sm animate-fadeIn">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close cart"
        className="absolute inset-0 h-full w-full cursor-default"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-heading"
        className="relative z-10 flex h-full w-full max-w-xl flex-col border-l border-[#E5DACE] bg-[#FAF7F2] text-[#2A2522] shadow-[-24px_0_70px_rgba(22,14,10,0.24)]"
      >
        <header className="relative overflow-hidden bg-[#241713] px-5 py-5 text-white sm:px-7 sm:py-6">
          <div className="pointer-events-none absolute -right-12 -top-20 h-56 w-56 rounded-full bg-[#D97706]/10 blur-2xl" />
          <div className="relative flex items-start justify-between gap-4">
            <div>
              <div className="mb-2 flex items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-[#E9B66F]">
                <ShoppingBag className="h-3.5 w-3.5" aria-hidden="true" />
                Order summary
              </div>
              <div className="flex items-center gap-3">
                <h2 id="cart-heading" className="font-serif-display text-2xl font-bold sm:text-3xl">Your Request</h2>
                <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[0.65rem] font-semibold text-[#F6EDE2]">
                  {itemCount} {itemCount === 1 ? 'pack' : 'packs'}
                </span>
              </div>
              <p className="mt-2 text-xs text-[#E6D9CC]/75">Review your selections before requesting a quote.</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close cart"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </header>

        {cartItems.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[#EADCCB] bg-white text-[#A85F1A] shadow-sm">
              <ShoppingBag className="h-7 w-7" aria-hidden="true" />
            </div>
            <h3 className="font-serif-display text-xl font-bold">Your cart is empty</h3>
            <p className="mt-2 max-w-xs text-sm leading-6 text-[#766D64]">
              Find a coffee or tea to start putting your order together.
            </p>
            <div className="mt-6 flex w-full max-w-sm gap-3">
              <button
                type="button"
                onClick={() => { onClose(); setCurrentPage('coffee'); }}
                className="flex-1 rounded-xl bg-[#2A1B16] px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#3D281F]"
              >
                Browse coffee
              </button>
              <button
                type="button"
                onClick={() => { onClose(); setCurrentPage('tea'); }}
                className="flex-1 rounded-xl border border-[#DCD1C4] bg-white px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-[#473A30] transition hover:bg-[#F4EEE7]"
              >
                Browse tea
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-6 sm:py-6">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#86796D]">Selected pack sizes</h3>
                <span className="text-xs text-[#86796D]">{itemCount} {itemCount === 1 ? 'pack' : 'packs'} total</span>
              </div>
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <article key={item.id} className="rounded-2xl border border-[#EAE2D8] bg-white p-3.5 shadow-[0_5px_18px_rgba(51,37,27,0.035)] sm:p-4">
                    <div className="flex gap-3.5">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-[4.5rem] w-[4.5rem] shrink-0 rounded-xl border border-[#E8E1D8] bg-[#F4EEE7] object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="mb-1 flex items-center gap-1.5 text-[0.58rem] font-bold uppercase tracking-[0.13em] text-[#9A6A3F]">
                              {item.type === 'coffee' ? <Coffee className="h-3 w-3" aria-hidden="true" /> : <Leaf className="h-3 w-3" aria-hidden="true" />}
                              {item.type === 'coffee' ? 'Coffee' : 'Tea'}
                            </p>
                            <h4 className="truncate font-serif-display text-sm font-bold leading-5 text-[#2A211B]">{item.name}</h4>
                            <p className="mt-1 line-clamp-1 text-[0.68rem] text-[#766D64]">{item.format}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.id)}
                            aria-label={`Remove ${item.name}, ${item.format}`}
                            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#86796D] transition hover:bg-[#FAEDEA] hover:text-[#B54732] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A46A32]"
                          >
                            <Trash2 className="h-4 w-4" aria-hidden="true" />
                          </button>
                        </div>

                        <div className="mt-3 flex items-end justify-between gap-3">
                          <div className="inline-flex items-center overflow-hidden rounded-lg border border-[#E5DDD3] bg-[#FAF7F2]" role="group" aria-label={`Pack quantity for ${item.name}`}>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              aria-label={`Decrease ${item.name} quantity`}
                              className="inline-flex h-8 w-8 items-center justify-center text-[#4E443B] transition hover:bg-[#EFE6DA]"
                            >
                              <Minus className="h-3 w-3" aria-hidden="true" />
                            </button>
                            <span className="min-w-8 text-center text-xs font-bold tabular-nums" aria-live="polite">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              aria-label={`Increase ${item.name} quantity`}
                              className="inline-flex h-8 w-8 items-center justify-center text-[#4E443B] transition hover:bg-[#EFE6DA]"
                            >
                              <Plus className="h-3 w-3" aria-hidden="true" />
                            </button>
                          </div>
                          <span className="text-right text-[0.65rem] font-semibold text-[#766D64]">Price on request</span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <footer className="shrink-0 border-t border-[#E8E0D6] bg-white px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 sm:px-6 sm:pt-5">
              <div className="rounded-2xl bg-[#241713] px-4 py-4 text-white sm:px-5">
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[#F0B566]">Price on request</p>
                <p className="mt-2 text-[0.72rem] leading-5 text-[#E6D9CC]/85">
                  Our team will confirm prices, availability and delivery before your order is accepted.
                </p>
              </div>

              <button
                type="button"
                onClick={handleProceedToCheckout}
                className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-xs font-bold uppercase tracking-[0.11em] text-[#132318] shadow-[0_8px_20px_rgba(37,211,102,0.2)] transition hover:bg-[#20BD5A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#168B48]"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>Review your request</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <p className="mt-2 text-center text-[0.65rem] leading-5 text-[#81776D]">
                Add contact and delivery details, then send your request to the team on WhatsApp.
              </p>
              <button
                type="button"
                onClick={handleProceedToInquiry}
                className="mt-2 w-full rounded-xl py-2 text-[0.68rem] font-semibold text-[#766D64] transition hover:text-[#A85F1A]"
              >
                Ask a question instead
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
};
