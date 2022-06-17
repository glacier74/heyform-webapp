import type { FC } from 'react'

export const FreezeIcon: FC<IComponentProps<HTMLOrSVGElement>> = props => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M20 3H4C3.44771 3 3 3.44771 3 4V20C3 20.5523 3.44771 21 4 21H20C20.5523 21 21 20.5523 21 20V4C21 3.44771 20.5523 3 20 3Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path d="M8.06155 3L3 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M9.5 6L3 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M9.5 10.5L3 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M9.5 15L3 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M9.5 3V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)
