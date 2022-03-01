import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const ShortTextIcon: FC<ComponentProps> = props => {
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
        fill="currentColor"
        d="M6 17a2 2 0 100 4v-4zm36 4a2 2 0 100-4v4zM6 27a2 2 0 100 4v-4zm24 4a2 2 0 100-4v4zM6 21h36v-4H6v4zm0 10h24v-4H6v4z"
      ></path>
    </svg>
  )
}
