import { useRef, useState } from 'react'
import { useTravelMetaData } from '~/hooks/useTravelMetaData'
import { AnimatePresence, motion } from 'framer-motion'
import { ImageCarousel } from '~/components/general/ImageCarousel'
import { CountryModal } from '~/components/travel/countryModal/CountryModal'
import { TravelMap } from '~/components/travel/TravelMap'

export default function Travel() {
  const [selectedCountry, setSelectedCountry] = useState<
    string | undefined
  >('Turkey')
  const mainRef = useRef<HTMLElement>(null)
  const imagesMetaData = useTravelMetaData()

  return (
    <main className={'h-full relative'} ref={mainRef}>
      <div className={'h-full'}>
        <TravelMap
          selectCountry={setSelectedCountry}
          selectedCountry={selectedCountry}
          imagesMetaData={imagesMetaData}
        />
      </div>
      <AnimatePresence initial={false}>
        {selectedCountry !== undefined && (
          <CountryModal onClose={() => setSelectedCountry(undefined)}>
            <div className={'w-28 md:w-48 lg:w-64'}>
              <ImageCarousel
                images={
                  imagesMetaData
                    ?.filter(
                      (imageMetaData) =>
                        imageMetaData.country === selectedCountry
                    )
                    .filter((_, index) => index < 5)
                    .filter(
                      (imageMetaData) =>
                        imageMetaData.type === 'image'
                    )
                    .map((image) => image.url) || ['']
                }
              />
            </div>
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
          </CountryModal>
        )}
      </AnimatePresence>
    </main>
  )
}
