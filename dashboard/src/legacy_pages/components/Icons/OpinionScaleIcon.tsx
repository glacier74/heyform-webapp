import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const OpinionScaleIcon: FC<ComponentProps> = props => {
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
        d="M8 30.95v8.16M19 24v15.071M30 15.961v23.127M41 7.97v31.113"
      ></path>
    </svg>
  )
}
