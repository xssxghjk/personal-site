import { useCurrentWeight } from '~/hooks/useCurrentWeight'
import { DashboardCard } from '~/components/general/DashboardCard'

export const WeightCard = () => {
  const currentWeight = useCurrentWeight()
  if (!currentWeight) return null
  return (
    <DashboardCard
      label={'Weight'}
      value={currentWeight.weight.toString()}
      subtitle={'kg'}
    />
  )
}
