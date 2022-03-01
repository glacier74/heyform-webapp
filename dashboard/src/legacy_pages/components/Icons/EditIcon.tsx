import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const EditIcon: FC<ComponentProps> = props => {
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
        d="M8 31.68V40h8.362L40 16.352 31.651 8 8 31.68z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}
