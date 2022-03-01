import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const UploadCloudIcon: FC<ComponentProps> = props => {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
      <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
        <g>
          <path fill="#FFF" fillOpacity="0.01" fillRule="nonzero" d="M0 0L48 0 48 48 0 48z"></path>
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
            d="M24.008 41L24 23m16.518 11.316A9.21 9.21 0 0044 24c-1.213-3.83-4.93-5.929-8.947-5.925h-2.321a14.737 14.737 0 10-25.31 13.428"
          ></path>
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
            d="M30.364 27.636L24 21.272 17.636 27.636"
          ></path>
        </g>
      </g>
    </svg>
  )
}
