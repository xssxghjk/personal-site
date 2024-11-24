import { useCurrentWeight } from '~/hooks/useCurrentWeight'
import { DashboardCard } from '~/components/general/DashboardCard'

export const WeightCard = () => {
  const currentWeight = useCurrentWeight()
  return (
    <DashboardCard
      label={'Weight'}
      value={currentWeight.data?.weight.toString()}
      loading={currentWeight.isLoading}
      subtitle={'kg'}
    />
  )
}
