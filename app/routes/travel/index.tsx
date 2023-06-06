import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps'
import { useEffect, useState } from 'react'

const geoUrl =
  'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json'

interface Geography {
  properties: {
    name: string
  }
  rsmKey: string
}

interface ImageMetaData {
  country: string
  url: string
  type: 'image' | 'video'
  year: number
}

const nameMap: [string, string][] = [
  ['Turkiye', 'Turkey'],
  ['Korea', 'South Korea'],
  ['Åland', 'Finland'],
]

const getReplacedNameOrDefault = (countryName: string) => {
  let replacedName = countryName
  nameMap.forEach((namePair) => {
    if (namePair[0] === countryName) replacedName = namePair[1]
  })
  return replacedName
}

export default function Travel() {
  const [imagesMetaData, setImagesMetaData] = useState<
    ImageMetaData[] | undefined
  >()
  useEffect(() => {
    fetch('/imageMetaData.json')
      .then((r) => r.json())
      .then((r) =>
        (r as ImageMetaData[]).map(
          (imageMetaData): ImageMetaData => ({
            ...imageMetaData,
            country: getReplacedNameOrDefault(imageMetaData.country),
          })
        )
      )
      .then((r) => setImagesMetaData(r as ImageMetaData[]))
  }, [])

  console.log(imagesMetaData)
  return (
    <main>
      <div className={'md:mx-auto md:w-5/6 lg:w-3/4 w-full'}>
        <ComposableMap projection={'geoMercator'}>
          <ZoomableGroup>
            <Geographies geography={geoUrl}>
              {({ geographies }) => {
                return geographies.map((geo: Geography) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={
                      imagesMetaData &&
                      imagesMetaData.some((imageMetaData) =>
                        imageMetaData.country.includes(geo.properties.name)
                      )
                        ? 'rgb(217 70 239)'
                        : undefined
                    }
                  />
                ))
              }}
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </main>
  )
}
