import { LogoIcon } from '@/components'
import { Button, Form, Input } from '@heyforms/ui'
import { ChevronLeftIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
  return (
    <div>
      <div>
        <LogoIcon className="h-8 w-auto" />
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Forgot Password?</h2>
        <p className="mt-2 text-sm text-gray-600">
          Enter your email address to reset your password.
        </p>
      </div>

      <div className="mt-8">
        <Form.Custom
          submitText="Continue"
          submitOptions={{
            type: 'primary',
            block: true
          }}
          request={console.log as any}
        >
          <Form.Item name="email" label="Email address" rules={[{ type: 'email', required: true }]}>
            <Input type="email" />
          </Form.Item>
        </Form.Custom>

        <div className="mt-6 text-center text-blue-600 hover:text-blue-500 sm:text-sm">
          <Link to="/login" className="inline-flex items-center">
            <ChevronLeftIcon className="w-5 h-5" /> Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
