import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const LegalTermsIcon: FC<ComponentProps> = props => {
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
        d="M16 22l-6-10-6 10"
      ></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M10 28a6 6 0 006-6H4a6 6 0 006 6v0z"
        clipRule="evenodd"
      ></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M44 22l-6-10-6 10"
      ></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M38 28a6 6 0 006-6H32a6 6 0 006 6v0z"
        clipRule="evenodd"
      ></path>
      <path
        fill="currentColor"
        d="M26 6a2 2 0 10-4 0h4zm-4 36a2 2 0 104 0h-4zM10 10a2 2 0 100 4v-4zm28 4a2 2 0 100-4v4zm-28-4a2 2 0 100 4v-4zm28 4a2 2 0 100-4v4zm0 30a2 2 0 100-4v4zm-28-4a2 2 0 100 4v-4zM22 6v36h4V6h-4zm-12 8h28v-4H10v4zm0 0h28v-4H10v4zm28 26H10v4h28v-4z"
      ></path>
    </svg>
  )
}
