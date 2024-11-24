import { useCurrentWeight } from '~/hooks/useCurrentWeight'
import { DashboardCard } from '~/components/general/DashboardCard'

const calculateBmi = (weight: number, height: number) => {
  return Math.round(weight / (height * height))
}

export const BmiCard = () => {
  const currentWeight = useCurrentWeight()
  if (!currentWeight) return null
  return (
    <DashboardCard
      label={'Body Mass Index'}
      value={
        currentWeight.data?.weight &&
        calculateBmi(currentWeight.data?.weight, 1.82)
      }
      loading={currentWeight.isLoading}
    />
  )
}
