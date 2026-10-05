export type Currency = 'USD' | 'KES' | 'EUR';

export type PageView = 'home' | 'coffee' | 'tea' | 'process' | 'about' | 'contact' | 'calculator';

export interface CoffeeProduct {
  id: string;
  name: string;
  subTitle: string;
  grade: 'AA' | 'AB' | 'PB (Peaberry)' | 'Single Estate Micro-Lot';
  variety: 'SL28 & SL34' | 'Ruiru 11' | 'Batian' | 'Kenyan Heirloom Arabica';
  region: 'Nyeri Highlands' | 'Kirinyaga' | 'Kiambu Estate' | 'Mount Kenya Slopes' | 'Embu';
  altitude: string; // e.g. "1,850m - 2,100m"
  roastLevel: 'Light City' | 'Medium Full-City' | 'Dark Espresso Roast';
  process: 'Washed (Eco-Pulped & Sun-Dried)' | 'Natural Honey Process' | 'Anaerobic Washed';
  cuppingScore: number; // e.g. 89.5
  flavorNotes: string[];
  priceUsd: number;
  priceKes: number;
  priceEur: number;
  description: string;
  image: string;
  recommendedBrew: ('V60 Pour Over' | 'French Press' | 'Espresso Machine' | 'Aeropress' | 'Chemex')[];
  packagingFormats: string[];
  isFeatured?: boolean;
  intensity: number; // 1 to 5
}

export interface TeaProduct {
  id: string;
  name: string;
  subTitle: string;
  type: 'Rare Purple Tea' | 'Black CTC Safari' | 'Orthodox Green' | 'Artisanal White Needle' | 'Spiced Chai Infusion';
  origin: 'Kericho Tea Valley' | 'Nandi Hills' | 'Limuru Estate' | 'Aberdare Slopes';
  altitude: string;
  oxidationLevel: string; // e.g., "0%" or "100%" or "Partial 40%"
  polyphenols: string; // e.g. "16.5% Anthocyanins"
  liquorColor: string; // hex color string for visual representation
  priceUsd: number;
  priceKes: number;
  priceEur: number;
  description: string;
  image: string;
  steepTime: string; // e.g., "3 - 4 mins"
  steepTemp: string; // e.g., "85°C / 185°F"
  tastingNotes: string[];
  packagingFormats: string[];
  isFeatured?: boolean;
}

export interface ProcessStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  category: 'coffee' | 'tea';
  description: string;
  detailedExecution: string;
  image: string;
  metrics: { label: string; value: string }[];
  keyTool: string;
}

export interface HeroSlide {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  primaryCtaText: string;
  primaryCtaAction: PageView;
  secondaryCtaText: string;
  secondaryCtaAction: PageView;
}

export interface FactoryLocation {
  id: string;
  name: string;
  role: 'Logistics & Export HQ' | 'Milling & Roasting Plant' | 'Tea Harvest & Processing Hub';
  region: string;
  address: string;
  coords: { lat: number; lng: number };
  phone: string;
  email: string;
  hours: string;
  description: string;
  image: string;
  highlights: string[];
}

export interface CartItem {
  id: string;
  type: 'coffee' | 'tea';
  productId: string;
  name: string;
  format: string;
  priceUsd: number;
  priceKes: number;
  priceEur: number;
  quantity: number;
  image: string;
}

export interface OrderShippingDetails {
  fullName: string;
  email: string;
  phone: string;
  companyName?: string;
  streetAddress: string;
  city: string;
  country: string;
  postalCode: string;
  shippingMethod: 'direct_air_express' | 'air_cargo' | 'ocean_freight';
  paymentMethod: 'card' | 'mpesa' | 'wire' | 'cod' | 'not_required';
  mpesaPhone?: string;
  cardLastFour?: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'Processing' | 'Phytosanitary Inspection' | 'In Transit' | 'Delivered';
  items: CartItem[];
  subtotalUsd: number;
  subtotalKes: number;
  subtotalEur: number;
  shippingFeeUsd: number;
  shippingFeeKes: number;
  shippingFeeEur: number;
  totalUsd: number;
  totalKes: number;
  totalEur: number;
  currency: Currency;
  shippingDetails: OrderShippingDetails;
  trackingNumber: string;
  estimatedDelivery: string;
}

export interface SampleInquiryFormData {
  fullName: string;
  email: string;
  companyName: string;
  businessType: 'Roaster / Café' | 'Tea Retailer / Importer' | 'Hotel & Hospitality' | 'Wholesale Distributor' | 'Individual Connoisseur';
  destinationCountry: string;
  estimatedVolume: 'Sample Box (1-2 kg)' | 'Micro-Lot Bags (60 kg)' | 'Pallet / LCL Shipment' | 'Full Container Load (FCL)';
  selectedProducts: string[];
  additionalNotes: string;
}
