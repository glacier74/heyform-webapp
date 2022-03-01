// @ts-ignore
import { COLOR_PALETTE } from '@heyui/component/esm/constants'

export function randomColor(): string {
  const len = COLOR_PALETTE.length
  const idx = Math.ceil(Math.random() * len)
  return COLOR_PALETTE[idx]
}
