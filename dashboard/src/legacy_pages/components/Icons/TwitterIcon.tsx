import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const TwitterIcon: FC<ComponentProps> = props => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      fill="none"
      viewBox="0 0 48 48"
    >
      <path fill="#fff" fillOpacity="0.01" d="M0 0H48V48H0z"></path>
      <path
        fill="currentColor"
        d="M16.48 40.049c15.095 0 23.35-12.505 23.35-23.35 0-.355-.008-.709-.024-1.061a16.703 16.703 0 004.094-4.249 16.405 16.405 0 01-4.713 1.292 8.234 8.234 0 003.609-4.54 16.426 16.426 0 01-5.211 1.992 8.198 8.198 0 00-5.99-2.592 8.208 8.208 0 00-8.208 8.205c0 .645.072 1.271.212 1.872-6.82-.343-12.868-3.609-16.915-8.574a8.179 8.179 0 00-1.111 4.125 8.201 8.201 0 003.651 6.83 8.154 8.154 0 01-3.716-1.026c-.002.034-.002.069-.002.105a8.21 8.21 0 006.583 8.045 8.226 8.226 0 01-3.705.14 8.215 8.215 0 007.666 5.7 16.47 16.47 0 01-10.192 3.514c-.663 0-1.316-.038-1.958-.114a23.233 23.233 0 0012.58 3.686z"
      ></path>
    </svg>
  )
}