import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileText,
  Mail,
  MapPin,
  MessageSquare,
  Navigation,
  Phone,
  Send,
  ShieldCheck,
} from 'lucide-react';
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
  const formRef = useRef<HTMLFormElement>(null);
  const selectedHub = HUBS[0];
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Direct Order Request',
    message: '',
  });

  const subtotalUsd = cartItems.reduce((sum, item) => sum + item.priceUsd * item.quantity, 0);
  const subtotalKes = cartItems.reduce((sum, item) => sum + item.priceKes * item.quantity, 0);
  const subtotalEur = cartItems.reduce((sum, item) => sum + item.priceEur * item.quantity, 0);

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
    if (!submitted && !formRef.current?.reportValidity()) return;

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
    if (!submitted && !formRef.current?.reportValidity()) return;

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
    <section className="relative overflow-hidden bg-[#F3EEE6] py-10 text-[#2A2522] sm:py-14 lg:py-16">
      <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8 lg:space-y-10">
        {/* Contact hero */}
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-[#201611] text-[#FAF7F2] shadow-[0_24px_70px_rgba(42,30,21,0.18)]">
          <img
            src="/hero/hero_roastery_cupping.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#201611]/95 via-[#201611]/80 to-[#201611]/45" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#201611]/65 via-transparent to-[#201611]/10" />

          <div className="grid gap-9 p-6 sm:p-9 md:p-11 lg:grid-cols-[1.1fr_0.8fr] lg:items-center lg:gap-14 lg:p-14">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#E9C99F]/30 bg-black/20 px-3.5 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#F1D6B1] backdrop-blur-sm">
                <MapPin className="h-3.5 w-3.5 text-[#EBA74E]" aria-hidden="true" />
                First Cup · Ruiru, Kenya · Since 2016
              </div>
              <h1 className="mt-5 max-w-xl font-serif-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Good coffee starts with a conversation.
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-7 text-[#F1E4D2]/85 sm:text-base">
                Tell us what you’re looking for. We can help with coffee and tea selections, wholesale enquiries, samples, and shipping questions.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="mailto:firstcupcoffeeltd@gmail.com"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#E39432] px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-[#24170E] transition hover:-translate-y-0.5 hover:bg-[#F0AA4F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Email our team
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href="https://wa.me/254725741543"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/35 bg-white/10 px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <MessageSquare className="h-4 w-4" aria-hidden="true" />
                  WhatsApp
                </a>
              </div>
            </div>

            <div className="w-full rounded-[1.5rem] border border-white/15 bg-[#1C130F]/75 p-5 shadow-xl backdrop-blur-md sm:p-6 lg:justify-self-end">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#E9B66F]">Reach us directly</p>
              <div className="mt-5 space-y-4">
                <a href="mailto:firstcupcoffeeltd@gmail.com" className="flex items-start gap-3 text-sm text-white transition hover:text-[#F0C47F]">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#E9B66F]" aria-hidden="true" />
                  <span className="break-all">firstcupcoffeeltd@gmail.com</span>
                </a>
                <a href="tel:+254725741543" className="flex items-start gap-3 text-sm text-white transition hover:text-[#F0C47F]">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#E9B66F]" aria-hidden="true" />
                  <span>+254 725 741 543</span>
                </a>
              </div>
              <div className="mt-5 border-t border-white/15 pt-4">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#F1E4D2]">
                  <Clock className="h-3.5 w-3.5 text-[#E9B66F]" aria-hidden="true" />
                  Office hours · EAT
                </p>
                <p className="mt-2 pl-[1.375rem] text-xs leading-6 text-[#F1E4D2]/70">
                  Mon–Fri, 8:00 AM–5:00 PM<br />Weekends, 8:00 AM–1:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Inquiry form and office location */}
        <div className="grid items-start gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8">
          <div className="min-w-0 rounded-[1.75rem] border border-[#E4DCD1] bg-[#FFFCF8] p-5 shadow-[0_10px_35px_rgba(42,37,34,0.05)] sm:p-7 lg:p-8">
            <div className="mb-6 border-b border-[#E8E0D6] pb-5">
              <div className="inline-flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#8A5A2B]">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                A real person will get back to you
              </div>
              <h2 className="mt-3 font-serif-display text-2xl font-bold text-[#2A2522] sm:text-3xl">
                Send an enquiry
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#736A62]">
                Share a few details and choose the best way to send your message.
              </p>
            </div>

            {submitted ? (
              <div className="space-y-5 py-5 text-center sm:py-8">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#5D6D3C]/10 text-[#5D6D3C]">
                  <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-serif-display text-2xl font-bold text-[#2A2522]">
                    Your enquiry is ready
                  </h3>
                  <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#736A62]">
                    Thanks{formData.name ? `, ${formData.name}` : ''}. Review your details, then choose WhatsApp or email to send your {formData.subject.toLowerCase()} enquiry.
                  </p>
                </div>
                <div className="mx-auto grid max-w-md gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={handleSendWhatsApp}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#4F713A] px-4 py-3 text-xs font-bold uppercase tracking-[0.1em] text-white transition hover:bg-[#3F5D2D]"
                  >
                    <MessageSquare className="h-4 w-4" aria-hidden="true" />
                    Send via WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={handleSendEmail}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#D97706] px-4 py-3 text-xs font-bold uppercase tracking-[0.1em] text-white transition hover:bg-[#B85F05]"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    Send via email
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="rounded-full border border-[#D8CEC1] px-5 py-2.5 text-xs font-semibold text-[#756B62] transition hover:bg-[#F2ECE4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8A5A2B]"
                >
                  Edit enquiry
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="mb-2 block text-xs font-semibold text-[#50473F]">Your name <span aria-hidden="true">*</span></label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sarah Jenkins"
                      className="h-12 w-full rounded-xl border border-[#D9D0C5] bg-white px-3.5 text-sm text-[#2A2522] placeholder:text-[#9B938C] focus:border-[#A46A32] focus:outline-none focus:ring-2 focus:ring-[#A46A32]/15"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="mb-2 block text-xs font-semibold text-[#50473F]">Email address <span aria-hidden="true">*</span></label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@example.com"
                      className="h-12 w-full rounded-xl border border-[#D9D0C5] bg-white px-3.5 text-sm text-[#2A2522] placeholder:text-[#9B938C] focus:border-[#A46A32] focus:outline-none focus:ring-2 focus:ring-[#A46A32]/15"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="mb-2 block text-xs font-semibold text-[#50473F]">What can we help with?</label>
                  <select
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="h-12 w-full rounded-xl border border-[#D9D0C5] bg-white px-3.5 text-sm text-[#2A2522] focus:border-[#A46A32] focus:outline-none focus:ring-2 focus:ring-[#A46A32]/15"
                  >
                    <option value="Direct Order Request">Direct Order & Quote Request</option>
                    <option value="Wholesale Coffee">Wholesale Coffee Micro-Lots</option>
                    <option value="Purple Tea Orders">Purple Tea & Specialty Teas</option>
                    <option value="Visit Facilities">Visit Milling & Farm Facilities</option>
                    <option value="General Inquiry">General Question</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="mb-2 block text-xs font-semibold text-[#50473F]">Message or order requirements</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about the coffees or teas you’re interested in, your shipment needs, or any questions you have."
                    className="w-full resize-y rounded-xl border border-[#D9D0C5] bg-white p-3.5 text-sm leading-6 text-[#2A2522] placeholder:text-[#9B938C] focus:border-[#A46A32] focus:outline-none focus:ring-2 focus:ring-[#A46A32]/15"
                  />
                </div>

                <div className="grid gap-3 border-t border-[#E8E0D6] pt-5 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={handleSendWhatsApp}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#4F713A] px-4 py-3 text-xs font-bold uppercase tracking-[0.1em] text-white transition hover:bg-[#3F5D2D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F713A]"
                  >
                    <MessageSquare className="h-4 w-4" aria-hidden="true" />
                    Send via WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={handleSendEmail}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#D97706] px-4 py-3 text-xs font-bold uppercase tracking-[0.1em] text-white transition hover:bg-[#B85F05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97706]"
                  >
                    <Send className="h-4 w-4" aria-hidden="true" />
                    Send via email
                  </button>
                </div>
                <a
                  href="/company-profile.pdf"
                  download="First-Cup-Company-Profile.pdf"
                  aria-label="Download the First Cup Coffee & Tea company profile PDF"
                  className="mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#D9D0C5] px-4 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-[#6B625A] transition hover:bg-[#F5F0EA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A46A32]"
                >
                  <FileText className="h-4 w-4" aria-hidden="true" />
                  Download company profile (PDF)
                </a>
              </form>
            )}
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-[1.75rem] bg-[#211713] text-[#FAF7F2] shadow-[0_18px_45px_rgba(33,24,18,0.14)]">
              <div className="flex items-center justify-between gap-4 px-5 pb-4 pt-5 sm:px-6 sm:pt-6">
                <div>
                  <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-[#D9A05F]">Come find us</p>
                  <h2 className="mt-1 font-serif-display text-xl font-bold text-white">Ruiru, Kenya</h2>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D4C3A3]/20 bg-white/5 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-[#E7D7C1]">
                  <MapPin className="h-3.5 w-3.5 text-[#D9A05F]" aria-hidden="true" />
                  {selectedHub.elevation}
                </span>
              </div>

              <div className="relative mx-4 h-64 overflow-hidden rounded-[1.2rem] border border-white/10 bg-[#E9E5DF] sm:mx-5 sm:h-72">
                <iframe
                  title={`Map of ${selectedHub.name}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedHub.mapQuery)}&t=m&z=10&ie=UTF8&iwloc=&output=embed`}
                  className="h-full w-full"
                />
                <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-lg border border-white/15 bg-[#211713]/85 px-3 py-2 text-[0.62rem] font-semibold text-white backdrop-blur-sm">
                  <Navigation className="h-3.5 w-3.5 text-[#E9B66F]" aria-hidden="true" />
                  First Cup Coffee & Tea
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <p className="text-sm font-semibold text-white">{selectedHub.address}</p>
                <p className="mt-2 text-xs leading-5 text-[#D4C3A3]/75">{selectedHub.purpose}</p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedHub.mapQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#F0B566] transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F0B566]"
                >
                  Open directions
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-[#E2D7CA] bg-[#FFFCF8] p-5 sm:p-6">
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#8A5A2B]">Prefer a quick call?</p>
              <a href="tel:+254725741543" className="mt-2 inline-flex items-center gap-2 font-serif-display text-xl font-bold text-[#2A2522] transition hover:text-[#A46A32]">
                <Phone className="h-4 w-4 text-[#A46A32]" aria-hidden="true" />
                +254 725 741 543
              </a>
              <p className="mt-2 text-xs leading-5 text-[#736A62]">We’re happy to talk through origin, lot availability, and export requirements.</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
