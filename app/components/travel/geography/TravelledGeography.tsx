import { MyGeographyProps } from '~/components/travel/geography/MyGeographyProps'
import { Geography } from 'react-simple-maps'
import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

export const TravelledGeography = ({
  geography,
  onSelect,
  isSelected,
}: MyGeographyProps) => {
  const geoSvg = useRef<SVGPathElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [box, setBox] = useState<DOMRect | null>(null)
  useEffect(() => {
    if (!geoSvg.current) return
    geoSvg.current.addEventListener('mouseenter', () => {
      d3.select(geoSvg.current).raise()
      setIsHovering(() => true)
    })
    geoSvg.current.addEventListener('mouseleave', () =>
      setIsHovering(() => false)
    )
    setBox(geoSvg.current.getBBox())
  }, [geoSvg])
  const hoverScaling = 0.05
  const selectedScaling = 0.1

  const scaling = isSelected ? selectedScaling : hoverScaling
  const calculateBaseTranslate = (position: number, size: number) =>
    (position + size / 2) * scaling

  return (
    <Geography
      ref={geoSvg}
      key={geography.rsmKey}
      transform={
        (isHovering || isSelected) && box
          ? `translate(-${calculateBaseTranslate(
              box.x,
              box.width
            )}, -${calculateBaseTranslate(
              box.y,
              box.height
            )}) scale(${scaling + 1})`
          : ''
      }
      geography={geography}
      className={
        'transition-all duration-200 cursor-pointer' +
        (isSelected
          ? ' fill-fuchsia-600 dark:fill-fuchsia-300'
          : ' fill-slate-600 dark:fill-slate-300 hover:fill-slate-700 hover:dark:fill-slate-200')
      }
      style={{
        default: { outline: 'none' },
        hover: { outline: 'none' },
        pressed: { outline: 'none' },
      }}
      onClick={() => {
        onSelect(geography)
      }}
      onTouchStart={() => {
        onSelect(geography)
      }}
    />
  )
}
