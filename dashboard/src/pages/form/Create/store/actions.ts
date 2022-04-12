import { htmlUtils } from '@heyforms/answer-utils'
import type { FormField } from '@heyforms/shared-types-enums'
import { FieldKindEnum, QUESTION_FIELD_KINDS } from '@heyforms/shared-types-enums'
import { clone } from '@hpnp/utils'
import { isArray, isEmpty, isNil, isValid } from '@hpnp/utils/helper'
import { nanoid } from '@hpnp/utils/nanoid'
import type { IState, UpdateFieldPayload } from './context'

function getFieldIndex(fields: FormField[], id: string): number {
  return fields.findIndex(row => row.id === id)
}

export function setFields(state: IState, rawFields: FormField[]): IState {
  let fields: FormField[] = []
  const questions: Partial<FormField>[] = []

  fields = rawFields.map(f => {
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
    ...state,
    fields,
    questions
  }
}

export function selectField(state: IState, selectedId?: string): IState {
  return {
    ...state,
    selectedId,
    selectedField: state.fields.find(f => f.id === selectedId)
  }
}

export function addField(state: IState, field: FormField): IState {
  const fields = [...state.fields]
  let index = fields.findIndex(f => f.kind === FieldKindEnum.THANK_YOU)

  if (isValid(state.selectedId)) {
    index = fields.findIndex(f => f.id === state.selectedId)

    if (fields[index].kind === FieldKindEnum.WELCOME) {
      index = 0
    } else if (fields[index].kind !== FieldKindEnum.THANK_YOU) {
      index += 1
    }
  }

  // Insert new field
  fields.splice(index, 0, field)

  // Reset fields
  const newState = setFields(state, fields)

  // Select new field
  return selectField(newState, field.id)
}

export function duplicateField(state: IState, id: string): IState {
  const field = state.fields.find(f => f.id === id)

  if (!field) {
    return state
  }

  return addField(state, {
    ...clone(field),
    id: nanoid(12)
  })
}

export function updateField(state: IState, { id, updates }: UpdateFieldPayload): IState {
  const fields = [...state.fields]
  const index = getFieldIndex(state.fields, id)

  if (index > -1) {
    fields[index] = {
      ...fields[index],
      ...updates
    }

    // Update the field text which belongs to QUESTION_FIELD_KINDS
    if (!isNil(updates.title) && QUESTION_FIELD_KINDS.includes(fields[index].kind)) {
      const idx = state.questions.findIndex(question => question.id === id)

      if (idx > -1) {
        let title = htmlUtils.plain(updates.title as string)

        if (isEmpty(title)) {
          title = 'Untitled question'
        }

        state.questions[idx] = {
          ...state.questions[idx],
          title
        }

        const regex = new RegExp(`<span[^>]+data-mention="${id}">[^<]+<\\/span>`, 'gi')
        const mention = `<span class="mention" contenteditable="false" data-mention="${id}">@${title}</span>`

        // Update all mention text
        fields.forEach(field => {
          if (field.title) {
            field.title = (field.title as string).replace(regex, mention)
          }
        })
      }
    }
  }

  // Reset fields
  const newState = setFields(state, fields)

  // Select new field
  return selectField(newState, id)
}

export function deleteField(state: IState, fieldId: string): IState {
  // eslint-disable-next-line prefer-const
  let { selectedId, fields } = state
  const index = fields.findIndex(f => f.id === fieldId)

  if (index > -1) {
    selectedId = fields[index - 1]?.id
    fields.splice(index, 1)
  }

  // Reset fields
  const newState = setFields(state, fields)

  // Select new field
  return selectField(newState, selectedId)
}
