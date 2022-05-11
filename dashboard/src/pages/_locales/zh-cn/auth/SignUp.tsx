import { LogoIcon, MobilePhoneCode } from '@/components'
import { useQuery } from '@/legacy_pages/utils'
import { AuthService } from '@/service'
import { isPhoneNumber, useRouter } from '@/utils'
import { Form, Input, useForm } from '@heyforms/ui'
import { isValid } from '@hpnp/utils/helper'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

const SignUp = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const [form] = useForm()
  const [phoneNumber, setPhoneNumber] = useState<string>()

  const { redirect_uri } = useQuery()
  const nextURL = isValid(redirect_uri) ? `/verify-email?${redirect_uri}` : '/verify-email'

  async function handleFinish(values: any) {
    await AuthService.signUpWithPhoneNumber(values)
    router.push(nextURL)
  }

  function handleValuesChange(_: any, values: any) {
    setPhoneNumber(values.phoneNumber)
  }

  async function handleSendCode(data: any) {
    await AuthService.signUpCode({
      ...data,
      phoneNumber
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

  const handleSendCodeCallback = useCallback(handleSendCode, [phoneNumber])
  const handleClickCallback = useCallback(handleClick, [])

  const MemoMobilePhoneCode = (
    <MobilePhoneCode request={handleSendCodeCallback} onClick={handleClickCallback} />
  )

  return (
    <div>
      <div>
        <LogoIcon className="h-8 w-auto" />
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">{t('auth.signup.signUp')}</h2>
        <p className="mt-2 text-sm text-gray-600">{t('auth.signup.description')}</p>
      </div>

      <div className="mt-8">
        <Form.Custom
          form={form}
          submitText={t('auth.signup.button')}
          submitOptions={{
            type: 'primary',
            className: 'mt-3',
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
            name="password"
            label={t('login.Password')}
            rules={[
              {
                required: true,
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[!#$%&()*+\-,.\/\\:<=>?@\[\]^_{|}~0-9a-zA-Z]{8,}$/,
                message: t('auth.signup.PasswordViolation')
              }
            ]}
          >
            <Input.Password />
          </Form.Item>

          <div className="mt-6">
            <p className="text-sm text-gray-500">
              {t('auth.signup.agreeTo')}{' '}
              <a
                href="https://community.heyform.net/t/terms-conditions/33"
                className="font-medium text-gray-700 underline"
                target="_blank"
              >
                {t('auth.signup.terms')}
              </a>{' '}
              {t('auth.signup.and')}{' '}
              <a
                href="https://community.heyform.net/t/privacy-policy/34"
                className="font-medium text-gray-700 underline"
                target="_blank"
              >
                {t('auth.signup.privacy')}
              </a>
              .
            </p>
          </div>
        </Form.Custom>
      </div>
    </div>
  )
}

export default SignUp
