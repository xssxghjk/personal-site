import {
  ComposableMap,
  Geographies,
  ZoomableGroup,
} from 'react-simple-maps'
import { useRef, useState } from 'react'
import { useTravelMetaData } from '~/hooks/useTravelMetaData'
import { IGeography } from '~/components/travel/geography/MyGeographyProps'
import { TravelledGeography } from '~/components/travel/geography/TravelledGeography'
import { UntravelledGeography } from '~/components/travel/geography/UntravelledGeography'
import { AnimatePresence, motion } from 'framer-motion'
import { ImageCarousel } from '~/components/general/ImageCarousel'
import { CountryModal } from '~/components/travel/countryModal/CountryModal'

const geoUrl =
  'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json'

const getGeographyName = (geo: IGeography) => geo.properties.name

export default function Travel() {
  const [selectedCountry, setSelectedCountry] = useState<
    string | undefined
  >(undefined)
  const imagesMetaData = useTravelMetaData()
  const mainRef = useRef<HTMLElement>(null)

  const isTravelledCountry = (
    geo: IGeography
  ): 'travelled' | 'untravelled' =>
    imagesMetaData &&
    imagesMetaData.some((imageMetaData) =>
      imageMetaData.country.includes(geo.properties.name)
    )
      ? 'travelled'
      : 'untravelled'

  const selectCountry = (geo: IGeography) => {
    if (isTravelledCountry(geo))
      setSelectedCountry(getGeographyName(geo))
  }

  const geographyMap = {
    travelled: TravelledGeography,
    untravelled: UntravelledGeography,
  } as const

  return (
    <main className={'h-full relative'} ref={mainRef}>
      <div className={'h-full'}>
        <ComposableMap
          projection={'geoMercator'}
          className={'h-full w-full'}
        >
          <ZoomableGroup>
            <Geographies geography={geoUrl}>
              {({ geographies }) => {
                return geographies.map((geography: IGeography) => {
                  const MyGeography =
                    geographyMap[isTravelledCountry(geography)]
                  return (
                    <MyGeography
                      geography={geography}
                      onSelect={selectCountry}
                      isSelected={
                        selectedCountry ===
                        getGeographyName(geography)
                      }
                    />
                  )
                })
              }}
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
      <AnimatePresence initial={false}>
        {selectedCountry !== undefined && (
          <CountryModal onClose={() => setSelectedCountry(undefined)}>
            <div className={'w-28 md:w-48 lg:w-64 '}>
              <ImageCarousel
                images={[
                  imagesMetaData
                    ?.filter(
                      (imageMetaData) =>
                        imageMetaData.country === selectedCountry
                    )
                    .filter((_, index) => index < 5)
                    .filter(
                      (imageMetaData) =>
                        imageMetaData.type === 'image'
                    )[0].url || '',
                ]}
              />
              {/*<motion.img*/}
              {/*  initial={{ opacity: 0, y: -30 }}*/}
              {/*  animate={{ opacity: 1, y: 0 }}*/}
              {/*  exit={{ opacity: 0, y: 30 }}*/}
              {/*  src={*/}
              {/*   imagesMetaData*/}
              {/*     ?.filter(*/}
              {/*       (imageMetaData) =>*/}
              {/*         imageMetaData.country === selectedCountry*/}
              {/*     )*/}
              {/*     .filter((_, index) => index < 5)*/}
              {/*     .filter(*/}
              {/*       (imageMetaData) =>*/}
              {/*         imageMetaData.type === 'image'*/}
              {/*     )[0].url*/}
              {/* }*/}
              {/*/>*/}
              {/*<Carousel infiniteLoop autoPlay>*/}
              {/*  {imagesMetaData*/}
              {/*    ?.filter(*/}
              {/*      (imageMetaData) =>*/}
              {/*        imageMetaData.country === selectedCountry*/}
              {/*    )*/}
              {/*    .filter((_, index) => index < 5)*/}
              {/*    .filter(*/}
              {/*      (imageMetaData) => imageMetaData.type === 'image'*/}
              {/*    )*/}
              {/*    .map((imageMetaData, index) => (*/}
              {/*      <>*/}
              {/*        <div>*/}
              {/*          <img src={imageMetaData.url} />*/}
              {/*        </div>*/}
              {/*      </>*/}
              {/*    ))}*/}
              {/*</Carousel>*/}
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
      {/*<div className={'col-span-3 lg:col-span-1 '}>*/}
      {/*  {imagesMetaData*/}
      {/*    ?.filter(*/}
      {/*      (imageMetaData) =>*/}
      {/*        imageMetaData.country === selectedCountry*/}
      {/*    )*/}
      {/*    .filter((imageMetaData) => imageMetaData.type === 'image')*/}
      {/*    .map((imageMetaData) => (*/}
      {/*      <img src={imageMetaData.url} />*/}
      {/*    ))}*/}
      {/*</div>*/}
    </main>
  )
}
