export type DashboardCardProps = {
  label: string
  value: string
  subtitle?: string
}

export const DashboardCard = ({
  label,
  subtitle,
  value,
}: DashboardCardProps) => {
  return (
    <div
      className={
        'w-full sm bg-slate-300 p-4 rounded-lg text-slate-800 relative'
      }
    >
      <p className={'text-slate-500 text-sm'}>{label}</p>
      <p className={'text-2xl font-bold'}>
        {value}{' '}
        <span className={'text-xs font-medium'}>{subtitle}</span>
      </p>
    </div>
  )
}
