import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const CodeIcon: FC<ComponentProps> = props => {
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
        d="M17.439 14.389a2 2 0 00-2.878-2.778l2.878 2.778zM4 25.432l-1.439-1.389a2 2 0 00.05 2.829L4 25.432zM14.612 38.44a2 2 0 002.776-2.88l-2.776 2.88zM33.439 11.61a2 2 0 00-2.878 2.778l2.878-2.778zM44 25.432l1.388 1.44a2 2 0 00.051-2.829L44 25.432zM30.612 35.56a2 2 0 002.776 2.88l-2.776-2.88zM14.56 11.611l-12 12.432 2.878 2.778 12-12.432-2.878-2.778zm-11.95 15.26l12 11.569 2.777-2.88-12-11.568-2.776 2.88zm27.95-12.482l12 12.432 2.878-2.778-12-12.432-2.878 2.778zm12.05 9.603l-12 11.568 2.777 2.88 12-11.568-2.776-2.88z"
      ></path>
      <path stroke="currentColor" strokeLinecap="round" strokeWidth="4" d="M28 4l-7 40"></path>
    </svg>
  )
}
