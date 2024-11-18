import { useCurrentWeight } from '~/hooks/useCurrentWeight'
import { DashboardCard } from '~/components/general/DashboardCard'

const calculateBmi = (weight: number, height: number) => {
  return Math.round(weight / (height * height))
}

const getBmiClassification = (bmi: number) => {
  if (bmi < 18.5) return 'Underweight'
  if (bmi < 24.9) return 'Normal weight'
  if (bmi < 29.9) return 'Overweight'
  return 'Obese'
}

export const BmiCard = () => {
  const currentWeight = useCurrentWeight()
  if (!currentWeight) return null
  const bmi = calculateBmi(currentWeight.weight, 1.82)
  return (
    <DashboardCard
      label={'Body Mass Index'}
      value={bmi.toString()}
      subtitle={getBmiClassification(bmi)}
    />
  )
}
