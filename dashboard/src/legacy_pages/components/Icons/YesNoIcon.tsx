import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const YesNoIcon: FC<ComponentProps> = props => {
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
      <circle
        cx="24"
        cy="24"
        r="20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
      ></circle>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M14 41.324C19.978 37.866 24 31.403 24 24c0-7.403-4.022-13.866-10-17.324C8.022 10.134 4 16.597 4 24c0 7.403 4.022 13.866 10 17.324z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}
