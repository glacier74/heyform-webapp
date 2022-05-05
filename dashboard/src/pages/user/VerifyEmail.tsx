import { LogoIcon } from '@/components'
import { useQuery } from '@/legacy_pages/utils'
import {
  FormValues,
  SendCode,
  VerifyEmail as VerifyEmailModal
} from '@/pages/user/UserSettings/EmailAddress'
import { UserService } from '@/service'
import { useStore } from '@/store'
import { useRouter, useVisible } from '@/utils'
import { Button, Form, Input, notification } from '@heyforms/ui'
import { isValid } from '@hpnp/utils/helper'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const VerifyEmail: FC = () => {
  const { t } = useTranslation()
  const userStore = useStore('userStore')
  const router = useRouter()
  const { redirect_uri } = useQuery()
  const nextURL = isValid(redirect_uri) ? redirect_uri : '/'

  const [loading, setLoading] = useState(false)
  const [sendCodeVisible, openSendCode, closeSendCode] = useVisible()
  const [verifyEmailVisible, openVerifyEmail, closeVerifyEmail] = useVisible()
  const [formValues, setTempValues] = useState<FormValues>()

  async function handleFinish(values: IMapType) {
    await UserService.verifyEmail(values.code)
    router.redirect(nextURL)
  }

  function handleSendComplete(values: FormValues) {
    setTempValues(values)
    openVerifyEmail()
  }

  function handleVerifyComplete() {
    userStore.update({
      email: formValues?.email,
      isEmailVerified: true
    })
    router.redirect(nextURL)
  }

  async function handleSendEmail() {
    if (userStore.user.isEmailVerified) {
      return router.redirect(nextURL)
    }

    setLoading(true)

    try {
      await UserService.emailVerificationCode()
    } catch (err: any) {
      notification.error({
        title: err.message
      })
    }

    setLoading(false)
  }

  useEffect(() => {
    handleSendEmail()
  }, [])

  return (
    <div>
      <div>
        <LogoIcon className="h-8 w-auto" />
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">{t('user.verifyEmail')}</h2>
        <p className="mt-2 text-sm text-gray-600">
          {t('user.sendEmailText')}{' '}
          <span className="font-medium text-gray-700">{userStore.user.email}</span>.
        </p>
        <p className="mt-2 text-sm text-gray-600">
          {t('user.typoEmail')} <Button.Link onClick={openSendCode}>{t('user.click')}</Button.Link>{' '}
          {t('user.change')}
        </p>
      </div>

      <div className="mt-8">
        <div className="mt-6">
          <Form.Custom
            submitText={t('auth.forgotPassword.continue')}
            submitOptions={{
              type: 'primary',
              block: true
            }}
            request={handleFinish}
          >
            <Form.Item
              name="code"
              label={t('auth.resetPassword.verificationCode')}
              rules={[{ required: true, message: t('auth.resetPassword.invalidCode') }]}
            >
              <Input />
            </Form.Item>
          </Form.Custom>

          <div className="flex items-center justify-center mt-6 sm:text-sm">
            {t('user.text')}{' '}
            <Button.Link
              className="ml-2"
              type="primary"
              loading={loading}
              onClick={handleSendEmail}
            >
              {t('user.resend')}
            </Button.Link>
          </div>
        </div>
      </div>

      <SendCode visible={sendCodeVisible} onClose={closeSendCode} onComplete={handleSendComplete} />
      <VerifyEmailModal
        visible={verifyEmailVisible}
        formValues={formValues}
        onClose={closeVerifyEmail}
        onComplete={handleVerifyComplete}
      />
    </div>
  )
}

export default observer(VerifyEmail)
