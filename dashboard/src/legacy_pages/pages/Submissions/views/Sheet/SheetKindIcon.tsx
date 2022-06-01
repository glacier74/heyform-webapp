import { CUSTOM_FIELDS_CONFIGS, FIELD_CONFIGS } from '@/pages/form/Create/views/FieldConfig'
import { FC, useMemo } from 'react'
import { SheetKindIconProps } from './types'

const configs = [...FIELD_CONFIGS, ...CUSTOM_FIELDS_CONFIGS]

export const SheetKindIcon: FC<SheetKindIconProps> = ({ kind }) => {
  const config = useMemo(() => configs.find(c => c.kind === kind)!, [kind])

  return (
    <config.icon
      className="rounded"
      style={{
        backgroundColor: config?.backgroundColor,
        color: config?.textColor
      }}
    />
  )
}
