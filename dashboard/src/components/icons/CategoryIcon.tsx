import type { FC } from 'react'

export const CategoryIcon: FC<IComponentProps<HTMLOrSVGElement>> = props => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M19 14H5C3.89543 14 3 14.8954 3 16V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V16C21 14.8954 20.1046 14 19 14Z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M19 3.5H5C3.89543 3.5 3 4.39543 3 5.5V8.5C3 9.60457 3.89543 10.5 5 10.5H19C20.1046 10.5 21 9.60457 21 8.5V5.5C21 4.39543 20.1046 3.5 19 3.5Z"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
)
