import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const UploadIcon: FC<ComponentProps> = props => {
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
      <mask
        id="mask0"
        style={{ maskType: 'alpha' }}
        width="48"
        height="48"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
      >
        <path fill="#fff" fillRule="evenodd" d="M0 0h48v48H0V0z" clipRule="evenodd"></path>
      </mask>
      <g mask="url(#mask0)">
        <path
          fill="currentColor"
          d="M8 24.008a2 2 0 10-4 0h4zM6 42H4a2 2 0 002 2v-2zm36 0v2a2 2 0 002-2h-2zm2-18a2 2 0 10-4 0h4zm-12.414-7.586a2 2 0 102.828-2.828l-2.828 2.828zM24 6l1.414-1.414a2 2 0 00-2.828 0L24 6zm-10.414 7.586a2 2 0 102.828 2.828l-2.828-2.828zM21.992 32a2 2 0 104 0h-4zm4-26a2 2 0 10-4 0h4zM4 24.008V42h4V24.008H4zM6 44h36v-4H6v4zm38-2V24h-4v18h4zm-9.586-28.414l-9-9-2.828 2.828 9 9 2.828-2.828zm-11.828-9l-9 9 2.828 2.828 9-9-2.828-2.828zM25.992 32V6h-4v26h4z"
        ></path>
      </g>
    </svg>
  )
}
