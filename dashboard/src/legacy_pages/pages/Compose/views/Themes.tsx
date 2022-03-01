import { FORM_THEMES } from '@/legacy_pages/constants'
import { FC } from 'react'
import styled from 'styled-components'
import { ThemeItem } from './ThemeItem'

export const Themes: FC = () => {
  return (
    <Container>
      {FORM_THEMES.map((row, idx) => (
        <ThemeItem key={idx} {...row} />
      ))}
    </Container>
  )
}

const Container = styled.div`
  padding: 24px 8px;
`
