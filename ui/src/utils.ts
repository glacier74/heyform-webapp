import type { CSSProperties } from 'react'

export const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
export const mousedownEvent = isTouchDevice ? 'touchstart' : 'mousedown'

const PORTAL_SPACING_RATE = 4 / 5
const DEFAULT_PORTAL_OPTIONS = {
  top: 0,
  bottom: 0,
  leading: 0,
  trailing: 0
}

export interface PortalOptions {
  top?: number
  bottom?: number
  leading?: number
  trailing?: number
}

export function portalStyle(rect: DOMRect, customOptions?: PortalOptions): CSSProperties {
  let styles: CSSProperties = {}

  const options = {
    ...DEFAULT_PORTAL_OPTIONS,
    ...customOptions
  }
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight

  const top = rect.top + rect.height
  const left = rect.left
  console.log('rect', rect)

  if (top > windowHeight * PORTAL_SPACING_RATE) {
    styles = {
      left: rect.left,
      bottom: windowHeight - rect.top,
      maxHeight: rect.top - options.top
    }
  } else {
    styles = {
      top,
      left: rect.left,
      maxHeight: windowHeight - top - options.bottom
    }
  }

  if (left > windowWidth * PORTAL_SPACING_RATE) {
    styles.maxWidth = rect.left - options.leading
  } else {
    styles.maxWidth = windowWidth - left - options.trailing
  }

  return styles
}
