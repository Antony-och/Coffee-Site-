import { Order } from '../types';
import { formatPrice } from './currency';

export const EXPORT_WHATSAPP_PHONE = '254700000000'; // Kenyan Highland Coffee & Tea Export Desk
export const EXPORT_EMAIL_ADDRESS = 'export@kenyanhighlandcoffee.co.ke';

/**
 * Builds a clear, structured WhatsApp order message including:
 * - Buyer's Name
 * - Order Details (Items, Formats, Quantities, Pricing)
 * - Delivery Location
 * - Phone Number
 * - Email Address
 */
export function generateWhatsAppOrderMessage(order: Order): string {
  const { shippingDetails, items, currency } = order;
  const formattedTotal = formatPrice(order.totalUsd, order.totalKes, order.totalEur, currency);
  const formattedSubtotal = formatPrice(order.subtotalUsd, order.subtotalKes, order.subtotalEur, currency);

  const itemList = items
    .map(
      (item, idx) =>
        `${idx + 1}. *${item.name}*\n   • Qty: ${item.quantity}\n   • Packaging: ${item.format}\n   • Item Total: ${formatPrice(
          item.priceUsd * item.quantity,
          item.priceKes * item.quantity,
          item.priceEur * item.quantity,
          currency
        )}`
    )
    .join('\n\n');

  const location = [
    shippingDetails.streetAddress,
    shippingDetails.city,
    shippingDetails.country,
    shippingDetails.postalCode ? `Postal Code: ${shippingDetails.postalCode}` : '',
  ]
    .filter(Boolean)
    .join(', ');

  return `☕🍃 *NEW ORDER CONFIRMATION*
*Kenyan Highland Coffee & Tea Export Reserve*
━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 *Order Reference:* \`${order.id}\`
📅 *Date:* ${order.date}
🏷️ *Status:* ${order.status}

👤 *BUYER DETAILS:*
• *Full Name:* ${shippingDetails.fullName}
• *Phone Number:* ${shippingDetails.phone}${shippingDetails.mpesaPhone && shippingDetails.mpesaPhone !== shippingDetails.phone ? ` (M-PESA: ${shippingDetails.mpesaPhone})` : ''}
• *Email Address:* ${shippingDetails.email}
${shippingDetails.companyName ? `• *Company / Roastery:* ${shippingDetails.companyName}\n` : ''}
📍 *DELIVERY LOCATION:*
• *Address:* ${shippingDetails.streetAddress}
• *City / Town:* ${shippingDetails.city}
• *Country:* ${shippingDetails.country}
${shippingDetails.postalCode ? `• *Postal / ZIP Code:* ${shippingDetails.postalCode}\n` : ''}
📦 *ORDER SUMMARY:*
${itemList}

━━━━━━━━━━━━━━━━━━━━━━━━━━━
💰 *FINANCIAL SUMMARY:*
• *Subtotal:* ${formattedSubtotal}
• *Shipping Method:* ${shippingDetails.shippingMethod.toUpperCase().replace('_', ' ')} (Air Express)
• *Total Payable:* ${formattedTotal}
• *Payment Mode:* ${shippingDetails.paymentMethod.toUpperCase()}
• *Tracking Code:* ${order.trackingNumber}
• *Estimated Delivery:* ${order.estimatedDelivery}
━━━━━━━━━━━━━━━━━━━━━━━━━━━
_Sent via Kenyan Highland Coffee & Tea Official Export Portal_`;
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
• Payment Method   : ${shippingDetails.paymentMethod.toUpperCase()}
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
