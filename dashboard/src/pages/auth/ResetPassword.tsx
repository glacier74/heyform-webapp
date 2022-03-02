import { LogoIcon } from '@/components'
import { AuthService } from '@/service'
import { useStore } from '@/store'
import { useRouter } from '@/utils'
import { Form, Input } from '@heyforms/ui'
import { isValid } from '@hpnp/utils/helper'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'

const ResetPassword = () => {
  const router = useRouter()
  const appStore = useStore('appStore')
  const [values, setValues] = useState<IMapType>({})

  function handleChange(_: unknown, val: IMapType) {
    setValues(val)
  }

  async function handleFinish(val: IMapType) {
    await AuthService.resetPassword(appStore.resetPasswordEmail, val.newPassword, val.code)
    router.push('/login')
  }

  return (
    <div>
      <div>
        <LogoIcon className="h-8 w-auto" />
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Reset Password</h2>
        <p className="mt-2 text-sm text-gray-600">
          We've sent you an email with a 6-digit verification code. Please check your inbox at{' '}
          <span className="font-medium text-gray-700">{appStore.resetPasswordEmail}</span>.
        </p>
      </div>

      <div className="mt-8">
        <Form.Custom
          submitText="Continue"
          submitOptions={{
            type: 'primary',
            block: true
          }}
          request={handleFinish}
          onValuesChange={handleChange}
        >
          <Form.Item
            name="code"
            label="Verification code"
            rules={[{ required: true, message: 'Invalid verification code' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="New password"
            rules={[
              {
                required: true,
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[!#$%&()*+\-,.\/\\:<=>?@\[\]^_{|}~0-9a-zA-Z]{8,}$/,
                message:
                  'Your password must be at least 8 characters, and at least 1 uppercase, 1 lowercase and 1 number.'
              }
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="repeatPassword"
            label="Repeat password"
            rules={[
              {
                validator: async (rule, value) => {
                  if (isValid(values.newPassword) && value !== values.newPassword) {
                    throw new Error(rule.message as string)
                  }
                },
                message: 'Your new password and repeat password do not match.'
              }
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form.Custom>
      </div>
    </div>
  )
}

export default observer(ResetPassword)
