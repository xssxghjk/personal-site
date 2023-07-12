import { useRef, useState } from 'react'
import { useTravelMetaData } from '~/hooks/useTravelMetaData'
import { AnimatePresence, motion } from 'framer-motion'
import { ImageCarousel } from '~/components/general/ImageCarousel'
import { CountryModal } from '~/components/travel/countryModal/CountryModal'
import { TravelMap } from '~/components/travel/TravelMap'
import { useParams } from '@remix-run/react'

export default function Travel() {
  const mainRef = useRef<HTMLElement>(null)
  const mediaMetaData = useTravelMetaData()
  const params = useParams<{ country: string }>()
  const selectedCountry = params.country

  return (
    <main className={'h-full relative'} ref={mainRef}>
      <div className={'h-full'}>
        <TravelMap
          selectedCountry={selectedCountry}
          mediaMetaData={mediaMetaData}
        />
      </div>
      <AnimatePresence initial={false}>
        {selectedCountry !== undefined && (
          <CountryModal>
            <div className={'w-28 md:w-48 lg:w-64'}>
              <ImageCarousel
                images={
                  mediaMetaData
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
