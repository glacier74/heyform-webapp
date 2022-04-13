import { urlBuilder } from '@/utils/helper'
import { parseNumber } from '@hpnp/utils'
import { isArray, isEmpty, isNil, isObject, isValid } from '@hpnp/utils/helper'
import { parse } from '@hpnp/utils/qs'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

export interface ParamsType {
  workspaceId: string
  projectId: string
  formId: string
  templateId: string
  inviteCode: string
}

export function useParam(): ParamsType {
  const { workspaceId, projectId, formId, templateId, inviteCode } = useParams<IMapType<string>>()

  return {
    workspaceId,
    projectId,
    formId,
    templateId,
    inviteCode
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

export function useVisible(visible = false): [boolean, () => void, () => void] {
  const [isOpen, setIsOpen] = useState(visible)

  const open = useCallback(() => {
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
  }, [])

  return [isOpen, open, close]
}

export function useRouter() {
  const query = useQuery()
  const navigate = useNavigate()

  const push = useCallback((url: string, params?: IMapType) => {
    navigate(
      urlBuilder(url, {
        ...query,
        ...params
      })
    )
  }, [])

  const redirect = useCallback((url?: string) => {
    window.location.href = query.redirect_uri || url || '/'
  }, [])

  return { push, redirect }
}
