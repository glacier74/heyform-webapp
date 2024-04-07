/**
 * @program: dashboard-next
 * @description: Airtable
 * @author: Mufeng
 * @date: 2021-06-16 21:18
 **/
import { Form, Input } from '@heyforms/ui'
import { observer } from 'mobx-react-lite'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { useStore } from '@/store'

import { MapFields } from './MapFields'
import { SettingsProps, SettingsWrapper } from './SettingsWrapper'

export const Airtable: FC<SettingsProps> = observer(({ app, onFinish }) => {
  const formStore = useStore('formStore')
  const formFields = formStore.fields
  const { t } = useTranslation()

  return (
    <SettingsWrapper
      app={app}
      onFinish={onFinish}
      initialValues={{
        fields: [[]]
      }}
    >
      <Form.Item
        name="apiKey"
        label={t('integration.airtableLabel')}
        extra={
          <>
            {t('integration.AirtableText')}{' '}
            <a href="https://airtable.com/account" target="_blank" rel="noreferrer">
              {t('integration.airtablePage')}
            </a>
            .
          </>
        }
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="base"
        label={t('integration.AirtableId')}
        extra={
          <>
            {t('integration.open')}{' '}
            <a href="https://airtable.com/api" target="_blank" rel="noreferrer">
              {t('integration.airtableLink')}
            </a>{' '}
            {t('integration.airtableIDText')}
          </>
        }
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="table"
        label={t('integration.tableName')}
        extra={
          <>
            {t('integration.tableText')} <br />
            {t('integration.tableText2')}
          </>
        }
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <MapFields
        name="fields"
        label={t('integration.mapFields')}
        extra={t('integration.tableText3')}
        leftOptions={formFields}
        leftLabelKey="title"
        leftValueKey="id"
        leftPlaceholder="HeyForm question"
        leftTipText="Select HeyForm question"
        rightPlaceholder="Airtable field"
      />
    </SettingsWrapper>
  )
})
