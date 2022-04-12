import { ChevronDownIcon } from '@heroicons/react/outline'
import type { FC } from 'react'

export const FakeSelect: FC<IComponentProps> = ({ placeholder, ...restProps }) => {
  return (
    <div className="heyform-select" {...restProps}>
      <div className="heyform-select-container">
        <span className="heyform-select-value" placeholder={placeholder} />
        <span className="heyform-select-arrow-icon">
          <ChevronDownIcon />
        </span>
      </div>
    </div>
  )
}
