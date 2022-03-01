import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const RefreshIcon: FC<ComponentProps> = props => {
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
        d="M40.12 16C37.175 10.073 31.06 6 23.991 6 16.924 6 10.945 10.073 8 16M8 8v8M14.78 16H8M8 32c2.945 5.927 9.061 10 16.129 10 7.067 0 13.046-4.073 15.991-10M40.12 40v-8M33.34 32h6.78"
      ></path>
    </svg>
  )
}
