/**
 * @program: dashboard-next
 * @extra={} : Osticket
 * @author: Mufeng
 * @date: 2022-07-15 15:28
 **/
import { Form, Input, Select } from '@heyforms/ui'
import { observer } from 'mobx-react-lite'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { useStore } from '@/store'
import { useParam } from '@/utils'

import { SettingsProps, SettingsWrapper } from './SettingsWrapper'

export const Osticket: FC<SettingsProps> = observer(({ app, onFinish }) => {
  const { formId } = useParam()
  const formStore = useStore('formStore')
  const formFields = formStore.fields
  const { t } = useTranslation()

  return (
    <SettingsWrapper app={app} onFinish={onFinish}>
      <Form.Item
        name="serverURL"
        label={t('integration.serverURL')}
        extra={<>{t('integration.serverURLText')}</>}
        rules={[{ type: 'url', required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="apiKey"
        label={t('integration.ApiKey')}
        extra={
          <>
            {t('integration.ApiKeyText')}
            <br />
            <a
              href="https://docs.osticket.com/en/latest/Developer%20Documentation/API%20Docs.html"
              target="_blank"
              rel="noreferrer"
            >
              https://docs.osticket.com/en/latest/Developer Documentation/API Docs.html
            </a>
            .
          </>
        }
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="name" label={t('integration.UserNameRequired')} rules={[{ required: true }]}>
        <Select
          options={formFields as any}
          labelKey="title"
          valueKey="id"
          placeholder={t('integration.selectQuestion')}
        />
      </Form.Item>
      <Form.Item
        name="email"
        label={t('integration.UserEmailRequired')}
        rules={[{ required: true }]}
      >
        <Select
          options={formFields as any}
          labelKey="title"
          valueKey="id"
          placeholder={t('integration.selectQuestion')}
        />
      </Form.Item>
      <Form.Item name="phone" label={t('integration.PhoneNumber')}>
        <Select
          options={formFields as any}
          labelKey="title"
          valueKey="id"
          placeholder={t('integration.selectQuestion')}
        />
      </Form.Item>
      <Form.Item name="subject" label={t('integration.Subject')} rules={[{ required: true }]}>
        <Select
          options={formFields as any}
          labelKey="title"
          valueKey="id"
          placeholder={t('integration.selectQuestion')}
        />
      </Form.Item>
      <Form.Item name="message" label={t('integration.Message')} rules={[{ required: true }]}>
        <Select
          options={formFields as any}
          labelKey="title"
          valueKey="id"
          placeholder={t('integration.selectQuestion')}
        />
      </Form.Item>
    </SettingsWrapper>
  )
})
