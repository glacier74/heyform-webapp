import { Loader } from '@/legacy_pages/components/Loader'
import { useAsync } from '@/legacy_pages/utils'
import { ComponentProps } from '@heyui/component'
import { FC, ReactNode } from 'react'
import styled from 'styled-components'

/**
 * Initial component with request
 */
interface RequestProps extends ComponentProps {
  fetch: () => Promise<boolean>
  immediate?: boolean
  deps?: any[]
  useCache?: boolean
  emptyNode?: ReactNode
  errorNode?: (err: Error) => ReactNode
}

export const Request: FC<RequestProps> = ({
  className,
  style,
  fetch,
  immediate = true,
  deps = [],
  useCache = false,
  emptyNode,
  errorNode,
  children
}) => {
  const { status, value, error } = useAsync(fetch, deps, immediate)

  return (
    <Container className={className} style={style}>
      {status === 'idle' && useCache && children}
      {status === 'pending' && (!useCache ? <Loader className="loader" /> : children)}
      {status === 'error' && (errorNode ? errorNode(error!) : children)}
      {status === 'success' && (!value && emptyNode ? emptyNode : children)}
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`
