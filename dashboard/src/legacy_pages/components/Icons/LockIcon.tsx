import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const LockIcon: FC<ComponentProps> = props => {
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
      <rect
        width="36"
        height="22"
        x="6"
        y="22"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="4"
        rx="2"
      ></rect>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M14 22v-8c0-5.523 4.477-10 10-10s10 4.477 10 10v8"
      ></path>
    </svg>
  )
}
