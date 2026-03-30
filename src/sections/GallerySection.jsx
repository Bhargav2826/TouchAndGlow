import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import gallery1 from '../assets/gallery_1.png'
import gallery2 from '../assets/gallery_2.png'
import gallery3 from '../assets/gallery_3.png'
import gallery4 from '../assets/gallery_4.png'

const galleryItems = [
  { src: gallery1, label: 'Sleek Blowout', category: 'Hair', tall: true },
  { src: gallery2, label: "Men's Premium Cut", category: 'Grooming', tall: false },
  { src: gallery3, label: 'Balayage Coloring', category: 'Color', tall: false },
  { src: gallery4, label: 'Luxury Facial', category: 'Skin', tall: true },
]

function GalleryCard({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`group relative img-zoom cursor-pointer ${item.tall ? 'sm:row-span-2' : 'sm:row-span-1'}`}
      style={{ minHeight: '300px' }} // Ensure visibility on mobile
    >
      <img
        src={item.src}
        alt={item.label}
        className="w-full h-full object-cover"
        loading="lazy"
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-3xl" />

      {/* Content on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
        <span className="label-text block mb-1">{item.category}</span>
        <h3 className="text-white text-lg font-bold">{item.label}</h3>
      </div>

      {/* Corner badge */}
      <div className="absolute top-4 left-4 px-3 py-1 rounded-full glass-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-white/80 text-[10px] font-medium tracking-widest">VIEW</span>
      </div>
    </motion.div>
  )
}

export default function GallerySection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="gallery" className="section-padding bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="label-text block mb-3">Our Work</span>
          <div className="section-divider mx-auto mb-5" />
          <h2 className="heading-lg text-charcoal mb-4">
            Featured{' '}
            <span className="font-['Cormorant_Garamond'] italic font-normal gold-text">
              Transformations
            </span>
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto leading-relaxed">
            Every look tells a story. Browse our curated portfolio of transformations 
            that define the Touch &amp; Glow signature.
          </p>
        </motion.div>

        {/* Responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[300px] sm:auto-rows-[240px]">
          {galleryItems.map((item, i) => (
            <GalleryCard key={item.label} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
