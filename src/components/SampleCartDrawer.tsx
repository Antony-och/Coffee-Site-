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
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white text-[#2A2522] border-l border-[#E5E1DA] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 bg-[#2D241E] text-white flex items-center justify-between border-b border-[#E5E1DA]/20">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#D97706]" />
              <h2 className="font-serif-display text-lg font-bold text-[#FAF7F2]">
                Your Order Cart & Quote
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-[#D4C3A3] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-3 text-[#7A746E]">
                <ShoppingBag className="w-12 h-12 text-[#D97706]/40 mx-auto" />
                <p className="font-serif-display text-base font-bold text-[#2A2522]">
                  Your order cart is currently empty
                </p>
                <p className="text-xs">
                  Browse our Coffee Reserve or Purified Teas catalog and click "Add to Order" to build your custom wholesale or retail order.
                </p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-[#FAF7F2] border border-[#E5E1DA] rounded-2xl items-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 className="font-serif-display text-xs font-bold text-[#2A2522] truncate">
                      {item.name}
                    </h4>
                    <span className="text-[10px] text-[#7A746E] block truncate">
                      Format: {item.format}
                    </span>
                    <span className="text-xs font-bold text-[#D97706]">
                      {formatPrice(item.priceUsd * item.quantity, item.priceKes * item.quantity, item.priceEur * item.quantity, currency)}
                    </span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-xs text-red-600 hover:text-red-800 p-1"
                      title="Remove Item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="flex items-center border border-[#E5E1DA] rounded-lg overflow-hidden bg-white text-xs">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="px-2 py-0.5 font-bold hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="px-2 font-bold">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="px-2 py-0.5 font-bold hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-[#FAF7F2] border-t border-[#E5E1DA] space-y-4">
              <div className="flex justify-between items-center text-sm font-bold text-[#2A2522]">
                <span>Total Order Estimate:</span>
                <span className="font-serif-display text-xl text-[#D97706]">
                  {formatPrice(totalUsd, totalKes, totalEur, currency)}
                </span>
              </div>

              <div className="text-[11px] text-[#7A746E] leading-snug flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#5D6D3C] shrink-0" />
                <span>Includes phytosanitary inspection & direct air express tracking to your door.</span>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleProceedToDirectCheckout}
                  className="w-full py-3.5 rounded-full bg-[#D97706] hover:bg-[#b86505] text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 transition-all"
                >
                  <span>Proceed to Checkout & Place Order</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleProceedToInquiryForm}
                  className="w-full py-2.5 rounded-full border border-[#E5E1DA] hover:bg-gray-100 text-[#7A746E] font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>Send Order via Inquiry Form</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
