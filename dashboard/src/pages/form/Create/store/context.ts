import type { FormField } from '@heyforms/shared-types-enums'
import { deepEqual } from 'fast-equals'
import { createContext } from 'react'
import * as actions from './actions'

export interface IState {
  fields: FormField[]
  // Version to detect changes whether we need to sync with server or not
  version: number
  questions: Partial<FormField>[]
  references: Partial<FormField>[]
  // Selected field id
  selectedId?: string

  // Selected field
  selectedField?: FormField
}

interface SetFieldsAction {
  type: 'setFields'
  payload: FormField[]
}

interface SelectFieldAction {
  type: 'selectField'
  payload?: string
}

interface AddFieldAction {
  type: 'addField'
  payload: FormField
}

export interface UpdateFieldPayload {
  id: string
  updates: Partial<FormField>
}

interface UpdateFieldAction {
  type: 'updateField'
  payload: UpdateFieldPayload
}

interface DuplicateFieldAction {
  type: 'duplicateField'
  payload: string
}

interface DeleteFieldAction {
  type: 'deleteField'
  payload: string
}

export type IAction =
  | SetFieldsAction
  | SelectFieldAction
  | AddFieldAction
  | UpdateFieldAction
  | DuplicateFieldAction
  | DeleteFieldAction

export interface IContext {
  state: IState
  dispatch: (action: IAction) => void
}

export const StoreContext = createContext<IContext>({
  state: {} as IState,
  dispatch: () => {}
})

const NO_NEED_SYNC_ACTIONS = ['selectField', 'selectField']

function handleAction(state: IState, action: IAction): IState {
  const result: IState = actions[action.type](state, action.payload as unknown as any)

  if (deepEqual(result, state)) {
    return state
  }

  if (!NO_NEED_SYNC_ACTIONS.includes(action.type)) {
    result.version += 1
  }

  return result
}

export const storeReducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case 'setFields':
    case 'selectField':
    case 'addField':
    case 'duplicateField':
    case 'updateField':
    case 'deleteField':
      return handleAction(state, action)

    default:
      throw new Error('Invalid action type')
  }
}
