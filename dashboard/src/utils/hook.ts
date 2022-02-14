import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

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

export type FetchStatus = 'idle' | 'pending' | 'success' | 'error'

// https://usehooks.com/useAsync/
export function useAsync(
  asyncFunction: () => Promise<unknown>,
  deps: unknown[] = [],
  immediate = true
) {
  const [status, setStatus] = useState<FetchStatus>('idle')
  const [error, setError] = useState<Error | null>(null)

  // The execute function wraps asyncFunction and
  // handles setting state for pending, value, and error.
  // useCallback ensures the below useEffect is not called
  // on every render, but only if asyncFunction changes.
  const execute = useCallback(() => {
    setStatus('pending')
    setError(null)

    return asyncFunction()
      .then(() => {
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

  return { execute, status, error }
}
