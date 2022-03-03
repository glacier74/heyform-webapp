import { UserService } from '@/service'
import { useStore } from '@/store'
import { useVisible } from '@/utils'
import { Button, Form, Input, Modal } from '@heyforms/ui'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import { useState } from 'react'

export interface FormValues {
  email: string
  password: string
}

interface SendCodeProps extends Omit<IModalProps, 'onComplete'> {
  onComplete?: (formValues: FormValues) => void
}

interface VerifyEmailProps extends IModalProps {
  formValues?: FormValues
}

export const SendCode: FC<SendCodeProps> = ({ visible, onClose, onComplete }) => {
  async function handleFinish(values: FormValues) {
    await UserService.changeEmailCode(values.password, values.email)

    onClose?.()
    onComplete?.(values)
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
          {/* @Discard at 3 Mar 2022 */}
          {/* Don't need to enter password when change email address */}
          {/*<Form.Item name="password" label="Password" rules={[{ required: true }]}>*/}
          {/*  <Input.Password />*/}
          {/*</Form.Item>*/}
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

export const VerifyEmail: FC<VerifyEmailProps> = ({ visible, formValues, onClose, onComplete }) => {
  async function handleFinish(values: IMapType) {
    await UserService.updateEmail(formValues!.email, formValues!.password, values.code)

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
            {formValues?.email}.
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
  const [sendCodeVisible, openSendCode, closeSendCode] = useVisible()
  const [verifyEmailVisible, openVerifyEmail, closeVerifyEmail] = useVisible()
  const [formValues, setTempValues] = useState<FormValues>()

  function handleSendComplete(values: FormValues) {
    setTempValues(values)
    openVerifyEmail()
  }

  function handleVerifyComplete() {
    userStore.update({
      email: formValues?.email
    })
  }

  return (
    <div>
      <div className="block text-sm font-medium text-gray-700">Email address</div>
      <p className="mt-1 text-sm text-gray-500">
        <span>{userStore.user.email}</span>

        {!userStore.user.isSocialAccount && (
          <Button.Link className="ml-2 text-blue-500" onClick={openSendCode}>
            Change email address
          </Button.Link>
        )}
      </p>

      <SendCode visible={sendCodeVisible} onClose={closeSendCode} onComplete={handleSendComplete} />
      <VerifyEmail
        visible={verifyEmailVisible}
        formValues={formValues}
        onClose={closeVerifyEmail}
        onComplete={handleVerifyComplete}
      />
    </div>
  )
})
