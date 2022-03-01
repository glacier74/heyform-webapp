import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const TipsIcon: FC<ComponentProps> = props => {
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
        d="M44 8H4v30h15l5 5 5-5h15V8z"
        clipRule="evenodd"
      ></path>
      <path
        fill="currentColor"
        d="M26 23a2 2 0 10-4 0h4zm-4 9a2 2 0 104 0h-4zm4-16a2 2 0 10-4 0h4zm-4 1a2 2 0 104 0h-4zm0 6v9h4v-9h-4zm0-7v1h4v-1h-4z"
      ></path>
    </svg>
  )
}
