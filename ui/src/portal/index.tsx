import type { FC } from 'react'
import { createPortal } from 'react-dom'

export interface PortalProps {
  visible?: boolean
  container?: HTMLElement
}

const Portal: FC<PortalProps> = ({ visible, container, children }) => {
  if (!visible || !children) {
    return null
  }

  return createPortal(children, container || document.body)
}

export default Portal
