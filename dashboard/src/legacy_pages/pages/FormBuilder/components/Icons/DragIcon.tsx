import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const DragIcon: FC<ComponentProps> = props => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="35"
      fill="none"
      viewBox="0 0 20 35"
    >
      <circle cx="17" cy="3" r="3" fill="currentColor" />
      <circle cx="17" cy="18" r="3" fill="currentColor" />
      <circle cx="17" cy="32" r="3" fill="currentColor" />
      <circle cx="3" cy="3" r="3" fill="currentColor" />
      <circle cx="3" cy="18" r="3" fill="currentColor" />
      <circle cx="3" cy="32" r="3" fill="currentColor" />
    </svg>
  )
}
