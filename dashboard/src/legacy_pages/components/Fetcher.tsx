import { useAsync } from '@/legacy_pages/utils'
import { ComponentProps } from '@heyui/component'
import { FC, ReactNode } from 'react'
import styled from 'styled-components'

interface FetcherProps extends ComponentProps {
  request: () => Promise<boolean>
  immediate?: boolean
  deps?: any[]
  useCache?: boolean
  skeleton?: ReactNode
  emptyNode?: ReactNode
  errorNode?: (err: Error) => ReactNode
}

export const Fetcher: FC<FetcherProps> = ({
  className,
  style,
  request,
  immediate = true,
  deps = [],
  useCache = false,
  skeleton,
  emptyNode,
  errorNode,
  children
}) => {
  const { status, value, error } = useAsync(request, deps, immediate)

  return (
    <Container className={className} style={style}>
      {status === 'idle' && useCache && children}
      {status === 'pending' && (!useCache ? skeleton : children)}
      {status === 'error' && (errorNode ? errorNode(error!) : children)}
      {status === 'success' && (!value && emptyNode ? emptyNode : children)}
    </Container>
  )
}

const Container = styled.div`
  position: relative;
`
