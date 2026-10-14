import { Order } from '../types';
import { formatPrice } from './currency';

export const EXPORT_WHATSAPP_PHONE = '254700000000'; // Kenyan Highland Coffee & Tea Export Desk
export const EXPORT_EMAIL_ADDRESS = 'export@kenyanhighlandcoffee.co.ke';

export function generateWhatsAppOrderMessage(order: Order): string {
  const { shippingDetails, items, currency } = order;
  const formattedSubtotal = formatPrice(order.subtotalUsd, order.subtotalKes, order.subtotalEur, currency);

  const itemList = items
    .map(
      (item, idx) =>
        `${idx + 1}. *${item.name}*\n   Format: ${item.format}\n   Quantity: ${item.quantity}\n   Item subtotal: ${formatPrice(
          item.priceUsd * item.quantity,
          item.priceKes * item.quantity,
          item.priceEur * item.quantity,
          currency
        )}`
    )
    .join('\n\n');

  const deliveryAddress = [
    shippingDetails.streetAddress,
    shippingDetails.city,
    shippingDetails.country,
    shippingDetails.postalCode,
  ]
    .filter(Boolean)
    .join(', ');

  return `Hello First Cup Coffee & Tea,\n\nI'd like to request the following order.\n\n*Request reference:* ${order.id}\n*Date:* ${order.date}\n\n*Customer*\nName: ${shippingDetails.fullName}\nPhone: ${shippingDetails.phone}${shippingDetails.email ? `\nEmail: ${shippingDetails.email}` : ''}${shippingDetails.companyName ? `\nCompany: ${shippingDetails.companyName}` : ''}\n\n*Delivery address*\n${deliveryAddress}\n\n*Items*\n${itemList}\n\n*Merchandise subtotal:* ${formattedSubtotal}\n*Delivery charge and final total:* Please confirm with me before payment.\n\nPlease confirm availability, delivery options, and payment instructions. Thank you.`;
}

/**
 * Builds the direct WhatsApp API link with URL-encoded message text
 */
export function generateWhatsAppOrderUrl(order: Order, phone: string = EXPORT_WHATSAPP_PHONE): string {
  const message = generateWhatsAppOrderMessage(order);
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates the Subject line for the order confirmation email
 */
export function generateEmailOrderSubject(order: Order): string {
  return `[ORDER CONFIRMED] Ref: ${order.id} - ${order.shippingDetails.fullName} (${order.shippingDetails.city}, ${order.shippingDetails.country})`;
}

/**
 * Builds a clean plaintext email body with all 5 mandatory details:
 * Buyer's Name, Order, Location, Phone Number, Email
 */
export function generateEmailOrderBody(order: Order): string {
  const { shippingDetails, items, currency } = order;
  const formattedTotal = formatPrice(order.totalUsd, order.totalKes, order.totalEur, currency);
  const formattedSubtotal = formatPrice(order.subtotalUsd, order.subtotalKes, order.subtotalEur, currency);

  const itemList = items
    .map(
      (item, idx) =>
        `  ${idx + 1}. ${item.name}\n     - Quantity: ${item.quantity}\n     - Packaging Format: ${item.format}\n     - Price: ${formatPrice(
          item.priceUsd * item.quantity,
          item.priceKes * item.quantity,
          item.priceEur * item.quantity,
          currency
        )}`
    )
    .join('\n\n');

  const paymentLabel = shippingDetails.paymentMethod === 'not_required'
    ? 'No payment required at this stage – details sent via Email/WhatsApp'
    : shippingDetails.paymentMethod.toUpperCase();

  return `KENYAN HIGHLAND COFFEE & TEA - EXPORT ORDER INVOICE
============================================================
Order Reference ID : ${order.id}
Order Date         : ${order.date}
Current Status     : ${order.status}
Tracking Number    : ${order.trackingNumber}

1. BUYER & CONTACT INFORMATION:
------------------------------------------------------------
• Buyer Name       : ${shippingDetails.fullName}
• Phone Number     : ${shippingDetails.phone}${shippingDetails.mpesaPhone ? ` (M-PESA: ${shippingDetails.mpesaPhone})` : ''}
• Email Address    : ${shippingDetails.email}
• Company/Roastery : ${shippingDetails.companyName || 'Individual / Private Buyer'}

2. DELIVERY LOCATION:
------------------------------------------------------------
• Street Address   : ${shippingDetails.streetAddress}
• City / Municipality: ${shippingDetails.city}
• Country          : ${shippingDetails.country}
• Postal Code      : ${shippingDetails.postalCode || 'N/A'}

3. ITEMIZED ORDER ITEMS:
------------------------------------------------------------
${itemList}

4. PAYMENT & SHIPPING SUMMARY:
------------------------------------------------------------
• Subtotal Amount  : ${formattedSubtotal}
• Shipping Cost    : Free Express Door-to-Door Delivery
• TOTAL ORDER VAL  : ${formattedTotal}
• Payment Method   : ${paymentLabel}
• Estimated Dispatch: ${order.estimatedDelivery}

============================================================
This order copy has been logged into the Kenyan Highland Coffee & Tea export system.
Logistics Hub: JKIA Air Cargo Logistics Zone, Nairobi, Kenya.
Support Desk: ${EXPORT_EMAIL_ADDRESS} | WhatsApp: +254 700 000 000
============================================================`;
}

/**
 * Builds the mailto: URL for sending order to export desk with CC to buyer
 */
export function generateEmailOrderUrl(order: Order, exportEmail: string = EXPORT_EMAIL_ADDRESS): string {
  const subject = generateEmailOrderSubject(order);
  const body = generateEmailOrderBody(order);
  const buyerEmail = order.shippingDetails.email;
  
  // mailto URL with CC to buyer so both seller and buyer get a copy
  const params = new URLSearchParams();
  params.append('subject', subject);
  params.append('body', body);
  if (buyerEmail) {
    params.append('cc', buyerEmail);
  }

  return `mailto:${exportEmail}?${params.toString().replace(/\+/g, '%20')}`;
}
