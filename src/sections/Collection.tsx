import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Product } from '@/types';
import { products as initialProducts, formatPrice } from '@/data/products';
import { ShoppingBag } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CollectionProps {
  products?: Product[];
  onAddToCart: (product: Product) => void;
}

const Collection = ({ products = initialProducts, onAddToCart }: CollectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  
  const [activeFilter, setActiveFilter] = useState<'all' | 'men' | 'women' | 'unisex'>('all');

  const filteredProducts = activeFilter === 'all' 
    ? products 
    : products.filter(p => p.category === activeFilter);

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'men', label: 'Men' },
    { key: 'women', label: 'Women' },
    { key: 'unisex', label: 'Unisex' },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const filtersEl = filtersRef.current;
    const grid = gridRef.current;

    if (!section || !heading || !filtersEl || !grid) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        heading,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Filters animation
      gsap.fromTo(
        Array.from(filtersEl.children),
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: filtersEl,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Grid cards animation
      const cards = grid.querySelectorAll('.product-card');
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="collection"
      className="relative bg-dark py-24 lg:py-32 z-20"
    >
      <div className="px-6 lg:px-16">
        {/* Heading */}
        <div ref={headingRef} className="mb-10">
          <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl text-ivory mb-4">
            Curated Collection
          </h2>
          <p className="text-ivory/60 font-body text-base lg:text-lg max-w-xl">
            Explore our full range of eaux de parfum, extraits, and discovery sets.
          </p>
        </div>

        {/* Filters */}
        <div ref={filtersRef} className="flex flex-wrap gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key as any)}
              className={`px-5 py-2.5 font-body text-xs tracking-widest uppercase border transition-all duration-300 rounded-sm ${
                activeFilter === filter.key
                  ? 'bg-gold text-dark border-gold'
                  : 'bg-transparent text-ivory/70 border-ivory/20 hover:border-gold/50 hover:text-ivory'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="product-card group bg-dark-secondary rounded-sm overflow-hidden hover:-translate-y-1.5 transition-transform duration-300 shadow-card"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-display text-xl text-ivory group-hover:text-gold transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-ivory/50 text-sm">{product.size}</p>
                  </div>
                </div>
                
                <p className="text-ivory/60 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-gold font-medium text-lg">
                    {formatPrice(product.price)}
                  </span>
                  <button
                    onClick={() => onAddToCart(product)}
                    className="p-2.5 bg-gold/10 text-gold hover:bg-gold hover:text-dark transition-all duration-300 rounded-sm"
                    aria-label={`Add ${product.name} to cart`}
                  >
                    <ShoppingBag className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collection;
