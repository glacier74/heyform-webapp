import { useContext } from 'react'
import { IContext, IState, StoreContext } from './context'

export function useStoreContext(): IContext {
  return useContext(StoreContext)
}

export function useStoreState(): IState {
  const { state } = useStoreContext()
  return state
}
