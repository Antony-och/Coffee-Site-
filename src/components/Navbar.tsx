import React, { useEffect, useState } from 'react';
import { PageView } from '../types';
import { Coffee, Leaf, Compass, Info, Mail, ShoppingBag, Menu, X, Search } from 'lucide-react';

interface NavbarProps {
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  cartCount: number;
  setIsCartOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  setCurrentPage,
  cartCount,
  setIsCartOpen,
  searchQuery,
  setSearchQuery,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const navItems: { id: PageView; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Compass className="w-4 h-4" /> },
    { id: 'about', label: 'About', icon: <Info className="w-4 h-4" /> },
    { id: 'coffee', label: 'Coffee', icon: <Coffee className="w-4 h-4" /> },
    { id: 'tea', label: 'Tea', icon: <Leaf className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact', icon: <Mail className="w-4 h-4" /> },
  ];

  const handleNavClick = (page: PageView) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#4A3728]/95 backdrop-blur-md border-b border-[#E5E1DA]/20 text-[#FAF7F2] shadow-lg transition-all duration-300">
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between sm:h-20">
          
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none focus:ring-2 focus:ring-[#D97706] rounded-lg p-1"
            aria-label="First Cup Coffee & Tea — home"
          >
            <img
              src="/brand/first-cup-logo-white-500.png"
              alt="First Cup Coffee & Tea"
              className="h-12 w-auto max-w-[3.5rem] object-contain transition-transform duration-200 group-hover:scale-[1.02] sm:h-16 sm:max-w-[4.75rem]"
            />
          </button>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-3 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#2D241E] text-white shadow-md border border-[#D4C3A3]/30'
                      : 'text-[#D4C3A3] hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                setIsMobileMenuOpen(false);
              }}
              aria-label={isSearchOpen ? 'Close product search' : 'Open product search'}
              aria-expanded={isSearchOpen}
              className="rounded-lg p-1.5 text-[#D4C3A3] transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97706] sm:p-2"
              title="Search Products"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Order Cart Drawer Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label={`Open order cart${cartCount ? `, ${cartCount} items` : ''}`}
              className="relative p-2.5 rounded-full bg-[#D97706] text-white hover:bg-[#b45309] transition-all shadow-md flex items-center gap-2"
              title="View Orders / Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden md:inline-block text-xs font-bold uppercase tracking-wider">Orders</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#5D6D3C] text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#4A3728]">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => {
                setIsMobileMenuOpen((open) => !open);
              }}
              className="rounded-lg p-1.5 text-[#D4C3A3] hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97706] lg:hidden sm:p-2"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Search Input Bar (Dropdown Expandable) */}
        {isSearchOpen && (
          <div className="py-3 px-1 border-t border-[#E5E1DA]/20 flex items-center gap-3">
            <Search className="w-4 h-4 text-[#D97706]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchQuery.trim()) {
                  const teaQuery = /\b(tea|purple|chai|tangawizi|kericho|herbal|oolong|matcha)\b/i.test(searchQuery);
                  handleNavClick(teaQuery ? 'tea' : 'coffee');
                }
              }}
              aria-label="Search coffee and tea products"
              placeholder="Search AA Arabica, Purple Tea, Peaberry, Nyeri, Kericho, Roast level..."
              className="w-full bg-[#2D241E] border border-[#E5E1DA]/30 rounded-lg px-3 py-1.5 text-xs text-[#FAF7F2] placeholder-[#D4C3A3]/50 focus:outline-none focus:border-[#D4C3A3]"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-[#D97706] hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="space-y-2 border-b border-[#E5E1DA]/20 bg-[#2D241E] px-4 py-4 text-sm shadow-2xl lg:hidden">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              aria-current={currentPage === item.id ? 'page' : undefined}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-colors text-left ${
                currentPage === item.id
                  ? 'bg-[#5D6D3C] text-white'
                  : 'text-[#D4C3A3] hover:bg-white/5'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
};
