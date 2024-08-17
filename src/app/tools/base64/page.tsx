import { Fragment } from 'react'
import { MenuTabs } from './tabs'

export default function Base64() {
  return (
    <Fragment>
      <h1 className="text-3xl font-medium text-zinc-900 text-zinc-100">
        Base64
      </h1>
      <MenuTabs />
    </Fragment>
  )
}
