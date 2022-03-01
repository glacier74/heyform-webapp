import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const ArrowLeftIcon: FC<ComponentProps> = props => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      fill="none"
      viewBox="0 0 48 48"
    >
      <path fill="#fff" fillOpacity="0.01" d="M48 0H0v48h48V0z"></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M11 24.489h27M23.5 37L11 24.5 23.5 12"
      ></path>
    </svg>
  )
}
