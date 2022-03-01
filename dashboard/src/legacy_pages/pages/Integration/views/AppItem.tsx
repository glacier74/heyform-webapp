import {
  AppInternalTypeEnum,
  AppModel,
  AppStatusEnum,
  IntegrationStatusEnum
} from '@/legacy_pages/models'
import { IntegrationService } from '@/service'
import { Button, ComponentProps, Flex, Image, Switch } from '@heyui/component'
import { ShareBoxIcon } from '@heyui/icon'
import { isValid } from '@hpnp/utils/helper'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import LazyLoad from 'react-lazyload'
import { useParams } from 'react-router-dom'
import { useParam } from '@/utils'
import styled, { css } from 'styled-components'

interface AppItemProps extends ComponentProps {
  app: AppModel
  onClick: (app?: AppModel) => void
  onDelete: () => void
}

const AppItemAction: FC<AppItemProps> = ({ app, onClick, onDelete }) => {
  const { t } = useTranslation()
  const { formId } = useParam()
  const isIntegrated = isValid(app.integration?.attributes)
  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [active, setActive] = useState(
    isIntegrated && app.integration?.status === IntegrationStatusEnum.ACTIVE
  )

  function handleOpenHomepage() {
    window.open(app.homepage)
  }

  async function handleUpdateStatus(active: boolean) {
    if (loading) {
      return
    }

    setLoading(true)

    try {
      const status = active ? IntegrationStatusEnum.ACTIVE : IntegrationStatusEnum.DISABLED

      await IntegrationService.updateStatus(formId, app.id, status)
      setActive(active)
    } catch (err: any) {
      console.error(err)
    }

    setLoading(false)
  }

  async function handleDeleteSettings() {
    if (loading2) {
      return
    }

    setLoading2(true)

    try {
      await IntegrationService.deleteSettings(formId, app.id)
      onDelete()
    } catch (err: any) {
      console.error(err)
    }

    setLoading2(false)
  }

  if (app.internalType === AppInternalTypeEnum.OPEN_APP_OAUTH) {
    return (
      <ConnectButton type="primary" icon={<ShareBoxIcon />} onClick={handleOpenHomepage}>
        {t('Connect')}
      </ConnectButton>
    )
  } else if (isIntegrated) {
    return (
      <Flex align="center">
        <Switch value={active} loading={loading} onChange={handleUpdateStatus} />
        <DeleteButton size="small" loading={loading2} onClick={handleDeleteSettings}>
          {t('Delete')}
        </DeleteButton>
      </Flex>
    )
  } else {
    return (
      <ConnectButton type="primary" onClick={onClick}>
        {t('Connect')}
      </ConnectButton>
    )
  }
}

export const AppItem: FC<AppItemProps> = ({ app, onClick, onDelete, ...restProps }) => {
  const { t } = useTranslation()

  function handleClick() {
    onClick(app)
  }

  return (
    <Container {...restProps}>
      <AppInfo align="center">
        <LazyLoad scrollContainer=".content" height={120} once>
          <Logo url={app.avatar!} width={120} height={120} />
        </LazyLoad>
        <Center>
          <Title>{t(app.name)}</Title>
          <Description>{t(app.description as any)}</Description>
        </Center>
        {app.status === AppStatusEnum.ACTIVE ? (
          <AppItemAction app={app} onClick={handleClick} onDelete={onDelete} />
        ) : (
          <ComingSoon>{t('Coming soon')}</ComingSoon>
        )}
      </AppInfo>
    </Container>
  )
}

const LogoCss = css`
  position: relative;
  width: 54px;
  height: 54px;
  overflow: hidden;

  &,
  &:after {
    border-radius: 3px;
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 9;
    border: 1px solid rgba(0, 0, 0, 0.05);
  }
`

const Container = styled.div`
  margin-bottom: 24px;

  .lazyload-wrapper {
    ${LogoCss};
    padding: 10px;
    background: #fff;
  }
`

const AppInfo = styled(Flex)`
  margin-top: 10px;
  margin-bottom: 10px;
`

const Logo = styled(Image)`
  width: 34px;
  height: 34px;

  img {
    object-fit: cover;
    aspect-ratio: 1 / 1;
  }
`

const Center = styled.div`
  flex: 1;
  margin-left: 20px;
  margin-right: 30px;
`

const Title = styled.div`
  margin-bottom: 4px;
  font-size: 14px;
  color: #4e5d78;
  font-weight: 500;
`

const Description = styled.div`
  color: #b0b7c3;
`

const ComingSoon = styled.span`
  padding: 8px 12px;
  background: ${props => props.theme.deepBackground};
  font-size: 12px;
  color: #b0b7c3;
  text-transform: uppercase;
`

const ConnectButton = styled(Button)`
  padding-left: 20px;
  padding-right: 20px;
  height: 32px;
`

const DeleteButton = styled(Button)`
  margin-left: 12px;
`
