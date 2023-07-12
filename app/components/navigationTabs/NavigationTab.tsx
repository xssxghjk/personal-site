import React from 'react'
import { Link, useLocation } from '@remix-run/react'

export interface NavigationTabProps {
  to: string
  displayString: string
}

export const NavigationTab: React.FC<NavigationTabProps> = ({
  displayString,
  to,
}) => {
  const { pathname } = useLocation()
  const isSelected = sameRootPaths(pathname, to)
  const conditionalStyles = isSelected
    ? 'text-fuchsia-500 active'
    : 'hover:bg-slate-800 hover:text-slate-300'
  return (
    <li className="mr-2">
      <Link
        to={to}
        className={
          'inline-block p-4 rounded-t-lg ' + conditionalStyles
        }
      >
        {displayString}
      </Link>
    </li>
  )
}

const getRootPath = (path: string): string => path.split('/')[1]

const sameRootPaths = (path1: string, path2: string): boolean =>
  getRootPath(path1) === getRootPath(path2)
