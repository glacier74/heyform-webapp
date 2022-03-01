import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const DownloadIcon: FC<ComponentProps> = props => {
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
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M6 24.008V42h36V24"
      ></path>
      <path
        fill="currentColor"
        d="M34.414 24.414a2 2 0 10-2.828-2.828l2.828 2.828zM24 32l-1.414 1.414a2 2 0 002.828 0L24 32zm-7.586-10.414a2 2 0 10-2.828 2.828l2.828-2.828zM25.992 6a2 2 0 10-4 0h4zm-4 26a2 2 0 104 0h-4zm9.594-10.414l-9 9 2.828 2.828 9-9-2.828-2.828zm-6.172 9l-9-9-2.828 2.828 9 9 2.828-2.828zM21.992 6v26h4V6h-4z"
      ></path>
    </svg>
  )
}
