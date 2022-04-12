import type { FormField } from '@heyforms/shared-types-enums'
import { FieldKindEnum } from '@heyforms/shared-types-enums'
import { nanoid } from '@hpnp/utils/nanoid'

export function getFieldFromKind(kind: FieldKindEnum | string): FormField {
  const field: FormField = {
    id: nanoid(12),
    kind: kind as FieldKindEnum,
    title: '',
    description: '',
    validations: {},
    properties: {}
  }

  switch (kind) {
    case FieldKindEnum.MULTIPLE_CHOICE:
    case FieldKindEnum.PICTURE_CHOICE:
      field.properties!.allowMultiple = false
      field.properties!.choices = [
        {
          id: nanoid(12),
          label: ''
        }
      ]
      break

    case FieldKindEnum.RATING:
      field.properties!.total = 5
      field.properties!.shape = 'star'
      break

    case FieldKindEnum.OPINION_SCALE:
      field.properties!.total = 10
      break

    case FieldKindEnum.YES_NO:
      field.properties!.choices = [
        {
          id: nanoid(12),
          label: 'Yes'
        },
        {
          id: nanoid(12),
          label: 'No'
        }
      ]
      break

    case FieldKindEnum.DATE:
      field.properties!.format = 'MM/DD/YYYY'
      break

    case FieldKindEnum.PHONE_NUMBER:
      field.properties!.defaultCountryCode = 'US'
      break

    case FieldKindEnum.WELCOME:
    case FieldKindEnum.STATEMENT:
      field.properties!.buttonText = 'Next'
      break

    case FieldKindEnum.THANK_YOU:
      field.properties!.buttonText = 'Create a heyform'
      break
  }

  return field
}
