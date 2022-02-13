import { AppleIcon, GoogleIcon, LogoIcon } from '@/components'
import { Button, Form, Input } from '@heyforms/ui'
import { Link } from 'react-router-dom'

export default () => {
  return (
    <div>
      <div>
        <LogoIcon className="h-12 w-auto" />
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        <p className="mt-2 text-sm text-gray-600">
          Or {''}
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
            start your free trial
          </a>
        </p>
      </div>

      <div className="mt-8">
        <div>
          <div>
            <p className="text-sm font-medium text-gray-700">Sign in with</p>

            <div className="mt-1 grid grid-cols-2 gap-2">
              <div>
                <div className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-50">
                  <span className="sr-only">Sign in with Google</span>
                  <GoogleIcon className="w-5 h-5" />
                </div>
              </div>

              <div>
                <div className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-50">
                  <span className="sr-only">Sign in with Apple</span>
                  <AppleIcon className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Form>
            <Form.Item
              name="email"
              label="Email address"
              rules={[{ type: 'email', required: true }]}
            >
              <Input type="email" />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input.Password />
            </Form.Item>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <Button type="primary" htmlType="submit" className="mt-6" block={true}>
              Sign In
            </Button>
          </Form>
        </div>
      </div>
    </div>
  )
}
