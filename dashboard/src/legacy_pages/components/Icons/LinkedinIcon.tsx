import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const LinkedinIcon: FC<ComponentProps> = props => {
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
        fill="currentColor"
        fillRule="evenodd"
        d="M8.8 13.653c-2.649 0-4.8-2.195-4.8-4.844 0-2.649 2.151-4.8 4.8-4.8s4.8 2.151 4.8 4.8c.009 2.649-2.142 4.844-4.8 4.844zM12.951 44H4.658V17.298h8.293V44zm22.765 0H44V29.333c0-7.182-1.547-12.71-9.929-12.702-4.035 0-6.738 2.213-7.849 4.311h-.115v-3.644H18.15V44h8.285V30.765c0-3.476.657-6.845 4.968-6.845 4.25 0 4.312 3.973 4.312 7.076V44z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}
