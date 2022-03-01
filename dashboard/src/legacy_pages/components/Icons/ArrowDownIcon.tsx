import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const ArrowDownIcon: FC<ComponentProps> = props => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="16"
      fill="none"
      viewBox="0 0 28 16"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M26 2L14 14 2 2"
      ></path>
    </svg>
  )
}
