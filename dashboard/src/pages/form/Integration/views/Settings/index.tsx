import { Modal } from '@heyforms/ui'
import { observer } from 'mobx-react-lite'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Async } from '@/components'
import { AppService, FormService } from '@/service'
import { useStore } from '@/store'
import { useParam } from '@/utils'

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
import { Osticket } from './views/Osticket'
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
  const [loading, setLoading] = useState(false)
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

  function handleRequest(isLoading: boolean) {
    setLoading(isLoading)
  }

  function handleClose() {
    onVisibleChange?.(false)
  }

  return (
    <Modal
      visible={visible}
      maskClosable={true}
      showCloseIcon={true}
      confirmLoading={loading}
      onClose={handleClose}
    >
      <Async
        request={fetchIntegrations}
        className="pt-8 pb-3"
        deps={[formId]}
        cacheFirst={integrationStore.apps.length > 0}
      >
        {(() => {
          switch (app?.uniqueId) {
            case 'mailchimp':
              return <Mailchimp app={app} onRequest={handleRequest} onFinish={handleClose} />

            case 'googledrive':
              return <GoogleDrive app={app} onRequest={handleRequest} onFinish={handleClose} />

            case 'googlesheets':
              return <GoogleSheets app={app} onRequest={handleRequest} onFinish={handleClose} />

            case 'airtable':
              return <Airtable app={app} onRequest={handleRequest} onFinish={handleClose} />

            case 'hubspot':
              return <Hubspot app={app} onRequest={handleRequest} onFinish={handleClose} />

            case 'monday':
              return <Monday app={app} onRequest={handleRequest} onFinish={handleClose} />

            case 'supportpal':
              return <SupportPal app={app} onRequest={handleRequest} onFinish={handleClose} />

            case 'osticket':
              return <Osticket app={app} onRequest={handleRequest} onFinish={handleClose} />

            case 'github':
              return <Github app={app} onRequest={handleRequest} onFinish={handleClose} />

            case 'gitlab':
              return <Gitlab app={app} onRequest={handleRequest} onFinish={handleClose} />

            case 'dropbox':
              return <Dropbox app={app} onRequest={handleRequest} onFinish={handleClose} />

            case 'googleanalytics':
              return (
                <CommonSettings
                  app={app}
                  onRequest={handleRequest}
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
                            className="underline"
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
                  onRequest={handleRequest}
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
                            className="underline"
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
                  onRequest={handleRequest}
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
                  onRequest={handleRequest}
                  onFinish={handleClose}
                  options={[
                    {
                      name: 'webhook',
                      label: t('integration.labelSlack'),
                      description: (
                        <>
                          {t('integration.addA')}{' '}
                          <a
                            className="underline"
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
                  onRequest={handleRequest}
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
                            className="underline"
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
                  onRequest={handleRequest}
                  onFinish={handleClose}
                  options={[
                    {
                      name: 'chatId',
                      label: t('integration.chatId'),
                      description: (
                        <>
                          {t('integration.Add')}{' '}
                          <a
                            href="https://t.me/HeyForm_bot"
                            className="underline"
                            target="_blank"
                            rel="noreferrer"
                          >
                            @HeyForm_bot
                          </a>{' '}
                          {t('integration.toTelegram')}
                          <code>/start@HeyForm_bot</code> {t('integration.inTelegram')}
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
                  onRequest={handleRequest}
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
      </Async>
    </Modal>
  )
})
