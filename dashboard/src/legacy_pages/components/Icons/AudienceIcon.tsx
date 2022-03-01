import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const AudienceIcon: FC<ComponentProps> = props => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      fill="none"
      viewBox="0 0 48 48"
    >
      <path
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20z"
        clipRule="evenodd"
      ></path>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12.336 29.11a2 2 0 113.328-2.22C17.978 30.363 20.71 32 24 32c3.291 0 6.022-1.638 8.336-5.11a2 2 0 113.328 2.22C32.644 33.637 28.71 36 24 36s-8.645-2.362-11.664-6.89z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}
