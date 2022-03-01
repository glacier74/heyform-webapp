import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const ShareFillIcon: FC<ComponentProps> = props => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      fill="none"
      viewBox="0 0 48 48"
    >
      <rect width="48" height="48" fill="#B0B7C3" opacity="0.3" rx="24"></rect>
      <path
        stroke="#B0B7C3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3.5"
        d="M21.643 20.578l5.292-5.51c1.452-1.451 3.837-1.42 5.328.072 1.492 1.49 1.523 3.876.072 5.328l-1.91 2.023M16.67 26.215c-.511.51-1.566 1.53-1.566 1.53-1.452 1.45-1.491 4.038 0 5.53 1.49 1.49 3.876 1.522 5.328.07l5.164-4.688"
      ></path>
      <path
        stroke="#B0B7C3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3.5"
        d="M21.866 25.796a3.863 3.863 0 01-1.13-2.473 3.666 3.666 0 011.059-2.855M25.525 23.329c1.49 1.491 1.523 3.877.071 5.328"
      ></path>
    </svg>
  )
}
