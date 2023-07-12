import {
  ComposableMap,
  Geographies,
  ZoomableGroup,
} from 'react-simple-maps'
import { IGeography } from '~/components/travel/geography/MyGeographyProps'
import { ImageMetaData } from '~/hooks/useTravelMetaData'
import { TravelledGeography } from '~/components/travel/geography/TravelledGeography'
import { UntravelledGeography } from '~/components/travel/geography/UntravelledGeography'

const geoUrl = './geomap.json'

export interface TravelMapProps {
  selectCountry: (country: string) => void
  selectedCountry?: string
  mediaMetaData?: ImageMetaData[]
}

export const TravelMap = ({
  selectCountry,
  selectedCountry,
  mediaMetaData,
}: TravelMapProps) => {
  const geographyMap = {
    travelled: TravelledGeography,
    untravelled: UntravelledGeography,
  } as const
  const getGeographyName = (geo: IGeography) => geo.properties.name

  const isTravelledCountry = (
    geo: IGeography
  ): 'travelled' | 'untravelled' =>
    mediaMetaData &&
    mediaMetaData.some((imageMetaData) =>
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
                  key={geography.rsmKey}
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
