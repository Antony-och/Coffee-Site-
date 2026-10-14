import { useState, useEffect } from 'react';
import { PageView, Currency, CoffeeProduct, TeaProduct, CartItem, Order } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroSlideshow } from './components/HeroSlideshow';
import { CoffeeCatalog } from './components/CoffeeCatalog';
import { TeaCatalog } from './components/TeaCatalog';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { TrustedBrands } from './components/TrustedBrands';
import { ProductModal } from './components/ProductModal';
import { SampleCartDrawer } from './components/SampleCartDrawer';
import { CheckoutModal } from './components/CheckoutModal';

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
    const sectionIds: PageView[] = ['home', 'about', 'coffee', 'tea', 'contact'];
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
        setSearchQuery={setSearchQuery}
      />

      {/* Streamlined Main Scrollable Flow */}
      <main className="flex-1 space-y-0">
        
        {/* Section 1: Hero Slideshow */}
        <section id="home" className="scroll-mt-20">
          <HeroSlideshow setCurrentPage={handlePageChange} />
        </section>

        {/* Section 2: About First Cup */}
        <section id="about" className="scroll-mt-20">
          <AboutSection setCurrentPage={handlePageChange} />
        </section>

        {/* Section 3: Product Collections (Coffee Reserve & Purified Teas) */}
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

        {/* Section 4: Trusted brand logos */}
        <TrustedBrands />

        {/* Section 5: Contact & Wholesale */}
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
      {isCheckoutOpen && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          cartItems={cartItems}
          currency={currency}
          onPlaceOrder={handlePlaceOrder}
        />
      )}

    </div>
  );
}
