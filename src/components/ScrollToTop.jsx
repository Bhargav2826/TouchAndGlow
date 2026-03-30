import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useScrolled } from '../hooks/useScrollProgress'

export default function ScrollToTop() {
  const visible = useScrolled(400)

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-24 right-5 md:right-8 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, #D4AF37, #E8C84A)',
            boxShadow: '0 4px 20px rgba(212,175,55,0.5)',
          }}
          whileHover={{ scale: 1.1, boxShadow: '0 6px 30px rgba(212,175,55,0.7)' }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp size={20} className="text-black" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
