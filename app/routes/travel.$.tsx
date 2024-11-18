import { useRef } from 'react'
import { useTravelMetaData } from '~/hooks/useTravelMetaData'
import { AnimatePresence, motion } from 'framer-motion'
import { TravelMap } from '~/components/travel/TravelMap'
import { useLoaderData } from '@remix-run/react'
import { CountryModal } from '~/components/travel/countryModal/CountryModal'
import {
  imageAspectRatio,
  ImageCarousel,
} from '~/components/general/ImageCarousel'
import { LoaderFunctionArgs, json } from '@remix-run/cloudflare'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const parameterString = params['*'] ?? ''
  const parameterArray = parameterString.split('/')
  return json({
    country: parameterArray[0],
  })
}

export default function TravelCountry() {
  const { country } = useLoaderData<typeof loader>()
  const mainRef = useRef<HTMLElement>(null)
  const mediaMetaData = useTravelMetaData()
  const selectedCountry = country
  return (
    <main className={'h-full relative'} ref={mainRef}>
      <div className={'h-full'}>
        <TravelMap
          selectedCountry={selectedCountry}
          mediaMetaData={mediaMetaData}
        />
      </div>
      <AnimatePresence initial={false}>
        {selectedCountry && (
          <CountryModal country={selectedCountry}>
            <div
              className={'w-28 md:w-48 lg:w-64 transition-all'}
              style={{ aspectRatio: imageAspectRatio }}
            >
              <div>
                <ImageCarousel
                  images={
                    mediaMetaData
                      ?.filter(
                        (imageMetaData) =>
                          imageMetaData.country === selectedCountry
                      )
                      .filter(
                        (imageMetaData) =>
                          imageMetaData.type === 'image'
                      )
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
                      'z-20 m-2 text-sm md:m-3 md:text-base lg:m-4 lg:text-2xl absolute bottom-0 bg-auto drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] '
                    }
                  >
                    {selectedCountry}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </CountryModal>
        )}
      </AnimatePresence>
    </main>
  )
}
