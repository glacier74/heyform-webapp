import type { FormField } from '@/models'
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
  // Parent field id
  parentId?: string

  // Selected field
  selectedField?: FormField
  // Parent field
  parentField?: FormField
}

export interface SetFieldsAction {
  type: 'setFields'
  payload: {
    fields: FormField[]
  }
}

export interface SelectFieldAction {
  type: 'selectField'
  payload: {
    id?: string
    parentId?: string
  }
}

export interface AddFieldAction {
  type: 'addField'
  payload: {
    field: FormField
    parentId?: string
  }
}

export interface UpdateFieldAction {
  type: 'updateField'
  payload: {
    id: string
    updates: Partial<FormField>
  }
}

export interface UpdateNestFieldsAction {
  type: 'updateNestFields'
  payload: {
    id: string
    nestedFields: FormField[]
  }
}

export interface DuplicateFieldAction {
  type: 'duplicateField'
  payload: {
    id: string
    parentId?: string
  }
}

export interface DeleteFieldAction {
  type: 'deleteField'
  payload: {
    id: string
    parentId?: string
  }
}

export type IAction =
  | SetFieldsAction
  | SelectFieldAction
  | AddFieldAction
  | UpdateFieldAction
  | UpdateNestFieldsAction
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

const NO_NEED_SYNC_ACTIONS = ['initFields', 'selectField']

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
    case 'updateNestFields':
    case 'deleteField':
      return handleAction(state, action)

    default:
      throw new Error('Invalid action type')
  }
}
