import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import styles from './tailwind.css'
import { LinksFunction } from '@remix-run/node'
import { NavigationTabContainer } from '~/components/navigationTabs/NavigationTabContainer'
import { NavigationTab } from '~/components/navigationTabs/NavigationTab'

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }]

export default function App() {
  return (
    <html lang="en">
      <head>
        <title title={'Personal Site'} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body
        className={
          'bg-slate-100 dark:bg-slate-800 w-screen h-screen dark:text-slate-300 text-slate-700'
        }
      >
        <NavigationTabContainer>
          <NavigationTab to={'/'} displayString={'Home'} />
          <NavigationTab to={'/travel'} displayString={'Travel'} />
        </NavigationTabContainer>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
