import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const ImportFormIcon: FC<ComponentProps> = props => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="76"
      height="88"
      fill="none"
      viewBox="0 0 76 88"
    >
      <path
        fill="currentColor"
        d="M75.25 53.125H34.094l8.062-8.094-4.406-4.406L22.125 56.25 37.75 71.875l4.406-4.406-8.062-8.094H75.25v-6.25z"
      ></path>
      <path
        fill="currentColor"
        d="M62.75 37.5V25a3.124 3.124 0 00-.906-2.219L39.969.906A3.124 3.124 0 0037.75 0H6.5A6.25 6.25 0 00.25 6.25v75A6.25 6.25 0 006.5 87.5h50a6.25 6.25 0 006.25-6.25V75H56.5v6.25h-50v-75h25V25a6.25 6.25 0 006.25 6.25H56.5v6.25h6.25zm-25-12.5V7.531l17.469 17.47H37.75z"
        opacity="0.3"
      ></path>
    </svg>
  )
}
