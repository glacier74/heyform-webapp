import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const AddressIcon: FC<ComponentProps> = props => {
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
        d="M24 44s15-12 15-25c0-8.284-6.716-15-15-15-8.284 0-15 6.716-15 15 0 13 15 25 15 25z"
        clipRule="evenodd"
      ></path>
      <path
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M24 25a6 6 0 100-12 6 6 0 000 12v0z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}
