import { motion, AnimatePresence } from 'framer-motion'
import { CalendarCheck } from 'lucide-react'
import { useScrolled } from '../hooks/useScrollProgress'

export default function StickyBookCTA() {
  const scrolled = useScrolled(600)

  const scrollToContact = () => {
    const el = document.querySelector('#contact')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {scrolled && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed bottom-8 right-5 md:right-8 z-50"
        >
          <motion.button
            onClick={scrollToContact}
            className="flex items-center gap-2.5 px-5 py-3.5 rounded-full text-black text-sm font-semibold shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #D4AF37, #E8C84A)',
              boxShadow: '0 8px 32px rgba(212,175,55,0.45)',
            }}
            whileHover={{ scale: 1.06, boxShadow: '0 12px 40px rgba(212,175,55,0.6)' }}
            whileTap={{ scale: 0.95 }}
          >
            <CalendarCheck size={18} />
            <span className="hidden sm:inline">Book Now</span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
