import { FieldKindEnum, FormField, QUESTION_FIELD_KINDS } from '@heyforms/shared-types-enums'
import { nanoid } from '@hpnp/utils/nanoid'

export function getFieldFromKind(kind: FieldKindEnum | string): FormField {
  const field: FormField = {
    id: nanoid(12),
    kind: kind as FieldKindEnum,
    title: ''
  }

  if (QUESTION_FIELD_KINDS.includes(field.kind)) {
    field.validations = {
      required: true
    }
    field.properties = {}
  }

  switch (kind) {
    case FieldKindEnum.SINGLE_CHOICE:
      field.properties!.allowMultiple = false
      field.properties!.choiceStyle = 'list'
      field.properties!.choices = [
        {
          id: nanoid(12),
          label: ''
        }
      ]
      break

    case FieldKindEnum.MULTIPLE_CHOICE:
      field.properties!.allowMultiple = true
      field.properties!.choices = [
        {
          id: nanoid(12),
          label: ''
        }
      ]
      break

    case FieldKindEnum.PICTURE_CHOICE:
      // Picture choice can't have any initial value cause every choice must have an image
      field.properties!.choices = []
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
      field.properties!.format = 'YYYY-MM-DD'
      break

    case FieldKindEnum.PHONE_NUMBER:
      field.properties!.defaultCountryCode = 'US'
      break

    case FieldKindEnum.LEGAL_TERMS:
      // @ts-ignore
      field.body = ''
      break
  }

  return field
}

export function duplicateField(field: FormField): FormField {
  return {
    ...field,
    id: nanoid(12)
  }
}
