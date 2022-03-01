import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const ExpandIcon: FC<ComponentProps> = props => {
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
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M30 6h12v12M18 42H6V30M42 6L29 19M19 29L6 42"
      ></path>
    </svg>
  )
}
