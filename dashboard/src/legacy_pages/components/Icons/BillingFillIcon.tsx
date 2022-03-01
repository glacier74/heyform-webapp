import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const BillingFillIcon: FC<ComponentProps> = props => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M2.4 2h19.2C22.925 2 24 3.12 24 4.5v15c0 1.38-1.075 2.5-2.4 2.5H2.4C1.075 22 0 20.88 0 19.5v-15C0 3.12 1.075 2 2.4 2z"
        clipRule="evenodd"
        opacity="0.3"
      ></path>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M19.8 11.4H4.2a1.8 1.8 0 00-1.8 1.8v.6h5.503a1.2 1.2 0 01.848.351l1.2 1.2a2.897 2.897 0 004.098 0l1.2-1.2a1.2 1.2 0 01.848-.351H21.6v-.6a1.8 1.8 0 00-1.8-1.8zM4.2 5.4a1.8 1.8 0 00-1.8 1.8v.6h19.2v-.6a1.8 1.8 0 00-1.8-1.8H4.2z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}
