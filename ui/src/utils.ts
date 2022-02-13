import type { CSSProperties } from 'react'

export const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
export const mousedownEvent = isTouchDevice ? 'touchstart' : 'mousedown'

export const CSSTransitionTimeout = {
  enter: 100,
  exit: 100
}

export interface PopupStylesOptions {
  stretch?: boolean
  top?: number
  bottom?: number
  leading?: number
  trailing?: number
}

const POPUP_SPACING_RATE = 4 / 5
const POPUP_DEFAULT_OPTIONS: PopupStylesOptions = {
  stretch: false,
  top: 48,
  bottom: 48,
  leading: 48,
  trailing: 48
}

export function popupStyles(rect: DOMRect, customOptions?: PopupStylesOptions): CSSProperties {
  let styles: CSSProperties = {}
  const options = {
    ...POPUP_DEFAULT_OPTIONS,
    ...customOptions
  }

  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight

  const top = rect.top + rect.height
  const left = rect.left

  if (top > windowHeight * POPUP_SPACING_RATE) {
    styles = {
      left: rect.left,
      bottom: windowHeight - rect.top,
      maxHeight: rect.top - options.top!
    }
  } else {
    styles = {
      top,
      left: rect.left,
      maxHeight: windowHeight - top - options.bottom!
    }
  }

  if (options.stretch) {
    styles.width = rect.width
  } else {
    if (left > windowWidth * POPUP_SPACING_RATE) {
      styles.maxWidth = rect.left - options.leading!
    } else {
      styles.maxWidth = windowWidth - left - options.trailing!
    }
  }

  return styles
}
