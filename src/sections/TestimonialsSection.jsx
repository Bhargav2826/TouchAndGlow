import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Fashion Blogger',
    rating: 5,
    text: 'Absolutely blown away by my balayage! The team at Touch & Glow understood my vision perfectly. The salon itself feels like a 5-star experience from the moment you walk in.',
    initials: 'PS',
  },
  {
    name: 'Rahul Mehta',
    role: 'Corporate Executive',
    rating: 5,
    text: "Best haircut I've ever had. The attention to detail and the overall atmosphere is just unmatched. I won't go anywhere else now. Worth every rupee!",
    initials: 'RM',
  },
  {
    name: 'Ananya Kapoor',
    role: 'Bride',
    rating: 5,
    text: 'They made my wedding look absolutely perfect. The bridal team was professional, patient, and incredibly talented. Every guest was complimenting my hair all night!',
    initials: 'AK',
  },
  {
    name: 'Vikram Nair',
    role: 'Entrepreneur',
    rating: 5,
    text: "The men's grooming experience is next level. From the consultation to the finish, everything is premium. The beard sculpting alone is worth the visit!",
    initials: 'VN',
  },
  {
    name: 'Sneha Reddy',
    role: 'Dermatologist',
    rating: 5,
    text: 'As a skin professional, I am very particular about facial treatments. Touch & Glow uses top-quality products and the technique is flawless. Highly recommended!',
    initials: 'SR',
  },
  {
    name: 'Arjun Patel',
    role: 'Photographer',
    rating: 5,
    text: 'I came in for a basic trim and left with a complete style transformation. The stylists here are true artists. The ambiance is beautiful and relaxing too.',
    initials: 'AP',
  },
]

function StarRating({ rating }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          fill={i < rating ? '#D4AF37' : 'transparent'}
          color={i < rating ? '#D4AF37' : '#555'}
        />
      ))}
    </div>
  )
}

function TestimonialCard({ testimonial }) {
  return (
    <div
      className="group relative shrink-0 w-[260px] sm:w-80 rounded-3xl p-7 mx-3 cursor-default"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* Quote icon */}
      <Quote size={32} className="text-gold/20 mb-3" fill="rgba(212,175,55,0.1)" />

      <p className="text-white/70 text-sm leading-relaxed mb-6">
        "{testimonial.text}"
      </p>

      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="w-11 h-11 rounded-full flex items-center justify-center text-black font-bold text-sm shrink-0"
          style={{ background: 'linear-gradient(135deg, #D4AF37, #E8C84A)' }}>
          {testimonial.initials}
        </div>
        <div>
          <div className="text-white font-semibold text-sm">{testimonial.name}</div>
          <div className="text-white/40 text-xs">{testimonial.role}</div>
        </div>
        <div className="ml-auto">
          <StarRating rating={testimonial.rating} />
        </div>
      </div>

      {/* Hover accent */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'linear-gradient(90deg, #D4AF37, #E8D8C3, #D4AF37)' }} />
    </div>
  )
}

export default function TestimonialsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  // Duplicate for infinite scroll effect
  const doubled = [...testimonials, ...testimonials]

  return (
    <section id="testimonials" className="section-padding bg-[#080808] relative overflow-hidden">
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(212,175,55,0.04) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="label-text block mb-3">Client Love</span>
          <div className="section-divider mx-auto mb-5" />
          <h2 className="heading-lg text-white mb-4">
            What Our{' '}
            <span className="font-['Cormorant_Garamond'] italic font-normal gold-text">
              Clients Say
            </span>
          </h2>
          <p className="text-white/50 max-w-lg mx-auto leading-relaxed">
            Don't just take our word for it — hear from the hundreds of 
            clients whose lives we've touched.
          </p>

          {/* Aggregate rating */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <StarRating rating={5} />
            <span className="text-white font-bold text-lg">5.0</span>
            <span className="text-white/40 text-sm">· 500+ reviews</span>
          </div>
        </motion.div>

        {/* Auto-scrolling ribbon */}
        <div className="relative overflow-hidden" style={{ maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)' }}>
          <div className="flex auto-scroll">
            {doubled.map((t, i) => (
              <TestimonialCard key={i} testimonial={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
