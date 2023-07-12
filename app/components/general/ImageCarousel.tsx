import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

export interface ImageCarouselProps {
  images: string[]
}

const imageAspectRatio = 384 / 683

export const ImageCarousel = ({ images }: ImageCarouselProps) => {
  const [imageLoading, setImageLoading] = useState(true)
  useEffect(() => {
    setImageLoading(true)
  }, [images[0]])

  return (
    <motion.div
      className={'w-full relative'}
      style={{
        aspectRatio: imageAspectRatio,
      }}
    >
      <AnimatePresence initial={false}>
        <motion.img
          key={images[0]}
          initial={{ opacity: 0 }}
          animate={{
            opacity: imageLoading ? 0 : 1,
          }}
          exit={{ opacity: 0 }}
          src={images[0]}
          onLoad={() => setImageLoading(false)}
          className={'pointer-events-none select-none absolute'}
        />
      </AnimatePresence>
    </motion.div>
  )
}
