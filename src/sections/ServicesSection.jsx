import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Scissors, Sparkles, Droplets, Star, Wind, Brush
} from 'lucide-react'

const services = [
  {
    icon: Scissors,
    title: 'Precision Haircuts',
    description: 'Master-crafted cuts tailored to your face shape and lifestyle. From bold transformations to classic refinements.',
    price: 'From ₹800',
    tag: 'Most Popular',
  },
  {
    icon: Sparkles,
    title: 'Hair Coloring',
    description: 'Balayage, highlights, ombré — our color artists bring your vision to life with premium international products.',
    price: 'From ₹2,500',
    tag: 'Trending',
  },
  {
    icon: Wind,
    title: 'Luxury Blowout',
    description: 'Silk-smooth blowouts and professional styling that last. Perfect for events, shoots, or just treating yourself.',
    price: 'From ₹1,200',
    tag: null,
  },
  {
    icon: Droplets,
    title: 'Skin & Facial',
    description: 'Advanced skincare treatments using clinical-grade products to reveal your most radiant, glowing complexion.',
    price: 'From ₹1,800',
    tag: 'Luxe',
  },
  {
    icon: Brush,
    title: 'Bridal & Events',
    description: 'Bespoke bridal hair and makeup that captures your essence. We make your most important moments unforgettable.',
    price: 'From ₹8,000',
    tag: null,
  },
  {
    icon: Star,
    title: 'Men\'s Grooming',
    description: 'Tailored haircuts, beard sculpting, and premium grooming rituals designed for the modern gentleman.',
    price: 'From ₹600',
    tag: null,
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

function ServiceCard({ service, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const Icon = service.icon

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      custom={index}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative rounded-3xl p-7 cursor-default overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.85)',
        border: '1px solid rgba(212,175,55,0.15)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
      }}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'radial-gradient(circle at top left, rgba(212,175,55,0.08) 0%, transparent 70%)' }}
      />

      {/* Tag */}
      {service.tag && (
        <span className="absolute top-5 right-5 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full"
          style={{ background: 'linear-gradient(135deg,#D4AF37,#E8C84A)', color: '#000' }}>
          {service.tag}
        </span>
      )}

      {/* Icon */}
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
        style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(232,216,195,0.15))' }}>
        <Icon size={24} style={{ color: '#D4AF37' }} />
      </div>

      <h3 className="text-lg font-bold text-charcoal mb-2">{service.title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed mb-5">{service.description}</p>

      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold gold-text">{service.price}</span>
        <span className="text-xs text-gray-400 group-hover:text-gold transition-colors duration-300 font-medium">
          Learn more →
        </span>
      </div>

      {/* Bottom border accent */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'linear-gradient(90deg, #D4AF37, #E8D8C3, #D4AF37)' }} />
    </motion.div>
  )
}

export default function ServicesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="services" className="section-padding bg-[#F9F6F0] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />

      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="label-text block mb-3">What We Offer</span>
          <div className="section-divider mx-auto mb-5" />
          <h2 className="heading-lg text-charcoal mb-4">
            Our{' '}
            <span className="font-['Cormorant_Garamond'] italic font-normal gold-text">
              Signature
            </span>{' '}
            Services
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
            Each service is a carefully curated experience — blending artistry, 
            technique, and the finest products for results that speak for themselves.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-14"
        >
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-gold"
          >
            <span className="relative z-10">Book Your Service</span>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
