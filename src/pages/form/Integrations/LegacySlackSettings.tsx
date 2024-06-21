import { Trans, useTranslation } from 'react-i18next'

import { Form, Input } from '@/components'

import IntegrationSettingsForm, { IntegrationSettingsFormProps } from './SettingsForm'

export default function LegacySlackSettings({ app }: IntegrationSettingsFormProps) {
  const { t } = useTranslation()

  return (
    <IntegrationSettingsForm app={app}>
      <Form.Item
        name="webhook"
        label={t('form.integrations.legacyslack.label')}
        rules={[
          {
            type: 'url',
            message: t('form.integrations.legacyslack.invalid')
          }
        ]}
        footer={
          <Trans
            t={t}
            i18nKey="form.integrations.legacyslack.footer"
            components={{
              a1: (
                <a
                  className="text-primary underline"
                  href="https://api.slack.com/apps/new"
                  target="_blank"
                  rel="noreferrer"
                />
              ),
              a2: (
                <a
                  className="text-primary underline"
                  href="https://api.slack.com/messaging/webhooks"
                  target="_blank"
                  rel="noreferrer"
                />
              )
            }}
          />
        }
      >
        <Input placeholder="https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXX" />
      </Form.Item>
    </IntegrationSettingsForm>
  )
}
