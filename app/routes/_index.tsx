import type { V2_MetaFunction } from '@remix-run/node'

export const meta: V2_MetaFunction = () => {
  return [{ title: 'New Remix App' }]
}

export default function _index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1 className={'text-center mt-4'}>Hi, I'm Enes</h1>
      <div className="mx-auto mt-16 max-w-7xl text-center">
        <span>
          This is my personal page where I document things I'm doing (including
          this page)
        </span>
      </div>
    </div>
  )
}
