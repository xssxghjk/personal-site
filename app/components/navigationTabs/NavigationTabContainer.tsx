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
    <ul className="flex flex-wrap text-sm font-medium text-center border-b border-slate-700 text-slate-400">
      {children}
    </ul>
  )
}
