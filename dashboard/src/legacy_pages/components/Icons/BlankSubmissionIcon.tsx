import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const BlankSubmissionIcon: FC<ComponentProps> = props => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="212"
      height="212"
      fill="none"
      viewBox="0 0 212 212"
    >
      <rect width="212" height="212" fill="#377DFF" fillOpacity="0.05" rx="106"></rect>
      <rect
        width="76.302"
        height="47.562"
        x="68"
        y="96.438"
        fill="#377DFF"
        stroke="#377DFF"
        strokeWidth="6"
        rx="7"
      ></rect>
      <rect width="57.492" height="5.914" x="75.435" y="77.427" fill="#377DFF" rx="2"></rect>
      <rect width="41.066" height="5.914" x="83.648" y="61" fill="#377DFF" rx="2"></rect>
      <rect width="19.6" height="5.914" x="84.798" y="109.294" fill="#fff" rx="2"></rect>
      <rect width="35.279" height="5.914" x="84.798" y="124.973" fill="#fff" rx="2"></rect>
    </svg>
  )
}
