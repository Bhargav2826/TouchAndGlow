import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowRight, Play, Star, Award, Users, Heart } from 'lucide-react'
import { useMediaQuery } from '../hooks/useMediaQuery'
import HeroSkeleton from '../components/HeroSkeleton'
import heroImg from '../assets/hero_salon.png'

// --- Components ---

const CountUp = ({ end, duration = 2 }) => {
  const [count, setCount] = useState(0)
  const countRef = useRef(0)

  useEffect(() => {
    let startTime
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      const currentCount = Math.floor(progress * end)
      
      if (currentCount !== countRef.current) {
        setCount(currentCount)
        countRef.current = currentCount
      }

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [end, duration])

  return <>{count.toLocaleString()}</>
}

const StatCard = ({ icon: Icon, value, label, suffix = "+", index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
    className="glass-premium flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl sm:rounded-3xl hover:bg-white/10 transition-colors duration-500 overflow-hidden md:backdrop-blur-[25px] backdrop-blur-none bg-white/5 border border-white/10"
  >
    <div className="mb-2 sm:mb-3 p-2 rounded-xl bg-gold/10">
      <Icon size={20} className="text-gold sm:w-6 sm:h-6" />
    </div>
    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white flex items-baseline gap-0.5">
      <CountUp end={parseInt(value)} />
      <span className="text-gold tracking-tighter">{suffix}</span>
    </div>
    <div className="text-[9px] sm:text-[11px] uppercase tracking-[0.15em] text-white/40 font-medium text-center mt-1">
      {label}
    </div>
  </motion.div>
)

// --- Main Section ---

export default function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)
  
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [isLoaded, setIsLoaded] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()
  
  // High-performance scroll detection for mobile (IntersectionObserver)
  useEffect(() => {
    if (!isMobile) return
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [isMobile])

  // Parallax / Scroll transforms - only for desktop for performance
  const y1 = useTransform(scrollY, [0, 500], [0, 200])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  
  // Disable scale transform on mobile for performance
  const scale = useTransform(scrollY, [0, 500], isMobile ? [1, 1] : [1, 1.1])

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const { left, top } = containerRef.current.getBoundingClientRect()
    setMousePos({ x: e.clientX - left, y: e.clientY - top })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 60, filter: isMobile ? 'none' : 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'none',
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
    },
  }

  if (!isLoaded && heroImg) {
    return (
      <>
        <HeroSkeleton />
        <img 
          src={heroImg} 
          onLoad={() => setIsLoaded(true)} 
          className="hidden" 
          alt="Preloader" 
        />
      </>
    )
  }

  return (
    <section 
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black noise-overlay"
    >
      {/* Background Static Image with Slow Zoom */}
      <motion.div 
        style={{ scale }} 
        className="absolute inset-0 z-0 will-change-transform"
      >
        <img
          src={heroImg}
          alt="Luxury Salon Interior"
          className="w-full h-full object-cover opacity-60"
        />
        {/* Multi-layered Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/90 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 z-10" />
      </motion.div>

      {/* Mouse Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-20 opacity-40 mix-blend-soft-light lg:block hidden"
        animate={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(212,175,55,0.15), transparent 80%)`
        }}
      />

      {/* Floating Glow Elements - Hidden on mobile for performance */}
      {!isMobile && (
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-gold/5 blur-[120px] rounded-full pointer-events-none z-10"
        />
      )}

      {/* Content Container - Unified Scroll Transform */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-32 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={!isMobile ? { y: y1, opacity } : {}}
          className={`hero-vanish-container ${isMobile && isScrolled ? 'hero-vanished' : ''}`}
        >
          {/* Layout Wrapper */}
          <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-16">
            {/* Main Copy Area */}
            <div className="max-w-3xl text-center lg:text-left">
              <motion.div variants={itemVariants} className="flex items-center justify-center lg:justify-start gap-3 mb-8">
                <span className="w-8 h-px bg-gold/50" />
                <span className="text-[10px] sm:text-xs font-bold tracking-[0.4em] uppercase text-gold">
                  Bangalore's Premium Beauty Rituals
                </span>
                <span className="w-8 h-px bg-gold/50" />
              </motion.div>

              <motion.h1 
                variants={itemVariants} 
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white leading-[0.95] tracking-tighter mb-8"
              >
                Elevate <br />
                <span className="font-['Cormorant_Garamond'] italic font-normal gold-text bg-300% animate-gradient-text tracking-normal">
                  Your Style
                </span>
              </motion.h1>

              <motion.p 
                variants={itemVariants} 
                className="text-base sm:text-lg md:text-xl text-white/60 max-w-xl leading-relaxed mb-12 mx-auto lg:mx-0 font-light"
              >
                Experience the pinnacle of luxury grooming. Our master artisans blend 
                timeless techniques with modern aesthetics to reveal your most radiant self.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group relative px-10 py-5 bg-gold rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(212,175,55,0.45)] active:scale-95"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-yellow-600 to-yellow-400 bg-200% group-hover:animate-shimmer" />
                  <span className="relative z-10 flex items-center gap-3 text-black font-bold text-sm tracking-wider uppercase">
                    Book Appointment <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>

                <button 
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group px-10 py-5 rounded-full border border-white/20 glass hover:bg-white/5 transition-all duration-500 flex items-center gap-3 text-white font-semibold text-sm tracking-wider uppercase active:scale-95"
                >
                  Explore Services <Play size={14} className="fill-white group-hover:scale-125 transition-transform" />
                </button>
              </motion.div>
            </div>

            {/* Large Stylized Logo Mark / Secondary Visual */}
            <motion.div 
              variants={itemVariants}
              className="hidden xl:flex flex-col items-end text-right opacity-20 pointer-events-none select-none"
            >
              <span className="text-[180px] font-['Cormorant_Garamond'] leading-none text-white tracking-tighter">TG</span>
              <span className="text-xl tracking-[1em] text-gold -mt-8">SALON LUXE</span>
            </motion.div>
          </div>

          {/* Stats Row - Now inside the animation container */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-24 mb-10 translate-z-0">
            <StatCard index={0} icon={Award} value="10" label="Years Excellence" />
            <StatCard index={1} icon={Users} value="5000" label="Happy Clients" />
            <StatCard index={2} icon={Star} value="25" label="Master Stylists" />
            <StatCard index={3} icon={Heart} value="98" label="Satisfaction" suffix="%" />
          </div>
        </motion.div>
      </div>

      {/* Elegant Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 group cursor-pointer"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="text-[10px] text-white/30 tracking-[0.5em] uppercase font-bold group-hover:text-gold transition-colors">
          Discovery
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gold/50 to-transparent relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 w-full h-1/2 bg-white"
            animate={{ y: ["0%", "200%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* Decorative Corner Accents - Hidden on mobile */}
      {!isMobile && (
        <>
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-radial-at-tr from-gold/5 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-radial-at-bl from-gold/5 to-transparent pointer-events-none" />
        </>
      )}
    </section>
  )
}
