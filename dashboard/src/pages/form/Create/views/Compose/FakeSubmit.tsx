import type { FC, ReactNode } from 'react'

interface FakeSubmitProps extends IComponentProps {
  text?: string
  icon?: ReactNode
}

export const FakeSubmit: FC<FakeSubmitProps> = ({ text, icon, ...restProps }) => {
  return (
    <div className="builder-submit-container" {...restProps}>
      <div className="builder-submit-button">
        <span>{text}</span>
        {icon}
      </div>
    </div>
  )
}
