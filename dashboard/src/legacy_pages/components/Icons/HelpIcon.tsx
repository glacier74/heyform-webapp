import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const HelpIcon: FC<ComponentProps> = props => {
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
        d="M24 44a19.937 19.937 0 0014.142-5.858A19.937 19.937 0 0044 24a19.938 19.938 0 00-5.858-14.142A19.937 19.937 0 0024 4 19.938 19.938 0 009.858 9.858 19.938 19.938 0 004 24a19.937 19.937 0 005.858 14.142A19.938 19.938 0 0024 44v0z"
        clipRule="evenodd"
      ></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M24 28.625v-4a6 6 0 10-6-6"
      ></path>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M24 37.625a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}
