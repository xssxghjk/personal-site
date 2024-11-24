import { DashboardCard } from '~/components/general/DashboardCard'
import { useCurrentWeight } from '~/hooks/useCurrentWeight'

export const BodyFatCard = () => {
  const currentWeight = useCurrentWeight()
  return (
    <DashboardCard
      label={'Body Fat'}
      value={currentWeight.data?.bodyFat}
      subtitle={'%'}
      loading={currentWeight.isLoading}
    />
  )
}
