import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const HandDragIcon: FC<ComponentProps> = props => {
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
        strokeWidth="4"
        d="M9.583 27.183C7.867 28.354 7.009 30.293 7.009 33c0 4.06 4.991 11 9.492 11h11.515c4.405 0 7.08-3.85 7.08-6.94V24.6a3.253 3.253 0 00-3.243-3.253 3.235 3.235 0 00-3.245 3.226v.11"
      ></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="4"
        d="M10.981 29.445V7.663a3.217 3.217 0 116.435 0v15.985"
      ></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M17.416 24v-4.192a2.804 2.804 0 115.608 0v4.62"
      ></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M23 24.658v-2.85a2.804 2.804 0 015.608 0v3.196"
      ></path>
      <path stroke="currentColor" strokeLinecap="round" strokeWidth="4" d="M11 8h30"></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M36 12.5l1.667-1.5L41 8l-3.333-3L36 3.5"
      ></path>
    </svg>
  )
}
