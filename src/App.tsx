import { useEffect, useState } from 'react';
import type { PageView, CoffeeProduct, TeaProduct, CartItem } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroSlideshow } from './components/HeroSlideshow';
import { CoffeeCatalog } from './components/CoffeeCatalog';
import { TeaCatalog } from './components/TeaCatalog';
import { AboutSection } from './components/AboutSection';
import { ProcessSection } from './components/ProcessSection';
import { ContactSection } from './components/ContactSection';
import { TrustedBrands } from './components/TrustedBrands';
import { ProductModal } from './components/ProductModal';
import { SampleCartDrawer } from './components/SampleCartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { pageFromPathname, PAGE_PATHS } from './utils/pageRoutes';

const PAGE_TITLES: Record<PageView, string> = {
  home: 'First Cup Coffee & Tea | Kenyan Coffee and Tea',
  about: 'Our Story | First Cup Coffee & Tea',
  coffee: 'Kenyan Coffee | First Cup Coffee & Tea',
  tea: 'Kenyan Tea | First Cup Coffee & Tea',
  process: 'From Harvest to Cup | First Cup Coffee & Tea',
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
    const handlePopState = () => {
      setCurrentPage(pageFromPathname(window.location.pathname));
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
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
        return (
          <>
            <section id="home" aria-label="Home">
              <HeroSlideshow setCurrentPage={handlePageChange} />
            </section>
            <TrustedBrands />
          </>
        );
      case 'about':
        return <AboutSection setCurrentPage={handlePageChange} />;
      case 'coffee':
        return (
          <section id="coffee" className="bg-[#FAF7F2] py-12">
            <CoffeeCatalog onSelectProduct={setSelectedProduct} externalSearch={searchQuery} />
          </section>
        );
      case 'tea':
        return (
          <section id="tea" className="bg-[#FAF7F2]">
            <TeaCatalog onSelectProduct={setSelectedProduct} externalSearch={searchQuery} />
          </section>
        );
      case 'process':
        return <ProcessSection />;
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
