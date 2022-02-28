import { UserService } from '@/service'
import { useStore } from '@/store'
import { useVisible } from '@/utils'
import { Button, Form, Input, Modal, notification } from '@heyforms/ui'
import { isValid } from '@hpnp/utils/helper'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import { useState } from 'react'

const ChangePassword: FC<IModalProps> = ({ visible, onClose }) => {
  const [values, setValues] = useState<IMapType>({})

  function handleChange(_: unknown, val: IMapType) {
    setValues(val)
  }

  async function handleFinish(val: IMapType) {
    await UserService.updatePassword(val.currentPassword, val.newPassword)

    notification.success({
      title: 'Your password has been changed'
    })
    onClose?.()
  }

  return (
    <Modal contentClassName="max-w-md" visible={visible} showCloseIcon onClose={onClose}>
      <div className="space-y-6">
        <div>
          <h1 className="text-lg leading-6 font-medium text-gray-900">Change password</h1>
        </div>

        <Form.Custom
          submitText="Continue"
          submitOptions={{
            type: 'primary'
          }}
          request={handleFinish}
          onValuesChange={handleChange}
        >
          <Form.Item name="currentPassword" label="Current password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="New password"
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
          <Form.Item
            name="repeatPassword"
            label="Repeat password"
            rules={[
              {
                validator: async (rule, value) => {
                  if (isValid(values.newPassword) && value !== values.newPassword) {
                    throw new Error(rule.message as string)
                  }
                },
                message: 'Your new password and repeat password do not match.'
              }
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form.Custom>
      </div>
    </Modal>
  )
}

export const Password: FC = observer(() => {
  const userStore = useStore('userStore')
  const [visible, handleOpen, handleClose] = useVisible()

  if (userStore.user.isSocialAccount) {
    return null
  }

  return (
    <div>
      <div className="block text-sm font-medium text-gray-700">Password</div>
      <p className="mt-1 text-sm text-gray-500">
        <Button.Link className="text-blue-500" onClick={handleOpen}>
          Change password
        </Button.Link>
      </p>

      <ChangePassword visible={visible} onClose={handleClose} />
    </div>
  )
})
