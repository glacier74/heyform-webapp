import { isString, isValid, isValidArray } from '@hpnp/utils/helper'
import { parseNumber } from '@hpnp/utils/parse'
import { parse } from '@hpnp/utils/qs'
import { RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

export { useStore } from '@/store'

export function useQuery() {
  const location = useLocation()

  return useMemo(() => {
    return parse(location.search, {
      decode: true,
      separator: ','
    })
  }, [location])
}

export function useAudienceQuery() {
  const location = useLocation()
  const parsed = parse(location.search, {
    decode: true,
    separator: ','
  })

  return useMemo(() => {
    return {
      keyword: parsed.keyword,
      page: parseNumber(parsed.page, 1)!,
      groupIds: (isValidArray(parsed.groupIds)
        ? parsed.groupIds
        : isString(parsed.groupIds)
        ? [parsed.groupIds]
        : []
      ).filter(isValid)
    }
  }, [location])
}

export function useOnClickOutside(ref: RefObject<any>, handler: Function) {
  useEffect(
    () => {
      const listener = (event: MouseEvent | TouchEvent) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return
        }

        handler(event)
      }

      document.addEventListener('mousedown', listener)
      document.addEventListener('touchstart', listener)

      return () => {
        document.removeEventListener('mousedown', listener)
        document.removeEventListener('touchstart', listener)
      }
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  )
}

export function useAsyncEffect<T>(asyncFunction: () => Promise<T>, deps: any[] = []) {
  const execute = useCallback(() => {
    return asyncFunction()
  }, [asyncFunction])

  useEffect(() => {
    execute()
  }, deps)
}

// https://usehooks.com/useAsync/
export function useAsync(
  asyncFunction: () => Promise<boolean>,
  deps: any[] = [],
  immediate = true
) {
  const [status, setStatus] = useState<string>('idle')
  const [value, setValue] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  // The execute function wraps asyncFunction and
  // handles setting state for pending, value, and error.
  // useCallback ensures the below useEffect is not called
  // on every render, but only if asyncFunction changes.
  const execute = useCallback(() => {
    setStatus('pending')
    setError(null)

    return asyncFunction()
      .then(value => {
        setValue(value)
        setStatus('success')
      })
      .catch((err: any) => {
        setError(err)
        setStatus('error')
      })
  }, [asyncFunction])

  // Call execute if we want to fire it right away.
  // Otherwise execute can be called later, such as
  // in an onClick handler.
  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [...deps, immediate])

  return { execute, value, status, error }
}

export function usePopup(url?: string | null, listener?: (payload: any) => void): any {
  const popup = useRef<Window | null>()

  function messageListener(event: MessageEvent) {
    const { data, origin } = event

    if (
      origin === window.location.origin &&
      data.source === 'heyform-integration' &&
      isValid(data.payload.code)
    ) {
      popup.current?.close()
      listener && listener(data.payload)
    }
  }

  useEffect(() => {
    if (url) {
      popup.current = window.open(
        url,
        'heyform-integration',
        'toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=600, height=600'
      )
    }
  }, [url])

  useEffect(() => {
    window.addEventListener('message', messageListener)

    return () => {
      window.removeEventListener('message', messageListener)
    }
  }, [])
}

export function useCountDown(timeToCount = 60, scheduleInterval = 1_000) {
  const timer = useRef<any>(null)
  const [countdown, setCountdown] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  const start = useCallback(() => {
    setIsRunning(true)
    setCountdown(timeToCount)
  }, [])

  const reset = useCallback(() => {
    setIsRunning(false)
    setCountdown(0)

    if (timer.current) {
      clearInterval(timer.current)
      timer.current = null
    }
  }, [])

  useEffect(() => {
    if (countdown > 1) {
      timer.current = setTimeout(() => {
        setCountdown(prevState => prevState - 1)
      }, scheduleInterval)
    } else {
      reset()
    }
  }, [countdown])

  return {
    countdown,
    isRunning,
    start,
    reset
  }
}
