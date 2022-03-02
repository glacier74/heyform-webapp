import { LogoIcon } from '@/components'
import {
  FormValues,
  SendCode,
  VerifyEmail as VerifyEmailModal
} from '@/pages/user/UserSettings/EmailAddress'
import { UserService } from '@/service'
import { useStore } from '@/store'
import { useRouter, useVisible } from '@/utils'
import { Button, Form, Input, notification } from '@heyforms/ui'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import { useEffect, useState } from 'react'

const VerifyEmail: FC = () => {
  const router = useRouter()
  const userStore = useStore('userStore')
  const [loading, setLoading] = useState(false)

  const [sendCodeVisible, openSendCode, closeSendCode] = useVisible()
  const [verifyEmailVisible, openVerifyEmail, closeVerifyEmail] = useVisible()
  const [formValues, setTempValues] = useState<FormValues>()

  async function handleFinish(values: IMapType) {
    await UserService.verifyEmail(values.code)
    router.redirect()
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
    router.redirect()
  }

  async function handleSendEmail() {
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
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Verify your email address</h2>
        <p className="mt-2 text-sm text-gray-600">
          We've sent you an email with a 6-digit verification code. Please check your inbox at{' '}
          <span className="font-medium text-gray-700">{userStore.user.email}</span>.
        </p>
        <p className="mt-2 text-sm text-gray-600">
          Made a typo on email address? <Button.Link onClick={openSendCode}>click here</Button.Link>{' '}
          to change it.
        </p>
      </div>

      <div className="mt-8">
        <div className="mt-6">
          <Form.Custom
            submitText="Continue"
            submitOptions={{
              type: 'primary',
              block: true
            }}
            request={handleFinish}
          >
            <Form.Item
              name="code"
              label="Verification code"
              rules={[{ required: true, message: 'Invalid verification code' }]}
            >
              <Input />
            </Form.Item>
          </Form.Custom>

          <div className="flex items-center justify-center mt-6 sm:text-sm">
            Don't receive the code?{' '}
            <Button.Link
              className="ml-2"
              type="primary"
              loading={loading}
              onClick={handleSendEmail}
            >
              Resend
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
