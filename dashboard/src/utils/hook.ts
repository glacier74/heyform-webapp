import { parseNumber } from '@hpnp/utils'
import { isArray, isEmpty, isNil, isObject, isValid } from '@hpnp/utils/helper'
import { parse } from '@hpnp/utils/qs'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

export interface ParamsType {
  workspaceId: string
  projectId: string
  formId: string
}

export function useParam(): ParamsType {
  const { workspaceId, projectId, formId } = useParams<IMapType<string>>()

  return {
    workspaceId,
    projectId,
    formId
  }
}

export function useQuery(options?: IMapType): IMapType {
  const location = useLocation()

  return useMemo(() => {
    const value = parse(location.search, {
      decode: true,
      separator: ','
    })

    if (options) {
      Object.keys(options).forEach(key => {
        let type: any
        let defaultValue: any

        if (isObject(options[key])) {
          type = options[key].type
          defaultValue = options[key].defaultValue
        } else {
          type = options[key]
        }

        if (!isNil(value[key])) {
          switch (type.name) {
            case 'String':
              value[key] = value[key]
              break

            case 'Number':
              value[key] = parseNumber(value[key], defaultValue)
              break

            case 'Boolean':
              value[key] = Boolean(value[key])
              break

            case 'Array':
              value[key] = (isArray(value[key]) ? value[key] : [value[key]]).filter(isValid)
              break
          }
        }

        if (isEmpty(value[key]) && defaultValue) {
          value[key] = defaultValue
        }
      })
    }

    return value
  }, [location])
}

export function useAsyncEffect<T>(asyncFunction: () => Promise<T>, deps: any[] = []) {
  const execute = useCallback(() => {
    return asyncFunction()
  }, [asyncFunction])

  useEffect(() => {
    execute()
  }, deps)
}

// Fork from https://usehooks.com/useAsync/
export function useAsync<T = any>(
  asyncFunction: () => Promise<T>,
  initialResult: T,
  deps: any[] = []
) {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<T | null>(initialResult)
  const [error, setError] = useState<Error | null>(null)

  // The execute function wraps asyncFunction and
  // handles setting state for pending, value, and error.
  // useCallback ensures the below useEffect is not called
  // on every render, but only if asyncFunction changes.
  const execute = useCallback(() => {
    setLoading(true)
    setError(null)

    return asyncFunction()
      .then(setResult)
      .catch(setError)
      .finally(() => {
        setLoading(false)
      })
  }, [asyncFunction])

  useEffect(() => {
    execute()
  }, deps)

  return { result, loading, error }
}
