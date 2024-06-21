import { useTranslation } from 'react-i18next'

import { Form, Input } from '@/components'

import IntegrationSettingsForm, { IntegrationSettingsFormProps } from './SettingsForm'

export default function EmailSettings({ app }: IntegrationSettingsFormProps) {
  const { t } = useTranslation()

  return (
    <IntegrationSettingsForm app={app}>
      <Form.Item
        name="email"
        label={t('form.integrations.email.label')}
        rules={[
          {
            type: 'email',
            message: t('form.integrations.email.invalid')
          }
        ]}
      >
        <Input placeholder="jack@example.com" />
      </Form.Item>
    </IntegrationSettingsForm>
  )
}
