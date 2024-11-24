import { DashboardCard } from '~/components/general/DashboardCard'
import { useCurrentWeight } from '~/hooks/useCurrentWeight'

export const ProteinCard = () => {
  const currentWeight = useCurrentWeight()
  if (!currentWeight) return null
  return (
    <DashboardCard
      label={'Protein'}
      value={currentWeight.data?.protein}
      loading={currentWeight.isLoading}
      subtitle={'%'}
    />
  )
}
