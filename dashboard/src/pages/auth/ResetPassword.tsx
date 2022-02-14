import { LogoIcon } from '@/components'
import { Button, Form, Input } from '@heyforms/ui'

const ResetPassword = () => {
  return (
    <div>
      <div>
        <LogoIcon className="h-8 w-auto" />
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Reset Password</h2>
        <p className="mt-2 text-sm text-gray-600">
          You are one step away! Set your new password to complete.
        </p>
      </div>

      <div className="mt-8">
        <Form>
          <Form.Item name="password" label="New password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm new password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>

          <Button type="primary" htmlType="submit" block={true}>
            Continue
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default ResetPassword
