import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const SpinIcon: FC<ComponentProps> = props => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="44"
      height="44"
      fill="none"
      viewBox="0 0 44 44"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M2 22c0 11.046 8.954 20 20 20s20-8.954 20-20S33.046 2 22 2"
      ></path>
    </svg>
  )
}
