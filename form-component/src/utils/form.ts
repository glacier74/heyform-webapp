import { fieldsToValidateRules, htmlUtils, validate } from '@heyforms/answer-utils'
import type { FormField } from '@heyforms/shared-types-enums'
import { FORM_FIELD_KINDS, QUESTION_FIELD_KINDS } from '@heyforms/shared-types-enums'
import { type } from '@hpnp/utils'
import { isArray, isValid, isValidArray } from '@hpnp/utils/helper'

export function parseFields(fields?: FormField[]): FormField[] {
  let filtered = fields?.filter(f => FORM_FIELD_KINDS.includes(f.kind))

  if (!isValidArray(filtered)) {
    return []
  }

  filtered = filtered!.map(f => ({
    ...f,
    // Adapt with old form structure
    title: (f as any).titleSchema || f.title
  }))

  let index = 1

  return filtered!.map(f => {
    if (QUESTION_FIELD_KINDS.includes(f.kind)) {
      f.index = index++
    }

    if (isArray(f.title)) {
      f.title = htmlUtils.serialize(f.title as string[], {
        livePreview: true
      })
    }

    if (isArray(f.description)) {
      f.description = htmlUtils.serialize(f.description as string[], {
        livePreview: true
      })
    }

    return f
  })
}

export function validateFields(fields: FormField[], values: any) {
  const rules = fieldsToValidateRules(fields)

  for (const rule of rules) {
    validate(rule, values[rule.id])
  }
}

export function isFile(arg: any): boolean {
  return isValid(arg) && type(arg) === 'file'
}
