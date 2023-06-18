import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps'
import { useState } from 'react'
import { useTravelMetaData } from '~/hooks/useTravelMetaData'

const geoUrl =
  'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json'

interface Geography {
  properties: {
    name: string
  }
  rsmKey: string
  svgPath: string
}

const average = (array: number[]) =>
  array.reduce((p, c) => p + c, 0) / array.length

const getGeographyName = (geo: Geography) => geo.properties.name

export default function Travel() {
  const [selectedCountry, setSelectedCountry] = useState<
    string | undefined
  >(undefined)
  const imagesMetaData = useTravelMetaData()

  const isTravelledCountry = (geo: Geography) =>
    imagesMetaData &&
    imagesMetaData.some((imageMetaData) =>
      imageMetaData.country.includes(geo.properties.name)
    )

  const selectCountry = (geo: Geography) => {
    if (isTravelledCountry(geo))
      setSelectedCountry(getGeographyName(geo))
  }

  const getColorByGeography = (geo: Geography): string => {
    if (getGeographyName(geo) === selectedCountry)
      return 'fill-fuchsia-600 dark:fill-fuchsia-500'
    if (isTravelledCountry(geo))
      return 'fill-slate-600 dark:fill-slate-300'
    return 'fill-slate-200 dark:fill-slate-600'
  }

  return (
    <main>
      <div className={'grid grid-cols-3 w-full'}>
        <div className={'col-span-3 lg:col-span-2'}>
          <ComposableMap projection={'geoMercator'}>
            <ZoomableGroup>
              <Geographies geography={geoUrl}>
                {({ geographies }) => {
                  return geographies.map((geo: Geography) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      className={getColorByGeography(geo)}
                      onClick={() => {
                        selectCountry(geo)
                      }}
                      onTouchStart={() => {
                        selectCountry(geo)
                      }}
                      style={{
                        default: { outline: 'none' },
                        hover: { outline: 'none' },
                        pressed: { outline: 'none' },
                      }}
                    />
                  ))
                }}
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        </div>
        <div className={'col-span-3 lg:col-span-1 '}>
          {imagesMetaData
            ?.filter(
              (imageMetaData) =>
                imageMetaData.country === selectedCountry
            )
            .filter((imageMetaData) => imageMetaData.type === 'image')
            .map((imageMetaData) => (
              <img src={imageMetaData.url} />
            ))}
        </div>
      </div>
    </main>
  )
}
