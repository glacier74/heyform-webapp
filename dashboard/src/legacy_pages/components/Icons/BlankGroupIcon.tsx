import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const BlankGroupIcon: FC<ComponentProps> = props => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="212"
      height="212"
      fill="none"
      viewBox="0 0 212 212"
    >
      <rect width="212" height="212" fill="#6366F1" fillOpacity="0.05" rx="106"></rect>
      <rect
        width="76.302"
        height="47.562"
        x="68"
        y="94.438"
        fill="#6366F1"
        stroke="#6366F1"
        strokeWidth="6"
        rx="7"
      ></rect>
      <rect width="57.492" height="5.914" x="75.435" y="75.427" fill="#6366F1" rx="2"></rect>
      <rect width="41.066" height="5.914" x="83.648" y="59" fill="#6366F1" rx="2"></rect>
      <path
        fill="#fff"
        d="M99.121 120.871a2.999 2.999 0 00-2.121-.879H83a2.999 2.999 0 00-3 3v1.964l.032.44c.648 4.452 4.376 6.6 9.968 6.6s9.316-2.148 9.968-6.6l.032-.432v-1.972c0-.796-.316-1.559-.879-2.121zM129 121.976h-17.992l-.408.028a2.998 2.998 0 00-2.584 3.176 2.998 2.998 0 002.992 2.796H129l.408-.028a3 3 0 00-.408-5.972zM94.243 105.757a6 6 0 10-8.485 8.487 6 6 0 008.485-8.487zM129 107.992h-17.992l-.408.028a2.998 2.998 0 00-2.584 3.176 2.998 2.998 0 002.992 2.796H129l.408-.028a3 3 0 00-.408-5.972z"
      ></path>
    </svg>
  )
}
