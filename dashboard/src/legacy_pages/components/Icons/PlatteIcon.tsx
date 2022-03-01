import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const PlatteIcon: FC<ComponentProps> = props => {
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
        d="M24 44c5.96 0 2.336-8.864 6-13 3.126-3.53 14-1.914 14-7 0-11.046-8.954-20-20-20S4 12.954 4 24s8.954 20 20 20z"
        clipRule="evenodd"
      ></path>
      <path
        fill="currentColor"
        d="M28 17v-2 2zm0-6v2-2zm0 8a5 5 0 004.33-2.5l-3.464-2A1 1 0 0128 15v4zm4.33-2.5a5 5 0 000-5l-3.464 2a1 1 0 010 1l3.464 2zm0-5A5 5 0 0028 9v4a1 1 0 01.866.5l3.464-2zM28 9a5 5 0 00-5 5h4a1 1 0 011-1V9zm-5 5a5 5 0 005 5v-4a1 1 0 01-1-1h-4zm-7 9a5 5 0 005-5h-4a1 1 0 01-1 1v4zm5-5a5 5 0 00-5-5v4a1 1 0 011 1h4zm-5-5a5 5 0 00-5 5h4a1 1 0 011-1v-4zm-5 5a5 5 0 005 5v-4a1 1 0 01-1-1h-4zm6 18a5 5 0 005-5h-4a1 1 0 01-1 1v4zm5-5a5 5 0 00-5-5v4a1 1 0 011 1h4zm-5-5a5 5 0 00-5 5h4a1 1 0 011-1v-4zm-5 5a5 5 0 005 5v-4a1 1 0 01-1-1h-4z"
      ></path>
    </svg>
  )
}
