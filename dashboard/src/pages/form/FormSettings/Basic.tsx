import { TimeInput } from '@/components/TimeInput'
import { FORM_LOCALES_OPTIONS, IP_LIMIT_OPTIONS, TIME_LIMIT_OPTIONS } from '@/consts'
import { SubmissionArchive } from '@/pages/form/FormSettings/SubmissionArchive'
import { useStore } from '@/store'
import { Form, Input, Select, Switch } from '@heyforms/ui'
import { observer } from 'mobx-react-lite'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const Basic: FC = observer(() => {
  const { t } = useTranslation()
  const formStore = useStore('formStore')

  return (
    <div
      id="form-settings-basic"
      className="form-settings-selection px-6 pt-6 pb-8 bg-white sm:rounded-md shadow space-y-6"
    >
      <div className="text-lg font-medium text-slate-900">{t('formSettings.Basic')}</div>

      {/* Language */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <div className="text-sm leading-6 font-medium text-slate-900">
            {t('formSettings.Language')}
          </div>
          <p className="mt-1 text-sm text-slate-500">{t('formSettings.LanguageDescription')}</p>
        </div>

        <Form.Item className="ml-4 mb-0" name="locale" rules={[{ required: false }]}>
          <Select options={FORM_LOCALES_OPTIONS} />
        </Form.Item>
      </div>

      {/* Submission archive */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <div className="text-sm leading-6 font-medium text-slate-900">
            {t('formSettings.subArchive')}
          </div>
          <p className="mt-1 text-sm text-slate-500">{t('formSettings.archiveText')}</p>
        </div>

        <Form.Item className="ml-4 mb-0" name="allowArchive" rules={[{ required: false }]}>
          <SubmissionArchive />
        </Form.Item>
      </div>

      {/* Progress bar */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <div className="text-sm leading-6 font-medium text-slate-900">
            {t('formSettings.progressBar')}
          </div>
          <p className="mt-1 text-sm text-slate-500">{t('formSettings.progressText')}</p>
        </div>

        <Form.Item className="ml-4 mb-0" name="enableProgress" rules={[{ required: false }]}>
          <Switch />
        </Form.Item>
      </div>

      {/* Time limit */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="text-sm leading-6 font-medium text-slate-900">
              {t('formSettings.timeLimit')}
            </div>
            <p className="mt-1 text-sm text-slate-500">{t('formSettings.timeText')}</p>
          </div>

          <Form.Item className="ml-4 mb-0" name="enableTimeLimit" rules={[{ required: true }]}>
            <Switch />
          </Form.Item>
        </div>

        {formStore.tempSettings.enableTimeLimit && (
          <Form.Item className="mb-0" name="timeLimit" rules={[{ required: false }]}>
            <TimeInput options={TIME_LIMIT_OPTIONS} />
          </Form.Item>
        )}
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

      {/* IP limit */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="text-sm font-medium text-slate-900">{t('formSettings.IpLimit')}</div>
            <p className="mt-1 text-sm text-slate-500">{t('formSettings.IpLimitText')}</p>
          </div>

          <Form.Item className="ml-4 mb-0" name="enableIpLimit" rules={[{ required: false }]}>
            <Switch />
          </Form.Item>
        </div>

        {formStore.tempSettings.enableIpLimit && (
          <div className="flex items-center">
            <Form.Item
              className="mb-0"
              name="ipLimitCount"
              rules={[
                {
                  type: 'number',
                  required: true,
                  min: 1,
                  message: t('formSettings.dataError')
                }
              ]}
            >
              <Input className="w-32" type="number" trailing="times" />
            </Form.Item>

            <span className="px-2 text-sm text-slate-500"> in every </span>

            <Form.Item
              className="mb-0"
              name="ipLimitTime"
              rules={[
                {
                  type: 'number',
                  required: true,
                  min: 1,
                  message: t('formSettings.dataError')
                }
              ]}
            >
              <TimeInput options={IP_LIMIT_OPTIONS} />
            </Form.Item>
          </div>
        )}
      </div>
    </div>
  )
})