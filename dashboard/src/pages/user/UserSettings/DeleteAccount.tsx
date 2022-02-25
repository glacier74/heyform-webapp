import { UserService } from '@/service'
import { useStore } from '@/store'
import { clearAuthState, useAsyncEffect, useVisible } from '@/utils'
import { Button, Form, Input, Modal, notification } from '@heyforms/ui'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'

const VerifyEmail: FC<IModalProps> = observer(({ visible, onClose, onComplete }) => {
  const userStore = useStore('userStore')

  async function handleFinish(values: IMapType) {
    await UserService.verifyDeletionCode(values.code)

    // Clear the auth state and logout the user
    setTimeout(() => {
      clearAuthState()
      window.location.href = '/login'
    }, 10_000)

    onComplete?.()
    onClose?.()
  }

  useAsyncEffect(async () => {
    if (visible) {
      await UserService.sendDeletionCode()

      notification.success({
        title: `An email containing a verification code was sent to ${userStore.user.email}.`
      })
    }
  }, [visible])

  return (
    <Modal contentClassName="max-w-md" visible={visible} showCloseIcon onClose={onClose}>
      <div className="space-y-6">
        <div>
          <h1 className="text-lg leading-6 font-medium text-gray-900">Delete account</h1>
          <div className="space-y-2">
            <p className="mt-1 text-sm text-gray-500">
              This action cannot be undone. This will permanently delete your entire account. All
              workspaces you created will be deleted, and you will be removed from all shared
              workspaces.
            </p>
            <p className="mt-1 text-sm text-gray-500">
              If you are sure you want to proceed with the deletion of your account, please continue
              below.
            </p>
          </div>
        </div>

        <Form.Custom
          submitText="Delete my account"
          submitOptions={{
            type: 'danger'
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
})

const DeletionWarning: FC<IModalProps> = ({ visible }) => {
  return (
    <Modal.Confirm
      type="danger"
      visible={visible}
      title="Account deletion scheduled"
      maskClosable={false}
      description={
        <div className="space-y-2">
          <p>
            We have scheduled your account deletion in 48 hours. You will receive an email
            confirmation when it has completed.
          </p>
          <p>You will now be logged out.</p>
        </div>
      }
    />
  )
}

export const DeleteAccount: FC = () => {
  const [verifyEmailVisible, openVerifyEmail, closeVerifyEmail] = useVisible()
  const [deletionWarningVisible, openDeletionWarning] = useVisible()

  return (
    <div>
      <div className="block text-sm font-medium text-gray-700">Danger zone</div>
      <p className="mt-1 text-sm text-gray-500">
        This will permanently delete your entire account. All your forms, submissions and workspaces
        will be deleted
      </p>
      <div className="mt-3">
        <Button type="danger" onClick={openVerifyEmail}>
          Delete account
        </Button>
      </div>

      <VerifyEmail
        visible={verifyEmailVisible}
        onClose={closeVerifyEmail}
        onComplete={openDeletionWarning}
      />
      <DeletionWarning visible={deletionWarningVisible} />
    </div>
  )
}
