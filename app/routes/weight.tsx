import React from 'react'
import { BmiCard } from '~/components/weight/BmiCard'
import { WeightCard } from '~/components/weight/WeightCard'
import { BodyFatCard } from '~/components/weight/BodyFatCard'
import { BodyWaterCard } from '~/components/weight/BodyWaterCard'
import { WeightGraph } from '~/components/weight/WeightGraph'
import { BmrCard } from '~/components/weight/BmrCard'
import { ProteinCard } from '~/components/weight/ProteinCard'
import { useWeightQuery } from '~/hooks/useWeightData'

export default function Weight() {
  const weightQuery = useWeightQuery()
  return (
    <div
      className={
        'grid gap-5 grid-cols-1 lg:grid-cols-2 md:p-5 max-w-screen-xl m-auto'
      }
    >
      <div className={'grid gap-5 sm:grid-cols-2 '}>
        <WeightCard />
        <BmiCard />
        <BodyFatCard />
        <BodyWaterCard />
        <BmrCard />
        <ProteinCard />
      </div>
      <WeightGraph />
    </div>
  )
}
