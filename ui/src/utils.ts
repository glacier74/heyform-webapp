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
  VOID = 229,
  A = 65
}

export function preventDefault(event: any) {
  event.preventDefault()
}

export function stopPropagation(event: any) {
  event.stopPropagation()
}

export function stopEvent(event: any) {
  preventDefault(event)
  stopPropagation(event)
}
