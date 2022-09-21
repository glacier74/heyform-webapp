import { CAPTCHA_KIND_OPTIONS } from '@/consts'
import { Form, Select, Switch } from '@heyforms/ui'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const Protection: FC = () => {
  const { t } = useTranslation()

  return (
    <div
      id="form-settings-protection"
      className="form-settings-selection px-6 pt-6 pb-8 bg-white sm:rounded-md shadow space-y-6"
    >
      <div className="text-lg font-medium text-slate-900">{t('formSettings.Protection')}</div>

      {/* Captcha */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <div className="text-sm leading-6 font-medium text-slate-900">
            {t('formSettings.Bots')}
          </div>
          <p className="mt-1 text-sm text-slate-500">{t('formSettings.BotsText')}</p>
        </div>

        <Form.Item className="ml-4 mb-0" name="captchaKind" rules={[{ required: true }]}>
          <Select options={CAPTCHA_KIND_OPTIONS} />
        </Form.Item>
      </div>

      {/* Anti spam */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <div className="text-sm leading-6 font-medium text-slate-900">
            {t('formSettings.Anti')}
          </div>
          <p className="mt-1 text-sm text-slate-500">{t('formSettings.AntiText')}</p>
        </div>

        <Form.Item className="ml-4 mb-0" name="filterSpam" rules={[{ required: true }]}>
          <Switch />
        </Form.Item>
      </div>
    </div>
  )
}
