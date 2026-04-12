import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Star } from 'lucide-react';

interface NavigationProps {
  cartCount: number;
  onCartClick: () => void;
}

const Navigation = ({ cartCount, onCartClick }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLightSection, setIsLightSection] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      
      // Check if we're in the light section (Services)
      const servicesSection = document.getElementById('services');
      if (servicesSection) {
        const rect = servicesSection.getBoundingClientRect();
        setIsLightSection(rect.top < 100 && rect.bottom > 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'Collection', id: 'collection' },
    { label: 'Services', id: 'services' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' },
  ];

  const textColor = isLightSection ? 'text-dark' : 'text-ivory';
  const bgColor = isScrolled 
    ? 'bg-dark/90 backdrop-blur-md' 
    : 'bg-transparent';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${bgColor}`}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button
              onClick={() => scrollToSection('hero')}
              className={`font-display text-lg md:text-xl tracking-wider ${textColor} hover:text-gold transition-colors`}
            >
              𝕸𝖎𝖗𝖆𝖈𝖑𝖊 𝕾𝖎𝖌𝖓𝖆𝖙𝖚𝖗𝖊 𝕾𝖈𝖊𝖓𝖙𝖘✍
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`font-body text-xs tracking-widest uppercase ${textColor} hover:text-gold transition-colors relative group`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              {/* Rating Badge */}
              <div className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-sm ${isScrolled ? 'bg-gold/10' : 'bg-ivory/10'}`}>
                <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                <span className={`text-xs font-medium ${textColor}`}>4.9</span>
              </div>

              {/* Cart Button */}
              <button
                onClick={onCartClick}
                className={`relative p-2 ${textColor} hover:text-gold transition-colors`}
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-dark text-xs font-medium rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`md:hidden p-2 ${textColor}`}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-dark transition-transform duration-500 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="font-display text-3xl text-ivory hover:text-gold transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              scrollToSection('collection');
              setIsMobileMenuOpen(false);
            }}
            className="mt-8 px-8 py-3 bg-gold text-dark font-body text-sm tracking-widest uppercase hover:bg-gold-light transition-colors"
          >
            Shop Now
          </button>
        </div>
      </div>
    </>
  );
};

export default Navigation;
