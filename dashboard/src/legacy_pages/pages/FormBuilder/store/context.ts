import {
  Choice,
  FieldSelection,
  FieldSelectionTypeEnum,
  FormField
} from '@heyforms/shared-types-enums'
import { OptionType } from '@heyui/component'
import { clone } from '@hpnp/utils/clone'
import { deepEqual } from 'fast-equals'
import { createContext } from 'react'
import * as actions from './actions'

interface IWelcome {
  icon?: string
  title?: string
  body?: string
}

export interface IState {
  name?: string
  fields: FormField[]
  welcome?: IWelcome
  thankYou?: IWelcome
  selection: FieldSelection
  version: number
  // Fields which belongs to QUESTION_FIELD_KINDS
  questions: OptionType[]
  // Fields before current block and which is belongs to QUESTION_FIELD_KINDS
  references: OptionType[]
  // Image, Embed and Picture choice which triggered the settings popup
  embedTrigger?: string
}

export interface IPayload {
  id: string
}

export interface FieldsPayload {
  fields: FormField[]
}

export interface AddFieldPayload {
  field: FormField
  afterId?: string
}

export interface SelectFieldPayload {
  id?: string
  type?: FieldSelectionTypeEnum
}

export interface UpdateFieldPayload extends IPayload {
  id: string
  updates: Record<string, any>
}

export interface ReplaceFieldPayload {
  replaceId: string
  field: FormField
}

export interface SetEmbedTriggerPayload {
  field: FormField
}

export interface AddChoicePayload {
  id: string
  choice: Choice
  insertAt?: number
}

export interface DeleteChoicePayload {
  id: string
  index: number
}

export interface UpdateChoicePayload extends DeleteChoicePayload {
  choice: Choice
}

export interface NamePayload {
  name: string
}

export interface WelcomePayload {
  data?: IWelcome
}

export interface IAction {
  type: keyof typeof actions
  payload?:
    | IPayload
    | FieldsPayload
    | AddFieldPayload
    | SelectFieldPayload
    | UpdateFieldPayload
    | ReplaceFieldPayload
    | SetEmbedTriggerPayload
    | AddChoicePayload
    | UpdateChoicePayload
    | DeleteChoicePayload
    | NamePayload
    | WelcomePayload
}

export interface IContext {
  state: IState
  dispatch: (action: IAction) => void
}

export const StoreContext = createContext<IContext>({
  state: {} as any,
  dispatch: () => {}
})

const STATE_ACTION_TYPES = [
  'selectField',
  'clearSelection',
  'selectPrevious',
  'selectNext',
  'setEmbedTrigger',
  'clearEmbedTrigger'
]

function updateState(state: IState, action: IAction): IState {
  const clonedState = clone(state)
  const result: any = actions[action.type](clonedState as any, action.payload as any)
  const newState = deepEqual(result, state) ? state : result

  if (!STATE_ACTION_TYPES.includes(action.type)) {
    newState.version += 1
  }

  return newState
}

export const storeReducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case 'setName':
    case 'setFields':
    case 'selectField':
    case 'clearSelection':
    case 'addField':
    case 'duplicateField':
    case 'replaceField':
    case 'updateField':
    case 'deleteField':
    case 'addChoice':
    case 'updateChoice':
    case 'deleteChoice':
    case 'setWelcome':
    case 'updateWelcome':
    case 'deleteWelcome':
    case 'setThankYou':
    case 'updateThankYou':
    case 'deleteThankYou':
    case 'selectPrevious':
    case 'selectNext':
    case 'setEmbedTrigger':
    case 'clearEmbedTrigger':
      return updateState(state, action)

    default:
      throw new Error()
  }
}
