/**
 * @program: dashboard-next
 * @description: Osticket
 * @author: Mufeng
 * @date: 2022-07-15 15:28
 **/

import { useStore } from '@/legacy_pages/utils'
import { useParam } from '@/utils'
import { FormItem, Input, Select } from '@heyui/component'
import { observer } from 'mobx-react-lite'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { SettingsProps, SettingsWrapper } from './SettingsWrapper'

export const Osticket: FC<SettingsProps> = observer(({ app, onFinish }) => {
  const { formId } = useParam()
  const formStore = useStore('formStore')
  const formFields = formStore.fields
  const { t } = useTranslation()

  return (
    <SettingsWrapper app={app} onFinish={onFinish}>
      <FormItem
        name="serverURL"
        label={t('integration.serverURL')}
        description={<>{t('integration.serverURLText')}</>}
        rules={[{ type: 'url', required: true }]}
      >
        <Input />
      </FormItem>
      <FormItem
        name="apiKey"
        label={t('integration.ApiKey')}
        description={
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
      </FormItem>
      <FormItem name="name" label={t('integration.UserNameRequired')} rules={[{ required: true }]}>
        <Select
          options={formFields as any}
          labelKey="title"
          tipText={t('integration.selectQuestion')}
        />
      </FormItem>
      <FormItem
        name="email"
        label={t('integration.UserEmailRequired')}
        rules={[{ required: true }]}
      >
        <Select
          options={formFields as any}
          labelKey="title"
          tipText={t('integration.selectQuestion')}
        />
      </FormItem>
      <FormItem name="phone" label={t('integration.PhoneNumber')}>
        <Select
          options={formFields as any}
          labelKey="title"
          tipText={t('integration.selectQuestion')}
        />
      </FormItem>
      <FormItem name="subject" label={t('integration.Subject')} rules={[{ required: true }]}>
        <Select
          options={formFields as any}
          labelKey="title"
          tipText={t('integration.selectQuestion')}
        />
      </FormItem>
      <FormItem name="message" label={t('integration.Message')} rules={[{ required: true }]}>
        <Select
          options={formFields as any}
          labelKey="title"
          tipText={t('integration.selectQuestion')}
        />
      </FormItem>
    </SettingsWrapper>
  )
})
