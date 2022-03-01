import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const ChatIcon: FC<ComponentProps> = props => {
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
        d="M33 38H22v-8h14v-8h8v16h-5l-3 3-3-3z"
        clipRule="evenodd"
      ></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M4 6h32v24H17l-4 4-4-4H4V6z"
        clipRule="evenodd"
      ></path>
      <path
        fill="currentColor"
        d="M19 16a2 2 0 100 4v-4zm1 4a2 2 0 100-4v4zm6-4a2 2 0 100 4v-4zm1 4a2 2 0 100-4v4zm-15-4a2 2 0 100 4v-4zm1 4a2 2 0 100-4v4zm6 0h1v-4h-1v4zm7 0h1v-4h-1v4zm-14 0h1v-4h-1v4z"
      ></path>
    </svg>
  )
}
