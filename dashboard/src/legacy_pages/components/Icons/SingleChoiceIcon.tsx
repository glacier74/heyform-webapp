import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const SingleChoiceIcon: FC<ComponentProps> = props => {
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
      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4"></circle>
      <circle
        cx="24"
        cy="24"
        r="4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
      ></circle>
    </svg>
  )
}
