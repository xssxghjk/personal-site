import { useQuery } from '@tanstack/react-query'

export type WeightDto = {
  time: string
  Weight: string
  BMI: string
  'Body fat': string
  'Muscle mass': string
  'Body water': string
  'Visceral fat': string
  'Bone mass': string
  BMR: string
  Protein: string
  'Fat level': string
  'Subcutaneous fat': string
  'Lean body mass': string
  'Body Type': string
  'Standard Weight': string
  'Heart Rate': string
}

export type Weight = {
  weight: number
  bmi: number
  bodyFat: number
  date: Date
  bodyWater: number
  protein: number
  bmr: number
}

const weightRoute =
  'https://weight-csv-reverse-proxy.enes-findik.workers.dev/'

export const useWeightQuery = () => {
  return useQuery({
    queryKey: ['weight'],
    queryFn: async (): Promise<WeightDto[]> => {
      const response = await fetch(weightRoute)
      return response.json()
    },
    select: (data: WeightDto[]): Weight[] =>
      data.map((weightDto) => ({
        weight: Number(weightDto.Weight.split('kg')[0]),
        date: new Date(weightDto.time),
        bmi: Number(weightDto.BMI),
        bodyFat: Number(weightDto['Body fat'].split('%')[0]),
        bodyWater: Number(weightDto['Body water'].split('%')[0]),
        protein: Number(weightDto['Protein'].split('%')[0]),
        bmr: Number(weightDto.BMR),
      })),
  })
}
