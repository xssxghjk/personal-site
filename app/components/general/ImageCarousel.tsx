import { Logo } from '~/components/general/Logo'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export interface ImageCarouselProps {
  images: string[]
}

const imageAspectRatio = 384 / 683

export const ImageCarousel = ({ images }: ImageCarouselProps) => {
  const [imageLoading, setImageLoading] = useState(true)
  useEffect(() => {
    setImageLoading(true)
  }, [images[0]])
  console.log(imageLoading)
  return (
    <motion.div
      className={'w-full'}
      style={{
        aspectRatio: imageAspectRatio,
      }}
    >
      <motion.img
        key={images[0]}
        initial={{ opacity: 0 }}
        animate={{
          opacity: imageLoading ? 0 : 1,
          height: imageLoading ? 0 : 'auto',
        }}
        transition={{
          height: { delay: 0, duration: 0.4 },
          opacity: { delay: 0.5, duration: 0.4 },
        }}
        exit={{ opacity: 0, height: 0 }}
        src={images[0]}
        onLoad={() => setImageLoading(false)}
        className={'pointer-events-none select-none'}
      />
    </motion.div>
  )
}
