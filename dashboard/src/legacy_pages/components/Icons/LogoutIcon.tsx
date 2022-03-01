import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const LogoutIcon: FC<ComponentProps> = props => {
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
        strokeLinejoin="round"
        strokeWidth="4"
        d="M14.5 8a19.05 19.05 0 00-4.75 3.84C6.794 15.146 5 19.49 5 24.245 5 34.603 13.507 43 24 43s19-8.397 19-18.755c0-4.756-1.794-9.099-4.75-12.405A19.02 19.02 0 0033.5 8M24 4v20"
      ></path>
    </svg>
  )
}
