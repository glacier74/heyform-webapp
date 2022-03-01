import { Heading } from '@/legacy_pages/components'
import { NavBarContainer } from '@/legacy_pages/layouts/views/NavBarContainer'
import { formSharingLinkUrl, useStore } from '@/legacy_pages/utils'
import { observer } from 'mobx-react-lite'
import QrCodeReact from 'qrcode.react'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

interface QrCodeProps {
  visible?: boolean
  onVisibleChange?: (visible: boolean) => void
}

export const QrCode: FC<QrCodeProps> = observer(({ visible, onVisibleChange }) => {
  const { t } = useTranslation()
  const workspaceStore = useStore('workspaceStore')
  const formStore = useStore('formStore')

  const sharingLinkUrl = formSharingLinkUrl(workspaceStore.workspace, formStore.current?.id)

  function handleClose() {
    onVisibleChange && onVisibleChange(false)
  }

  return (
    <>
      {visible && (
        <Container close={true} onClose={handleClose}>
          <Content>
            <Heading
              description={t(
                'Scan the code to open the form. Work online and offline with a printer.'
              )}
              style={{
                textAlign: 'center'
              }}
            >
              {t('Get QR code')}
            </Heading>
          </Content>

          <CodeWrapper>
            <QrCodeReact value={sharingLinkUrl} size={300} fgColor="#3F3F46" />
          </CodeWrapper>
        </Container>
      )}
    </>
  )
})

const Container = styled(NavBarContainer)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  z-index: 99;
  overflow-y: auto;
`

const Content = styled.div`
  .hey-button {
    padding-top: 10px;
    padding-bottom: 10px;
  }
`

const CodeWrapper = styled.div`
  margin: 48px auto;
  width: 300px;
  height: 300px;
`
