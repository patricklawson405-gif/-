import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { reviews } from '@/data/products';
import { Star, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current;

    if (!section || !heading || !cards) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        heading,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards animation
      gsap.fromTo(
        cards.children,
        { y: 50, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cards,
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
      id="testimonials"
      className="relative bg-dark py-24 lg:py-32 z-40"
    >
      <div className="px-6 lg:px-16">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl text-ivory mb-4">
            What Our Clients Say
          </h2>
          <p className="text-ivory/60 font-body text-base lg:text-lg max-w-xl mx-auto">
            Real experiences from our valued customers
          </p>
        </div>

        {/* Testimonial Cards */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-dark-secondary p-6 lg:p-8 rounded-sm border border-ivory/5 hover:border-gold/30 transition-colors duration-300"
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-gold/30 mb-4" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-ivory/80 font-body text-sm leading-relaxed mb-6">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
                  <span className="text-gold font-display text-sm">
                    {review.name.charAt(0)}
                  </span>
                </div>
                <span className="text-ivory font-medium text-sm">
                  {review.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Rating Summary */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6">
          <div className="flex items-center gap-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-gold text-gold" />
              ))}
            </div>
            <span className="font-display text-3xl text-ivory">4.9</span>
          </div>
          <div className="h-8 w-px bg-ivory/20 hidden sm:block" />
          <p className="text-ivory/60 text-sm">
            Based on 200+ verified reviews
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
