import { useEffect } from 'react'
import { useScrollProgress } from './hooks/useScrollProgress'

// Layout
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// UI utilities
import CustomCursor from './components/CustomCursor'
import ScrollToTop from './components/ScrollToTop'
import StickyBookCTA from './components/StickyBookCTA'

// Sections
import HeroSection from './sections/HeroSection'
import ServicesSection from './sections/ServicesSection'
import GallerySection from './sections/GallerySection'
import AboutSection from './sections/AboutSection'
import TestimonialsSection from './sections/TestimonialsSection'
import ContactSection from './sections/ContactSection'

export default function App() {
  const scrollProgress = useScrollProgress()

  // Update scroll progress bar width
  useEffect(() => {
    const bar = document.getElementById('scroll-progress')
    if (bar) bar.style.width = scrollProgress + '%'
  }, [scrollProgress])

  return (
    <>
      {/* Scroll progress bar */}
      <div id="scroll-progress" />

      {/* Custom cursor (desktop only) */}
      <CustomCursor />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        <HeroSection />
        <ServicesSection />
        <GallerySection />
        <AboutSection />
        <TestimonialsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating utilities */}
      <StickyBookCTA />
      <ScrollToTop />
    </>
  )
}
