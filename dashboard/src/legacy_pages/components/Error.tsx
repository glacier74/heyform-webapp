import { FC } from 'react'
import styled from 'styled-components'

export interface ErrorProps {
  error?: string | null
}

export const Error: FC<ErrorProps> = ({ error }) => {
  return <>{error && <ErrorSpan>{error}</ErrorSpan>}</>
}

const ErrorSpan = styled.span`
  color: ${({ theme }) => theme.error};
`
