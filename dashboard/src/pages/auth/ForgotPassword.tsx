import { LogoIcon } from '@/components'
import { AuthService } from '@/service'
import { useStore } from '@/store'
import { ChevronLeftIcon } from '@heroicons/react/outline'
import { Form, Input } from '@heyforms/ui'
import { Link, useHistory } from 'react-router-dom'

const ForgotPassword = () => {
  const history = useHistory()
  const appStore = useStore('appStore')

  async function handleFinish(values: IMapType) {
    await AuthService.sendResetEmail(values.email)
    appStore.resetPasswordEmail = values.email

    history.push('/reset-password')
  }

  return (
    <div>
      <div>
        <LogoIcon className="h-8 w-auto" />
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Forgot Password?</h2>
        <p className="mt-2 text-sm text-gray-600">
          We'll send you an email with verification code to reset your password.
        </p>
      </div>

      <div className="mt-8">
        <Form.Custom
          submitText="Continue"
          submitOptions={{
            type: 'primary',
            block: true
          }}
          request={handleFinish}
        >
          <Form.Item name="email" label="Email address" rules={[{ type: 'email', required: true }]}>
            <Input type="email" />
          </Form.Item>
        </Form.Custom>

        <div className="mt-6 text-center text-blue-600 hover:text-blue-500 sm:text-sm">
          <Link to="/login" className="inline-flex items-center">
            <ChevronLeftIcon className="w-5 h-5" /> Back to sign in
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
