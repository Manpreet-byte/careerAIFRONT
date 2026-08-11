import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ImageCarousel({ images, name }) {
  const [index, setIndex] = useState(0)
  const [zoom, setZoom] = useState(false)

  useEffect(() => {
    setIndex(0)
    setZoom(false)
  }, [images, name])

  const move = (direction) => setIndex((current) => (current + direction + images.length) % images.length)

  return (
    <div>
      <div className="group relative aspect-[4/5] overflow-hidden bg-sand">
        <AnimatePresence mode="wait">
          <motion.img
            key={images[index]}
            src={images[index]}
            alt={`${name} view ${index + 1}`}
            className="h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45 }}
          />
        </AnimatePresence>
        <button className="carousel-btn left-4" onClick={() => move(-1)} aria-label="Previous image"><ChevronLeft /></button>
        <button className="carousel-btn right-4" onClick={() => move(1)} aria-label="Next image"><ChevronRight /></button>
        <button className="absolute bottom-4 right-4 bg-cream/92 p-3 text-mocha opacity-0 transition group-hover:opacity-100" onClick={() => setZoom(true)} aria-label="Open zoom view"><Maximize2 size={18} /></button>
      </div>
      <div className="mt-4 grid grid-cols-4 gap-3">
        {images.map((image, imageIndex) => (
          <button key={image} className={`aspect-square overflow-hidden border ${index === imageIndex ? 'border-leather' : 'border-transparent'}`} onClick={() => setIndex(imageIndex)}>
            <img src={image} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
      <AnimatePresence>
        {zoom && (
          <motion.div className="fixed inset-0 z-[85] bg-text/90 p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button className="absolute right-6 top-6 text-cream" onClick={() => setZoom(false)} aria-label="Close zoom"><X /></button>
            <img src={images[index]} alt={`${name} enlarged`} className="mx-auto h-full max-h-[92vh] w-full max-w-6xl object-contain" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
