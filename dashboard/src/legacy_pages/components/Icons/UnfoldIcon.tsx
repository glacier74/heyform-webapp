import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const UnfoldIcon: FC<ComponentProps> = props => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      fill="none"
      viewBox="0 0 48 48"
    >
      <path fill="red" fillOpacity="0.01" d="M0 0H48V48H0z"></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M28 9v12h12M22 39V27H10M28 21L43 6M22 27L7 42"
      ></path>
    </svg>
  )
}
