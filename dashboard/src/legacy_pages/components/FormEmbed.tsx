import { CopyButton } from '@/legacy_pages/components'
import { formSharingLinkUrl, useStore } from '@/legacy_pages/utils'
import { Flex, Modal, ModalProps } from '@heyui/component'
import { observer } from 'mobx-react-lite'
import { FC } from 'react'
import styled from 'styled-components'

export const FormEmbed: FC<ModalProps> = observer(({ visible, onVisibleChange }) => {
  const workspaceStore = useStore('workspaceStore')
  const formStore = useStore('formStore')

  const sharingLinkUrl = formSharingLinkUrl(workspaceStore.workspace, formStore.current?.id)
  const embedText = `<div class="heyform" data-id="fDybN1rq"></div><script src="${sharingLinkUrl}/e.js"></script>`

  return (
    <StyleModal visible={visible} onVisibleChange={onVisibleChange} title="Embed">
      <HeadingFlex align="center">
        <Heading>You can copy the code below and paste it anywhere to your own website.</Heading>
      </HeadingFlex>
      <ContentFlex>
        <LinkText>{embedText}</LinkText>
        <CopyButton text={embedText} />
      </ContentFlex>
    </StyleModal>
  )
})

const StyleModal = styled(Modal)`
  width: 500px;
  padding-bottom: 24px;
`

const HeadingFlex = styled(Flex)`
  margin-top: 24px;
  margin-bottom: 8px;
`

const Heading = styled.div`
  flex: 1;
  font-weight: bold;
`

const ContentFlex = styled(Flex)`
  border: 1px solid ${props => props.theme.border};
  border-radius: ${props => props.theme.borderRadius};

  button {
    width: 90px;
    min-height: 106px;
    border: none;
    background: transparent;
  }
`

const LinkText = styled.div`
  flex: 1;
  padding: 12px;
  border-right: 1px solid ${props => props.theme.border};
`
