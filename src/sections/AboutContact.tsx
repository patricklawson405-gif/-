import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Clock, Send, Instagram } from 'lucide-react';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

const AboutContact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const right = rightRef.current;

    if (!section || !left || !right) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        left,
        { x: '-4vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        right,
        { x: '4vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-dark py-24 lg:py-32 z-50"
    >
      <div className="px-6 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left - About & Contact Info */}
          <div ref={leftRef}>
            <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl text-ivory mb-6">
              About 𝕸𝖎𝖗𝖆𝖈𝖑𝖊<br />𝕾𝖎𝖌𝖓𝖆𝖙𝖚𝖗𝖊 𝕾𝖈𝖊𝖓𝖙𝖘✍
            </h2>
            
            <p className="text-ivory/70 font-body text-base lg:text-lg leading-relaxed mb-10 max-w-lg">
              We are a fragrance boutique based in Aba, Abia State, offering curated scents, 
              personal service, and a promise of quality. Every bottle in our collection is 
              carefully selected to ensure authenticity and excellence.
            </p>

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold/10 rounded-sm flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h4 className="text-ivory font-medium mb-1">Location</h4>
                  <p className="text-ivory/60 text-sm">Aba, Abia State, Nigeria</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold/10 rounded-sm flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h4 className="text-ivory font-medium mb-1">Phone</h4>
                  <a 
                    href="tel:08086352289" 
                    className="text-ivory/60 text-sm hover:text-gold transition-colors"
                  >
                    0808 635 2289
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold/10 rounded-sm flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h4 className="text-ivory font-medium mb-1">Business Hours</h4>
                  <p className="text-ivory/60 text-sm">Mon – Sat: 9am – 7pm</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold/10 rounded-sm flex items-center justify-center flex-shrink-0">
                  <Instagram className="w-5 h-5 text-gold" />
                </div>
               
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/2348086352289"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 mt-10 px-6 py-4 bg-green-600 text-white font-body text-sm tracking-widest uppercase hover:bg-green-700 transition-colors rounded-sm"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </div>

          {/* Right - Contact Form */}
          <div ref={rightRef}>
            <div className="bg-dark-secondary p-8 lg:p-10 rounded-sm border border-ivory/5">
              <h3 className="font-display text-2xl text-ivory mb-6">
                Send Us a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-ivory/60 text-sm mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-dark-tertiary border border-ivory/10 text-ivory placeholder-ivory/30 focus:border-gold focus:outline-none transition-colors rounded-sm"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-ivory/60 text-sm mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-dark-tertiary border border-ivory/10 text-ivory placeholder-ivory/30 focus:border-gold focus:outline-none transition-colors rounded-sm"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-ivory/60 text-sm mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-dark-tertiary border border-ivory/10 text-ivory placeholder-ivory/30 focus:border-gold focus:outline-none transition-colors rounded-sm"
                    placeholder="Your phone number"
                  />
                </div>

                <div>
                  <label className="block text-ivory/60 text-sm mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-dark-tertiary border border-ivory/10 text-ivory placeholder-ivory/30 focus:border-gold focus:outline-none transition-colors resize-none rounded-sm"
                    placeholder="How can we help you?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gold text-dark font-body text-sm tracking-widest uppercase hover:bg-gold-light transition-colors flex items-center justify-center gap-2 rounded-sm"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutContact;
