import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, MessageSquare, ExternalLink, Navigation, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem, Currency } from '../types';
import { formatPrice } from '../utils/currency';

interface HubLocation {
  id: string;
  name: string;
  region: string;
  address: string;
  elevation: string;
  purpose: string;
  mapQuery: string;
}

const HUBS: HubLocation[] = [
  {
    id: 'office',
    name: 'First Cup Coffee & Tea Office',
    region: 'Ruiru, Kiambu County',
    address: 'First Cup Coffee and Tea, Ruiru, Kenya',
    elevation: '1,520m',
    purpose: 'Retail pickup, customer service, and order collection',
    mapQuery: 'First+Cup+Coffee+and+Tea+Ruiru+Kenya',
  },
];

interface ContactSectionProps {
  cartItems?: CartItem[];
  currency?: Currency;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  cartItems = [],
  currency = 'USD' as Currency,
}) => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [selectedHub, setSelectedHub] = useState<HubLocation>(HUBS[0]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Direct Order Request',
    message: '',
  });

  // Calculate cart totals
  const subtotalUsd = cartItems.reduce((sum, item) => sum + item.priceUsd * item.quantity, 0);
  const subtotalKes = cartItems.reduce((sum, item) => sum + item.priceKes * item.quantity, 0);
  const subtotalEur = cartItems.reduce((sum, item) => sum + item.priceEur * item.quantity, 0);

  // Keep the order form empty by default and never prefill cart details.
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      name: '',
      email: '',
      subject: 'Direct Order Request',
      message: '',
    }));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const buildDefaultRequirements = () => {
    if (cartItems.length === 0) return '';

    const lines = cartItems.map((item) => {
      const lineTotal = formatPrice(
        item.priceUsd * item.quantity,
        item.priceKes * item.quantity,
        item.priceEur * item.quantity,
        currency
      );

      return `• ${item.quantity}x ${item.name} (${item.format}) — ${lineTotal}`;
    });

    const total = formatPrice(subtotalUsd, subtotalKes, subtotalEur, currency);
    return `Order requirements:\nPlease confirm availability and delivery timing.\n\nItems requested:\n${lines.join('\n')}\n\nEstimated Total: ${total}\nPlease send final invoice, preparation notes, and delivery timeline.`;
  };

  const buildCartSummary = () => {
    if (cartItems.length === 0) return '';

    const lines = cartItems.map((item) => {
      const lineTotal = formatPrice(
        item.priceUsd * item.quantity,
        item.priceKes * item.quantity,
        item.priceEur * item.quantity,
        currency
      );

      return `• ${item.quantity}x ${item.name} (${item.format}) — ${lineTotal}`;
    });

    const total = formatPrice(subtotalUsd, subtotalKes, subtotalEur, currency);
    return `ORDER SUMMARY\n${lines.join('\n')}\n\nEstimated Total: ${total}\n`;
  };

  const handleSendWhatsApp = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const phone = '254725741543';
    const orderSummary = buildCartSummary();
    const defaultRequirements = buildDefaultRequirements();
    const clientRequirements = formData.message?.trim();
    const details = clientRequirements || defaultRequirements
      ? `\n\n*Message / Requirements:*\n${clientRequirements || defaultRequirements}`
      : '';
    const messageText = `*Order Inquiry - First Cup Coffee & Tea*\n\n*Name:* ${formData.name || 'Valued Customer'}\n*Email:* ${formData.email || 'N/A'}\n*Inquiry:* ${formData.subject}${orderSummary ? `\n\n${orderSummary}` : ''}${details}`;
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(messageText)}`;
    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
  };

  const handleSendEmail = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const emailTo = 'firstcupcoffeeltd@gmail.com';
    const orderSummary = buildCartSummary();
    const defaultRequirements = buildDefaultRequirements();
    const clientRequirements = formData.message?.trim();
    const mailSubject = `[Order Inquiry] ${formData.subject} - ${formData.name || 'Customer'}`;
    const mailBody = `Name: ${formData.name}\nEmail: ${formData.email}\nInquiry Type: ${formData.subject}${orderSummary ? `\n\n${orderSummary}` : ''}${clientRequirements || defaultRequirements ? `\nMessage / Requirements:\n${clientRequirements || defaultRequirements}` : ''}`;
    const mailtoUrl = `mailto:${emailTo}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
    window.location.href = mailtoUrl;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-[#FAF7F2] text-[#2A2522]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D97706]/10 border border-[#D97706]/20 text-[#D97706] text-xs font-bold uppercase tracking-widest">
            <Mail className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>
          <h1 className="font-serif-display text-3xl sm:text-4xl font-extrabold text-[#2A2522]">
            Contact Our Export Team
          </h1>
          <p className="text-sm text-[#7A746E] leading-relaxed">
            Have questions about our single-origin coffees, rare purple teas, or custom shipments? Send us a message or transmit your order via Email or WhatsApp.
          </p>
        </div>

        {/* Quick Contact Info Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <a
            href="mailto:firstcupcoffeeltd@gmail.com"
            className="group flex min-h-[13.5rem] flex-col items-center justify-center rounded-[1.7rem] border border-[#E2DDD2] bg-[#F7F2EC] px-6 py-7 text-center shadow-[0_1px_0_rgba(42,37,34,0.02)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(42,37,34,0.05)]"
          >
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#F0D9B8] text-[#D97706] shadow-inner">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-serif-display text-[1.02rem] font-bold uppercase tracking-[0.08em] text-[#2A2522]">
                Email Us
              </h3>
              <p className="mt-2 text-[0.72rem] leading-relaxed text-[#6F665F]">
                firstcupcoffeeltd@gmail.com
              </p>
            </div>
          </a>

          <a
            href="https://wa.me/254725741543"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-h-[13.5rem] flex-col items-center justify-center rounded-[1.7rem] border border-[#E2DDD2] bg-[#F7F2EC] px-6 py-7 text-center shadow-[0_1px_0_rgba(42,37,34,0.02)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(42,37,34,0.05)]"
          >
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#DDE7D8] text-[#5D6D3C] shadow-inner">
              <Phone className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-serif-display text-[1.02rem] font-bold uppercase tracking-[0.08em] text-[#2A2522]">
                WhatsApp Direct
              </h3>
              <p className="mt-2 text-[0.72rem] leading-relaxed text-[#6F665F]">
                +254 725 741 543
              </p>
            </div>
          </a>

          <div className="flex min-h-[13.5rem] flex-col items-center justify-center rounded-[1.7rem] border border-[#E2DDD2] bg-[#F7F2EC] px-6 py-7 text-center shadow-[0_1px_0_rgba(42,37,34,0.02)]">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#E7E2DD] text-[#2A2522] shadow-inner">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-serif-display text-[1.02rem] font-bold uppercase tracking-[0.08em] text-[#2A2522]">
                Working Hours
              </h3>
              <p className="mt-2 text-[0.72rem] leading-relaxed text-[#6F665F]">
                Mon - Fri: 8:00 AM - 5:00 PM
                <br />
                Weekends: 8:00 AM - 1:00 PM
              </p>
            </div>
          </div>
        </div>

        {/* Main Form & Interactive Map Grid */}
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-7">
          
          {/* Contact Form */}
          <div className="lg:col-span-4 mx-auto w-full rounded-[1.7rem] border border-[#DCD3C8] bg-[#F7F2EC] p-5 shadow-[0_1px_0_rgba(42,37,34,0.03)] sm:p-7">
            {submitted ? (
              <div className="space-y-5 py-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#5D6D3C]/10 text-[#5D6D3C]">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-serif-display text-2xl font-bold text-[#2A2522]">
                    Order Inquiry Received!
                  </h3>
                  <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-[#7A746E]">
                    Thank you, <strong>{formData.name || 'Customer'}</strong>. Your inquiry regarding <strong>{formData.subject}</strong> has been prepared.
                  </p>
                </div>

                <div className="mx-auto max-w-md space-y-3 rounded-[1.2rem] border border-[#E5E1DA] bg-[#FAF7F2] p-4">
                  <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-[#2A2522]">
                    Send Directly
                  </span>

                  <button
                    onClick={handleSendWhatsApp}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-xs font-bold uppercase tracking-[0.1em] text-white shadow transition hover:bg-[#20bd5a]"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Send via WhatsApp</span>
                  </button>

                  <button
                    onClick={handleSendEmail}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#D97706] px-4 py-3 text-xs font-bold uppercase tracking-[0.1em] text-white shadow transition hover:bg-[#b86505]"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Send via Email</span>
                  </button>
                </div>

                <button
                  onClick={() => setSubmitted(false)}
                  className="rounded-full border border-[#DCD3C8] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#7A746E] transition hover:bg-[#EAE2D8]"
                >
                  Edit Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center justify-between border-b border-[#DCD3C8] pb-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-[0.35rem] border border-[#2A2522] bg-transparent text-[#2A2522]">
                      <MessageSquare className="h-3 w-3" />
                    </span>
                    <h3 className="font-serif-display text-[1.05rem] font-bold uppercase tracking-[0.08em] text-[#2A2522]">
                      Order & Inquiry Form
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-[#7A746E]">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sarah Jenkins"
                      className="h-11 w-full rounded-[0.8rem] border border-[#D8D0C5] bg-[#FAF7F2] px-3 text-sm text-[#2A2522] placeholder:text-[#9B938C] focus:border-[#D97706] focus:outline-none focus:ring-2 focus:ring-[#D97706]/20"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-[#7A746E]">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. sarah@example.com"
                      className="h-11 w-full rounded-[0.8rem] border border-[#D8D0C5] bg-[#FAF7F2] px-3 text-sm text-[#2A2522] placeholder:text-[#9B938C] focus:border-[#D97706] focus:outline-none focus:ring-2 focus:ring-[#D97706]/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-[#7A746E]">
                    Inquiry Type
                  </label>
                  <div className="relative">
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="h-11 w-full appearance-none rounded-[0.8rem] border border-[#D8D0C5] bg-[#FAF7F2] px-3 pr-10 text-sm text-[#2A2522] focus:border-[#D97706] focus:outline-none focus:ring-2 focus:ring-[#D97706]/20"
                    >
                      <option value="Direct Order Request">Direct Order & Quote Request</option>
                      <option value="Wholesale Coffee">Wholesale Coffee Micro-Lots</option>
                      <option value="Purple Tea Orders">Purple Tea & Specialty Teas</option>
                      <option value="Visit Facilities">Visit Milling & Farm Facilities</option>
                      <option value="General Inquiry">General Question</option>
                    </select>
                    <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#2A2522]">
                      <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path d="M5.25 7.5 10 12.25 14.75 7.5H5.25Z"/></svg>
                    </span>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-[#7A746E]">
                    Your Order Message / Requirements *
                  </label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your roasting, café, or import requirements..."
                    className="w-full rounded-[0.8rem] border border-[#D8D0C5] bg-[#FAF7F2] p-3 text-sm text-[#2A2522] placeholder:text-[#9B938C] focus:border-[#D97706] focus:outline-none focus:ring-2 focus:ring-[#D97706]/20"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleSendWhatsApp}
                    className="flex w-[48%] items-center justify-center gap-2 rounded-full bg-[#5D6D3C] px-3 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white shadow-[0_8px_18px_rgba(93,109,60,0.2)] transition hover:bg-[#495d2c]"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Send via WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSendEmail}
                    className="flex w-[48%] items-center justify-center gap-2 rounded-full bg-[#D97706] px-3 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white shadow-[0_8px_18px_rgba(217,119,6,0.2)] transition hover:bg-[#b86505]"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Send via Email</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Interactive Hub Map */}
          <div className="lg:col-span-3 bg-[#2D241E] text-[#FAF7F2] rounded-[1.8rem] p-5 shadow-[0_18px_35px_rgba(33,24,18,0.2)] flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#D4C3A3]/20 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#D97706]/80 bg-[#D97706]/10 text-[#D97706]">
                    <MapPin className="h-3 w-3" />
                  </span>
                  <h3 className="font-serif-display text-base font-bold tracking-[0.06em] text-white uppercase">
                    Office Location
                  </h3>
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#D4C3A3]">
                  Kenya
                </span>
              </div>
            </div>

            <div className="relative h-[18rem] w-full overflow-hidden rounded-[1.25rem] border border-[#D4C3A3]/15 bg-[#E9E5DF] shadow-inner sm:h-[20rem]">
              <iframe
                title={`Map of ${selectedHub.name}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedHub.mapQuery)}&t=m&z=10&ie=UTF8&iwloc=&output=embed`}
                className="h-full w-full opacity-90"
              ></iframe>

              <div className="absolute left-3 top-3 flex items-center gap-2 rounded-lg border border-[#D4C3A3]/30 bg-[#2D241E]/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                <Navigation className="h-3.5 w-3.5 text-[#D97706]" />
                <span>{selectedHub.name}</span>
                <span className="text-[#D4C3A3]">({selectedHub.elevation})</span>
              </div>

              <div className="absolute inset-x-0 bottom-0 flex items-center justify-center bg-gradient-to-t from-[#2D241E]/80 via-[#2D241E]/20 to-transparent px-5 pb-5 pt-8">
                <div className="rounded-full border border-white/10 bg-[#2D241E]/80 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#F8EBD7] backdrop-blur-sm">
                  {selectedHub.name}
                </div>
              </div>
            </div>

            <div className="rounded-[1.15rem] border border-[#D4C3A3]/15 bg-[#1C120E] p-4 text-xs text-[#F3E7D6]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="font-bold text-base text-white">{selectedHub.name}</h4>
                  <p className="mt-1 text-[11px] text-[#D4C3A3]">{selectedHub.address}</p>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedHub.mapQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-lg bg-[#D97706] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#b86505]"
                >
                  <span>Open Map</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <p className="mt-3 border-t border-[#D4C3A3]/10 pt-2 text-[11px] leading-relaxed text-[#D4C3A3]/80">
                <span className="font-bold text-[#F3E7D6]">Primary Operations:</span> {selectedHub.purpose}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
