import { LogoIcon, RedirectUriLink } from '@/components'
import { AuthService } from '@/service'
import { isPhoneNumber, useQuery, useRouter } from '@/utils'
import { Checkbox, Form, Input } from '@heyforms/ui'
import { isValid } from '@hpnp/utils/helper'
import { useTranslation } from 'react-i18next'
import './style.scss'

const BindAccount = () => {
  const router = useRouter()
  const { t } = useTranslation()

  const { kind, encrypted_data, redirect_uri } = useQuery()
  const nextURL = isValid(redirect_uri) ? redirect_uri : '/'

  async function handleFinish(values: any) {
    await AuthService.bindAccount({
      ...values,
      kind,
      encryptedData: encrypted_data
    })
    router.redirect(nextURL)
  }

  return (
    <div>
      <div>
        <LogoIcon className="h-8 w-auto" />
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">{t('login.bindAccount')}</h2>
        <p className="mt-2 text-sm text-gray-600">{t('login.bindAccountDescription')}</p>
      </div>

      <div className="mt-8">
        <div className="mt-6">
          <Form.Custom
            className="login-form-zh_cn"
            submitText={t('login.signInAndBindPhoneNumber')}
            submitOptions={{
              type: 'primary',
              className: 'mt-6',
              block: true
            }}
            request={handleFinish}
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
              name="password"
              label={t('login.Password')}
              rules={[{ required: true, message: t('login.PasswordRequired') }]}
            >
              <Input.Password />
            </Form.Item>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox>{t('login.rememberMe')}</Checkbox>
              </div>

              <div className="text-sm">
                <RedirectUriLink
                  href="/sign-up"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  {t('login.noAccount')}
                </RedirectUriLink>
              </div>
            </div>
          </Form.Custom>
        </div>
      </div>
    </div>
  )
}

export default BindAccount
