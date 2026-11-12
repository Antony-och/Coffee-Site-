import React from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Clock,
  Coffee,
  Download,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
} from 'lucide-react';
import {
  CONTACT_EMAIL,
  CONTACT_OFFICE_HOURS,
  CONTACT_OFFICE_LOCATION,
  CONTACT_OFFICE_LOCATION_LABEL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_INTERNATIONAL,
  CONTACT_PHONE_TEL,
} from '../data/contactData';
import type { PageView } from '../types';

interface DigitalVCardPageProps {
  setCurrentPage: (page: PageView) => void;
}

const DIRECTIONS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT_OFFICE_LOCATION.mapQuery)}`;

export const DigitalVCardPage: React.FC<DigitalVCardPageProps> = ({ setCurrentPage }) => {
  const contactActions = [
    {
      label: 'Call us',
      detail: CONTACT_PHONE_DISPLAY,
      href: `tel:${CONTACT_PHONE_TEL}`,
      Icon: Phone,
      external: false,
    },
    {
      label: 'Email',
      detail: 'Wholesale & inquiries',
      href: `mailto:${CONTACT_EMAIL}`,
      Icon: Mail,
      external: false,
    },
    {
      label: 'WhatsApp',
      detail: 'Chat with our team',
      href: `https://wa.me/${CONTACT_PHONE_INTERNATIONAL}`,
      Icon: MessageSquare,
      external: true,
    },
    {
      label: 'Directions',
      detail: CONTACT_OFFICE_LOCATION_LABEL,
      href: DIRECTIONS_URL,
      Icon: MapPin,
      external: true,
    },
  ] as const;

  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/firstcupcoffeetea/',
      Icon: Instagram,
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/first-cup-coffee-and-tea/?viewAsMember=true',
      Icon: Linkedin,
    },
  ];

  return (
    <section aria-labelledby="digital-vcard-title" className="relative isolate overflow-hidden bg-[#F3EEE6] px-4 py-7 sm:py-10">
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full border-[22px] border-[#D6C2AD]/25" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-[#D8E3D5]/35 blur-3xl" />

      <article className="relative mx-auto max-w-2xl overflow-hidden rounded-[1.75rem] border border-[#E2D7CA] bg-[#FFFCF8] shadow-[0_24px_70px_rgba(42,30,21,0.14)] sm:rounded-[2rem]">
        <header className="relative isolate overflow-hidden bg-[#2D241E] px-5 pb-7 pt-6 text-white sm:px-8 sm:pb-9 sm:pt-8">
          <div aria-hidden="true" className="pointer-events-none absolute -right-14 -top-16 h-56 w-56 rounded-full border-[20px] border-white/[0.04]" />
          <div className="relative flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <img
              src="/brand/first-cup-logo-white-500.png"
              alt="First Cup Coffee & Tea"
              className="h-12 w-auto max-w-[9rem] object-contain object-left"
            />
            <span className="inline-flex min-h-9 items-center gap-2 rounded-full border border-[#9CCB83]/25 bg-[#9CCB83]/10 px-3.5 py-2 text-[9px] font-bold uppercase tracking-[0.12em] text-[#D8F0C8] sm:text-[10px]">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#86C86A] shadow-[0_0_0_3px_rgba(134,200,106,0.14)]" />
              Open for Wholesale &amp; Inquiries
            </span>
          </div>

          <div className="relative mt-7 sm:mt-9">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#E9B977]">Kenyan-owned · {CONTACT_OFFICE_LOCATION_LABEL} · Since 2016</p>
            <h1 id="digital-vcard-title" className="mt-3 max-w-xl font-serif-display text-4xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-5xl">
              First Cup Coffee &amp; Tea
              <span className="mt-2 block text-[#E9B977]">Experience Love At First Sip.</span>
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-6 text-[#E8D8C2]/75">
              Distinctive Kenyan coffee, rooted in highland origins and made to be shared.
            </p>
          </div>
        </header>

        <div className="space-y-6 p-4 sm:space-y-7 sm:p-7">
          <section aria-labelledby="vcard-actions-title">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#A85C16]">Quick contacts</p>
                <h2 id="vcard-actions-title" className="mt-1 font-serif-display text-xl font-semibold text-[#2A2522]">Let’s connect</h2>
              </div>
              <span className="pb-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#81766C]">Tap to reach us</span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
              {contactActions.map(({ label, detail, href, Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  aria-label={`${label}: ${detail}${external ? ' (opens in a new tab)' : ''}`}
                  className="group flex min-h-[6.25rem] flex-col items-start justify-between rounded-2xl border border-[#E7DED3] bg-white p-3.5 text-left transition duration-200 hover:-translate-y-0.5 hover:border-[#A85C16]/45 hover:shadow-[0_10px_24px_rgba(42,30,21,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A85C16] sm:min-h-[7rem] sm:p-4"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F3EEE6] text-[#34503B] transition-colors group-hover:bg-[#34503B] group-hover:text-white">
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <span className="mt-3 block min-w-0">
                    <span className="block text-xs font-bold text-[#2A2522]">{label}</span>
                    <span className="mt-0.5 block text-[9px] leading-4 text-[#766C63]">{detail}</span>
                  </span>
                </a>
              ))}
            </div>
          </section>

          <a
            href="/first-cup-coffee-tea.vcf"
            download="First-Cup-Coffee-and-Tea.vcf"
            className="group flex min-h-[4.5rem] items-center justify-between gap-4 rounded-2xl bg-[#34503B] px-4 py-3.5 text-white shadow-[0_10px_25px_rgba(52,80,59,0.18)] transition hover:bg-[#293F2F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A85C16] sm:px-5"
          >
            <span className="flex min-w-0 items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#F4C882]">
                <Download className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm font-bold">Save to Contacts</span>
                <span className="mt-0.5 block text-[10px] text-white/70">Download contact card · .VCF</span>
              </span>
            </span>
            <ArrowUpRight className="h-5 w-5 shrink-0 text-[#F4C882] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </a>

          <section aria-labelledby="vcard-location-title" className="rounded-2xl border border-[#E7DED3] bg-white p-4 sm:p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#A85C16]">Visit or enquire</p>
                <h2 id="vcard-location-title" className="mt-1 font-serif-display text-lg font-semibold text-[#2A2522]">{CONTACT_OFFICE_LOCATION_LABEL}</h2>
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F3EEE6] text-[#34503B]">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>

            <dl className="mt-4 space-y-3.5">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#A85C16]" aria-hidden="true" />
                <div>
                  <dt className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#82766B]">Physical address</dt>
                  <dd className="mt-1 text-xs leading-5 text-[#514840]">
                    <address className="not-italic">{CONTACT_OFFICE_LOCATION.address}</address>
                    <span className="mt-1 block font-medium text-[#6D6259]">{CONTACT_OFFICE_LOCATION.name}</span>
                  </dd>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#A85C16]" aria-hidden="true" />
                <div>
                  <dt className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#82766B]">Business hours · EAT</dt>
                  <dd className="mt-1 text-xs leading-5 text-[#514840]">
                    {CONTACT_OFFICE_HOURS.weekdays}<br />{CONTACT_OFFICE_HOURS.weekends}
                  </dd>
                </div>
              </div>
              <div className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#A85C16]" aria-hidden="true" />
                <div className="min-w-0">
                  <dt className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#82766B]">Contact email</dt>
                  <dd className="mt-1 break-all text-xs text-[#514840]">
                    <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-[#34503B] underline decoration-[#34503B]/30 underline-offset-4 hover:decoration-[#34503B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A85C16]">
                      {CONTACT_EMAIL}
                    </a>
                  </dd>
                </div>
              </div>
            </dl>

            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full border border-[#D8CABB] px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.13em] text-[#34503B] transition hover:border-[#34503B] hover:bg-[#F7F2EA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A85C16]"
            >
              Open office directions
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </section>

          <button
            type="button"
            onClick={() => setCurrentPage('coffee')}
            className="group flex min-h-12 w-full items-center justify-between gap-3 rounded-2xl border border-[#D8CABB] bg-[#F7F2EA] px-4 py-3 text-left transition hover:border-[#A85C16]/60 hover:bg-[#F1E8DC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A85C16] sm:px-5"
          >
            <span className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#A85C16]">
                <Coffee className="h-4 w-4" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs font-bold text-[#2A2522]">Product Catalog &amp; Roast Specs</span>
                <span className="mt-0.5 block text-[9px] text-[#766C63]">Explore our Kenyan coffee range</span>
              </span>
            </span>
            <ArrowRight className="h-4 w-4 shrink-0 text-[#A85C16] transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </button>

          <section aria-labelledby="vcard-social-title" className="border-t border-[#E7DED3] pt-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#A85C16]">Stay connected</p>
                <h2 id="vcard-social-title" className="mt-1 font-serif-display text-lg font-semibold text-[#2A2522]">Follow First Cup</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map(({ name, href, Icon }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`First Cup on ${name} (opens in a new tab)`}
                    className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#E2D7CA] bg-white px-3.5 py-2 text-[10px] font-semibold text-[#514840] transition hover:border-[#A85C16]/45 hover:text-[#34503B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A85C16]"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {name}
                  </a>
                ))}
                <button
                  type="button"
                  onClick={() => setCurrentPage('home')}
                  aria-label="Visit the First Cup website"
                  className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#E2D7CA] bg-white px-3.5 py-2 text-[10px] font-semibold text-[#514840] transition hover:border-[#A85C16]/45 hover:text-[#34503B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A85C16]"
                >
                  <Globe className="h-4 w-4" aria-hidden="true" />
                  Web
                </button>
              </div>
            </div>
          </section>
        </div>
      </article>

      <p className="relative mx-auto mt-5 max-w-2xl text-center text-[9px] leading-5 text-[#80766C]">
        <BadgeCheck className="mr-1 inline h-3 w-3 align-[-2px] text-[#557246]" aria-hidden="true" />
        First Cup Coffee &amp; Tea · From Kenya’s highlands to your cup.
      </p>
    </section>
  );
};
