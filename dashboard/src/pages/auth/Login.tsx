import { RedirectUriLink } from '@/components'
import { AuthService } from '@/service'
import { useQueryURL, useRouter } from '@/utils'
import { Checkbox, Form, Input } from '@heyforms/ui'
import { useTranslation } from 'react-i18next'
import { ThirdPartyLogin } from './views/ThirdPartyLogin'

const Login = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const nextURL = useQueryURL('/')

  async function handleFinish(values: any) {
    await AuthService.login(values.email, values.password)
    router.redirect(nextURL)
  }

  return (
    <div>
      <div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">{t('login.signIn')}</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {t('login.or')} {''}
          <RedirectUriLink
            href="/sign-up"
            className="font-medium text-blue-700 hover:text-blue-800"
          >
            {t('login.startFree')}
          </RedirectUriLink>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Form.Custom
            submitText={t('login.button')}
            submitOptions={{
              type: 'primary',
              className: 'mt-6',
              block: true
            }}
            request={handleFinish}
          >
            <Form.Item
              name="email"
              label={t('login.Email')}
              rules={[{ type: 'email', required: true, message: t('login.EmailRequired') }]}
            >
              <Input type="email" />
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
                  href="/forgot-password"
                  className="font-medium text-blue-700 hover:text-blue-800"
                >
                  {t('login.forgotPassword')}
                </RedirectUriLink>
              </div>
            </div>
          </Form.Custom>

          <div className="mt-6 mb-4 relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">{t('login.continueWith')}</span>
            </div>
          </div>

          <div>
            <ThirdPartyLogin />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
