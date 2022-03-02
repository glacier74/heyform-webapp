import { NavBarContainer } from '@/legacy_pages/layouts/views/NavBarContainer'
import { useStore } from '@/legacy_pages/utils'
import { useParam } from '@/utils'
import { customTheme, FormRender } from '@heyforms/form-component'
import { isValid } from '@hpnp/utils/helper'
import { observer } from 'mobx-react-lite'
import { FC, useEffect } from 'react'
import styled, { ThemeProvider } from 'styled-components'

export const FormPreviewModal: FC = observer(() => {
  const { formId } = useParam()
  const appStore = useStore('appStore')
  const formStore = useStore('formStore')
  const composeStore = useStore('composeStore')
  const form: any = isValid(composeStore.form) ? composeStore.form : formStore.current || {}
  const theme = customTheme(form.themeSettings?.theme)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [formId])

  function handleClose() {
    appStore.isFormPreviewOpen = false
  }

  function handleFinish() {}

  return (
    <>
      {appStore.isFormPreviewOpen && (
        <Container>
          <StyledNavBarContainer
            close={true}
            titleColor={form.themeSettings?.theme?.title}
            onClose={handleClose}
          >
            <ThemeProvider theme={theme}>
              <StyledFormRender
                form={form}
                theme={theme}
                autoSave={false}
                submitRequest={handleFinish}
              />
            </ThemeProvider>
          </StyledNavBarContainer>
        </Container>
      )}
    </>
  )
})

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  z-index: 100;
  overflow-y: auto;
`

const StyledNavBarContainer = styled(NavBarContainer)<{
  titleColor?: string
}>`
  .navbar {
    height: 0;
  }

  .content {
    width: 100%;
    padding: 0;
  }

  .navbar {
    .hey-button {
      margin-top: 60px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 4px;

      &,
      svg {
        color: ${props => props.titleColor};
      }

      svg {
        width: 28px;
        height: 28px;
      }

      &:hover {
        color: ${props => props.titleColor};
      }
    }
  }
`

const StyledFormRender = styled(FormRender)`
  min-height: 100vh;
`
