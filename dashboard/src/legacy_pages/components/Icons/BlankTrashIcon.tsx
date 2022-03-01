import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const BlankTrashIcon: FC<ComponentProps> = props => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="212"
      height="212"
      fill="none"
      viewBox="0 0 212 212"
    >
      <rect width="212" height="212" fill="#8a94a6" fillOpacity="0.05" rx="106"></rect>
      <path
        fill="#8a94a6"
        d="M81.21 86.053v52.631c0 3.579 2.737 6.316 6.316 6.316h37.895c3.579 0 6.316-2.737 6.316-6.316V86.053H81.211z"
      ></path>
      <path
        fill="#8a94a6"
        d="M114.895 71.316V69.21a4.223 4.223 0 00-4.211-4.21h-8.421a4.223 4.223 0 00-4.21 4.21v2.106H79.105c-1.263 0-2.105.842-2.105 2.105v2.105c0 1.264.842 2.106 2.105 2.106h54.737c1.263 0 2.105-.843 2.105-2.106v-2.105c0-1.263-.842-2.105-2.105-2.105h-18.947z"
        opacity="0.3"
      ></path>
    </svg>
  )
}
