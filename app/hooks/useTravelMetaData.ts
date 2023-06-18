import { useEffect, useState } from 'react'

const nameMap: [string, string][] = [
  ['Turkiye', 'Turkey'],
  ['Korea', 'South Korea'],
  ['Åland', 'Finland'],
]

interface ImageMetaData {
  country: string
  url: string
  type: 'image' | 'video'
  year: number
}

const getReplacedNameOrDefault = (countryName: string) => {
  let replacedName = countryName
  nameMap.forEach((namePair) => {
    if (namePair[0] === countryName) replacedName = namePair[1]
  })
  return replacedName
}

export const useTravelMetaData = () => {
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

  return imagesMetaData
}
