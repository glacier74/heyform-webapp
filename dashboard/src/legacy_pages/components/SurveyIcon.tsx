import { ComponentProps } from '@heyui/component'
import type { FC } from 'react'

export const SurveyIcon: FC<ComponentProps> = props => {
  return (
    <svg
      width="129"
      height="129"
      viewBox="0 0 129 129"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="64.5" cy="64.5" r="64.5" fill="#E5F1FF" />
      <path
        d="M77.5 40V45H85.0175C86.3875 45 87.5 46.1125 87.5 47.4825V87.5175C87.5 88.8875 86.3875 90 85.0175 90H44.9825C43.6125 90 42.5 88.8875 42.5 87.5175V47.4825C42.5 46.1125 43.6125 45 44.9825 45H52.5V40H77.5ZM52.5 50H47.5V85H82.5V50H77.5V55H52.5V50ZM57.5 75V80H52.5V75H57.5ZM57.5 67.5V72.5H52.5V67.5H57.5ZM57.5 60V65H52.5V60H57.5ZM72.5 45H57.5V50H72.5V45Z"
        fill="#106BF3"
      />
    </svg>
  )
}
