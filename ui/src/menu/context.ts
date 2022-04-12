import { createContext } from 'react'

interface IState {
  names: IKeyType[]
  highlighted?: IKeyType
  onClick?: (name?: IKeyType) => void
}

interface RegisterAction {
  type: 'register'
  name: IKeyType
}

interface UnregisterAction {
  type: 'unregister'
  name: IKeyType
}

interface HighlightAction {
  type: 'highlight'
  index: number
}

type IAction = RegisterAction | UnregisterAction | HighlightAction

interface IContext {
  state: IState
  dispatch: (action: IAction) => void
}

export const MenusStoreContext = createContext<IContext>({
  state: {
    names: []
  },
  dispatch: () => {}
})

function register(state: IState, name: IKeyType): IState {
  if (state.names.includes(name)) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (import.meta.env.DEV) {
      console.warn(`Menu item "${name}" already registered`)
    }

    return state
  }

  return {
    ...state,
    names: [...state.names, name]
  }
}

function unregister(state: IState, name: IKeyType): IState {
  return {
    ...state,
    highlighted: state.highlighted === name ? undefined : state.highlighted,
    names: state.names.filter(k => k !== name)
  }
}

function highlight(state: IState, index: number) {
  return {
    ...state,
    // TODO: remove comment when we have a better way to void compiler error
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    highlighted: state.names.at(index)
  }
}

export const menusStoreReducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case 'register':
      return register(state, action.name)

    case 'unregister':
      return unregister(state, action.name)

    case 'highlight':
      return highlight(state, action.index)

    default:
      throw new Error('Invalid action type')
  }
}
