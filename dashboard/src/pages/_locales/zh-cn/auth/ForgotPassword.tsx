import { LogoIcon, MobilePhoneCode, RedirectUriLink } from '@/components'
import { AuthService } from '@/service'
import { isPhoneNumber, useRouter } from '@/utils'
import { ChevronLeftIcon } from '@heroicons/react/outline'
import { Form, Input, useForm } from '@heyforms/ui'
import { isValid } from '@hpnp/utils/helper'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

const ForgotPassword = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const [form] = useForm()
  const [formValues, setFormValues] = useState<IMapType>({})

  async function handleFinish(values: IMapType) {
    await AuthService.resetPasswordWithPhoneNumber(
      values.phoneNumber,
      values.newPassword,
      values.code
    )
    router.push('/login')
  }

  function handleValuesChange(_: any, values: any) {
    setFormValues(values)
  }

  async function handleSendCode(data: any) {
    await AuthService.resetPasswordCode({
      ...data,
      phoneNumber: formValues.phoneNumber
    })
  }

  async function handleClick() {
    try {
      await form.validateFields(['phoneNumber'])
    } catch (err) {
      return false
    }

    return true
  }

  const handleSendCodeCallback = useCallback(handleSendCode, [formValues.phoneNumber])
  const handleClickCallback = useCallback(handleClick, [])

  const MemoMobilePhoneCode = (
    <MobilePhoneCode request={handleSendCodeCallback} onClick={handleClickCallback} />
  )

  return (
    <div>
      <div>
        <LogoIcon className="h-8 w-auto" />
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          {t('auth.forgotPassword.forgot')}
        </h2>
      </div>

      <div className="mt-8">
        <Form.Custom
          form={form}
          submitText={t('auth.forgotPassword.continue')}
          submitOptions={{
            type: 'primary',
            block: true
          }}
          request={handleFinish}
          onValuesChange={handleValuesChange}
        >
          <Form.Item
            name="phoneNumber"
            label={t('login.PhoneNumber')}
            rules={[
              {
                required: true,
                validator: async (rule, value) => {
                  if (!isPhoneNumber(value)) {
                    throw new Error(rule.message as string)
                  }
                },
                message: t('login.PhoneNumberRequired')
              }
            ]}
          >
            <Input type="tel" />
          </Form.Item>

          <Form.Item
            name="code"
            label={t('login.Code')}
            rules={[{ required: true, message: t('login.CodeRequired') }]}
          >
            <Input trailing={MemoMobilePhoneCode} />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label={t('auth.resetPassword.newPassword')}
            rules={[
              {
                required: true,
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[!#$%&()*+\-,.\/\\:<=>?@\[\]^_{|}~0-9a-zA-Z]{8,}$/,
                message: t('auth.resetPassword.passwordViolation')
              }
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="repeatPassword"
            label={t('auth.resetPassword.repeatPassword')}
            rules={[
              {
                validator: async (rule, value) => {
                  if (isValid(formValues.newPassword) && value !== formValues.newPassword) {
                    throw new Error(rule.message as string)
                  }
                },
                message: t('auth.resetPassword.passwordMismatch')
              }
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form.Custom>

        <div className="mt-6 text-center text-blue-600 hover:text-blue-500 sm:text-sm">
          <RedirectUriLink href="/login" className="inline-flex items-center">
            <ChevronLeftIcon className="w-5 h-5" /> {t('auth.forgotPassword.link')}
          </RedirectUriLink>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
