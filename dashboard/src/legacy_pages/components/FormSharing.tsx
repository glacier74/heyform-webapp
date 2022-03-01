import { CopyButton } from '@/legacy_pages/components'
import { FormService } from '@/service'
import { formSharingLinkUrl, useStore } from '@/legacy_pages/utils'
import { Button, Flex, message, Modal, ModalProps, Switch } from '@heyui/component'
import { random } from '@hpnp/utils/random'
import { observer } from 'mobx-react-lite'
import { FC, useState } from 'react'
import styled from 'styled-components'

export const FormSharing: FC<ModalProps> = observer(({ visible, onVisibleChange }) => {
  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const workspaceStore = useStore('workspaceStore')
  const formStore = useStore('formStore')

  const sharingLinkUrl = formSharingLinkUrl(workspaceStore.workspace, formStore.current?.id)

  async function handleChange(requirePassword: boolean) {
    if (loading) {
      return
    }

    setLoading(true)

    await handleUpdate({
      requirePassword
    })

    setLoading(false)
  }

  async function handleClick() {
    if (loading2) {
      return
    }

    setLoading2(true)

    const password = random(4)
    await handleUpdate({
      password
    })

    setLoading2(false)
  }

  async function handleUpdate(updates: IMapType) {
    try {
      await FormService.update(formStore.current!.id, updates)
      formStore.updateSettings(updates)
    } catch (err: any) {
      message.error('Failed to update form settings')
    }
  }

  return (
    <StyleModal visible={visible} onVisibleChange={onVisibleChange} title="EmailForm sharing">
      <HeadingFlex align="center">
        <Heading>URL link</Heading>
      </HeadingFlex>
      <ContentFlex>
        <LinkText>{sharingLinkUrl}</LinkText>
        <CopyButton text={sharingLinkUrl} />
      </ContentFlex>

      <HeadingFlex align="center">
        <Heading>Password protection</Heading>
        <Switch
          value={formStore.current?.settings?.requirePassword}
          loading={loading}
          disabled={loading}
          onChange={handleChange}
        />
      </HeadingFlex>
      <ContentFlex>
        <LinkText>{formStore.current?.settings?.password}</LinkText>
        <CopyButton text={formStore.current?.settings?.password!} />
      </ContentFlex>
      <GeneratePassword loading={loading2} onClick={handleClick}>
        Generate Password
      </GeneratePassword>
    </StyleModal>
  )
})

const StyleModal = styled(Modal)`
  min-width: 440px;
  padding-bottom: 24px;
`

const LinkText = styled.div`
  flex: 1;
  padding: 0 12px;
  height: 32px;
  line-height: 32px;
  border: 1px solid ${props => props.theme.border};
  border-right: none;
  border-top-left-radius: ${props => props.theme.borderRadius};
  border-bottom-left-radius: ${props => props.theme.borderRadius};
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
  button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;

    &:active,
    &:focus {
      border-color: ${props => props.theme.border};
    }
  }
`

const GeneratePassword = styled(Button)`
  margin-top: 4px;
  border: none;
  padding: 0;
  color: ${props => props.theme.primary};
`
