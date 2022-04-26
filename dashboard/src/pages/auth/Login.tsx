import { LogoIcon, RedirectUriLink } from '@/components'
import { useQuery } from '@/legacy_pages/utils'
import { AuthService } from '@/service'
import { useRouter } from '@/utils'
import { Checkbox, Form, Input } from '@heyforms/ui'
import { isValid } from '@hpnp/utils/helper'
import { useTranslation } from 'react-i18next'
import { ThirdPartyLogin } from './views/ThirdPartyLogin'

const Login = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const { redirect_uri } = useQuery()
  const nextURL = isValid(redirect_uri) ? redirect_uri : '/'
  const signUpURL = isValid(nextURL)
    ? `/sign-up?redirect_uri=${encodeURIComponent(nextURL)}`
    : '/sign-up'

  async function handleFinish(values: any) {
    await AuthService.login(values.email, values.password)
    router.redirect(nextURL)
  }

  return (
    <div>
      <div>
        <LogoIcon className="h-8 w-auto" />
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">{t('login.signIn')}</h2>
        <p className="mt-2 text-sm text-gray-600">
          {t('login.or')} {''}
          <RedirectUriLink
            href={signUpURL}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            {t('login.startFree')}
          </RedirectUriLink>
        </p>
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
              rules={[{ type: 'email', required: true }]}
            >
              <Input type="email" />
            </Form.Item>

            <Form.Item name="password" label={t('login.Password')} rules={[{ required: true }]}>
              <Input.Password />
            </Form.Item>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox>{t('login.rememberMe')}</Checkbox>
              </div>

              <div className="text-sm">
                <RedirectUriLink
                  href="/forgot-password"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  {t('login.forgotPassword')}
                </RedirectUriLink>
              </div>
            </div>
          </Form.Custom>
        </div>
      </div>
    </div>
  )
}

export default Login
