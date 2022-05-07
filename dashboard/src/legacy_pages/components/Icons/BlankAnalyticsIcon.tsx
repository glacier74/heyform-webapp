import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const BlankAnalyticsIcon: FC<ComponentProps> = props => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="212"
      height="212"
      fill="none"
      viewBox="0 0 212 212"
    >
      <rect width="212" height="212" fill="#0252d7" fillOpacity="0.05" rx="106"></rect>
      <rect
        width="76.302"
        height="47.562"
        x="70"
        y="93.438"
        fill="#0252d7"
        stroke="#0252d7"
        strokeWidth="6"
        rx="7"
      ></rect>
      <rect width="57.492" height="5.914" x="77.435" y="74.427" fill="#0252d7" rx="2"></rect>
      <rect width="41.066" height="5.914" x="85.648" y="58" fill="#0252d7" rx="2"></rect>
      <rect
        width="13"
        height="6"
        x="105"
        y="133"
        fill="#fff"
        rx="2"
        transform="rotate(-90 105 133)"
      ></rect>
      <rect
        width="23"
        height="6"
        x="119"
        y="133"
        fill="#fff"
        rx="2"
        transform="rotate(-90 119 133)"
      ></rect>
      <rect
        width="30"
        height="6"
        x="91"
        y="133"
        fill="#fff"
        rx="2"
        transform="rotate(-90 91 133)"
      ></rect>
    </svg>
  )
}
