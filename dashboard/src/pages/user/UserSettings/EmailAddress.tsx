import { useStore } from '@/store'
import { useVisible } from '@/utils'
import { Button, Form, Input, Modal } from '@heyforms/ui'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import { useState } from 'react'

interface ChangeEmailProps extends Omit<IModalProps, 'onComplete'> {
  onComplete?: (email: string) => void
}

interface VerifyEmailProps extends IModalProps {
  email?: string | null
}

const ChangeEmail: FC<ChangeEmailProps> = ({ visible, onClose, onComplete }) => {
  async function handleFinish(values: IMapType) {
    onClose?.()
    onComplete?.(values.email)
  }

  return (
    <Modal contentClassName="max-w-md" visible={visible} showCloseIcon onClose={onClose}>
      <div className="space-y-6">
        <div>
          <h1 className="text-lg leading-6 font-medium text-gray-900">Change your email address</h1>
          <p className="mt-1 text-sm text-gray-500">
            We will send you an email with a 6-digit verification code.
          </p>
        </div>

        <Form.Custom
          submitText="Send"
          submitOptions={{
            type: 'primary'
          }}
          request={handleFinish}
        >
          <Form.Item name="password" label="Password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="email"
            label="New email address"
            rules={[{ type: 'email', required: true }]}
          >
            <Input type="email" />
          </Form.Item>
        </Form.Custom>
      </div>
    </Modal>
  )
}

const VerifyEmail: FC<VerifyEmailProps> = ({ visible, email, onClose, onComplete }) => {
  async function handleFinish() {
    onClose?.()
    onComplete?.()
  }

  return (
    <Modal contentClassName="max-w-md" visible={visible} showCloseIcon onClose={onClose}>
      <div className="space-y-6">
        <div>
          <h1 className="text-lg leading-6 font-medium text-gray-900">Check your email</h1>
          <p className="mt-1 text-sm text-gray-500">
            We've sent you an email with a 6-digit verification code. Please check your inbox at{' '}
            {email}.
          </p>
        </div>

        <Form.Custom
          submitText="Continue"
          submitOptions={{
            type: 'primary'
          }}
          request={handleFinish}
        >
          <Form.Item name="code" label="Verification code" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form.Custom>
      </div>
    </Modal>
  )
}

export const EmailAddress: FC = observer(() => {
  const userStore = useStore('userStore')
  const [changeEmailVisible, openChangeEmail, closeChangeEmail] = useVisible()
  const [verifyEmailVisible, openVerifyEmail, closeVerifyEmail] = useVisible()
  const [newEmail, setNewEmail] = useState<string>()

  function handleComplete(email: string) {
    setNewEmail(email)
    openVerifyEmail()
  }

  return (
    <div>
      <div className="block text-sm font-medium text-gray-700">Email address</div>
      <p className="mt-1 text-sm text-gray-500">
        <span>{userStore.user.email}</span>

        {!userStore.user.isSocialAccount && (
          <Button.Link className="ml-2 text-blue-500" onClick={openChangeEmail}>
            Change email address
          </Button.Link>
        )}
      </p>

      <ChangeEmail
        visible={changeEmailVisible}
        onClose={closeChangeEmail}
        onComplete={handleComplete}
      />
      <VerifyEmail visible={verifyEmailVisible} email={newEmail} onClose={closeVerifyEmail} />
    </div>
  )
})
