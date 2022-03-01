export const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
export const mousedownEvent = isTouchDevice ? 'touchstart' : 'mousedown'
