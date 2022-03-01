import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const LinkIcon: FC<ComponentProps> = props => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.97 8.502a5.273 5.273 0 0 1 2.062 8.184l-2.986 3.688a5.273 5.273 0 1 1-8.196-6.636l2.857-3.528.09.866a3.68 3.68 0 0 0 .59 1.646L5.49 15.066a3.164 3.164 0 0 0 4.917 3.982l2.986-3.688a3.164 3.164 0 0 0-1.848-5.096l1.425-1.76Zm-1.59 6.65a5.273 5.273 0 0 1-2.062-8.184l2.987-3.689A5.273 5.273 0 0 1 20.5 9.916l-2.856 3.527-.091-.866a3.675 3.675 0 0 0-.589-1.646l1.897-2.342a3.164 3.164 0 1 0-4.917-3.982l-2.987 3.688a3.164 3.164 0 0 0 1.849 5.096l-1.426 1.76Z"
        fill="currentColor"
      />
    </svg>
  )
}
