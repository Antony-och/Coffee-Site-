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
  const [step, setStep] = useState<'details' | 'confirmation'>('details');
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
    paymentMethod: 'not_required',
    mpesaPhone: '',
    cardLastFour: '',
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

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!shippingDetails.fullName || !shippingDetails.email || !shippingDetails.streetAddress || !shippingDetails.city) {
      return;
    }

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
        paymentMethod: 'not_required',
        cardLastFour: 'N/A',
      },
      trackingNumber: trackingNum,
      estimatedDelivery: '3 - 5 Business Days via Direct In-House Air Express',
    };

    setPlacedOrder(newOrder);
    onPlaceOrder(newOrder);
    setStep('confirmation');

    try {
      const waUrl = generateWhatsAppOrderUrl(newOrder, EXPORT_WHATSAPP_PHONE);
      window.open(waUrl, '_blank');
      setWhatsappSent(true);
      window.location.href = generateEmailOrderUrl(newOrder, EXPORT_EMAIL_ADDRESS);
      setEmailSent(true);
    } catch {
      // User can still click the prominent transmission buttons in the confirmation area.
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

  const handlePrintReceipt = (order: Order) => {
    const printWindow = window.open('', '_blank', 'width=900,height=700');
    if (!printWindow) {
      window.print();
      return;
    }

    const itemsHtml = order.items
      .map(
        (item) => `
          <tr>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.format}</td>
            <td>${formatPrice(item.priceUsd * item.quantity, item.priceKes * item.quantity, item.priceEur * item.quantity, currency)}</td>
          </tr>
        `
      )
      .join('');

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>First Cup Coffee & Tea Receipt</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');
            body {
              font-family: 'Inter', Arial, sans-serif;
              margin: 0;
              padding: 32px;
              background: #F7F2EC;
              color: #2A2522;
            }
            .receipt {
              max-width: 760px;
              margin: 0 auto;
              background: linear-gradient(180deg, #FFFDF9 0%, #F7F2EC 100%);
              border: 1px solid #E5E1DA;
              border-radius: 20px;
              box-shadow: 0 16px 40px rgba(42, 37, 34, 0.08);
              padding: 30px 32px 24px;
            }
            .header {
              display:flex;
              justify-content:space-between;
              align-items:flex-start;
              border-bottom: 2px solid #E5E1DA;
              padding-bottom: 18px;
              margin-bottom: 22px;
            }
            .brand-wrap {
              display: flex;
              flex-direction: column;
              gap: 6px;
            }
            .brand {
              font-family: 'Cormorant Garamond', serif;
              font-size: 34px;
              font-weight: 700;
              letter-spacing: 0.08em;
              color: #2A2522;
              line-height: 1;
            }
            .tagline {
              font-size: 11px;
              letter-spacing: 0.22em;
              text-transform: uppercase;
              color: #D97706;
              font-weight: 700;
            }
            .meta {
              font-size: 12px;
              color: #7A746E;
              line-height: 1.8;
              text-align: right;
            }
            h1 {
              margin: 0 0 10px;
              font-family: 'Cormorant Garamond', serif;
              font-size: 36px;
              color: #2A2522;
              letter-spacing: 0.02em;
            }
            .customer-box {
              background: #FAF7F2;
              border: 1px solid #E5E1DA;
              border-radius: 14px;
              padding: 14px 16px;
              margin-bottom: 18px;
            }
            .customer-box div {
              font-size: 12px;
              line-height: 1.8;
              color: #4A413D;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 12px;
              background: rgba(255,255,255,0.25);
              border-radius: 12px;
              overflow: hidden;
            }
            th, td {
              text-align: left;
              padding: 12px 10px;
              border-bottom: 1px solid #E5E1DA;
              font-size: 12px;
            }
            th {
              background: #F0E7DE;
              color: #2A2522;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 0.08em;
              font-size: 10px;
            }
            tbody tr:last-child td { border-bottom: none; }
            .totals {
              margin-top: 18px;
              margin-left: auto;
              width: 300px;
            }
            .totals-row {
              display:flex;
              justify-content:space-between;
              padding: 8px 0;
              font-size: 13px;
              color: #4A413D;
            }
            .grand {
              font-size: 18px;
              font-weight: 700;
              color: #2A2522;
              border-top: 1px solid #E5E1DA;
              padding-top: 12px;
              margin-top: 6px;
            }
            .grand span:last-child {
              color: #D97706;
            }
            @media print {
              body { margin: 0; background: #fff; }
              .receipt { border: none; box-shadow: none; border-radius: 0; }
            }
          </style>
        </head>
        <body>
          <div class="receipt">
            <div class="header">
              <div class="brand-wrap">
                <div class="brand">FIRST CUP</div>
                <div class="tagline">Coffee & Tea</div>
              </div>
              <div class="meta">
                <div><strong>Receipt #</strong> ${order.id}</div>
                <div>${order.date}</div>
                <div>${order.status}</div>
              </div>
            </div>

            <h1>Order Receipt</h1>
            <div class="customer-box">
              <div><strong>Customer:</strong> ${order.shippingDetails.fullName}</div>
              <div><strong>Email:</strong> ${order.shippingDetails.email}</div>
              <div><strong>Phone:</strong> ${order.shippingDetails.phone}</div>
              <div><strong>Shipping:</strong> ${order.shippingDetails.streetAddress}, ${order.shippingDetails.city}, ${order.shippingDetails.country}</div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Format</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>

            <div class="totals">
              <div class="totals-row"><span>Subtotal</span><span>${formatPrice(order.subtotalUsd, order.subtotalKes, order.subtotalEur, currency)}</span></div>
              <div class="totals-row"><span>Shipping</span><span>${formatPrice(order.shippingFeeUsd, order.shippingFeeKes, order.shippingFeeEur, currency)}</span></div>
              <div class="totals-row grand"><span>Total</span><span>${formatPrice(order.totalUsd, order.totalKes, order.totalEur, currency)}</span></div>
            </div>
          </div>
        </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 300);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#201B1A]/65 backdrop-blur-[2px] flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-[#EAE0D7] bg-[#F9F5F0] text-[#2A2522] shadow-[0_30px_90px_rgba(32,27,26,0.18)] flex flex-col my-8">
        
        {/* Modal Header */}
        <div className="border-b border-[#E9E1D8] bg-[#F6F0EA] px-5 py-5 sm:px-7 sm:py-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F0E3D2] text-[#A85A12] ring-1 ring-[#E7D0AB] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="pt-0.5">
                <p className="text-[9px] uppercase tracking-[0.22em] text-[#7A746E]">First Cup Coffee & Tea</p>
                <h2 className="font-serif-display text-[2rem] sm:text-[2.4rem] font-semibold tracking-[-0.05em] text-[#201B1A] leading-[0.92] mt-1.5">
                  {step === 'confirmation' ? 'Order Confirmed' : 'Checkout'}
                </h2>
              </div>
            </div>

            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E1DA] bg-white text-[#6F665F] transition hover:bg-[#F3EEE8]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-4 flex items-center justify-between rounded-[1rem] border border-[#E9E1D8] bg-white/80 px-3.5 py-2.5 text-[10px] uppercase tracking-[0.18em] text-[#7A746E] shadow-[0_8px_18px_rgba(42,37,34,0.04)]">
            <span>{step === 'details' ? 'Shipping & delivery' : 'Order confirmed'}</span>
            <span className="font-bold text-[#A85A12]">{step === 'confirmation' ? placedOrder?.id || '—' : 'Step 1'}</span>
          </div>
        </div>

        {/* Modal Content */}
        <div className="max-h-[80vh] overflow-y-auto p-5 sm:p-6 md:p-7 space-y-6 bg-[radial-gradient(circle_at_top,_rgba(217,119,6,0.04),transparent_32%)]">

          {/* STEP 1: SHIPPING & BUYER DETAILS */}
          {step === 'details' && (
            <form onSubmit={handleCompleteOrder} className="space-y-6">
              
              {/* Items Summary Accordion */}
              <div className="rounded-[1.5rem] border border-[#E9E1D8] bg-[#FBF7F3] p-4 sm:p-5 shadow-[0_12px_25px_rgba(42,37,34,0.03)]">
                <div className="mb-3 flex items-center justify-between gap-3 border-b border-[#EAE0D7] pb-3">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-[#7A746E]">
                    Items ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
                  </span>
                  <span className="text-base font-semibold text-[#B45E10]">
                    {formatPrice(subtotalUsd, subtotalKes, subtotalEur, currency)}
                  </span>
                </div>
                <div className="max-h-40 space-y-2.5 overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-3 rounded-[1rem] bg-white px-3 py-2.5 ring-1 ring-[#EDE4DB] shadow-[0_4px_14px_rgba(42,37,34,0.02)]">
                      <div className="flex min-w-0 items-center gap-2.5">
                        <img src={item.image} alt={item.name} className="h-10 w-10 rounded-xl object-cover ring-1 ring-[#E5E1DA]" />
                        <div className="min-w-0">
                          <span className="block truncate text-sm font-semibold text-[#2A2522]">{item.name}</span>
                          <span className="block text-[10px] text-[#7A746E]">Qty: {item.quantity} • {item.format}</span>
                        </div>
                      </div>
                      <span className="shrink-0 text-sm font-semibold text-[#2A2522]">
                        {formatPrice(item.priceUsd * item.quantity, item.priceKes * item.quantity, item.priceEur * item.quantity, currency)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recipient Form Fields */}
              <div className="space-y-4">
                <h3 className="border-b border-[#E9E1D8] pb-2 font-serif-display text-base font-semibold uppercase tracking-[0.14em] text-[#2A2522]">
                  Recipient & contact
                </h3>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-[#7A746E]">
                      Full name *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingDetails.fullName}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, fullName: e.target.value })}
                      placeholder="e.g. David Miller"
                      className="w-full rounded-[1rem] border border-[#E3D9CF] bg-[#FCFAF8] px-3.5 py-3 text-sm text-[#2A2522] placeholder:text-[#9C958F] focus:border-[#D97706] focus:outline-none focus:ring-2 focus:ring-[#D97706]/15"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-[#7A746E]">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={shippingDetails.email}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, email: e.target.value })}
                      placeholder="e.g. david@roastery.com"
                      className="w-full rounded-[1rem] border border-[#E3D9CF] bg-[#FCFAF8] px-3.5 py-3 text-sm text-[#2A2522] placeholder:text-[#9C958F] focus:border-[#D97706] focus:outline-none focus:ring-2 focus:ring-[#D97706]/15"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-[#7A746E]">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={shippingDetails.phone}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, phone: e.target.value })}
                      placeholder="+1 (555) 234-5678"
                      className="w-full rounded-[1rem] border border-[#E3D9CF] bg-[#FCFAF8] px-3.5 py-3 text-sm text-[#2A2522] placeholder:text-[#9C958F] focus:border-[#D97706] focus:outline-none focus:ring-2 focus:ring-[#D97706]/15"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-[#7A746E]">
                      Company (optional)
                    </label>
                    <input
                      type="text"
                      value={shippingDetails.companyName}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, companyName: e.target.value })}
                      placeholder="Highland Coffee Roasters LLC"
                      className="w-full rounded-[1rem] border border-[#E3D9CF] bg-[#FCFAF8] px-3.5 py-3 text-sm text-[#2A2522] placeholder:text-[#9C958F] focus:border-[#D97706] focus:outline-none focus:ring-2 focus:ring-[#D97706]/15"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="space-y-4">
                <h3 className="border-b border-[#E9E1D8] pb-2 font-serif-display text-base font-semibold uppercase tracking-[0.14em] text-[#2A2522]">
                  Delivery address
                </h3>

                <div>
                  <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-[#7A746E]">
                    Street address *
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingDetails.streetAddress}
                    onChange={(e) => setShippingDetails({ ...shippingDetails, streetAddress: e.target.value })}
                    placeholder="124 Harvest Way, Suite 4B"
                    className="w-full rounded-[1rem] border border-[#E3D9CF] bg-[#FCFAF8] px-3.5 py-3 text-sm text-[#2A2522] placeholder:text-[#9C958F] focus:border-[#D97706] focus:outline-none focus:ring-2 focus:ring-[#D97706]/15"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-[#7A746E]">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingDetails.city}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, city: e.target.value })}
                      placeholder="Nairobi"
                      className="w-full rounded-[1rem] border border-[#E3D9CF] bg-[#FCFAF8] px-3.5 py-3 text-sm text-[#2A2522] placeholder:text-[#9C958F] focus:border-[#D97706] focus:outline-none focus:ring-2 focus:ring-[#D97706]/15"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-[#7A746E]">
                      Country *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingDetails.country}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, country: e.target.value })}
                      placeholder="Kenya"
                      className="w-full rounded-[1rem] border border-[#E3D9CF] bg-[#FCFAF8] px-3.5 py-3 text-sm text-[#2A2522] placeholder:text-[#9C958F] focus:border-[#D97706] focus:outline-none focus:ring-2 focus:ring-[#D97706]/15"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-[#7A746E]">
                      Postal code
                    </label>
                    <input
                      type="text"
                      value={shippingDetails.postalCode}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, postalCode: e.target.value })}
                      placeholder="00100"
                      className="w-full rounded-[1rem] border border-[#E3D9CF] bg-[#FCFAF8] px-3.5 py-3 text-sm text-[#2A2522] placeholder:text-[#9C958F] focus:border-[#D97706] focus:outline-none focus:ring-2 focus:ring-[#D97706]/15"
                    />
                  </div>
                </div>
              </div>



              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-3 border-t border-[#E9E1D8] pt-5">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full border border-[#E3D9CF] bg-white px-5 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#6F665F] transition hover:bg-[#F3EEE8]"
                >
                  Cancel
                </button>
                
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-full bg-[#201B1A] px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-[#120F0E] shadow-[0_18px_30px_rgba(32,27,26,0.14)]"
                >
                  <span>Send to Email & WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
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
                  onClick={() => handlePrintReceipt(placedOrder)}
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
