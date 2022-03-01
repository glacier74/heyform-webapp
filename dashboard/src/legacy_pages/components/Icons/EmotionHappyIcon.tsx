import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const EmotionHappyIcon: FC<ComponentProps> = props => {
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
        strokeLinejoin="round"
        strokeWidth="4"
        d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20z"
        clipRule="evenodd"
      ></path>
      <path
        fill="currentColor"
        d="M33 18a2 2 0 10-4 0h4zm-4 1a2 2 0 104 0h-4zm-10-1a2 2 0 10-4 0h4zm-4 1a2 2 0 104 0h-4zm17.789 12.894a2 2 0 00-3.578-1.788l3.578 1.788zm-14-1.788a2 2 0 00-3.578 1.788l3.578-1.788zM29 18v1h4v-1h-4zm-14 0v1h4v-1h-4zm16 13c-1.789-.894-1.788-.895-1.788-.896v-.002l.002-.003a.25.25 0 00.006-.01c0-.003 0-.001-.002.003a4.51 4.51 0 01-.24.377 6.196 6.196 0 01-.932 1.036C27.21 32.25 25.914 33 24 33v4c3.086 0 5.291-1.25 6.704-2.505.698-.62 1.203-1.241 1.537-1.714a8.496 8.496 0 00.494-.784 3.344 3.344 0 00.045-.086l.005-.009.002-.004.001-.002s0-.002-1.788-.896zm-7 2c-1.914 0-3.209-.75-4.046-1.495a6.196 6.196 0 01-.931-1.036 4.51 4.51 0 01-.24-.377c-.003-.004-.004-.006-.003-.003a.135.135 0 01.008.015s0 .002-1.788.896c-1.789.894-1.788.895-1.788.896l.001.002a.15.15 0 00.002.004l.005.01a2.143 2.143 0 00.045.085 8.496 8.496 0 00.493.784c.335.473.84 1.093 1.538 1.714C18.71 35.75 20.914 37 24 37v-4z"
      ></path>
    </svg>
  )
}
