import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const AttachmentIcon: FC<ComponentProps> = props => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      fill="none"
      viewBox="0 0 48 48"
    >
      <path
        fill="currentColor"
        d="M22.172 32.071l-2.829-2.828 4.95-4.95a3 3 0 00-4.243-4.243l-7.07 7.071a7 7 0 109.899 9.9L37.02 22.879a7 7 0 000-9.9l-.707-.707a6 6 0 00-8.486 0L25 9.444c3.905-3.906 10.237-3.906 14.142 0l.707.707c4.296 4.296 4.296 11.26 0 15.556L25.707 39.85c-4.296 4.296-11.26 4.296-15.556 0-4.296-4.295-4.296-11.26 0-15.556l7.07-7.071a7 7 0 019.9 9.9l-4.95 4.95z"
      ></path>
    </svg>
  )
}
