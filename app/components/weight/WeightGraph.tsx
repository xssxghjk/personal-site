import { AxisOptions, Chart } from 'react-charts'
import { useMemo } from 'react'
import { useWeightQuery, Weight } from '~/hooks/useWeightData'
import { LineChartLoadingAnimation } from '~/components/weight/LineChartLoadingAnimation'

export const WeightGraph = () => {
  const weight = useWeightQuery()
  const primaryAxis = useMemo<AxisOptions<Weight>>(
    () => ({
      type: 'time',
      getValue: (d) => d.date,
      tickCount: 0,
    }),
    []
  )
  const secondaryAxis = useMemo<AxisOptions<Weight>>(
    () => ({
      type: 'linear',
      getValue: (d) => d.weight,
      tickCount: 5,
    }),
    []
  )
  return (
    <div
      className={
        'w-full sm bg-slate-300 rounded-none sm:rounded-lg text-slate-800 relative mx-auto'
      }
      style={{
        height: '300px',
      }}
    >
      {!weight.data ? (
        <div className={'flex justify-center items-center h-full'}>
          <LineChartLoadingAnimation />
        </div>
      ) : (
        <Chart
          options={{
            data: [{ data: weight.data }],
            primaryAxis: primaryAxis,
            secondaryAxes: [secondaryAxis],
            padding: 16,
          }}
        />
      )}
    </div>
  )
}
