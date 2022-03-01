import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const SettingsIcon: FC<ComponentProps> = props => {
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
        d="M9.588 37.867a6 6 0 00-5.182-9.838A20.089 20.089 0 014 24c0-2.09.32-4.106.916-6H5a6 6 0 005.385-8.65 19.968 19.968 0 018.267-4.627A6 6 0 0024 8a6 6 0 005.348-3.277 19.968 19.968 0 018.267 4.627A6 6 0 0043.084 18 19.99 19.99 0 0144 24c0 1.38-.14 2.728-.406 4.029a6 6 0 00-5.182 9.838 19.994 19.994 0 01-8.696 5.304 6.003 6.003 0 00-11.432 0 19.994 19.994 0 01-8.696-5.304z"
        clipRule="evenodd"
      ></path>
      <path
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M30.062 27.5a7 7 0 10-12.124-7 7 7 0 0012.124 7z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}
