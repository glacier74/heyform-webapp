import { FormPreviewModal, WorkspaceGuard } from '@/components'
import { FormNavbar, GlobalStyle } from '@/legacy_pages/components'
import { Flex } from '@heyui/component'
import { FC } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { theme } from '../theme'
import { FormGuardLayout } from './FormGuardLayout'

export const FormLayout: FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <FormGuardLayout>
        <StyledFlex column={true}>
          <FormNavbar />
          <Content className="content scrollbar">{children}</Content>
        </StyledFlex>
        <FormPreviewModal />
      </FormGuardLayout>
    </ThemeProvider>
  )
}

export const WorkspaceGuardLayout: FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <WorkspaceGuard>{children}</WorkspaceGuard>
    </ThemeProvider>
  )
}

const StyledFlex = styled(Flex)`
  height: 100%;
  height: 100vh;

  @media print {
    height: auto;
  }
`

const Content = styled.div`
  flex: 1;
  background: #fafbfc;
`
