import { deepEqual } from 'fast-equals'
import { createStoreContext, createStoreReducer } from '../store'

interface IState {
  names: IKeyType[]
  highlighted?: IKeyType
  onClick?: (name?: IKeyType) => void
}

const actions: any = {
  register(state: IState, { name }: any): IState {
    if (state.names.includes(name)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (import.meta.env.DEV) {
        console.warn('Menu.Item "${name}" already registered')
      }

      return state
    }

    return {
      ...state,
      names: [...state.names, name]
    }
  },

  unregister(state: IState, { name }: any): IState {
    return {
      ...state,
      highlighted: state.highlighted === name ? undefined : state.highlighted,
      names: state.names.filter(k => k !== name)
    }
  },

  highlight(state: IState, { index }: any) {
    return {
      ...state,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      highlighted: state.names.at(index)
    }
  }
}

export const MenusStoreContext = createStoreContext<IState>({
  names: []
})

export const MenusStoreReducer = createStoreReducer<IState>(actions, (state, newState) => {
  return deepEqual(state, newState) ? state : newState
})
