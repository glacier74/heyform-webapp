import { LogoIcon, RedirectUriLink } from '@/components'
import { AuthService } from '@/service'
import { useRouter } from '@/utils'
import { Form, Input } from '@heyforms/ui'
import { ThirdPartyLogin } from './views/ThirdPartyLogin'

const SignUp = () => {
  const router = useRouter()

  async function handleFinish(values: any) {
    await AuthService.signUp(values)
    router.push('/verify-email')
  }

  return (
    <div>
      <div>
        <LogoIcon className="h-8 w-auto" />
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create an account</h2>
        <p className="mt-2 text-sm text-gray-600">
          Or {''}
          <RedirectUriLink href="/" className="font-medium text-blue-600 hover:text-blue-500">
            sign in with existing one
          </RedirectUriLink>
        </p>
      </div>

      <div className="mt-8">
        <div>
          <div>
            <p className="text-sm font-medium text-gray-700">Sign up with</p>
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
              rules={[{ required: true, message: "Name can't be empty" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email address"
              rules={[{ type: 'email', required: true, message: 'Invalid email address' }]}
            >
              <Input type="email" />
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
                    'Your password must be at least 8 characters, and at least 1 uppercase, 1 lowercase and 1 number.'
                }
              ]}
            >
              <Input.Password />
            </Form.Item>

            <div className="mt-6">
              <p className="text-sm text-gray-500">
                By signing up, you agree to our{' '}
                <a
                  href="https://community.heyform.net/t/terms-conditions/33"
                  className="font-medium text-gray-700 underline"
                  target="_blank"
                >
                  Terms of Service
                </a>{' '}
                and{' '}
                <a
                  href="https://community.heyform.net/t/privacy-policy/34"
                  className="font-medium text-gray-700 underline"
                  target="_blank"
                >
                  Privacy Policy
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
