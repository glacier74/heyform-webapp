import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const UnderlineIcon: FC<ComponentProps> = props => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="48" height="48" fill="white" fillOpacity="0.01" />
      <path
        d="M8 44H40"
        stroke="#333"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M37 6.09698C37 12.7636 37 15.3333 37 22C37 29.1797 31.1797 35 24 35C16.8203 35 11 29.1797 11 22C11 15.3333 11 12.7636 11 6.09698"
        stroke="#333"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  )
}
