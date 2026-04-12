import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Product } from '@/types';
import { formatPrice } from '@/data/products';
import { ShoppingBag } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface StatementSectionProps {
  id: string;
  word: string;
  description: string;
  backgroundImage: string;
  product?: Product;
  productPosition?: 'left' | 'right';
  zIndex: number;
  onAddToCart: (product: Product) => void;
}

const StatementSection = ({
  id,
  word,
  description,
  backgroundImage,
  product,
  productPosition = 'left',
  zIndex,
  onAddToCart,
}: StatementSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const productRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const label = labelRef.current;
    const wordEl = wordRef.current;
    const desc = descRef.current;
    const productCard = productRef.current;

    if (!section || !bg || !label || !wordEl || !desc) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0% - 30%)
      scrollTl
        .fromTo(bg, { scale: 1.08, opacity: 0.85 }, { scale: 1, opacity: 1, ease: 'none' }, 0)
        .fromTo(label, { x: '-12vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0)
        .fromTo(desc, { x: productPosition === 'left' ? '10vw' : '-10vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0.05)
        .fromTo(wordEl, { y: '18vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.08);

      if (productCard) {
        scrollTl.fromTo(
          productCard,
          { x: productPosition === 'left' ? '-18vw' : '18vw', opacity: 0, scale: 0.96 },
          { x: 0, opacity: 1, scale: 1, ease: 'none' },
          0.12
        );
      }

      // SETTLE (30% - 70%) - Hold positions

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(bg, { scale: 1, opacity: 1 }, { scale: 1.05, opacity: 0.35, ease: 'power2.in' }, 0.7)
        .fromTo(label, { x: 0, opacity: 1 }, { x: '-6vw', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(desc, { x: 0, opacity: 1 }, { x: productPosition === 'left' ? '6vw' : '-6vw', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(wordEl, { y: 0, opacity: 1 }, { y: '14vh', opacity: 0, ease: 'power2.in' }, 0.7);

      if (productCard) {
        scrollTl.fromTo(
          productCard,
          { x: 0, opacity: 1 },
          { x: productPosition === 'left' ? '-10vw' : '10vw', opacity: 0, ease: 'power2.in' },
          0.7
        );
      }
    }, section);

    return () => ctx.revert();
  }, [productPosition]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative w-full h-screen overflow-hidden"
      style={{ zIndex }}
    >
      {/* Background Image */}
      <img
        ref={bgRef}
        src={backgroundImage}
        alt={word}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: 'center 35%' }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-dark/50" />

      {/* Content */}
      <div className="relative z-10 h-full">
        {/* Left Edge Vertical Label */}
        <div
          ref={labelRef}
          className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 origin-center"
        >
          <span className="vertical-text font-body text-xs tracking-[0.3em] text-ivory/60 uppercase">
            𝕸𝖎𝖗𝖆𝖈𝖑𝖊 𝕾𝖎𝖌𝖓𝖆𝖙𝖚𝖗𝖊 𝕾𝖈𝖊𝖓𝖙𝖘✍
          </span>
        </div>

        {/* Description - Top Right or Top Left */}
        <p
          ref={descRef}
          className={`absolute top-20 lg:top-24 ${
            productPosition === 'left' ? 'right-6 lg:right-16' : 'left-6 lg:left-24'
          } max-w-sm text-ivory/80 font-body text-sm lg:text-base leading-relaxed text-right ${
            productPosition === 'left' ? '' : 'text-left'
          }`}
        >
          {description}
        </p>

        {/* Product Card */}
        {product && (
          <div
            ref={productRef}
            className={`absolute top-20 lg:top-24 ${
              productPosition === 'left' ? 'left-6 lg:left-24' : 'right-6 lg:right-16'
            } w-64 lg:w-72 bg-dark/80 backdrop-blur-sm border border-ivory/10 p-4 rounded-sm`}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-sm mb-4"
            />
            <h4 className="font-display text-lg text-ivory">{product.name}</h4>
            <p className="text-gold font-medium mt-1">{formatPrice(product.price)}</p>
            <button
              onClick={() => onAddToCart(product)}
              className="w-full mt-4 py-3 bg-gold text-dark font-body text-xs tracking-widest uppercase hover:bg-gold-light transition-colors flex items-center justify-center gap-2 rounded-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Cart
            </button>
          </div>
        )}

        {/* Large Word - Bottom */}
        <h2
          ref={wordRef}
          className={`absolute bottom-8 lg:bottom-12 ${
            productPosition === 'left' ? 'right-6 lg:right-16 text-right' : 'left-6 lg:left-24 text-left'
          } font-display text-6xl sm:text-7xl lg:text-8xl xl:text-9xl text-ivory tracking-tight`}
        >
          {word}
        </h2>
      </div>
    </section>
  );
};

export default StatementSection;
