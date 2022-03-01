import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const LinkIcon: FC<ComponentProps> = props => {
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
        d="M30 19H20a8 8 0 100 16h16a8 8 0 006-13.292"
      ></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M6 24.292A8 8 0 0112 11h16a8 8 0 010 16H18"
      ></path>
    </svg>
  )
}
