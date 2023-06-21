export interface IGeography {
  properties: {
    name: string
  }
  rsmKey: string
  svgPath: string
}

export interface MyGeographyProps {
  geography: IGeography
  onSelect: (geography: IGeography) => void
  isSelected: boolean
}
