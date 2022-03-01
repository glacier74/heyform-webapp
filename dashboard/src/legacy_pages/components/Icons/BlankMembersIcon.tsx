import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const BlankMembersIcon: FC<ComponentProps> = props => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="212"
      height="212"
      fill="none"
      viewBox="0 0 212 212"
    >
      <rect width="212" height="212" fill="#06B6D4" fillOpacity="0.05" rx="106"></rect>
      <path
        fill="#06B6D4"
        fillRule="evenodd"
        d="M82.667 89.333c0 7.364 5.97 13.334 13.333 13.334 7.364 0 13.333-5.97 13.333-13.334S103.364 76 96 76s-13.333 5.97-13.333 13.333zM116 102.667c0 5.523 4.477 10 10 10s10-4.477 10-10-4.477-10-10-10-10 4.477-10 10z"
        clipRule="evenodd"
        opacity="0.3"
      ></path>
      <path
        fill="#06B6D4"
        fillRule="evenodd"
        d="M95.945 109.333c-15.739 0-28.65 8.089-29.943 23.998-.07.866 1.587 2.669 2.423 2.669h55.064c2.504 0 2.543-2.015 2.504-2.667-.977-16.356-14.089-24-30.048-24zM144.186 136h-12.854a33.19 33.19 0 00-6.662-19.998c11.355.124 20.626 5.865 21.324 17.998.028.489 0 2-1.808 2z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}
