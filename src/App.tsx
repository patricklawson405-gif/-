import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Toaster } from '@/components/ui/sonner';

import Navigation from '@/components/Navigation';
import CartDrawer from '@/components/CartDrawer';
import Hero from '@/sections/Hero';
import StatementSection from '@/sections/StatementSection';
import Collection from '@/sections/Collection';
import Services from '@/sections/Services';
import Testimonials from '@/sections/Testimonials';
import AboutContact from '@/sections/AboutContact';
import Footer from '@/sections/Footer';
import AdminDashboard from '@/pages/AdminDashboard';

import { useCart } from '@/hooks/useCart';
import { products } from '@/data/products';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const { cart, isOpen, setIsOpen, addToCart, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();

  // Global scroll snap for pinned sections
  useEffect(() => {
    // Wait for all ScrollTriggers to be created
    const timeout = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map((st) => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (with small buffer)
            const inPinned = pinnedRanges.some(
              (r) => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            
            if (!inPinned) return value; // Flowing section: free scroll

            // Find nearest pinned center
            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );
            
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  // Cleanup ScrollTriggers on unmount
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  // Keyboard shortcut for admin (Ctrl + Shift + A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        setIsAdmin(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (isAdmin) {
    return (
      <>
        <AdminDashboard onBack={() => setIsAdmin(false)} />
        <Toaster position="top-center" richColors />
      </>
    );
  }

  return (
    <div className="relative">
      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* Navigation */}
      <Navigation cartCount={totalItems} onCartClick={() => setIsOpen(true)} />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        totalPrice={totalPrice}
      />

      {/* Main Content */}
      <main className="relative">
        {/* Section 1: Hero - z-10 */}
        <Hero />

        {/* Section 2: Elegant - z-20 */}
        <StatementSection
          id="elegant"
          word="ELEGANT"
          description="A silhouette of confidence. A fragrance that lingers like a quiet promise."
          backgroundImage="/images/elegant_portrait.jpg"
          zIndex={20}
          onAddToCart={addToCart}
        />

        {/* Section 3: Luxury - z-30 */}
        <StatementSection
          id="luxury"
          word="LUXURY"
          description="Rare ingredients, masterfully blended for those who expect the exceptional."
          backgroundImage="/images/luxury_portrait.jpg"
          product={products[0]}
          productPosition="left"
          zIndex={30}
          onAddToCart={addToCart}
        />

        {/* Section 4: Unique - z-40 */}
        <StatementSection
          id="unique"
          word="UNIQUE"
          description="A composition unlike any other—crafted for the moments that define you."
          backgroundImage="/images/unique_portrait.jpg"
          product={products[1]}
          productPosition="right"
          zIndex={40}
          onAddToCart={addToCart}
        />

        {/* Section 5: Exceptional - z-50 */}
        <StatementSection
          id="exceptional"
          word="EXCEPTIONAL"
          description="Small batches. Impeccable finish. A fragrance house that treats every bottle as a masterpiece."
          backgroundImage="/images/exceptional_portrait.jpg"
          product={products[2]}
          productPosition="left"
          zIndex={50}
          onAddToCart={addToCart}
        />

        {/* Section 6: Collection - Flowing */}
        <Collection onAddToCart={addToCart} />

        {/* Section 7: Services - Flowing */}
        <Services />

        {/* Section 8: Testimonials - Flowing */}
        <Testimonials />

        {/* Section 9: About/Contact - Flowing */}
        <AboutContact />

        {/* Section 10: Footer - Flowing */}
        <Footer />
      </main>

      {/* Toast Notifications */}
      <Toaster position="top-center" richColors />

      {/* Admin Access Hint (subtle) */}
      <div className="fixed bottom-4 right-4 z-50 opacity-0 hover:opacity-30 transition-opacity">
        <button
          onClick={() => setIsAdmin(true)}
          className="text-ivory/30 text-xs"
        >
          Admin
        </button>
      </div>
    </div>
  );
}

export default App;
