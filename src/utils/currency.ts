import { Currency } from '../types';

export function formatPrice(usdPrice: number, kesPrice: number, eurPrice: number, currency: Currency): string {
  switch (currency) {
    case 'KES':
      return `KSh ${kesPrice.toLocaleString('en-KE')}`;
    case 'EUR':
      return `€${eurPrice.toFixed(2)}`;
    case 'USD':
    default:
      return `$${usdPrice.toFixed(2)}`;
  }
}
