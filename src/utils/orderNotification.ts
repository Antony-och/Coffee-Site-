import { OrderRequest } from '../types';

export const EXPORT_WHATSAPP_PHONE = '254725741543';
export const EXPORT_WHATSAPP_DISPLAY_PHONE = '+254 725 741 543';

export function generateWhatsAppOrderMessage(request: OrderRequest): string {
  const { shippingDetails, items } = request;
  const itemList = items
    .map(
      (item, index) =>
        `${index + 1}. *${item.name}*\n   Pack size: ${item.format}\n   Quantity: ${item.quantity} ${item.quantity === 1 ? 'pack' : 'packs'}`
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

  return `Hello First Cup Coffee & Tea,\n\nI'd like to request a quote for the following products.\n\n*Request reference:* ${request.id}\n*Date:* ${request.date}\n\n*Customer*\nName: ${shippingDetails.fullName}\nPhone: ${shippingDetails.phone}${shippingDetails.email ? `\nEmail: ${shippingDetails.email}` : ''}${shippingDetails.companyName ? `\nCompany: ${shippingDetails.companyName}` : ''}\n\n*Delivery destination*\n${deliveryAddress}\n\n*Requested items*\n${itemList}\n\n*Price on request.* Our team will confirm prices, availability and delivery before your order is accepted.\n\nThank you.`;
}

export function generateWhatsAppOrderUrl(request: OrderRequest, phone: string = EXPORT_WHATSAPP_PHONE): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(generateWhatsAppOrderMessage(request))}`;
}
