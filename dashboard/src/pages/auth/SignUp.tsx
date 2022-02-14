import { AppleIcon, GoogleIcon, LogoIcon } from '@/components'
import { Button, Form, Input } from '@heyforms/ui'

const SignUp = () => {
  return (
    <div>
      <div>
        <LogoIcon className="h-8 w-auto" />
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create an account</h2>
        <p className="mt-2 text-sm text-gray-600">
          Or {''}
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
            sign in with existing one
          </a>
        </p>
      </div>

      <div className="mt-8">
        <div>
          <div>
            <p className="text-sm font-medium text-gray-700">Sign up with</p>

            <div className="mt-1 grid grid-cols-2 gap-2">
              <div>
                <div className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-50">
                  <span className="sr-only">Sign up with Google</span>
                  <GoogleIcon className="w-5 h-5" />
                </div>
              </div>

              <div>
                <div className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-50">
                  <span className="sr-only">Sign up with Apple</span>
                  <AppleIcon className="w-5 h-5" />
                </div>
              </div>
            </div>
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
          <Form onValuesChange={console.log}>
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

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

            <div className="mt-6">
              <p className="text-sm text-gray-500">
                By signing up, you agree to our{' '}
                <a href="#" className="font-medium text-gray-700 underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="font-medium text-gray-700 underline">
                  Privacy Policy
                </a>
                .
              </p>
            </div>

            <Button type="primary" htmlType="submit" className="mt-3" block={true}>
              Sign Up
            </Button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default SignUp
