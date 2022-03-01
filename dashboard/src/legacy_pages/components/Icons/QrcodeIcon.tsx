import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const QrcodeIcon: FC<ComponentProps> = props => {
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
        fill="currentColor"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M20 6H6v14h14V6zM20 28H6v14h14V28zM42 6H28v14h14V6z"
      ></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="4"
        d="M29 28v14M41 28v14"
      ></path>
    </svg>
  )
}
