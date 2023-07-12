import { AnimatePresence, motion } from 'framer-motion'
import React, { useContext, useEffect, useState } from 'react'
import { CountryModalHoverContext } from '../travel/countryModal/CountryModal'

export interface ImageCarouselProps {
  images: string[]
}

const imageAspectRatio = 384 / 683

export const ImageCarousel = ({ images }: ImageCarouselProps) => {
  const [imageLoading, setImageLoading] = useState(true)
  const [imageIndex, setImageIndex] = useState(0)
  const isHovering = useContext(CountryModalHoverContext)
  const currentImage = images[imageIndex]

  useEffect(() => {
    setImageLoading(true)
  }, [currentImage])

  useEffect(() => {
    const interval = setInterval(() => {
      !isHovering &&
        setImageIndex((prev) => (prev + 1) % images.length)
    }, 4000)
    return () => clearInterval(interval)
  })
  return (
    <motion.div
      className={'w-full relative'}
      style={{
        aspectRatio: imageAspectRatio,
      }}
    >
      <AnimatePresence initial={false}>
        <motion.img
          key={currentImage}
          initial={{ opacity: 0 }}
          animate={{
            opacity: imageLoading ? 0 : 1,
          }}
          exit={{ opacity: 0 }}
          src={currentImage}
          onLoad={() => setImageLoading(false)}
          className={'pointer-events-none select-none absolute'}
        />
      </AnimatePresence>
    </motion.div>
  )
}
