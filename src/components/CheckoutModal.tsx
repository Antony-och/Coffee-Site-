import React, { useState } from 'react';
import { CartItem, Currency, Order, OrderShippingDetails } from '../types';
import { formatPrice } from '../utils/currency';
import {
  generateWhatsAppOrderMessage,
  generateWhatsAppOrderUrl,
  generateEmailOrderUrl,
  EXPORT_WHATSAPP_PHONE,
  EXPORT_EMAIL_ADDRESS,
} from '../utils/orderNotification';
import {
  X,
  CreditCard,
  CheckCircle2,
  Phone,
  Building2,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Copy,
  Check,
  FileText,
  Clock,
  Sparkles,
  DollarSign,
  MessageSquare,
  Mail,
  Send,
  ExternalLink,
  MapPin,
  User,
  ShoppingBag
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  currency: Currency;
  onPlaceOrder: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  currency,
  onPlaceOrder,
}) => {
  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details');
  const [copiedId, setCopiedId] = useState(false);
  const [copiedPayload, setCopiedPayload] = useState(false);
  const [whatsappSent, setWhatsappSent] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [showTextPreview, setShowTextPreview] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  // Form State
  const [shippingDetails, setShippingDetails] = useState<OrderShippingDetails>({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    streetAddress: '',
    city: '',
    country: 'Kenya',
    postalCode: '',
    shippingMethod: 'direct_air_express',
    paymentMethod: 'card',
    mpesaPhone: '',
    cardLastFour: '',
  });

  // Credit Card Form State
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    nameOnCard: '',
  });

  if (!isOpen) return null;

  // Pricing calculations
  const subtotalUsd = cartItems.reduce((sum, item) => sum + item.priceUsd * item.quantity, 0);
  const subtotalKes = cartItems.reduce((sum, item) => sum + item.priceKes * item.quantity, 0);
  const subtotalEur = cartItems.reduce((sum, item) => sum + item.priceEur * item.quantity, 0);

  const getShippingFees = () => {
    return { usd: 0, kes: 0, eur: 0 };
  };

  const shippingFees = getShippingFees();

  const totalUsd = subtotalUsd + shippingFees.usd;
  const totalKes = subtotalKes + shippingFees.kes;
  const totalEur = subtotalEur + shippingFees.eur;

  const handleNextToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingDetails.fullName || !shippingDetails.email || !shippingDetails.streetAddress || !shippingDetails.city) {
      return;
    }
    setStep('payment');
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderId = `ORD-KHC-${randomNum}`;
    const trackingNum = `KHC-EXP-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder: Order = {
      id: orderId,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      status: 'Processing',
      items: [...cartItems],
      subtotalUsd,
      subtotalKes,
      subtotalEur,
      shippingFeeUsd: shippingFees.usd,
      shippingFeeKes: shippingFees.kes,
      shippingFeeEur: shippingFees.eur,
      totalUsd,
      totalKes,
      totalEur,
      currency,
      shippingDetails: {
        ...shippingDetails,
        cardLastFour: cardInfo.cardNumber ? cardInfo.cardNumber.slice(-4) : '4242',
      },
      trackingNumber: trackingNum,
      estimatedDelivery: '3 - 5 Business Days via Direct In-House Air Express',
    };

    setPlacedOrder(newOrder);
    onPlaceOrder(newOrder);
    setStep('confirmation');

    // Automatically trigger WhatsApp transmission on user submission
    try {
      const waUrl = generateWhatsAppOrderUrl(newOrder, EXPORT_WHATSAPP_PHONE);
      window.open(waUrl, '_blank');
      setWhatsappSent(true);
    } catch {
      // User can still click the prominent transmission button in the confirmation center
    }
  };

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleSendWhatsApp = (order: Order) => {
    const url = generateWhatsAppOrderUrl(order, EXPORT_WHATSAPP_PHONE);
    window.open(url, '_blank');
    setWhatsappSent(true);
  };

  const handleSendEmail = (order: Order) => {
    const url = generateEmailOrderUrl(order, EXPORT_EMAIL_ADDRESS);
    window.location.href = url;
    setEmailSent(true);
  };

  const handleCopyOrderPayload = (order: Order) => {
    const message = generateWhatsAppOrderMessage(order);
    navigator.clipboard.writeText(message);
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative bg-white text-[#2A2522] w-full max-w-2xl rounded-3xl shadow-2xl border border-[#E5E1DA] overflow-hidden flex flex-col my-8">
        
        {/* Modal Header */}
        <div className="bg-[#2D241E] text-white px-6 py-5 flex items-center justify-between border-b border-[#D4C3A3]/20">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#D97706]/20 text-[#D97706] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif-display text-lg font-bold text-white">
                {step === 'confirmation' ? 'Order Placed Successfully!' : 'Highland Reserve Checkout'}
              </h2>
              <p className="text-[11px] text-[#D4C3A3]/80">
                {step === 'details' && 'Step 1 of 2: Shipping & Delivery Details'}
                {step === 'payment' && 'Step 2 of 2: Secure Payment & Invoice Method'}
                {step === 'confirmation' && `Order ID: ${placedOrder?.id}`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-[#D4C3A3] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">

          {/* STEP 1: SHIPPING & BUYER DETAILS */}
          {step === 'details' && (
            <form onSubmit={handleNextToPayment} className="space-y-6">
              
              {/* Items Summary Accordion */}
              <div className="bg-[#FAF7F2] border border-[#E5E1DA] rounded-2xl p-4 space-y-3">
                <div className="flex justify-between items-center text-xs font-bold border-b border-[#E5E1DA] pb-2">
                  <span className="text-[#2A2522] uppercase tracking-wider">
                    Ordered Items ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
                  </span>
                  <span className="text-[#D97706]">
                    Subtotal: {formatPrice(subtotalUsd, subtotalKes, subtotalEur, currency)}
                  </span>
                </div>
                <div className="max-h-36 overflow-y-auto space-y-2 pr-1">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2 min-w-0">
                        <img src={item.image} alt={item.name} className="w-8 h-8 rounded-lg object-cover" />
                        <div className="truncate">
                          <span className="font-bold text-[#2A2522] block truncate">{item.name}</span>
                          <span className="text-[10px] text-[#7A746E] block">Qty: {item.quantity} • {item.format}</span>
                        </div>
                      </div>
                      <span className="font-bold text-[#D97706] shrink-0 ml-2">
                        {formatPrice(item.priceUsd * item.quantity, item.priceKes * item.quantity, item.priceEur * item.quantity, currency)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recipient Form Fields */}
              <div className="space-y-4">
                <h3 className="font-serif-display text-sm font-bold text-[#2A2522] uppercase tracking-wider border-b border-[#E5E1DA] pb-2">
                  Recipient & Contact Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7A746E] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingDetails.fullName}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, fullName: e.target.value })}
                      placeholder="e.g. David Miller"
                      className="w-full bg-[#FAF7F2] border border-[#E5E1DA] rounded-xl px-3.5 py-2.5 text-xs text-[#2A2522] focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7A746E] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={shippingDetails.email}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, email: e.target.value })}
                      placeholder="e.g. david@roastery.com"
                      className="w-full bg-[#FAF7F2] border border-[#E5E1DA] rounded-xl px-3.5 py-2.5 text-xs text-[#2A2522] focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7A746E] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={shippingDetails.phone}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, phone: e.target.value })}
                      placeholder="+1 (555) 234-5678"
                      className="w-full bg-[#FAF7F2] border border-[#E5E1DA] rounded-xl px-3.5 py-2.5 text-xs text-[#2A2522] focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7A746E] mb-1">
                      Company / Roastery (Optional)
                    </label>
                    <input
                      type="text"
                      value={shippingDetails.companyName}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, companyName: e.target.value })}
                      placeholder="Highland Coffee Roasters LLC"
                      className="w-full bg-[#FAF7F2] border border-[#E5E1DA] rounded-xl px-3.5 py-2.5 text-xs text-[#2A2522] focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="space-y-4">
                <h3 className="font-serif-display text-sm font-bold text-[#2A2522] uppercase tracking-wider border-b border-[#E5E1DA] pb-2">
                  Delivery Address
                </h3>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7A746E] mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingDetails.streetAddress}
                    onChange={(e) => setShippingDetails({ ...shippingDetails, streetAddress: e.target.value })}
                    placeholder="124 Harvest Way, Suite 4B"
                    className="w-full bg-[#FAF7F2] border border-[#E5E1DA] rounded-xl px-3.5 py-2.5 text-xs text-[#2A2522] focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7A746E] mb-1">
                      City / Town *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingDetails.city}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, city: e.target.value })}
                      placeholder="Nairobi / London / Seattle"
                      className="w-full bg-[#FAF7F2] border border-[#E5E1DA] rounded-xl px-3.5 py-2.5 text-xs text-[#2A2522] focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7A746E] mb-1">
                      Country *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingDetails.country}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, country: e.target.value })}
                      placeholder="Kenya / United States / Germany"
                      className="w-full bg-[#FAF7F2] border border-[#E5E1DA] rounded-xl px-3.5 py-2.5 text-xs text-[#2A2522] focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7A746E] mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      value={shippingDetails.postalCode}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, postalCode: e.target.value })}
                      placeholder="00100 / 98101"
                      className="w-full bg-[#FAF7F2] border border-[#E5E1DA] rounded-xl px-3.5 py-2.5 text-xs text-[#2A2522] focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                    />
                  </div>
                </div>
              </div>



              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#E5E1DA] flex items-center justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full border border-[#E5E1DA] text-xs font-bold text-[#7A746E] hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-[#D97706] hover:bg-[#b86505] text-white text-xs font-bold uppercase tracking-wider shadow flex items-center gap-2 transition-colors"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          )}

          {/* STEP 2: PAYMENT METHOD */}
          {step === 'payment' && (
            <form onSubmit={handleCompleteOrder} className="space-y-6">
              
              {/* Order Breakdown Banner */}
              <div className="bg-[#2D241E] text-white rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#D4C3A3] uppercase font-bold tracking-wider block">
                    Total Amount Due
                  </span>
                  <span className="font-serif-display text-2xl font-bold text-[#D97706]">
                    {formatPrice(totalUsd, totalKes, totalEur, currency)}
                  </span>
                </div>
                <div className="text-right text-xs text-[#D4C3A3]">
                  <span>Items: {formatPrice(subtotalUsd, subtotalKes, subtotalEur, currency)}</span>
                  <span className="block text-[11px] text-gray-400">
                    Shipping: {formatPrice(shippingFees.usd, shippingFees.kes, shippingFees.eur, currency)}
                  </span>
                </div>
              </div>

              {/* Payment Type Tabs */}
              <div className="space-y-3">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7A746E]">
                  Select Payment Method
                </label>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setShippingDetails({ ...shippingDetails, paymentMethod: 'card' })}
                    className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                      shippingDetails.paymentMethod === 'card'
                        ? 'border-[#D97706] bg-[#D97706]/10 text-[#2A2522]'
                        : 'border-[#E5E1DA] bg-[#FAF7F2] text-[#7A746E]'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-[#D97706]" />
                    <span>Credit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShippingDetails({ ...shippingDetails, paymentMethod: 'mpesa' })}
                    className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                      shippingDetails.paymentMethod === 'mpesa'
                        ? 'border-[#5D6D3C] bg-[#5D6D3C]/10 text-[#2A2522]'
                        : 'border-[#E5E1DA] bg-[#FAF7F2] text-[#7A746E]'
                    }`}
                  >
                    <Phone className="w-4 h-4 text-[#5D6D3C]" />
                    <span>M-PESA Express</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShippingDetails({ ...shippingDetails, paymentMethod: 'wire' })}
                    className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                      shippingDetails.paymentMethod === 'wire'
                        ? 'border-[#2D241E] bg-[#2D241E]/10 text-[#2A2522]'
                        : 'border-[#E5E1DA] bg-[#FAF7F2] text-[#7A746E]'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-[#2D241E]" />
                    <span>Bank Wire / Invoice</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShippingDetails({ ...shippingDetails, paymentMethod: 'cod' })}
                    className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                      shippingDetails.paymentMethod === 'cod'
                        ? 'border-[#D97706] bg-[#D97706]/10 text-[#2A2522]'
                        : 'border-[#E5E1DA] bg-[#FAF7F2] text-[#7A746E]'
                    }`}
                  >
                    <DollarSign className="w-4 h-4 text-[#D97706]" />
                    <span>Pay on Delivery</span>
                  </button>
                </div>
              </div>

              {/* Payment Details Sub-forms */}
              {shippingDetails.paymentMethod === 'card' && (
                <div className="bg-[#FAF7F2] border border-[#E5E1DA] rounded-2xl p-4 space-y-4">
                  <div className="flex items-center justify-between border-b border-[#E5E1DA] pb-2">
                    <span className="text-xs font-bold text-[#2A2522]">Credit or Debit Card</span>
                    <span className="text-[10px] text-[#7A746E]">256-Bit SSL Encrypted</span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7A746E] mb-1">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={cardInfo.cardNumber}
                      onChange={(e) => setCardInfo({ ...cardInfo, cardNumber: e.target.value })}
                      placeholder="4532 •••• •••• 8912"
                      className="w-full bg-white border border-[#E5E1DA] rounded-xl px-3.5 py-2.5 text-xs text-[#2A2522] focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7A746E] mb-1">
                        Expiration Date *
                      </label>
                      <input
                        type="text"
                        required
                        value={cardInfo.expiry}
                        onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                        placeholder="MM / YY"
                        className="w-full bg-white border border-[#E5E1DA] rounded-xl px-3.5 py-2.5 text-xs text-[#2A2522] focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7A746E] mb-1">
                        CVC / CVV *
                      </label>
                      <input
                        type="text"
                        required
                        value={cardInfo.cvv}
                        onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                        placeholder="312"
                        className="w-full bg-white border border-[#E5E1DA] rounded-xl px-3.5 py-2.5 text-xs text-[#2A2522] focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {shippingDetails.paymentMethod === 'mpesa' && (
                <div className="bg-[#FAF7F2] border border-[#5D6D3C]/30 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#5D6D3C] text-white flex items-center justify-center font-bold text-xs">
                      M
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#2A2522]">Safaricom M-PESA Global Express</h4>
                      <p className="text-[10px] text-[#7A746E]">An STK push prompt will be sent to your phone number.</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7A746E] mb-1">
                      M-PESA Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={shippingDetails.mpesaPhone || shippingDetails.phone}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, mpesaPhone: e.target.value })}
                      placeholder="e.g. 0712345678 or +254..."
                      className="w-full bg-white border border-[#E5E1DA] rounded-xl px-3.5 py-2.5 text-xs text-[#2A2522] focus:outline-none focus:ring-2 focus:ring-[#5D6D3C]"
                    />
                  </div>
                </div>
              )}

              {shippingDetails.paymentMethod === 'wire' && (
                <div className="bg-[#FAF7F2] border border-[#2D241E]/20 rounded-2xl p-4 space-y-2 text-xs">
                  <h4 className="font-bold text-[#2A2522] flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-[#2D241E]" />
                    <span>Direct Bank Wire Transfer</span>
                  </h4>
                  <p className="text-[11px] text-[#7A746E]">
                    A pro-forma SWIFT invoice will be issued instantly with our Equity Bank Kenya SWIFT details for order dispatch.
                  </p>
                </div>
              )}

              {shippingDetails.paymentMethod === 'cod' && (
                <div className="bg-[#FAF7F2] border border-[#D97706]/30 rounded-2xl p-4 space-y-2 text-xs">
                  <h4 className="font-bold text-[#2A2522] flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-[#D97706]" />
                    <span>Pay on Delivery / Inspection</span>
                  </h4>
                  <p className="text-[11px] text-[#7A746E]">
                    Pay upon physical receipt and phytosanitary certificate verification by cash or card reader.
                  </p>
                </div>
              )}

              {/* Action Navigation */}
              <div className="pt-4 border-t border-[#E5E1DA] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="px-4 py-2.5 rounded-full border border-[#E5E1DA] text-xs font-bold text-[#7A746E] hover:bg-gray-100 flex items-center gap-1.5 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Details</span>
                </button>

                <button
                  type="submit"
                  className="px-7 py-3.5 rounded-full bg-[#5D6D3C] hover:bg-[#4a582e] text-white text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-2 transition-all"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Confirm & Place Order</span>
                </button>
              </div>

            </form>
          )}

          {/* STEP 3: ORDER CONFIRMATION & DISPATCH CENTER */}
          {step === 'confirmation' && placedOrder && (
            <div className="space-y-6">
              
              {/* Green Success Banner */}
              <div className="bg-[#5D6D3C]/10 border border-[#5D6D3C]/30 rounded-3xl p-6 text-center space-y-3">
                <div className="w-14 h-14 bg-[#5D6D3C] text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#5D6D3C]">
                    Order Placed Successfully
                  </span>
                  <h3 className="font-serif-display text-2xl font-extrabold text-[#2A2522] mt-0.5">
                    Order Reference #{placedOrder.id}
                  </h3>
                  <p className="text-xs text-[#7A746E] max-w-md mx-auto mt-1">
                    Thank you, <strong>{placedOrder.shippingDetails.fullName}</strong>. Your export consignment has been registered. Complete the transmission below to dispatch instant copies to WhatsApp and Email.
                  </p>
                </div>
              </div>

              {/* PRIMARY TRANSMISSION ACTION CARDS (WhatsApp & Email) */}
              <div className="bg-[#2D241E] text-white rounded-3xl p-5 sm:p-6 space-y-4 shadow-lg border border-[#D4C3A3]/20">
                <div className="flex items-center justify-between border-b border-[#D4C3A3]/20 pb-3">
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4 text-[#D97706]" />
                    <h4 className="font-serif-display text-sm font-bold text-white uppercase tracking-wider">
                      Send Order to WhatsApp & Email
                    </h4>
                  </div>
                  <span className="text-[10px] text-[#D4C3A3] font-mono bg-white/10 px-2 py-0.5 rounded">
                    5-Point Verified Payload
                  </span>
                </div>

                <p className="text-xs text-[#D4C3A3]/90 leading-relaxed">
                  Transmit this complete order record directly to our export desk and keep a copy in your personal channels.
                </p>

                {/* Direct Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* WhatsApp Direct Send */}
                  <button
                    onClick={() => handleSendWhatsApp(placedOrder)}
                    className={`p-4 rounded-2xl font-bold text-xs flex flex-col justify-between space-y-2 transition-all shadow-md ${
                      whatsappSent
                        ? 'bg-[#128C7E] text-white ring-2 ring-white/30'
                        : 'bg-[#25D366] hover:bg-[#20bd5a] text-white hover:scale-[1.01]'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 fill-current" />
                        <span className="font-bold text-sm">Send to WhatsApp</span>
                      </div>
                      <ExternalLink className="w-4 h-4 opacity-80" />
                    </div>
                    <div className="text-[11px] text-left text-white/90">
                      {whatsappSent ? '✓ Opened WhatsApp (+254 700 000 000)' : 'Chat with Export Desk (+254 700 000 000)'}
                    </div>
                  </button>

                  {/* Email Direct Send */}
                  <button
                    onClick={() => handleSendEmail(placedOrder)}
                    className={`p-4 rounded-2xl font-bold text-xs flex flex-col justify-between space-y-2 transition-all shadow-md ${
                      emailSent
                        ? 'bg-[#b86505] text-white ring-2 ring-white/30'
                        : 'bg-[#D97706] hover:bg-[#b86505] text-white hover:scale-[1.01]'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <Mail className="w-5 h-5" />
                        <span className="font-bold text-sm">Send via Email</span>
                      </div>
                      <ExternalLink className="w-4 h-4 opacity-80" />
                    </div>
                    <div className="text-[11px] text-left text-white/90 truncate w-full">
                      {emailSent ? `✓ Opened Mail Client (CC: ${placedOrder.shippingDetails.email})` : `Send to export@kenyanhighlandcoffee.co.ke`}
                    </div>
                  </button>
                </div>

                {/* Secondary Quick Actions: Copy Payload & Toggle Preview */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#D4C3A3]/10 text-xs">
                  <button
                    onClick={() => handleCopyOrderPayload(placedOrder)}
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#FAF7F2] font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    {copiedPayload ? <Check className="w-3.5 h-3.5 text-[#5D6D3C]" /> : <Copy className="w-3.5 h-3.5 text-[#D97706]" />}
                    <span>{copiedPayload ? 'Full Order Details Copied!' : 'Copy Order Text Message'}</span>
                  </button>

                  <button
                    onClick={() => setShowTextPreview(!showTextPreview)}
                    className="text-[#D4C3A3] hover:text-white underline text-[11px]"
                  >
                    {showTextPreview ? 'Hide Message Preview' : 'View Formatted Message Preview'}
                  </button>
                </div>

                {/* Collapsible Formatted Message Preview */}
                {showTextPreview && (
                  <div className="bg-[#1C120E] border border-[#D4C3A3]/20 rounded-2xl p-3.5 text-[11px] font-mono text-[#D4C3A3] whitespace-pre-wrap max-h-48 overflow-y-auto select-all">
                    {generateWhatsAppOrderMessage(placedOrder)}
                  </div>
                )}
              </div>

              {/* 5-POINT MANDATORY DATA VERIFICATION CHECKLIST */}
              <div className="bg-[#FAF7F2] border border-[#E5E1DA] rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-[#E5E1DA] pb-3 text-xs">
                  <span className="font-bold text-[#2A2522] uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-[#D97706]" />
                    Order & Buyer Record Summary
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-serif-display font-extrabold text-[#2A2522]">{placedOrder.id}</span>
                    <button
                      onClick={() => handleCopyId(placedOrder.id)}
                      className="text-[#D97706] hover:text-[#b86505] p-1 text-[11px] flex items-center gap-1 font-bold"
                    >
                      {copiedId ? <Check className="w-3.5 h-3.5 text-[#5D6D3C]" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedId ? 'Copied' : 'Copy ID'}</span>
                    </button>
                  </div>
                </div>

                {/* 5 Specific Required Items Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  {/* 1. Buyer's Name */}
                  <div className="bg-white border border-[#E5E1DA] rounded-xl p-3 space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-[#7A746E]">
                      <User className="w-3.5 h-3.5 text-[#D97706]" />
                      <span>1. Buyer's Name</span>
                    </div>
                    <p className="font-bold text-[#2A2522] text-sm">{placedOrder.shippingDetails.fullName}</p>
                    {placedOrder.shippingDetails.companyName && (
                      <p className="text-[11px] text-[#7A746E]">{placedOrder.shippingDetails.companyName}</p>
                    )}
                  </div>

                  {/* 2. Buyer's Phone Number */}
                  <div className="bg-white border border-[#E5E1DA] rounded-xl p-3 space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-[#7A746E]">
                      <Phone className="w-3.5 h-3.5 text-[#5D6D3C]" />
                      <span>2. Contact Phone Number</span>
                    </div>
                    <p className="font-bold text-[#2A2522] text-sm">{placedOrder.shippingDetails.phone}</p>
                    {placedOrder.shippingDetails.mpesaPhone && placedOrder.shippingDetails.mpesaPhone !== placedOrder.shippingDetails.phone && (
                      <p className="text-[11px] text-[#7A746E]">M-PESA Phone: {placedOrder.shippingDetails.mpesaPhone}</p>
                    )}
                  </div>

                  {/* 3. Buyer's Email */}
                  <div className="bg-white border border-[#E5E1DA] rounded-xl p-3 space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-[#7A746E]">
                      <Mail className="w-3.5 h-3.5 text-[#D97706]" />
                      <span>3. Email Address</span>
                    </div>
                    <p className="font-bold text-[#2A2522] text-sm break-all">{placedOrder.shippingDetails.email}</p>
                    <p className="text-[10px] text-[#5D6D3C] font-semibold">✓ Invoice queued for delivery</p>
                  </div>

                  {/* 4. Delivery Location */}
                  <div className="bg-white border border-[#E5E1DA] rounded-xl p-3 space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-[#7A746E]">
                      <MapPin className="w-3.5 h-3.5 text-[#5D6D3C]" />
                      <span>4. Delivery Location</span>
                    </div>
                    <p className="font-bold text-[#2A2522] text-xs">
                      {placedOrder.shippingDetails.streetAddress}
                    </p>
                    <p className="text-[11px] text-[#7A746E]">
                      {placedOrder.shippingDetails.city}, {placedOrder.shippingDetails.country}
                      {placedOrder.shippingDetails.postalCode ? ` (${placedOrder.shippingDetails.postalCode})` : ''}
                    </p>
                  </div>
                </div>

                {/* 5. Order Contents & Financials */}
                <div className="bg-white border border-[#E5E1DA] rounded-xl p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between text-xs border-b border-[#E5E1DA] pb-2">
                    <span className="font-bold text-[#2A2522] uppercase tracking-wider flex items-center gap-1.5">
                      <ShoppingBag className="w-3.5 h-3.5 text-[#D97706]" />
                      5. Itemized Order Items ({placedOrder.items.reduce((acc, i) => acc + i.quantity, 0)})
                    </span>
                    <span className="text-[11px] text-[#7A746E]">Payment: <strong className="capitalize text-[#2A2522]">{placedOrder.shippingDetails.paymentMethod}</strong></span>
                  </div>

                  <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                    {placedOrder.items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center text-xs">
                        <span className="text-[#2A2522] font-medium">
                          {item.quantity}x {item.name} <span className="text-[10px] text-[#7A746E]">({item.format})</span>
                        </span>
                        <span className="font-bold text-[#D97706]">
                          {formatPrice(item.priceUsd * item.quantity, item.priceKes * item.quantity, item.priceEur * item.quantity, currency)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-[#E5E1DA] flex justify-between items-center text-sm font-bold text-[#2A2522]">
                    <span>Total Order Value:</span>
                    <span className="font-serif-display text-lg text-[#D97706]">
                      {formatPrice(placedOrder.totalUsd, placedOrder.totalKes, placedOrder.totalEur, currency)}
                    </span>
                  </div>
                </div>

              </div>

              {/* Receipt Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-3 rounded-full border border-[#E5E1DA] bg-white hover:bg-gray-50 text-xs font-bold text-[#2A2522] flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <FileText className="w-4 h-4 text-[#D97706]" />
                  <span>Print Digital Receipt</span>
                </button>

                <button
                  onClick={onClose}
                  className="flex-1 py-3 rounded-full bg-[#D97706] hover:bg-[#b86505] text-white text-xs font-bold uppercase tracking-wider shadow flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Return to Catalog</span>
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
