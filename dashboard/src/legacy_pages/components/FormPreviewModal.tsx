import { NavBarContainer } from '@/legacy_pages/layouts/views/NavBarContainer'
import { useStore } from '@/legacy_pages/utils'
import { useParam } from '@/utils'
import { Renderer } from '@heyforms/form-component'
import { observer } from 'mobx-react-lite'
import { FC, useEffect } from 'react'
import styled from 'styled-components'

export const FormPreviewModal: FC = observer(() => {
  const { formId } = useParam()
  const appStore = useStore('appStore')
  const formStore = useStore('formStore')
  const form: any = formStore.current || {}

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [formId])

  function handleClose() {
    appStore.isFormPreviewOpen = false
  }

  async function handleFinish() {}

  return (
    <>
      {appStore.isFormPreviewOpen && (
        <Container>
          <StyledNavBarContainer
            close={true}
            titleColor={form.themeSettings?.theme?.title}
            onClose={handleClose}
          >
            <Renderer form={form} autoSave={false} onSubmit={handleFinish} />
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
      margin-top: 3.75rem;
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
