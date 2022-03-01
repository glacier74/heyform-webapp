import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const DeleteIcon: FC<ComponentProps> = props => {
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
        strokeLinejoin="round"
        strokeWidth="4"
        d="M15 12l1.2-7h15.6l1.2 7"
      ></path>
      <path stroke="currentColor" strokeLinecap="round" strokeWidth="4" d="M6 12h36"></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M37 12v31H11V12h26z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}
