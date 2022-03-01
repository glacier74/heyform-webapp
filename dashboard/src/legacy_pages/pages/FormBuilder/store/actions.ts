import { htmlUtils } from '@heyforms/answer-utils'
import {
  EDITABLE_FIELD_KINDS,
  FieldKindEnum,
  FieldSelectionTypeEnum,
  FormField,
  QUESTION_FIELD_KINDS,
  ThankYouPage
} from '@heyforms/shared-types-enums'
import { OptionType } from '@heyui/component'
import { isEmpty, isNil, isValid, isValidArray } from '@hpnp/utils/helper'
import { nanoid } from '@hpnp/utils/nanoid'
import { getFieldFromKind } from '../utils'
import {
  AddChoicePayload,
  AddFieldPayload,
  DeleteChoicePayload,
  FieldsPayload,
  IPayload,
  IState,
  NamePayload,
  ReplaceFieldPayload,
  SelectFieldPayload,
  SetEmbedTriggerPayload,
  UpdateChoicePayload,
  UpdateFieldPayload,
  WelcomePayload
} from './context'

interface ParsedFieldsResult {
  fields: FormField[]
  questions: OptionType[]
}

function getFieldIndex(fields: FormField[], id: string): number {
  return fields.findIndex(row => row.id === id)
}

export function serializeHtmlSchema(htmlString?: string, schema?: any[]): string {
  return (isValid(schema) ? htmlUtils.serialize(schema) : htmlString) || ''
}

export function parseThankYouPage(row?: ThankYouPage): ThankYouPage | undefined {
  if (!row) {
    return
  }

  if (row.titleSchema) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    row.title = serializeHtmlSchema(undefined, row.titleSchema)
    delete row.titleSchema
  }

  if (row.bodySchema) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    row.body = htmlUtils.serialize(row.bodySchema, {
      allowedBlockTags: ['div', 'p', 'br']
    })
    delete row.bodySchema
  }

  return row
}

export function parseFields(fields?: FormField[], startPageNumber = 1): ParsedFieldsResult {
  const result: ParsedFieldsResult = {
    fields: [],
    questions: []
  }

  if (!isValidArray(fields)) {
    result.fields = [getFieldFromKind(FieldKindEnum.TEXT)]
    return result
  }

  // @ts-ignore
  const lastField = fields!.at(-1)

  if (
    !lastField ||
    lastField.kind !== FieldKindEnum.TEXT ||
    (lastField.kind === FieldKindEnum.TEXT && isValidArray(lastField.htmlSchema))
  ) {
    const textField = getFieldFromKind(FieldKindEnum.TEXT)
    fields!.push(textField)
  }

  result.fields = fields!.map((row: FormField) => {
    if (row.titleSchema) {
      row.title = serializeHtmlSchema(row.title, row.titleSchema)
      delete row.titleSchema
    }

    if (row.bodySchema) {
      // @ts-ignore
      row.body = htmlUtils.serialize(row.bodySchema)
      delete row.bodySchema
    }

    // Add a number to page break
    if (FieldKindEnum.PAGE_BREAK === row.kind) {
      row.number = ++startPageNumber
    } else if (QUESTION_FIELD_KINDS.includes(row.kind)) {
      result.questions.push({
        id: row.id,
        kind: row.kind,
        text: htmlUtils.plain(row.title!, 24)
      })
    }

    return row
  })

  return result
}

export function setName(state: IState, payload: NamePayload): IState {
  state.name = payload.name
  return state
}

export function setFields(state: IState, payload: FieldsPayload): IState {
  return {
    ...state,
    ...parseFields(payload.fields)
  }
}

export function addField(state: IState, payload: AddFieldPayload): IState {
  if (payload.afterId) {
    const index = getFieldIndex(state.fields, payload.afterId)
    state.fields.splice(index + 1, 0, payload.field)
  } else {
    state.fields.push(payload.field)
  }

  state = setFields(state, {
    fields: state.fields
  })

  // Trigger the settings popup
  state = setEmbedTrigger(state, { field: payload.field })

  return selectField(state, {
    id: payload.field.id,
    type: FieldSelectionTypeEnum.FOCUS
  })
}

export function selectField(state: IState, payload: SelectFieldPayload): IState {
  if (payload.type !== state.selection.type || payload.id !== state.selection?.id) {
    state.selection = {
      id: payload.id,
      type: payload.type ?? FieldSelectionTypeEnum.FOCUS
    }
  }

  if (isValid(payload.id)) {
    // Setup references for CommandMenu
    let references: OptionType[] = []
    const index = state.fields.findIndex(row => row.id === payload.id!)

    if (index > -1) {
      const fields = state.fields
        .slice(0, index)
        .filter(row => QUESTION_FIELD_KINDS.includes(row.kind))

      if (isValidArray(fields)) {
        references = state.questions.slice(0, fields.length)
      }
    }

    state.references = references
  }

  return state
}

export function clearSelection(state: IState): IState {
  state.selection = {
    id: undefined,
    type: undefined
  }
  return state
}

export function updateField(state: IState, payload: UpdateFieldPayload): IState {
  const index = getFieldIndex(state.fields, payload.id)

  if (index > -1) {
    state.fields[index] = {
      ...state.fields[index],
      ...payload.updates
    }

    // Update the field text which belongs to QUESTION_FIELD_KINDS
    if (!isNil(payload.updates.title) && QUESTION_FIELD_KINDS.includes(state.fields[index].kind)) {
      const idx = state.questions.findIndex(question => question.id === payload.id)

      if (idx > -1) {
        let text = htmlUtils.plain(payload.updates.title, 24)

        if (isEmpty(text)) {
          text = 'Untitled question'
        }

        state.questions[idx] = {
          ...state.questions[idx],
          text
        }

        const regex = new RegExp(`<span[^>]+data-mention="${payload.id}">[^<]+<\\/span>`, 'gi')
        const mention = `<span class="mention" contenteditable="false" data-mention="${payload.id}">@${text}</span>`

        // Update all mention text
        state.fields.forEach(field => {
          if (field.title) {
            field.title = field.title.replace(regex, mention)
          }
        })
      }
    }
  }

  return state
}

export function duplicateField(state: IState, payload: IPayload): IState {
  const index = state.fields.findIndex(field => field.id === payload.id)
  let field = state.fields[index]

  if (index > -1) {
    // Duplicate field
    field = {
      ...field,
      id: nanoid(12)
    }
    state.fields.splice(index + 1, 0, field)
  }

  state = setFields(state, {
    fields: state.fields
  })

  // Trigger the settings popup
  state = setEmbedTrigger(state, { field })

  return selectField(state, {
    id: field.id,
    type: FieldSelectionTypeEnum.FOCUS
  })
}

export function replaceField(state: IState, payload: ReplaceFieldPayload) {
  const index = getFieldIndex(state.fields, payload.replaceId)

  if (index > -1) {
    state.fields[index] = payload.field
  }

  state = selectField(state, {
    id: payload.field.id,
    type: FieldSelectionTypeEnum.FOCUS
  })

  return setFields(state, {
    fields: state.fields
  })
}

export function deleteField(state: IState, payload: IPayload): IState {
  let index = getFieldIndex(state.fields, payload.id)

  state.fields.splice(index, 1)
  state = setFields(state, {
    fields: state.fields
  })

  index = Math.max(index - 1, 0)

  return selectField(state, {
    id: state.fields[index].id,
    type: FieldSelectionTypeEnum.PREVIOUS
  })
}

export function selectPrevious(state: IState, payload: IPayload): IState {
  const index = getFieldIndex(state.fields, payload.id)

  if (index > -1) {
    const previous = state.fields
      .slice(0, index)
      .filter(row => EDITABLE_FIELD_KINDS.includes(row.kind))
      // @ts-ignore
      .at(-1)

    if (previous) {
      state = selectField(state, {
        id: previous.id,
        type: FieldSelectionTypeEnum.PREVIOUS
      })
    }
  }

  return state
}

export function selectNext(state: IState, payload: IPayload): IState {
  const index = getFieldIndex(state.fields, payload.id)

  if (index > -1) {
    const next = state.fields
      .slice(index + 1)
      .filter(row => EDITABLE_FIELD_KINDS.includes(row.kind))
      // @ts-ignore
      .at(0)

    if (next) {
      state = selectField(state, {
        id: next.id,
        type: FieldSelectionTypeEnum.NEXT
      })
    }
  }

  return state
}

export function setEmbedTrigger(state: IState, payload: SetEmbedTriggerPayload): IState {
  if (payload.field.kind === FieldKindEnum.IMAGE || payload.field.kind === FieldKindEnum.EMBED) {
    state.embedTrigger = payload.field.id
  }

  return state
}

export function clearEmbedTrigger(state: IState): IState {
  state.embedTrigger = undefined
  return state
}

export function addChoice(state: IState, payload: AddChoicePayload): IState {
  const fieldIndex = getFieldIndex(state.fields, payload.id)

  if (fieldIndex > -1) {
    const field = state.fields[fieldIndex]
    const choices = field.properties?.choices || []

    if (isValidArray(choices) && payload.insertAt) {
      choices.splice(payload.insertAt, 0, payload.choice)
    } else {
      choices.push(payload.choice)
    }

    state.fields[fieldIndex].properties = {
      ...field.properties,
      choices
    }
  }

  return state
}

export function updateChoice(state: IState, payload: UpdateChoicePayload): IState {
  const fieldIndex = getFieldIndex(state.fields, payload.id)

  if (fieldIndex > -1) {
    const field = state.fields[fieldIndex]
    const choices = field.properties?.choices || []

    if (isValidArray(choices) && payload.index > -1) {
      choices[payload.index] = payload.choice
    }

    state.fields[fieldIndex].properties = {
      ...field.properties,
      choices
    }
  }

  return state
}

export function deleteChoice(state: IState, payload: DeleteChoicePayload): IState {
  const fieldIndex = getFieldIndex(state.fields, payload.id)

  if (fieldIndex > -1) {
    const field = state.fields[fieldIndex]
    const choices = field.properties?.choices || []

    if (isValidArray(choices) && payload.index > -1) {
      choices.splice(payload.index, 1)
    }

    state.fields[fieldIndex].properties = {
      ...field.properties,
      choices
    }
  }

  return state
}

export function setWelcome(state: IState, payload: WelcomePayload): IState {
  state.welcome = payload.data
  return state
}

export function updateWelcome(state: IState, payload: WelcomePayload): IState {
  state.welcome = {
    ...state.welcome,
    ...payload.data
  }
  return state
}

export function deleteWelcome(state: IState): IState {
  state.welcome = undefined
  return state
}

export function setThankYou(state: IState, payload: WelcomePayload): IState {
  state.thankYou = payload.data
  return state
}

export function updateThankYou(state: IState, payload: WelcomePayload): IState {
  state.thankYou = {
    ...state.thankYou,
    ...payload.data
  }
  return state
}

export function deleteThankYou(state: IState): IState {
  state.thankYou = undefined
  return state
}
