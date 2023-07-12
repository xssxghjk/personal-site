import { ImageCarousel } from '~/components/general/ImageCarousel'
import { AnimatePresence, motion } from 'framer-motion'
import { useParams } from '@remix-run/react'
import { useTravelMetaData } from '~/hooks/useTravelMetaData'

export default function TravelCountry() {
  const params = useParams<{ country: string }>()
  const mediaMetaData = useTravelMetaData()
  const selectedCountry = params.country

  return (
    <div>
      <ImageCarousel
        images={
          mediaMetaData
            ?.filter(
              (imageMetaData) =>
                imageMetaData.country === selectedCountry
            )
            .filter((imageMetaData) => imageMetaData.type === 'image')
            .map((image) => image.url) || ['']
        }
      />
      <AnimatePresence initial={false}>
        <motion.div
          key={selectedCountry}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 30 }}
          className={
            'm-2 text-sm md:m-3 md:text-base lg:m-4 lg:text-2xl absolute bottom-0 bg-auto drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] '
          }
        >
          {selectedCountry}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
