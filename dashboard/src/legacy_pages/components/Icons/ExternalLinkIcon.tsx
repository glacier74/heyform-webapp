import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const ExternalLinkIcon: FC<ComponentProps> = props => {
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
        d="M28 4a2 2 0 100 4V4zm14 2h2a2 2 0 00-2-2v2zm-2 14a2 2 0 104 0h-4zm4 9.474a2 2 0 10-4 0h4zM18 8a2 2 0 100-4v4zm6.386 12.786a2 2 0 102.828 2.828l-2.828-2.828zM42.514 8.314a2 2 0 10-2.828-2.828l2.828 2.828zM28 8h14V4H28v4zm12-2v14h4V6h-4zm0 23.474V39h4v-9.526h-4zM40 39a1 1 0 01-1 1v4a5 5 0 005-5h-4zm-1 1H9v4h30v-4zM9 40a1 1 0 01-1-1H4a5 5 0 005 5v-4zm-1-1V9H4v30h4zM8 9a1 1 0 011-1V4a5 5 0 00-5 5h4zm1-1h9V4H9v4zm18.214 15.614l15.3-15.3-2.828-2.828-15.3 15.3 2.828 2.828z"
      ></path>
    </svg>
  )
}
