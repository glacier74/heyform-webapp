import type { Context } from 'react'
import { createContext } from 'react'

export interface StoreAction<T = string, P = any> {
  type: T
  payload?: P
}

export type StoreActions<S = IMapType, A = StoreAction> = Record<
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  A['type'],
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  (state: S, payload?: A['payload']) => S
>

export interface StoreContext<S = IMapType, A = StoreAction> {
  state: S
  dispatch: (action: A) => void
}

export function createStoreContext<S = IMapType, A = StoreAction>(
  initialState: S
): Context<StoreContext<S, A>> {
  return createContext<StoreContext<S, A>>({
    state: initialState,
    dispatch: (() => {}) as (action: A) => void
  })
}

export function createStoreReducer<S = IMapType, P = any, T = string>(
  actions: StoreActions<S, StoreAction<T, P>>,
  deepEqual?: (state: S, newState: S) => S
) {
  return (state: S, action: StoreAction<T, P>) => {
    const newState = actions[action.type](state, action.payload)
    return deepEqual ? deepEqual(state, newState) : newState
  }
}
