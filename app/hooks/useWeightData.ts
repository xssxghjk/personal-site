import { useQuery } from '@tanstack/react-query'

export type WeightDto = {
  weight: number
  date: string
}

export type Weight = {
  weight: number
  date: Date
}

export const useWeightQuery = () => {
  return useQuery({
    queryKey: ['weight'],
    queryFn: async (): Promise<WeightDto[]> => {
      const response = await fetch('/weight.json')
      return response.json()
    },
    select: (data: WeightDto[]) =>
      data.map((weightDto) => ({
        weight: weightDto.weight,
        date: new Date(weightDto.date),
      })),
  })
}
