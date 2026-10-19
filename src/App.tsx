import { useEffect, useState } from 'react';
import type { PageView, CoffeeProduct, TeaProduct, CartItem } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CoffeeCatalog } from './components/CoffeeCatalog';
import { TeaCatalog } from './components/TeaCatalog';
import { AboutSection } from './components/AboutSection';
import { ProcessSection } from './components/ProcessSection';
import { ContactSection } from './components/ContactSection';
import { HomePage } from './components/HomePage';
import { ProductModal } from './components/ProductModal';
import { SampleCartDrawer } from './components/SampleCartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { pageFromPathname, PAGE_PATHS } from './utils/pageRoutes';

const PAGE_TITLES: Record<PageView, string> = {
  home: 'First Cup Coffee & Tea | Kenyan Coffee and Tea',
  about: 'Our Story | First Cup Coffee & Tea',
  coffee: 'Kenyan Coffee | First Cup Coffee & Tea',
  tea: 'Kenyan Tea | First Cup Coffee & Tea',
  contact: 'Contact | First Cup Coffee & Tea',
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>(() => pageFromPathname(window.location.pathname));
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<CoffeeProduct | TeaProduct | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const scrollToCurrentHash = () => {
      const targetId = decodeURIComponent(window.location.hash.slice(1));
      if (targetId) {
        window.requestAnimationFrame(() => {
          document.getElementById(targetId)?.scrollIntoView({ block: 'start' });
        });
      }
    };

    const syncLocation = () => {
      const legacyProcessPath = window.location.pathname === '/process';
      setCurrentPage(pageFromPathname(window.location.pathname));
      if (legacyProcessPath) {
        window.history.replaceState({ page: 'coffee' }, '', '/coffee#coffee-process');
        scrollToCurrentHash();
      } else {
        window.scrollTo(0, 0);
        scrollToCurrentHash();
      }
    };

    window.addEventListener('popstate', syncLocation);
    if (window.location.pathname === '/process') {
      syncLocation();
    } else if (window.location.hash) {
      scrollToCurrentHash();
    }
    return () => window.removeEventListener('popstate', syncLocation);
  }, []);

  useEffect(() => {
    document.title = PAGE_TITLES[currentPage];
  }, [currentPage]);

  const handlePageChange = (page: PageView) => {
    const path = PAGE_PATHS[page];
    if (window.location.pathname !== path) {
      window.history.pushState({ page }, '', path);
    }
    setCurrentPage(page);
    window.scrollTo(0, 0);
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

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={handlePageChange} />;
      case 'about':
        return <AboutSection setCurrentPage={handlePageChange} />;
      case 'coffee':
        return (
          <div id="coffee">
            <CoffeeCatalog onSelectProduct={setSelectedProduct} externalSearch={searchQuery} />
            <ProcessSection kind="coffee" />
          </div>
        );
      case 'tea':
        return (
          <div id="tea">
            <TeaCatalog onSelectProduct={setSelectedProduct} externalSearch={searchQuery} />
            <ProcessSection kind="tea" />
          </div>
        );
      case 'contact':
        return (
          <section id="contact">
            <ContactSection cartItems={cartItems} />
          </section>
        );
      default:
        return null;
    }
  };

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

      <main key={currentPage} className="flex-1">
        {renderPage()}
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
