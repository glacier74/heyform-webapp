import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const CopyIcon: FC<ComponentProps> = props => {
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
        d="M15 12.432v-4.62C15 6.259 16.008 5 17.25 5h19.5C37.992 5 39 6.26 39 7.813v24.375C39 33.741 37.992 35 36.75 35h-3.736"
      ></path>
      <path
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M28.75 13H9.25C8.007 13.001 7 14.26 7 15.813v24.374c0 .746.237 1.462.66 1.99.421.527.994.823 1.59.823h19.5c1.243 0 2.25-1.26 2.25-2.813V15.814c0-.746-.237-1.462-.659-1.99-.422-.527-.994-.824-1.591-.824h0z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}
