import { htmlUtils } from '@heyforms/answer-utils'
import type { FormField } from '@heyforms/shared-types-enums'
import { FieldKindEnum, FORM_FIELD_KINDS, QUESTION_FIELD_KINDS } from '@heyforms/shared-types-enums'
import { isArray, isValidArray } from '@hpnp/utils/helper'
import { nanoid } from '@hpnp/utils/nanoid'

// TODO: remove in future
const DISCARD_FIELD_KINDS = ['single_choice', 'dropdown']
const FIELD_KINDS = [...DISCARD_FIELD_KINDS, ...FORM_FIELD_KINDS]

export function serializeFields(rawFields: FormField[]) {
  const questions: Partial<FormField>[] = []
  const fields = rawFields.map(f => {
    if (isArray(f.title)) {
      f.title = htmlUtils.serialize(f.title)
    }

    if (isArray(f.description)) {
      f.description = htmlUtils.serialize(f.description)
    }

    if (QUESTION_FIELD_KINDS.includes(f.kind)) {
      questions.push({
        id: f.id,
        kind: f.kind,
        title: f.title!
      })
    }

    return f
  })

  return {
    questions,
    fields
  }
}

export function initFields(rawFields?: FormField[]) {
  let list = rawFields?.filter(f => FIELD_KINDS.includes(f.kind)) || []

  if (list.length > 0) {
    list = list.map((f: any) => {
      f.title = f.titleSchema || f.title

      if (DISCARD_FIELD_KINDS.includes(f.kind)) {
        f.kind = FieldKindEnum.MULTIPLE_CHOICE
      }

      return f
    })
  }

  const { fields, questions } = serializeFields(list)
  const selectedField = fields[0]
  const selectedId = selectedField?.id

  return {
    fields,
    questions,
    selectedField,
    selectedId
  }
}

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
