/**
 * @program: dashboard-next
 * @description: Airtable
 * @author: Mufeng
 * @date: 2021-06-16 21:18
 **/

import { MapFields } from '@/legacy_pages/pages/Integration/views/Settings/views/MapFields'
import { SettingsProps, SettingsWrapper } from '@/legacy_pages/pages/Integration/views/Settings/views/SettingsWrapper'
import { useStore } from '@/legacy_pages/utils'
import { FormItem, Input } from '@heyui/component'
import { observer } from 'mobx-react-lite'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const Airtable: FC<SettingsProps> = observer(({ app, onFinish }) => {
  const formStore = useStore('formStore')
  const formFields = formStore.current?.fields || []
  const { t } = useTranslation()

  return (
    <SettingsWrapper
      app={app}
      onFinish={onFinish}
      initialValues={{
        fields: [[]]
      }}
    >
      <FormItem
        name="apiKey"
        label={t('integration.airtableLabel')}
        description={
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
        <Input/>
      </FormItem>
      <FormItem
        name="base"
        label={t(('integration.AirtableId'))}
        description={
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
        <Input/>
      </FormItem>
      <FormItem
        name="table"
        label={t('integration.tableName')}
        description={
          <>
            {t('integration.tableText')} <br/>
            {t('integration.tableText2')}
          </>
        }
        rules={[{ required: true }]}
      >
        <Input/>
      </FormItem>
      <MapFields
        name="fields"
        label={t('integration.mapFields')}
        description={t('integration.tableText3')}
        leftOptions={formFields}
        leftLabelKey="title"
        leftPlaceholder="HeyForm question"
        leftTipText="Select HeyForm question"
        rightPlaceholder="Airtable field"
      />
    </SettingsWrapper>
  )
})
