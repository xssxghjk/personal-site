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
    <ul className="flex flex-wrap text-sm font-medium text-center text-slate-400 fixed top-0 left-0 w-full z-50 bg-slate-800">
      {children}
    </ul>
  )
}
