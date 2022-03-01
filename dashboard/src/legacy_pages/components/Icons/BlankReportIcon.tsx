import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const BlankReportIcon: FC<ComponentProps> = props => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="212"
      height="212"
      fill="none"
      viewBox="0 0 212 212"
    >
      <rect width="212" height="212" fill="#38CB89" fillOpacity="0.05" rx="106"></rect>
      <path
        fill="#38CB89"
        d="M129.682 65.954h-13.887c-3.313 0-6.425 3.768-9.733 3.97a4.032 4.032 0 01-.488 0c-3.307-.202-6.42-3.97-9.733-3.97H81.955c-4.376 0-7.955 3.58-7.955 7.955v63.636c0 4.375 3.58 7.955 7.954 7.955h47.728c4.375 0 7.954-3.58 7.954-7.955V73.909c0-4.375-3.579-7.955-7.954-7.955z"
      ></path>
      <g opacity="0.6">
        <path
          fill="#F5FCF9"
          d="M109.795 65.955a3.988 3.988 0 01-3.977 3.977 3.989 3.989 0 01-3.977-3.977h-13.92v7.954a3.989 3.989 0 003.977 3.977h27.841a3.99 3.99 0 003.977-3.977v-7.954h-13.921z"
        ></path>
        <path
          fill="#38CB89"
          d="M105.818 58c-4.375 0-7.954 3.58-7.954 7.954 0 4.376 3.579 7.955 7.954 7.955s7.955-3.58 7.955-7.955c0-4.374-3.58-7.954-7.955-7.954zm0 11.932a3.99 3.99 0 01-3.977-3.978 3.989 3.989 0 013.977-3.977 3.988 3.988 0 013.977 3.977 3.988 3.988 0 01-3.977 3.978z"
        ></path>
      </g>
      <rect
        width="13"
        height="6"
        x="103"
        y="128"
        fill="#fff"
        rx="2"
        transform="rotate(-90 103 128)"
      ></rect>
      <rect
        width="23"
        height="6"
        x="116"
        y="128"
        fill="#fff"
        rx="2"
        transform="rotate(-90 116 128)"
      ></rect>
      <rect
        width="32"
        height="6"
        x="90"
        y="128"
        fill="#fff"
        rx="2"
        transform="rotate(-90 90 128)"
      ></rect>
    </svg>
  )
}
