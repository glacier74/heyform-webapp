import type { FC } from 'react'

interface FakeRadioProps extends IComponentProps {
  hotkey?: string
  label: string | number
}

export const FakeRadio: FC<FakeRadioProps> = ({ hotkey, label, ...restProps }) => {
  return (
    <div className="builder-radio" {...restProps}>
      <div className="builder-radio-container">
        <div className="builder-radio-content">
          {hotkey && <div className="builder-radio-hotkey">{hotkey}</div>}
          <div className="builder-radio-label">{label}</div>
        </div>
      </div>
    </div>
  )
}
