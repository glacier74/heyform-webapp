import type { MouseEvent } from 'react'

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

export function preventDefault<T = HTMLElement>(event: MouseEvent<T>) {
  event.preventDefault()
}

export function stopPropagation<T = HTMLElement>(event: MouseEvent<T>) {
  event.stopPropagation()
}

export function stopEvent<T = HTMLElement>(event: MouseEvent<T>) {
  preventDefault(event)
  stopPropagation(event)
}
