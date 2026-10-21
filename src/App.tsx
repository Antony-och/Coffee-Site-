import { useEffect, useState } from 'react';
import type { PageView, CoffeeProduct, TeaProduct, CartItem } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CoffeeCatalog } from './components/CoffeeCatalog';
import { TeaCatalog } from './components/TeaCatalog';
import { AboutSection } from './components/AboutSection';
import { ProcessSection } from './components/ProcessSection';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';
import { EventsStoriesSection } from './components/EventsStoriesSection';
import { HomePage } from './components/HomePage';
import { TrustedBrands } from './components/TrustedBrands';
import { ProductModal } from './components/ProductModal';
import { SampleCartDrawer } from './components/SampleCartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { pageFromPathname, PAGE_PATHS } from './utils/pageRoutes';

const PAGE_TITLES: Record<PageView, string> = {
  home: 'First Cup Coffee & Tea | Kenyan Coffee and Tea',
  about: 'About Us | First Cup Coffee & Tea',
  coffee: 'Kenyan Coffee | First Cup Coffee & Tea',
  tea: 'Kenyan Tea | First Cup Coffee & Tea',
  events: 'Events & Stories | First Cup Coffee & Tea',
  contact: 'Contact | First Cup Coffee & Tea',
};

const PAGE_META: Record<PageView, { description: string; keywords: string }> = {
  home: {
    description: 'Discover distinctive Kenyan highland coffee and artisanal tea, selected with care for roasters, cafés, retailers, and curious tea lovers.',
    keywords: 'Kenyan coffee, Kenyan tea, highland coffee, artisanal tea, First Cup, coffee exporter',
  },
  about: {
    description: 'Learn about First Cup Coffee & Tea, a Kenyan-owned coffee and tea company helping buyers source, prepare, and export distinctive highland products.',
    keywords: 'about First Cup, Kenyan coffee exporter, Kenyan tea exporter, coffee sourcing, tea sourcing, coffee export',
  },
  coffee: {
    description: 'Explore traceable Kenyan Arabica coffee by grade, roast, origin, and process, from bright highland lots to bold espresso roasts.',
    keywords: 'Kenyan Arabica, coffee grades, AA coffee, coffee roasts, Nyeri coffee, coffee exporter',
  },
  tea: {
    description: 'Explore Kenyan tea by leaf grade and style, including black, green, purple, chai, and blended teas from highland growing regions.',
    keywords: 'Kenyan tea, tea grades, black tea, purple tea, green tea, Kenyan tea exporter',
  },
  events: {
    description: 'Explore First Cup events, activations, community connections, and coffee stories from Kenya to every place we share the cup.',
    keywords: 'First Cup events, coffee events Kenya, coffee activations, coffee community, Kenyan coffee stories',
  },
  contact: {
    description: 'Contact First Cup Coffee & Tea for samples, wholesale enquiries, export availability, and current coffee and tea lot details.',
    keywords: 'coffee wholesale enquiry, tea wholesale enquiry, Kenyan coffee samples, Kenyan tea samples',
  },
};

function setMetaTag(attribute: 'name' | 'property', key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.content = content;
}

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
    const meta = PAGE_META[currentPage];
    const title = PAGE_TITLES[currentPage];
    document.title = title;
    setMetaTag('name', 'description', meta.description);
    setMetaTag('name', 'keywords', meta.keywords);
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', meta.description);
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:site_name', 'First Cup Coffee & Tea');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', meta.description);
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
            <EducationSection kind="coffee" />
          </div>
        );
      case 'tea':
        return (
          <div id="tea">
            <TeaCatalog onSelectProduct={setSelectedProduct} externalSearch={searchQuery} />
            <ProcessSection kind="tea" />
            <EducationSection kind="tea" />
          </div>
        );
      case 'events':
        return <EventsStoriesSection />;
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

      {currentPage === 'home' && <TrustedBrands />}

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
