import { useState, useEffect } from 'react';
import { PageView, Currency, CoffeeProduct, TeaProduct, CartItem, Order } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroSlideshow } from './components/HeroSlideshow';
import { CoffeeCatalog } from './components/CoffeeCatalog';
import { TeaCatalog } from './components/TeaCatalog';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { ProductModal } from './components/ProductModal';
import { SampleCartDrawer } from './components/SampleCartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { TERROIR_STATS } from './data/companyData';
import { Star } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<CoffeeProduct | TeaProduct | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Orders State with localStorage persistence
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('khc_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('khc_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders to localStorage:', e);
    }
  }, [orders]);

  // Auto update active section in navbar as user scrolls
  useEffect(() => {
    const sectionIds: PageView[] = ['home', 'coffee', 'about', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element) {
          if (scrollPosition >= element.offsetTop - 50) {
            setCurrentPage(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePageChange = (page: PageView) => {
    setCurrentPage(page);
    const element = document.getElementById(page);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Cart operations
  const handleAddToCart = (newItem: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === newItem.id);
      if (existing) {
        return prev.map((i) =>
          i.id === newItem.id ? { ...i, quantity: i.quantity + newItem.quantity } : i
        );
      }
      return [...prev, newItem];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handlePlaceOrder = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2A2522] selection:bg-[#D97706] selection:text-white">
      
      {/* Header Navigation */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={handlePageChange}
        currency={currency}
        setCurrency={setCurrency}
        cartCount={totalCartCount}
        setIsCartOpen={setIsCartOpen}
        searchQuery={searchQuery}
        setSearchQuery={(q) => {
          setSearchQuery(q);
          if (q) {
            const coffeeEl = document.getElementById('coffee');
            if (coffeeEl) coffeeEl.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

      {/* Streamlined Main Scrollable Flow */}
      <main className="flex-1 space-y-0">
        
        {/* Section 1: Hero Slideshow */}
        <section id="home" className="scroll-mt-20">
          <HeroSlideshow setCurrentPage={handlePageChange} />

          {/* Terroir & High Altitude Stats Strip */}
          <div className="bg-[#2D241E] text-[#FAF7F2] py-8 border-b border-[#E5E1DA]/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                {TERROIR_STATS.map((stat, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <span className="font-serif-display text-2xl font-extrabold text-[#D97706] block">
                      {stat.value}
                    </span>
                    <h4 className="font-serif-display text-xs font-bold text-[#FAF7F2]">
                      {stat.label}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Product Collections (Coffee Reserve & Purified Teas) */}
        <section id="coffee" className="scroll-mt-20 py-12">
          <CoffeeCatalog
            currency={currency}
            onSelectProduct={setSelectedProduct}
            onAddToCart={handleAddToCart}
            externalSearch={searchQuery}
          />
        </section>

        <section id="tea" className="scroll-mt-20">
          <TeaCatalog
            currency={currency}
            onSelectProduct={setSelectedProduct}
            onAddToCart={handleAddToCart}
            externalSearch={searchQuery}
          />
        </section>

        {/* Section 4: Sommelier Endorsements */}
        <section className="py-16 bg-[#FAF7F2] text-[#2A2522]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center max-w-xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D97706] block">
                Quality Certified
              </span>
              <h2 className="font-serif-display text-2xl font-bold text-[#2A2522]">
                Cupping Ratings (88+ SCA)
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-white border border-[#E5E1DA] rounded-2xl p-6 shadow-sm space-y-3">
                <div className="flex text-[#D97706] gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D97706]" />
                  ))}
                </div>
                <p className="text-xs text-[#7A746E] leading-relaxed italic">
                  "Mount Kenya Nyeri Reserve AA displayed sparkling blackcurrant acidity and a honeyed jasmine finish that scored 91.5. Exceptional single-origin export quality."
                </p>
                <div className="pt-2 border-t border-[#E5E1DA] text-xs">
                  <strong className="text-[#2A2522] block">Marcus Vance</strong>
                  <span className="text-[#7A746E]">Master Q-Grader, Specialty Coffee Guild</span>
                </div>
              </div>

              <div className="bg-white border border-[#E5E1DA] rounded-2xl p-6 shadow-sm space-y-3">
                <div className="flex text-[#D97706] gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D97706]" />
                  ))}
                </div>
                <p className="text-xs text-[#7A746E] leading-relaxed italic">
                  "TRFK 306/1 Imperial Purple Tea is a revelation. The violet-tinged liquor produces an extraordinarily clean berry sweetness without harshness."
                </p>
                <div className="pt-2 border-t border-[#E5E1DA] text-xs">
                  <strong className="text-[#2A2522] block">Elena Rostova</strong>
                  <span className="text-[#7A746E]">Tea Sommelier, Tokyo & Zurich</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: About Terroir */}
        <section id="about" className="scroll-mt-20">
          <AboutSection setCurrentPage={handlePageChange} />
        </section>

        {/* Section 6: Contact & Wholesale */}
        <section id="contact" className="scroll-mt-20">
          <ContactSection cartItems={cartItems} currency={currency} />
        </section>

      </main>

      {/* Footer */}
      <Footer setCurrentPage={handlePageChange} />

      {/* Product Specification Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        currency={currency}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-out Sample Cart & Quote Drawer */}
      <SampleCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        currency={currency}
        setCurrentPage={handlePageChange}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Interactive Order Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        currency={currency}
        onPlaceOrder={handlePlaceOrder}
      />

    </div>
  );
}
