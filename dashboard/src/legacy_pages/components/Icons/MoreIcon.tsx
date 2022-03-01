import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const MoreIcon: FC<ComponentProps> = props => {
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
      <circle cx="12" cy="24" r="3" fill="currentColor"></circle>
      <circle cx="24" cy="24" r="3" fill="currentColor"></circle>
      <circle cx="36" cy="24" r="3" fill="currentColor"></circle>
    </svg>
  )
}
