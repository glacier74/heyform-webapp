import { ComponentProps } from '@heyui/component'
import { FC } from 'react'

export const EyeCloseIcon: FC<ComponentProps> = props => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      fill="none"
      viewBox="0 0 48 48"
    >
      <path fill="#fff" fillOpacity="0.01" d="M0 0h48v48H0V0z"></path>
      <path
        fill="currentColor"
        d="M7.774 15.077a2 2 0 10-3.548 1.846l3.548-1.846zm1.049 4.278l1.268-1.547-1.268 1.547zm30.354 0l-1.267-1.547 1.267 1.547zm4.597-2.432a2 2 0 00-3.548-1.846l3.548 1.846zm-12.864 6.56a2 2 0 10-3.864 1.034l3.864-1.034zm-1.794 8.762a2 2 0 103.864-1.035l-3.864 1.035zm9.651-12.305a2 2 0 10-2.828 2.828l2.828-2.828zm2.829 8.484a2 2 0 102.828-2.828l-2.828 2.828zm-38.01-2.828a2 2 0 102.828 2.828l-2.828-2.828zm8.485-2.828a2 2 0 10-2.828-2.828l2.828 2.828zm2.925 8.441a2 2 0 103.864 1.036l-3.864-1.035zm5.934-6.692a2 2 0 10-3.864-1.034l3.864 1.034zM4.226 16.923c.782 1.503 1.934 2.836 3.33 3.98l2.534-3.095c-1.058-.867-1.828-1.794-2.316-2.731l-3.548 1.846zm3.329 3.979C11.433 24.08 17.437 26 24 26v-4c-5.88 0-10.913-1.735-13.909-4.192l-2.536 3.094zM24 26c6.563 0 12.566-1.919 16.445-5.098l-2.536-3.094C34.912 20.265 29.88 22 24 22v4zm16.444-5.098c1.396-1.143 2.548-2.476 3.33-3.979l-3.548-1.846c-.488.937-1.258 1.864-2.316 2.73l2.534 3.095zm-13.398 3.615l2.07 7.728 3.864-1.035-2.07-7.727-3.864 1.034zm8.893-1.749l5.657 5.656 2.828-2.828-5.657-5.656-2.828 2.828zM6.414 28.424l5.657-5.656-2.828-2.828-5.657 5.656 2.828 2.828zm12.446 3.82l2.07-7.727-3.864-1.034-2.07 7.726 3.864 1.036z"
      ></path>
    </svg>
  )
}
