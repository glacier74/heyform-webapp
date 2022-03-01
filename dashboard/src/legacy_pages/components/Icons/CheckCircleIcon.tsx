import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const CheckCircleIcon: FC<ComponentProps> = props => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      fill="none"
      viewBox="0 0 48 48"
    >
      <path fill="#fff" fillOpacity="0.01" d="M0 0H48V48H0z"></path>
      <path
        fill="currentColor"
        d="M24 46a21.931 21.931 0 0015.556-6.444A21.931 21.931 0 0046 24a21.931 21.931 0 00-6.444-15.556A21.931 21.931 0 0024 2 21.931 21.931 0 008.444 8.444 21.931 21.931 0 002 24a21.931 21.931 0 006.444 15.556A21.931 21.931 0 0024 46z"
      ></path>
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M15.2 24l6.6 6.6L35 17.4"
      ></path>
    </svg>
  )
}
