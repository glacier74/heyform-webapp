import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const MultipleChoiceIcon: FC<ComponentProps> = props => {
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
        strokeWidth="4"
        d="M39 6H9a3 3 0 00-3 3v30a3 3 0 003 3h30a3 3 0 003-3V9a3 3 0 00-3-3z"
        clipRule="evenodd"
      ></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M28 20h-8v8h8v-8z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}
