import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const SearchIcon: FC<ComponentProps> = props => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      fill="none"
      viewBox="0 0 48 48"
    >
      <path fill="#fff" fillOpacity="0.01" d="M0 0H48V48H0z"></path>
      <path
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M21 38c9.389 0 17-7.611 17-17S30.389 4 21 4 4 11.611 4 21s7.611 17 17 17z"
        clipRule="evenodd"
      ></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M33.222 33.222l8.485 8.485"
      ></path>
    </svg>
  )
}
