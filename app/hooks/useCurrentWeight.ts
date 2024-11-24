import { useWeightQuery } from '~/hooks/useWeightData'

export const useCurrentWeight = () => {
  const weights = useWeightQuery()
  return {
    data: weights.data
      ?.sort((a, b) => a.date.getTime() - b.date.getTime())
      .pop(),
    isLoading: weights.isLoading,
  }
}
