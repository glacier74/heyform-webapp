import { CopyButton } from '@/legacy_pages/components'
import {
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  QrcodeIcon,
  RefreshIcon,
  ShareFillIcon,
  TwitterIcon
} from '@/legacy_pages/components/Icons'
import { QrCode } from '@/legacy_pages/pages/Share/views/QrCode'
import { FormService } from '@/service'
import { formSharingLinkUrl, urlBuilder, useStore } from '@/legacy_pages/utils'
import { Flex, message, Spin, Switch } from '@heyui/component'
import { isEmpty } from '@hpnp/utils/helper'
import { random } from '@hpnp/utils/random'
import { observer } from 'mobx-react-lite'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const ShareByLink: FC = observer(() => {
  const { t } = useTranslation()
  const workspaceStore = useStore('workspaceStore')
  const formStore = useStore('formStore')
  const [pending, setPending] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [visible, setVisible] = useState(false)

  const sharingLinkUrl = formSharingLinkUrl(workspaceStore.workspace, formStore.current?.id)

  async function handleEnablePassword(requirePassword: boolean) {
    if (pending) {
      return
    }

    setPending(true)

    try {
      const updates: any = {
        requirePassword
      }

      // 随机密码
      if (isEmpty(formStore.current?.settings?.password)) {
        updates.password = random(4)
      }

      await FormService.update(formStore.current!.id, updates)
      formStore.updateSettings(updates)
    } catch (_) {
      message.error(`Failed to ${requirePassword ? 'enable' : 'disable'} form password`)
    }

    setPending(false)
  }

  async function handleRefreshPassword() {
    if (refreshing) {
      return
    }

    setRefreshing(true)

    try {
      const updates: any = {
        password: random(4)
      }

      await FormService.update(formStore.current!.id, updates)
      formStore.updateSettings(updates)
    } catch (_) {
      message.error(`Failed to reset form password`)
    }

    setRefreshing(false)
  }

  function handleEmail() {
    const url = urlBuilder('mailto:', {
      subject: 'Could you take a moment to fill in this heyform?',
      body: `We would really appreciate it if you filled in this form: ${sharingLinkUrl}. Thank you.`
    })
    window.open(url)
  }

  function handleFacebook() {
    const url = urlBuilder('https://www.facebook.com/sharer/sharer.php', {
      u: sharingLinkUrl
    })
    window.open(url)
  }

  function handleLinkedin() {
    const url = urlBuilder('https://www.linkedin.com/sharing/share-offsite', {
      url: sharingLinkUrl
    })
    window.open(url)
  }

  function handleTwitter() {
    const url = urlBuilder('https://twitter.com/share', {
      url: sharingLinkUrl,
      title: formStore.current!.name
    })
    window.open(url)
  }

  return (
    <Container>
      <Header align="center">
        <ShareFillIcon />
        <span>{t('Share by link')}</span>
      </Header>

      <Group>
        <Flex align="center">
          <Label>{t('Enable password access to the form')}</Label>
          <Switch
            loading={pending}
            value={formStore.current?.settings?.requirePassword}
            onChange={handleEnablePassword}
          />
        </Flex>
        <Password>
          <PasswordText>{formStore.current?.settings?.password}</PasswordText>
          <RefreshButton align="center" justify="center" onClick={handleRefreshPassword}>
            {refreshing ? <Spin /> : <RefreshIcon />}
          </RefreshButton>
        </Password>
      </Group>

      <Group>
        <Label>{t('Public URL')}</Label>
        <Flex align="center">
          <Text style={{ marginRight: 16 }}>{sharingLinkUrl}</Text>
          <StyledCopyButton text={sharingLinkUrl} />
        </Flex>
      </Group>

      <Bottom align="center">
        <SocialMedia>
          <SocialMediaItem onClick={handleEmail}>
            <EmailIcon />
          </SocialMediaItem>
          <SocialMediaItem onClick={() => setVisible(true)}>
            <QrcodeIcon />
          </SocialMediaItem>
          <SocialMediaItem onClick={handleFacebook}>
            <FacebookIcon />
          </SocialMediaItem>
          <SocialMediaItem onClick={handleLinkedin}>
            <LinkedinIcon />
          </SocialMediaItem>
          <SocialMediaItem onClick={handleTwitter}>
            <TwitterIcon />
          </SocialMediaItem>
        </SocialMedia>

        <Link to={`/workspace/${formStore.current?.teamId}/settings`}>{t('Custom domain')}</Link>
      </Bottom>

      <QrCode visible={visible} onVisibleChange={setVisible} />
    </Container>
  )
})

const Container = styled.div`
  flex: 1;
  padding: 34px;
  background: #fff;
`

const Header = styled(Flex)`
  margin-bottom: 32px;

  svg {
    width: 24px;
    height: 24px;
    color: #b0b7c3;
  }

  span {
    margin-left: 12px;
    font-size: 16px;
  }
`

const Group = styled.div`
  margin-bottom: 16px;
`

const Label = styled.div`
  flex: 1;
  margin-bottom: 10px;
`

const Text = styled.div`
  flex: 1;
  height: 44px;
  padding: 10px;
  line-height: 22px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  transition: color 0.15s ease, border-color 0.15s ease;
`

const Password = styled.div`
  position: relative;
`

const PasswordText = styled(Text)`
  padding-right: 20px;
`

const RefreshButton = styled(Flex)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 44px;
  height: 44px;
  cursor: pointer;

  svg {
    width: 20px;
    height: 20px;
    color: #b0b7c3;
  }
`

const StyledCopyButton = styled(CopyButton)`
  width: 75px;
`

const Bottom = styled(Flex)`
  a {
    color: #8a94a6;
    text-decoration: underline;
  }
`

const SocialMedia = styled(Flex)`
  flex: 1;
`

const SocialMediaItem = styled(Flex)`
  margin-right: 12px;
  width: 24px;
  height: 24px;
  padding: 4px;
  color: #8a94a6;
  background: rgba(176, 183, 195, 0.15);
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background: rgba(176, 183, 195, 0.3);
  }

  svg {
    width: 100%;
    height: 100%;
  }
`
