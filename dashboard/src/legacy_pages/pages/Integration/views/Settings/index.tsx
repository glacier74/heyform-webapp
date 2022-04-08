import { Request } from '@/legacy_pages/components'
import { NavBarContainer } from '@/legacy_pages/layouts/views/NavBarContainer'
import { useStore } from '@/legacy_pages/utils'
import { AppService, FormService } from '@/service'
import { useParam } from '@/utils'
import { observer } from 'mobx-react-lite'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Airtable } from './views/Airtable'
import { CommonSettings } from './views/CommonSettings'
import { Dropbox } from './views/Dropbox'
import { Github } from './views/Github'
import { Gitlab } from './views/Gitlab'
import { GoogleDrive } from './views/GoogleDrive'
import { GoogleSheets } from './views/GoogleSheets'
import { Hubspot } from './views/Hubspot'
import { Mailchimp } from './views/Mailchimp'
import { Monday } from './views/Monday'
import { SupportPal } from './views/SupportPal'


interface SettingsProps {
  appId?: string
  visible?: boolean
  onVisibleChange?: (visible: boolean) => void
}

export const Settings: FC<SettingsProps> = observer(({ appId, visible, onVisibleChange }) => {
  const { formId } = useParam()
  const integrationStore = useStore('integrationStore')
  const app = integrationStore.integratedApps.find(row => row.id === appId)
  const { t } = useTranslation()

  async function fetchIntegrations() {
    const [result1, result2] = await Promise.all([
      AppService.apps(),
      FormService.integrations(formId)
    ])

    integrationStore.setApps(result1)
    integrationStore.setIntegrations(result2)

    return true
  }

  function handleClose() {
    onVisibleChange && onVisibleChange(false)
  }

  return (
    <>
      {visible && (
        <Container close={true} onClose={handleClose}>
          <Request
            fetch={fetchIntegrations}
            deps={[formId]}
            useCache={integrationStore.apps.length > 0}
          >
            {(() => {
              switch (app?.uniqueId) {
                case 'mailchimp':
                  return <Mailchimp app={app} onFinish={handleClose}/>

                case 'googledrive':
                  return <GoogleDrive app={app} onFinish={handleClose}/>

                case 'googlesheets':
                  return <GoogleSheets app={app} onFinish={handleClose}/>

                case 'airtable':
                  return <Airtable app={app} onFinish={handleClose}/>

                case 'hubspot':
                  return <Hubspot app={app} onFinish={handleClose}/>

                case 'monday':
                  return <Monday app={app} onFinish={handleClose}/>

                case 'supportpal':
                  return <SupportPal app={app} onFinish={handleClose}/>

                case 'github':
                  return <Github app={app} onFinish={handleClose}/>

                case 'gitlab':
                  return <Gitlab app={app} onFinish={handleClose}/>

                case 'dropbox':
                  return <Dropbox app={app} onFinish={handleClose}/>

                case 'googleanalytics':
                  return (
                    <CommonSettings
                      app={app}
                      onFinish={handleClose}
                      options={[
                        {
                          name: 'trackingCode',
                          label: t('integration.trackingCode'),
                          placeholder: 'e.g. UA-XXXXX-Y',
                          description: (
                            <>
                              {t('integration.copyGoogle')}{' '}
                              <a
                                href="https://support.google.com/analytics/answer/1008080?hl=en#zippy=%2Cin-this-article"
                                target="_blank"
                                rel="noreferrer"
                              >
                                {t('integration.link')}
                              </a>
                            </>
                          ),
                          rules: [
                            {
                              required: true
                            }
                          ]
                        }
                      ]}
                    />
                  )

                case 'facebookpixel':
                  return (
                    <CommonSettings
                      app={app}
                      onFinish={handleClose}
                      options={[
                        {
                          name: 'trackingCode',
                          label: t('integration.PixelID'),
                          placeholder: 'e.g. 100xxxxxxxxxxxxx',
                          description: (
                            <>
                              {t('integration.copyId')}{' '}
                              <a
                                href="https://www.facebook.com/business/help/952192354843755?id=1205376682832142"
                                target="_blank"
                                rel="noreferrer"
                              >
                                {t('integration.findId')}
                              </a>
                            </>
                          ),
                          rules: [
                            {
                              required: true
                            }
                          ]
                        }
                      ]}
                    />
                  )

                case 'email':
                  return (
                    <CommonSettings
                      app={app}
                      onFinish={handleClose}
                      options={[
                        {
                          name: 'email',
                          label: t('login.Email'),
                          rules: [{ required: true, type: 'email' }]
                        }
                      ]}
                    />
                  )

                case 'lark':
                  return (
                    <CommonSettings
                      app={app}
                      onFinish={handleClose}
                      options={[
                        {
                          name: 'webhook',
                          label: t('integration.labelSlack'),
                          description: (
                            <>
                              {t('integration.addA')}{' '}
                              <a
                                href="https://www.larksuite.com/hc/en-US/articles/360048487736#1.1%20Use%20custom%20bots%20in%20a%20group"
                                target="_blank"
                                rel="noreferrer"
                              >
                                {t('integration.customBots')}
                              </a>{' '}
                              {t('integration.customBotText')}
                            </>
                          ),
                          rules: [
                            {
                              required: true,
                              pattern: /^https:\/\/open.feishu.cn\/open-apis\/bot\//
                            }
                          ]
                        }
                      ]}
                    />
                  )

                case 'legacyslack':
                  return (
                    <CommonSettings
                      app={app}
                      onFinish={handleClose}
                      options={[
                        {
                          name: 'webhook',
                          label: t('integration.labelSlack'),
                          description: (
                            <>
                              {t('integration.createS')}{' '}
                              <a
                                href="https://api.slack.com/apps/new"
                                target="_blank"
                                rel="noreferrer"
                              >
                                {t('integration.appSlack')}
                              </a>
                              ,{t('integration.pasteSlack')}
                            </>
                          ),
                          rules: [
                            {
                              required: true,
                              pattern: /^https:\/\/hooks.slack.com\/services\//
                            }
                          ]
                        }
                      ]}
                    />
                  )

                case 'telegram':
                  return (
                    <CommonSettings
                      app={app}
                      onFinish={handleClose}
                      options={[
                        {
                          name: 'chatId',
                          label: t('integration.chatId'),
                          description: (
                            <>
                              {t('integration.Add')}{' '}
                              <a href="https://t.me/HeyForm_bot" target="_blank" rel="noreferrer">
                                @HeyForm_bot
                              </a>{' '}
                              {t('integration.toTele')} <code>/start@HeyForm_bot</code> {t('integration.inTele')}
                            </>
                          ),
                          rules: [
                            {
                              required: true,
                              pattern: /^-?\d+$/
                            }
                          ]
                        }
                      ]}
                    />
                  )

                case 'webhook':
                  return (
                    <CommonSettings
                      app={app}
                      onFinish={handleClose}
                      options={[
                        {
                          name: 'webhook',
                          label: t('integration.labelWeb'),
                          rules: [
                            {
                              type: 'url',
                              required: true
                            }
                          ]
                        }
                      ]}
                    />
                  )
              }
            })()}
          </Request>
        </Container>
      )}
    </>
  )
})

const Container = styled(NavBarContainer)`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  z-index: 99;
  overflow-y: auto;

  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }

  .content {
    padding-top: 140px;

    .hey-form-item {
      padding-bottom: 24px;

      &.hey-form-item-inline {
        padding-bottom: 0;
      }
    }

    .hey-label {
      margin-bottom: 10px;
      color: #4e5d78;

      label {
        font-weight: 400;
      }
    }

    .hey-label-less {
      .hey-label {
        margin-bottom: 0;
      }
    }

    .hey-input {
      input {
        padding: 10px;

        &:hover {
          border-color: #377dff;
        }

        &::placeholder {
          color: #b0b7c3;
        }
      }

      & > svg {
        position: absolute;
        top: 50%;
        left: 14px;
        margin-top: -10px;
      }

      svg {
        width: 20px;
        height: 20px;
        color: #c1c7d0;
      }
    }

    .hey-button {
      height: 40px;
      padding: 10px 24px;

      &:hover {
        border-color: #377dff;
      }
    }

    .hey-select {
      .hey-select-placeholder {
        height: 20px;
        color: #b0b7c3;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }

      &:hover .hey-button {
        border-color: #377dff;
      }
    }
  }
`
