import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const PageBreakIcon: FC<ComponentProps> = props => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      fill="none"
      viewBox="0 0 48 48"
    >
      <path fill="#fff" fillOpacity="0.01" d="M0 0h48v48H0V0z"></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M8 6v6h32V6"
      ></path>
      <path stroke="currentColor" strokeLinecap="round" strokeWidth="4" d="M14 24h20"></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M8 42v-6h32v6"
      ></path>
    </svg>
  )
}
