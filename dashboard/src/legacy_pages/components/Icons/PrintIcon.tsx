import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const PrintIcon: FC<ComponentProps> = props => {
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
        strokeWidth="4"
        d="M38 20V8a2 2 0 00-2-2H12a2 2 0 00-2 2v12"
      ></path>
      <rect width="36" height="22" x="6" y="20" stroke="currentColor" strokeWidth="4" rx="2"></rect>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M20 34h15v8H20v-8z"
        clipRule="evenodd"
      ></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M12 26h3"
      ></path>
    </svg>
  )
}
