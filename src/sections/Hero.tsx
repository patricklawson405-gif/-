import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const rightElementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const headline = headlineRef.current;
    const paragraph = paragraphRef.current;
    const cta = ctaRef.current;
    const rightElements = rightElementsRef.current;

    if (!section || !bg || !headline || !paragraph || !cta || !rightElements) return;

    const ctx = gsap.context(() => {
      // Initial load animation
      const loadTl = gsap.timeline();

      loadTl
        .fromTo(
          bg,
          { opacity: 0, scale: 1.08 },
          { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' }
        )
        .fromTo(
          headline.children,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: 'power3.out' },
          '-=0.6'
        )
        .fromTo(
          [paragraph, cta],
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          rightElements.children,
          { x: 30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out' },
          '-=0.5'
        );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // EXIT phase (70% - 100%)
      scrollTl
        .fromTo(
          headline,
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          [paragraph, cta],
          { y: 0, opacity: 1 },
          { y: '10vh', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          rightElements,
          { x: 0, opacity: 1 },
          { x: '8vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          bg,
          { scale: 1 },
          { scale: 1.06, ease: 'none' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToCollection = () => {
    document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-screen overflow-hidden z-10"
    >
      {/* Background Image */}
      <img
        ref={bgRef}
        src="/images/hero_portrait.jpg"
        alt="Luxury Perfume"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-dark/80 via-dark/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between px-6 lg:px-16 py-24">
        {/* Top Section - Headline */}
        <div ref={headlineRef} className="pt-16 lg:pt-20 max-w-2xl">
          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gold/20 rounded-sm">
              <Star className="w-4 h-4 fill-gold text-gold" />
              <span className="text-gold text-sm font-medium">4.9 Rating</span>
            </div>
            <span className="text-ivory/60 text-sm">Trusted for 2+ years</span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-ivory leading-[0.95] tracking-tight">
            <span className="block">EXPERIENCE</span>
            <span className="block">LUXURY IN</span>
            <span className="block text-gold">EVERY SCENT</span>
          </h1>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          {/* Left - Paragraph & CTA */}
          <div className="max-w-md">
            <p
              ref={paragraphRef}
              className="text-ivory/70 font-body text-base lg:text-lg leading-relaxed mb-6"
            >
              Curated fragrances, timeless craftsmanship, delivered with care.
              Discover scents that define your essence.
            </p>
            <button
              ref={ctaRef}
              onClick={scrollToCollection}
              className="px-8 py-4 bg-gold text-dark font-body text-sm tracking-widest uppercase hover:bg-gold-light transition-all duration-300 hover:-translate-y-0.5 rounded-sm"
            >
              Shop the Collection
            </button>
          </div>

          {/* Right - Scroll Hint & Tagline */}
          <div ref={rightElementsRef} className="flex flex-col items-end gap-6">
            <div className="flex items-center gap-2 text-ivory/50">
              <span className="text-xs tracking-widest uppercase">Scroll to explore</span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </div>

            <div className="flex items-end gap-4">
              <div className="w-px h-24 bg-gradient-to-b from-gold/50 to-transparent" />
              <span className="font-display text-lg text-ivory/80 italic pb-2">
                Elegance in every drop
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
