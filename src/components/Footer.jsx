import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { FaInstagram, FaFacebookF, FaXTwitter, FaYoutube } from 'react-icons/fa6'

const socialLinks = [
  { icon: FaInstagram, href: '#', label: 'Instagram' },
  { icon: FaFacebookF, href: '#', label: 'Facebook' },
  { icon: FaXTwitter, href: '#', label: 'Twitter' },
  { icon: FaYoutube, href: '#', label: 'YouTube' },
]

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About Us', href: '#about' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Book Now', href: '#contact' },
]

const serviceLinks = [
  'Precision Haircuts',
  'Hair Coloring',
  'Luxury Blowout',
  'Skin & Facial',
  'Bridal Styling',
  "Men's Grooming",
]

export default function Footer() {
  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Gold divider */}
      <div className="h-px w-full"
        style={{ background: 'linear-gradient(90deg, transparent 0%, #D4AF37 30%, #E8D8C3 50%, #D4AF37 70%, transparent 100%)' }} />

      {/* Radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(212,175,55,0.06) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16 pt-16 pb-10 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <div className="font-['Cormorant_Garamond'] text-3xl font-semibold tracking-widest text-white">TOUCH</div>
              <div className="text-[10px] font-semibold tracking-[0.5em] uppercase gold-text -mt-1">&amp; GLOW</div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Where luxury meets artistry. A premium unisex salon crafting 
              extraordinary beauty experiences since 2014.
            </p>

            {/* Social icons */}
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-gold hover:border-gold/50 transition-all duration-300"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-bold tracking-widest uppercase mb-5" style={{ color: '#D4AF37' }}>
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <button
                    onClick={() => scrollTo(href)}
                    className="text-white/50 hover:text-white text-sm transition-colors duration-300 text-left group flex items-center gap-2"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-gold transition-all duration-300 inline-block" />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-bold tracking-widest uppercase mb-5" style={{ color: '#D4AF37' }}>
              Services
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <button
                    onClick={() => scrollTo('#services')}
                    className="text-white/50 hover:text-white text-sm transition-colors duration-300 text-left group flex items-center gap-2"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-gold transition-all duration-300 inline-block" />
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-sm font-bold tracking-widest uppercase mb-5" style={{ color: '#D4AF37' }}>
              Visit Us
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3 text-white/50 text-sm">
                <MapPin size={16} className="mt-0.5 shrink-0 text-gold/70" />
                <span>12 Luxury Lane, Bandra West,<br />Mumbai, Maharashtra 400050</span>
              </li>
              <li className="flex gap-3 text-white/50 text-sm">
                <Phone size={16} className="mt-0.5 shrink-0 text-gold/70" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">+91 98765 43210</a>
              </li>
              <li className="flex gap-3 text-white/50 text-sm">
                <Mail size={16} className="mt-0.5 shrink-0 text-gold/70" />
                <a href="mailto:udaythanki2@gmail.com" className="hover:text-white transition-colors">udaythanki2@gmail.com</a>
              </li>
              <li className="flex gap-3 text-white/50 text-sm">
                <Clock size={16} className="mt-0.5 shrink-0 text-gold/70" />
                <span>Mon – Sun: 9:00 AM – 9:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Touch &amp; Glow. All rights reserved.
          </p>
          <p className="text-white/20 text-xs">
            Crafted with{' '}
            <span className="text-gold/60">♥</span>{' '}
            for luxury experiences
          </p>
        </div>
      </div>
    </footer>
  )
}
