import { LogoIcon, RedirectUriLink } from '@/components'
import { AuthService } from '@/service'
import { useRouter } from '@/utils'
import { Checkbox, Form, Input } from '@heyforms/ui'
import { useTranslation } from 'react-i18next'
import { ThirdPartyLogin } from './views/ThirdPartyLogin'

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
          Or {''}
          <RedirectUriLink
            href="/sign-up"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            start your free trial
          </RedirectUriLink>
        </p>
      </div>

      <div className="mt-8">
        <div>
          <div>
            <p className="text-sm font-medium text-gray-700">Sign in with</p>
            <ThirdPartyLogin />
          </div>

          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Form.Custom
            submitText="Sign In"
            submitOptions={{
              type: 'primary',
              className: 'mt-6',
              block: true
            }}
            request={handleFinish}
          >
            <Form.Item
              name="email"
              label="Email address"
              rules={[{ type: 'email', required: true }]}
            >
              <Input type="email" />
            </Form.Item>

            <Form.Item name="password" label="Password" rules={[{ required: true }]}>
              <Input.Password />
            </Form.Item>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox>Remember me</Checkbox>
              </div>

              <div className="text-sm">
                <RedirectUriLink
                  href="/forgot-password"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot your password?
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
