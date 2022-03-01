import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const ClassicFormIcon: FC<ComponentProps> = props => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="88"
      height="88"
      fill="none"
      viewBox="0 0 88 88"
    >
      <path
        fill="currentColor"
        d="M50 28.125h25v6.25H50v-6.25zM12.5 53.125h25v6.25h-25v-6.25z"
        opacity="0.3"
      ></path>
      <path
        fill="currentColor"
        d="M25 43.75a12.5 12.5 0 1112.5-12.5A12.516 12.516 0 0125 43.75zM25 25a6.25 6.25 0 106.25 6.25A6.257 6.257 0 0025 25zM62.5 68.75A12.5 12.5 0 1175 56.25a12.516 12.516 0 01-12.5 12.5zm0-18.75a6.25 6.25 0 106.25 6.25A6.257 6.257 0 0062.5 50z"
      ></path>
      <path
        fill="currentColor"
        d="M81.25 87.5h-75A6.257 6.257 0 010 81.25v-75A6.256 6.256 0 016.25 0h75a6.256 6.256 0 016.25 6.25v75a6.257 6.257 0 01-6.25 6.25zm-75-81.25v75h75v-75h-75z"
        opacity="0.3"
      ></path>
    </svg>
  )
}
