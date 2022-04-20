import { LogoIcon, RedirectUriLink } from '@/components'
import { AuthService } from '@/service'
import { useRouter } from '@/utils'
import { Button, Form, Input } from '@heyforms/ui'
import { useTranslation } from 'react-i18next'
import { ThirdPartyLogin } from './views/ThirdPartyLogin'
import './style.scss'

const Login = () => {
  const router = useRouter()
  const { t } = useTranslation()

  async function handleFinish(values: any) {
    await AuthService.login(values.email, values.password)
    router.redirect()
  }

  return (
    <div>
      <div>
        <LogoIcon className="h-8 w-auto" />
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">{t('login.signIn')}</h2>
        <p className="mt-2 text-sm text-gray-600">
          {t('login.or')} {''}
          <RedirectUriLink
            href="/sign-up"
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
            className="login-form-zh_cn"
            submitText={t('login.button')}
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
              rules={[{ required: true }]}
            >
              <Input type="tel" />
            </Form.Item>

            <Form.Item name="code" label={t('login.Code')} rules={[{ required: true }]}>
              <Input
                trailing={
                  <Button.Link className="mobile-verification-code">
                    {t('login.GetCode')}
                  </Button.Link>
                }
              />
            </Form.Item>
          </Form.Custom>
        </div>
      </div>
    </div>
  )
}

export default Login
