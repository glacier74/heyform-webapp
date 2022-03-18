import { LogoIcon, RedirectUriLink } from '@/components'
import { AuthService } from '@/service'
import { useRouter } from '@/utils'
import { Form, Input } from '@heyforms/ui'
import { useTranslation } from 'react-i18next'
import { ThirdPartyLogin } from './views/ThirdPartyLogin'

const SignUp = () => {
  const router = useRouter()
  const { t } = useTranslation()

  async function handleFinish(values: any) {
    await AuthService.signUp(values)
    router.push('/verify-email')
  }

  return (
    <div>
      <div>
        <LogoIcon className="h-8 w-auto"/>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">{t('auth.signup.signUp')}</h2>
        <p className="mt-2 text-sm text-gray-600">
          {t('login.or')} {''}
          <RedirectUriLink href="/" className="font-medium text-blue-600 hover:text-blue-500">
            {t('auth.signup.signIn')}
          </RedirectUriLink>
        </p>
      </div>

      <div className="mt-8">
        <div>
          <div>
            <p className="text-sm font-medium text-gray-700"> {t('auth.signup.signWith')}</p>
            <ThirdPartyLogin/>
          </div>

          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300"/>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">{t('auth.signup.continueWith')}</span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Form.Custom
            submitText="Sign Up"
            submitOptions={{
              type: 'primary',
              className: 'mt-3',
              block: true
            }}
            request={handleFinish}
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: t('auth.signup.nameCant') }]}
            >
              <Input/>
            </Form.Item>

            <Form.Item
              name="email"
              label={t('auth.signup.Email')}
              rules={[{ type: 'email', required: true, message: t('auth.signup.invalidEmail') }]}
            >
              <Input type="email"/>
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[!#$%&()*+\-,.\/\\:<=>?@\[\]^_{|}~0-9a-zA-Z]{8,}$/,
                  message:
                    t('auth.signup.PasswordViolation')
                }
              ]}
            >
              <Input.Password/>
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
    </div>
  )
}

export default SignUp
