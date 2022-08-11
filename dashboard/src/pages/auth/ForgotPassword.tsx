import { RedirectUriLink } from '@/components'
import { AuthService } from '@/service'
import { useStore } from '@/store'
import { useRouter } from '@/utils'
import { ChevronLeftIcon } from '@heroicons/react/outline'
import { Form, Input } from '@heyforms/ui'
import { useTranslation } from 'react-i18next'

const ForgotPassword = () => {
  const router = useRouter()
  const appStore = useStore('appStore')
  const { t } = useTranslation()

  async function handleFinish(values: IMapType) {
    await AuthService.sendResetEmail(values.email)
    appStore.resetPasswordEmail = values.email

    router.push('/reset-password')
  }

  return (
    <div>
      <div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          {t('auth.forgotPassword.forgot')}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {t('auth.forgotPassword.sendEmail')}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Form.Custom
            submitText={t('auth.forgotPassword.continue')}
            submitOptions={{
              type: 'primary',
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
          </Form.Custom>

          <div className="mt-6 text-center text-blue-600 hover:text-blue-500 sm:text-sm">
            <RedirectUriLink href="/login" className="inline-flex items-center">
              <ChevronLeftIcon className="w-5 h-5" /> {t('auth.forgotPassword.link')}
            </RedirectUriLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
