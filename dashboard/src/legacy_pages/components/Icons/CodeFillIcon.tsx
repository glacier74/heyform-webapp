import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const CodeFillIcon: FC<ComponentProps> = props => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      fill="none"
      viewBox="0 0 48 48"
    >
      <rect width="48" height="48" fill="#B0B7C3" opacity="0.3" rx="24"></rect>
      <path
        stroke="#B0B7C3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3.5"
        d="M18 18.5l-6 6.216 6 5.784M31 18.5l6 6.216-6 5.784"
      ></path>
      <path stroke="#B0B7C3" strokeLinecap="round" strokeWidth="3.5" d="M26 14l-3.5 20"></path>
    </svg>
  )
}
