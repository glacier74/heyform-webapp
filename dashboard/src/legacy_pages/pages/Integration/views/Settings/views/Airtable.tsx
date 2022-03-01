/**
 * @program: dashboard-next
 * @description: Airtable
 * @author: Mufeng
 * @date: 2021-06-16 21:18
 **/

import { MapFields } from '@/legacy_pages/pages/Integration/views/Settings/views/MapFields'
import {
  SettingsProps,
  SettingsWrapper
} from '@/legacy_pages/pages/Integration/views/Settings/views/SettingsWrapper'
import { useStore } from '@/legacy_pages/utils'
import { FormItem, Input } from '@heyui/component'
import { observer } from 'mobx-react-lite'
import { FC } from 'react'

export const Airtable: FC<SettingsProps> = observer(({ app, onFinish }) => {
  const formStore = useStore('formStore')
  const formFields = formStore.current?.fields || []

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
        label="Airtable API key"
        description={
          <>
            Airtable uses simple token-based authentication. To generate or manage your API key,
            visit your{' '}
            <a href="https://airtable.com/account" target="_blank" rel="noreferrer">
              Airtable account page
            </a>
            .
          </>
        }
        rules={[{ required: true }]}
      >
        <Input />
      </FormItem>
      <FormItem
        name="base"
        label="Airtable base ID"
        description={
          <>
            To obtain the ID of your Airtable base, open the{' '}
            <a href="https://airtable.com/api" target="_blank" rel="noreferrer">
              Airtable API page
            </a>{' '}
            and click on the base that you want to use. You will find the ID of your base in the
            Introduction section.
          </>
        }
        rules={[{ required: true }]}
      >
        <Input />
      </FormItem>
      <FormItem
        name="table"
        label="Table name"
        description={
          <>
            It's crucial to type the table name exactly as it appears in your Airtable base e.g.
            Table 1. <br />
            If you change the table name on Airtable, please update it here too, otherwise the
            integration won't work as expected.
          </>
        }
        rules={[{ required: true }]}
      >
        <Input />
      </FormItem>
      <MapFields
        name="fields"
        label="Map fields"
        description="Map HeyForm to Airtable fields. It's crucial to type the Airtable field names exactly as they appear in your table. If you change a field name on Airtable, please update it here too, otherwise the integration won't work as expected."
        leftOptions={formFields}
        leftLabelKey="title"
        leftPlaceholder="HeyForm question"
        leftTipText="Select HeyForm question"
        rightPlaceholder="Airtable field"
      />
    </SettingsWrapper>
  )
})
