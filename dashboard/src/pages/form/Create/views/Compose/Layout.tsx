import type { Layout as FormLayout } from '@heyforms/shared-types-enums'
import { isURL } from '@hpnp/utils/helper'
import clsx from 'clsx'
import type { FC } from 'react'

interface LayoutProps extends IComponentProps {
  layout?: FormLayout
}

function filterStyle(brightness?: number) {
  if (!brightness) {
    return undefined
  }

  const value = 1 + brightness / 100

  if (value < 0) {
    return {
      filter: `brightness(${value})`
    }
  }

  return {
    filter: `contrast(${2 - value}) brightness(${value})`
  }
}

export const Layout: FC<LayoutProps> = ({ className, layout, ...restProps }) => {
  if (!isURL(layout?.mediaUrl)) {
    return null
  }

  return (
    <div className={clsx('builder-layout', className)} {...restProps}>
      <img src={layout!.mediaUrl} style={filterStyle(layout?.brightness)} />
    </div>
  )
}
