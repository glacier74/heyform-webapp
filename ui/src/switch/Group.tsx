import clsx from 'clsx'
import type { FC, ReactNode } from 'react'
import Button from '../button/Button'

export interface SwitchGroupProps extends Omit<IComponentProps, 'value' | 'onChange'> {
  value?: IValueType
  options?: IOptionType[]
  disabled?: boolean
  onChange?: (value: IValueType) => void
}

interface GroupItemProps {
  option: IOptionType
  leading?: ReactNode
  isActive?: boolean
  disabled?: boolean
  onClick?: (value: IValueType) => void
}

const GroupItem: FC<GroupItemProps> = ({ option, isActive, disabled, onClick, ...restProps }) => {
  function handleClick() {
    onClick?.(option.value)
  }

  return (
    <Button
      className={clsx('switch-button', {
        'switch-button-active': isActive
      })}
      disabled={disabled}
      leading={option.leading}
      tabIndex={0}
      onClick={handleClick}
      {...restProps}
    >
      {option.label}
    </Button>
  )
}

const Group: FC<SwitchGroupProps> = ({
  className,
  value,
  options,
  disabled,
  onChange,
  ...restProps
}) => {
  return (
    <div className={clsx('switch-group', className)} {...restProps}>
      {options?.map(option => (
        <GroupItem
          key={option.value as string}
          option={option}
          isActive={option.value === value}
          disabled={disabled}
          onClick={onChange}
        />
      ))}
    </div>
  )
}

export default Group
