import { createContext, useContext } from 'react'
import { AppStore } from './app'

export interface Store {
  appStore: AppStore
}

export const store: Readonly<Store> = Object.freeze({
  appStore: new AppStore()
})

export const StoreContext = createContext(store)
export const StoreProvider = StoreContext.Provider

export function useStore<T extends keyof Store>(storeName: T): typeof store[T] {
  const stores = useContext(StoreContext)
  return stores[storeName]
}
