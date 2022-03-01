import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const SignatureIcon: FC<ComponentProps> = props => {
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
        d="M24 24v-5L39 4l5 5-15 15h-5z"
        clipRule="evenodd"
      ></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M16 24H9a5 5 0 000 10h30a5 5 0 010 10H18"
      ></path>
    </svg>
  )
}
