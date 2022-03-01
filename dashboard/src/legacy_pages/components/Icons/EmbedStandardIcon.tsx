import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const EmbedStandardIcon: FC<ComponentProps> = props => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="80"
      fill="none"
      viewBox="0 0 80 80"
    >
      <path fill="#fff" fillOpacity="0.01" d="M0 0h80v80H0V0z"></path>
      <rect width="43.333" height="20" x="18.333" y="30" fill="currentColor" rx="4"></rect>
      <rect
        width="43.333"
        height="6.667"
        x="18.333"
        y="18.333"
        fill="currentColor"
        opacity="0.3"
        rx="2"
      ></rect>
      <rect
        width="43.333"
        height="6.667"
        x="18.333"
        y="55"
        fill="currentColor"
        opacity="0.3"
        rx="2"
      ></rect>
      <path
        stroke="currentColor"
        strokeWidth="4"
        d="M65 10H15a5 5 0 00-5 5v50a5 5 0 005 5h50a5 5 0 005-5V15a5 5 0 00-5-5z"
        clipRule="evenodd"
        opacity="0.3"
      ></path>
    </svg>
  )
}