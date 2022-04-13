import clsx from 'clsx'
import type { FC, ReactNode } from 'react'

interface SubmitProps {
  className?: string
  visible?: boolean
  text?: string
  icon?: ReactNode
  helper?: ReactNode
  disabled?: boolean
  onClick?: () => void
}

export const Submit: FC<SubmitProps> = ({
  className,
  text = 'Next',
  icon,
  helper,
  disabled,
  onClick
}) => {
  return (
    <div className={clsx('heyform-submit-container', className)}>
      <button className="heyform-submit-button" type="submit" disabled={disabled} onClick={onClick}>
        <span>{text}</span>
        {icon}
      </button>
      {helper}
    </div>
  )
}
