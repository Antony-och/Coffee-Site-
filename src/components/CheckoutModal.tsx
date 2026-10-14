import React, { useState } from 'react';
import { CartItem, OrderRequest, OrderShippingDetails } from '../types';
import {
  generateWhatsAppOrderMessage,
  generateWhatsAppOrderUrl,
  EXPORT_WHATSAPP_PHONE,
  EXPORT_WHATSAPP_DISPLAY_PHONE,
} from '../utils/orderNotification';
import {
  X,
  CheckCircle2,
  Phone,
  ShieldCheck,
  ArrowRight,
  Copy,
  Check,
  FileText,
  Sparkles,
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
  onRequestComplete: () => void;
}

const HTML_ESCAPE_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (character) => HTML_ESCAPE_MAP[character]);

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onRequestComplete,
}) => {
  const [step, setStep] = useState<'details' | 'confirmation'>('details');
  const [copiedId, setCopiedId] = useState(false);
  const [copiedPayload, setCopiedPayload] = useState(false);
  const [whatsappOpened, setWhatsappOpened] = useState(false);
  const [showTextPreview, setShowTextPreview] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<OrderRequest | null>(null);

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
  });

  if (!isOpen) return null;

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!shippingDetails.fullName || !shippingDetails.phone || !shippingDetails.streetAddress || !shippingDetails.city) {
      return;
    }

    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderId = `REQ-FC-${randomNum}`;

    const newOrder: OrderRequest = {
      id: orderId,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      items: [...cartItems],
      shippingDetails: { ...shippingDetails },
    };

    setPlacedOrder(newOrder);
    setStep('confirmation');

    try {
      const waUrl = generateWhatsAppOrderUrl(newOrder, EXPORT_WHATSAPP_PHONE);
      const whatsappWindow = window.open(waUrl, '_blank');
      if (whatsappWindow) whatsappWindow.opener = null;
      setWhatsappOpened(true);
    } catch {
      // The confirmation screen keeps a manual WhatsApp link available if the popup is blocked.
    }
  };

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleSendWhatsApp = (order: OrderRequest) => {
    const url = generateWhatsAppOrderUrl(order, EXPORT_WHATSAPP_PHONE);
    const whatsappWindow = window.open(url, '_blank');
    if (whatsappWindow) whatsappWindow.opener = null;
    setWhatsappOpened(true);
  };

  const handleFinishRequest = () => {
    onRequestComplete();
    onClose();
  };

  const handleCopyOrderPayload = (order: OrderRequest) => {
    const message = generateWhatsAppOrderMessage(order);
    navigator.clipboard.writeText(message);
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2500);
  };

  const handlePrintReceipt = (order: OrderRequest) => {
    const printWindow = window.open('', '_blank', 'width=900,height=700');
    if (!printWindow) {
      window.print();
      return;
    }

    const itemsHtml = order.items
      .map(
        (item) => `
          <tr>
            <td>${escapeHtml(item.name)}</td>
            <td>${item.quantity}</td>
            <td>${escapeHtml(item.format)}</td>
          </tr>
        `
      )
      .join('');

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>First Cup Coffee & Tea Request Summary</title>
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
              align-items:center;
              border-bottom: 2px solid #E5E1DA;
              padding-bottom: 18px;
              margin-bottom: 22px;
            }
            .brand-wrap {
              display: flex;
              align-items: center;
            }
            .brand-logo {
              display: block;
              width: 116px;
              height: auto;
              max-height: 102px;
              object-fit: contain;
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
            .quote-note {
              margin-top: 18px;
              padding: 14px 16px;
              border: 1px solid #D9E0CD;
              border-radius: 12px;
              background: #F0F2E9;
              color: #384A2A;
              font-size: 12px;
              line-height: 1.7;
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
                <img class="brand-logo" src="${window.location.origin}/brand/first-cup-logo-black.svg" alt="First Cup Coffee & Tea" />
              </div>
              <div class="meta">
                <div><strong>Request reference</strong> ${escapeHtml(order.id)}</div>
                <div>${escapeHtml(order.date)}</div>
                <div>WhatsApp order request</div>
              </div>
            </div>

            <h1>Quote Request Summary</h1>
            <div class="customer-box">
              <div><strong>Customer:</strong> ${escapeHtml(order.shippingDetails.fullName)}</div>
              <div><strong>Email:</strong> ${escapeHtml(order.shippingDetails.email || 'Not provided')}</div>
              <div><strong>Phone:</strong> ${escapeHtml(order.shippingDetails.phone)}</div>
              <div><strong>Shipping:</strong> ${escapeHtml(`${order.shippingDetails.streetAddress}, ${order.shippingDetails.city}, ${order.shippingDetails.country}`)}</div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Pack quantity</th>
                  <th>Pack size</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>

            <div class="quote-note"><strong>Price on request.</strong> Our team will confirm prices, availability and delivery before your order is accepted. This is a request only, not an accepted order.</div>
          </div>
        </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    const logoImage = printWindow.document.querySelector<HTMLImageElement>('.brand-logo');
    const openPrintDialog = () => setTimeout(() => printWindow.print(), 250);
    if (logoImage && !logoImage.complete) {
      logoImage.addEventListener('load', openPrintDialog, { once: true });
      logoImage.addEventListener('error', openPrintDialog, { once: true });
    } else {
      openPrintDialog();
    }
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
                  {step === 'confirmation' ? 'Request Ready' : 'Review your request'}
                </h2>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close checkout"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E1DA] bg-white text-[#6F665F] transition hover:bg-[#F3EEE8]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-4 flex items-center justify-between rounded-[1rem] border border-[#E9E1D8] bg-white/80 px-3.5 py-2.5 text-[10px] uppercase tracking-[0.18em] text-[#7A746E] shadow-[0_8px_18px_rgba(42,37,34,0.04)]">
            <span>{step === 'details' ? 'Request details' : 'WhatsApp handoff'}</span>
            <span className="font-bold text-[#A85A12]">{step === 'confirmation' ? placedOrder?.id || '—' : 'Details'}</span>
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
                    Packs ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wide text-[#A85A12]">Price on request</span>
                </div>
                <div className="max-h-40 space-y-2.5 overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-3 rounded-[1rem] bg-white px-3 py-2.5 ring-1 ring-[#EDE4DB] shadow-[0_4px_14px_rgba(42,37,34,0.02)]">
                      <div className="flex min-w-0 items-center gap-2.5">
                        <img src={item.image} alt={item.name} className="h-10 w-10 rounded-xl object-cover ring-1 ring-[#E5E1DA]" />
                        <div className="min-w-0">
                          <span className="block truncate text-sm font-semibold text-[#2A2522]">{item.name}</span>
                          <span className="block text-[10px] text-[#7A746E]">Quantity: {item.quantity} {item.quantity === 1 ? 'pack' : 'packs'} • {item.format}</span>
                        </div>
                      </div>
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
                      Email (optional)
                    </label>
                    <input
                      type="email"
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
                  <span>Continue to WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          )}

          {/* STEP 3: ORDER READY */}
          {step === 'confirmation' && placedOrder && (
            <div className="space-y-5">
              <section aria-label="Request ready" className="relative isolate overflow-hidden rounded-[1.75rem] bg-[#241713] p-5 text-white sm:p-7">
                <div aria-hidden="true" className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-[#D97706]/20 blur-2xl" />
                <div className="relative">
                  <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#F0C47F]">
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> Your request is ready
                  </p>
                  <h3 className="mt-3 max-w-xl font-serif-display text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl">
                    One last step in WhatsApp.
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-[#E7D8C7]">
                    Review your prefilled request and tap <strong>Send</strong> in WhatsApp. Nothing is sent until you send it. Our team will confirm prices, availability and delivery before your order is accepted.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-white">
                      Request {placedOrder.id}
                    </span>
                    <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-white">
                      To {EXPORT_WHATSAPP_DISPLAY_PHONE}
                    </span>
                  </div>
                </div>
              </section>

              <section aria-label="WhatsApp message" className="rounded-[1.5rem] border border-[#E5E1DA] bg-white p-4 shadow-[0_10px_28px_rgba(42,37,34,0.04)] sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#E9F7EE] text-[#1B8E4B]">
                      <MessageSquare className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#7A746E]">Send order request to</p>
                      <p className="mt-0.5 truncate text-base font-semibold text-[#2A2522]">First Cup Coffee & Tea</p>
                      <p className="text-xs text-[#7A746E]">{EXPORT_WHATSAPP_DISPLAY_PHONE}</p>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full bg-[#E9F7EE] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#247546]">WhatsApp</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleSendWhatsApp(placedOrder)}
                  className="mt-4 flex w-full items-center justify-between gap-3 rounded-2xl bg-[#25D366] px-4 py-3.5 text-left text-white shadow-sm transition hover:bg-[#20bd5a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#168A45]"
                >
                  <span className="flex items-center gap-2.5 font-bold text-sm">
                    <MessageSquare className="h-5 w-5" aria-hidden="true" />
                    {whatsappOpened ? 'Reopen WhatsApp request' : 'Open WhatsApp request'}
                  </span>
                  <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
                </button>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopyOrderPayload(placedOrder)}
                    className="flex items-center justify-center gap-2 rounded-xl border border-[#E8E1DA] bg-[#FCFAF8] px-3 py-2.5 text-xs font-semibold text-[#514842] transition hover:bg-[#F5EFE9]"
                  >
                    {copiedPayload ? <Check className="h-4 w-4 text-[#2F6B3C]" aria-hidden="true" /> : <Copy className="h-4 w-4 text-[#A85A12]" aria-hidden="true" />}
                    {copiedPayload ? 'Message copied' : 'Copy message'}
                  </button>
                  <button
                    type="button"
                    aria-expanded={showTextPreview}
                    onClick={() => setShowTextPreview(!showTextPreview)}
                    className="rounded-xl border border-[#E8E1DA] bg-[#FCFAF8] px-3 py-2.5 text-xs font-semibold text-[#514842] transition hover:bg-[#F5EFE9]"
                  >
                    {showTextPreview ? 'Hide preview' : 'Preview message'}
                  </button>
                </div>

                {showTextPreview && (
                  <div role="region" aria-label="WhatsApp quote request preview" className="mt-3 max-h-48 overflow-y-auto rounded-xl bg-[#2D241E] p-4 font-mono text-[11px] leading-5 text-[#F3E9DD] whitespace-pre-wrap select-all">
                    {generateWhatsAppOrderMessage(placedOrder)}
                  </div>
                )}
              </section>

              <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
                <section aria-label="Request summary" className="rounded-[1.5rem] border border-[#E5E1DA] bg-[#FBF8F4] p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-3 border-b border-[#E9E1D8] pb-3">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#7A746E]">Request summary</p>
                      <p className="mt-1 text-sm font-semibold text-[#2A2522]">{placedOrder.items.reduce((acc, item) => acc + item.quantity, 0)} packs</p>
                    </div>
                    <span className="rounded-full bg-white px-3 py-1.5 text-[10px] font-bold text-[#A85A12] ring-1 ring-[#E9E1D8]">{placedOrder.id}</span>
                  </div>
                  <div className="max-h-36 space-y-3 overflow-y-auto py-4 pr-1">
                    {placedOrder.items.map((item) => (
                      <div key={item.id} className="flex items-start justify-between gap-3 text-sm">
                        <div className="min-w-0">
                          <p className="font-semibold text-[#2A2522]">{item.quantity} {item.quantity === 1 ? 'pack' : 'packs'} × {item.name}</p>
                          <p className="mt-0.5 truncate text-xs text-[#7A746E]">{item.format}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="border-t border-[#E9E1D8] pt-3 text-[11px] leading-5 text-[#7A746E]">Price on request. Our team will confirm prices, availability and delivery before your order is accepted.</p>
                </section>

                <details className="group rounded-[1.5rem] border border-[#E5E1DA] bg-white p-4 sm:p-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-3">
                    <span>
                      <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#7A746E]">Buyer & delivery</span>
                      <span className="mt-1 block text-sm font-semibold text-[#2A2522]">{placedOrder.shippingDetails.fullName}</span>
                      <span className="mt-0.5 block text-xs text-[#7A746E]">{placedOrder.shippingDetails.city}, {placedOrder.shippingDetails.country}</span>
                    </span>
                    <span className="rounded-full bg-[#F6F0EA] px-2.5 py-1 text-[10px] font-bold text-[#7A746E] transition group-open:rotate-180">⌄</span>
                  </summary>
                  <div className="mt-4 space-y-3 border-t border-[#EEE7E0] pt-3 text-xs">
                    <div className="flex items-start gap-2"><User className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#A85A12]" /><span className="text-[#514842]">{placedOrder.shippingDetails.companyName ? `${placedOrder.shippingDetails.companyName} · ` : ''}{placedOrder.shippingDetails.fullName}</span></div>
                    <div className="flex items-start gap-2"><Phone className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#A85A12]" /><span className="text-[#514842]">{placedOrder.shippingDetails.phone}</span></div>
                    <div className="flex items-start gap-2"><Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#A85A12]" /><span className="break-all text-[#514842]">{placedOrder.shippingDetails.email || 'Email not provided'}</span></div>
                    <div className="flex items-start gap-2"><MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#A85A12]" /><span className="text-[#514842]">{placedOrder.shippingDetails.streetAddress}, {placedOrder.shippingDetails.city}, {placedOrder.shippingDetails.country}{placedOrder.shippingDetails.postalCode ? ` ${placedOrder.shippingDetails.postalCode}` : ''}</span></div>
                    <button type="button" onClick={() => handleCopyId(placedOrder.id)} className="flex items-center gap-1.5 pt-1 text-[11px] font-semibold text-[#A85A12] hover:text-[#7A3E0D]">
                      {copiedId ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
                      {copiedId ? 'Reference copied' : 'Copy request reference'}
                    </button>
                  </div>
                </details>
              </div>

              <section className="flex flex-col gap-3 rounded-[1.5rem] border border-[#CFE4D2] bg-[#F1F8F2] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#2F6B3C] ring-1 ring-[#D5E8D8]"><CheckCircle2 className="h-4 w-4" aria-hidden="true" /></span>
                  <div>
                    <p className="text-sm font-semibold text-[#315B3A]">Sent the message?</p>
                    <p className="mt-0.5 text-xs leading-5 text-[#52715A]">After you send your request in WhatsApp, confirm here to clear your cart.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleFinishRequest}
                  disabled={!whatsappOpened}
                  className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#2F6B3C] px-4 py-3 text-xs font-bold text-white transition hover:bg-[#245631] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#245631]"
                >
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> I sent the request
                </button>
              </section>

              <div className="grid gap-3 sm:grid-cols-2">
                <button type="button" onClick={() => handlePrintReceipt(placedOrder)} className="flex items-center justify-center gap-2 rounded-full border border-[#E5E1DA] bg-white px-4 py-3 text-xs font-bold text-[#2A2522] transition hover:bg-[#F8F3EE]">
                  <FileText className="h-4 w-4 text-[#A85A12]" aria-hidden="true" /> Print request summary
                </button>
                <button type="button" onClick={onClose} className="flex items-center justify-center gap-2 rounded-full bg-[#D97706] px-4 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-[#b86505]">
                  Return to catalog <Sparkles className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
