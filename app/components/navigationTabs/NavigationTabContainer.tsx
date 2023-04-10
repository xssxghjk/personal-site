import React from 'react'
import { NavigationTabProps } from '~/components/navigationTabs/NavigationTab'

export interface NavigationTabContainerProps {
  children:
    | React.ReactElement<NavigationTabProps>[]
    | React.ReactElement<NavigationTabProps>
}

export const NavigationTabContainer = ({
  children,
}: NavigationTabContainerProps) => {
  return (
    <ul className="flex flex-wrap text-sm font-medium text-center text-slate-500 border-b border-slate-200 dark:border-slate-700 dark:text-slate-400">
      {children}
    </ul>
  )
}
