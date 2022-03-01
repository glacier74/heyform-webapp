import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const ThumbsUpIcon: FC<ComponentProps> = props => {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
      <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
        <g>
          <path fill="#FFF" fillOpacity="0.01" fillRule="nonzero" d="M0 0L48 0 48 48 0 48z"></path>
          <path fill="#FFF" fillOpacity="0.01" fillRule="nonzero" d="M0 0L48 0 48 48 0 48z"></path>
          <path
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="4"
            d="M27.6 18.6v-7.2A5.4 5.4 0 0022.2 6L15 22.2V42h20.916a3.6 3.6 0 003.6-3.06L42 22.74a3.6 3.6 0 00-3.6-4.14H27.6zM15 22h-4.806C8.085 21.963 6.283 23.71 6 25.8v12.6a4.158 4.158 0 004.194 3.6H15V22z"
          ></path>
        </g>
      </g>
    </svg>
  )
}
