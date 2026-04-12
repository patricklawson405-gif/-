import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        footer,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Collection', id: 'collection' },
    { label: 'Services', id: 'services' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'about' },
  ];

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="relative bg-dark border-t border-ivory/10 z-50"
    >
      <div className="px-6 lg:px-16 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-2xl text-ivory mb-4">
             𝕸𝖎𝖗𝖆𝖈𝖑𝖊 𝕾𝖎𝖌𝖓𝖆𝖙𝖚𝖗𝖊 𝕾𝖈𝖊𝖓𝖙𝖘✍
            </h3>
            <p className="text-ivory/60 font-body text-sm leading-relaxed max-w-md mb-6">
              Scent is the voice of memory. We curate the finest fragrances to help you 
              create unforgettable moments.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              <a
                
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-ivory/5 rounded-sm flex items-center justify-center text-ivory/60 hover:bg-gold hover:text-dark transition-all"
              >
                
              </a>
              <a
                href="https://wa.me/2348086352289"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-ivory/5 rounded-sm flex items-center justify-center text-ivory/60 hover:bg-green-600 hover:text-white transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-body text-xs tracking-widest uppercase text-ivory/40 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-ivory/70 hover:text-gold transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-body text-xs tracking-widest uppercase text-ivory/40 mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <span className="text-ivory/70 text-sm">Aba, Abia State</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <a 
                  href="tel:08086352289"
                  className="text-ivory/70 hover:text-gold transition-colors text-sm"
                >
                  0808 635 2289
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-ivory/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-ivory/40 text-xs">
            © 2026 𝕸𝖎𝖗𝖆𝖈𝖑𝖊 𝕾𝖎𝖌𝖓𝖆𝖙𝖚𝖗𝖊 𝕾𝖈𝖊𝖓𝖙𝖘✍. All rights reserved.
          </p>
          <div className="flex gap-6">
            <button className="text-ivory/40 hover:text-ivory/70 transition-colors text-xs">
              Privacy Policy
            </button>
            <button className="text-ivory/40 hover:text-ivory/70 transition-colors text-xs">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
