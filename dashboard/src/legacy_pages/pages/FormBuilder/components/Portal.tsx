import { ComponentProps } from '@heyui/component'
import { FC } from 'react'
import { createPortal } from 'react-dom'

export interface PortalProps extends ComponentProps {
  visible?: boolean
  container?: HTMLElement
}

export const Portal: FC<PortalProps> = ({ visible, container, children }) => {
  if (visible) {
    return createPortal(<div>{children}</div>, container || document.body)
  }

  return null
}
