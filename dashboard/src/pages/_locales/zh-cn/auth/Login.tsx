import { LogoIcon, MobilePhoneCode } from '@/components'
import { useQuery } from '@/legacy_pages/utils'
import { AuthService } from '@/service'
import { isPhoneNumber, useRouter } from '@/utils'
import { Form, Input, useForm } from '@heyforms/ui'
import { isValid } from '@hpnp/utils/helper'
import { useCallback, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import './style.scss'
import { ThirdPartyLogin } from './views/ThirdPartyLogin'

const Login = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const [form] = useForm()
  const [phoneNumber, setPhoneNumber] = useState<string>()

  const { redirect_uri } = useQuery()
  const nextURL = isValid(redirect_uri) ? redirect_uri : '/'

  async function handleFinish(values: any) {
    await AuthService.loginWithPhoneNumber(values.phoneNumber, values.code)
    router.redirect(nextURL)
  }

  function handleValuesChange(_: any, values: any) {
    setPhoneNumber(values.phoneNumber)
  }

  async function handleSendCode(data: any) {
    await AuthService.loginCode({
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
  const memoMobilePhoneCode = (
    <MobilePhoneCode request={handleSendCodeCallback} onClick={handleClickCallback} />
  )

  return (
    <div>
      <div>
        <LogoIcon className="h-8 w-auto" />
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">{t('login.signIn')}</h2>
      </div>

      <div className="mt-8">
        <div>
          <div>
            <p className="text-sm font-medium text-gray-700">{t('login.signWith')}</p>
            <ThirdPartyLogin />
          </div>

          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">{t('login.continueWith')}</span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Form.Custom
            form={form}
            className="login-form-zh_cn"
            submitText={t('login.button')}
            submitOptions={{
              type: 'primary',
              className: 'mt-6',
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
              <Input type="tel" trailing={memoMobilePhoneCode} />
            </Form.Item>

            <Form.Item
              name="code"
              label={t('login.Code')}
              rules={[{ required: true, message: t('login.PhoneNumberRequired') }]}
            >
              <Input />
            </Form.Item>

            <div className="mt-6 mb-3">
              <p className="text-sm text-gray-500">
                <Trans i18nKey="login.termsPrivacy">
                  By signing in, you agree to our{' '}
                  <a
                    href="https://community.heyform.net/t/terms-conditions/33"
                    className="font-medium text-gray-700 underline"
                    target="_blank"
                  >
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a
                    href="https://community.heyform.net/t/privacy-policy/34"
                    className="font-medium text-gray-700 underline"
                    target="_blank"
                  >
                    Privacy Policy
                  </a>
                  .
                </Trans>
              </p>
            </div>
          </Form.Custom>
        </div>
      </div>
    </div>
  )
}

export default Login
