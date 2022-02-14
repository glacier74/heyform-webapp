import { createContext, useContext } from 'react'
import { AppStore } from './app.store'
import { UserStore } from './user.store'
import { WorkspaceStore } from './workspace.store'

export interface Store {
  appStore: AppStore
  userStore: UserStore
  workspaceStore: WorkspaceStore
}

export const store: Readonly<Store> = Object.freeze({
  appStore: new AppStore(),
  userStore: new UserStore(),
  workspaceStore: new WorkspaceStore()
})

export const StoreContext = createContext(store)
export const StoreProvider = StoreContext.Provider

export function useStore<T extends keyof Store>(storeName: T): typeof store[T] {
  const stores = useContext(StoreContext)
  return stores[storeName]
}
