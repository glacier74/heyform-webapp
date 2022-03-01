import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const ThemeIcon: FC<ComponentProps> = props => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      fill="none"
      viewBox="0 0 48 48"
    >
      <path
        fill="#fff"
        fillOpacity="0.01"
        fillRule="evenodd"
        d="M0 0h48v48H0V0z"
        clipRule="evenodd"
      ></path>
      <path
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M18 6a6 6 0 0012 0h5.455L42 15.818l-5.727 4.91V42H11.727V20.727L6 15.818 12.545 6H18z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}
