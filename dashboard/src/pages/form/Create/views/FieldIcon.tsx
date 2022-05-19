import { FieldKindEnum } from '@heyforms/shared-types-enums'
import clsx from 'clsx'
import type { FC } from 'react'
import { useMemo } from 'react'
import { FIELD_CONFIGS } from './FieldConfig'

export interface FieldIconProps extends IComponentProps {
  kind: FieldKindEnum
  index?: number | string
  iconOnly?: boolean
}

export const FieldIcon: FC<FieldIconProps> = ({
  kind,
  index,
  iconOnly = true,
  className,
  style: rawStyle,
  ...restProps
}) => {
  const config = useMemo(() => {
    return FIELD_CONFIGS.find(c => c.kind === kind)
  }, [kind])

  const style = useMemo(
    () => ({
      ...rawStyle,
      backgroundColor: config?.backgroundColor,
      color: config?.textColor
    }),
    [config?.backgroundColor, config?.textColor, rawStyle]
  )

  const iconStyle = useMemo(
    () => ({
      color: config?.textColor
    }),
    [config?.textColor]
  )

  return (
    <div
      className={clsx(
        'field-icon flex items-center justify-between rounded h-6 px-1.5',
        {
          'w-12': !iconOnly,
          'w-6': iconOnly
        },
        className
      )}
      style={style}
      {...restProps}
    >
      {config?.icon && <config.icon className="p-0 m-0" style={iconStyle} />}
      {!iconOnly && <span className="text-xs font-bold">{index}</span>}
    </div>
  )
}
