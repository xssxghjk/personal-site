import { Geography } from 'react-simple-maps'
import { MyGeographyProps } from '~/components/travel/geography/MyGeographyProps'

export const UntravelledGeography = ({
  geography,
}: MyGeographyProps) => {
  return (
    <Geography
      key={geography.rsmKey}
      geography={geography}
      className={'fill-slate-200 dark:fill-slate-600'}
      style={{
        default: { outline: 'none' },
        hover: { outline: 'none' },
        pressed: { outline: 'none' },
      }}
    />
  )
}
