import { deepEqual } from 'fast-equals'
import { MutableRefObject, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { mousedownEvent } from './mobileDevice'

export function useLockBodyScroll(isLocked?: boolean) {
  useLayoutEffect(() => {
    // Prevent scrolling on locked
    document.body.style.overflow = isLocked ? 'hidden' : 'visible'

    // Re-enable scrolling when unlocked
    return () => {
      document.body.style.overflow = 'visible'
      return
    }
  }, [isLocked])
}

export function useOnClickOutside(ref: MutableRefObject<HTMLElement>, handler: Function) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }
      handler(event)
    }

    document.addEventListener(mousedownEvent, listener)

    return () => {
      document.removeEventListener(mousedownEvent, listener)
    }
  }, [ref, handler])
}

export function useStrictEqualState<T = any>(defaultValue?: T): [T, (value: T) => void] {
  const [state, _setState] = useState<T>(defaultValue as T)

  function setState(value: any) {
    if (!deepEqual(state, value)) {
      _setState(value)
    }
  }

  return [state, setState]
}

// use this instead of `useCallback`
export function useEventCallback(fn: Function) {
  const ref = useRef<Function>()

  useEffect(() => {
    ref.current = fn
  })

  // @ts-ignore
  return useCallback((...args) => ref.current!(...args), [])
}
