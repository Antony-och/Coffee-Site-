import { useState, useEffect } from 'react';
import { PageView, CoffeeProduct, TeaProduct, CartItem } from './types';
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
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<CoffeeProduct | TeaProduct | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Auto update active section in navbar as user scrolls
  useEffect(() => {
    const sectionIds: PageView[] = ['home', 'about', 'coffee', 'tea', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element && scrollPosition >= element.offsetTop - 50) {
          setCurrentPage(id);
          break;
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

  const handleAddToCart = (newItem: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === newItem.id);
      if (existing) {
        return prev.map((item) =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + newItem.quantity } : item
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
            const newQuantity = item.quantity + delta;
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleRequestComplete = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2A2522] selection:bg-[#D97706] selection:text-white">
      <Navbar
        currentPage={currentPage}
        setCurrentPage={handlePageChange}
        cartCount={totalCartCount}
        setIsCartOpen={setIsCartOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="flex-1 space-y-0">
        <section id="home" className="scroll-mt-20">
          <HeroSlideshow setCurrentPage={handlePageChange} />
        </section>

        <section id="about" className="scroll-mt-20">
          <AboutSection setCurrentPage={handlePageChange} />
        </section>

        <section id="coffee" className="scroll-mt-20 py-12">
          <CoffeeCatalog
            onSelectProduct={setSelectedProduct}
            externalSearch={searchQuery}
          />
        </section>

        <section id="tea" className="scroll-mt-20">
          <TeaCatalog
            onSelectProduct={setSelectedProduct}
            externalSearch={searchQuery}
          />
        </section>

        <TrustedBrands />

        <section id="contact" className="scroll-mt-20">
          <ContactSection cartItems={cartItems} />
        </section>
      </main>

      <Footer setCurrentPage={handlePageChange} />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <SampleCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        setCurrentPage={handlePageChange}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
      />

      {isCheckoutOpen && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          cartItems={cartItems}
          onRequestComplete={handleRequestComplete}
        />
      )}
    </div>
  );
}
