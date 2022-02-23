import type { CSSProperties } from 'react'

export const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
export const mousedownEvent = isTouchDevice ? 'touchstart' : 'mousedown'

export enum KeyCode {
  BACKSPACE = 8,
  TAB = 9,
  ENTER = 13,
  ESC = 27,
  SPACE = 32,
  LEFT = 37,
  UP = 38,
  RIGHT = 39,
  DOWN = 40,
  DELETE = 46,
  VOID = 229
}

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
