import { useAsync } from '@/utils'
import clsx from 'clsx'
import type { FC, ReactNode } from 'react'

interface AsyncProps extends IComponentProps {
  request: () => Promise<any>
  immediate?: boolean
  deps?: any[]
  cacheFirst?: boolean
  skeleton?: ReactNode
  emptyState?: ReactNode
  errorRender?: (err: Error) => ReactNode
}

export const Async: FC<AsyncProps> = ({
  className,
  style,
  request,
  immediate = true,
  deps = [],
  cacheFirst = false,
  skeleton,
  emptyState,
  errorRender,
  children
}) => {
  const { status, value, error } = useAsync(request, deps, immediate)

  return (
    <div className={className} style={style}>
      {status === 'idle' && cacheFirst && children}
      {status === 'pending' && (!cacheFirst ? skeleton : children)}
      {status === 'error' && (errorRender ? errorRender(error!) : children)}
      {status === 'success' && (!value && emptyState ? emptyState : children)}
    </div>
  )
}
