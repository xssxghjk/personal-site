import { useRef } from 'react'
import { useTravelMetaData } from '~/hooks/useTravelMetaData'
import { AnimatePresence } from 'framer-motion'
import { TravelMap } from '~/components/travel/TravelMap'
import { Outlet, useParams } from '@remix-run/react'
import { CountryModal } from '~/components/travel/countryModal/CountryModal'
import { imageAspectRatio } from '~/components/general/ImageCarousel'

export default function Travel() {
  const mainRef = useRef<HTMLElement>(null)
  const mediaMetaData = useTravelMetaData()
  const params = useParams<{ country: string }>()
  const selectedCountry = params.country
  console.log(selectedCountry)
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
          <CountryModal>
            <div
              className={'w-28 md:w-48 lg:w-64'}
              style={{ aspectRatio: imageAspectRatio }}
            >
              <Outlet />
            </div>
          </CountryModal>
        )}
      </AnimatePresence>
    </main>
  )
}
