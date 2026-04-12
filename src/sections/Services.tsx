import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Store, Package, Truck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      icon: Store,
      title: 'In-Store Shopping',
      description:
        'Visit our boutique for a personal consultation and complimentary samples. Experience our fragrances in an elegant setting.',
    },
    {
      icon: Package,
      title: 'In-Store Pickup',
      description:
        'Order online and collect at your convenience—no waiting, no hassle. We\'ll have your order ready within hours.',
    },
    {
      icon: Truck,
      title: 'Delivery',
      description:
        'Fast, insured shipping across Nigeria with elegant packaging. Every order arrives like a precious gift.',
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current;

    if (!section || !heading || !cards) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        heading,
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards animation
      gsap.fromTo(
        cards.children,
        { x: '6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
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
      id="services"
      className="relative bg-ivory py-24 lg:py-32 z-30"
    >
      {/* Top Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-dark/10" />

      <div className="px-6 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left - Heading */}
          <div ref={headingRef} className="lg:sticky lg:top-32 lg:self-start">
            <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl text-dark mb-6">
              Service,<br />Simplified
            </h2>
            <p className="text-dark/70 font-body text-base lg:text-lg max-w-md">
              We&apos;ve designed every step to feel as refined as the fragrance you choose.
            </p>
            
            {/* Trust Badge */}
            <div className="mt-10 inline-flex items-center gap-3 px-5 py-3 bg-gold/10 rounded-sm">
              <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center">
                <span className="text-dark font-display text-lg">2+</span>
              </div>
              <div>
                <p className="text-dark font-medium text-sm">Years of Excellence</p>
                <p className="text-dark/60 text-xs">Trusted by thousands</p>
              </div>
            </div>
          </div>

          {/* Right - Service Cards */}
          <div ref={cardsRef} className="space-y-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="p-6 lg:p-8 bg-white border border-dark/10 rounded-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-gold/10 rounded-sm flex items-center justify-center flex-shrink-0">
                    <service.icon className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl text-dark mb-2">
                      {service.title}
                    </h3>
                    <p className="text-dark/70 font-body text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
