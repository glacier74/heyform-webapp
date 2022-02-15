import type { RefObject } from 'react'
import { useCallback, useEffect, useRef } from 'react'
import { mousedownEvent } from './utils'

export default function useIsMounted(deps: unknown[]): () => boolean {
  const ref = useRef(false)

  useEffect(() => {
    ref.current = true
    return () => {
      ref.current = false
    }
  }, [deps])

  return useCallback(() => ref.current, [ref])
}

export function useOnClickOutside(
  ref: RefObject<HTMLElement>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
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

export function useCallbackFunction(func: (...args: any[]) => any, deps = []) {
  return useCallback(func, deps)
}
