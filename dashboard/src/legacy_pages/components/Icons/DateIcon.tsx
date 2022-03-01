import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const DateIcon: FC<ComponentProps> = props => {
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
        fill="currentColor"
        d="M5 19v-2a2 2 0 00-2 2h2zm38 0h2a2 2 0 00-2-2v2zm0 0v2a2 2 0 002-2h-2zM5 19H3a2 2 0 002 2v-2zm0 2h38v-4H5v4zm36-2v22h4V19h-4zm0 22v4a4 4 0 004-4h-4zm0 0H7v4h34v-4zM7 41H3a4 4 0 004 4v-4zm0 0V19H3v22h4zm0-31V6a4 4 0 00-4 4h4zm0 0h34V6H7v4zm34 0h4a4 4 0 00-4-4v4zm0 0v9h4v-9h-4zm2 7H5v4h38v-4zM7 19v-9H3v9h4z"
      ></path>
      <path
        fill="currentColor"
        d="M18 5a2 2 0 10-4 0h4zm-4 8a2 2 0 104 0h-4zm20-8a2 2 0 10-4 0h4zm-4 8a2 2 0 104 0h-4zM14 5v8h4V5h-4zm16 0v8h4V5h-4z"
      ></path>
    </svg>
  )
}
