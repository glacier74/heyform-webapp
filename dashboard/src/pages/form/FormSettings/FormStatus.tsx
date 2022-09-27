import { useStore } from '@/store'
import { Form, Input, Switch } from '@heyforms/ui'
import { observer } from 'mobx-react-lite'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { ExpirationDate } from './ExpirationDate'

export const FormStatus: FC = observer(() => {
  const { t } = useTranslation()
  const formStore = useStore('formStore')

  return (
    <div
      id="form-settings-status"
      className="form-settings-selection px-6 pt-6 pb-8 bg-white sm:rounded-md shadow space-y-6"
    >
      <div className="text-lg font-medium text-slate-900">{t('formSettings.status')}</div>

      {/* Close form */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <div className="text-sm font-medium text-slate-900">{t('formSettings.closeForm')}</div>
          <p className="mt-1 text-sm text-slate-500">{t('formSettings.closeFormText')}</p>
        </div>

        <Form.Item className="ml-4 mb-0" name="closeForm" rules={[{ required: false }]}>
          <Switch />
        </Form.Item>
      </div>

      {/* Expiration date */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="text-sm font-medium text-slate-900">{t('formSettings.expiration')}</div>
            <p className="mt-1 text-sm text-slate-500">{t('formSettings.expirationText')}</p>
          </div>

          <Form.Item
            className="ml-4 mb-0"
            name="enableExpirationDate"
            rules={[{ required: false }]}
          >
            <Switch />
          </Form.Item>
        </div>

        {formStore.tempSettings.enableExpirationDate && <ExpirationDate />}
      </div>

      {/* Limit submission number */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="text-sm font-medium text-slate-900">{t('formSettings.submission')}</div>
            <p className="mt-1 text-sm text-slate-500">{t('formSettings.submissionText')}</p>
          </div>

          <Form.Item className="ml-4 mb-0" name="enableQuotaLimit" rules={[{ required: false }]}>
            <Switch />
          </Form.Item>
        </div>

        {formStore.tempSettings.enableQuotaLimit && (
          <Form.Item
            name="quotaLimit"
            rules={[
              {
                type: 'number',
                required: true,
                min: 1,
                message: t('formSettings.dataError')
              }
            ]}
          >
            <Input className="w-32" type="number" placeholder={t('formSettings.closedFormTitle')} />
          </Form.Item>
        )}
      </div>

      {/* Closed form message */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="text-sm font-medium text-slate-900">
              {t('formSettings.closedFormMessage')}
            </div>
            <p className="mt-1 text-sm text-slate-500">{t('formSettings.closedFormMessageText')}</p>
          </div>

          <Form.Item className="ml-4 mb-0" name="enableClosedMessage" rules={[{ required: false }]}>
            <Switch />
          </Form.Item>
        </div>

        {formStore.tempSettings.enableClosedMessage && (
          <>
            <Form.Item name="closedFormTitle" rules={[{ required: false }]}>
              <Input placeholder={t('formSettings.closedFormTitle')} />
            </Form.Item>

            <Form.Item name="closedFormDescription" rules={[{ required: false }]}>
              <Input.Textarea rows={6} placeholder={t('formSettings.closedFormDescription')} />
            </Form.Item>
          </>
        )}
      </div>
    </div>
  )
})
