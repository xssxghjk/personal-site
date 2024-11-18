import { useWeightQuery } from '~/hooks/useWeightData'

export const useCurrentWeight = () => {
  const weights = useWeightQuery()
  return weights.data
    ?.sort((a, b) => a.date.getTime() - b.date.getTime())
    .pop()
}
