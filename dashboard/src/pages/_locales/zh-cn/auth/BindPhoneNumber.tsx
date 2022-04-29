import { LogoIcon, MobilePhoneCode } from '@/components'
import { AuthService } from '@/service'
import { isPhoneNumber, useQuery, useRouter } from '@/utils'
import { Form, Input, useForm } from '@heyforms/ui'
import { isValid } from '@hpnp/utils/helper'
import { useCallback, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import './style.scss'

const BindPhoneNumber = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const [form] = useForm()
  const [phoneNumber, setPhoneNumber] = useState<string>()

  const { kind, encrypted_data, redirect_uri } = useQuery()
  const nextURL = isValid(redirect_uri) ? redirect_uri : '/'

  async function handleFinish(values: any) {
    await AuthService.bindPhoneNumber(values.phoneNumber, values.code, kind, encrypted_data)
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
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">{t('login.bindPhoneNumber')}</h2>
      </div>

      <div className="mt-8">
        <div className="mt-6">
          <Form.Custom
            form={form}
            className="login-form-zh_cn"
            submitText={t('login.signInAndBindPhoneNumber')}
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

export default BindPhoneNumber