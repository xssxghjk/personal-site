import { DashboardCard } from '~/components/general/DashboardCard'
import { useCurrentWeight } from '~/hooks/useCurrentWeight'

export const BodyWaterCard = () => {
  const currentWeight = useCurrentWeight()
  if (!currentWeight) return null
  return (
    <DashboardCard
      label={'Body Water'}
      value={currentWeight.data?.bodyWater}
      loading={currentWeight.isLoading}
      subtitle={'%'}
    />
  )
}
