import { Trans, useTranslation } from 'react-i18next'

import { Form, Input } from '@/components'
import { useFormStore } from '@/store'

import { MapFields } from './MapFields'
import IntegrationSettingsForm, { IntegrationSettingsFormProps } from './SettingsForm'

export default function AirtableSettings({ app }: IntegrationSettingsFormProps) {
  const { t } = useTranslation()
  const { formFields } = useFormStore()

  return (
    <IntegrationSettingsForm app={app}>
      {/* API key */}
      <Form.Item
        name="apiKey"
        label={t('form.integrations.airtable.apiKey.headline')}
        footer={
          <Trans
            t={t}
            i18nKey="form.integrations.airtable.apiKey.footer"
            components={{
              a: <span className="text-primary" />
            }}
          />
        }
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      {/* Base ID */}
      <Form.Item
        name="base"
        label={t('form.integrations.airtable.baseId.headline')}
        footer={
          <Trans
            t={t}
            i18nKey="form.integrations.airtable.baseId.footer"
            components={{
              a: (
                <a
                  className="text-primary underline"
                  href="https://docs.osticket.com/en/latest/Developer%20Documentation/API%20Docs.html"
                  target="_blank"
                  rel="noreferrer"
                />
              )
            }}
          />
        }
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      {/* Table */}
      <Form.Item
        name="table"
        label={t('form.integrations.airtable.table.headline')}
        footer={
          <Trans
            t={t}
            i18nKey="form.integrations.airtable.table.footer"
            components={{
              a: (
                <a
                  className="text-primary underline"
                  href="https://docs.osticket.com/en/latest/Developer%20Documentation/API%20Docs.html"
                  target="_blank"
                  rel="noreferrer"
                />
              )
            }}
          />
        }
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      {/* Map questions */}
      <MapFields
        name="fields"
        label={t('form.integrations.mapFields.headline')}
        description={t('form.integrations.mapFields.subHeadline', { name: app?.name })}
        leftOptions={formFields}
        leftLabelKey="title"
        leftValueKey="id"
        leftPlaceholder={t('form.integrations.mapFields.leftPlaceholder')}
        rightPlaceholder={t('form.integrations.mapFields.rightPlaceholder', { name: app?.name })}
      />
    </IntegrationSettingsForm>
  )
}
