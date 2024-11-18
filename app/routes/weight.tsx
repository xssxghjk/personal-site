import React from 'react'
import { BmiCard } from '~/components/weight/BmiCard'
import { WeightCard } from '~/components/weight/WeightCard'

export default function Weight() {
  return (
    <div className={'m-4'}>
      <div className={'grid gap-5 sm:grid-cols-3 lg:grid-cols-4'}>
        <WeightCard />
        <BmiCard />
      </div>
    </div>
  )
}
