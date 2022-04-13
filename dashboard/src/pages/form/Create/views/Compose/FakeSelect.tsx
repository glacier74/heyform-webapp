import { ChevronDownIcon } from '@heroicons/react/outline'
import type { FC } from 'react'

export const FakeSelect: FC<IComponentProps> = ({ placeholder, ...restProps }) => {
  return (
    <div className="builder-select" {...restProps}>
      <div className="builder-select-container">
        <span className="builder-select-value" placeholder={placeholder} />
        <span className="builder-select-arrow-icon">
          <ChevronDownIcon />
        </span>
      </div>
    </div>
  )
}
