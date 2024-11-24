import { useCurrentWeight } from '~/hooks/useCurrentWeight'
import { DashboardCard } from '~/components/general/DashboardCard'

export const BmrCard = () => {
  const currentWeight = useCurrentWeight()
  if (!currentWeight) return null
  return (
    <DashboardCard
      label={'Basal Metabolic Rate'}
      value={currentWeight.data?.bmr}
      loading={currentWeight.isLoading}
      subtitle={'kCal / day'}
    />
  )
}
