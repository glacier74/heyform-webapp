import { isEmpty } from '@hpnp/utils/helper'
import type { StoreActions } from '../context'
import { createStoreContext, createStoreReducer } from '../context'
import type { TabsPaneProps } from './Pane'

type ITab = Pick<TabsPaneProps, 'name' | 'title' | 'disabled'>

interface IState {
  tabs: ITab[]
  activeName?: IKeyType
  onChange?: (name: IKeyType) => void
}

const actions: StoreActions<IState> = {
  register(state: IState, tab: ITab): IState {
    if (state.tabs.findIndex(t => t.name === tab.name) > -1) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (import.meta.env.DEV) {
        console.warn(`Tabs.Pane "${tab.name}" already registered`)
      }

      return state
    }

    let { activeName } = state

    if (isEmpty(activeName)) {
      activeName = tab.name
    }

    return {
      ...state,
      activeName,
      tabs: [...state.tabs, tab]
    }
  },

  unregister(state: IState, name: IKeyType): IState {
    return {
      ...state,
      activeName: state.activeName === name ? undefined : state.activeName,
      tabs: state.tabs.filter(t => t.name !== name)
    }
  },

  setActive(state: IState, activeName: string) {
    return {
      ...state,
      activeName
    }
  }
}

export const TabsStoreContext = createStoreContext<IState>({
  tabs: []
})

export const tabsStoreReducer = createStoreReducer<IState>(actions)