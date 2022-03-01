import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const AudienceFillIcon: FC<ComponentProps> = props => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <rect width="24" height="24" fill="currentColor" opacity="0.3" rx="12"></rect>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M5.202 15.866a1.2 1.2 0 111.997-1.332C8.587 16.617 10.225 17.6 12.2 17.6c1.975 0 3.613-.983 5.002-3.066a1.2 1.2 0 111.997 1.332C17.387 18.583 15.025 20 12.2 20c-2.825 0-5.187-1.417-6.998-4.134z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}
