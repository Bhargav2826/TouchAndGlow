import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import gallery3 from '../assets/gallery_3.png'

const highlights = [
  'Over a decade of luxury salon experience',
  'Trained at international academies in Paris & Milan',
  'Using only premium, cruelty-free products',
  'Personalized consultation for every client',
  'Award-winning team of 25+ expert stylists',
  'Dedicated to sustainability & wellness',
]

export default function AboutSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="section-padding bg-[#0a0a0a] relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)' }} />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Image column */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden">
              <img
                src={gallery3}
                alt="Touch & Glow salon team at work"
                className="w-full aspect-[4/5] md:h-[550px] object-cover object-center"
                loading="lazy"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
            </div>

            {/* Floating experience badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute -bottom-6 -right-6 md:right-8 w-36 h-36 rounded-2xl flex flex-col items-center justify-center glass-dark border border-gold/30"
            >
              <span className="text-4xl font-bold gold-text">10+</span>
              <span className="text-white/60 text-xs text-center mt-1 tracking-wide leading-tight">
                Years of<br/>Excellence
              </span>
            </motion.div>

            {/* Gold line decoration */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 rounded-tl-2xl"
              style={{ borderColor: '#D4AF37' }} />
          </motion.div>

          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
          >
            <span className="label-text block mb-3">Our Story</span>
            <div className="section-divider mb-6" />
            <h2 className="heading-lg text-white mb-6">
              Where Art Meets{' '}
              <span className="font-['Cormorant_Garamond'] italic font-normal gold-text">
                Passion
              </span>
            </h2>

            <p className="text-white/60 leading-relaxed mb-4">
              Founded in the heart of Bangalore's luxury beauty scene, Touch &amp; Glow was born 
              from a simple belief: every person deserves to feel extraordinary. We are not just 
              a salon — we are a sanctuary where transformation begins.
            </p>
            <p className="text-white/50 leading-relaxed mb-8">
              Our team of internationally trained stylists, colorists, and beauty experts 
              work in harmony to create bespoke looks that celebrate your individuality. 
              Premium products, flawless technique, and genuine care — that's the Touch &amp; Glow promise.
            </p>

            {/* Highlights */}
            <ul className="space-y-3 mb-10">
              {highlights.map((point, i) => (
                <motion.li
                  key={point}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.08, duration: 0.5 }}
                  className="flex items-start gap-3 text-white/70 text-sm"
                >
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: '#D4AF37' }} />
                  {point}
                </motion.li>
              ))}
            </ul>

            <motion.button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-gold"
              whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(212,175,55,0.5)' }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="relative z-10">Experience Touch &amp; Glow</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
