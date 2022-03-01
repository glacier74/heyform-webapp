import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const QuoteIcon: FC<ComponentProps> = props => {
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
        fillRule="evenodd"
        d="M18.853 10.116c-7.53 4.836-11.714 10.465-12.55 16.887C5 37 13.94 41.893 18.47 37.497 23 33.1 20.285 27.52 17.005 25.994c-3.28-1.525-5.286-.994-4.936-3.032.35-2.039 5.016-7.69 9.116-10.323a.749.749 0 00.114-1.02L20.285 10.3c-.44-.572-.862-.55-1.432-.185v.001zm19.826 0c-7.53 4.836-11.714 10.465-12.55 16.887-1.303 9.997 7.637 14.89 12.167 10.494 4.53-4.397 1.815-9.977-1.466-11.503-3.28-1.525-5.286-.994-4.936-3.032.35-2.039 5.017-7.69 9.117-10.323a.749.749 0 00.113-1.02L40.11 10.3c-.44-.572-.862-.55-1.431-.185v.001z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}
