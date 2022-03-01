import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const CloudIcon: FC<ComponentProps> = props => {
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
        d="M13.045 20C13.55 14.393 18.262 10 24 10s10.45 4.393 10.955 10H35a9 9 0 110 18H13a9 9 0 110-18h.045z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}
