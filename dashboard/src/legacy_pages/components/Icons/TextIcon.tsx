import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const TextIcon: FC<ComponentProps> = props => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M4 8H32" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M28 21H44" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M18 42L18 8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M36 42L36 21" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}
