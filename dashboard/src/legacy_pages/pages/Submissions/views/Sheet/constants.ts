import { FieldKindEnum } from '@heyforms/shared-types-enums'
import { OptionType } from '@heyui/component'

export const COLUMN_TYPE_OPTIONS: OptionType[] = [
  {
    id: FieldKindEnum.CUSTOM_TEXT,
    label: 'Multiline'
  },
  {
    id: FieldKindEnum.CUSTOM_SINGLE,
    label: 'Single options'
  },
  {
    id: FieldKindEnum.CUSTOM_MULTIPLE,
    label: 'Multiple options'
  }
]
