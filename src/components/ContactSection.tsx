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
    id: 'nairobi',
    name: 'Nairobi Export HQ',
    region: 'Nairobi Metropolitan',
    address: 'JKIA Air Cargo Logistics Zone, Nairobi, Kenya',
    elevation: '1,795m',
    purpose: 'Air Express dispatch, global sales & export compliance',
    mapQuery: 'JKIA+Cargo+Nairobi+Kenya',
  },
  {
    id: 'nyeri',
    name: 'Nyeri Dry Mill & Lab',
    region: 'Mount Kenya Slope',
    address: 'Karatina-Nyeri Highway, Nyeri County, Kenya',
    elevation: '1,920m',
    purpose: 'Optical color grading, Q-Grader cupping & density sorting',
    mapQuery: 'Nyeri+County+Kenya',
  },
  {
    id: 'kericho',
    name: 'Kericho Tea Processing',
    region: 'Rift Valley Highlands',
    address: 'Kericho Tea Valley Estates, Kericho, Kenya',
    elevation: '2,180m',
    purpose: 'Purple tea oxidation, CTC manufacturing & artisanal leaf packing',
    mapQuery: 'Kericho+Tea+Estates+Kenya',
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

  // Prefill order details message if cart has items
  useEffect(() => {
    if (cartItems.length > 0) {
      const formattedTotal = formatPrice(subtotalUsd, subtotalKes, subtotalEur, currency);
      const itemList = cartItems
        .map(
          (item) =>
            `• ${item.quantity}x ${item.name} (${item.format}) - ${formatPrice(
              item.priceUsd * item.quantity,
              item.priceKes * item.quantity,
              item.priceEur * item.quantity,
              currency
            )}`
        )
        .join('\n');

      const messageText = `ORDER INQUIRY DETAILS:\n${itemList}\n\nEstimated Total: ${formattedTotal}\n\nAdditional Notes / Delivery Instructions:\n`;

      setFormData((prev) => ({
        ...prev,
        subject: 'Direct Order Request',
        message: messageText,
      }));
    }
  }, [cartItems, currency]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleSendWhatsApp = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const phone = '254700000000'; // Export desk WhatsApp
    const messageText = `*Order Inquiry - Kenyan Highland Coffee*\n\n*Name:* ${formData.name || 'Valued Customer'}\n*Email:* ${formData.email || 'N/A'}\n*Inquiry:* ${formData.subject}\n\n*Message / Order Details:*\n${formData.message}`;
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(messageText)}`;
    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
  };

  const handleSendEmail = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const emailTo = 'export@kenyanhighlandcoffee.co.ke';
    const mailSubject = `[Order Inquiry] ${formData.subject} - ${formData.name || 'Customer'}`;
    const mailBody = `Name: ${formData.name}\nEmail: ${formData.email}\nInquiry Type: ${formData.subject}\n\nMessage / Order Details:\n${formData.message}`;
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <a
            href="mailto:export@kenyanhighlandcoffee.co.ke"
            className="group bg-white border border-[#E5E1DA] rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[#D97706] transition-all flex flex-col items-center text-center space-y-3"
          >
            <div className="w-12 h-12 rounded-full bg-[#D97706]/10 text-[#D97706] flex items-center justify-center group-hover:bg-[#D97706] group-hover:text-white transition-colors">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif-display font-bold text-base text-[#2A2522]">Email Us</h3>
              <p className="text-xs text-[#7A746E] mt-1">export@kenyanhighlandcoffee.co.ke</p>
            </div>
          </a>

          <a
            href="https://wa.me/254700000000"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white border border-[#E5E1DA] rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[#5D6D3C] transition-all flex flex-col items-center text-center space-y-3"
          >
            <div className="w-12 h-12 rounded-full bg-[#5D6D3C]/10 text-[#5D6D3C] flex items-center justify-center group-hover:bg-[#5D6D3C] group-hover:text-white transition-colors">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif-display font-bold text-base text-[#2A2522]">WhatsApp Direct</h3>
              <p className="text-xs text-[#7A746E] mt-1">+254 (0) 700 000 000</p>
            </div>
          </a>

          <div className="bg-white border border-[#E5E1DA] rounded-2xl p-6 shadow-sm flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#2D241E]/10 text-[#2D241E] flex items-center justify-center">
              <Clock className="w-6 h-6 text-[#2D241E]" />
            </div>
            <div>
              <h3 className="font-serif-display font-bold text-base text-[#2A2522]">Working Hours</h3>
              <p className="text-xs text-[#7A746E] mt-1">Mon - Fri: 8:00 AM - 5:00 PM (EAT)</p>
            </div>
          </div>
        </div>

        {/* Main Form & Interactive Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Form */}
          <div className="lg:col-span-6 bg-white border border-[#E5E1DA] rounded-3xl p-6 sm:p-8 shadow-sm">
            {submitted ? (
              <div className="text-center py-10 space-y-5">
                <div className="w-14 h-14 bg-[#5D6D3C]/10 text-[#5D6D3C] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-serif-display text-2xl font-bold text-[#2A2522]">
                    Order Inquiry Received!
                  </h3>
                  <p className="text-xs text-[#7A746E] max-w-sm mx-auto leading-relaxed mt-1">
                    Thank you, <strong>{formData.name || 'Customer'}</strong>. Your order inquiry regarding <strong>{formData.subject}</strong> has been prepared.
                  </p>
                </div>

                {/* Instant Send Links */}
                <div className="bg-[#FAF7F2] border border-[#E5E1DA] rounded-2xl p-4 space-y-3 max-w-sm mx-auto">
                  <span className="text-[11px] font-bold text-[#2A2522] uppercase tracking-wider block">
                    Transmit Directly To Our Desk:
                  </span>
                  
                  <button
                    onClick={handleSendWhatsApp}
                    className="w-full py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold shadow flex items-center justify-center gap-2 transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send via WhatsApp Message</span>
                  </button>

                  <button
                    onClick={handleSendEmail}
                    className="w-full py-2.5 rounded-xl bg-[#D97706] hover:bg-[#b86505] text-white text-xs font-bold shadow flex items-center justify-center gap-2 transition-all"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send via Email Client</span>
                  </button>
                </div>

                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 rounded-full border border-[#E5E1DA] text-[#7A746E] text-xs font-bold hover:bg-gray-100 transition-colors"
                >
                  Edit Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-[#E5E1DA] pb-3 flex items-center justify-between">
                  <h3 className="font-serif-display text-xl font-bold text-[#2A2522] flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-[#D97706]" />
                    Order & Inquiry Form
                  </h3>

                  {cartItems.length > 0 && (
                    <span className="px-2.5 py-1 rounded-full bg-[#5D6D3C]/15 text-[#5D6D3C] font-extrabold text-[10px] flex items-center gap-1">
                      <ShoppingBag className="w-3 h-3" />
                      <span>{cartItems.reduce((acc, i) => acc + i.quantity, 0)} Items Added</span>
                    </span>
                  )}
                </div>

                {/* Notification Banner when cart prefilled */}
                {cartItems.length > 0 && (
                  <div className="bg-[#5D6D3C]/10 border border-[#5D6D3C]/30 rounded-xl p-3 text-xs text-[#2D241E] flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-[#5D6D3C] shrink-0" />
                      <span>
                        Form auto-filled with <strong>{cartItems.length} product(s)</strong> ({formatPrice(subtotalUsd, subtotalKes, subtotalEur, currency)}).
                      </span>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7A746E] mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sarah Jenkins"
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
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. sarah@example.com"
                      className="w-full bg-[#FAF7F2] border border-[#E5E1DA] rounded-xl px-3.5 py-2.5 text-xs text-[#2A2522] focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7A746E] mb-1">
                    Inquiry Type
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#E5E1DA] rounded-xl px-3.5 py-2.5 text-xs text-[#2A2522] focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                  >
                    <option value="Direct Order Request">Direct Order & Quote Request</option>
                    <option value="Wholesale Coffee">Wholesale Coffee Micro-Lots</option>
                    <option value="Purple Tea Orders">Purple Tea & Specialty Teas</option>
                    <option value="Visit Facilities">Visit Milling & Farm Facilities</option>
                    <option value="General Inquiry">General Question</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7A746E] mb-1">
                    Your Order Message / Requirements *
                  </label>
                  <textarea
                    rows={6}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your roasting, café, or import requirements..."
                    className="w-full bg-[#FAF7F2] border border-[#E5E1DA] rounded-xl p-3.5 text-xs text-[#2A2522] focus:outline-none focus:ring-2 focus:ring-[#D97706] font-mono"
                  />
                </div>

                {/* Direct Send Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleSendWhatsApp}
                    className="w-full py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider shadow flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send via WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSendEmail}
                    className="w-full py-3 rounded-full bg-[#D97706] hover:bg-[#b86505] text-white font-bold text-xs uppercase tracking-wider shadow flex items-center justify-center gap-2 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send via Email</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Interactive Hub Map */}
          <div className="lg:col-span-6 bg-[#2D241E] text-[#FAF7F2] rounded-3xl p-6 sm:p-8 shadow-md flex flex-col justify-between space-y-6">
            
            {/* Map Header & Facility Tabs */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#D4C3A3]/20 pb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#D97706]" />
                  <h3 className="font-serif-display text-lg font-bold text-white">
                    Facility Location Map
                  </h3>
                </div>
                <span className="text-[11px] text-[#D4C3A3] font-bold">Kenya, East Africa</span>
              </div>

              {/* Hub Selector Pills */}
              <div className="flex flex-wrap gap-2">
                {HUBS.map((hub) => (
                  <button
                    key={hub.id}
                    onClick={() => setSelectedHub(hub)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      selectedHub.id === hub.id
                        ? 'bg-[#D97706] text-white shadow'
                        : 'bg-[#1C120E] text-[#D4C3A3] hover:bg-[#3D3129]'
                    }`}
                  >
                    {hub.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-[#D4C3A3]/20 bg-[#1C120E] shadow-inner">
              <iframe
                title={`Map of ${selectedHub.name}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedHub.mapQuery)}&t=m&z=10&ie=UTF8&iwloc=&output=embed`}
                className="opacity-90 hover:opacity-100 transition-opacity"
              ></iframe>

              {/* Map Badge Overlay */}
              <div className="absolute top-3 left-3 bg-[#2D241E]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#D4C3A3]/30 text-white text-[11px] flex items-center gap-2 shadow">
                <Navigation className="w-3.5 h-3.5 text-[#D97706]" />
                <span className="font-bold">{selectedHub.name}</span>
                <span className="text-[#D4C3A3] text-[10px]">({selectedHub.elevation})</span>
              </div>
            </div>

            {/* Selected Location Information Box */}
            <div className="bg-[#1C120E] border border-[#D4C3A3]/15 rounded-2xl p-4 space-y-2 text-xs">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-bold text-white text-sm">{selectedHub.name}</h4>
                  <p className="text-[#D4C3A3]/80 text-xs mt-0.5">{selectedHub.address}</p>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedHub.mapQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#D97706]/20 hover:bg-[#D97706] text-[#D97706] hover:text-white transition-colors flex items-center gap-1 font-bold text-[11px] shrink-0"
                >
                  <span>Open Map</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p className="text-[#D4C3A3]/60 text-[11px] pt-1 border-t border-[#D4C3A3]/10">
                <strong>Primary Operations:</strong> {selectedHub.purpose}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
