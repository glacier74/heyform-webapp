import { Request } from '@/legacy_pages/components'
import { NavBarContainer } from '@/legacy_pages/layouts/views/NavBarContainer'
import { Dropbox } from './views/Dropbox'
import { Github } from './views/Github'
import { Gitlab } from './views/Gitlab'
import { Airtable } from './views/Airtable'
import { CommonSettings } from './views/CommonSettings'
import { GoogleDrive } from './views/GoogleDrive'
import { GoogleSheets } from './views/GoogleSheets'
import { Hubspot } from './views/Hubspot'
import { Mailchimp } from './views/Mailchimp'
import { Monday } from './views/Monday'
import { SupportPal } from './views/SupportPal'
import { AppService, FormService } from '@/service'
import { useStore } from '@/legacy_pages/utils'
import { observer } from 'mobx-react-lite'
import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useParam } from '@/utils'
import styled from 'styled-components'

interface SettingsProps {
  appId?: string
  visible?: boolean
  onVisibleChange?: (visible: boolean) => void
}

export const Settings: FC<SettingsProps> = observer(({ appId, visible, onVisibleChange }) => {
  const { formId } = useParam()
  const integrationStore = useStore('integrationStore')
  const app = integrationStore.integratedApps.find(row => row.id === appId)

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
                  return <Mailchimp app={app} onFinish={handleClose} />

                case 'googledrive':
                  return <GoogleDrive app={app} onFinish={handleClose} />

                case 'googlesheets':
                  return <GoogleSheets app={app} onFinish={handleClose} />

                case 'airtable':
                  return <Airtable app={app} onFinish={handleClose} />

                case 'hubspot':
                  return <Hubspot app={app} onFinish={handleClose} />

                case 'monday':
                  return <Monday app={app} onFinish={handleClose} />

                case 'supportpal':
                  return <SupportPal app={app} onFinish={handleClose} />

                case 'github':
                  return <Github app={app} onFinish={handleClose} />

                case 'gitlab':
                  return <Gitlab app={app} onFinish={handleClose} />

                case 'dropbox':
                  return <Dropbox app={app} onFinish={handleClose} />

                case 'googleanalytics':
                  return (
                    <CommonSettings
                      app={app}
                      onFinish={handleClose}
                      options={[
                        {
                          name: 'trackingCode',
                          label: 'Tracking Code',
                          placeholder: 'e.g. UA-XXXXX-Y',
                          description: (
                            <>
                              Copy and paste your Google Analytics tracking code below.{' '}
                              <a
                                href="https://support.google.com/analytics/answer/1008080?hl=en#zippy=%2Cin-this-article"
                                target="_blank"
                                rel="noreferrer"
                              >
                                How do I find my tracking code?
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
                          label: 'Pixel ID',
                          placeholder: 'e.g. 100xxxxxxxxxxxxx',
                          description: (
                            <>
                              Copy and paste your Facebook Pixel ID below.{' '}
                              <a
                                href="https://www.facebook.com/business/help/952192354843755?id=1205376682832142"
                                target="_blank"
                                rel="noreferrer"
                              >
                                How do I find my Pixel ID?
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
                          label: 'Email Address',
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
                          label: 'Webhook URL',
                          description: (
                            <>
                              Add a{' '}
                              <a
                                href="https://www.larksuite.com/hc/en-US/articles/360048487736#1.1%20Use%20custom%20bots%20in%20a%20group"
                                target="_blank"
                                rel="noreferrer"
                              >
                                custom bots
                              </a>{' '}
                              in your group, and paste Webhook URL here from bot settings.
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
                          label: 'Webhook URL',
                          description: (
                            <>
                              Create your{' '}
                              <a
                                href="https://api.slack.com/apps/new"
                                target="_blank"
                                rel="noreferrer"
                              >
                                Slack app
                              </a>
                              , enable Incoming Webhooks and paste the Webhook URL here.
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
                          label: 'Chat ID',
                          description: (
                            <>
                              Add{' '}
                              <a href="https://t.me/HeyForm_bot" target="_blank" rel="noreferrer">
                                @HeyForm_bot
                              </a>{' '}
                              to your Telegram group, type <code>/start@HeyForm_bot</code> in the
                              group, you will receive a message with a Chat ID.
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
                          label: 'Custom Webhook URL',
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
