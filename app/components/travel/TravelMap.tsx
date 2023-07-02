import {
  ComposableMap,
  Geographies,
  ZoomableGroup,
} from 'react-simple-maps'
import { IGeography } from '~/components/travel/geography/MyGeographyProps'
import { ImageMetaData } from '~/hooks/useTravelMetaData'
import { TravelledGeography } from '~/components/travel/geography/TravelledGeography'
import { UntravelledGeography } from '~/components/travel/geography/UntravelledGeography'

const geoUrl =
  'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json'

export interface TravelMapProps {
  selectCountry: (country: string) => void
  selectedCountry?: string
  imagesMetaData?: ImageMetaData[]
}

export const TravelMap = ({
  selectCountry,
  selectedCountry,
  imagesMetaData,
}: TravelMapProps) => {
  const geographyMap = {
    travelled: TravelledGeography,
    untravelled: UntravelledGeography,
  } as const
  const getGeographyName = (geo: IGeography) => geo.properties.name

  const isTravelledCountry = (
    geo: IGeography
  ): 'travelled' | 'untravelled' =>
    imagesMetaData &&
    imagesMetaData.some((imageMetaData) =>
      imageMetaData.country.includes(geo.properties.name)
    )
      ? 'travelled'
      : 'untravelled'
  const trySelectCountry = (geo: IGeography) => {
    if (isTravelledCountry(geo)) selectCountry(getGeographyName(geo))
  }
  return (
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
                  onSelect={trySelectCountry}
                  isSelected={
                    selectedCountry === getGeographyName(geography)
                  }
                />
              )
            })
          }}
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  )
}
