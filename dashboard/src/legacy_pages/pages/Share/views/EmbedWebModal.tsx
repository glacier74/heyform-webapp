import { CopyButton, Heading } from '@/legacy_pages/components'
import { EmbedModeEnums } from '@/legacy_pages/constants'
import { NavBarContainer } from '@/legacy_pages/layouts/views/NavBarContainer'
import { EMBED_OPTIONS } from '@/legacy_pages/pages/Share/views/EmbedWeb'
import { Flex } from '@heyui/component'
import { observer } from 'mobx-react-lite'
import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useParam } from '@/utils'
import styled from 'styled-components'

interface EmbedWebModalProps {
  mode: EmbedModeEnums
  visible?: boolean
  onModeChange: (mode: EmbedModeEnums) => void
  onVisibleChange: (visible: boolean) => void
}

export const EmbedWebModal: FC<EmbedWebModalProps> = observer(
  ({ mode, visible, onModeChange, onVisibleChange }) => {
    const { t } = useTranslation()
    const { formId } = useParam()
    const [code, setCode] = useState('')
    const [iframeUrl, setIframeUrl] = useState('')

    function handleClose() {
      onVisibleChange && onVisibleChange(false)
    }

    useEffect(() => {
      setCode(
        `<div class="heyform" data-id="${formId}" data-mode="${mode}" data-button-text="Launch Form"></div><script src="${
          import.meta.env.VITE_HOMEPAGE
        }/embed?v=2022.1.1"></script>`
      )
      setIframeUrl(
        `${
          import.meta.env.VITE_HOMEPAGE
        }/embed/preview?preview=true&formId=${formId}&mode=${mode}&buttonText=Launch Form`
      )
    }, [formId, mode])

    return (
      <>
        {visible && (
          <Container close={true} onClose={handleClose}>
            <Heading
              description="You can embed your form to your website using any method listed below."
              style={{
                textAlign: 'center'
              }}
            >
              {t('Embed in a web page')}
            </Heading>

            <Content justify="space-between">
              <Sidebar>
                <Group>
                  <GroupHeader>{t('Mode')}</GroupHeader>
                  {EMBED_OPTIONS.map(row => (
                    <ModeItem
                      key={row.mode}
                      active={row.mode === mode}
                      align="center"
                      onClick={() => onModeChange(row.mode)}
                    >
                      {row.icon} <span>{t(row.title)}</span>
                    </ModeItem>
                  ))}
                </Group>
                <Group>
                  <GroupHeader>{t('Code')}</GroupHeader>
                  <Code>{code}</Code>
                  <CopyButton
                    text={code}
                    style={{
                      marginTop: 12
                    }}
                  />
                </Group>
              </Sidebar>
              <Preview>
                <iframe src={iframeUrl} />
              </Preview>
            </Content>
          </Container>
        )}
      </>
    )
  }
)

const Container = styled(NavBarContainer)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  z-index: 99;
  overflow-y: auto;

  .content {
    width: 1044px;
  }
`

const Content = styled(Flex)`
  width: 1044px;
  margin-top: 80px;
`

const Sidebar = styled.div`
  width: 280px;
`

const Group = styled.div`
  margin-bottom: 24px;
`

const GroupHeader = styled.div`
  margin-bottom: 12px;
`

const ModeItem = styled(Flex)<{
  active?: boolean
}>`
  padding: 8px 12px;
  color: #4e5d78;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
    margin-left: -2px;
    padding: 2px;
    color: #b0b7c3;
  }

  span {
    margin-left: 10px;
  }

  &:hover {
    color: #4e5d78;
    background: #fafbfc;
  }

  ${props =>
    props.active &&
    `
    color: #4e5d78;
    background: #fafbfc;
  `}
`

const Code = styled.div`
  padding: 12px;
  color: #8a94a6;
  background: #fafbfc;
  word-break: break-all;
`

const Preview = styled.div`
  padding: 24px;
  background: #fafbfc;
  border-radius: 3px;

  iframe {
    width: 650px;
    height: 600px;
    border: none;
  }
`
