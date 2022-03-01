import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const EmailAtIcon: FC<ComponentProps> = props => {
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
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M44 24c0-11.046-8.954-20-20-20S4 12.954 4 24s8.954 20 20 20v0c4.989 0 9.55-1.827 13.054-4.847"
      ></path>
      <path
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M24 32a8 8 0 100-16 8 8 0 000 16z"
        clipRule="evenodd"
      ></path>
      <path
        fill="currentColor"
        d="M34 24a2 2 0 10-4 0h4zm12 0a2 2 0 10-4 0h4zm-16 1a2 2 0 104 0h-4zm4-9a2 2 0 10-4 0h4zm-4 8a8 8 0 008 8v-4a4 4 0 01-4-4h-4zm8 8a8 8 0 008-8h-4a4 4 0 01-4 4v4zm-4-7v-9h-4v9h4z"
      ></path>
    </svg>
  )
}
