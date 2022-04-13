import { CheckIcon, PhotographIcon } from '@heroicons/react/outline'
import { isURL } from '@hpnp/utils/helper'
import clsx from 'clsx'
import type { FC, ReactNode } from 'react'
import { useKey } from 'react-use'

export interface RadioOption {
  keyName?: string
  label: string
  value: any
  icon?: ReactNode
  image?: string
  enableImage?: boolean
  disabled?: boolean
}

interface RadioProps extends RadioOption, Omit<IComponentProps, 'onClick'> {
  isChecked?: boolean
  isHotkeyShow?: boolean
  onClick?: (value: any) => void
}

export const Radio: FC<RadioProps> = ({
  className,
  keyName,
  image,
  label,
  value,
  icon,
  enableImage,
  isHotkeyShow,
  disabled,
  isChecked,
  onClick,
  ...restProps
}) => {
  function handleClick() {
    if (!disabled) {
      onClick?.(value)
    }
  }

  useKey(keyName?.toLowerCase(), handleClick)

  return (
    <div
      className={clsx(
        'heyform-radio',
        {
          'heyform-radio-selected': isChecked
        },
        className
      )}
      onClick={handleClick}
      {...restProps}
    >
      <div className="heyform-radio-container">
        {enableImage && (
          <div className="heyform-radio-image">
            {isURL(image) ? (
              <img src={image} alt={label} />
            ) : icon ? (
              icon
            ) : (
              <PhotographIcon className="heyform-radio-placeholder" />
            )}
          </div>
        )}
        <div className="heyform-radio-content">
          {keyName && isHotkeyShow && <div className="heyform-radio-hotkey">{keyName}</div>}
          <div className="heyform-radio-label">{label}</div>
        </div>
        {isChecked && (
          <div className="heyform-radio-icon">
            <CheckIcon />
          </div>
        )}
      </div>
    </div>
  )
}
