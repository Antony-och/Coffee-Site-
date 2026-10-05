import React from 'react';
import { CartItem, Currency, PageView } from '../types';
import { formatPrice } from '../utils/currency';
import { X, Trash2, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';

interface SampleCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  currency: Currency;
  setCurrentPage: (page: PageView) => void;
  onOpenCheckout: () => void;
}

export const SampleCartDrawer: React.FC<SampleCartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  currency,
  setCurrentPage,
  onOpenCheckout,
}) => {
  if (!isOpen) return null;

  const totalUsd = cartItems.reduce((sum, item) => sum + item.priceUsd * item.quantity, 0);
  const totalKes = cartItems.reduce((sum, item) => sum + item.priceKes * item.quantity, 0);
  const totalEur = cartItems.reduce((sum, item) => sum + item.priceEur * item.quantity, 0);

  const handleProceedToInquiryForm = () => {
    onClose();
    setCurrentPage('contact');
    setTimeout(() => {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleProceedToDirectCheckout = () => {
    onClose();
    onOpenCheckout();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#2A2522]/75 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-8 sm:pl-10">
        <div className="w-screen max-w-md bg-[#FFFDF9] text-[#2A2522] border-l border-[#E5E1DA] shadow-[0_20px_60px_rgba(42,37,34,0.22)] flex flex-col justify-between">
          <div className="border-b border-[#E5E1DA] bg-[#F9F5F0]">
            <div className="flex items-center justify-between px-5 py-5 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F4E5D2] text-[#B76000]">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.22em] text-[#8A7A6E]">Order summary</p>
                  <h2 className="font-serif-display text-lg font-bold text-[#2A2522]">
                    Your Cart
                  </h2>
                </div>
              </div>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E1DA] bg-white text-[#6F665F] transition hover:bg-[#F3EEE8]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto bg-white px-5 py-5 sm:px-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="flex min-h-[340px] flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-[#E5E1DA] bg-[#FAF7F2] px-5 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#F4E5D2] text-[#B76000]">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <p className="font-serif-display text-xl font-bold text-[#2A2522]">
                  Your cart is empty
                </p>
                <p className="mt-2 max-w-xs text-xs leading-relaxed text-[#7A746E]">
                  Select coffee or tea from the collection to build your order.
                </p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-[1.25rem] border border-[#F0EAE4] bg-[#FAF7F2] p-3"
                >
                  <div className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 rounded-[0.9rem] object-cover border border-[#E5E1DA] bg-white"
                      referrerPolicy="no-referrer"
                    />

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h4 className="font-serif-display text-sm font-bold text-[#2A2522] leading-tight truncate">
                            {item.name}
                          </h4>
                          <span className="mt-1 block text-[9px] uppercase tracking-[0.14em] text-[#7A746E]">
                            {item.format}
                          </span>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="flex h-7 w-7 items-center justify-center rounded-full text-[#7A746E] transition hover:bg-[#F0E7DE] hover:text-[#C2410C]"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="mt-3 flex items-center justify-between gap-3">
                        <span className="text-sm font-bold text-[#2A2522]">
                          {formatPrice(item.priceUsd * item.quantity, item.priceKes * item.quantity, item.priceEur * item.quantity, currency)}
                        </span>

                        <div className="flex items-center overflow-hidden rounded-full border border-[#E5E1DA] bg-white">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="flex h-7 w-7 items-center justify-center text-base font-medium text-[#2A2522] transition hover:bg-[#F5F1EA]"
                          >
                            -
                          </button>
                          <span className="min-w-[1.75rem] text-center text-[11px] font-bold text-[#2A2522]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="flex h-7 w-7 items-center justify-center text-base font-medium text-[#2A2522] transition hover:bg-[#F5F1EA]"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="border-t border-[#E5E1DA] bg-[#FAF7F2] px-5 py-5 sm:px-6">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.18em] text-[#7A746E]">Total</span>
                <span className="font-serif-display text-[1.8rem] leading-none text-[#D97706]">
                  {formatPrice(totalUsd, totalKes, totalEur, currency)}
                </span>
              </div>

              <div className="mb-4 rounded-[1rem] border border-[#E5E1DA] bg-white px-3 py-2 text-[10px] leading-relaxed text-[#6F665F] flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#5D6D3C]" />
                <span>Direct export inquiry, quote review, and courier coordination included.</span>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleProceedToDirectCheckout}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#2A2522] px-4 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-[#1E1A17]"
                >
                  <span>Checkout</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  onClick={handleProceedToInquiryForm}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-[#D8D0C5] bg-white px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#6F665F] transition hover:bg-[#F5F1EA]"
                >
                  <span>Send inquiry</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
