import { SkeletonLoader } from '~/components/general/SkeletonLoader'

export type DashboardCardProps = {
  label: string
  value?: string | number
  subtitle?: string
  loading: boolean
}

export const DashboardCard = ({
  label,
  subtitle,
  value,
  loading,
}: DashboardCardProps) => {
  return (
    <div
      className={
        'w-full sm bg-slate-300 p-4 rounded-none sm:rounded-lg text-slate-800 relative'
      }
    >
      <p className={'text-slate-500 text-sm'}>{label}</p>
      {loading ? (
        <SkeletonLoader />
      ) : (
        <p className={'text-2xl font-bold'}>
          {value}{' '}
          <span className={'text-xs font-medium'}>{subtitle}</span>
        </p>
      )}
    </div>
  )
}
