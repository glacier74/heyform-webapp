import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const FacebookIcon: FC<ComponentProps> = props => {
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
        d="M33.063 26.11l1.1-7.186h-6.891v-4.662c0-1.964.961-3.883 4.05-3.883h3.136V4.263s-2.845-.486-5.564-.486c-5.676 0-9.388 3.44-9.388 9.67v5.477h-6.312v7.186h6.312v17.367c1.265.199 2.562.3 3.883.3 1.321 0 2.618-.105 3.883-.3V26.11h5.791z"
      ></path>
    </svg>
  )
}
